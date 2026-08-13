import { FileText, Map, PenLine, Ruler, Users, ArrowDown } from "lucide-react"

const inputs = [
  { icon: FileText, label: "PDF", note: "RFPs & specs" },
  { icon: Map, label: "Blueprint", note: "Plans & drawings" },
  { icon: PenLine, label: "Handwritten note", note: "Site markups" },
]

const outputs = [
  { icon: Ruler, label: "Estimator", note: "Takeoffs, quantities, priced" },
  { icon: Users, label: "Bid coordinator", note: "Leveled bids, organized subs" },
]

const steps = [
  {
    n: "1",
    title: "Send it over.",
    body: "Forward the RFP, plans, and photos, however they land in your inbox.",
  },
  {
    n: "2",
    title: "Gaudi runs it.",
    body: "Takeoffs, quantities, and current pricing, pulled and checked automatically.",
  },
  {
    n: "3",
    title: "Review, not redo.",
    body: "Get a complete estimate back, check it, adjust it, send it.",
  },
]

function NodeCard({
  icon: Icon,
  label,
  note,
}: {
  icon: typeof FileText
  label: string
  note: string
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3 shadow-sm">
      <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary">
        <Icon className="size-5" />
      </span>
      <span className="min-w-0">
        <span className="block text-sm font-semibold text-foreground">{label}</span>
        <span className="block truncate text-xs text-muted-foreground">{note}</span>
      </span>
    </div>
  )
}

export function HowItWorks() {
  return (
    <section id="how-it-works" className="px-4 py-20 sm:px-6 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">How it works</p>
          <h2 className="text-balance font-sans text-4xl font-bold leading-[1.0] tracking-[-0.02em] text-foreground sm:text-5xl lg:text-6xl">
            Send it the way it <span className="font-serif text-[1.08em] font-medium italic text-primary">already lands</span> in your inbox.
          </h2>
        </div>

        <div className="mt-12 grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
          {/* Diagram */}
          <div className="rounded-3xl border border-border bg-secondary/50 p-5 sm:p-8">
            {/* Desktop diagram */}
            <div className="relative hidden h-[420px] w-full lg:block">
              <svg
                className="absolute inset-0 h-full w-full"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                {[18, 50, 82].map((y, i) => (
                  <path
                    key={`in-${i}`}
                    d={`M 26 ${y} C 40 ${y}, 40 50, 50 50`}
                    fill="none"
                    stroke="var(--color-border)"
                    strokeWidth="0.5"
                    vectorEffect="non-scaling-stroke"
                  />
                ))}
                {[33, 67].map((y, i) => (
                  <path
                    key={`out-${i}`}
                    d={`M 50 50 C 62 50, 62 ${y}, 74 ${y}`}
                    fill="none"
                    stroke="var(--color-border)"
                    strokeWidth="0.5"
                    vectorEffect="non-scaling-stroke"
                  />
                ))}
              </svg>

              {/* input nodes */}
              <div className="absolute left-0 top-[18%] w-56 -translate-y-1/2">
                <NodeCard {...inputs[0]} />
              </div>
              <div className="absolute left-0 top-[50%] w-56 -translate-y-1/2">
                <NodeCard {...inputs[1]} />
              </div>
              <div className="absolute left-0 top-[82%] w-56 -translate-y-1/2">
                <NodeCard {...inputs[2]} />
              </div>

              {/* gaudi node */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="flex size-28 flex-col items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg">
                  <span className="font-sans text-xl font-extrabold tracking-tight">Gaudi</span>
                  <span className="mt-1 flex gap-1">
                    <span className="size-1.5 rounded-full bg-primary-foreground/80 animate-flow-pulse" />
                    <span className="size-1.5 rounded-full bg-primary-foreground/80 animate-flow-pulse [animation-delay:0.3s]" />
                    <span className="size-1.5 rounded-full bg-primary-foreground/80 animate-flow-pulse [animation-delay:0.6s]" />
                  </span>
                </div>
              </div>

              {/* output nodes */}
              <div className="absolute right-0 top-[33%] w-60 -translate-y-1/2">
                <NodeCard {...outputs[0]} />
              </div>
              <div className="absolute right-0 top-[67%] w-60 -translate-y-1/2">
                <NodeCard {...outputs[1]} />
              </div>
            </div>

            {/* Mobile / tablet diagram */}
            <div className="flex flex-col items-center gap-4 lg:hidden">
              <div className="grid w-full gap-3">
                {inputs.map((n) => (
                  <NodeCard key={n.label} {...n} />
                ))}
              </div>
              <ArrowDown className="size-5 text-muted-foreground" aria-hidden="true" />
              <div className="flex size-24 flex-col items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg">
                <span className="font-sans text-lg font-extrabold tracking-tight">Gaudi</span>
              </div>
              <ArrowDown className="size-5 text-muted-foreground" aria-hidden="true" />
              <div className="grid w-full gap-3">
                {outputs.map((n) => (
                  <NodeCard key={n.label} {...n} />
                ))}
              </div>
            </div>
          </div>

          {/* Steps */}
          <ol className="flex flex-col gap-6">
            {steps.map((step) => (
              <li key={step.n} className="flex gap-4">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-primary/40 font-sans text-sm font-bold text-primary">
                  {step.n}
                </span>
                <div>
                  <h3 className="font-sans text-lg font-bold text-foreground">{step.title}</h3>
                  <p className="mt-1 leading-relaxed text-muted-foreground">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
