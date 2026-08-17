import type { Metadata } from "next"
import { Linkedin, ArrowRight, CalendarDays, Mail } from "lucide-react"
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

const CALENDLY_URL = "https://calendly.com/begumcital"
const CONTACT_EMAIL = "contact@heygaudi.ai"

const founders = [
  {
    name: "Sebastian Piedra Rodriguez",
    role: "Co-founder",
    linkedin: "https://www.linkedin.com/in/sebastian-piedra-rodriguez",
  },
  {
    name: "Begüm Cital",
    role: "Co-founder",
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
        <div className="mx-auto max-w-5xl">
          {/* Intro */}
          <section className="text-center">
            <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-primary">About</p>
            <h1 className="mx-auto max-w-3xl text-balance font-sans text-4xl font-light leading-[1.02] tracking-[-0.03em] sm:text-5xl lg:text-6xl">
              Built by people who{" "}
              <span className="font-serif text-[1.08em] font-medium italic text-primary">build for a living.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
              Gaudi is built by people who have managed construction projects, owned and operated properties and shipped
              AI products used by Fortune 500 companies. We&apos;ve worked inside leading tech companies and research
              institutions, but we know how construction really works because we&apos;ve lived it. We&apos;re building AI
              tools that save time, cut headaches, and help every crew and project run smoother. If you build for a
              living, Gaudi is here to make your job easier.
            </p>
          </section>

          {/* Founders */}
          <section className="mt-16 lg:mt-24">
            <div className="relative">
              {/* left-to-right arrow motif running behind the founders */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute left-0 right-0 top-1/2 hidden -translate-y-1/2 items-center px-4 lg:flex"
              >
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-primary/40 to-primary/60" />
                <ArrowRight className="ml-1 size-5 shrink-0 text-primary/70" />
              </div>

              <div className="relative grid items-center gap-8 lg:grid-cols-[1fr_auto_1fr] lg:gap-6">
                {/* Founder — left */}
                <FounderCard founder={founders[0]} align="right" />

                {/* Photo — center */}
                <div className="order-first mx-auto w-full max-w-xl overflow-hidden rounded-3xl border border-border bg-card shadow-sm lg:order-none lg:w-[26rem]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/team.jpeg"
                    alt="Gaudi's founders standing in front of an active residential construction site"
                    className="aspect-[4/3] w-full object-cover"
                  />
                </div>

                {/* Founder — right */}
                <FounderCard founder={founders[1]} align="left" />
              </div>
            </div>
          </section>

          {/* Backed by */}
          <section className="mt-20 lg:mt-28">
            <p className="text-center text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Backed by experience from
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-6 sm:gap-x-14">
              {backers.map((b) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={b.alt}
                  src={b.src || "/placeholder.svg"}
                  alt={b.alt}
                  className="h-7 w-auto opacity-60 grayscale transition-all hover:opacity-100 hover:grayscale-0 sm:h-8"
                />
              ))}
            </div>
          </section>

          {/* Contact */}
          <section className="mb-24 mt-20 lg:mt-28">
            <div className="mx-auto max-w-2xl rounded-3xl border border-border bg-card p-8 text-center sm:p-12">
              <p className="text-sm font-semibold uppercase tracking-wider text-primary">Contact</p>
              <h2 className="mx-auto mt-3 max-w-md text-balance font-sans text-3xl font-light leading-[1.05] tracking-[-0.02em] sm:text-4xl">
                Let&apos;s talk.
              </h2>
              <p className="mx-auto mt-4 max-w-md text-pretty leading-relaxed text-muted-foreground">
                Book a time to meet the team, or send us a note. We&apos;d love to hear what you&apos;re building.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <a
                  href={CALENDLY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-primary px-7 font-semibold text-primary-foreground transition-all hover:bg-primary/90 active:scale-[0.98] sm:w-auto"
                >
                  <CalendarDays className="size-4" />
                  Book a call
                </a>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full border border-border px-7 font-semibold text-foreground transition-colors hover:bg-secondary sm:w-auto"
                >
                  <Mail className="size-4" />
                  Email us
                </a>
              </div>
            </div>
          </section>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}

function FounderCard({
  founder,
  align,
}: {
  founder: { name: string; role: string; linkedin: string }
  align: "left" | "right"
}) {
  return (
    <div
      className={`flex flex-col items-center gap-3 text-center ${
        align === "right" ? "lg:items-end lg:text-right" : "lg:items-start lg:text-left"
      }`}
    >
      <div>
        <p className="font-sans text-lg font-semibold tracking-tight">{founder.name}</p>
        <p className="text-sm text-muted-foreground">{founder.role}</p>
      </div>
      <a
        href={founder.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${founder.name} on LinkedIn`}
        className="inline-flex h-10 items-center justify-center gap-2 rounded-full border border-border bg-background px-4 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:text-primary"
      >
        <Linkedin className="size-4" />
        LinkedIn
      </a>
    </div>
  )
}
