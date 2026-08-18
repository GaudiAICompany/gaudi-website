import type { Metadata } from "next"
import { ArrowUpRight, CalendarDays, Linkedin } from "lucide-react"
import { SiteHeader } from "@/components/landing/site-header"
import { SiteFooter } from "@/components/landing/closing-footer"
import { WebinarNotify } from "@/components/landing/webinar-notify"

export const metadata: Metadata = {
  title: "Partnerships | Gaudi AI",
  description:
    "Partner with Gaudi AI, the AI estimator and bid coordinator for people who build for a living, on webinars, education, media, and referrals.",
  alternates: { canonical: "/partnership" },
  openGraph: {
    title: "Partnerships | Gaudi AI",
    description:
      "Partner with Gaudi AI, the AI estimator and bid coordinator for people who build for a living, on webinars, education, media, and referrals.",
    url: "/partnership",
    type: "website",
  },
}

const MEDIA_EMAIL = "media@heygaudi.ai"
const LINKEDIN_COMPANY = "https://www.linkedin.com/company/gaudiai/"
const CALENDLY_URL = "https://calendly.com/begumcital/gaudi-ai-partnership-call"

const partnerWays = [
  {
    title: "Trade schools & associations",
    hook: "Bring Gaudi to your members.",
    body: "Run a session, share early access, or just make an introduction. We'll tailor it to your group.",
  },
  {
    title: "Podcasts & media",
    hook: "Talk construction and AI with us.",
    body: "Have a show or publication covering the space? We're an easy yes for a conversation or a quote.",
  },
  {
    title: "Individuals & referrals",
    hook: "Know someone who should see this?",
    body: "Send the introduction, stay as involved as you'd like. We'll take it from there.",
  },
]

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

        {/* ── Ways to partner + pinned contact card ─────────────────────────── */}
        <section className="px-4 py-14 sm:px-6 lg:py-20">
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr_20rem] lg:gap-12">
            <div className="divide-y divide-border border-t border-border">
              {partnerWays.map(({ title, hook, body }) => (
                <div key={title} className="py-8 first:pt-0 sm:py-10">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-primary">{title}</p>
                  <h3 className="mt-3 text-pretty font-sans text-xl font-medium leading-snug tracking-[-0.01em] text-foreground sm:text-2xl">
                    {hook}
                  </h3>
                  <p className="mt-2 max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">{body}</p>
                </div>
              ))}

              {/* Webinars — folded in as the fourth item, with an inline signup */}
              <div className="py-8 sm:py-10">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-primary">Webinars</p>
                <h3 className="mt-3 text-pretty font-sans text-xl font-medium leading-snug tracking-[-0.01em] text-foreground sm:text-2xl">
                  Join our next webinar.
                </h3>
                <p className="mt-2 max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
                  Live talks on AI for general contractors, no hype, just what works on a real job site. Get notified
                  when the next one&apos;s scheduled.
                </p>
                <div className="mt-4 max-w-md">
                  <WebinarNotify />
                </div>
              </div>
            </div>

            {/* pinned at the top, mirroring the newsroom */}
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
                    Book a call
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

        {/* ── Standalone photo, pulled out to a full-width block at the bottom ��─ */}
        <section className="px-4 pb-20 sm:px-6 lg:pb-28">
          <figure className="mx-auto max-w-6xl">
            <div className="relative overflow-hidden rounded-3xl ring-1 ring-border">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/newsroom/lacreia-presenting.png"
                alt="Sebastian presenting an estimation agent demo on stage at LACREIA in Los Angeles"
                className="h-[280px] w-full object-cover sm:h-[420px] lg:h-[500px]"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-foreground/75 to-transparent p-5 text-sm font-medium text-background sm:p-6">
                Sebastian presenting at LACREIA, Los Angeles.
              </figcaption>
            </div>
          </figure>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
