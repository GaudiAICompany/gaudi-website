"use client"

import { useEffect, useState } from "react"
import { AlertTriangle, Check, ExternalLink, Loader2, Mail } from "lucide-react"

import { StepHeading } from "./onboarding-shell"

/** Deep links land on the inbox; a filter for the sender is more help than the inbox root. */
const MAIL_APPS = [
  { name: "Gmail", href: "https://mail.google.com/mail/u/0/#search/from%3Aheygaudi.ai" },
  { name: "Outlook", href: "https://outlook.live.com/mail/0/inbox" },
]

const RESEND_COOLDOWN_SECONDS = 30

/** Only shown to someone who has not sent a plan set yet, which is the mobile path. */
const HOW_IT_WORKS = [
  {
    title: "Send us your project",
    body: "Email or text us your blueprint, notes, or a photo of anything handwritten. Any format works.",
  },
  {
    title: "We build your estimate",
    body: "Your dedicated Gaudi Estimator turns it into a full estimate, priced to your region.",
  },
  {
    title: "Check it and go",
    body: "You'll get a notification when it's ready. Review it, request edits, or send it straight to your client.",
  },
]

type BlueprintOutcome = "none" | "sent" | "failed"

export function StepCheckEmail({
  mailbox,
  blueprintOutcome,
  onResend,
}: {
  mailbox: string
  blueprintOutcome: BlueprintOutcome
  onResend: () => Promise<void>
}) {
  const [cooldown, setCooldown] = useState(0)
  const [resending, setResending] = useState(false)
  const [resent, setResent] = useState(false)

  useEffect(() => {
    if (cooldown <= 0) return
    const id = setTimeout(() => setCooldown((s) => s - 1), 1000)
    return () => clearTimeout(id)
  }, [cooldown])

  const handleResend = async () => {
    if (resending || cooldown > 0) return
    setResending(true)
    await onResend()
    setResending(false)
    setResent(true)
    setCooldown(RESEND_COOLDOWN_SECONDS)
  }

  return (
    <div>
      <span className="mb-6 inline-flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary">
        <Mail className="size-7" />
      </span>

      <StepHeading
        title="Check your email"
        subtitle={
          <>
            Look for an email from{" "}
            <span className="font-semibold text-foreground">{mailbox}</span>, your dedicated Gaudi
            Estimator.
          </>
        }
      />

      <div className="flex flex-col gap-3 sm:flex-row">
        {MAIL_APPS.map((app) => (
          <a
            key={app.name}
            href={app.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-13 flex-1 items-center justify-center gap-2 rounded-full border border-border bg-card px-6 text-base font-semibold text-foreground transition-colors hover:border-primary/60 hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Open {app.name}
            <ExternalLink className="size-4 text-muted-foreground" aria-hidden="true" />
          </a>
        ))}
      </div>

      <p className="mt-5 text-sm text-muted-foreground" aria-live="polite">
        {resent && cooldown > 0 ? (
          <>Sent again. Give it a minute, then check spam if it still isn&apos;t there.</>
        ) : (
          <>
            No email yet? Check spam, or{" "}
            <button
              type="button"
              onClick={handleResend}
              disabled={resending}
              className="inline-flex items-center gap-1.5 font-semibold text-primary underline underline-offset-4 transition-opacity hover:opacity-80 disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {resending && <Loader2 className="size-3.5 animate-spin" />}
              we can resend it
            </button>
            .
          </>
        )}
      </p>

      {blueprintOutcome === "sent" && (
        <div className="mt-8 flex items-start gap-3 rounded-xl border border-primary/25 bg-primary/5 px-5 py-4">
          <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-primary">
            <Check className="size-3.5 text-primary-foreground" strokeWidth={3} />
          </span>
          <p className="text-sm leading-relaxed text-foreground">
            <span className="font-semibold">Your blueprint is in the queue.</span> Pricing starts now.
            The email has the link to your estimate.
          </p>
        </div>
      )}

      {blueprintOutcome === "failed" && (
        <div className="mt-8 flex items-start gap-3 rounded-xl border border-border bg-muted/60 px-5 py-4">
          <AlertTriangle className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
          <p className="text-sm leading-relaxed text-foreground">
            <span className="font-semibold">Your blueprint didn&apos;t go through on my end.</span>{" "}
            Forward it to{" "}
            <a
              href={`mailto:${mailbox}`}
              className="font-medium underline underline-offset-4 hover:text-primary"
            >
              {mailbox}
            </a>{" "}
            and I&apos;ll pick it up from there.
          </p>
        </div>
      )}

      {blueprintOutcome === "none" && (
        <div className="mt-10 border-t border-border pt-8">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            How Gaudi Estimator works
          </h3>
          <ol className="mt-5 flex flex-col gap-5">
            {HOW_IT_WORKS.map((step, index) => (
              <li key={step.title} className="flex gap-4">
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-secondary text-sm font-semibold text-foreground">
                  {index + 1}
                </span>
                <span>
                  <span className="block text-base font-semibold text-foreground">{step.title}</span>
                  <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">
                    {step.body}
                  </span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  )
}
