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
        {/* ── Hero: editorial opener, open on the warm background ───────────── */}
        <section className="px-4 pt-28 sm:px-6 lg:pt-36">
          <div className="mx-auto max-w-6xl">
            <p className="mb-6 text-sm font-semibold uppercase tracking-wider text-primary">About</p>
            <div className="max-w-3xl">
              <h1 className="text-balance font-sans text-5xl font-light leading-[0.98] tracking-[-0.03em] sm:text-6xl lg:text-7xl">
                Built by people who{" "}
                <span className="font-serif text-[1.06em] font-medium italic text-primary">build for a living.</span>
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                We know how construction really works because we&apos;ve lived it.
              </p>
            </div>
          </div>
        </section>

        {/* ── Full-bleed photo band with a how-it-works-style caption chip ───── */}
        <section className="px-4 pt-10 sm:px-6 lg:pt-14">
          <div className="mx-auto max-w-6xl">
            <div className="relative overflow-hidden rounded-3xl ring-1 ring-border">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/team.jpeg"
                alt="Gaudi's founders standing together in front of an active residential construction site"
                className="h-[280px] w-full object-cover sm:h-[380px] lg:h-[460px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/55 via-foreground/5 to-transparent" />
              <span className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-background/90 px-3 py-1.5 text-[12px] font-semibold text-foreground shadow-sm backdrop-blur sm:bottom-6 sm:left-6">
                <span className="size-1.5 rounded-full bg-primary" aria-hidden="true" />
                On site with the Gaudi team
              </span>
            </div>
          </div>
        </section>

        {/* ── The story + credentials, open on the background (no cards) ─────── */}
        <section className="px-4 py-16 sm:px-6 lg:py-24">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-6">
                <h2 className="text-balance font-sans text-3xl font-light leading-[1.1] tracking-[-0.02em] sm:text-4xl">
                  We&apos;re building AI tools that{" "}
                  <span className="font-serif text-[1.05em] font-medium italic text-primary">
                    save time and cut headaches
                  </span>{" "}
                  on every project.
                </h2>
              </div>
              <div className="lg:col-span-6">
                <p className="text-pretty text-lg leading-relaxed text-muted-foreground">
                  We&apos;ve worked inside leading tech companies and research institutions, but we know how construction
                  really works because we&apos;ve been on the job site, owned the buildings, and lived the headaches. If
                  you build for a living, Gaudi is here to make your day run smoother.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Founders: editorial list, tied to the "one crew" idea ──────────── */}
        <section className="px-4 py-4 sm:px-6">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-primary">Who&apos;s behind Gaudi</p>
                <h2 className="mt-3 text-balance font-sans text-3xl font-light leading-[1.08] tracking-[-0.02em] sm:text-4xl">
                  Builders and AI people,{" "}
                  <span className="font-serif text-[1.05em] font-medium italic text-primary">on the same crew.</span>
                </h2>
              </div>

              <div className="lg:col-span-7">
                <ul className="border-t border-border">
                  {founders.map((founder) => (
                    <li key={founder.name}>
                      <a
                        href={founder.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center justify-between gap-4 border-b border-border py-6 transition-colors"
                      >
                        <span className="font-sans text-2xl font-light tracking-[-0.01em] text-foreground transition-colors group-hover:text-primary sm:text-3xl">
                          {founder.name}
                        </span>
                        <span className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-muted-foreground transition-colors group-hover:text-primary">
                          <Linkedin className="size-4" />
                          <span className="hidden sm:inline">LinkedIn</span>
                          <ArrowUpRight className="size-4" />
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
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
