import type { Metadata } from "next"
import { ArrowUpRight, GraduationCap, Mic, Users, Check, CalendarDays, Linkedin } from "lucide-react"
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
  "What GCs should know before adopting AI",
  "Live walkthroughs for association members",
]

const partnerWays = [
  {
    icon: GraduationCap,
    title: "Trade schools & associations",
    body: "We partner with trade schools, contractor associations, and investor groups to run educational sessions and give members early access to Gaudi.",
  },
  {
    icon: Mic,
    title: "Podcasts & media",
    body: "Have a podcast or publication covering construction, real estate, or AI? We're glad to join a conversation or contribute expertise.",
  },
  {
    icon: Users,
    title: "Individuals & referrals",
    body: "If you know GCs, estimators, or developers who'd benefit from Gaudi, make the introduction. We'll handle the rest.",
  },
]

const webinarsBody =
  "We run educational sessions and talks on AI for general contractors, cutting through the hype to show what actually works on real job sites. If your trade school, association, or investor group would like a session for your members, we'd be glad to put one together."

export default function PartnerPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader solid />

      <main>
        {/* ── Intro ─────────────────────────────────────────────────────────── */}
        <section className="px-4 pt-28 sm:px-6 lg:pt-36">
          <div className="mx-auto max-w-6xl">
            <p className="mb-6 text-sm font-semibold uppercase tracking-wider text-primary">Partnerships</p>
            <div className="max-w-3xl">
              <h1 className="text-balance font-sans text-5xl font-light leading-[0.98] tracking-[-0.03em] sm:text-6xl lg:text-7xl">
                Ways to work with{" "}
                <span className="font-serif text-[1.06em] font-medium italic text-primary">Gaudi.</span>
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground lg:whitespace-nowrap">
                Webinars, education, media, and referrals &mdash; if you build for a living, let&apos;s team up.
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

                  <div className="mt-4 rounded-2xl border border-border bg-secondary/50 p-4 sm:mt-auto">
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Example sessions
                    </p>
                    <ul className="mt-3 space-y-2.5">
                      {sessionTopics.map((topic) => (
                        <li key={topic} className="flex items-start gap-3">
                          <Check className="mt-0.5 size-[18px] shrink-0 text-primary" aria-hidden="true" />
                          <span className="text-[15px] leading-snug text-foreground">{topic}</span>
                        </li>
                      ))}
                    </ul>
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

              {/* Ways to partner */}
              <div className="rounded-3xl border border-border bg-card p-6 sm:p-7">
                <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  <span className="size-1.5 rounded-full bg-primary" aria-hidden="true" />
                  Ways to partner
                </div>
                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                  {partnerWays.map(({ icon: Icon, title, body }) => (
                    <div key={title} className="flex flex-col rounded-2xl border border-border bg-secondary/40 p-5">
                      <span className="flex size-11 items-center justify-center rounded-full bg-secondary text-primary">
                        <Icon className="size-5" aria-hidden="true" />
                      </span>
                      <h3 className="mt-5 font-sans text-lg font-semibold tracking-tight text-foreground">{title}</h3>
                      <p className="mt-2 text-pretty text-[15px] leading-relaxed text-muted-foreground">{body}</p>
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
