/**
 * Asks the backend the two things it already knows about a contact before the form does.
 *
 * A company is identified by the address's domain, or by the whole address for a public
 * mailbox, so two coworkers on the same domain land on one company and two strangers on
 * gmail do not. When that company already exists the backend joins the new signup to it
 * and discards whatever was typed in the company field, so the form has to know before
 * the submit, not after: it shows the name on file and stops asking a question whose
 * answer is thrown away.
 *
 * The second answer is the refusal the submit would otherwise end in. Hearing "you are
 * already a client" while still on the address, rather than after filling in a whole
 * form, is the entire point of asking early.
 *
 * The two are never both set: someone being turned away is not told whose company the
 * address belongs to, so the backend withholds the name in that case.
 *
 * Same contract as the other clients here: the URL is inlined at build time and is an
 * address, never a credential. The endpoint writes nothing and is safe to call again,
 * but it is rate limited per IP, so callers debounce rather than calling per keystroke.
 *
 * Advisory only. Every failure answers both-null, which is also the answer for a contact
 * nothing is known about, so the form asks and submits exactly as it always has.
 */

import { resolveEndpoint } from "@/lib/api-endpoint"

const CHECK_CONTACT_ENDPOINT = process.env.NEXT_PUBLIC_CHECK_CONTACT_URL || ""

/** A visitor is waiting on this mid-form, so a slow answer is worth less than a fast "no". */
const CHECK_TIMEOUT_MS = 4_000

/** Which of the two contacts already belongs to a Gaudi client, when one of them does. */
export type TakenContact = "email" | "phone"

export type ContactCheck = {
  /** The company this identity is already joined to, null when it joins none. */
  company: string | null
  /** Deliberately withheld, hence null, whenever a contact is taken. */
  contactTaken: TakenContact | null
}

/** Both answers absent: "nothing known", which is also what every failure reports. */
const NOTHING: ContactCheck = { company: null, contactTaken: null }

export async function checkContact(email: string, phone?: string): Promise<ContactCheck> {
  const endpoint = resolveEndpoint(CHECK_CONTACT_ENDPOINT)
  // An unset variable is a deploy choice here, not a failure: the form simply asks.
  if (!endpoint) return NOTHING

  const body = new FormData()
  body.append("email", email)
  // Ten digits is the floor for a US number, the same floor the form itself enforces.
  // Under it there is nothing to recognise, so a half-typed number is not worth asking about.
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

/**
 * Browser consoles are effectively public, so this line carries the outcome and the
 * timing only: never the contact looked up, never the company name it answered with.
 */
function logOutcome(outcome: string, started: number, extra?: string) {
  console.info(
    `[contact] ${outcome} durationMs=${Date.now() - started}` + (extra ? ` ${extra}` : ""),
  )
}
