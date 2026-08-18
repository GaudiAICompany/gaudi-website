import type { Metadata } from "next"
import { Linkedin, CalendarDays, Mail } from "lucide-react"
import { SiteHeader } from "@/components/landing/site-header"
import { SiteFooter } from "@/components/landing/closing-footer"

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

const CALENDLY_URL = "https://calendly.com/begumcital/gaudi-ai-intro-call-website?back=1"
const CONTACT_EMAIL = "contact@heygaudi.ai"

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

      <main className="px-4 pt-28 sm:px-6 lg:pt-32">
        <div className="mx-auto max-w-6xl">
          {/* Intro — asymmetric editorial split */}
          <section className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-12">
            <div className="lg:col-span-7">
              <p className="mb-5 text-sm font-semibold uppercase tracking-wider text-primary">About</p>
              <h1 className="text-balance font-sans text-4xl font-light leading-[1.02] tracking-[-0.03em] sm:text-5xl lg:text-6xl">
                Built by people who{" "}
                <span className="font-serif text-[1.08em] font-medium italic text-primary">build for a living.</span>
              </h1>
            </div>
            <div className="lg:col-span-5">
              <div className="mb-5 h-px w-16 bg-primary/50" />
              <p className="text-pretty text-lg leading-relaxed">
                <span className="text-foreground">
                  Gaudi is built by people who have managed construction projects, owned and operated properties and
                  shipped AI products used by Fortune 500 companies.
                </span>{" "}
                <span className="text-muted-foreground">
                  We&apos;ve worked inside leading tech companies and research institutions, but we know how
                  construction really works because we&apos;ve lived it. We&apos;re building AI tools that save time, cut
                  headaches, and help every crew and project run smoother. If you build for a living, Gaudi is here to
                  make your job easier.
                </span>
              </p>
            </div>
          </section>

          {/* Founders — image + text panel, Cascade-style */}
          <section className="mt-16 lg:mt-24">
            <div className="overflow-hidden rounded-3xl border border-border bg-secondary/50">
              <div className="grid lg:grid-cols-2">
                {/* Photo */}
                <div className="relative min-h-[300px] lg:min-h-[420px]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/team.jpeg"
                    alt="Gaudi's founders standing in front of an active residential construction site"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>

                {/* Founders */}
                <div className="flex flex-col justify-center gap-8 p-8 sm:p-12">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-primary">Who&apos;s behind Gaudi</p>
                    <h2 className="mt-3 text-balance font-sans text-2xl font-light leading-[1.1] tracking-[-0.02em] sm:text-3xl">
                      Builders and AI people,{" "}
                      <span className="font-serif text-[1.06em] font-medium italic text-primary">on the same crew.</span>
                    </h2>
                  </div>

                  <div className="flex flex-col gap-3">
                    {founders.map((founder) => (
                      <div
                        key={founder.name}
                        className="flex items-center justify-between gap-4 rounded-2xl border border-border bg-card p-4 pl-5 transition-colors hover:border-primary/40"
                      >
                        <p className="font-sans text-base font-semibold tracking-tight sm:text-lg">{founder.name}</p>
                        <a
                          href={founder.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${founder.name} on LinkedIn`}
                          className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-full border border-border bg-background px-4 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:text-primary"
                        >
                          <Linkedin className="size-4" />
                          <span className="hidden sm:inline">LinkedIn</span>
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Backed by — contained card for presence */}
          <section className="mt-16 lg:mt-24">
            <div className="rounded-3xl border border-border bg-card p-8 sm:p-10">
              <p className="text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Backed by experience from
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-x-12 gap-y-8 sm:gap-x-16">
                {backers.map((b) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={b.alt}
                    src={b.src || "/placeholder.svg"}
                    alt={b.alt}
                    className="h-8 w-auto opacity-60 grayscale transition-all hover:opacity-100 hover:grayscale-0"
                  />
                ))}
              </div>
            </div>
          </section>

          {/* Contact — elevated card matching the pricing cards */}
          <section className="mb-24 mt-16 lg:mt-24">
            <div className="rounded-3xl border border-border bg-card p-8 shadow-2xl shadow-foreground/10 sm:p-12">
              <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-primary">Contact</p>
                  <h2 className="mt-3 text-balance font-sans text-3xl font-light leading-[1.05] tracking-[-0.02em] sm:text-4xl">
                    Let&apos;s talk.
                  </h2>
                  <p className="mt-4 max-w-md text-pretty leading-relaxed text-muted-foreground">
                    Book a time to meet the team, or send us a note. We&apos;d love to hear what you&apos;re building.
                  </p>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
                  <a
                    href={CALENDLY_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-7 font-semibold text-primary-foreground transition-all hover:bg-primary/90 active:scale-[0.98]"
                  >
                    <CalendarDays className="size-4" />
                    Book a call
                  </a>
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-border px-7 font-semibold text-foreground transition-colors hover:bg-secondary"
                  >
                    <Mail className="size-4" />
                    Email us
                  </a>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
