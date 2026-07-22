import { Calculator, Scale, FileSignature, ScanSearch, Bell } from "lucide-react"

const workflows = [
  {
    icon: Calculator,
    title: "Estimating",
    body: "Capture every line item from plans and specs and price it with current numbers — so bids go out faster without missed scope.",
    metric: "Fewer missed line items",
  },
  {
    icon: Scale,
    title: "Bid leveling",
    body: "Normalize subcontractor quotes into one standardized view and surface scope gaps before award.",
    metric: "Apples-to-apples in minutes",
  },
  {
    icon: FileSignature,
    title: "Proposal generation",
    body: "Turn estimates and project context into first-draft proposals your team can review and send.",
    metric: "Shorter drafting cycles",
  },
  {
    icon: ScanSearch,
    title: "Document review",
    body: "Read submittals, contracts, and specs to flag conflicts, missing information, and open RFIs.",
    metric: "Catch conflicts earlier",
  },
  {
    icon: Bell,
    title: "Project updates",
    body: "Assemble status updates and owner reports from scattered documents, emails, and field notes.",
    metric: "Updates without the chase",
  },
]

export default function Benefits() {
  return (
    <section id="benefits" className="bg-background py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-widest text-primary">What Gaudi automates</p>
          <h2 className="mt-4 text-pretty text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
            The repetitive back-office workflows that eat your week.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Each workflow is grounded in your real project documents — not generic templates.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {workflows.map((w) => (
            <div
              key={w.title}
              className="group flex flex-col rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary/40"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <w.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-5 text-lg font-semibold">{w.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{w.body}</p>
              <p className="mt-5 border-t border-border pt-4 text-sm font-medium text-primary">
                {w.metric}
              </p>
            </div>
          ))}

          <div className="flex flex-col justify-center rounded-xl border border-dashed border-border bg-secondary/50 p-6">
            <p className="text-sm leading-relaxed text-muted-foreground">
              Every output stays linked to its source document, so your estimators and PMs can
              verify before anything ships.
            </p>
            <a
              href="/waitlist/estimations"
              className="mt-4 text-sm font-semibold text-primary hover:underline"
            >
              Join Waitlist &rarr;
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
