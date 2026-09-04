/**
 * Uploads the plan set, and starts its estimate, while the visitor is still typing.
 *
 * The file is tens of megabytes and their uplink is the slowest thing in the signup, so
 * both start when they leave the upload step rather than when they press the final
 * submit. The submit then carries a draft id instead of the bytes, and claims the
 * estimate already running under it.
 *
 * One draft id per signup, reused on every Continue. Re-staging supersedes whatever was
 * under that id, so an edited set replaces the previous one instead of leaving a second
 * estimate running beside it, and an emptied set clears the draft.
 *
 * Deliberately invisible: no progress bar, no wording about uploading. The point is that
 * the last step simply feels instant.
 *
 * Best-effort by design. Every failure here is swallowed and the submit falls back to
 * sending the files inline, so a blocked or slow stage costs latency, never a signup.
 */

import { getTurnstileToken } from "@/lib/turnstile"

const STAGE_BLUEPRINT_ENDPOINT = process.env.NEXT_PUBLIC_STAGE_BLUEPRINT_URL || ""

/** Generous: this races the visitor typing, and losing the race is merely slower. */
const STAGE_TIMEOUT_MS = 5 * 60 * 1000

export type StagedBlueprints = {
  draftId: string
  /** How many of the submitted files are confirmed stored. */
  staged: number
}

export function newDraftId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID()
  }
  // The backend only accepts a UUID shape, so a fallback has to produce one.
  const hex = (n: number) =>
    Array.from({ length: n }, () => Math.floor(Math.random() * 16).toString(16)).join("")
  return `${hex(8)}-${hex(4)}-4${hex(3)}-a${hex(3)}-${hex(12)}`
}

/**
 * Stores *files* under *draftId*. Resolves with what landed; never rejects.
 */
export async function stageBlueprints(
  draftId: string,
  files: File[],
): Promise<StagedBlueprints> {
  const nothing: StagedBlueprints = { draftId, staged: 0 }
  // An emptied set still POSTs: nothing else tells the draft its files were removed.
  if (!STAGE_BLUEPRINT_ENDPOINT) return nothing

  const body = new FormData()
  body.append("draft_id", draftId)
  for (const file of files) body.append("files", file, file.name)

  const controller = new AbortController()
  const stall = setTimeout(() => controller.abort(), STAGE_TIMEOUT_MS)
  const started = Date.now()

  try {
    // Sent even when null: the backend owns the rejection rule, and duplicating it here
    // gives it somewhere to drift from.
    const token = await getTurnstileToken("stage_blueprint")

    const res = await fetch(STAGE_BLUEPRINT_ENDPOINT, {
      method: "POST",
      headers: {
        "x-request-id": draftId,
        ...(token ? { "x-turnstile-token": token } : {}),
      },
      body,
      signal: controller.signal,
    })
    if (!res.ok) return nothing

    const parsed = await res.json()
    const staged = typeof parsed?.staged === "number" ? parsed.staged : 0
    console.info(
      `[blueprint] staged files=${staged}/${files.length} draftId=${draftId} ` +
        `durationMs=${Date.now() - started}`,
    )
    return { draftId, staged }
  } catch {
    // Swallowed on purpose: the submit re-sends the files inline.
    return nothing
  } finally {
    clearTimeout(stall)
  }
}
