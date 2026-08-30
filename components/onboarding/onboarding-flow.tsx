"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"

import { captureLead } from "@/lib/capture-lead"
import {
  DESKTOP_STEPS,
  MOBILE_STEPS,
  type OnboardingDetails,
  type OnboardingStep,
  companyMailbox,
  splitFullName,
  takeCtaHandoff,
} from "@/lib/onboarding"
import {
  STAGE_GRACE_MS,
  type StagedBlueprints,
  newDraftId,
  stageBlueprints,
  stagedWithin,
} from "@/lib/stage-blueprint"
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

const SUBMIT_FAILED =
  "That didn't go through on my end. Try again, or email help@heygaudi.ai and I'll set you up from there."

/** A stalled upload is almost always the plan set, so point at the way around it. */
const SUBMIT_TIMED_OUT =
  "That's taking longer than it should — a large plan set can do it. Email it to help@heygaudi.ai and I'll pick it up from there."

/**
 * Rejections the visitor can fix themselves, shown on the field they have to change
 * rather than in the generic failure banner at the bottom of the form.
 */
const FIELD_REJECTIONS: Record<string, { key: keyof OnboardingDetails; message: string }> = {
  EMAIL_EXISTS: {
    key: "email",
    message: "That email already has a Gaudi account. Use another, or email help@heygaudi.ai.",
  },
  PHONE_EXISTS: {
    key: "phone",
    message: "That number is already on a Gaudi account. Use another, or email help@heygaudi.ai.",
  },
  PHONE_INVALID: {
    key: "phone",
    message: "I couldn't read that as a phone number. Include the area code.",
  },
}

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
  // One draft per visit, and the in-flight upload it belongs to. The submit awaits
  // this rather than racing it, so a plan set picked seconds ago is already stored
  // and one picked a moment ago is merely finishing.
  const draftId = useRef<string>("")
  const staging = useRef<Promise<StagedBlueprints> | null>(null)
  const [notes, setNotes] = useState("")
  const [details, setDetails] = useState<OnboardingDetails>(EMPTY_DETAILS)
  const [prefilled, setPrefilled] = useState<(keyof OnboardingDetails)[]>([])

  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [submitReference, setSubmitReference] = useState<string | null>(null)
  const [fieldRejection, setFieldRejection] = useState<
    { key: keyof OnboardingDetails; message: string } | null
  >(null)
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

  // Starts the upload, and the estimate behind it, the moment a file is picked. Silent
  // on purpose: nothing in the UI mentions it, and a failure here only means the submit
  // sends the bytes itself.
  const handleFilesChange = useCallback((next: File[]) => {
    setFiles(next)
    if (next.length === 0) {
      staging.current = null
      return
    }
    if (!draftId.current) draftId.current = newDraftId()
    staging.current = stageBlueprints(draftId.current, next)
  }, [])

  const goTo = useCallback((next: OnboardingStep) => {
    setStep(next)
    window.history.pushState({ onboardingStep: next }, "")
    window.scrollTo({ top: 0, behavior: "auto" })
  }, [])

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
      // Peek at the stage rather than waiting on it. It started several form fields
      // ago and has almost always landed; when it has not, the bytes go inline and
      // the wasted upload is nobody's problem but ours.
      const stagedResult = await stagedWithin(staging.current, STAGE_GRACE_MS)
      const staged = stagedResult !== null && stagedResult.staged === files.length

      const result = await submitOnboarding({
        fullName: details.fullName,
        email: details.email,
        phone: details.phone,
        company: details.company,
        notes,
        files,
        draftId: staged ? draftId.current : undefined,
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
          onFilesChange={handleFilesChange}
          onNotesChange={setNotes}
          onContinue={() => goTo("info")}
        />
      ) : step === "info" ? (
        <StepYourInfo
          details={details}
          prefilled={prefilled}
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
