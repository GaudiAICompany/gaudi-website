import { HardHat, Ruler, Building2, ArrowRight, Check } from "lucide-react"
import { cn } from "@/lib/utils"

type Plan = {
  icon: React.ComponentType<{ className?: string }>
  role: string
  descriptor: string
  featured?: boolean
  // Price zone
  price?: string
  priceUnit?: string
  priceNote?: string
  priceLabel?: string
  // CTA
  ctaLabel: string
  ctaHref: string
}

const plans: Plan[] = [
  {
    icon: HardHat,
    role: "General Contractors",
    descriptor: "Win more bids without hiring more estimators.",
    featured: true,
    price: "$150",
    priceUnit: "per estimate",
    priceNote: "First 5 estimates free",
    ctaLabel: "Get started",
    ctaHref: "#hero",
  },
  {
    icon: Ruler,
    role: "Estimators",
    descriptor: "Spend your day reviewing, not retyping.",
    priceLabel: "Custom pricing",
    ctaLabel: "Contact sales",
    ctaHref: "#contact",
  },
  {
    icon: Building2,
    role: "Developers",
    descriptor: "Know your real costs before you commit.",
    priceLabel: "Custom pricing",
    ctaLabel: "Contact sales",
    ctaHref: "#contact",
  },
]

export function Pricing() {
  return (
    <section id="pricing" className="px-4 py-20 sm:px-6 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-primary">Pricing</p>
          <h2 className="text-balance font-sans text-4xl font-light leading-[0.98] tracking-[-0.03em] text-foreground sm:text-5xl lg:text-6xl">
            Pay for what you use. <span className="font-serif text-[1.05em] font-medium italic text-primary">Nothing else.</span>
          </h2>
          <p className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
            No subscriptions, no seats, no contracts. You pay per completed estimate, whether you run one a month or a
            hundred.
          </p>
        </div>

        <div className="mt-12 grid items-start gap-5 md:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.role}
              className={cn(
                "relative flex h-full flex-col rounded-3xl border p-8 transition-colors",
                plan.featured
                  ? "border-primary/40 bg-card shadow-xl shadow-foreground/5 ring-1 ring-primary/30"
                  : "border-border bg-card hover:bg-secondary/40",
              )}
            >
              {plan.featured && (
                <span className="absolute right-6 top-6 rounded-full bg-primary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-primary">
                  Self-serve
                </span>
              )}

              <span
                className={cn(
                  "flex size-12 items-center justify-center rounded-2xl",
                  plan.featured ? "bg-primary text-primary-foreground" : "bg-secondary text-primary",
                )}
              >
                <plan.icon className="size-6" />
              </span>

              <h3 className="mt-6 font-sans text-xl font-semibold text-foreground">{plan.role}</h3>
              <p className="mt-2 text-pretty leading-relaxed text-muted-foreground">{plan.descriptor}</p>

              {/* Price zone, parallel across all three cards */}
              <div className="mt-8 border-t border-border pt-6">
                {plan.price ? (
                  <>
                    <div className="flex items-baseline gap-2">
                      <span className="font-sans text-4xl font-light tracking-[-0.02em] text-foreground">
                        {plan.price}
                      </span>
                      <span className="text-sm text-muted-foreground">{plan.priceUnit}</span>
                    </div>
                    {plan.priceNote && (
                      <p className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-[13px] font-medium text-primary">
                        <Check className="size-3.5" aria-hidden="true" />
                        {plan.priceNote}
                      </p>
                    )}
                  </>
                ) : (
                  <p className="font-sans text-2xl font-light tracking-[-0.01em] text-foreground">{plan.priceLabel}</p>
                )}
              </div>

              <div className="mt-8 flex-1" />

              <a
                href={plan.ctaHref}
                className={cn(
                  "inline-flex h-12 w-full items-center justify-center gap-2 rounded-full px-6 text-sm font-semibold transition-all active:scale-[0.98]",
                  plan.featured
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "border border-border text-foreground hover:bg-secondary",
                )}
              >
                {plan.ctaLabel}
                {plan.featured && <ArrowRight className="size-4" />}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
