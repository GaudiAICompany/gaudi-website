/**
 * Asks the backend the two things it already knows about a contact before the form does.
 *
 * A company is identified by the address's domain, or by the whole address for a public
 * mailbox. When it already exists the backend joins the signup to it and discards whatever
 * the company field sent, so the form has to know before the submit, not after: it shows
 * the name on file instead of asking a question whose answer is thrown away. The second
 * answer, that the contact is already registered, is the refusal the submit would otherwise
 * end in, said while they are still on the first field.
 *
 * The two are never both set: someone being turned away is not told whose company the
 * address belongs to.
 *
 * Rate limited per IP, and one signup asks more than once as the address and the phone
 * settle, so every distinct question is asked at most once per session -- see `memo`.
 *
 * Fails open. A failure answers `answered: false`, which callers must treat as "ask the way
 * you always did" and never as "nothing is on file". The two are different claims, and
 * conflating them let a refused lookup retract what an earlier answered one established.
 */

const CHECK_CONTACT_ENDPOINT = process.env.NEXT_PUBLIC_CHECK_CONTACT_URL || ""

/** A visitor is waiting on this mid-form, so a slow answer is worth less than a fast "no". */
const CHECK_TIMEOUT_MS = 4_000

export type TakenContact = "email" | "phone"

export type ContactCheck = {
  company: string | null
  contactTaken: TakenContact | null
  /** True only when the backend replied. False is the absence of an answer, not a negative one. */
  answered: boolean
}

const UNANSWERED: ContactCheck = { company: null, contactTaken: null, answered: false }

/**
 * Every question this session has already asked, keyed by the exact question.
 *
 * Module level, not per component: the landing CTA asks about the address, then
 * `/get-started` asks about the same one a route change later, and the second is the same
 * question. Holding the promise rather than the result also collapses the two askers the
 * landing form has -- the debounce and the submit -- into one request.
 *
 * Only answers are kept. A refused lookup is deleted so the next ask can try again once the
 * per-IP budget has recovered, rather than serving the refusal back for the rest of the visit.
 */
const memo = new Map<string, Promise<ContactCheck>>()

export function checkContact(email: string, phone?: string): Promise<ContactCheck> {
  // Ten digits is the floor for a US number, the same floor the form itself enforces:
  // under it there is nothing to recognise.
  const digits = (phone || "").replace(/\D/g, "")
  const usable = digits.length >= 10 ? phone || "" : ""
  const key = `${email}|${usable.replace(/\D/g, "")}`

  const asked = memo.get(key)
  if (asked) return asked

  const answer = ask(email, usable).then((result) => {
    if (!result.answered) memo.delete(key)
    return result
  })
  memo.set(key, answer)
  return answer
}

async function ask(email: string, phone: string): Promise<ContactCheck> {
  const endpoint = CHECK_CONTACT_ENDPOINT
  // An unset variable is a deploy choice here, not a failure: the form simply asks.
  if (!endpoint) return UNANSWERED

  const body = new FormData()
  body.append("email", email)
  if (phone) body.append("phone", phone)

  const controller = new AbortController()
  const stall = setTimeout(() => controller.abort(), CHECK_TIMEOUT_MS)
  const started = Date.now()

  try {
    const res = await fetch(endpoint, { method: "POST", body, signal: controller.signal })

    // 400 / 403 / 429 all mean the same thing to the form: no answer to act on.
    if (!res.ok) {
      logOutcome("unanswered", started, `status=${res.status}`)
      return UNANSWERED
    }

    const parsed = await res.json()
    const company = typeof parsed?.company === "string" ? parsed.company.trim() : ""
    const taken = parsed?.contact_taken
    const contactTaken: TakenContact | null = taken === "email" || taken === "phone" ? taken : null

    logOutcome(contactTaken ? `taken=${contactTaken}` : company ? "company" : "none", started)
    // Belt and braces on the withholding rule: one screen, one thing to say.
    return { company: contactTaken ? null : company || null, contactTaken, answered: true }
  } catch (err) {
    // Aborted, offline, DNS, TLS, or a blocking extension. All advisory, all nothing.
    const name = err instanceof Error ? err.name : "UnknownError"
    logOutcome("unanswered", started, `error=${name}`)
    return UNANSWERED
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
