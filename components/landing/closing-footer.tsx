import { ArrowRight, Linkedin, Mail } from "lucide-react"
import { ContactTabs } from "@/components/landing/contact-tabs"

export function ClosingCta() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-3xl border border-border">
          <img
            src="/closing-desk.png"
            alt="A contractor's desk with blueprints and a printed cost estimate"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-section-dark/75" />
          <div className="relative flex flex-col items-start gap-6 px-6 py-16 text-section-dark-foreground sm:px-14 sm:py-24">
            <h2 className="max-w-3xl text-balance font-sans text-4xl font-light leading-[0.95] tracking-[-0.03em] sm:text-6xl lg:text-7xl">
              Ready to see your <span className="font-serif text-[1.08em] font-medium italic text-primary">own numbers?</span>
            </h2>
            <a
              href="#hero"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-7 font-semibold text-primary-foreground transition-all hover:bg-primary/90 active:scale-[0.98]"
            >
              Get started
              <ArrowRight className="size-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export function Contact() {
  return (
    <section id="contact" className="px-4 pb-20 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-center gap-8 rounded-3xl border border-border bg-card px-6 py-14 text-center">
          <div className="flex flex-col items-center gap-3">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">Contact</p>
            <h2 className="max-w-xl text-balance font-sans text-3xl font-light leading-[1.02] tracking-[-0.02em] text-foreground sm:text-4xl">
              Talk to us about your next bid.
            </h2>
          </div>
          <ContactTabs />
        </div>
      </div>
    </section>
  )
}

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-section-dark text-section-dark-foreground">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col gap-10 py-14 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <p className="font-sans text-lg font-extrabold tracking-tight">
              Gaudi<span className="text-primary"> AI</span>
            </p>
            <p className="mt-3 leading-relaxed text-section-dark-foreground/70">
              The AI estimator and bid coordinator for people who build for a living.
            </p>
            <div className="mt-5 flex gap-3">
              <a
                href="https://www.linkedin.com/company/gaudiai/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Gaudi AI on LinkedIn"
                className="flex size-9 items-center justify-center rounded-full border border-section-dark-foreground/20 transition-colors hover:bg-section-dark-foreground/10"
              >
                <Linkedin className="size-4" />
              </a>
              <a
                href="mailto:contact@heygaudi.ai"
                aria-label="Email Gaudi AI"
                className="flex size-9 items-center justify-center rounded-full border border-section-dark-foreground/20 transition-colors hover:bg-section-dark-foreground/10"
              >
                <Mail className="size-4" />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            <div>
              <p className="text-sm font-semibold text-section-dark-foreground">Product</p>
              <ul className="mt-4 space-y-3 text-sm text-section-dark-foreground/70">
                <li><a href="#how-it-works" className="transition-colors hover:text-section-dark-foreground">Estimator</a></li>
                <li><a href="#how-it-works" className="transition-colors hover:text-section-dark-foreground">Bid coordinator</a></li>
                <li><a href="#pricing" className="transition-colors hover:text-section-dark-foreground">Pricing</a></li>
              </ul>
            </div>
            <div>
              <p className="text-sm font-semibold text-section-dark-foreground">Solutions</p>
              <ul className="mt-4 space-y-3 text-sm text-section-dark-foreground/70">
                <li><a href="#solutions" className="transition-colors hover:text-section-dark-foreground">General Contractors</a></li>
                <li><a href="#solutions" className="transition-colors hover:text-section-dark-foreground">Estimators</a></li>
                <li><a href="#solutions" className="transition-colors hover:text-section-dark-foreground">Developers</a></li>
              </ul>
            </div>
            <div>
              <p className="text-sm font-semibold text-section-dark-foreground">Company</p>
              <ul className="mt-4 space-y-3 text-sm text-section-dark-foreground/70">
                <li><a href="#contact" className="transition-colors hover:text-section-dark-foreground">Contact</a></li>
                <li><a href="/careers/engineering" className="transition-colors hover:text-section-dark-foreground">Careers</a></li>
                <li><a href="/privacy" className="transition-colors hover:text-section-dark-foreground">Privacy</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Copyright sits above the oversized wordmark */}
        <div className="flex items-center justify-between border-t border-section-dark-foreground/15 py-6 text-sm text-section-dark-foreground/50">
          <p>&copy; {new Date().getFullYear()} Gaudi AI. All rights reserved.</p>
        </div>
      </div>

      {/* Oversized, full-bleed wordmark clipped by the page edge (Sable-style typographic treatment) */}
      <div aria-hidden="true" className="pointer-events-none select-none px-4 sm:px-6">
        <span className="block translate-y-[0.09em] whitespace-nowrap font-sans text-[27vw] font-semibold uppercase leading-[0.8] tracking-[-0.06em] text-[#2f2620] sm:text-[26vw]">
          Gaudi AI
        </span>
      </div>
    </footer>
  )
}
