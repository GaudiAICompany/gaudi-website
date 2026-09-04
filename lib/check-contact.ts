/**
 * Asks the backend the two things it already knows about a contact before the form does.
 *
 * A company is identified by the address's domain, or by the whole address for a public
 * mailbox. When it already exists the backend joins the signup to it and discards whatever
 * the company field sent, so the form has to know before the submit, not after: it shows
 * the name on file instead of asking a question whose answer is thrown away. The second
 * answer, that the contact is already a client, is the refusal the submit would otherwise
 * end in, said while they are still on the first field.
 *
 * The two are never both set: someone being turned away is not told whose company the
 * address belongs to.
 *
 * Rate limited per IP, so callers debounce rather than asking per keystroke.
 *
 * Fails open. Every failure answers both-null, the same answer as for a contact nothing is
 * known about, so the form asks and submits exactly as it always has.
 */

import { resolveEndpoint } from "@/lib/api-endpoint"

const CHECK_CONTACT_ENDPOINT = process.env.NEXT_PUBLIC_CHECK_CONTACT_URL || ""

/** A visitor is waiting on this mid-form, so a slow answer is worth less than a fast "no". */
const CHECK_TIMEOUT_MS = 4_000

export type TakenContact = "email" | "phone"

export type ContactCheck = {
  company: string | null
  contactTaken: TakenContact | null
}

const NOTHING: ContactCheck = { company: null, contactTaken: null }

export async function checkContact(email: string, phone?: string): Promise<ContactCheck> {
  const endpoint = resolveEndpoint(CHECK_CONTACT_ENDPOINT)
  // An unset variable is a deploy choice here, not a failure: the form simply asks.
  if (!endpoint) return NOTHING

  const body = new FormData()
  body.append("email", email)
  // Ten digits is the floor for a US number, the same floor the form itself enforces:
  // under it there is nothing to recognise.
  if (phone && phone.replace(/\D/g, "").length >= 10) body.append("phone", phone)

  const controller = new AbortController()
  const stall = setTimeout(() => controller.abort(), CHECK_TIMEOUT_MS)
  const started = Date.now()

  try {
    const res = await fetch(endpoint, { method: "POST", body, signal: controller.signal })

    // 400 / 403 / 429 all mean the same thing to the form: no answer to act on.
    if (!res.ok) {
      logOutcome("unanswered", started, `status=${res.status}`)
      return NOTHING
    }

    const parsed = await res.json()
    const company = typeof parsed?.company === "string" ? parsed.company.trim() : ""
    const taken = parsed?.contact_taken
    const contactTaken: TakenContact | null = taken === "email" || taken === "phone" ? taken : null

    logOutcome(contactTaken ? `taken=${contactTaken}` : company ? "company" : "none", started)
    // Belt and braces on the withholding rule: one screen, one thing to say.
    return { company: contactTaken ? null : company || null, contactTaken }
  } catch (err) {
    // Aborted, offline, DNS, TLS, or a blocking extension. All advisory, all nothing.
    const name = err instanceof Error ? err.name : "UnknownError"
    logOutcome("unanswered", started, `error=${name}`)
    return NOTHING
  } finally {
    clearTimeout(stall)
  }
}

/** Browser consoles are public: outcome and timing only, never the contact or the company. */
function logOutcome(outcome: string, started: number, extra?: string) {
  console.info(
    `[contact] ${outcome} durationMs=${Date.now() - started}` + (extra ? ` ${extra}` : ""),
  )
}
