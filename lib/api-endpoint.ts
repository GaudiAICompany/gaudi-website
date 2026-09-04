/**
 * Points a localhost backend URL at whichever host actually served the page.
 *
 * Dev only in practice, since only a dev build configures a localhost backend. Opening
 * the machine's LAN address from a phone or a second laptop makes "localhost" mean *that*
 * device, so the fetch dies on a preflight nothing answered -- which the console reports
 * as a CORS failure rather than as the wrong host it is.
 *
 * The environment variable still wins whenever it names a real host, so staging and prod
 * are untouched.
 */

const LOCAL_HOSTS = new Set(["localhost", "127.0.0.1", "[::1]"])

export function resolveEndpoint(configured: string): string {
  if (!configured || typeof window === "undefined") return configured

  try {
    const url = new URL(configured)
    if (!LOCAL_HOSTS.has(url.hostname)) return configured
    if (LOCAL_HOSTS.has(window.location.hostname)) return configured

    url.hostname = window.location.hostname
    return url.toString()
  } catch {
    // A relative path or a malformed value is the caller's business, not this helper's.
    return configured
  }
}
