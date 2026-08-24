import type { Metadata } from "next"
import { ArrowLeft } from "lucide-react"
import { SiteHeader } from "@/components/landing/site-header"
import { SiteFooter } from "@/components/landing/closing-footer"
import { SubsCard } from "@/components/landing/subs-card"

export const metadata: Metadata = {
  title: "Coming next | Gaudi AI",
  description:
    "The capabilities we are building next on top of Gaudi's estimating engine, starting with sub coordination.",
  alternates: { canonical: "/product/coming-next" },
  openGraph: {
    title: "Coming next | Gaudi AI",
    description:
      "The capabilities we are building next on top of Gaudi's estimating engine, starting with sub coordination.",
    url: "/product/coming-next",
    type: "website",
  },
}

export default function ComingNextPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader solid />

      <main>
        <section className="px-4 pt-28 sm:px-6 lg:pt-36">
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <p className="mb-6 text-sm font-semibold uppercase tracking-wider text-primary">Coming next</p>
            <h1 className="text-balance font-sans text-5xl font-light leading-[0.98] tracking-[-0.03em] sm:text-6xl">
              What we&apos;re building{" "}
              <span className="font-serif text-[1.06em] font-medium italic text-primary">next.</span>
            </h1>
            <p className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground">
              Estimating is where Gaudi starts, not where it stops. These are the capabilities in the works.
            </p>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 lg:py-24">
          <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-2">
            <SubsCard />
          </div>
        </section>

        <section className="px-4 pb-16 sm:px-6 lg:pb-24">
          <div className="mx-auto flex max-w-7xl justify-center">
            <a
              href="/#product"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-border bg-card px-6 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
            >
              <ArrowLeft className="size-4 text-primary" aria-hidden="true" />
              Back to product
            </a>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
