import { ArrowRight, ArrowDown, MessageSquare, Phone, Mail, Upload, Pencil, Search, Check, Send, FileText, Building2, Folder } from "lucide-react"
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
    <div className="grid grid-cols-2 gap-3 [grid-auto-rows:7.5rem]">
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

/* --------------------- Transition: chaos becomes order -------------------- */
/* Line-art metaphor: a tangled scrawl on the input side resolves into a single
   clean circle + thread by the time it reaches Gaudi. Minimal, modern. */

function ScribbleFlow({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 280 120"
      className={className}
      role="img"
      aria-label="Tangled, messy inputs resolving into one clean thread"
    >
      {/* chaos — a dense tangled scribble */}
      <g
        fill="none"
        stroke="currentColor"
        className="text-muted-foreground/55"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M14,60 C30,30 60,26 52,54 C44,86 14,80 30,50 C46,20 88,30 70,64 C52,98 20,86 42,54 C62,24 98,36 80,68 C60,102 28,88 50,56 C66,30 92,50 74,72" />
        <path d="M24,44 C40,36 66,42 60,58 C54,76 30,72 40,52 C50,34 82,44 72,66" />
        <path d="M20,76 C36,68 58,72 66,56" />
        <path d="M34,30 C46,40 44,54 34,58" />
      </g>
      {/* the thread untangles */}
      <path
        d="M92,60 C126,50 150,72 176,60"
        fill="none"
        stroke="currentColor"
        className="text-primary"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {/* order — one clean circle */}
      <circle cx="214" cy="60" r="26" fill="none" stroke="currentColor" className="text-primary" strokeWidth="2.5" />
      {/* into Gaudi */}
      <path
        d="M242,60 L272,60"
        fill="none"
        stroke="currentColor"
        className="text-primary"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M266,54 L273,60 L266,66"
        fill="none"
        stroke="currentColor"
        className="text-primary"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/* ---------------------------- Center: the mark --------------------------- */
/* A brain rendered in Gaudi's structural language — reads as "thinking +
   building." Means processing, not an abstract app icon. */

function GaudiMind() {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative flex size-28 items-center justify-center rounded-full bg-primary [filter:drop-shadow(0_14px_26px_rgba(195,90,37,0.3))]">
        <svg viewBox="0 0 64 64" className="h-16 w-16" role="img" aria-label="Gaudi thinks it through">
          <g
            className="fill-none stroke-primary-foreground"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M32 12c-6-5-16-3-18 5-6 1-8 9-4 13-3 5 1 12 7 12 2 4 9 5 15 2" />
            <path d="M32 12c6-5 16-3 18 5 6 1 8 9 4 13 3 5-1 12-7 12-2 4-9 5-15 2" />
            <path d="M32 12v33" />
            <path d="M24 22c4 1 5 5 3 8" />
            <path d="M40 22c-4 1-5 5-3 8" />
            <path d="M22 38c4-1 7 1 8 5" />
            <path d="M42 38c-4-1-7 1-8 5" />
          </g>
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
/* A fully branded GC document — Rivera's own letterhead & color, so it clearly
   reads as something they'd forward straight to a client. */

const DOC_LINES = [
  { name: '1/2" drywall · 68 sheets', src: "Blueprint pg A-3", val: "$965" },
  { name: "Framing lumber · 2×4 SPF", src: "Email · Rivera", val: "$3,120" },
  { name: "Interior paint · 14 gal", src: "Site photo", val: "$742" },
]

function EstimateDoc() {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-xl shadow-foreground/10">
      {/* GC letterhead — Rivera's OWN brand (navy), distinct from Gaudi */}
      <div className="flex items-center justify-between bg-[#1e3a5f] px-5 py-3.5 text-white">
        <div className="flex items-center gap-2.5">
          <span className="flex size-9 items-center justify-center rounded-md bg-white/10 font-serif text-base font-semibold ring-1 ring-white/25">
            R
          </span>
          <div className="leading-tight">
            <p className="text-sm font-semibold tracking-tight">Rivera Construction Co.</p>
            <p className="text-[10px] uppercase tracking-[0.14em] text-white/60">Lic. #GC-4471 · Austin, TX</p>
          </div>
        </div>
        <span className="rounded-sm bg-white/10 px-2 py-1 text-[9px] font-bold uppercase tracking-wider text-white/80 ring-1 ring-white/20">
          Estimate
        </span>
      </div>

      <div className="px-5 py-4">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-[#1e3a5f]">Project Estimate</p>
            <p className="text-sm text-muted-foreground">Myra Ave Residence · Prepared for J. Okafor</p>
          </div>
          <p className="font-sans text-3xl font-light tracking-tight text-[#1e3a5f]">$41,750</p>
        </div>

        <div className="mt-4 divide-y divide-border/70 border-y border-border/70">
          {DOC_LINES.map((l) => (
            <div key={l.name} className="flex items-center justify-between gap-3 py-2.5">
              <div className="min-w-0">
                <p className="truncate text-[13px] font-medium text-foreground">{l.name}</p>
                <p className="mt-0.5 inline-flex items-center gap-1 rounded-full bg-secondary px-1.5 py-0.5 text-[10px] text-muted-foreground">
                  <Search className="size-2.5 text-primary/70" aria-hidden="true" />
                  {l.src}
                </p>
              </div>
              <span className="shrink-0 text-[13px] font-semibold text-foreground">{l.val}</span>
            </div>
          ))}
        </div>

        <div className="mt-3 flex items-center justify-between">
          <span className="inline-block rotate-[-3deg] rounded-md border border-[#1e3a5f]/40 px-2 py-1 text-[9px] font-bold uppercase tracking-wider text-[#1e3a5f]">
            Ready to send
          </span>
          <p className="text-[11px] text-muted-foreground">+ 125 more line items</p>
        </div>
      </div>
    </div>
  )
}

const SAMPLE_PROMPTS = [
  { q: "What outlets are spec'd for the kitchen?", tag: "Spec lookup" },
  { q: "When must framing start to hit the June close?", tag: "Scheduling" },
  { q: "How many drywall sheets for level 2?", tag: "Quantities" },
  { q: "What's my margin on this bid?", tag: "Financials" },
]

function OutputZone() {
  return (
    <div>
      {/* the spoken request that produced the document */}
      <div className="mb-4 flex items-start gap-2.5">
        <MessageSquare className="mt-1 size-5 shrink-0 text-primary" aria-hidden="true" />
        <p className="text-pretty font-serif text-lg italic leading-snug text-foreground/85">
          &ldquo;Hey Gaudi, price the Market Street apartment complex.&rdquo;
        </p>
      </div>

      <div className="flex flex-col gap-5 xl:flex-row xl:items-start">
        <div className="min-w-0 flex-1">
          <EstimateDoc />
        </div>

        {/* several example prompts, positioned alongside the output */}
        <div className="xl:w-52 xl:shrink-0">
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            Or just ask Gaudi
          </p>
          <ul className="grid grid-cols-2 gap-2 xl:grid-cols-1">
            {SAMPLE_PROMPTS.map((p) => (
              <li key={p.q} className="rounded-xl border border-border bg-card px-3 py-2">
                <p className="text-[12.5px] leading-snug text-foreground">&ldquo;{p.q}&rdquo;</p>
                <p className="mt-1 text-[10px] font-medium uppercase tracking-wider text-primary/80">{p.tag}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

/* ---------------------- Bottom row: audit + distribute ------------------- */

function AuditCard() {
  return (
    <div className="rounded-3xl border border-border bg-card p-6 sm:p-8">
      <p className="text-xs font-semibold uppercase tracking-wider text-primary">Audit &amp; edit</p>
      <h3 className="mt-2 font-sans text-2xl font-light tracking-tight text-foreground">
        Trace any number. Change anything.
      </h3>
      <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
        Every line traces back to the exact plan page, email, or photo it came from. Edit any value and Gaudi carries
        the change through — and learns from it.
      </p>

      <div className="mt-6 flex items-center gap-3 sm:gap-4">
        {/* the source */}
        <div className="relative w-36 shrink-0 overflow-hidden rounded-xl ring-1 ring-border sm:w-40">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/how-it-works/input-blueprint.png"
            alt="Blueprint page A-3, the source of the drywall quantity"
            className="h-28 w-full object-cover"
          />
          <span className="absolute left-4 top-7 h-7 w-16 rounded border-2 border-primary bg-primary/10" aria-hidden="true" />
          <span className="absolute inset-x-0 bottom-0 bg-foreground/75 px-2 py-1 text-[10px] font-medium text-background">
            Blueprint · page A-3
          </span>
        </div>

        {/* traced to */}
        <div className="flex flex-col items-center text-primary" aria-hidden="true">
          <Search className="size-4" />
          <div className="my-1 h-px w-8 bg-primary/40 sm:w-10" />
        </div>

        {/* the editable value */}
        <div className="flex-1 rounded-xl bg-secondary/60 p-4">
          <p className="text-[13px] font-medium text-foreground">1/2&quot; drywall · 68 sheets</p>
          <div className="mt-2 inline-flex items-center gap-2 rounded-lg border border-dashed border-primary/60 bg-primary/5 px-3 py-2">
            <span className="text-lg font-semibold text-foreground">$965</span>
            <Pencil className="size-3.5 text-primary" aria-hidden="true" />
          </div>
          <p className="mt-2 text-[11px] text-muted-foreground">Edit → Gaudi relearns your pricing</p>
        </div>
      </div>
    </div>
  )
}

const SUBS = [
  { name: "Lone Star Electric", quoted: true, val: "$18,400" },
  { name: "Delta Mechanical", quoted: false },
  { name: "Austin Voltage", quoted: false },
]

function SubsCard() {
  return (
    <div className="rounded-3xl border border-border bg-card p-6 sm:p-8">
      <p className="text-xs font-semibold uppercase tracking-wider text-primary">Send to subs</p>
      <h3 className="mt-2 font-sans text-2xl font-light tracking-tight text-foreground">
        Package it. Send it out for quotes.
      </h3>
      <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
        Tell Gaudi to bundle the plans, scope, and specs and send them to your subs — quotes come back organized and
        comparable.
      </p>

      <div className="mt-5 flex items-start gap-2">
        <MessageSquare className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
        <p className="font-serif text-base italic leading-snug text-foreground/85">
          &ldquo;Hey Gaudi, send the electrical package to my subs for quotes.&rdquo;
        </p>
      </div>

      <div className="mt-5 flex items-center gap-3 sm:gap-4">
        {/* the package */}
        <div className="w-40 shrink-0 rounded-xl border border-border bg-secondary/50 p-3">
          <p className="flex items-center gap-1.5 text-[12px] font-semibold text-foreground">
            <Folder className="size-4 text-primary" aria-hidden="true" />
            Electrical package
          </p>
          <ul className="mt-2 space-y-1">
            {["Plans A-1–A-8.pdf", "Scope of work.pdf", "Spec sheet E-2.pdf"].map((f) => (
              <li key={f} className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                <FileText className="size-3 shrink-0" aria-hidden="true" />
                <span className="truncate">{f}</span>
              </li>
            ))}
          </ul>
        </div>

        <Send className="size-5 shrink-0 text-primary" aria-hidden="true" />

        {/* the recipients */}
        <div className="flex-1 space-y-2">
          {SUBS.map((s) => (
            <div key={s.name} className="flex items-center justify-between gap-2 rounded-lg bg-secondary/50 px-3 py-2">
              <span className="flex min-w-0 items-center gap-2 text-[12px] text-foreground">
                <Building2 className="size-3.5 shrink-0 text-muted-foreground" aria-hidden="true" />
                <span className="truncate">{s.name}</span>
              </span>
              {s.quoted ? (
                <span className="inline-flex shrink-0 items-center gap-1 text-[11px] font-semibold text-primary">
                  <Check className="size-3" aria-hidden="true" />
                  {s.val}
                </span>
              ) : (
                <span className="shrink-0 text-[11px] text-muted-foreground">Invited</span>
              )}
            </div>
          ))}
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
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-primary">How it works</p>
          <h2 className="text-balance font-sans text-4xl font-light leading-[1.04] tracking-[-0.03em] text-foreground sm:text-5xl">
            Any format, any channel.{" "}
            <span className="font-serif text-[1.06em] font-medium italic text-primary">
              Just ask for what you need.
            </span>
          </h2>
        </div>

        <div className="mt-14 rounded-3xl border border-border bg-secondary/50 p-6 sm:p-10">
          {/* Desktop flow */}
          <div className="hidden items-center gap-5 lg:flex xl:gap-6">
            <div className="w-[280px] shrink-0">
              <ZoneLabel>Send Gaudi your project information</ZoneLabel>
              <Channels />
            </div>

            <ScribbleFlow className="h-24 w-[136px] shrink-0 xl:w-[150px]" />

            <div className="shrink-0">
              <ZoneLabel>Gaudi runs it</ZoneLabel>
              <GaudiMind />
            </div>

            <ArrowRight className="size-7 shrink-0 text-primary" aria-hidden="true" />

            <div className="min-w-0 flex-1">
              <ZoneLabel>Client-ready result</ZoneLabel>
              <OutputZone />
            </div>
          </div>

          {/* Mobile / tablet flow */}
          <div className="flex flex-col items-center gap-5 lg:hidden">
            <div className="w-full max-w-md">
              <ZoneLabel>Send Gaudi your project information</ZoneLabel>
              <Channels />
            </div>

            <ScribbleFlow className="h-20 w-56" />

            <div>
              <ZoneLabel>Gaudi runs it</ZoneLabel>
              <GaudiMind />
            </div>

            <ArrowDown className="size-6 text-primary" aria-hidden="true" />

            <div className="w-full max-w-md">
              <ZoneLabel>Client-ready result</ZoneLabel>
              <OutputZone />
            </div>
          </div>
        </div>

        {/* Bottom row — separate from the primary input→output flow */}
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <AuditCard />
          <SubsCard />
        </div>
      </div>
    </section>
  )
}
