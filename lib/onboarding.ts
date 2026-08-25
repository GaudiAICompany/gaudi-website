/**
 * Shared vocabulary for the signup flow: which screens exist, how the device
 * picks a path through them, and the small derivations the screens display.
 */

export type OnboardingStep = "upload" | "info" | "check-email"

/**
 * The flow branches on device. A phone skips the blueprint step because picking
 * a plan set off a phone is friction the follow-up email can absorb instead --
 * the estimator asks for the file there rather than at the door.
 */
export const DESKTOP_STEPS: readonly OnboardingStep[] = ["upload", "info", "check-email"]
export const MOBILE_STEPS: readonly OnboardingStep[] = ["info", "check-email"]

export const GAUDI_MAIL_DOMAIN = "heygaudi.ai"
export const GAUDI_HELP_EMAIL = "help@heygaudi.ai"

export type OnboardingDetails = {
  fullName: string
  phone: string
  email: string
  company: string
}

/**
 * The mailbox shown on the last screen. The backend owns the real assignment --
 * it falls back to a unique company name when the domain is already taken -- so
 * treat this as the address to look for, not a guaranteed one.
 */
export function companyMailbox(company: string): string {
  const slug = company
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "")
    .slice(0, 24)
  return `${slug || "estimator"}@${GAUDI_MAIL_DOMAIN}`
}

/** The lead payload is split into first/last; the form asks for one name field. */
export function splitFullName(fullName: string): { firstName: string; lastName: string } {
  const parts = fullName.trim().split(/\s+/).filter(Boolean)
  return { firstName: parts[0] || "", lastName: parts.slice(1).join(" ") }
}

/**
 * One-shot handoff from a landing CTA into the signup flow.
 *
 * sessionStorage rather than a query parameter, deliberately: the root layout
 * loads Google Analytics and the LinkedIn Insight Tag, and both report the full
 * page location. An address in the URL is therefore an address handed to an ad
 * network, and left behind in browser history and Referer headers besides.
 */
const CTA_HANDOFF_KEY = "gaudi:cta-handoff"

export type CtaHandoff = { email?: string; phone?: string }

export function writeCtaHandoff(handoff: CtaHandoff): void {
  try {
    sessionStorage.setItem(CTA_HANDOFF_KEY, JSON.stringify(handoff))
  } catch {
    // Private mode or blocked storage: the flow simply asks for the value again.
  }
}

/** Reads once and clears, so a later visit never resurrects a stale address. */
export function takeCtaHandoff(): CtaHandoff {
  try {
    const raw = sessionStorage.getItem(CTA_HANDOFF_KEY)
    if (!raw) return {}
    sessionStorage.removeItem(CTA_HANDOFF_KEY)
    const parsed = JSON.parse(raw)
    return {
      email: typeof parsed?.email === "string" ? parsed.email : undefined,
      phone: typeof parsed?.phone === "string" ? parsed.phone : undefined,
    }
  } catch {
    return {}
  }
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  const kb = bytes / 1024
  if (kb < 1024) return `${Math.round(kb)} KB`
  return `${(kb / 1024).toFixed(1)} MB`
}

export function firstNameOf(fullName: string): string {
  return splitFullName(fullName).firstName
}
