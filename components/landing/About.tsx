const facts = [
  { label: "Managed real construction projects", detail: "Built and operated in the field, not just in software." },
  { label: "Shipped AI used by Fortune 500 teams", detail: "Production AI products at scale, not demos." },
  { label: "Owned and operated property", detail: "We've lived the back-office drag ourselves." },
]

export default function About() {
  return (
    <section id="about" className="bg-background py-20 md:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 lg:grid-cols-[1fr_1fr] lg:gap-16">
        <div className="relative order-last overflow-hidden rounded-xl border border-border lg:order-first">
          <img
            src="/team.jpeg"
            alt="The Gaudi AI team"
            className="h-full w-full object-cover"
          />
        </div>

        <div>
          <p className="text-sm font-medium uppercase tracking-widest text-primary">Who we are</p>
          <h2 className="mt-4 text-pretty text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
            We know how construction really works — because we&apos;ve done it.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            Gaudi is built by people who have managed construction projects, owned and operated
            property, and shipped AI products used by Fortune 500 companies. We&apos;ve worked inside
            leading tech companies and research institutions — but we build for the field because
            we&apos;ve lived it.
          </p>

          <ul className="mt-8 grid gap-px overflow-hidden rounded-xl border border-border bg-border">
            {facts.map((f) => (
              <li key={f.label} className="bg-card p-5">
                <p className="font-semibold text-foreground">{f.label}</p>
                <p className="mt-1 text-sm text-muted-foreground">{f.detail}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
