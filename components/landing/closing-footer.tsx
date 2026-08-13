import { ArrowRight, CalendarDays, Linkedin, Mail } from "lucide-react"

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
            <h2 className="max-w-2xl text-balance font-sans text-3xl font-bold leading-tight tracking-tight sm:text-5xl">
              Ready to see your own numbers?
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
        <div className="flex flex-col items-center gap-6 rounded-3xl border border-border bg-card px-6 py-14 text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">Contact</p>
          <h2 className="max-w-xl text-balance font-sans text-2xl font-bold leading-tight text-foreground sm:text-3xl">
            Talk to us about your next bid.
          </h2>
          <a
            href="https://calendly.com/heygaudi/intro"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-7 font-semibold text-primary-foreground transition-all hover:bg-primary/90 active:scale-[0.98]"
          >
            <CalendarDays className="size-4" />
            Book a time or email us
          </a>
          <a href="mailto:contact@heygaudi.ai" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            contact@heygaudi.ai
          </a>
        </div>
      </div>
    </section>
  )
}

export function SiteFooter() {
  return (
    <footer className="bg-section-dark text-section-dark-foreground">
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

        {/* Large wordmark */}
        <div className="border-t border-section-dark-foreground/15 py-10">
          <p className="text-center font-sans text-[18vw] font-extrabold leading-none tracking-tighter text-section-dark-foreground/10 sm:text-[16vw] lg:text-[13vw]">
            GAUDI AI
          </p>
          <p className="mt-4 text-center text-sm text-section-dark-foreground/50">
            &copy; {new Date().getFullYear()} Gaudi AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
