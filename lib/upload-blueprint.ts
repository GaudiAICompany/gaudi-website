/**
 * Blueprint upload for the signup flow.
 *
 * Same contract as lib/capture-lead.ts: the URL is inlined at build time and is
 * an address, never a credential. Nothing in this repo can accept a file -- the
 * site is a static export -- so the endpoint lives with the rest of the backend.
 *
 * That endpoint does not exist yet, which makes "unset" the expected state
 * today rather than an outage. It has to fail in a way the flow can recover
 * from: signup still completes and the last screen asks for the file by email,
 * because the alternative is a visitor who filled in four fields and got a dead
 * end for a reason that is ours, not theirs.
 */

export const BLUEPRINT_UPLOAD_ENDPOINT = process.env.NEXT_PUBLIC_BLUEPRINT_UPLOAD_URL || ""

/** The onboarding flow currently supports PDF plan sets only. */
export const BLUEPRINT_ACCEPT = ".pdf,application/pdf"

export const MAX_BLUEPRINT_BYTES = 50 * 1024 * 1024
export const MAX_BLUEPRINT_FILES = 10

export type BlueprintUploadResult = {
  ok: boolean
  requestId: string
  /** null when the request never reached a server at all. */
  status: number | null
  code: string | null
  durationMs: number
}

function newRequestId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID()
  }
  return `bp-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`
}

/**
 * Names a file the backend would reject anyway, so the visitor hears about it
 * while the picker is still open instead of after they have filled in the form.
 */
export function rejectionFor(file: File): string | null {
  if (file.size === 0) return "That file came through empty."
  if (file.size > MAX_BLUEPRINT_BYTES) return "That one is over 50 MB. Send it by email instead."
  const isPdf = file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf")
  if (!isPdf) return "Only PDF files are supported right now."
  return null
}

/** Browser consoles are effectively public: request id and outcome only. */
function logOutcome(result: BlueprintUploadResult, fileCount: number, extra?: string) {
  const line =
    `[blueprint] ${result.ok ? "uploaded" : "failed"} files=${fileCount} ` +
    `requestId=${result.requestId} status=${result.status ?? "no-response"} ` +
    `code=${result.code ?? "none"} durationMs=${result.durationMs}` +
    (extra ? ` ${extra}` : "")

  if (result.ok) console.info(line)
  else console.error(line)
}

export async function uploadBlueprint(
  files: File[],
  meta: { email?: string; company?: string; notes?: string },
): Promise<BlueprintUploadResult> {
  const requestId = newRequestId()
  const started = Date.now()

  if (!BLUEPRINT_UPLOAD_ENDPOINT) {
    const result: BlueprintUploadResult = {
      ok: false,
      requestId,
      status: null,
      code: "endpoint_unconfigured",
      durationMs: 0,
    }
    logOutcome(result, files.length, "hint=NEXT_PUBLIC_BLUEPRINT_UPLOAD_URL-not-set-at-build")
    return result
  }

  const body = new FormData()
  for (const file of files) body.append("files", file, file.name)
  if (meta.email) body.append("email", meta.email)
  if (meta.company) body.append("company", meta.company)
  if (meta.notes) body.append("notes", meta.notes)

  try {
    // No Content-Type header: the browser has to set the multipart boundary.
    const res = await fetch(BLUEPRINT_UPLOAD_ENDPOINT, {
      method: "POST",
      headers: { "x-request-id": requestId },
      body,
    })

    let code: string | null = null
    let serverRequestId = res.headers.get("x-request-id")
    try {
      const parsed = await res.json()
      if (parsed && typeof parsed.error === "string") code = parsed.error
      if (parsed && typeof parsed.request_id === "string") serverRequestId = parsed.request_id
    } catch {
      code = res.ok ? null : `http_${res.status}`
    }

    const result: BlueprintUploadResult = {
      ok: res.ok,
      requestId: serverRequestId || requestId,
      status: res.status,
      code: res.ok ? null : code || `http_${res.status}`,
      durationMs: Date.now() - started,
    }
    logOutcome(result, files.length, res.status === 404 ? "hint=endpoint-not-deployed" : undefined)
    return result
  } catch (err) {
    const result: BlueprintUploadResult = {
      ok: false,
      requestId,
      status: null,
      code: "network_unreachable",
      durationMs: Date.now() - started,
    }
    logOutcome(result, files.length, `error=${err instanceof Error ? err.name : "UnknownError"}`)
    return result
  }
}

/** One line per file so the lead row records what was sent even if the upload did not land. */
export function fileManifest(files: File[]): string {
  return files.map((f) => `${f.name} (${Math.round(f.size / 1024)} KB)`).join(", ")
}
