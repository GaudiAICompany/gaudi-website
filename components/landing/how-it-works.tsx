import {
  ArrowRight,
  CornerDownRight,
  MessageCircle,
  MessageSquare,
  Phone,
  Mail,
  Upload,
  Pencil,
  Search,
} from "lucide-react"
import { cn } from "@/lib/utils"

/* ------------------------- Left: input channels ------------------------- */

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

function Channels({ className }: { className?: string }) {
  return (
    <div className={cn("grid grid-cols-2 gap-3", className)}>
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

/* ------------------- Transition: inputs flow into Gaudi ---------------- */

// The arrow has to follow the layout: side-by-side zones on desktop, stacked on
// mobile, so it never points at something that is actually above or below it.
function ChaosToOrder({
  orientation = "horizontal",
  className,
}: {
  orientation?: "horizontal" | "vertical"
  className?: string
}) {
  const vertical = orientation === "vertical"
  return (
    <div className={cn("flex items-center", vertical && "flex-col", className)}>
      {/* incoming shaft, from the left on desktop / from above on mobile */}
      <svg
        viewBox={vertical ? "0 0 24 48" : "0 0 48 24"}
        className={cn("shrink-0", vertical ? "h-12 w-6" : "h-6 w-12")}
        role="img"
        aria-label={vertical ? "Inputs flow down into Gaudi" : "Inputs flow left to right into Gaudi"}
      >
        <line
          x1={vertical ? "12" : "0"}
          y1={vertical ? "0" : "12"}
          x2={vertical ? "12" : "48"}
          y2={vertical ? "48" : "12"}
          stroke="currentColor"
          className="text-primary"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>

      {/* the Gaudi mark, centered in the arrow */}
      <div
        className={cn(
          "flex size-32 shrink-0 items-center justify-center rounded-full border-2 border-primary bg-card",
          vertical ? "my-1.5" : "mx-1.5",
        )}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo_text.png" alt="Gaudi AI" className="w-24" />
      </div>

      {/* outgoing shaft, arrowhead pointing at wherever the results sit */}
      <svg
        viewBox={vertical ? "0 0 24 56" : "0 0 56 24"}
        className={cn("shrink-0", vertical ? "h-14 w-6" : "h-6 w-14")}
        role="img"
        aria-hidden="true"
      >
        <line
          x1={vertical ? "12" : "0"}
          y1={vertical ? "0" : "12"}
          x2={vertical ? "12" : "48"}
          y2={vertical ? "48" : "12"}
          stroke="currentColor"
          className="text-primary"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d={vertical ? "M5,42 L12,55 L19,42" : "M42,5 L55,12 L42,19"}
          fill="none"
          stroke="currentColor"
          className="text-primary"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}

/* --------------------------- Right: the answer --------------------------- */

const DOC_LINES = [
  { name: '1/2" drywall, 4×8 · 68 sheets', src: "Sheet A-3 · walls", val: "$965" },
  { name: "2×4×8 SPF studs · 320 ct", src: "Sheet S-2 · framing", val: "$1,280" },
  { name: "Interior latex paint · 14 gal", src: "Sheet A-6 · finishes", val: "$742" },
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
          <span className="inline-flex items-center rounded-md border border-[#1e3a5f]/40 px-2 py-1 text-[9px] font-bold uppercase leading-none tracking-wider text-[#1e3a5f]">
            Ready to send
          </span>
          <p className="text-[11px] leading-none text-muted-foreground">+ 125 more line items</p>
        </div>
      </div>
    </div>
  )
}

function OutputZone() {
  return (
    <div>
      <div className="mb-3 flex items-start gap-2.5">
        <MessageSquare className="mt-1 size-5 shrink-0 text-primary" aria-hidden="true" />
        <p className="text-pretty font-serif text-lg italic leading-snug text-foreground/85">
          &ldquo;Hey Gaudi, price the Myra Ave residence.&rdquo;
        </p>
      </div>

      <EstimateDoc />
    </div>
  )
}

/* ---------------------- Bottom row: audit + distribute ------------------- */

// 13 most likely outlet locations, spaced along the plan's interior walls
const OUTLET_MARKERS = [
  { top: "20%", left: "24%" },
  { top: "17%", left: "47%" },
  { top: "21%", left: "70%" },
  { top: "34%", left: "17%" },
  { top: "37%", left: "82%" },
  { top: "50%", left: "22%" },
  { top: "52%", left: "58%" },
  { top: "55%", left: "83%" },
  { top: "66%", left: "31%" },
  { top: "69%", left: "52%" },
  { top: "71%", left: "75%" },
  { top: "82%", left: "27%" },
  { top: "84%", left: "64%" },
]

function AuditCard() {
  return (
    <div className="flex h-full flex-col rounded-3xl border border-border bg-card p-6 sm:p-8">
      <p className="text-xs font-semibold uppercase tracking-wider text-primary">Audit &amp; edit</p>
      <h3 className="mt-2 font-sans text-2xl font-light tracking-tight text-foreground">
        Trace any number. Edit anything.
      </h3>

      <div className="mt-6 flex flex-1 flex-col gap-4 sm:flex-row sm:items-center sm:gap-5">
        <div className="relative w-full shrink-0 overflow-hidden rounded-xl ring-1 ring-border sm:w-60">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/how-it-works/input-blueprint.png"
            alt="Blueprint page A-3, showing the 13 outlet locations Gaudi found"
            className="h-44 w-full object-cover"
          />
          {/* small markers on the 13 most likely outlet locations along the walls */}
          {OUTLET_MARKERS.map((m, i) => (
            <span
              key={i}
              className="absolute size-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-primary bg-primary/25"
              style={{ top: m.top, left: m.left }}
              aria-hidden="true"
            />
          ))}
          <span className="absolute inset-x-0 bottom-0 bg-foreground/75 px-2 py-1 text-[10px] font-medium text-background">
            Sheet A-3 · 13 outlets
          </span>
        </div>

        <div className="flex flex-col items-center text-primary" aria-hidden="true">
          <Search className="size-4" />
          <div className="my-1 h-px w-8 bg-primary/40 sm:w-10" />
        </div>

        <div className="min-w-0 flex-1 rounded-xl bg-secondary/60 p-4">
          <p className="text-[13px] font-medium text-foreground">Electrical outlets · 13 ct</p>
          <div className="mt-2 inline-flex items-center gap-2 rounded-lg border border-dashed border-primary/60 bg-primary/5 px-3 py-2">
            <span className="text-sm text-muted-foreground">$25 × 13 =</span>
            <span className="text-lg font-semibold text-foreground">$325</span>
            <Pencil className="size-3.5 text-primary" aria-hidden="true" />
          </div>
          <p className="mt-2 text-[11px] text-muted-foreground">Gaudi relearns your pricing</p>
        </div>
      </div>
    </div>
  )
}

// Each thread is one question reaching Gaudi over a different channel, with the
// channel called out in the corner the way the "What you send" tiles do.
const ASK_THREADS = [
  {
    channel: "Email",
    icon: Mail,
    question: "How many drywall sheets on level 2?",
    answer: "68 sheets, 1/2\" 4×8 · Sheet A-3",
  },
  {
    channel: "WhatsApp",
    icon: MessageCircle,
    question: "How much do I owe Lone Star Electric?",
    answer: "$18,400 on the Myra Ave electrical package",
  },
  {
    channel: "Text",
    icon: MessageSquare,
    question: "What outlets are spec'd for the kitchen?",
    answer: "13 outlets · Sheet A-3 · walls",
  },
]

function JustAskCard() {
  return (
    <div className="flex h-full flex-col rounded-3xl border border-border bg-card p-6 sm:p-8">
      <p className="text-xs font-semibold uppercase tracking-wider text-primary">Just ask Gaudi</p>
      <h3 className="mt-2 font-sans text-2xl font-light tracking-tight text-foreground">
        Any channel. Any question. Answered.
      </h3>

      <ul className="mt-6 flex flex-1 flex-col justify-center gap-2.5">
        {ASK_THREADS.map((t) => (
          <li key={t.channel} className="rounded-xl border border-border bg-secondary/40 px-3 py-2.5">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-background px-2 py-0.5 text-[10px] font-semibold text-foreground shadow-sm">
                <t.icon className="size-3 text-primary" aria-hidden="true" />
                {t.channel}
              </span>
              <p className="text-[13px] leading-snug text-foreground">&ldquo;{t.question}&rdquo;</p>
            </div>
            <p className="mt-1 flex items-start gap-1.5 text-[11px] leading-snug text-muted-foreground">
              <CornerDownRight className="mt-px size-3 shrink-0 text-primary" aria-hidden="true" />
              {t.answer}
            </p>
          </li>
        ))}
      </ul>
    </div>
  )
}

/* -------------------------------- Section -------------------------------- */

function ZoneLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-2.5 text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground">
      {children}
    </p>
  )
}

export function HowItWorks() {
  return (
    <section id="product" className="px-4 py-8 sm:px-6 lg:py-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">Product</p>
          <h2 className="text-balance font-sans text-3xl font-light leading-[1.05] tracking-[-0.02em] text-foreground sm:text-4xl">
            Blueprints and site notes into ready-to-send estimates,{" "}
            <span className="font-serif text-[1.06em] font-medium italic text-primary">
              so you bid faster and win.
            </span>
          </h2>
        </div>

        {/* Locked to a single screen on desktop so the whole intake-to-estimate
            flow reads without scrolling; the channel tiles absorb the slack. */}
        <div className="mt-6 flex flex-col rounded-3xl border border-border bg-card p-4 sm:p-5 lg:h-[calc(100vh-5rem)] lg:min-h-[36rem] lg:max-h-[54rem]">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary">Intake to estimate</p>
          <h3 className="mt-2 font-sans text-xl font-light leading-snug tracking-tight text-foreground lg:whitespace-nowrap xl:text-2xl">
            Any format, any channel. Just ask for what you need.
          </h3>

          <div className="mt-4 hidden min-h-0 flex-1 items-stretch gap-5 lg:flex xl:gap-6">
            <div className="flex w-[340px] shrink-0 flex-col">
              <ZoneLabel>What you send</ZoneLabel>
              <Channels className="min-h-0 flex-1 [grid-auto-rows:minmax(0,1fr)]" />
            </div>

            <div className="flex shrink-0 items-center">
              <ChaosToOrder />
            </div>

            <div className="flex min-w-0 flex-1 flex-col">
              <ZoneLabel>Client-ready results</ZoneLabel>
              <div className="flex min-h-0 flex-1 items-center">
                <div className="w-full">
                  <OutputZone />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-col items-center gap-5 lg:hidden">
            <div className="w-full max-w-md">
              <ZoneLabel>What you send</ZoneLabel>
              <Channels className="[grid-auto-rows:10rem]" />
            </div>

            <div>
              <ChaosToOrder orientation="vertical" />
            </div>

            <div className="w-full max-w-md">
              <ZoneLabel>Client-ready results</ZoneLabel>
              <OutputZone />
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <AuditCard />
          <JustAskCard />
        </div>

        <div className="mt-6 flex justify-center">
          <a
            href="/product/coming-next"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-border bg-card px-6 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
          >
            Explore more capabilities coming soon
            <ArrowRight className="size-4 text-primary" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  )
}
