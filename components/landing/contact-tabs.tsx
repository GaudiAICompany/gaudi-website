"use client"

import type React from "react"
import { useState } from "react"
import { ArrowRight, CalendarDays, MessageSquare } from "lucide-react"

type Mode = "call" | "message"

// Embed params theme the Calendly widget to the Gaudi espresso/orange palette.
const CALENDLY_URL =
  "https://calendly.com/begumcital/gaudi-ai-intro-call-website?back=1&month=2026-08" +
  "&hide_gdpr_banner=1&background_color=201a16&text_color=f5f1ec&primary_color=c35a25"

const CONTACT_EMAIL = "contact@heygaudi.ai"

export function ContactTabs() {
  const [mode, setMode] = useState<Mode>("call")

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [company, setCompany] = useState("")
  const [message, setMessage] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const subject = `New inquiry from ${firstName} ${lastName}`.trim()
    const body = [
      `Name: ${firstName} ${lastName}`.trim(),
      `Email: ${email}`,
      `Company: ${company}`,
      "",
      "How can we help?",
      message,
    ].join("\n")
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`
  }

  const inputClasses =
    "h-12 w-full rounded-xl border border-section-dark-foreground/15 bg-section-dark-foreground/[0.06] px-4 text-base text-section-dark-foreground outline-none transition-colors placeholder:text-section-dark-foreground/45 focus:border-primary/60"

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col items-center">
      <div
        role="tablist"
        aria-label="Contact options"
        className="inline-flex items-center gap-1 rounded-full border border-border bg-card p-1"
      >
        <button
          role="tab"
          aria-selected={mode === "call"}
          onClick={() => setMode("call")}
          className={`inline-flex h-10 items-center gap-2 rounded-full px-5 text-sm font-semibold transition-colors ${
            mode === "call"
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <CalendarDays className="size-4" />
          Book a call
        </button>
        <button
          role="tab"
          aria-selected={mode === "message"}
          onClick={() => setMode("message")}
          className={`inline-flex h-10 items-center gap-2 rounded-full px-5 text-sm font-semibold transition-colors ${
            mode === "message"
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <MessageSquare className="size-4" />
          Send a message
        </button>
      </div>

      <div className="mt-8 w-full overflow-hidden rounded-3xl border border-border bg-section-dark p-4 sm:p-6">
        {mode === "call" ? (
          <div className="overflow-hidden rounded-2xl bg-section-dark">
            <iframe
              title="Book a call with Gaudi AI"
              src={CALENDLY_URL}
              className="h-[640px] w-full border-0 sm:h-[720px]"
              loading="lazy"
            />
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-1 sm:p-2">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="firstName" className="sr-only">
                  First Name
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  autoComplete="given-name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="First Name"
                  className={inputClasses}
                  required
                />
              </div>
              <div>
                <label htmlFor="lastName" className="sr-only">
                  Last Name
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  autoComplete="family-name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Last Name"
                  className={inputClasses}
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                className={inputClasses}
                required
              />
            </div>

            <div>
              <label htmlFor="company" className="sr-only">
                Company Name
              </label>
              <input
                id="company"
                name="company"
                autoComplete="organization"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Company Name"
                className={inputClasses}
              />
            </div>

            <div>
              <label htmlFor="message" className="sr-only">
                How can we help?
              </label>
              <textarea
                id="message"
                name="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="How can we help?"
                rows={4}
                className="w-full rounded-xl border border-section-dark-foreground/15 bg-section-dark-foreground/[0.06] px-4 py-3 text-base text-section-dark-foreground outline-none transition-colors placeholder:text-section-dark-foreground/45 focus:border-primary/60"
                required
              />
            </div>

            <button
              type="submit"
              className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 font-semibold text-primary-foreground transition-all hover:bg-primary/90 active:scale-[0.99]"
            >
              Get in Touch
              <ArrowRight className="size-4" />
            </button>
          </form>
        )}
      </div>

      <div className="mt-10 w-full border-t border-border pt-8 text-center">
        <p className="text-sm text-muted-foreground">More Questions? Reach out directly:</p>
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="mt-2 inline-block text-sm font-medium text-primary transition-colors hover:text-primary/80"
        >
          {CONTACT_EMAIL}
        </a>
      </div>
    </div>
  )
}
