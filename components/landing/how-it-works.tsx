import {
  ArrowRight,
  ArrowDown,
  MessageSquare,
  Phone,
  Mail,
  Upload,
  Pencil,
  Search,
  Check,
  Send,
  FileText,
  Building2,
  Folder,
} from "lucide-react"
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
    <div className={cn("group relative overflow-hidden rounded-2xl ring-1 ring-border", className)}>
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
  const bars = [5, 12, 8, 17, 10, 20, 9, 15, 7, 14, 8, 19, 11, 7, 10, 5, 14, 8, 16, 9]
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
    <div className="grid grid-cols-2 gap-3 [grid-auto-rows:9rem]">
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

/* ------------------- Transition: chaos resolves into Gaudi ---------------- */
/* A single continuous line: it starts as a tangled scrawl on the input side and
   unwinds, left to right, into one smooth loop, the resolution point, clearly
   labeled Gaudi. A stroke gradient carries the eye from grey chaos to brand
   order. No separate disc, icon, or glow, so it reads as one flowing metaphor
   and its background stays flush with the rest of the panel. */

function ChaosToOrder({ className }: { className?: string }) {
  return (
    <div className={cn("relative", className)}>
      <svg
        viewBox="0 0 200 124"
        className="h-28 w-auto"
        role="img"
        aria-label="One tangled line unwinding into a single clean loop labeled Gaudi"
      >
        <defs>
          <linearGradient id="chaosToOrder" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="currentColor" className="text-muted-foreground/45" />
            <stop offset="55%" stopColor="currentColor" className="text-primary/70" />
            <stop offset="100%" stopColor="currentColor" className="text-primary" />
          </linearGradient>
        </defs>
        <path
          d="M10,60 C22,38 48,44 42,62 C36,82 14,74 28,52 C44,26 74,40 60,64 C50,84 32,76 46,56 C58,38 74,50 68,62 C86,52 96,66 116,62 C116,43 131,28 150,28 C169,28 184,43 184,62 C184,81 169,96 150,96 C131,96 116,81 116,62"
          fill="none"
          stroke="url(#chaosToOrder)"
          strokeWidth="2.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="pointer-events-none absolute left-[75%] top-1/2 -translate-x-1/2 -translate-y-1/2 font-serif text-[15px] font-semibold tracking-tight text-foreground">
        Gaudi
      </span>
    </div>
  )
}

/* --------------------------- Right: the answer --------------------------- */
/* A fully branded GC document, Rivera's own letterhead and color, so it clearly
   reads as something they would forward straight to a client. */

const DOC_LINES = [
  { name: '1/2" drywall, 4×8 · 68 sheets', src: "Sheet A-3 · walls", val: "$965" },
  { name: "2×4×8 SPF studs · 320 ct", src: "Sheet S-2 · framing", val: "$1,280" },
  { name: "Interior latex paint · 14 gal", src: "Finish schedule", val: "$742" },
]

function EstimateDoc() {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-xl shadow-foreground/10">
      {/* GC letterhead, Rivera's OWN brand (navy), distinct from Gaudi */}
      <div className="flex items-center justify-between bg-[#1e3a5f] px-5 py-4 text-white">
        <div className="flex items-center gap-2.5">
          <span className="flex size-10 items-center justify-center rounded-md bg-white/10 font-serif text-lg font-semibold ring-1 ring-white/25">
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
  { q: "When is the takeoff due for the Market St bid?", tag: "Deadlines" },
  { q: "How many drywall sheets on level 2?", tag: "Quantities" },
  { q: "How much do I owe Lone Star Electric?", tag: "Payables" },
]

function OutputZone() {
  return (
    <div>
      {/* the spoken request that produced the document */}
      <div className="mb-4 flex items-start gap-2.5">
        <MessageSquare className="mt-1 size-5 shrink-0 text-primary" aria-hidden="true" />
        <p className="text-pretty font-serif text-lg italic leading-snug text-foreground/85">
          &ldquo;Hey Gaudi, price the Myra Ave residence.&rdquo;
        </p>
      </div>

      <div className="flex flex-col gap-5 xl:flex-row xl:items-start">
        <div className="min-w-0 flex-1">
          <EstimateDoc />
        </div>

        {/* several example prompts, positioned alongside the output */}
        <div className="xl:w-56 xl:shrink-0">
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
/* Visual-led. Text is trimmed to a label and one short line; the examples do
   the explaining. */

function AuditCard() {
  return (
    <div className="rounded-3xl border border-border bg-card p-6 sm:p-8">
      <p className="text-xs font-semibold uppercase tracking-wider text-primary">Audit &amp; edit</p>
      <h3 className="mt-2 font-sans text-2xl font-light tracking-tight text-foreground">
        Trace any number. Edit anything.
      </h3>

      <div className="mt-6 flex items-center gap-4 sm:gap-5">
        {/* the source */}
        <div className="relative w-44 shrink-0 overflow-hidden rounded-xl ring-1 ring-border sm:w-52">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/how-it-works/input-blueprint.png"
            alt="Blueprint page A-3, the source of the drywall quantity"
            className="h-36 w-full object-cover"
          />
          <span
            className="absolute left-6 top-10 h-9 w-24 rounded border-2 border-primary bg-primary/10"
            aria-hidden="true"
          />
          <span className="absolute inset-x-0 bottom-0 bg-foreground/75 px-2 py-1 text-[10px] font-medium text-background">
            Sheet A-3
          </span>
        </div>

        {/* traced to */}
        <div className="flex flex-col items-center text-primary" aria-hidden="true">
          <Search className="size-4" />
          <div className="my-1 h-px w-8 bg-primary/40 sm:w-10" />
        </div>

        {/* the editable value */}
        <div className="flex-1 rounded-xl bg-secondary/60 p-4">
          <p className="text-[13px] font-medium text-foreground">1/2&quot; drywall, 4×8 · 68 sheets</p>
          <div className="mt-2 inline-flex items-center gap-2 rounded-lg border border-dashed border-primary/60 bg-primary/5 px-3 py-2">
            <span className="text-lg font-semibold text-foreground">$965</span>
            <Pencil className="size-3.5 text-primary" aria-hidden="true" />
          </div>
          <p className="mt-2 text-[11px] text-muted-foreground">Gaudi relearns your pricing</p>
        </div>
      </div>
    </div>
  )
}

const SUBS = [
  { name: "Lone Star Electric", quoted: true, val: "$18,400" },
  { name: "Capitol City Electric", quoted: false },
  { name: "Delta Power & Light", quoted: false },
]

function SubsCard() {
  return (
    <div className="rounded-3xl border border-border bg-card p-6 sm:p-8">
      {/* label: Sub coordination */}
      <p className="text-xs font-semibold uppercase tracking-wider text-primary">Sub coordination</p>
      <h3 className="mt-2 font-sans text-2xl font-light tracking-tight text-foreground">
        Package it. Send for quotes.
      </h3>

      <div className="mt-6 flex items-center gap-4 sm:gap-5">
        {/* the package */}
        <div className="w-44 shrink-0 rounded-xl border border-border bg-secondary/50 p-4">
          <p className="flex items-center gap-1.5 text-[13px] font-semibold text-foreground">
            <Folder className="size-4 text-primary" aria-hidden="true" />
            Electrical package
          </p>
          <ul className="mt-2.5 space-y-1.5">
            {["Plans E-1 to E-4.pdf", "Scope of work.pdf", "Spec 26 05 00.pdf"].map((f) => (
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
            <div key={s.name} className="flex items-center justify-between gap-2 rounded-lg bg-secondary/50 px-3 py-2.5">
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
            <div className="w-[300px] shrink-0">
              <ZoneLabel>Send Gaudi your project information</ZoneLabel>
              <Channels />
            </div>

            <div className="shrink-0">
              <ZoneLabel>Gaudi runs it</ZoneLabel>
              <ChaosToOrder />
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

            <div>
              <ZoneLabel>Gaudi runs it</ZoneLabel>
              <ChaosToOrder />
            </div>

            <ArrowDown className="size-6 text-primary" aria-hidden="true" />

            <div className="w-full max-w-md">
              <ZoneLabel>Client-ready result</ZoneLabel>
              <OutputZone />
            </div>
          </div>
        </div>

        {/* Bottom row, separate from the primary input to output flow */}
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <AuditCard />
          <SubsCard />
        </div>
      </div>
    </section>
  )
}
