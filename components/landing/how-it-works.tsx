import { ArrowRight, ArrowDown, MessageSquare, Phone, Mail } from "lucide-react"
import { cn } from "@/lib/utils"

const inputs = [
  {
    src: "/images/how-it-works/input-phone.png",
    alt: "Contractor's phone showing unread texts and a missed call",
    desktop: "left-0 top-0 w-[42%] -rotate-6 z-30",
  },
  {
    src: "/images/how-it-works/input-note.png",
    alt: "Handwritten site notes with rough measurements",
    desktop: "right-0 top-1 w-[46%] rotate-3 z-10",
  },
  {
    src: "/images/how-it-works/input-blueprint.png",
    alt: "Architectural floor plan blueprint",
    desktop: "left-[6%] top-[36%] w-[44%] -rotate-2 z-40",
  },
  {
    src: "/images/how-it-works/input-contract.png",
    alt: "Printed construction services contract",
    desktop: "right-[2%] top-[30%] w-[42%] rotate-3 z-20",
  },
  {
    src: "/images/how-it-works/input-call.png",
    alt: "Contractor taking a phone call while driving to a job site",
    desktop: "bottom-0 left-0 w-[47%] rotate-2 z-30",
  },
  {
    src: "/images/how-it-works/input-email.png",
    alt: "Long email thread between a client and a subcontractor",
    desktop: "bottom-2 right-1 w-[45%] -rotate-3 z-10",
  },
]

function PhotoCard({ src, alt, className }: { src: string; alt: string; className?: string }) {
  return (
    <figure
      className={cn(
        "overflow-hidden rounded-xl border border-border bg-card p-1 shadow-lg shadow-foreground/10",
        className,
      )}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src || "/placeholder.svg"} alt={alt} className="aspect-square w-full rounded-lg object-cover" />
    </figure>
  )
}

function InputCollageDesktop() {
  return (
    <div className="relative mx-auto h-[380px] max-w-[380px]">
      {inputs.map((n) => (
        <PhotoCard key={n.src} src={n.src} alt={n.alt} className={cn("absolute", n.desktop)} />
      ))}
    </div>
  )
}

function InputGridMobile() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {inputs.map((n, i) => (
        <PhotoCard key={n.src} src={n.src} alt={n.alt} className={i % 2 === 0 ? "-rotate-2" : "rotate-2"} />
      ))}
    </div>
  )
}

function GaudiHub() {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative flex size-28 items-center justify-center rounded-[26px] bg-primary shadow-xl shadow-primary/25 ring-1 ring-inset ring-primary-foreground/15">
        <span className="font-sans text-lg font-semibold tracking-tight text-primary-foreground">Gaudi</span>
        {/* processing equalizer */}
        <span className="absolute bottom-3.5 flex items-end gap-1" aria-hidden="true">
          <span className="h-1.5 w-1 rounded-full bg-primary-foreground/70 animate-flow-pulse" />
          <span className="h-3 w-1 rounded-full bg-primary-foreground/70 animate-flow-pulse [animation-delay:0.2s]" />
          <span className="h-2 w-1 rounded-full bg-primary-foreground/70 animate-flow-pulse [animation-delay:0.4s]" />
          <span className="h-3.5 w-1 rounded-full bg-primary-foreground/70 animate-flow-pulse [animation-delay:0.6s]" />
        </span>
      </div>
      <span className="text-center text-sm font-medium text-muted-foreground">
        Structured
        <br className="hidden lg:block" /> project context
      </span>
    </div>
  )
}

function ChannelChips() {
  return (
    <div className="mb-3 flex items-center gap-3 text-[11px] font-medium text-muted-foreground">
      <span className="inline-flex items-center gap-1">
        <MessageSquare className="size-3.5 text-primary" aria-hidden="true" /> Text
      </span>
      <span className="inline-flex items-center gap-1">
        <Phone className="size-3.5 text-primary" aria-hidden="true" /> Call
      </span>
      <span className="inline-flex items-center gap-1">
        <Mail className="size-3.5 text-primary" aria-hidden="true" /> Email
      </span>
    </div>
  )
}

function AskGaudi() {
  return (
    <div className="mx-auto max-w-[380px] rounded-2xl border border-border bg-card p-3.5 shadow-xl shadow-foreground/10">
      <ChannelChips />

      {/* User request */}
      <div className="flex justify-end">
        <p className="max-w-[88%] text-pretty rounded-2xl rounded-br-md bg-primary px-3.5 py-2.5 text-sm leading-relaxed text-primary-foreground">
          &ldquo;Hey Gaudi, give me a material takeoff on the Myra Ave project.&rdquo;
        </p>
      </div>

      {/* Gaudi reply with the actual output */}
      <div className="mt-3 flex justify-start">
        <div className="max-w-[94%] rounded-2xl rounded-bl-md bg-secondary p-2.5">
          <p className="px-1 pb-2 text-sm leading-relaxed text-foreground">On it — here&apos;s your takeoff and estimate:</p>
          <figure className="overflow-hidden rounded-lg border border-border bg-card">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/how-it-works/output-estimate.png"
              alt="A finished material takeoff and cost estimate with line items, quantities, and a total"
              className="w-full object-cover"
            />
          </figure>
        </div>
      </div>

      {/* Follow-up request, showing the variety of asks */}
      <div className="mt-3 flex justify-end">
        <p className="max-w-[88%] text-pretty rounded-2xl rounded-br-md bg-primary/10 px-3.5 py-2.5 text-sm leading-relaxed text-foreground">
          &ldquo;Now an estimate on the Market Street apartment complex.&rdquo;
        </p>
      </div>
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
            Everything in.{" "}
            <span className="font-serif text-[1.06em] font-medium italic text-primary">Just ask</span> for what you need.
          </h2>
        </div>

        <div className="mt-14 rounded-3xl border border-border bg-secondary/50 p-6 sm:p-10">
          {/* Desktop flow */}
          <div className="hidden items-center gap-6 lg:flex">
            <div className="flex-1">
              <ZoneLabel>However it lands</ZoneLabel>
              <InputCollageDesktop />
            </div>

            <ArrowRight className="size-7 shrink-0 text-primary" aria-hidden="true" />

            <div className="shrink-0">
              <ZoneLabel>Gaudi runs it</ZoneLabel>
              <GaudiHub />
            </div>

            <ArrowRight className="size-7 shrink-0 text-primary" aria-hidden="true" />

            <div className="flex-[1.15]">
              <ZoneLabel>Just ask</ZoneLabel>
              <AskGaudi />
            </div>
          </div>

          {/* Mobile / tablet flow */}
          <div className="flex flex-col items-center gap-6 lg:hidden">
            <div className="w-full max-w-md">
              <ZoneLabel>However it lands</ZoneLabel>
              <InputGridMobile />
            </div>

            <ArrowDown className="size-6 text-primary" aria-hidden="true" />

            <div>
              <ZoneLabel>Gaudi runs it</ZoneLabel>
              <GaudiHub />
            </div>

            <ArrowDown className="size-6 text-primary" aria-hidden="true" />

            <div className="w-full max-w-sm">
              <ZoneLabel>Just ask</ZoneLabel>
              <AskGaudi />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
