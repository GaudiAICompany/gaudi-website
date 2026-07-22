import { FileUp, Workflow, ClipboardCheck } from "lucide-react"

const steps = [
  {
    n: "01",
    icon: FileUp,
    title: "Feed Gaudi your documents",
    body: "Drop in plans, specs, drawings, subcontractor bids, contracts, and RFIs. Gaudi builds a structured project context brain from the documents you already have.",
    items: ["Plans & specs", "Subcontractor bids", "Contracts & submittals"],
  },
  {
    n: "02",
    icon: Workflow,
    title: "Gaudi does the back-office work",
    body: "It extracts scope and line items, levels bids, flags missing scope, drafts proposals, and assembles project updates — with every output traceable back to the source document.",
    items: ["Estimate line items", "Bid leveling & scope gaps", "Proposal & update drafts"],
  },
  {
    n: "03",
    icon: ClipboardCheck,
    title: "Your team reviews and ships",
    body: "Estimators and PMs review, adjust, and approve. Nothing goes out without a human — Gaudi just removes the hours of manual assembly before that review.",
    items: ["Human-in-the-loop review", "Source-linked output", "Export & send"],
  },
]

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative overflow-hidden bg-section-dark py-20 text-section-dark-foreground md:py-28"
    >
      <div className="blueprint-grid pointer-events-none absolute inset-0 opacity-70" />
      <div className="relative mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-widest text-primary">How it works</p>
          <h2 className="mt-4 text-pretty text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
            From scattered documents to reviewable work in three steps.
          </h2>
        </div>

        <div className="mt-14 grid gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10 md:grid-cols-3">
          {steps.map((step) => (
            <div key={step.n} className="flex flex-col bg-section-dark p-7">
              <div className="flex items-center justify-between">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/15 text-primary">
                  <step.icon className="h-5 w-5" />
                </span>
                <span className="font-mono text-sm text-white/40">{step.n}</span>
              </div>
              <h3 className="mt-5 text-lg font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/60">{step.body}</p>
              <ul className="mt-5 space-y-2 border-t border-white/10 pt-4">
                {step.items.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-white/70">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
