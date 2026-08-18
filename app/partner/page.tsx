import type { Metadata } from "next"
import { ArrowUpRight, CalendarDays, Linkedin } from "lucide-react"
import { SiteHeader } from "@/components/landing/site-header"
import { SiteFooter } from "@/components/landing/closing-footer"

export const metadata: Metadata = {
  title: "Partner | Gaudi AI",
  description:
    "Partner with Gaudi AI, the AI estimator and bid coordinator for people who build for a living, on webinars, education, media, and referrals.",
  alternates: { canonical: "/partner" },
  openGraph: {
    title: "Partner | Gaudi AI",
    description:
      "Partner with Gaudi AI, the AI estimator and bid coordinator for people who build for a living, on webinars, education, media, and referrals.",
    url: "/partner",
    type: "website",
  },
}

const MEDIA_EMAIL = "media@heygaudi.ai"
const LINKEDIN_COMPANY = "https://www.linkedin.com/company/gaudiai/"
const CALENDLY_URL = "https://calendly.com/begumcital/gaudi-ai-partnership-call"

const sessionTopics = [
  "How AI estimating actually works",
  "Adopting AI on the job site",
  "Live member walkthroughs",
]

const partnerWays = [
  {
    title: "Trade schools & associations",
    body: "Educational sessions and early access to Gaudi for your members.",
  },
  {
    title: "Podcasts & media",
    body: "We'll join a conversation on construction, real estate, or AI.",
  },
  {
    title: "Individuals & referrals",
    body: "Know a GC who'd benefit? Make the intro, we'll take it from there.",
  },
]

const webinarsBody =
  "We run talks on AI for general contractors. No hype, just what works on a real job site. Want a session for your group? We'll put one together."

export default function PartnerPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader solid />

      <main>
        {/* ── Intro ─────────────────────────────────────────────────────────── */}
        <section className="px-4 pt-28 sm:px-6 lg:pt-36">
          <div className="mx-auto max-w-6xl">
            <p className="mb-6 text-sm font-semibold uppercase tracking-wider text-primary">Partnerships</p>
            <div>
              <h1 className="text-balance font-sans text-5xl font-light leading-[0.98] tracking-[-0.03em] sm:text-6xl lg:whitespace-nowrap lg:text-7xl">
                Ways to{" "}
                <span className="font-serif text-[1.06em] font-medium italic text-primary">work with Gaudi.</span>
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground lg:whitespace-nowrap">
                Webinars, education, media, and referrals. If you build for a living, let&apos;s team up.
              </p>
            </div>
          </div>
        </section>

        {/* ── Partner content + pinned contact card ─────────────────────────── */}
        <section className="px-4 py-14 sm:px-6 lg:py-20">
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr_20rem] lg:gap-12">
            <div className="flex flex-col gap-6">
              {/* Webinars & education — image card mirroring the newsroom NewsCard */}
              <article className="grid gap-5 rounded-3xl border border-border bg-card p-4 sm:grid-cols-[1fr_1fr] sm:p-5 lg:gap-8">
                <div className="order-2 flex flex-col sm:order-1">
                  <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                    <span className="size-1.5 rounded-full bg-primary" aria-hidden="true" />
                    Webinars &amp; education
                  </div>
                  <h2 className="mt-3 text-pretty font-sans text-lg font-medium leading-snug tracking-[-0.01em] text-foreground sm:text-xl">
                    Talks that cut through the AI hype.
                  </h2>
                  <p className="mt-2 text-pretty text-[15px] leading-relaxed text-muted-foreground">{webinarsBody}</p>

                  <div className="mt-5 sm:mt-auto sm:pt-5">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                      Example sessions
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {sessionTopics.map((topic) => (
                        <span
                          key={topic}
                          className="rounded-full border border-border bg-secondary/50 px-3 py-1.5 text-[13px] font-medium text-foreground"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <figure className="relative order-1 overflow-hidden rounded-2xl ring-1 ring-border sm:order-2 sm:h-full">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/newsroom/lacreia-presenting.png"
                    alt="Sebastian presenting an estimation agent demo on stage at LACREIA in Los Angeles"
                    className="aspect-[16/10] w-full object-cover sm:aspect-auto sm:h-full sm:min-h-[240px]"
                  />
                  <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-foreground/75 to-transparent p-4 text-sm font-medium text-background">
                    Sebastian presenting at LACREIA, Los Angeles.
                  </figcaption>
                </figure>
              </article>

              {/* Ways to partner — editorial divided list, no icon badges */}
              <div className="rounded-3xl border border-border bg-card p-6 sm:p-8">
                <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  <span className="size-1.5 rounded-full bg-primary" aria-hidden="true" />
                  Ways to partner
                </div>
                <div className="mt-2 divide-y divide-border">
                  {partnerWays.map(({ title, body }) => (
                    <div
                      key={title}
                      className="grid gap-1 py-5 last:pb-0 sm:grid-cols-[minmax(0,15rem)_1fr] sm:items-baseline sm:gap-8"
                    >
                      <h3 className="font-sans text-lg font-medium tracking-[-0.01em] text-foreground">{title}</h3>
                      <p className="text-pretty text-[15px] leading-relaxed text-muted-foreground">{body}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* pinned contact aside, mirroring the newsroom */}
            <aside className="h-fit lg:sticky lg:top-24">
              <div className="rounded-3xl bg-section-dark p-6 text-section-dark-foreground sm:p-8">
                <p className="text-xs font-semibold uppercase tracking-wider text-primary">Contact us</p>
                <h2 className="mt-3 text-balance font-sans text-2xl font-light leading-[1.1] tracking-[-0.02em]">
                  Interested in partnering?
                </h2>
                <a
                  href={`mailto:${MEDIA_EMAIL}`}
                  className="mt-6 inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 active:scale-[0.98]"
                >
                  Email us
                  <ArrowUpRight className="size-4" />
                </a>
                <p className="mt-3 text-center text-xs text-section-dark-foreground/60">{MEDIA_EMAIL}</p>

                <div className="mt-6 space-y-3 border-t border-section-dark-foreground/15 pt-6">
                  <a
                    href={CALENDLY_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex h-11 w-full items-center justify-center gap-2 rounded-full border border-section-dark-foreground/25 px-6 text-sm font-semibold text-section-dark-foreground transition-colors hover:border-primary hover:text-primary"
                  >
                    <CalendarDays className="size-4" aria-hidden="true" />
                    Book a partnership call
                  </a>
                  <a
                    href={LINKEDIN_COMPANY}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex h-11 w-full items-center justify-center gap-2 rounded-full border border-section-dark-foreground/25 px-6 text-sm font-semibold text-section-dark-foreground transition-colors hover:border-primary hover:text-primary"
                  >
                    <Linkedin className="size-4" aria-hidden="true" />
                    Follow Gaudi on LinkedIn
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
