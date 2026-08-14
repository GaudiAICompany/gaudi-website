"use client"

import { useState } from "react"
import { ArrowRight, ArrowDown, MessageSquare, Phone, Mail, Upload, Pencil, Search, HelpCircle, Check } from "lucide-react"
import { cn } from "@/lib/utils"

/* ------------------------- Left: input channels ------------------------- */
/* Image-led tiles. The photo is the focus and carries the meaning; a small
   chip names the channel it arrived through, so both dimensions stay legible. */

function ChannelTile({
  src,
  alt,
  icon: Icon,
  channel,
  className,
  children,
}: {
  src: string
  alt: string
  icon: React.ComponentType<{ className?: string }>
  channel: string
  className?: string
  children?: React.ReactNode
}) {
  return (
    <div className={cn("group relative overflow-hidden rounded-xl ring-1 ring-border", className)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src || "/placeholder.svg"} alt={alt} className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-foreground/55 via-foreground/5 to-transparent" />
      <span className="absolute left-2.5 top-2.5 inline-flex items-center gap-1 rounded-full bg-background/90 px-2.5 py-1 text-[11px] font-semibold text-foreground shadow-sm backdrop-blur">
        <Icon className="size-3.5 text-primary" aria-hidden="true" />
        {channel}
      </span>
      {children}
    </div>
  )
}

function VoiceOverlay() {
  const bars = [5, 11, 7, 15, 9, 17, 8, 13, 6, 12, 7, 16, 10, 6, 9, 4, 12, 7]
  return (
    <div className="absolute inset-x-2.5 bottom-2.5" aria-hidden="true">
      <div className="flex items-center gap-[3px] rounded-md bg-background/85 px-2.5 py-2 backdrop-blur">
        {bars.map((h, i) => (
          <span key={i} className="w-[2px] rounded-full bg-primary/70" style={{ height: `${h}px` }} />
        ))}
        <span className="ml-1 text-[10px] font-medium text-muted-foreground">0:47</span>
      </div>
    </div>
  )
}

function Channels() {
  return (
    <div className="grid grid-cols-2 gap-3 [grid-auto-rows:8.5rem]">
      <ChannelTile
        src="/images/how-it-works/input-call.png"
        alt="Contractor taking a call from the truck"
        icon={Phone}
        channel="Call"
        className="row-span-2"
      >
        <VoiceOverlay />
      </ChannelTile>
      <ChannelTile
        src="/images/how-it-works/input-photo.png"
        alt="Job-site photo texted from the field"
        icon={MessageSquare}
        channel="Text"
      />
      <ChannelTile
        src="/images/how-it-works/input-blueprint.png"
        alt="Architectural blueprint emailed in"
        icon={Mail}
        channel="Email"
      />
      <ChannelTile
        src="/images/how-it-works/input-note.png"
        alt="Handwritten site notes with measurements"
        icon={MessageSquare}
        channel="Text"
      />
      <ChannelTile
        src="/images/how-it-works/input-contract.png"
        alt="Plans and contract uploaded to the dashboard"
        icon={Upload}
        channel="Upload"
      />
    </div>
  )
}

/* ---------------------------- Center: the mark --------------------------- */
/* A brain rendered in Gaudi's structural language — mosaic/masonry cells that
   read as "thinking + building." Means processing, not an abstract shape. */

function GaudiMind() {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative flex size-28 items-center justify-center rounded-full bg-primary [filter:drop-shadow(0_14px_26px_rgba(195,90,37,0.3))]">
        <svg viewBox="0 0 64 64" className="h-16 w-16" role="img" aria-label="Gaudi thinks it through">
          {/* brain silhouette split into structured cells = process/thinking */}
          <g className="fill-none stroke-primary-foreground" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            {/* outer brain outline */}
            <path d="M32 12c-6-5-16-3-18 5-6 1-8 9-4 13-3 5 1 12 7 12 2 4 9 5 15 2" />
            <path d="M32 12c6-5 16-3 18 5 6 1 8 9 4 13 3 5-1 12-7 12-2 4-9 5-15 2" />
            {/* central fissure */}
            <path d="M32 12v33" />
            {/* interior folds → structured 'courses' */}
            <path d="M24 22c4 1 5 5 3 8" />
            <path d="M40 22c-4 1-5 5-3 8" />
            <path d="M22 38c4-1 7 1 8 5" />
            <path d="M42 38c-4-1-7 1-8 5" />
          </g>
          {/* two synapse nodes lighting up = active thinking */}
          <circle cx="24" cy="30" r="2.4" className="fill-primary-foreground" />
          <circle cx="41" cy="34" r="2.4" className="fill-primary-foreground" />
        </svg>
      </div>
      <span className="text-center text-sm font-medium text-muted-foreground">
        Gaudi thinks it
        <br className="hidden lg:block" /> through
      </span>
    </div>
  )
}

/* --------------------------- Right: the answer --------------------------- */

type OutputKind = "takeoff" | "estimate" | "sub" | "question"

const OUTPUTS: { id: OutputKind; label: string }[] = [
  { id: "takeoff", label: "Takeoff" },
  { id: "estimate", label: "Estimate" },
  { id: "sub", label: "Sub-quote" },
  { id: "question", label: "Ask a question" },
]

const REQUESTS: Record<OutputKind, string> = {
  takeoff: "Hey Gaudi, give me a takeoff on the Myra Ave project.",
  estimate: "Hey Gaudi, price out the Market Street apartment complex.",
  sub: "Hey Gaudi, build an electrical sub-quote package for Myra Ave.",
  question: "Hey Gaudi, what outlets were specified for the Myra Ave kitchen?",
}

/* A branded GC document the contractor could forward straight to a client. */
function EstimateDoc({ kind }: { kind: Exclude<OutputKind, "question"> }) {
  const titles: Record<typeof kind, string> = {
    takeoff: "Material Takeoff",
    estimate: "Project Estimate",
    sub: "Electrical Sub-Quote",
  }
  const lines = [
    { name: '1/2" drywall · 68 sheets', src: "Blueprint pg A-3", val: "$965", edit: true },
    { name: "Framing lumber · 2×4 SPF", src: "Email · Rivera", val: "$3,120" },
    { name: "Interior paint · 14 gal", src: "Site photo", val: "$742" },
  ]
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-xl shadow-primary/10">
      {/* letterhead */}
      <div className="flex items-center justify-between border-b border-border bg-secondary/50 px-5 py-3.5">
        <div className="flex items-center gap-2.5">
          <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">
            R
          </span>
          <div className="leading-tight">
            <p className="text-sm font-semibold tracking-tight text-foreground">Rivera Construction Co.</p>
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Lic. #GC-4471 · Austin, TX</p>
          </div>
        </div>
        <span className="rotate-3 rounded-md border border-primary/60 bg-background px-2 py-1 text-[9px] font-bold uppercase tracking-wider text-primary">
          Ready to send
        </span>
      </div>

      {/* doc body */}
      <div className="px-5 py-4">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-primary">{titles[kind]}</p>
            <p className="text-sm text-muted-foreground">Myra Ave Residence · Prepared for J. Okafor</p>
          </div>
          <p className="font-sans text-3xl font-light tracking-tight text-foreground">$41,750</p>
        </div>

        {/* line items with visible source + edit interaction */}
        <div className="mt-4 divide-y divide-border/70 border-y border-border/70">
          {lines.map((l) => (
            <div key={l.name} className="flex items-center justify-between gap-3 py-2.5">
              <div className="min-w-0">
                <p className="truncate text-[13px] font-medium text-foreground">{l.name}</p>
                <p className="mt-0.5 inline-flex items-center gap-1 rounded-full bg-secondary px-1.5 py-0.5 text-[10px] text-muted-foreground">
                  <Search className="size-2.5 text-primary/70" aria-hidden="true" />
                  {l.src}
                </p>
              </div>
              {l.edit ? (
                <span className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-dashed border-primary/60 bg-primary/5 px-2.5 py-1.5 text-[13px] font-semibold text-foreground">
                  {l.val}
                  <Pencil className="size-3 text-primary" aria-hidden="true" />
                </span>
              ) : (
                <span className="shrink-0 text-[13px] font-semibold text-foreground">{l.val}</span>
              )}
            </div>
          ))}
        </div>

        <p className="mt-3 text-right text-[11px] text-muted-foreground">+ 125 more line items</p>
      </div>
    </div>
  )
}

/* Q&A output — Gaudi answers a direct question, cited to source. */
function QuestionAnswer() {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-xl shadow-primary/10">
      <div className="flex items-start gap-2.5">
        <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-md bg-primary text-[11px] font-semibold text-primary-foreground">
          G
        </span>
        <div>
          <p className="text-[15px] font-medium leading-snug text-foreground">
            Spec calls for <span className="text-primary">20A tamper-resistant GFCI</span> outlets on all kitchen
            counter circuits.
          </p>
          <p className="mt-2 inline-flex items-center gap-1 rounded-full bg-secondary px-2 py-0.5 text-[11px] text-muted-foreground">
            <Search className="size-3 text-primary/70" aria-hidden="true" />
            From Electrical spec, sheet E-2 · note 4
          </p>
        </div>
      </div>
    </div>
  )
}

function GaudiAnswer() {
  const [kind, setKind] = useState<OutputKind>("takeoff")
  return (
    <div className="mx-auto max-w-[460px]">
      {/* output switcher */}
      <div className="mb-4 flex flex-wrap gap-1.5">
        {OUTPUTS.map((o) => (
          <button
            key={o.id}
            type="button"
            onClick={() => setKind(o.id)}
            className={cn(
              "rounded-full px-3 py-1 text-[12px] font-medium transition-colors",
              kind === o.id
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-muted-foreground hover:text-foreground",
            )}
          >
            {o.label}
          </button>
        ))}
      </div>

      {/* the spoken request */}
      <div className="mb-5 flex items-start gap-2.5">
        {kind === "question" ? (
          <HelpCircle className="mt-1 size-5 shrink-0 text-primary" aria-hidden="true" />
        ) : (
          <MessageSquare className="mt-1 size-5 shrink-0 text-primary" aria-hidden="true" />
        )}
        <p className="text-pretty font-serif text-lg italic leading-snug text-foreground/85">
          &ldquo;{REQUESTS[kind]}&rdquo;
        </p>
      </div>

      {/* the result */}
      {kind === "question" ? <QuestionAnswer /> : <EstimateDoc kind={kind} />}

      {/* two ideas, minimal copy */}
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl bg-card/60 p-3 ring-1 ring-border">
          <p className="flex items-center gap-1.5 text-[13px] font-semibold text-foreground">
            <Check className="size-4 text-primary" aria-hidden="true" />
            Gaudi runs it
          </p>
          <p className="mt-1 text-[12px] leading-snug text-muted-foreground">
            Takeoffs, quantities, and current pricing — pulled and checked automatically.
          </p>
        </div>
        <div className="rounded-xl bg-card/60 p-3 ring-1 ring-border">
          <p className="flex items-center gap-1.5 text-[13px] font-semibold text-foreground">
            <Pencil className="size-4 text-primary" aria-hidden="true" />
            Review, not redo
          </p>
          <p className="mt-1 text-[12px] leading-snug text-muted-foreground">
            Check it, adjust any line, send it — no rebuilding from a spreadsheet.
          </p>
        </div>
      </div>
    </div>
  )
}

/* -------------------------------- Section -------------------------------- */

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
            Send it <span className="font-serif text-[1.06em] font-medium italic text-primary">however it lands</span>.
          </h2>
        </div>

        <div className="mt-14 rounded-3xl border border-border bg-secondary/50 p-6 sm:p-10">
          {/* Desktop flow */}
          <div className="hidden items-center gap-6 lg:flex">
            <div className="w-[340px] shrink-0">
              <ZoneLabel>However it arrives</ZoneLabel>
              <Channels />
            </div>

            <ArrowRight className="size-7 shrink-0 text-primary" aria-hidden="true" />

            <div className="shrink-0">
              <ZoneLabel>Gaudi runs it</ZoneLabel>
              <GaudiMind />
            </div>

            <ArrowRight className="size-7 shrink-0 text-primary" aria-hidden="true" />

            <div className="flex-1">
              <ZoneLabel>Just ask</ZoneLabel>
              <GaudiAnswer />
            </div>
          </div>

          {/* Mobile / tablet flow */}
          <div className="flex flex-col items-center gap-6 lg:hidden">
            <div className="w-full max-w-md">
              <ZoneLabel>However it arrives</ZoneLabel>
              <Channels />
            </div>

            <ArrowDown className="size-6 text-primary" aria-hidden="true" />

            <div>
              <ZoneLabel>Gaudi runs it</ZoneLabel>
              <GaudiMind />
            </div>

            <ArrowDown className="size-6 text-primary" aria-hidden="true" />

            <div className="w-full max-w-md">
              <ZoneLabel>Just ask</ZoneLabel>
              <GaudiAnswer />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
