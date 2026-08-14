import { Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { ConversionForm } from "./conversion-form"

const primaryFeatures = [
  "No subscription, seats, or contracts",
  "Edits and revisions included",
  "Every number traced to its source",
]

const customFeatures = [
  "Volume pricing across active projects",
  "Dedicated onboarding and support",
  "Custom workflows and integrations",
]

export function Pricing({ apiBase, apiKey }: { apiBase: string; apiKey: string }) {
  return (
    <section id="pricing" className="px-4 py-20 sm:px-6 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-primary">Pricing</p>
          <h2 className="text-balance font-sans text-4xl font-light leading-[0.98] tracking-[-0.03em] text-foreground sm:text-5xl lg:text-6xl">
            Pay for what you use.{" "}
            <span className="font-serif text-[1.05em] font-medium italic text-primary">Nothing else.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
            No subscriptions, no seats, no contracts. You pay per completed estimate, whether you run one a month or a
            hundred.
          </p>
        </div>

        <div className="mx-auto mt-14 grid max-w-5xl items-stretch gap-6 lg:grid-cols-[1.35fr_1fr]">
          {/* Primary, self-serve card */}
          <div className="relative flex flex-col rounded-3xl bg-section-dark p-8 text-section-dark-foreground shadow-2xl shadow-foreground/25 ring-1 ring-primary/40 lg:p-10">
            <span className="absolute right-8 top-8 rounded-full bg-primary px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-primary-foreground shadow-sm">
              Start free
            </span>

            <p className="text-xs font-semibold uppercase tracking-wider text-primary">Self-serve</p>
            <h3 className="mt-3 font-sans text-2xl font-semibold tracking-tight">Pay per estimate</h3>
            <p className="mt-2 max-w-sm text-pretty leading-relaxed text-section-dark-foreground/70">
              For general contractors, estimators, and developers. Start today, no sales call required.
            </p>

            {/* Price zone */}
            <div className="mt-8 border-t border-section-dark-foreground/15 pt-8">
              <div className="flex items-baseline gap-2">
                <span className="font-sans text-5xl font-light tracking-[-0.02em] lg:text-6xl">$150</span>
                <span className="text-sm leading-tight text-section-dark-foreground/60">per completed estimate</span>
              </div>
              <p className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1.5 text-[13px] font-medium text-primary-foreground">
                <Check className="size-3.5" aria-hidden="true" />
                Your first 5 estimates are free
              </p>
            </div>

            {/* Feature list */}
            <ul className="mt-8 space-y-3.5">
              {primaryFeatures.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <Check className="mt-0.5 size-[18px] shrink-0 text-primary" aria-hidden="true" />
                  <span className="text-[15px] leading-snug text-section-dark-foreground/85">{feature}</span>
                </li>
              ))}
            </ul>

            {/* Inline conversion row: email + Get started in one step */}
            <div className="mt-8 lg:mt-auto lg:pt-8">
              <ConversionForm apiBase={apiBase} apiKey={apiKey} buttonLabel="Get started" tone="dark" />
              <p className="mt-3 px-2 text-[13px] text-section-dark-foreground/55">No credit card required.</p>
            </div>
          </div>

          {/* Secondary, custom card */}
          <div className="flex flex-col rounded-3xl border border-border bg-card p-8 text-card-foreground lg:p-10">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">For larger teams</p>
            <h3 className="mt-3 font-sans text-2xl font-semibold tracking-tight">Custom</h3>
            <p className="mt-2 max-w-sm text-pretty leading-relaxed text-muted-foreground">
              For teams that need high-volume or custom plans.
            </p>

            {/* Price zone */}
            <div className="mt-8 border-t border-border pt-8">
              <div className="flex items-baseline gap-2">
                <span className="font-sans text-5xl font-light tracking-[-0.02em] lg:text-6xl">Custom</span>
              </div>
              <p className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1.5 text-[13px] font-medium text-secondary-foreground">
                <Check className="size-3.5" aria-hidden="true" />
                Scoped to your volume
              </p>
            </div>

            {/* Feature list */}
            <ul className="mt-8 space-y-3.5">
              {customFeatures.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <Check className="mt-0.5 size-[18px] shrink-0 text-primary" aria-hidden="true" />
                  <span className="text-[15px] leading-snug text-foreground/80">{feature}</span>
                </li>
              ))}
            </ul>

            <a
              href="#contact"
              className="mt-10 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full border border-foreground/15 bg-transparent px-6 text-sm font-semibold text-foreground transition-all hover:bg-secondary active:scale-[0.98] lg:mt-auto"
            >
              Contact sales
            </a>
          </div>
        </div>

        <p className="mx-auto mt-10 max-w-2xl text-center text-sm text-muted-foreground">
          Both plans include the full Gaudi platform. You only ever pay for estimates you complete, no card required to
          start.
        </p>
      </div>
    </section>
  )
}
