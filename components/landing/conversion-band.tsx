import { ConversionForm } from "./conversion-form"

export function ConversionBand({ apiBase, apiKey }: { apiBase: string; apiKey: string }) {
  return (
    <section id="pricing" className="px-4 py-6 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="overflow-hidden rounded-3xl bg-section-dark px-6 py-12 text-section-dark-foreground sm:px-12 sm:py-16">
          <div className="grid items-center gap-8 lg:grid-cols-[1fr_0.9fr] lg:gap-12">
            <div>
              <h2 className="text-balance font-sans text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
                Try it on a real set of plans.
              </h2>
              <p className="mt-4 max-w-md text-lg leading-relaxed text-section-dark-foreground/70">
                Send us your next RFP and get a complete estimate back. Your first 5 are free.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
                <span className="rounded-full bg-section-dark-foreground/10 px-3 py-1 font-semibold">
                  5 first estimates free
                </span>
                <span className="text-section-dark-foreground/70">$150 per estimate. Includes edits.</span>
              </div>
            </div>
            <div>
              <ConversionForm apiBase={apiBase} apiKey={apiKey} buttonLabel="Get started" tone="dark" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
