/**
 * Proves an onboarding request came from a browser on this site.
 *
 * stage_blueprint starts a real estimate per call and onboard_client mints an auth user,
 * so the backend needs a control the Origin header cannot give it: browsers enforce
 * Origin, scripted clients set it to whatever they like.
 *
 * Invisible, like the upload it guards — a checkbox would undo the point of staging.
 * Cloudflare only shows a challenge when a request already looks automated.
 */

const SITE_KEY = process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY || ""

const SCRIPT_URL = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"

/** Cloudflare reports this back on verify, so each endpoint can check it got its own token. */
export type TurnstileAction = "stage_blueprint" | "onboard_client"

/** Long enough for a first-time script fetch, short enough not to delay the upload. */
const TOKEN_TIMEOUT_MS = 10_000

type Turnstile = {
  render: (el: HTMLElement, opts: Record<string, unknown>) => string
  execute: (id: string, opts?: Record<string, unknown>) => void
  reset: (id: string) => void
  remove: (id: string) => void
}

declare global {
  interface Window {
    turnstile?: Turnstile
  }
}

let scriptPromise: Promise<Turnstile | null> | null = null

function loadScript(): Promise<Turnstile | null> {
  if (scriptPromise) return scriptPromise

  scriptPromise = new Promise((resolve) => {
    if (typeof window === "undefined" || !SITE_KEY) return resolve(null)
    if (window.turnstile) return resolve(window.turnstile)

    const script = document.createElement("script")
    script.src = SCRIPT_URL
    script.async = true
    script.onload = () => resolve(window.turnstile ?? null)
    script.onerror = () => resolve(null)
    document.head.appendChild(script)
  })

  return scriptPromise
}

/**
 * Somewhere a challenge can actually be drawn if Cloudflare escalates to one.
 *
 * `display: none` cannot: an escalated widget renders into its container, so a hidden one
 * leaves the visitor nothing to solve and the token never arrives. In execute mode the
 * element paints nothing until it is challenged, so this costs no layout in the normal case.
 */
function makeHost(): HTMLElement {
  const host = document.createElement("div")
  host.style.position = "fixed"
  host.style.left = "50%"
  host.style.top = "50%"
  host.style.transform = "translate(-50%, -50%)"
  host.style.zIndex = "2147483647"
  document.body.appendChild(host)
  return host
}

/**
 * A token, or null for every failure — an unconfigured key, a blocked script, a timeout.
 *
 * One widget per call, torn down when it settles. A module-level widget shared across calls
 * cannot serve the second one: reset() does not interrupt a widget that is mid-execute, so
 * the next execute() is refused with "already executing" and no callback ever fires. The
 * signup then posts with no token and the backend answers CHALLENGE_FAILED, which reads on
 * the page as the server rejecting a real visitor.
 *
 * The callbacks and `action` go to render(), not execute(). Cloudflare only reads them
 * there, and a widget rendered without a callback has no way to hand a token back at all.
 */
export async function getTurnstileToken(action: TurnstileAction): Promise<string | null> {
  const turnstile = await loadScript()
  if (!turnstile) return null

  return new Promise<string | null>((resolve) => {
    const host = makeHost()
    let widgetId: string | null = null
    let settled = false

    const finish = (token: string | null, reason?: string) => {
      if (settled) return
      settled = true
      clearTimeout(timer)
      if (!token) console.warn(`[turnstile] no token for ${action}: ${reason ?? "unknown"}`)
      // Torn down on every path, so a failed attempt cannot poison the next one.
      try {
        if (widgetId !== null) turnstile.remove(widgetId)
      } catch {
        // Already gone; the host still has to go.
      }
      host.remove()
      resolve(token)
    }

    // A hung challenge must not hold the upload open.
    const timer = setTimeout(() => finish(null, "timed out"), TOKEN_TIMEOUT_MS)

    try {
      widgetId = turnstile.render(host, {
        sitekey: SITE_KEY,
        action,
        // "execute": the widget appears only if execute() meets a challenge. Invisibility is
        // the widget's dashboard mode, never a size -- there is no "invisible" size to set.
        appearance: "execute",
        callback: (token: string) => finish(token),
        "error-callback": (code?: string) => finish(null, `error ${code ?? ""}`.trim()),
        "timeout-callback": () => finish(null, "challenge expired"),
      })
      turnstile.execute(widgetId)
    } catch (e) {
      finish(null, `render threw: ${String(e)}`)
    }
  })
}
