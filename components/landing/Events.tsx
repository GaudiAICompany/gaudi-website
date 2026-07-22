import { CalendarDays, MapPin, ArrowRight } from "lucide-react"

const items = [
  {
    tag: "Product",
    title: "Estimating & bid leveling early access",
    detail: "Weekly invites are rolling out to estimators and preconstruction teams.",
    meta: "Ongoing",
    metaIcon: CalendarDays,
    href: "/waitlist/estimations",
    cta: "Join Waitlist",
  },
  {
    tag: "Field",
    title: "Meet the team on the jobsite",
    detail: "We regularly sit down with GCs and PMs to pressure-test workflows against real projects.",
    meta: "By request",
    metaIcon: MapPin,
    href: "#contact",
    cta: "Contact Us",
  },
]

export default function Events() {
  return (
    <section className="border-t border-border bg-background py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-widest text-primary">
            What&apos;s happening
          </p>
          <h2 className="mt-4 text-pretty text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
            Early access and where to find us.
          </h2>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {items.map((item) => (
            <div
              key={item.title}
              className="flex flex-col rounded-xl border border-border bg-card p-6 md:p-7"
            >
              <div className="flex items-center gap-3">
                <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                  {item.tag}
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                  <item.metaIcon className="h-3.5 w-3.5" />
                  {item.meta}
                </span>
              </div>
              <h3 className="mt-4 text-lg font-semibold">{item.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                {item.detail}
              </p>
              <a
                href={item.href}
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
              >
                {item.cta} <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
