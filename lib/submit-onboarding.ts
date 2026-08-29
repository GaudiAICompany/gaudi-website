/**
 * The final step of the signup flow: one request that creates the account.
 *
 * Same contract as lib/capture-lead.ts -- the URL is inlined at build time and is
 * an address, never a credential. Nothing in this repo can accept a file or reach
 * a database, so the endpoint lives with the rest of the backend.
 *
 * It replaces an earlier "upload the blueprint somewhere" call. A plan set on its
 * own is not a signup: the backend needs the contact, the company and the notes in
 * the same request to create the Supabase user and start the estimate, and sending
 * them separately meant either could land without the other.
 */

export const ONBOARDING_ENDPOINT = process.env.NEXT_PUBLIC_ONBOARDING_URL || ""

/** The onboarding flow currently supports PDF plan sets only. */
export const BLUEPRINT_ACCEPT = ".pdf,application/pdf"

export const MAX_BLUEPRINT_BYTES = 50 * 1024 * 1024
export const MAX_BLUEPRINT_FILES = 10

/**
 * Generous, because a plan set on a slow uplink legitimately takes minutes -- but
 * finite, because fetch has no timeout of its own: without this a request that
 * stalls leaves the button spinning on "Setting you up" for as long as the visitor
 * is willing to wait, which is the one outcome worse than an error.
 */
export const SUBMIT_TIMEOUT_MS = 3 * 60 * 1000

/** What became of the plan set. The mobile path never sends one, hence "none". */
export type BlueprintOutcome = "none" | "sent" | "failed"

export type OnboardingSubmission = {
  fullName: string
  email: string
  phone: string
  company: string
  notes: string
  files: File[]
  /** Set when lib/stage-blueprint.ts already stored these; the bytes stay home. */
  draftId?: string
  /** Which flow produced this, so conversions stay attributable per placement. */
  source?: string
}

export type OnboardingResult = {
  ok: boolean
  /** Correlates the browser console line with the server-side App Insights trace. */
  requestId: string
  /** null when the request never reached a server at all. */
  status: number | null
  /** Stable machine-readable reason; null on success. */
  code: string | null
  /** Which field a 409 was about ("email" | "phone"), so it can be shown on it. */
  field: string | null
  blueprint: BlueprintOutcome
  durationMs: number
}

/**
 * The id is only in App Insights if the request actually reached the server, so
 * a transport failure must not hand support a reference nothing ever logged.
 */
export function traceableRequestId(result: OnboardingResult): string | null {
  return result.status === null ? null : result.requestId
}

function newRequestId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID()
  }
  return `onb-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`
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
function logOutcome(result: OnboardingResult, fileCount: number, extra?: string) {
  const line =
    `[onboarding] ${result.ok ? "submitted" : "failed"} files=${fileCount} ` +
    `requestId=${result.requestId} status=${result.status ?? "no-response"} ` +
    `code=${result.code ?? "none"} blueprint=${result.blueprint} durationMs=${result.durationMs}` +
    (extra ? ` ${extra}` : "")

  if (result.ok) console.info(line)
  else console.error(line)
}

function isOutcome(value: unknown): value is BlueprintOutcome {
  return value === "none" || value === "sent" || value === "failed"
}

export async function submitOnboarding(
  submission: OnboardingSubmission,
): Promise<OnboardingResult> {
  const requestId = newRequestId()
  const started = Date.now()
  // Already staged means the bytes are in storage and the submit only names them.
  const staged = Boolean(submission.draftId)
  const fileCount = submission.files.length
  const unsent: BlueprintOutcome = fileCount > 0 || staged ? "failed" : "none"

  // A missing build variable is a deploy mistake, not a transport failure. Name it
  // as such rather than POSTing to "" and reporting a confusing 404.
  if (!ONBOARDING_ENDPOINT) {
    const result: OnboardingResult = {
      ok: false,
      requestId,
      status: null,
      code: "endpoint_unconfigured",
      field: null,
      blueprint: unsent,
      durationMs: 0,
    }
    logOutcome(result, fileCount, "hint=NEXT_PUBLIC_ONBOARDING_URL-not-set-at-build")
    return result
  }

  const body = new FormData()
  body.append("name", submission.fullName.trim())
  body.append("email", submission.email.trim())
  body.append("phone", submission.phone.trim())
  body.append("company", submission.company.trim())
  body.append("notes", submission.notes.trim())
  body.append("source", submission.source || "Onboarding signup")
  if (staged) body.append("draft_id", submission.draftId as string)
  else for (const file of submission.files) body.append("files", file, file.name)

  const controller = new AbortController()
  const stall = setTimeout(() => controller.abort(), SUBMIT_TIMEOUT_MS)

  try {
    // No Content-Type header: the browser has to set the multipart boundary.
    const res = await fetch(ONBOARDING_ENDPOINT, {
      method: "POST",
      headers: { "x-request-id": requestId },
      body,
      signal: controller.signal,
    })

    // Shape matches the backend's _error_response: {"error": code, "message": ...}.
    // A proxy or a 404 answers with neither, so fall back to the status class
    // rather than reporting a misleading reason.
    let code: string | null = null
    let field: string | null = null
    let serverRequestId = res.headers.get("x-request-id")
    let blueprint: BlueprintOutcome = unsent
    try {
      const parsed = await res.json()
      if (parsed && typeof parsed.error === "string") code = parsed.error
      if (parsed && typeof parsed.field === "string") field = parsed.field
      if (parsed && typeof parsed.request_id === "string") serverRequestId = parsed.request_id
      // The server is the only thing that knows whether the plan set actually
      // reached the pipeline -- it answers 200 either way.
      if (res.ok && isOutcome(parsed?.blueprint)) blueprint = parsed.blueprint
    } catch {
      code = res.ok ? null : `http_${res.status}`
    }

    const result: OnboardingResult = {
      ok: res.ok,
      requestId: serverRequestId || requestId,
      status: res.status,
      code: res.ok ? null : code || `http_${res.status}`,
      field,
      blueprint,
      durationMs: Date.now() - started,
    }
    logOutcome(result, fileCount, res.status === 404 ? "hint=endpoint-not-deployed" : undefined)
    return result
  } catch (err) {
    // AbortError is our own deadline; anything else is no HTTP response at all --
    // DNS, TLS, offline, or a blocking extension.
    const timedOut = err instanceof Error && err.name === "AbortError"
    const result: OnboardingResult = {
      ok: false,
      requestId,
      status: null,
      code: timedOut ? "timeout" : "network_unreachable",
      field: null,
      blueprint: unsent,
      durationMs: Date.now() - started,
    }
    logOutcome(result, fileCount, `error=${err instanceof Error ? err.name : "UnknownError"}`)
    return result
  } finally {
    clearTimeout(stall)
  }
}

/** One line per file so the resend lead row records what was sent. */
export function fileManifest(files: File[]): string {
  return files.map((f) => `${f.name} (${Math.round(f.size / 1024)} KB)`).join(", ")
}
