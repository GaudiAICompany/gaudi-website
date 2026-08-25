import type React from "react"
import { ArrowLeft, Check, X } from "lucide-react"

import { GAUDI_HELP_EMAIL } from "@/lib/onboarding"

/**
 * The frame every signup screen sits in: a fixed value panel on the left and the
 * step itself on the right. Below `lg` the panel is dropped entirely -- on a
 * phone the step is the whole screen, and the four selling points move to a
 * single trust line under the fold so they cost one row instead of half a view.
 */

const VALUE_POINTS = [
  "Estimates in minutes, not days.",
  "No new software. Just send what you've got.",
  "Every line item, traceable and editable.",
  "$150 per estimate. First 5 free.",
]

function ValuePanel() {
  return (
    <aside className="relative isolate hidden overflow-hidden bg-section-dark text-section-dark-foreground lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col">
      {/* The reader's own desk: plans, a takeoff, and the estimate that comes back. */}
      <img
        src="/closing-desk.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover object-[62%_center] opacity-45"
      />
      {/* Weighted left so the copy keeps its contrast while the photo still reads
          on the right, and capped top and bottom to protect the logo and footer. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-section-dark via-section-dark/85 to-section-dark/45"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-section-dark/90 via-transparent to-section-dark/70"
      />

      <div className="relative flex flex-1 flex-col justify-between p-10 xl:p-14">
        <a href="/" className="inline-flex w-fit" aria-label="Gaudi AI home">
          <img src="/logo_text.png" alt="Gaudi AI" className="h-7 w-auto" />
        </a>

        <div className="py-10">
          <h1 className="max-w-md font-sans text-4xl font-light leading-[1.05] tracking-[-0.03em] xl:text-5xl">
            Get started with Gaudi{" "}
            <span className="font-serif font-medium italic text-primary">AI Estimator</span>
          </h1>

          <ul className="mt-10 flex max-w-md flex-col gap-5">
            {VALUE_POINTS.map((point) => (
              <li key={point} className="flex items-start gap-3.5">
                <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-primary">
                  <Check className="size-3.5 text-primary-foreground" strokeWidth={3} />
                </span>
                <span className="text-lg leading-snug text-section-dark-foreground/90">{point}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className="text-sm text-section-dark-foreground/60">
          Questions?{" "}
          <a
            href={`mailto:${GAUDI_HELP_EMAIL}`}
            className="font-medium text-section-dark-foreground underline underline-offset-4 transition-colors hover:text-primary"
          >
            {GAUDI_HELP_EMAIL}
          </a>
        </p>
      </div>
    </aside>
  )
}

function StepProgress({ current, total }: { current: number; total: number }) {
  return (
    <div
      role="progressbar"
      aria-valuenow={current}
      aria-valuemin={1}
      aria-valuemax={total}
      aria-label={`Step ${current} of ${total}`}
      className="h-2 w-full max-w-72 overflow-hidden rounded-full bg-secondary"
    >
      <div
        className="h-full rounded-full bg-primary transition-[width] duration-500 ease-out motion-reduce:transition-none"
        style={{ width: `${(current / total) * 100}%` }}
      />
    </div>
  )
}

export function OnboardingShell({
  current,
  total,
  onBack,
  children,
}: {
  current: number
  total: number
  /** Absent on the first step of the current device's path, which has nowhere to go back to. */
  onBack?: () => void
  children: React.ReactNode
}) {
  return (
    <div className="min-h-dvh bg-background lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
      <ValuePanel />

      <main className="flex min-h-dvh flex-col lg:min-h-dvh">
        <div className="px-5 pt-5 sm:px-8 lg:px-12 lg:pt-8 xl:px-20">
          {/* Mobile has no value panel, so the wordmark and the exit live here instead. */}
          <div className="mb-5 flex items-center justify-between lg:hidden">
            <a href="/" aria-label="Gaudi AI home">
              <img src="/logo_text.png" alt="Gaudi AI" className="h-6 w-auto" />
            </a>
            <a
              href="/"
              aria-label="Leave signup and go back to the homepage"
              className="-mr-2 inline-flex size-10 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              <X className="size-5" />
            </a>
          </div>

          <div className="flex items-center gap-4">
            {onBack ? (
              <button
                type="button"
                onClick={onBack}
                aria-label="Back to the previous step"
                className="-ml-2 inline-flex size-10 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <ArrowLeft className="size-5" />
              </button>
            ) : (
              <span aria-hidden="true" className="-ml-2 hidden size-10 shrink-0 lg:block" />
            )}
            <StepProgress current={current} total={total} />
          </div>
        </div>

        <div className="flex flex-1 flex-col justify-center px-5 py-8 sm:px-8 lg:px-12 lg:py-7 xl:px-20">
          <div className="w-full max-w-xl">{children}</div>
        </div>

        <p className="flex flex-wrap items-center gap-x-2 gap-y-1 px-5 pb-8 text-sm text-muted-foreground sm:px-8 lg:hidden">
          <span className="font-semibold text-foreground">First 5 estimates free</span>
          <span aria-hidden="true">&middot;</span>
          <span>then $150 each</span>
          <span aria-hidden="true">&middot;</span>
          <span>No credit card required</span>
        </p>
      </main>
    </div>
  )
}

/** Shared heading block so all three screens open at the same size and rhythm. */
export function StepHeading({ title, subtitle }: { title: string; subtitle?: React.ReactNode }) {
  return (
    <div className="mb-5">
      <h2 className="font-sans text-3xl font-light leading-[1.1] tracking-[-0.03em] text-foreground sm:text-4xl">
        {title}
      </h2>
      {subtitle && <p className="mt-3 text-base leading-relaxed text-muted-foreground">{subtitle}</p>}
    </div>
  )
}
