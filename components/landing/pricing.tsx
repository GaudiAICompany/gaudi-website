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

export function Pricing() {
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

        {/* The 1.5fr vs 1fr width is the only signal of which plan is primary; the orange ring is hover/focus-only, never resting. */}
        <div className="mx-auto mt-14 grid max-w-5xl items-stretch gap-6 lg:grid-cols-[1.5fr_1fr]">
          <div className="group relative flex flex-col rounded-3xl border border-border bg-card p-8 text-card-foreground shadow-2xl shadow-foreground/10 ring-1 ring-transparent transition-all duration-200 hover:border-primary/40 hover:ring-primary/30 focus-within:border-primary/40 focus-within:ring-primary/30 lg:p-10">
            <p className="text-xs font-semibold uppercase tracking-wider text-primary">Self-serve</p>
            <h3 className="mt-3 font-sans text-2xl font-semibold tracking-tight">Pay per estimate</h3>

            <div className="mt-5 rounded-2xl bg-secondary/60 p-5">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Built for</p>
              <div className="mt-2.5 flex flex-wrap gap-2">
                {["General contractors", "Estimators", "Developers"].map((persona) => (
                  <span
                    key={persona}
                    className="rounded-full border border-border bg-card px-3 py-1.5 text-sm font-medium text-foreground"
                  >
                    {persona}
                  </span>
                ))}
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Start today, no sales call required.
              </p>
            </div>

            <div className="mt-8 border-t border-border pt-8">
              <div className="flex items-baseline gap-2">
                <span className="font-sans text-5xl font-light tracking-[-0.02em] lg:text-6xl">$150</span>
                <span className="text-sm leading-tight text-muted-foreground">per completed estimate</span>
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-x-2.5 gap-y-2">
                <span className="inline-flex items-center gap-2 rounded-full bg-primary px-3 py-1.5 text-[13px] font-medium text-primary-foreground">
                  <span className="text-xs font-bold uppercase tracking-wide">Start free</span>
                  <span className="text-primary-foreground/85">First 5 estimates</span>
                </span>
                <span className="text-[13px] text-muted-foreground">No credit card required</span>
              </div>
            </div>

            <ul className="mt-8 space-y-3.5">
              {primaryFeatures.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <Check className="mt-0.5 size-[18px] shrink-0 text-primary" aria-hidden="true" />
                  <span className="text-[15px] leading-snug text-foreground/85">{feature}</span>
                </li>
              ))}
            </ul>

            {/* Inline email+submit so self-serve signup is one step, not a click-through to a separate form. */}
            <div className="mt-8 lg:mt-auto lg:pt-8">
              <ConversionForm buttonLabel="Get started" tone="light" />
            </div>
          </div>

          <div className="group relative flex flex-col rounded-3xl border border-border bg-card p-8 text-card-foreground shadow-2xl shadow-foreground/10 ring-1 ring-transparent transition-all duration-200 hover:border-primary/40 hover:ring-primary/30 focus-within:border-primary/40 focus-within:ring-primary/30 lg:p-10">
            <p className="text-xs font-semibold uppercase tracking-wider text-primary">Larger teams</p>
            <h3 className="mt-3 font-sans text-2xl font-semibold tracking-tight">Enterprise</h3>

            <div className="mt-5 rounded-2xl bg-secondary/60 p-5">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Built for</p>
              <div className="mt-2.5 flex flex-wrap gap-2">
                {["High-volume teams", "Custom plans"].map((persona) => (
                  <span
                    key={persona}
                    className="rounded-full border border-border bg-card px-3 py-1.5 text-sm font-medium text-foreground"
                  >
                    {persona}
                  </span>
                ))}
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Scoped to your volume and workflow.
              </p>
            </div>

            <div className="mt-8 border-t border-border pt-8">
              <div className="flex items-baseline gap-2">
                <span className="font-sans text-5xl font-light tracking-[-0.02em] lg:text-6xl">Custom</span>
                <span className="text-sm leading-tight text-muted-foreground">pricing</span>
              </div>
              <p className="mt-4 text-[13px] text-muted-foreground">Talk through pricing and volume.</p>
            </div>

            <ul className="mt-8 space-y-3.5">
              {customFeatures.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <Check className="mt-0.5 size-[18px] shrink-0 text-primary" aria-hidden="true" />
                  <span className="text-[15px] leading-snug text-foreground/85">{feature}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 lg:mt-auto lg:pt-8">
              <a
                href="#contact"
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full border border-foreground/15 bg-transparent px-6 text-sm font-semibold text-foreground transition-all hover:bg-secondary active:scale-[0.98]"
              >
                Contact sales
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
