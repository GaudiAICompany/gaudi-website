import { ContactTabs } from "@/components/landing/contact-tabs"
import { ConversionForm, CtaTrustRow } from "@/components/landing/conversion-form"

export function ClosingCta() {
  return (
    <section className="px-4 py-14 sm:px-6 lg:py-20">
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
            <div className="w-full max-w-xl">
              <ConversionForm buttonLabel="Get started on a free estimate" tone="dark" />
              <CtaTrustRow className="mt-5" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function Contact() {
  return (
    <section id="contact" className="px-4 pb-14 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-center gap-4 rounded-3xl border border-border bg-card px-6 py-6 text-center">
          <div className="flex flex-col items-center gap-3">
            {/* <p className="text-sm font-semibold uppercase tracking-wider text-primary">Contact</p> */}
            <h2 className="max-w-xl text-balance font-sans text-2xl sm:text-3xl font-light leading-[1.02] tracking-[-0.02em] text-foreground ">
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
    <footer className="overflow-hidden bg-section-dark text-section-dark-foreground">
      {/* Small, understated nav pinned top-right, with generous space beneath (Sable-style) */}
      <div className="mx-auto max-w-7xl px-4 pt-12 sm:px-6 lg:pt-16">
        <nav aria-label="Footer" className="flex justify-end">
          <ul className="flex gap-8 text-sm text-section-dark-foreground/70 sm:gap-12">
            <li>
              <a href="/#product" className="transition-colors hover:text-section-dark-foreground">
                Product
              </a>
            </li>
            <li>
              <a href="/#contact" className="transition-colors hover:text-section-dark-foreground">
                Contact
              </a>
            </li>
            <li>
              <a href="/privacy" className="transition-colors hover:text-section-dark-foreground">
                Privacy
              </a>
            </li>
          </ul>
        </nav>
      </div>

      {/* Dramatically oversized, muted watermark wordmark bleeding off both edges, left-aligned */}
      <div aria-hidden="true" className="pointer-events-none mt-24 select-none pl-3 sm:mt-32 sm:pl-4">
        <span className="block whitespace-nowrap font-sans text-[26vw] font-semibold uppercase leading-[0.78] tracking-[-0.055em] text-[#221c17]">
          Gaudi AI
        </span>
      </div>

      {/* Copyright, small and muted, directly beneath the wordmark */}
      <p className="px-4 pb-5 pt-3 text-sm text-section-dark-foreground/50 sm:px-6">
        &copy; {new Date().getFullYear()} Gaudi AI. All rights reserved.
      </p>
    </footer>
  )
}
