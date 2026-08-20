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
    <section
      id="pricing"
      className="flex min-h-[100svh] flex-col justify-center px-4 py-[clamp(1rem,4vh,5rem)] sm:px-6"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-[clamp(0.5rem,1.5vh,1rem)] text-sm font-semibold uppercase tracking-wider text-primary">
            Pricing
          </p>
          <h2 className="text-balance font-sans text-[clamp(1.75rem,min(4.5vw,7vh),3.75rem)] font-light leading-[0.98] tracking-[-0.03em] text-foreground">
            Pay for what you use.{" "}
            <span className="font-serif text-[1.05em] font-medium italic text-primary">Nothing else.</span>
          </h2>
          <p className="mx-auto mt-[clamp(0.75rem,2vh,1.25rem)] max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
            No subscriptions, no seats, no contracts.
          </p>
        </div>

        <div className="mx-auto mt-[clamp(1.5rem,4vh,2.5rem)] grid max-w-5xl items-stretch justify-center gap-6 lg:grid-cols-2">
          {/* Primary, self-serve card */}
          <div className="group relative flex flex-col rounded-3xl border border-border bg-card p-[clamp(1.5rem,3vw,2.5rem)] text-card-foreground shadow-2xl shadow-foreground/10 ring-1 ring-transparent transition-all duration-200 hover:border-primary/40 hover:ring-primary/30 focus-within:border-primary/40 focus-within:ring-primary/30">
            <p className="text-xs font-semibold uppercase tracking-wider text-primary">Pay per estimate</p>
            <h3 className="mt-3 font-sans text-2xl font-semibold tracking-tight">GCs, Estimators, Developers</h3>

            {/* Price zone */}
            <div className="mt-[clamp(1rem,2.5vh,1.5rem)] border-t border-border pt-[clamp(1rem,2.5vh,1.5rem)]">
              <div className="flex items-baseline gap-2">
                <span className="font-sans text-[clamp(2.25rem,min(5vw,6vh),3.75rem)] font-light tracking-[-0.02em]">$150</span>
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

            {/* Feature list */}
            <ul className="mt-[clamp(1rem,2.5vh,1.5rem)] space-y-[clamp(0.5rem,1.5vh,0.75rem)]">
              {primaryFeatures.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <Check className="mt-0.5 size-[18px] shrink-0 text-primary" aria-hidden="true" />
                  <span className="text-[15px] leading-snug text-foreground/85">{feature}</span>
                </li>
              ))}
            </ul>

            {/* Inline email+submit so self-serve signup is one step, not a click-through to a separate form. */}
            <div className="mt-[clamp(1rem,2.5vh,1.5rem)] lg:mt-auto lg:pt-6">
              <ConversionForm buttonLabel="Get started" tone="light" />
            </div>
          </div>

          {/* Secondary, custom card */}
          <div className="group relative flex flex-col rounded-3xl border border-border bg-card p-[clamp(1.5rem,3vw,2.5rem)] text-card-foreground shadow-2xl shadow-foreground/10 ring-1 ring-transparent transition-all duration-200 hover:border-primary/40 hover:ring-primary/30 focus-within:border-primary/40 focus-within:ring-primary/30">
            <p className="text-xs font-semibold uppercase tracking-wider text-primary">Custom needs</p>
            <h3 className="mt-3 font-sans text-2xl font-semibold tracking-tight">Enterprise</h3>

            {/* Price zone — mirrors the self-serve card's price zone position */}
            <div className="mt-[clamp(1rem,2.5vh,1.5rem)] border-t border-border pt-[clamp(1rem,2.5vh,1.5rem)]">
              <div className="flex items-baseline gap-2">
                <span className="font-sans text-[clamp(2.25rem,min(5vw,6vh),3.75rem)] font-light tracking-[-0.02em]">Custom</span>
                <span className="text-sm leading-tight text-muted-foreground">pricing</span>
              </div>
              <p className="mt-4 text-[13px] text-muted-foreground">Talk through pricing and volume.</p>
            </div>

            {/* Feature list */}
            <ul className="mt-[clamp(1rem,2.5vh,1.5rem)] space-y-[clamp(0.5rem,1.5vh,0.75rem)]">
              {customFeatures.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <Check className="mt-0.5 size-[18px] shrink-0 text-primary" aria-hidden="true" />
                  <span className="text-[15px] leading-snug text-foreground/85">{feature}</span>
                </li>
              ))}
            </ul>

            {/* CTA area builds toward Contact sales as the clear next action */}
            <div className="mt-[clamp(1rem,2.5vh,1.5rem)] lg:mt-auto lg:pt-6">
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
