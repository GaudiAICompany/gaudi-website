const points = [
  {
    stat: "Estimating",
    label: "Every line item captured from plans and specs, priced with current numbers.",
  },
  {
    stat: "Bid leveling",
    label: "Subcontractor quotes normalized into one apples-to-apples comparison.",
  },
  {
    stat: "Proposals & docs",
    label: "Draft proposals, review submittals, and generate project updates from real documents.",
  },
]

export default function Mission() {
  return (
    <section className="border-y border-border bg-background py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div>
            <p className="text-sm font-medium uppercase tracking-widest text-primary">The mission</p>
            <h2 className="mt-4 text-pretty text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
              Construction runs on documents. The back office shouldn&apos;t run your team into the
              ground.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              Estimators re-key line items. PMs chase RFIs and submittals. Executives wait on updates
              buried in email threads and PDFs. Gaudi reads the same plans, specs, bids, and contracts
              your team already works from — and does the repetitive back-office work around them.
            </p>
          </div>

          <div className="grid content-center gap-px overflow-hidden rounded-xl border border-border bg-border">
            {points.map((p) => (
              <div key={p.stat} className="bg-card p-6">
                <p className="text-lg font-semibold text-primary">{p.stat}</p>
                <p className="mt-1 leading-relaxed text-muted-foreground">{p.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
