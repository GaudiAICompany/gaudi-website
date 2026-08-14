import { ArrowRight, ArrowDown } from "lucide-react"
import { cn } from "@/lib/utils"

const inputs = [
  {
    src: "/images/how-it-works/input-phone.png",
    alt: "Contractor's phone showing a stack of unread texts and a missed call",
    className: "top-0 left-2 w-[45%] -rotate-6 z-20",
  },
  {
    src: "/images/how-it-works/input-note.png",
    alt: "Handwritten site notes with rough measurements on a legal pad",
    className: "top-6 right-0 w-[52%] rotate-3 z-10",
  },
  {
    src: "/images/how-it-works/input-blueprint.png",
    alt: "Rolled-out construction blueprint on a table",
    className: "bottom-0 left-0 w-[50%] rotate-3 z-30",
  },
  {
    src: "/images/how-it-works/input-jobsite.png",
    alt: "Photo from an active framing job site",
    className: "bottom-2 right-4 w-[44%] -rotate-3 z-10",
  },
]

function PhotoCard({
  src,
  alt,
  className,
}: {
  src: string
  alt: string
  className?: string
}) {
  return (
    <figure
      className={cn(
        "overflow-hidden rounded-2xl border border-border bg-card p-1.5 shadow-xl shadow-foreground/10",
        className,
      )}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src || "/placeholder.svg"} alt={alt} className="aspect-square w-full rounded-xl object-cover" />
    </figure>
  )
}

function GaudiHub() {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex size-32 flex-col items-center justify-center rounded-full bg-primary text-primary-foreground shadow-xl shadow-primary/30">
        <span className="font-sans text-2xl font-bold tracking-tight">Gaudi</span>
        <span className="mt-1.5 flex gap-1">
          <span className="size-1.5 rounded-full bg-primary-foreground/80 animate-flow-pulse" />
          <span className="size-1.5 rounded-full bg-primary-foreground/80 animate-flow-pulse [animation-delay:0.3s]" />
          <span className="size-1.5 rounded-full bg-primary-foreground/80 animate-flow-pulse [animation-delay:0.6s]" />
        </span>
      </div>
      <span className="text-sm font-medium text-muted-foreground">Sorts the chaos</span>
    </div>
  )
}

function ZoneLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-4 text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground">{children}</p>
  )
}

export function HowItWorks() {
  return (
    <section id="how-it-works" className="px-4 py-20 sm:px-6 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-primary">How it works</p>
          <h2 className="text-balance font-sans text-4xl font-light leading-[1.02] tracking-[-0.03em] text-foreground sm:text-5xl">
            Everything in. <span className="font-serif text-[1.06em] font-medium italic text-primary">One estimate</span> out.
          </h2>
        </div>

        <div className="mt-14 rounded-3xl border border-border bg-secondary/50 p-6 sm:p-10">
          {/* Desktop flow */}
          <div className="hidden items-center gap-6 lg:flex">
            {/* Inputs */}
            <div className="flex-1">
              <ZoneLabel>However it lands</ZoneLabel>
              <div className="relative mx-auto h-[340px] max-w-[360px]">
                {inputs.map((n) => (
                  <PhotoCard key={n.src} src={n.src} alt={n.alt} className={cn("absolute", n.className)} />
                ))}
              </div>
            </div>

            <ArrowRight className="size-7 shrink-0 text-primary" aria-hidden="true" />

            {/* Processing */}
            <div className="shrink-0">
              <ZoneLabel>Gaudi runs it</ZoneLabel>
              <GaudiHub />
            </div>

            <ArrowRight className="size-7 shrink-0 text-primary" aria-hidden="true" />

            {/* Output */}
            <div className="flex-1">
              <ZoneLabel>Priced &amp; ready</ZoneLabel>
              <figure className="mx-auto max-w-[320px] overflow-hidden rounded-2xl border border-border bg-card p-2 shadow-xl shadow-foreground/10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/how-it-works/output-estimate.png"
                  alt="A finished construction cost estimate with line items, quantities, and a total"
                  className="w-full rounded-xl object-cover"
                />
              </figure>
            </div>
          </div>

          {/* Mobile / tablet flow */}
          <div className="flex flex-col items-center gap-6 lg:hidden">
            <div className="w-full max-w-sm">
              <ZoneLabel>However it lands</ZoneLabel>
              <div className="grid grid-cols-2 gap-3">
                {inputs.map((n, i) => (
                  <PhotoCard
                    key={n.src}
                    src={n.src}
                    alt={n.alt}
                    className={i % 2 === 0 ? "-rotate-2" : "rotate-2"}
                  />
                ))}
              </div>
            </div>

            <ArrowDown className="size-6 text-primary" aria-hidden="true" />

            <div>
              <ZoneLabel>Gaudi runs it</ZoneLabel>
              <GaudiHub />
            </div>

            <ArrowDown className="size-6 text-primary" aria-hidden="true" />

            <div className="w-full max-w-xs">
              <ZoneLabel>Priced &amp; ready</ZoneLabel>
              <figure className="overflow-hidden rounded-2xl border border-border bg-card p-2 shadow-xl shadow-foreground/10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/how-it-works/output-estimate.png"
                  alt="A finished construction cost estimate with line items, quantities, and a total"
                  className="w-full rounded-xl object-cover"
                />
              </figure>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
