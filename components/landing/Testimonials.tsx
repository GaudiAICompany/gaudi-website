const quotes = [
  {
    quote:
      "Bid leveling used to take an afternoon of reformatting PDFs. Having it normalized and scope-checked automatically changes how fast we can award.",
    role: "Preconstruction Lead",
    company: "General contractor (placeholder)",
  },
  {
    quote:
      "The estimates come back with the line items already structured. Our estimators review instead of re-keying from scratch.",
    role: "Chief Estimator",
    company: "Commercial GC (placeholder)",
  },
  {
    quote:
      "Owner updates that used to mean digging through email threads now start as a draft pulled from the actual project docs.",
    role: "Project Manager",
    company: "Design-build firm (placeholder)",
  },
]

export default function Testimonials() {
  return (
    <section className="bg-background py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="text-sm font-medium uppercase tracking-widest text-primary">
              From the field
            </p>
            <h2 className="mt-4 text-pretty text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
              Built with construction operators, for construction operators.
            </h2>
          </div>
          <p className="rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground">
            Illustrative placeholders
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {quotes.map((t) => (
            <figure
              key={t.role}
              className="flex flex-col rounded-xl border border-border bg-card p-6"
            >
              <blockquote className="flex-1 text-pretty leading-relaxed text-foreground">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-6 border-t border-border pt-4">
                <p className="text-sm font-semibold text-foreground">{t.role}</p>
                <p className="text-sm text-muted-foreground">{t.company}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
