"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"

import { captureLead } from "@/lib/capture-lead"
import { checkContact } from "@/lib/check-contact"
import {
  DESKTOP_STEPS,
  FIELD_REJECTIONS,
  type FieldRejection,
  MOBILE_STEPS,
  type OnboardingDetails,
  type OnboardingStep,
  companyMailbox,
  rejectionForTakenContact,
  splitFullName,
  takeCtaHandoff,
} from "@/lib/onboarding"
import { newDraftId, stageBlueprints } from "@/lib/stage-blueprint"
import {
  type BlueprintOutcome,
  fileManifest,
  submitOnboarding,
  traceableRequestId,
} from "@/lib/submit-onboarding"
import { OnboardingShell } from "./onboarding-shell"
import { StepCheckEmail } from "./step-check-email"
import { StepUploadBlueprint } from "./step-upload-blueprint"
import { StepYourInfo } from "./step-your-info"

const EMPTY_DETAILS: OnboardingDetails = { fullName: "", phone: "", email: "", company: "" }

/** Same breakpoint the landing CTA uses to decide email vs phone, so one device sees one story. */
const MOBILE_QUERY = "(max-width: 767px)"

/** The shape StepYourInfo already validates: no point asking the backend about "dana@". */
const PLAUSIBLE_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

/** Long enough that typing a contact end to end costs one check, not a dozen. */
const CONTACT_CHECK_DEBOUNCE_MS = 600

const SUBMIT_FAILED =
  "That didn't go through on my end. Try again, or email help@heygaudi.ai and I'll set you up from there."

/** A stalled upload is almost always the plan set, so point at the way around it. */
const SUBMIT_TIMED_OUT =
  "That's taking longer than it should, a large plan set can do it. Email it to help@heygaudi.ai and I'll pick it up from there."

function StepSkeleton() {
  return (
    <div className="flex animate-pulse flex-col gap-6" aria-hidden="true">
      <div className="h-10 w-3/4 rounded-xs bg-secondary" />
      <div className="h-5 w-full rounded-xs bg-secondary/70" />
      <div className="h-40 w-full rounded-xl bg-secondary/60" />
      <div className="h-12 w-48 rounded-full bg-secondary/70" />
    </div>
  )
}

export function OnboardingFlow() {
  // The prerendered HTML cannot know the device, so the first paint is a
  // skeleton rather than a guess that visibly corrects itself a frame later.
  const [mounted, setMounted] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [step, setStep] = useState<OnboardingStep>("info")

  const [files, setFiles] = useState<File[]>([])
  // One id for the whole signup: re-using it is what lets a re-stage supersede the
  // previous estimate instead of starting a second one beside it.
  const draftId = useRef<string>("")
  const stagedFiles = useRef<File[]>([])
  // Read synchronously at submit, so the last step never waits on the upload.
  const stagedOk = useRef(false)
  const [notes, setNotes] = useState("")
  const [details, setDetails] = useState<OnboardingDetails>(EMPTY_DETAILS)
  const [prefilled, setPrefilled] = useState<(keyof OnboardingDetails)[]>([])
  // The company this address is already joined to. Not a `prefilled` entry: that one is
  // deliberately unlockable, and this is the name the backend will use whatever the form
  // sends, so offering to change it would be offering something that does not happen.
  const [fixedCompany, setFixedCompany] = useState<string | null>(null)

  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [submitReference, setSubmitReference] = useState<string | null>(null)
  // Set by the submit's 409, and now also by the contact check when a field settles on a
  // contact that is already a client. Same message either way, only the timing differs.
  const [fieldRejection, setFieldRejection] = useState<FieldRejection | null>(null)
  const [blueprintOutcome, setBlueprintOutcome] = useState<BlueprintOutcome>("none")

  const steps = useMemo(() => (isMobile ? MOBILE_STEPS : DESKTOP_STEPS), [isMobile])
  const stepsRef = useRef(steps)
  stepsRef.current = steps

  useEffect(() => {
    const query = window.matchMedia(MOBILE_QUERY)
    const apply = (mobile: boolean) => {
      setIsMobile(mobile)
      setStep((current) => {
        // Only "upload" can disappear under the visitor, and "info" is where
        // that path continues, so a rotate or a resize never strands anyone.
        if (mobile && current === "upload") return "info"
        return current
      })
    }
    apply(query.matches)
    setStep(query.matches ? MOBILE_STEPS[0] : DESKTOP_STEPS[0])

    // The landing CTA already asked for one of these; carrying it over means
    // nobody types the same address twice.
    const handoff = takeCtaHandoff()
    const email = (handoff.email || "").trim()
    const phone = (handoff.phone || "").trim()
    if (email || phone) {
      setDetails((prev) => ({ ...prev, email: email || prev.email, phone: phone || prev.phone }))
      // Recorded so the next screen confirms these back instead of asking twice.
      setPrefilled([
        ...(email ? (["email"] as const) : []),
        ...(phone ? (["phone"] as const) : []),
      ])
    }

    window.history.replaceState({ onboardingStep: query.matches ? MOBILE_STEPS[0] : DESKTOP_STEPS[0] }, "")
    setMounted(true)

    const onChange = (event: MediaQueryListEvent) => apply(event.matches)
    query.addEventListener("change", onChange)
    return () => query.removeEventListener("change", onChange)
  }, [])

  // Back is the browser's own history entry, so the arrow and the hardware/gesture
  // back button land in the same place instead of disagreeing.
  useEffect(() => {
    const onPopState = (event: PopStateEvent) => {
      const target = event.state?.onboardingStep as OnboardingStep | undefined
      if (target && stepsRef.current.includes(target)) setStep(target)
    }
    window.addEventListener("popstate", onPopState)
    return () => window.removeEventListener("popstate", onPopState)
  }, [])

  // The contact the last check asked about, so a slow answer for a contact they have
  // since edited cannot land on the fields.
  const checkedContact = useRef("")
  // What the check itself put in the company field. Anything else in there was typed by
  // the visitor, and is not this feature's to erase.
  const injectedCompany = useRef("")

  const applyFixedCompany = useCallback((company: string | null) => {
    const previouslyInjected = injectedCompany.current
    injectedCompany.current = company || ""
    setFixedCompany(company)
    setDetails((prev) => {
      // A name on file wins outright: the backend joins them to that company and drops
      // whatever the form sent, so showing anything else here would promise something
      // that does not happen.
      if (company) return prev.company === company ? prev : { ...prev, company }
      // Nothing on file: only the name this check wrote is ours to take back.
      if (prev.company !== "" && prev.company === previouslyInjected) {
        return { ...prev, company: "" }
      }
      return prev
    })
  }, [])

  // Fires when a contact settles, never per keystroke: the check is rate limited per IP.
  // The phone is in the key as well as the address, so filling it in afterwards asks again
  // rather than leaving the one field the check can also speak for unchecked.
  //
  // Keyed on the whole address rather than on the domain, because for a public mailbox the
  // address is the identity, so pedro@gmail.com is a different question from juan@gmail.com
  // even though the domain did not change.
  //
  // An early warning only. The submit and its 409 are untouched: this changes when the
  // visitor hears about a contact that is already a client, not whether they can try.
  useEffect(() => {
    const email = details.email.trim().toLowerCase()
    // Only the digits the check would actually be given, so formatting a number they
    // already typed does not spend a request.
    const phone = details.phone.replace(/\D/g, "")
    const contact = `${email}|${phone.length >= 10 ? phone : ""}`

    if (!PLAUSIBLE_EMAIL.test(email)) {
      // Back to half-typed: drop the lock rather than hold a name for an abandoned address.
      // The rejection stays: it is hidden the moment its own field is edited, and dropping
      // it here would take a 409 off the screen that nobody has dealt with yet.
      if (checkedContact.current !== "") {
        checkedContact.current = ""
        applyFixedCompany(null)
      }
      return
    }
    if (contact === checkedContact.current) return

    const timer = setTimeout(() => {
      checkedContact.current = contact
      // Never rejects, and answers both-null for every failure, so there is nothing to
      // catch: an unreachable check leaves the form as it has always behaved.
      checkContact(email, phone.length >= 10 ? details.phone : undefined).then((result) => {
        if (checkedContact.current !== contact) return
        applyFixedCompany(result.company)
        // The submit's own wording, said earlier. Null clears a warning this check raised
        // about a contact that has since changed.
        //
        // Copied rather than passed through: StepYourInfo hides a rejection once its field
        // is edited, and reads a new value as the reason to show it again. Handing back the
        // one shared object would make "this other address is taken too" silently identical
        // to the message they just edited away from.
        const rejected = rejectionForTakenContact(result.contactTaken)
        setFieldRejection(rejected ? { ...rejected } : null)
      })
    }, CONTACT_CHECK_DEBOUNCE_MS)
    return () => clearTimeout(timer)
  }, [details.email, details.phone, applyFixedCompany])

  const goTo = useCallback((next: OnboardingStep) => {
    setStep(next)
    window.history.pushState({ onboardingStep: next }, "")
    window.scrollTo({ top: 0, behavior: "auto" })
  }, [])

  // Starts the upload when the visitor leaves this step rather than each time they touch
  // the list. By Continue the plan set is final, so picking files one at a time, or
  // adding and then removing one, still costs exactly one request.
  const handleUploadContinue = useCallback(() => {
    const unchanged =
      files.length === stagedFiles.current.length &&
      files.every((file, i) => file === stagedFiles.current[i])
    // Returning to this step and changing nothing must not re-upload what is already staged.
    if (!unchanged) {
      if (!draftId.current) draftId.current = newDraftId()
      stagedFiles.current = files
      stagedOk.current = false
      // Confirmed only when the whole set landed: a partial stage still owes the bytes.
      stageBlueprints(draftId.current, files).then((r) => {
        stagedOk.current = files.length > 0 && r.staged === files.length
      })
    }
    goTo("info")
  }, [files, goTo])

  const leadPayload = useCallback(
    (source: string) => {
      const { firstName, lastName } = splitFullName(details.fullName)
      const manifest = files.length > 0 ? `Blueprint: ${fileManifest(files)}` : ""
      return {
        firstName,
        lastName,
        email: details.email.trim(),
        phone: details.phone.trim(),
        company: details.company.trim(),
        message: [notes.trim(), manifest].filter(Boolean).join(" | "),
        source,
      }
    },
    [details, files, notes],
  )

  const handleSubmit = useCallback(async () => {
    setSubmitting(true)
    setSubmitError(null)
    setFieldRejection(null)

    // One request, because the account is the submission: the backend creates the
    // user and company and starts the estimate from the same form. It answers 200
    // with blueprint="failed" when only the plan set did not make it, so a forward
    // is all the visitor owes -- the last screen says which happened.
    try {
      // Never waits on the stage: unconfirmed means the bytes go inline as well, and the
      // draft id is what keeps two copies from becoming two estimates.
      const result = await submitOnboarding({
        fullName: details.fullName,
        email: details.email,
        phone: details.phone,
        company: details.company,
        notes,
        files: stagedOk.current ? [] : files,
        draftId: draftId.current || undefined,
        source: "Onboarding signup",
      })

      setSubmitReference(traceableRequestId(result))
      if (!result.ok) {
        const rejected = result.code ? FIELD_REJECTIONS[result.code] : undefined
        if (rejected) setFieldRejection(rejected)
        else setSubmitError(result.code === "timeout" ? SUBMIT_TIMED_OUT : SUBMIT_FAILED)
        return
      }

      setBlueprintOutcome(result.blueprint)
      goTo("check-email")
    } catch (err) {
      // submitOnboarding swallows its own failures, so reaching here means something
      // unforeseen. The button must still come back: StepYourInfo ignores every click
      // while `submitting` is true, so leaving it set makes the form look dead.
      console.error(`[onboarding] unexpected submit failure: ${String(err)}`)
      setSubmitError(SUBMIT_FAILED)
    } finally {
      setSubmitting(false)
    }
  }, [details, files, goTo, notes])

  // Deliberately not a second submitOnboarding: that would queue a duplicate
  // estimate. Re-submitting the lead row records that the visitor asked again and
  // is the only part of the signup that is safe to repeat.
  const handleResend = useCallback(async () => {
    await captureLead(leadPayload("Onboarding resend"))
  }, [leadPayload])

  const index = Math.max(0, steps.indexOf(step))
  const canGoBack = mounted && index > 0

  return (
    <OnboardingShell
      current={index + 1}
      total={steps.length}
      onBack={canGoBack ? () => window.history.back() : undefined}
    >
      {!mounted ? (
        <StepSkeleton />
      ) : step === "upload" ? (
        <StepUploadBlueprint
          files={files}
          notes={notes}
          onFilesChange={setFiles}
          onNotesChange={setNotes}
          onContinue={handleUploadContinue}
        />
      ) : step === "info" ? (
        <StepYourInfo
          details={details}
          prefilled={prefilled}
          fixedCompany={fixedCompany}
          onDetailsChange={setDetails}
          onSubmit={handleSubmit}
          submitting={submitting}
          submitError={submitError}
          submitReference={submitReference}
          fieldRejection={fieldRejection}
        />
      ) : (
        <StepCheckEmail
          mailbox={companyMailbox(details.company)}
          blueprintOutcome={blueprintOutcome}
          onResend={handleResend}
        />
      )}
    </OnboardingShell>
  )
}
