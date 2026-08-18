import type { Metadata } from "next"
import { Linkedin, ArrowUpRight } from "lucide-react"
import { SiteHeader } from "@/components/landing/site-header"
import { SiteFooter } from "@/components/landing/closing-footer"
import { ContactTabs } from "@/components/landing/contact-tabs"

export const metadata: Metadata = {
  title: "About | Gaudi AI",
  description:
    "Gaudi is built by people who have managed construction projects, owned and operated properties, and shipped AI products used by Fortune 500 companies.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About | Gaudi AI",
    description:
      "Gaudi is built by people who have managed construction projects, owned and operated properties, and shipped AI products used by Fortune 500 companies.",
    url: "/about",
    type: "website",
  },
}

const founders = [
  {
    name: "Sebastian Piedra Rodriguez",
    linkedin: "https://www.linkedin.com/in/sebastian-piedra-rodriguez",
  },
  {
    name: "Begüm Cital",
    linkedin: "https://www.linkedin.com/in/begumcital",
  },
]

const backers = [
  { src: "/amzn.png", alt: "Amazon" },
  { src: "/msft.png", alt: "Microsoft" },
  { src: "/harvard.png", alt: "Harvard" },
  { src: "/gs.png", alt: "Goldman Sachs" },
  { src: "/adtheorent.png", alt: "AdTheorent" },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader solid />

      <main>
        {/* ── Intro: centered to match the landing page's rhythm ────────────── */}
        <section className="px-4 pt-28 sm:px-6 lg:pt-36">
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <p className="mb-6 text-sm font-semibold uppercase tracking-wider text-primary">About</p>
            <h1 className="text-balance font-sans text-5xl font-light leading-[0.98] tracking-[-0.03em] sm:text-6xl">
              We know construction{" "}
              <span className="font-serif text-[1.06em] font-medium italic text-primary">from the inside.</span>
            </h1>
            <div className="mt-6 space-y-4 text-pretty text-lg leading-relaxed text-muted-foreground">
              <p>
                Gaudi is built by people who have managed construction projects, owned and operated properties and
                shipped AI products used by Fortune 500 companies. We&apos;ve worked inside leading tech companies and
                research institutions, but we know how construction really works because we&apos;ve lived it.
              </p>
              <p>
                We&apos;re building AI tools that save time, cut headaches, and help every crew and project run smoother.
                If you build for a living, Gaudi is here to make your job easier.
              </p>
            </div>
          </div>
        </section>

        {/* ── Founders: centered, compact cards with small LinkedIn linkouts ─── */}
        <section className="px-4 pt-16 sm:px-6 lg:pt-24">
          <div className="mx-auto flex max-w-3xl flex-col items-center">
            <p className="text-center text-sm font-semibold uppercase tracking-wider text-primary">Founders</p>
            <ul className="mt-8 grid w-full gap-4 sm:grid-cols-2">
              {founders.map((founder) => (
                <li key={founder.name}>
                  <div className="flex h-full flex-col items-center gap-4 rounded-2xl border border-border bg-card px-6 py-7 text-center">
                    <span className="font-sans text-xl font-light tracking-[-0.01em] text-foreground">
                      {founder.name}
                    </span>
                    <a
                      href={founder.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full border border-border px-3.5 py-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                    >
                      <Linkedin className="size-3.5" />
                      LinkedIn
                      <ArrowUpRight className="size-3.5" />
                    </a>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── Backed-by logo wall, open on the background ────────────────────── */}
        <section className="px-4 py-16 sm:px-6 lg:py-24">
          <div className="mx-auto max-w-6xl">
            <p className="text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Experience from
            </p>
            {/* seamless left→right marquee; the track is duplicated so it loops without a gap */}
            <div
              className="group relative mt-12 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]"
              aria-label="Experience from Amazon, Microsoft, Harvard, Goldman Sachs, and AdTheorent"
            >
              <div className="flex w-max animate-logo-marquee items-center group-hover:[animation-play-state:paused]">
                {[...backers, ...backers].map((b, i) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={`${b.alt}-${i}`}
                    src={b.src || "/placeholder.svg"}
                    alt={i < backers.length ? b.alt : ""}
                    aria-hidden={i >= backers.length}
                    className="mx-10 h-11 w-auto shrink-0 opacity-60 grayscale sm:mx-16 sm:h-14 lg:h-16"
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Team photo, moved below the experience/logo section ────────────── */}
        <section className="px-4 pb-16 sm:px-6 lg:pb-24">
          <div className="mx-auto max-w-6xl">
            <div className="relative overflow-hidden rounded-3xl ring-1 ring-border">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/team.jpeg"
                alt="Gaudi's founders standing together in front of an active residential construction site"
                className="h-[280px] w-full object-cover sm:h-[380px] lg:h-[460px]"
              />
            </div>
          </div>
        </section>

        {/* ── Contact: mirrors the landing page's contact section ───────────── */}
        <section id="contact" className="px-4 pb-16 sm:px-6 lg:pb-24">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col items-center gap-8 rounded-3xl border border-border bg-card px-6 py-14 text-center sm:py-16">
              <div className="flex flex-col items-center gap-4">
                <p className="text-sm font-semibold uppercase tracking-wider text-primary">Contact</p>
                <h2 className="max-w-2xl text-balance font-sans text-3xl font-light leading-[1.02] tracking-[-0.02em] text-foreground sm:text-4xl">
                  Let&apos;s talk about{" "}
                  <span className="font-serif text-[1.05em] font-medium italic text-primary">what you&apos;re building.</span>
                </h2>
                <p className="max-w-md text-pretty leading-relaxed text-muted-foreground">
                  Book a time to meet the team. We&apos;d love to hear about your projects and where Gaudi can help.
                </p>
              </div>
              <ContactTabs />
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
