import { HardHat, Ruler, Building2 } from "lucide-react"

const cards = [
  {
    icon: HardHat,
    role: "General Contractors",
    line: "Win more bids without hiring more estimators.",
  },
  {
    icon: Ruler,
    role: "Estimators",
    line: "Spend your day reviewing, not re-typing.",
  },
  {
    icon: Building2,
    role: "Developers",
    line: "Know your real costs before you commit.",
  },
]

export function Solutions() {
  return (
    <section id="solutions" className="px-4 py-20 sm:px-6 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <h2 className="max-w-4xl text-balance font-sans text-4xl font-light leading-[0.98] tracking-[-0.03em] text-foreground sm:text-5xl lg:text-6xl">
          Built for general contractors, estimators, and developers.
        </h2>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {cards.map((card) => (
            <div
              key={card.role}
              className="flex flex-col rounded-3xl bg-secondary p-8 transition-colors hover:bg-secondary/70"
            >
              <span className="flex size-12 items-center justify-center rounded-2xl bg-card text-primary">
                <card.icon className="size-6" />
              </span>
              <h3 className="mt-6 font-sans text-xl font-semibold text-foreground">{card.role}</h3>
              <p className="mt-2 text-pretty leading-relaxed text-muted-foreground">{card.line}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
