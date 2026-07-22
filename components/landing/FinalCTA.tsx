"use client"

import type React from "react"
import { useState } from "react"
import { ArrowRight, CheckCircle2 } from "lucide-react"

export default function FinalCTA({
  functionApiBase,
  functionApiKey,
}: {
  functionApiBase: string
  functionApiKey: string
}) {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    const payload = {
      email: String(data.get("email") || ""),
      firstName: String(data.get("firstName") || ""),
      lastName: String(data.get("lastName") || ""),
      company: String(data.get("company") || ""),
      message: String(data.get("message") || ""),
    }

    setLoading(true)
    try {
      const res = await fetch(`${functionApiBase}/api/capture_cta_email?code=${functionApiKey}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      if (!res.ok) {
        console.error("Contact submission failed", res.status)
        return
      }
      setSubmitted(true)
      form.reset()
    } catch (err) {
      console.error("Contact submission error", err)
    } finally {
      setLoading(false)
    }
  }

  const inputClass =
    "h-11 w-full rounded-md border border-border bg-background px-3 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-ring"

  return (
    <section id="contact" className="border-t border-border bg-secondary/40 py-20 md:py-28">
      <div className="mx-auto grid max-w-6xl items-start gap-12 px-6 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <div className="lg:sticky lg:top-28">
          <h2 className="text-pretty text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
            See what Gaudi can take off your team&apos;s plate.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Tell us about your projects and the workflows slowing you down. We&apos;ll show you where
            Gaudi fits in your back office.
          </p>
          <div className="mt-8 border-t border-border pt-6">
            <p className="text-sm text-muted-foreground">Prefer email? Reach us directly:</p>
            <a
              href="mailto:contact@heygaudi.ai"
              className="text-sm font-semibold text-primary hover:underline"
            >
              contact@heygaudi.ai
            </a>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-6 md:p-8">
          {submitted ? (
            <div
              className="flex flex-col items-center justify-center py-12 text-center"
              role="status"
              aria-live="polite"
            >
              <CheckCircle2 className="h-12 w-12 text-primary" />
              <h3 className="mt-4 text-xl font-semibold">Message sent</h3>
              <p className="mt-2 max-w-sm text-muted-foreground">
                Thanks for reaching out. Our team will get back to you shortly.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-6 rounded-md border border-border bg-background px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="firstName" className="mb-1.5 block text-sm font-medium">
                    First name
                  </label>
                  <input id="firstName" name="firstName" type="text" required className={inputClass} />
                </div>
                <div>
                  <label htmlFor="lastName" className="mb-1.5 block text-sm font-medium">
                    Last name
                  </label>
                  <input id="lastName" name="lastName" type="text" required className={inputClass} />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="mb-1.5 block text-sm font-medium">
                  Work email
                </label>
                <input id="email" name="email" type="email" required className={inputClass} />
              </div>
              <div>
                <label htmlFor="company" className="mb-1.5 block text-sm font-medium">
                  Company
                </label>
                <input id="company" name="company" type="text" required className={inputClass} />
              </div>
              <div>
                <label htmlFor="message" className="mb-1.5 block text-sm font-medium">
                  Which workflows are slowing you down?
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  placeholder="Estimating, bid leveling, proposals, document review, project updates…"
                  className="w-full resize-none rounded-md border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-primary focus:ring-2 focus:ring-ring"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-md bg-primary text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-70"
              >
                {loading ? "Sending…" : "Contact Us"}
                {!loading && <ArrowRight className="h-4 w-4" />}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
