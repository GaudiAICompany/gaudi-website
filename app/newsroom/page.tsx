import type { Metadata } from "next"
import { ArrowUpRight, Play, CalendarDays, Linkedin } from "lucide-react"
import { SiteHeader } from "@/components/landing/site-header"
import { SiteFooter } from "@/components/landing/closing-footer"

export const metadata: Metadata = {
  title: "Newsroom | Gaudi AI",
  description:
    "News, press, and events from Gaudi AI, the AI estimator and bid coordinator for people who build for a living.",
  alternates: { canonical: "/newsroom" },
  openGraph: {
    title: "Newsroom | Gaudi AI",
    description:
      "News, press, and events from Gaudi AI, the AI estimator and bid coordinator for people who build for a living.",
    url: "/newsroom",
    type: "website",
  },
}

const MEDIA_EMAIL = "media@heygaudi.ai"
const LINKEDIN_COMPANY = "https://www.linkedin.com/company/gaudiai/"
const CALENDLY_URL = "https://calendly.com/begumcital/gaudi-ai-partnership-call"

// Newest first. Dates pulled from the source (YouTube publish date, El Financiero
// byline, and the RE//FORGE post's image timestamp).
const newsItems = [
  {
    kind: "article" as const,
    source: "El Financiero CR",
    date: "June 23, 2026",
    dateTime: "2026-06-23",
    title:
      "Tico trabajó en la sede central de Microsoft, sacó el MBA de Harvard, creó una solución que genera cotizaciones de obras de construcción y ahora está en Silicon Valley para expandirse por EE. UU. y América Latina.",
    translation:
      "A Costa Rican worked at Microsoft's headquarters, earned his MBA at Harvard, built a solution that generates construction bids, and is now in Silicon Valley to expand across the US and Latin America.",
    image: "/newsroom/elfinanciero.jpg",
    imageAlt: "Gaudi's founders standing in front of a residential construction site",
    href: "https://www.elfinancierocr.com/emprender/tico-trabajo-en-la-sede-central-de-microsoft-saco/OEWSDZ2LGJHD7EYJORGBQPASVU/story/",
    readLabel: "Read the article",
    partner: null,
  },
  {
    kind: "event" as const,
    source: "Event",
    date: "May 8, 2026",
    dateTime: "2026-05-08",
    title: "Gaudi co-hosted Golf for Builders with RE//FORGE SF.",
    translation:
      "An evening in the simulator with Bay Area general contractors, developers, and contech builders, talking shop about where AI actually helps on real projects.",
    image: "/newsroom/reforge-golf.jpg",
    imageAlt: "Gaudi presenting to builders in a golf simulator room at the RE//FORGE SF event",
    href: "https://www.linkedin.com/posts/begumcital_construction-generalcontractors-contech-activity-7458533723714691072-pDzc",
    readLabel: "See the post",
    partner: { name: "RE//FORGE SF", url: "https://reforgesf.com/" },
  },
  {
    kind: "video" as const,
    source: "Video",
    date: "April 26, 2026",
    dateTime: "2026-04-26",
    title: "AI Deep Dive: Sebastián Piedra on AI for construction and the headless future of SaaS.",
    translation: "A long-form conversation on what AI changes for estimating, and what it doesn't.",
    image: "/newsroom/youtube-deepdive.jpg",
    imageAlt: "Thumbnail for the AI Deep Dive video featuring Sebastián Piedra",
    href: "https://www.youtube.com/watch?v=gCBoOBJHiUg",
    readLabel: "Watch",
    partner: null,
  },
]

function NewsCard({ item }: { item: (typeof newsItems)[number] }) {
  return (
    <article className="group grid gap-5 rounded-3xl border border-border bg-card p-4 transition-colors hover:border-primary/40 sm:grid-cols-[1fr_1fr] sm:p-5 lg:gap-8">
      {/* text */}
      <div className="order-2 flex flex-col sm:order-1">
        <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          <span className="size-1.5 rounded-full bg-primary" aria-hidden="true" />
          {item.source}
          <span aria-hidden="true" className="text-border">
            /
          </span>
          <time dateTime={item.dateTime} className="font-medium normal-case tracking-normal text-muted-foreground">
            {item.date}
          </time>
        </div>

        <h3 className="mt-3 text-pretty font-sans text-lg font-medium leading-snug tracking-[-0.01em] text-foreground sm:text-xl">
          {item.title}
        </h3>
        {item.translation ? (
          <p className="mt-2 text-pretty font-serif text-[15px] italic leading-relaxed text-muted-foreground">
            {item.translation}
          </p>
        ) : null}
        {item.partner ? (
          <p className="mt-2 text-sm text-muted-foreground">
            In partnership with{" "}
            <a
              href={item.partner.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-foreground underline-offset-4 hover:text-primary hover:underline"
            >
              {item.partner.name}
            </a>
            .
          </p>
        ) : null}

        <a
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-1.5 pt-1 text-sm font-semibold text-primary transition-colors hover:text-primary/80 sm:mt-auto"
        >
          {item.readLabel}
          <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </div>

      {/* image */}
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className="relative order-1 block overflow-hidden rounded-2xl ring-1 ring-border sm:order-2 sm:h-full"
        aria-label={item.readLabel}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.image || "/placeholder.svg"}
          alt={item.imageAlt}
          className="aspect-[16/10] w-full object-cover transition-transform duration-300 group-hover:scale-[1.03] sm:aspect-auto sm:h-full sm:min-h-[240px]"
        />
        {item.kind === "video" ? (
          <span className="absolute inset-0 flex items-center justify-center bg-foreground/10">
            <span className="flex size-14 items-center justify-center rounded-full bg-background/90 text-primary shadow-lg backdrop-blur">
              <Play className="ml-0.5 size-6 fill-current" aria-hidden="true" />
            </span>
          </span>
        ) : null}
      </a>
    </article>
  )
}

export default function NewsroomPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader solid />

      <main>
        {/* ── Intro ─────────────────────────────────────────────────────────── */}
        <section className="px-4 pt-28 sm:px-6 lg:pt-36">
          <div className="mx-auto max-w-6xl">
            <p className="mb-6 text-sm font-semibold uppercase tracking-wider text-primary">Newsroom</p>
            <div className="max-w-3xl">
              <h1 className="text-balance font-sans text-5xl font-light leading-[0.98] tracking-[-0.03em] sm:text-6xl lg:text-7xl">
                The Gaudi <span className="font-serif text-[1.06em] font-medium italic text-primary">Newsroom.</span>
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground lg:whitespace-nowrap">
                Learn more about Gaudi AI, where we&apos;ve been, and where we&apos;re headed next.
              </p>
            </div>
          </div>
        </section>

        {/* ── News list + pinned contact card ───────────────────────────────── */}
        <section className="px-4 py-14 sm:px-6 lg:py-20">
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr_20rem] lg:gap-12">
            <div>
              <div className="flex flex-col gap-6">
                {newsItems.map((item) => (
                  <NewsCard key={item.href} item={item} />
                ))}
              </div>
            </div>

            {/* pinned at the top per the wireframe */}
            <aside className="h-fit lg:sticky lg:top-24">
              <div className="rounded-3xl bg-section-dark p-6 text-section-dark-foreground sm:p-8">
                <p className="text-xs font-semibold uppercase tracking-wider text-primary">Contact us</p>
                <h2 className="mt-3 text-balance font-sans text-2xl font-light leading-[1.1] tracking-[-0.02em]">
                  Want to speak with a rep from Gaudi?
                </h2>
                <a
                  href={`mailto:${MEDIA_EMAIL}`}
                  className="mt-6 inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 active:scale-[0.98]"
                >
                  Email us
                  <ArrowUpRight className="size-4" />
                </a>
                <p className="mt-3 text-center text-xs text-section-dark-foreground/60">{MEDIA_EMAIL}</p>

                <div className="mt-6 space-y-3 border-t border-section-dark-foreground/15 pt-6">
                  <a
                    href={CALENDLY_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex h-11 w-full items-center justify-center gap-2 rounded-full border border-section-dark-foreground/25 px-6 text-sm font-semibold text-section-dark-foreground transition-colors hover:border-primary hover:text-primary"
                  >
                    <CalendarDays className="size-4" aria-hidden="true" />
                    Book a partnership call
                  </a>
                  <a
                    href={LINKEDIN_COMPANY}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex h-11 w-full items-center justify-center gap-2 rounded-full border border-section-dark-foreground/25 px-6 text-sm font-semibold text-section-dark-foreground transition-colors hover:border-primary hover:text-primary"
                  >
                    <Linkedin className="size-4" aria-hidden="true" />
                    Follow Gaudi on LinkedIn
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </section>

      </main>

      <SiteFooter />
    </div>
  )
}
