/**
 * Proves the staging upload came from a browser on this site.
 *
 * stage_blueprint is anonymous and starts a real estimate per call, so the backend needs
 * a control the Origin header cannot give it: browsers enforce Origin, scripted clients
 * set it to whatever they like.
 *
 * Invisible, like the upload it guards — a checkbox would undo the point of staging.
 * Cloudflare only shows a challenge when a request already looks automated.
 */

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ""

const SCRIPT_URL = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"

/** Long enough for a first-time script fetch, short enough not to delay the upload. */
const TOKEN_TIMEOUT_MS = 10_000

type Turnstile = {
  render: (el: HTMLElement, opts: Record<string, unknown>) => string
  execute: (id: string, opts?: Record<string, unknown>) => void
  reset: (id: string) => void
}

declare global {
  interface Window {
    turnstile?: Turnstile
  }
}

let scriptPromise: Promise<Turnstile | null> | null = null
let widgetId: string | null = null

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

function ensureWidget(turnstile: Turnstile): string | null {
  if (widgetId !== null) return widgetId

  const host = document.createElement("div")
  host.style.display = "none"
  document.body.appendChild(host)

  try {
    widgetId = turnstile.render(host, { sitekey: SITE_KEY, size: "invisible" })
  } catch {
    widgetId = null
  }
  return widgetId
}

/** A token, or null for every failure — an unconfigured key, a blocked script, a timeout. */
export async function getTurnstileToken(): Promise<string | null> {
  const turnstile = await loadScript()
  if (!turnstile) return null

  const id = ensureWidget(turnstile)
  if (id === null) return null

  return new Promise<string | null>((resolve) => {
    let settled = false
    const finish = (token: string | null) => {
      if (settled) return
      settled = true
      resolve(token)
    }

    // A hung challenge must not hold the upload open.
    const timer = setTimeout(() => finish(null), TOKEN_TIMEOUT_MS)

    try {
      // Reset first: a widget still holding a spent token will not issue another.
      turnstile.reset(id)
      turnstile.execute(id, {
        callback: (token: string) => {
          clearTimeout(timer)
          finish(token)
        },
        "error-callback": () => {
          clearTimeout(timer)
          finish(null)
        },
        "timeout-callback": () => {
          clearTimeout(timer)
          finish(null)
        },
      })
    } catch {
      clearTimeout(timer)
      finish(null)
    }
  })
}
