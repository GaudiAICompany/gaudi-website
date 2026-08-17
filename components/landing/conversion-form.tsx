"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { ArrowRight, Check, Loader2 } from "lucide-react"

type Status = "idle" | "loading" | "success" | "error"

export function ConversionForm({
  apiBase,
  apiKey,
  buttonLabel = "Get started",
  tone = "light",
  className = "",
}: {
  apiBase: string
  apiKey: string
  buttonLabel?: string
  tone?: "light" | "dark"
  className?: string
}) {
  const [value, setValue] = useState("")
  const [status, setStatus] = useState<Status>("idle")
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

    // The capture_cta_email endpoint expects a lead record with an `email`
    // field (plus firstName/lastName/company/message). Previously this form
    // sent `{ email, source }` or, on mobile, `{ phone, source }` with no
    // `email` at all, which the endpoint rejected -> status "error".
    const trimmed = value.trim()
    const payload = {
      email: isMobile ? "" : trimmed,
      phone: isMobile ? trimmed : "",
      firstName: "",
      lastName: "",
      company: "Landing CTA",
      message: `CTA submission from "${buttonLabel}"`,
      source: buttonLabel,
    }

    const url = `${apiBase}/api/capture_cta_email?code=${apiKey}`

    console.log("[v0] conversion submit start", {
      hasApiBase: Boolean(apiBase),
      hasApiKey: Boolean(apiKey),
      isMobile,
      url,
      payload,
    })

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      console.log("[v0] conversion submit response", { ok: res.ok, status: res.status })

      if (!res.ok) {
        const body = await res.text().catch(() => "")
        console.error("[v0] conversion submit non-ok", { status: res.status, body })
        throw new Error(`Request failed with status ${res.status}`)
      }

      console.log("[v0] conversion submit success")
      setStatus("success")
      setValue("")
    } catch (err) {
      console.error("[v0] conversion submit failed", err)
      setStatus("error")
    }
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
        <p className="mt-2 px-2 text-sm text-primary" role="alert">
          That didn&apos;t go through on my end. Try again, or email contact@heygaudi.ai and I&apos;ll run it for you.
        </p>
      )}
    </form>
  )
}
