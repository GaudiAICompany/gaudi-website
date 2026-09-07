"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { ArrowRight, Check, Loader2 } from "lucide-react"

import type { OnboardingDetails } from "@/lib/onboarding"
import { Field, PrimaryButton, fieldAria, inputClass } from "./field"
import { StepHeading } from "./onboarding-shell"

type Errors = Partial<Record<keyof OnboardingDetails | "terms", string>>

const FIELDS: {
  key: keyof OnboardingDetails
  label: string
  type: string
  autoComplete: string
  inputMode?: "text" | "tel" | "email"
  placeholder: string
}[] = [
  { key: "fullName", label: "Full name", type: "text", autoComplete: "name", placeholder: "Dana Reyes" },
  { key: "phone", label: "Cell phone", type: "tel", autoComplete: "tel", inputMode: "tel", placeholder: "(555) 014-2233" },
  { key: "email", label: "Work email", type: "email", autoComplete: "email", inputMode: "email", placeholder: "dana@reyesbuilders.com" },
  { key: "company", label: "Company name", type: "text", autoComplete: "organization", placeholder: "Reyes Builders" },
]

/** Shown under a company field the visitor cannot edit, so a locked field is never bare. */
const FIXED_COMPANY_HINT =
  "Your company is already set up with Gaudi, so I'll send this job to that account."

function validate(details: OnboardingDetails, agreed: boolean, companyFixed: boolean): Errors {
  const errors: Errors = {}
  if (details.fullName.trim().length < 2) errors.fullName = "I need a name to put on the account."
  // Ten digits is the floor for a US number; anything shorter is a typo, not a format.
  if (details.phone.replace(/\D/g, "").length < 10) errors.phone = "That number looks short. Check the digits."
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(details.email.trim())) errors.email = "That email address isn't valid."
  // A value they cannot edit must never be the thing standing between them and a submit.
  if (!companyFixed && details.company.trim().length < 2)
    errors.company = "Your company name sets up your Gaudi address."
  if (!agreed) errors.terms = "Check the box and we're set."
  return errors
}

/**
 * Second screen on desktop, first on mobile. Deliberately not framed as
 * "create an account": nothing here is a password, it is the information the
 * estimator needs to send work back.
 */
export function StepYourInfo({
  details,
  prefilled,
  fixedCompany,
  onDetailsChange,
  onSubmit,
  submitting,
  submitError,
  submitReference,
  fieldRejection,
}: {
  details: OnboardingDetails
  /** Fields the landing CTA already collected, so this screen confirms rather than asks. */
  prefilled: (keyof OnboardingDetails)[]
  /** The company already on file. Unlike `prefilled`, not theirs to change: the backend assigns it. */
  fixedCompany: string | null
  onDetailsChange: (details: OnboardingDetails) => void
  onSubmit: () => void
  submitting: boolean
  submitError: string | null
  submitReference: string | null
  /** A field the backend refused (taken or unusable), shown on that field. */
  fieldRejection: { key: keyof OnboardingDetails; message: string } | null
}) {
  const [agreed, setAgreed] = useState(false)
  const [errors, setErrors] = useState<Errors>({})
  // A confirmed value is still editable; it just does not open as a question.
  const [unlocked, setUnlocked] = useState<(keyof OnboardingDetails)[]>([])
  const inputs = useRef<Partial<Record<keyof OnboardingDetails, HTMLInputElement | null>>>({})

  // Cleared as soon as they edit the field, like every other error here: leaving
  // "already registered" under an address they have just changed reads as stuck.
  const [rejectionEdited, setRejectionEdited] = useState(false)
  const showRejection = fieldRejection && !rejectionEdited ? fieldRejection : null

  const errorFor = (key: keyof OnboardingDetails) =>
    errors[key] ?? (showRejection?.key === key ? showRejection.message : undefined)

  const isFixed = (key: keyof OnboardingDetails) => key === "company" && fixedCompany !== null

  const isConfirmed = (key: keyof OnboardingDetails) =>
    prefilled.includes(key) &&
    !unlocked.includes(key) &&
    details[key].trim() !== "" &&
    showRejection?.key !== key

  const unlock = (key: keyof OnboardingDetails) =>
    setUnlocked((prev) => (prev.includes(key) ? prev : [...prev, key]))

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    if (submitting) return
    const found = validate(details, agreed, fixedCompany !== null)
    setErrors(found)
    if (Object.keys(found).length > 0) {
      // Whatever the CTA handed over did not pass, so open it for correction.
      for (const key of prefilled) if (found[key]) unlock(key)
      return
    }
    onSubmit()
  }

  // The value the CTA handed over can be the refused one, and a confirmed field
  // does not open as a question, so it has to be opened for them.
  //
  // The focus call is what actually takes them to it: the submit button is at the
  // bottom of the form, and autoFocus fires only on mount, so a field they typed
  // themselves is already mounted and would just quietly turn red off-screen.
  //
  // Not when the caret is in another input, though: a rejection can arrive from the contact
  // check seconds after a field settles, and pulling them back lands keystrokes in the wrong box.
  useEffect(() => {
    if (!fieldRejection) return
    unlock(fieldRejection.key)
    setRejectionEdited(false)
    const active = typeof document === "undefined" ? null : document.activeElement
    const typingElsewhere =
      active !== null &&
      active !== inputs.current[fieldRejection.key] &&
      (active.tagName === "INPUT" || active.tagName === "TEXTAREA")
    if (!typingElsewhere) inputs.current[fieldRejection.key]?.focus()
  }, [fieldRejection])

  const update = (key: keyof OnboardingDetails, value: string) => {
    onDetailsChange({ ...details, [key]: value })
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }))
    if (fieldRejection?.key === key) setRejectionEdited(true)
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <StepHeading
        title="Introduce yourself to Gaudi Estimator"
        subtitle="We'll use this information to set up your account."
      />

      <div className="flex flex-col gap-5">
        {FIELDS.map((field) =>
          isFixed(field.key) ? (
            <Field key={field.key} id={field.key} label={field.label} error={errorFor(field.key)}>
              {/* A confirmed field's treatment, minus the Change button: there is no edit to offer. */}
              <div className="flex items-center gap-3 rounded-xs border border-border bg-muted/60 px-4 py-3">
                <Check className="size-4 shrink-0 text-primary" strokeWidth={3} aria-hidden="true" />
                {/* An input rather than a span, so the value is still part of the field. */}
                <input
                  id={field.key}
                  ref={(el) => {
                    inputs.current[field.key] = el
                  }}
                  type={field.type}
                  readOnly
                  autoComplete={field.autoComplete}
                  value={details[field.key]}
                  className="min-w-0 flex-1 truncate border-0 bg-transparent p-0 text-base text-foreground outline-none"
                  {...fieldAria(field.key, errorFor(field.key), FIXED_COMPANY_HINT)}
                />
              </div>
              <p id={`${field.key}-hint`} className="text-sm text-muted-foreground">
                {FIXED_COMPANY_HINT}
              </p>
            </Field>
          ) : isConfirmed(field.key) ? (
            <Field key={field.key} id={field.key} label={field.label} error={errorFor(field.key)}>
              <div className="flex items-center gap-3 rounded-xs border border-border bg-muted/60 px-4 py-3">
                <Check className="size-4 shrink-0 text-primary" strokeWidth={3} aria-hidden="true" />
                <span className="min-w-0 flex-1 truncate text-base text-foreground">
                  {details[field.key]}
                </span>
                <button
                  type="button"
                  onClick={() => unlock(field.key)}
                  className="shrink-0 rounded-full text-sm font-semibold text-primary underline underline-offset-4 transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  Change
                </button>
              </div>
            </Field>
          ) : (
            <Field key={field.key} id={field.key} label={field.label} required error={errorFor(field.key)}>
              <input
                id={field.key}
                ref={(el) => {
                  inputs.current[field.key] = el
                }}
                type={field.type}
                inputMode={field.inputMode}
                autoComplete={field.autoComplete}
                placeholder={field.placeholder}
                value={details[field.key]}
                onChange={(e) => update(field.key, e.target.value)}
                autoFocus={unlocked.includes(field.key)}
                className={inputClass}
                {...fieldAria(field.key, errorFor(field.key))}
              />
            </Field>
          ),
        )}

        <div className="flex flex-col gap-2 pt-1">
          <label htmlFor="terms" className="flex cursor-pointer items-start gap-3">
            <input
              id="terms"
              type="checkbox"
              checked={agreed}
              onChange={(e) => {
                setAgreed(e.target.checked)
                if (e.target.checked) setErrors((prev) => ({ ...prev, terms: undefined }))
              }}
              className="mt-0.5 size-5 shrink-0 cursor-pointer rounded-[6px] border-input accent-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              {...fieldAria("terms", errors.terms)}
            />
            <span className="text-sm leading-relaxed text-muted-foreground">
              I agree to Gaudi&apos;s{" "}
              <a
                href="/privacy"
                className="font-medium text-foreground underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </a>{" "}
              and to being contacted about my estimate.
              <span className="ml-0.5 text-primary" aria-hidden="true">
                *
              </span>
            </span>
          </label>
          {errors.terms && (
            <p id="terms-error" role="alert" className="text-sm font-medium text-destructive">
              {errors.terms}
            </p>
          )}
        </div>

        <div className="pt-1">
          <PrimaryButton type="submit" disabled={submitting || !agreed}>
            {submitting ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Setting you up
              </>
            ) : (
              <>
                Continue
                <ArrowRight className="size-4" />
              </>
            )}
          </PrimaryButton>
        </div>

        {submitError && (
          <div role="alert" className="rounded-xs border border-destructive/30 bg-destructive/5 px-4 py-3">
            <p className="text-sm text-foreground">{submitError}</p>
            {/* Quoting this back to support pins the failure to one server-side trace. */}
            {submitReference && (
              <p className="mt-1 text-xs text-muted-foreground">Reference: {submitReference}</p>
            )}
          </div>
        )}
      </div>
    </form>
  )
}
