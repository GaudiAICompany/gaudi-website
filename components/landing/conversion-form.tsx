"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { ArrowRight, Check, Loader2 } from "lucide-react"

import { captureLead, traceableRequestId } from "@/lib/capture-lead"

type Status = "idle" | "loading" | "success" | "error"

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
  const inputRef = useRef<HTMLInputElement>(null)

  // Responsive placeholder swap (not user-toggled): Email on desktop, Phone number on mobile.
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)")
    const update = () => setIsMobile(mq.matches)
    update()
    mq.addEventListener("change", update)
    return () => mq.removeEventListener("change", update)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!value.trim() || status === "loading") return
    setStatus("loading")

    const payload = isMobile ? { phone: value, source: buttonLabel } : { email: value, source: buttonLabel }

    const result = await captureLead(payload)
    setRequestId(traceableRequestId(result))
    if (result.ok) {
      setStatus("success")
      setValue("")
      return
    }
    setStatus("error")
  }

  const dark = tone === "dark"

  if (status === "success") {
    return (
      <div
        role="status"
        aria-live="polite"
        className={`flex items-center gap-3 rounded-2xl border px-5 py-4 text-left ${
          dark
            ? "border-section-dark-foreground/20 bg-section-dark-foreground/5 text-section-dark-foreground"
            : "border-primary/30 bg-primary/10 text-foreground"
        } ${className}`}
      >
        <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <Check className="size-4" />
        </span>
        <p className="text-sm leading-relaxed">
          You&apos;re in. I&apos;ll reach out with your first estimate. Check your inbox for next steps.
        </p>
      </div>
    )
  }

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
          disabled={status === "loading"}
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
