"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowRight, Loader2 } from "lucide-react"

import { captureLead, traceableRequestId } from "@/lib/capture-lead"
import { checkContact, type ContactCheck } from "@/lib/check-contact"
import { rejectionForTakenContact, writeCtaHandoff } from "@/lib/onboarding"

// Success is not a state here any more: a captured lead continues on /get-started.
type Status = "idle" | "loading" | "error"

/** The shape the signup screen validates too: no point asking the backend about "dana@". */
const PLAUSIBLE_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

/** Long enough that typing an address end to end costs one check, not a dozen. */
const CONTACT_CHECK_DEBOUNCE_MS = 600

// Shared trust row that sits directly beneath a ConversionForm pill:
// FREE pill · First 5 estimates | then $150 each | ✓ No credit card required.
export function CtaTrustRow({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-section-dark-foreground/70 ${className}`}
    >
      <span className="inline-flex items-center gap-2 whitespace-nowrap font-semibold text-section-dark-foreground">
        <span className="rounded-full bg-primary px-2 py-0.5 text-xs font-bold uppercase tracking-wide text-primary-foreground">
          Free
        </span>
        First 5 estimates
      </span>
      <span className="hidden h-4 w-px bg-section-dark-foreground/25 sm:block" />
      <span className="whitespace-nowrap">then $150 each</span>
      <span className="hidden h-4 w-px bg-section-dark-foreground/25 sm:block" />
      <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
        <svg viewBox="0 0 20 20" className="size-4 text-primary" fill="currentColor" aria-hidden="true">
          <path
            fillRule="evenodd"
            d="M16.7 5.3a1 1 0 0 1 0 1.4l-7.5 7.5a1 1 0 0 1-1.4 0L3.3 9.7a1 1 0 1 1 1.4-1.4l3.3 3.29 6.8-6.8a1 1 0 0 1 1.4 0Z"
            clipRule="evenodd"
          />
        </svg>
        No credit card required
      </span>
    </div>
  )
}

export function ConversionForm({
  buttonLabel = "Get started",
  tone = "light",
  className = "",
}: {
  buttonLabel?: string
  tone?: "light" | "dark"
  className?: string
}) {
  const [value, setValue] = useState("")
  const [status, setStatus] = useState<Status>("idle")
  const [requestId, setRequestId] = useState<string | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  // Paired with the address it answered about: the message shows only while the field still
  // holds that address, so an edit hides it without spending another request.
  const [taken, setTaken] = useState<{ email: string; message: string } | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  // The address the last check asked about, so a slow answer for an edited one cannot land.
  const checkedEmail = useRef("")
  // Kept so the submit can await it, and so it joins the request already in flight rather than
  // spending a second one against the per-IP budget.
  const inFlight = useRef<{ email: string; answer: Promise<ContactCheck> } | null>(null)
  const router = useRouter()

  const normalized = value.trim().toLowerCase()
  const takenMessage = taken && taken.email === normalized ? taken.message : null

  // Responsive placeholder swap (not user-toggled): Email on desktop, Phone number on mobile.
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)")
    const update = () => setIsMobile(mq.matches)
    update()
    mq.addEventListener("change", update)
    return () => mq.removeEventListener("change", update)
  }, [])

  // Asks, while they are still on the address, what the signup would otherwise only answer at
  // the end of its form. Desktop only: mobile collects a number, not an address, and a number
  // already on an account is still caught by the signup's own 409.
  useEffect(() => {
    if (isMobile) return
    if (!PLAUSIBLE_EMAIL.test(normalized)) {
      checkedEmail.current = ""
      return
    }
    if (normalized === checkedEmail.current) return

    const email = normalized
    const timer = setTimeout(() => {
      askAbout(email).then((result) => {
        if (checkedEmail.current !== email) return
        const rejected = rejectionForTakenContact(result.contactTaken)
        setTaken(rejected ? { email, message: rejected.message } : null)
      })
    }, CONTACT_CHECK_DEBOUNCE_MS)
    return () => clearTimeout(timer)
    // askAbout only reads refs, so it is stable across renders and not a dependency.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [normalized, isMobile])

  /** The one check for *email*, started if nobody has started it yet. Never rejects. */
  const askAbout = (email: string): Promise<ContactCheck> => {
    if (inFlight.current?.email === email) return inFlight.current.answer
    checkedEmail.current = email
    const answer = checkContact(email)
    inFlight.current = { email, answer }
    return answer
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!value.trim() || status === "loading") return
    // Already a client: the signup would only end in the same refusal.
    if (takenMessage) return
    setStatus("loading")

    // Pressing the button is exactly how someone beats the debounce, so the guard above only
    // holds if the submit awaits the answer rather than reading the state. Fails open, so an
    // unreachable check leaves this carrying on as it always did.
    if (!isMobile && PLAUSIBLE_EMAIL.test(normalized)) {
      const rejected = rejectionForTakenContact((await askAbout(normalized)).contactTaken)
      if (rejected) {
        setTaken({ email: normalized, message: rejected.message })
        setStatus("idle")
        return
      }
    }

    const payload = isMobile ? { phone: value, source: buttonLabel } : { email: value, source: buttonLabel }

    // Capture first so a visitor who abandons the flow is still a lead, then hand
    // the same value to /get-started so nobody types their address twice.
    const result = await captureLead(payload)
    setRequestId(traceableRequestId(result))
    if (result.ok) {
      writeCtaHandoff(isMobile ? { phone: value.trim() } : { email: value.trim() })
      router.push("/get-started")
      return
    }
    setStatus("error")
  }

  const dark = tone === "dark"

  return (
    <form onSubmit={handleSubmit} className={`w-full ${className}`} noValidate>
      <div
        className={`flex flex-col gap-2 rounded-2xl border p-2 sm:flex-row sm:items-center sm:rounded-full ${
          dark
            ? "border-section-dark-foreground/20 bg-section-dark-foreground/[0.06]"
            : "border-border bg-card shadow-sm"
        }`}
      >
        <label htmlFor={`conv-${buttonLabel}`} className="sr-only">
          {isMobile ? "Phone number" : "Email"}
        </label>
        <input
          id={`conv-${buttonLabel}`}
          ref={inputRef}
          type={isMobile ? "tel" : "email"}
          inputMode={isMobile ? "tel" : "email"}
          autoComplete={isMobile ? "tel" : "email"}
          value={value}
          onChange={(e) => {
            setValue(e.target.value)
            if (status === "error") setStatus("idle")
          }}
          placeholder={isMobile ? "Phone number" : "Email"}
          className={`h-12 w-full flex-1 rounded-full bg-transparent px-5 text-base outline-none ${
            dark
              ? "text-section-dark-foreground placeholder:text-section-dark-foreground/50"
              : "text-foreground placeholder:text-muted-foreground"
          }`}
          required
        />
        <button
          type="submit"
          disabled={status === "loading" || takenMessage !== null}
          className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-primary px-6 font-semibold text-primary-foreground transition-all hover:bg-primary/90 active:scale-[0.98] disabled:opacity-70"
        >
          {status === "loading" ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Sending
            </>
          ) : (
            <>
              {buttonLabel}
              <ArrowRight className="size-4" />
            </>
          )}
        </button>
      </div>
      {takenMessage && (
        <div className="mt-2 px-2" role="alert">
          <p className="text-sm text-primary">{takenMessage}</p>
        </div>
      )}
      {status === "error" && (
        <div className="mt-2 px-2" role="alert">
          <p className="text-sm text-primary">
            That didn&apos;t go through on my end. Try again, or email contact@heygaudi.ai and I&apos;ll run it for you.
          </p>
          {/* Quoting this back to support pins the failure to one server-side trace. */}
          {requestId && (
            <p className="mt-1 text-xs opacity-60">Reference: {requestId}</p>
          )}
        </div>
      )}
    </form>
  )
}
