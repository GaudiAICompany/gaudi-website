import type { Metadata } from "next"
import { ArrowUpRight, GraduationCap, Mic, Users, Check } from "lucide-react"
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
            <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-12">
              <h1 className="text-balance font-sans text-5xl font-light leading-[0.98] tracking-[-0.03em] sm:text-6xl lg:col-span-8 lg:text-7xl">
                Ways to work with{" "}
                <span className="font-serif text-[1.06em] font-medium italic text-primary">Gaudi.</span>
              </h1>
              <p className="text-pretty text-lg leading-relaxed text-muted-foreground lg:col-span-4">
                Webinars, education, media, and referrals. If you build for a living or serve people who do,
                there&apos;s a way to team up.
              </p>
            </div>
          </div>
        </section>

        {/* Webinars & education */}
        <section className="px-4 py-14 sm:px-6 lg:py-20">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
              <div>
                <h2 className="text-balance font-sans text-2xl font-light leading-[1.1] tracking-[-0.02em] sm:text-3xl">
                  Webinars &amp; education
                </h2>
                <p className="mt-5 text-pretty text-lg leading-relaxed text-muted-foreground">{webinarsBody}</p>

                <div className="mt-6 rounded-2xl border border-border bg-secondary/50 p-5 sm:p-6">
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

              <figure className="relative overflow-hidden rounded-3xl ring-1 ring-border">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/newsroom/lacreia-presenting.png"
                  alt="Sebastian presenting an estimation agent demo on stage at LACREIA in Los Angeles"
                  className="h-full w-full object-cover"
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-foreground/75 to-transparent p-4 text-sm font-medium text-background sm:p-5">
                  Sebastian presenting at LACREIA, Los Angeles.
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* Ways to partner */}
        <section className="px-4 pb-14 sm:px-6 lg:pb-20">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-balance font-sans text-2xl font-light leading-[1.1] tracking-[-0.02em] sm:text-3xl">
              Ways to partner
            </h2>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {partnerWays.map(({ icon: Icon, title, body }) => (
                <div key={title} className="flex flex-col rounded-3xl border border-border bg-card p-6 sm:p-7">
                  <span className="flex size-11 items-center justify-center rounded-full bg-secondary text-primary">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 font-sans text-lg font-semibold tracking-tight text-foreground">{title}</h3>
                  <p className="mt-2 text-pretty leading-relaxed text-muted-foreground">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Closing CTA */}
        <section className="px-4 pb-14 sm:px-6 lg:pb-24">
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-col items-center gap-5 rounded-3xl bg-section-dark px-6 py-16 text-center text-section-dark-foreground sm:px-14 sm:py-20">
              <h2 className="max-w-2xl text-balance font-sans text-4xl font-light leading-[0.98] tracking-[-0.03em] sm:text-5xl">
                Interested in{" "}
                <span className="font-serif text-[1.06em] font-medium italic text-primary">partnering?</span>
              </h2>
              <p className="max-w-md text-pretty leading-relaxed text-section-dark-foreground/70">
                Reach out directly and tell us how you&apos;d like to work together.
              </p>
              <a
                href={`mailto:${MEDIA_EMAIL}`}
                className="mt-2 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-7 font-semibold text-primary-foreground transition-all hover:bg-primary/90 active:scale-[0.98]"
              >
                Reach out
                <ArrowUpRight className="size-4" />
              </a>
              <p className="text-sm text-section-dark-foreground/60">{MEDIA_EMAIL}</p>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
