"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"

import { captureLead, traceableRequestId } from "@/lib/capture-lead"
import {
  DESKTOP_STEPS,
  MOBILE_STEPS,
  type OnboardingDetails,
  type OnboardingStep,
  companyMailbox,
  splitFullName,
  takeCtaHandoff,
} from "@/lib/onboarding"
import { fileManifest, uploadBlueprint } from "@/lib/upload-blueprint"
import { OnboardingShell } from "./onboarding-shell"
import { StepCheckEmail } from "./step-check-email"
import { StepUploadBlueprint } from "./step-upload-blueprint"
import { StepYourInfo } from "./step-your-info"

const EMPTY_DETAILS: OnboardingDetails = { fullName: "", phone: "", email: "", company: "" }

/** Same breakpoint the landing CTA uses to decide email vs phone, so one device sees one story. */
const MOBILE_QUERY = "(max-width: 767px)"

const SUBMIT_FAILED =
  "That didn't go through on my end. Try again, or email help@heygaudi.ai and I'll set you up from there."

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
  const [notes, setNotes] = useState("")
  const [details, setDetails] = useState<OnboardingDetails>(EMPTY_DETAILS)
  const [prefilled, setPrefilled] = useState<(keyof OnboardingDetails)[]>([])

  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [submitReference, setSubmitReference] = useState<string | null>(null)
  const [blueprintOutcome, setBlueprintOutcome] = useState<"none" | "sent" | "failed">("none")

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

    const lead = await captureLead(leadPayload("Onboarding signup"))
    setSubmitReference(traceableRequestId(lead))
    if (!lead.ok) {
      setSubmitError(SUBMIT_FAILED)
      setSubmitting(false)
      return
    }

    // The lead row already carries the file names, so a failed upload costs the
    // visitor a forward, not the signup. The last screen says which happened.
    if (files.length > 0) {
      const upload = await uploadBlueprint(files, {
        email: details.email.trim(),
        company: details.company.trim(),
        notes: notes.trim(),
      })
      setBlueprintOutcome(upload.ok ? "sent" : "failed")
    } else {
      setBlueprintOutcome("none")
    }

    setSubmitting(false)
    goTo("check-email")
  }, [details, files, goTo, leadPayload, notes])

  // The welcome email is sent off the back of a captured lead, so re-sending the
  // same row is what asks the backend for another one.
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
