/**
 * Uploads the plan set while the visitor is still filling in the form.
 *
 * The file is tens of megabytes and their uplink is the slowest thing in the signup,
 * so the upload starts the moment they pick it rather than when they press Continue.
 * By the time four fields are typed it is usually already stored, and the submit
 * carries a draft id instead of the bytes.
 *
 * Deliberately invisible: no progress bar, no wording about uploading. The visitor
 * is choosing a file, not managing a transfer, and the point is that the last step
 * simply feels instant.
 *
 * Best-effort by design. Every failure here is swallowed and the submit falls back to
 * sending the files inline, so a blocked or slow stage costs latency, never a signup.
 */

export const STAGE_BLUEPRINT_ENDPOINT = process.env.NEXT_PUBLIC_STAGE_BLUEPRINT_URL || ""

/** Generous: this races the visitor typing, and losing the race is merely slower. */
const STAGE_TIMEOUT_MS = 5 * 60 * 1000

/**
 * How long the submit will wait for a stage that has not landed yet.
 *
 * Short on purpose. Waiting any longer puts the upload back on the critical path,
 * which is the one thing staging exists to prevent -- a stalled stage would hold the
 * button on "Setting you up" for as long as the stage's own timeout allows.
 */
export const STAGE_GRACE_MS = 2000

export type StagedBlueprints = {
  draftId: string
  /** Files confirmed stored, so the submit knows whether it can skip the upload. */
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
  if (!STAGE_BLUEPRINT_ENDPOINT || files.length === 0) return nothing

  const body = new FormData()
  body.append("draft_id", draftId)
  for (const file of files) body.append("files", file, file.name)

  const controller = new AbortController()
  const stall = setTimeout(() => controller.abort(), STAGE_TIMEOUT_MS)
  const started = Date.now()

  try {
    const res = await fetch(STAGE_BLUEPRINT_ENDPOINT, {
      method: "POST",
      headers: { "x-request-id": draftId },
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

/**
 * The staged result if it lands within *ms*, otherwise null. Never throws and never
 * waits longer than *ms*, so a slow or dead stage costs the submit a moment, not the
 * signup: the caller sends the bytes inline instead.
 */
export async function stagedWithin(
  pending: Promise<StagedBlueprints> | null,
  ms: number,
): Promise<StagedBlueprints | null> {
  if (!pending) return null

  let timer: ReturnType<typeof setTimeout> | undefined
  const deadline = new Promise<null>((resolve) => {
    timer = setTimeout(() => resolve(null), ms)
  })

  try {
    return await Promise.race([pending.catch(() => null), deadline])
  } finally {
    clearTimeout(timer)
  }
}
