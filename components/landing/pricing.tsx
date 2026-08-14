import { ArrowRight, Check } from "lucide-react"
import { cn } from "@/lib/utils"

type Plan = {
  tag: string
  role: string
  descriptor: string
  featured?: boolean
  // Price zone (parallel across all three cards)
  priceMain: string
  priceUnit: string
  priceNote: string
  features: string[]
  ctaLabel: string
  ctaHref: string
}

const plans: Plan[] = [
  {
    tag: "Self-serve",
    role: "General Contractors",
    descriptor: "Win more bids without hiring more estimators.",
    featured: true,
    priceMain: "$150",
    priceUnit: "per completed estimate",
    priceNote: "Your first 5 estimates are free",
    features: [
      "No subscription, seats, or contracts",
      "Edits and revisions included",
      "Client-ready, branded estimates",
    ],
    ctaLabel: "Get started",
    ctaHref: "#get-started",
  },
  {
    tag: "For estimating teams",
    role: "Estimators",
    descriptor: "Spend your day reviewing, not retyping.",
    priceMain: "Custom",
    priceUnit: "volume pricing",
    priceNote: "Scales with the work you take on",
    features: [
      "Every number traced to its source",
      "Bulk intake across active projects",
      "Priced for high-volume review",
    ],
    ctaLabel: "Contact sales",
    ctaHref: "#contact",
  },
  {
    tag: "For developers & owners",
    role: "Developers",
    descriptor: "Know your real costs before you commit.",
    priceMain: "Custom",
    priceUnit: "scoped to your pipeline",
    priceNote: "Built around how you underwrite",
    features: [
      "Independent, line-by-line cost checks",
      "Model scenarios before you break ground",
      "Benchmark bids against real costs",
    ],
    ctaLabel: "Contact sales",
    ctaHref: "#contact",
  },
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

        <div className="mt-14 grid items-stretch gap-6 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.role}
              className={cn(
                "relative flex flex-col rounded-3xl p-8 lg:p-10",
                plan.featured
                  ? "bg-section-dark text-section-dark-foreground shadow-2xl shadow-foreground/25 ring-1 ring-primary/40"
                  : "border border-border bg-card text-card-foreground",
              )}
            >
              {plan.featured && (
                <span className="absolute right-8 top-8 rounded-full bg-primary px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-primary-foreground shadow-sm">
                  Start free
                </span>
              )}

              <p
                className={cn(
                  "text-xs font-semibold uppercase tracking-wider",
                  plan.featured ? "text-primary" : "text-muted-foreground",
                )}
              >
                {plan.tag}
              </p>

              <h3 className="mt-3 font-sans text-2xl font-semibold tracking-tight">{plan.role}</h3>
              <p
                className={cn(
                  "mt-2 text-pretty leading-relaxed",
                  plan.featured ? "text-section-dark-foreground/70" : "text-muted-foreground",
                )}
              >
                {plan.descriptor}
              </p>

              {/* Price zone, parallel across all three cards */}
              <div
                className={cn(
                  "mt-8 border-t pt-8",
                  plan.featured ? "border-section-dark-foreground/15" : "border-border",
                )}
              >
                <div className="flex items-baseline gap-2">
                  <span className="font-sans text-5xl font-light tracking-[-0.02em] lg:text-6xl">{plan.priceMain}</span>
                  <span
                    className={cn(
                      "text-sm leading-tight",
                      plan.featured ? "text-section-dark-foreground/60" : "text-muted-foreground",
                    )}
                  >
                    {plan.priceUnit}
                  </span>
                </div>
                <p
                  className={cn(
                    "mt-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[13px] font-medium",
                    plan.featured ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground",
                  )}
                >
                  <Check className="size-3.5" aria-hidden="true" />
                  {plan.priceNote}
                </p>
              </div>

              {/* Feature list */}
              <ul className="mt-8 space-y-3.5">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="mt-0.5 size-[18px] shrink-0 text-primary" aria-hidden="true" />
                    <span
                      className={cn(
                        "text-[15px] leading-snug",
                        plan.featured ? "text-section-dark-foreground/85" : "text-foreground/80",
                      )}
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA pinned to the bottom so all cards align */}
              <a
                href={plan.ctaHref}
                className={cn(
                  "mt-10 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full px-6 text-sm font-semibold transition-all active:scale-[0.98] lg:mt-auto lg:pt-10",
                  plan.featured
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "border border-foreground/15 bg-transparent text-foreground hover:bg-secondary",
                )}
              >
                {plan.ctaLabel}
                {plan.featured && <ArrowRight className="size-4" aria-hidden="true" />}
              </a>
            </div>
          ))}
        </div>

        <p className="mx-auto mt-10 max-w-2xl text-center text-sm text-muted-foreground">
          Every plan includes the full Gaudi platform. You only ever pay for estimates you complete, no card required to
          start.
        </p>
      </div>
    </section>
  )
}
