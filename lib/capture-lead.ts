/**
 * Single client entry point for every signup / lead CTA on the site.
 *
 * The URL is inlined at build time, so switching between the dev and prod
 * backends is a variable change plus a rebuild -- nothing in the site's code.
 */

import { resolveEndpoint } from "@/lib/api-endpoint"

export const CAPTURE_LEAD_ENDPOINT = process.env.NEXT_PUBLIC_LEAD_CAPTURE_URL || ""

export type CaptureLeadPayload = {
  email?: string
  phone?: string
  firstName?: string
  lastName?: string
  company?: string
  message?: string
  /** Which CTA fired, so conversions can be attributed per placement. */
  source?: string
}

export type CaptureLeadResult = {
  ok: boolean
  /** Correlates the browser console line with the server-side App Insights trace. */
  requestId: string
  /** null when the request never reached the server at all. */
  status: number | null
  /** Stable machine-readable reason; null on success. */
  code: string | null
  durationMs: number
}

/**
 * The id is only in App Insights if the request actually reached the server, so
 * a transport failure must not hand support a reference nothing ever logged.
 */
export function traceableRequestId(result: CaptureLeadResult): string | null {
  return result.status === null ? null : result.requestId
}

function newRequestId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID()
  }
  return `cta-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`
}

/**
 * Browser consoles are effectively public, so these lines carry only the request
 * id, the transport outcome and a coarse reason code, never the submitted
 * address, never a credential, never an upstream error body.
 */
function logOutcome(result: CaptureLeadResult, source: string | undefined, extra?: string) {
  const line =
    `[cta] ${result.ok ? "captured" : "failed"} source=${source || "unknown"} ` +
    `requestId=${result.requestId} status=${result.status ?? "no-response"} ` +
    `code=${result.code ?? "none"} durationMs=${result.durationMs}` +
    (extra ? ` ${extra}` : "")

  if (result.ok) console.info(line)
  else console.error(line)
}

export async function captureLead(payload: CaptureLeadPayload): Promise<CaptureLeadResult> {
  const requestId = newRequestId()
  const started = Date.now()
  const endpoint = resolveEndpoint(CAPTURE_LEAD_ENDPOINT)

  // A missing build variable is a deploy mistake, not a transport failure. Name it
  // as such rather than POSTing to "" and reporting a confusing 404.
  if (!endpoint) {
    const result: CaptureLeadResult = {
      ok: false,
      requestId,
      status: null,
      code: "endpoint_unconfigured",
      durationMs: 0,
    }
    logOutcome(result, payload.source, "hint=NEXT_PUBLIC_LEAD_CAPTURE_URL-not-set-at-build")
    return result
  }

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-request-id": requestId,
      },
      body: JSON.stringify(payload),
    })

    // Shape matches the backend's _error_response: {"error": code, "message": ...}.
    // A proxy or a 404 answers with neither, so fall back to the status class
    // rather than reporting a misleading reason.
    let code: string | null = null
    let serverRequestId: string | null = res.headers.get("x-request-id")
    try {
      const body = await res.json()
      if (body && typeof body.error === "string") code = body.error
      if (body && typeof body.request_id === "string") serverRequestId = body.request_id
    } catch {
      code = res.ok ? null : `http_${res.status}`
    }

    const result: CaptureLeadResult = {
      ok: res.ok,
      requestId: serverRequestId || requestId,
      status: res.status,
      code: res.ok ? null : code || `http_${res.status}`,
      durationMs: Date.now() - started,
    }

    // A 404 means the site is pointed at a host that does not serve this route.
    logOutcome(
      result,
      payload.source,
      res.status === 404 ? "hint=endpoint-not-deployed" : undefined,
    )
    return result
  } catch (err) {
    // No HTTP response at all: DNS, TLS, offline, or a blocking extension.
    const result: CaptureLeadResult = {
      ok: false,
      requestId,
      status: null,
      code: "network_unreachable",
      durationMs: Date.now() - started,
    }
    const name = err instanceof Error ? err.name : "UnknownError"
    logOutcome(result, payload.source, `error=${name}`)
    return result
  }
}
