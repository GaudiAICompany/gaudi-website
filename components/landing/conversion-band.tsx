import { ConversionForm, CtaTrustRow } from "./conversion-form"

export function ConversionBand() {
  return (
    <section id="get-started" className="px-4 py-6 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="overflow-hidden rounded-3xl bg-section-dark px-6 py-12 text-section-dark-foreground sm:px-12 sm:py-16">
          <div className="grid items-center gap-8 lg:grid-cols-[1fr_0.9fr] lg:gap-12">
            <div>
              <h2 className="text-balance font-sans text-4xl font-light leading-[0.98] tracking-[-0.03em] sm:text-5xl lg:text-6xl">
                Try it on a <span className="font-serif text-[1.08em] font-medium italic text-primary">real</span> set of plans.
              </h2>
              <p className="mt-4 max-w-md text-lg leading-relaxed text-section-dark-foreground/70">
                Send us your next RFP and get a complete estimate back. Your first 5 are free.
              </p>
            </div>
            <div>
              <ConversionForm buttonLabel="Get started on a free estimate" tone="dark" />
              <CtaTrustRow className="mt-5" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
