import type { Metadata } from "next"
import { Plus } from "lucide-react"
import { SiteHeader } from "@/components/landing/site-header"
import { SiteFooter } from "@/components/landing/closing-footer"
import { faqCategories, allFaqItems, type FaqItem } from "./faq-data"
import { FaqJumpNav } from "./faq-jump-nav"

export const metadata: Metadata = {
  title: "FAQ | Gaudi AI",
  description:
    "Commonly received questions about Gaudi AI, the virtual construction estimating coworker that turns blueprints into takeoffs and estimates in minutes.",
  alternates: { canonical: "/resources/faq" },
  openGraph: {
    title: "FAQ | Gaudi AI",
    description:
      "Commonly received questions about Gaudi AI, the virtual construction estimating coworker that turns blueprints into takeoffs and estimates in minutes.",
    url: "/resources/faq",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "FAQ | Gaudi AI",
    description:
      "Commonly received questions about Gaudi AI, the virtual construction estimating coworker that turns blueprints into takeoffs and estimates in minutes.",
  },
}

// schema.org/FAQPage structured data, one Question/acceptedAnswer per item.
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: allFaqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}

function FaqEntry({ item }: { item: FaqItem }) {
  return (
    <details id={slugify(item.question)} className="group scroll-mt-28 border-b border-border last:border-b-0">
      <summary className="flex cursor-pointer list-none items-start justify-between gap-4 py-4 [&::-webkit-details-marker]:hidden">
        <h3 className="text-pretty font-sans text-base font-medium leading-snug tracking-[-0.01em] text-foreground sm:text-lg">
          {item.question}
        </h3>
        <span
          aria-hidden="true"
          className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors group-hover:border-primary/40 group-hover:text-primary"
        >
          <Plus className="size-3.5 transition-transform duration-200 group-open:rotate-45" />
        </span>
      </summary>
      <p className="pb-5 pr-10 text-[15px] leading-relaxed text-muted-foreground">
        {item.answerNode ?? item.answer}
      </p>
    </details>
  )
}

export default function FaqPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <SiteHeader solid />

      <main>
        {/* ── Intro ─────────────────────────────────────────────────────────── */}
        <section className="px-4 pt-28 sm:px-6 lg:pt-36">
          <div className="mx-auto max-w-6xl">
            <p className="mb-6 text-sm font-semibold uppercase tracking-wider text-primary">FAQs</p>
            <div className="max-w-3xl">
              <h1 className="text-balance font-sans text-5xl font-light leading-[0.98] tracking-[-0.03em] sm:text-6xl lg:text-7xl">
                Questions we get a lot.
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                What Gaudi does, what it costs, and how it&apos;s different. Still feeling stuck?{" "}
                <a
                  href="mailto:help@heygaudi.ai"
                  className="font-medium text-primary underline-offset-4 hover:underline"
                >
                  Email us directly
                </a>
                .
              </p>
              <div className="mt-8">
                <FaqJumpNav categories={faqCategories} />
              </div>
            </div>
          </div>
        </section>

        {/* ── FAQ content grouped by category ───────────────────────────────── */}
        <section className="px-4 pb-8 pt-10 sm:px-6 lg:pt-14">
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-col gap-8 lg:gap-10">
              {faqCategories.map((category) => (
                <div
                  key={category.title}
                  className="grid gap-4 lg:grid-cols-[16rem_1fr] lg:gap-12"
                  id={slugify(category.title)}
                >
                  <h2 className="text-balance font-sans text-2xl font-light leading-[1.05] tracking-[-0.02em] text-foreground lg:sticky lg:top-28 lg:h-fit">
                    {category.title}
                  </h2>
                  <div className="border-t border-border">
                    {category.items.map((item) => (
                      <FaqEntry key={item.question} item={item} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Closing CTA ───────────────────────────────────────────────────── */}
        <section className="px-4 pb-24 pt-4 sm:px-6">
          <div className="mx-auto max-w-6xl">
            <div className="border-t border-border pt-10">
              <h2 className="font-sans text-2xl font-light tracking-[-0.02em] text-foreground">
                Still have questions?
              </h2>
              <p className="mt-3 text-lg leading-relaxed text-muted-foreground">
                <a
                  href="mailto:help@heygaudi.ai"
                  className="font-medium text-primary underline-offset-4 hover:underline"
                >
                  Email help@heygaudi.ai
                </a>
              </p>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
