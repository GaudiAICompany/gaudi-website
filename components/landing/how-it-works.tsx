import { ArrowRight, ArrowDown, MessageSquare, Phone, Mail, Upload, Pencil, Search, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

/* ------------------------- Left: input channels ------------------------- */
/* Image-led tiles. The photo carries the meaning; a small chip names the
   channel it arrived through, so both dimensions (format + path) stay legible. */

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
      <span className="absolute left-2 top-2 inline-flex items-center gap-1 rounded-full bg-background/90 px-2 py-0.5 text-[10px] font-semibold text-foreground shadow-sm backdrop-blur">
        <Icon className="size-3 text-primary" aria-hidden="true" />
        {channel}
      </span>
      {children}
    </div>
  )
}

function VoiceOverlay() {
  const bars = [5, 11, 7, 15, 9, 17, 8, 13, 6, 12, 7, 16, 10, 6, 9, 4]
  return (
    <div className="absolute inset-x-2 bottom-2" aria-hidden="true">
      <div className="flex items-center gap-[3px] rounded-md bg-background/85 px-2 py-1.5 backdrop-blur">
        {bars.map((h, i) => (
          <span key={i} className="w-[2px] rounded-full bg-primary/70" style={{ height: `${h}px` }} />
        ))}
        <span className="ml-1 text-[9px] font-medium text-muted-foreground">0:47</span>
      </div>
    </div>
  )
}

function Channels() {
  return (
    <div className="grid grid-cols-2 gap-3 [grid-auto-rows:6.5rem]">
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

/* ---------------------------- Center: the arch --------------------------- */
/* Gaudí's signature catenary arch — a gateway the mess passes through and
   comes out as structured, load-bearing courses. A mark that could only be Gaudi. */

function GaudiArch() {
  return (
    <div className="flex flex-col items-center gap-4">
      <svg
        viewBox="0 0 120 150"
        className="h-36 w-auto [filter:drop-shadow(0_12px_22px_rgba(195,90,37,0.28))]"
        role="img"
        aria-label="Gaudi"
      >
        {/* arch silhouette (legs + catenary crown, hollow opening) */}
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M18 150 L18 62 C18 30 40 14 60 14 C80 14 102 30 102 62 L102 150 Z M38 150 L38 64 C38 44 48 34 60 34 C72 34 82 44 82 64 L82 150 Z"
          className="fill-primary"
        />
        {/* keystone at the crown */}
        <path d="M60 16 L70 28 L60 40 L50 28 Z" className="fill-primary-foreground" />
        {/* structured courses assembling inside the opening */}
        <line x1="46" y1="132" x2="74" y2="132" strokeWidth="4" strokeLinecap="round" className="stroke-primary/80" />
        <line x1="47" y1="120" x2="73" y2="120" strokeWidth="4" strokeLinecap="round" className="stroke-primary/45" />
        <line x1="50" y1="108" x2="70" y2="108" strokeWidth="4" strokeLinecap="round" className="stroke-primary/25" />
      </svg>
      <span className="text-center text-sm font-medium text-muted-foreground">
        Sorts the chaos
        <br className="hidden lg:block" /> into structure
      </span>
    </div>
  )
}

/* --------------------------- Right: the answer --------------------------- */
/* Editorial, not a product screenshot: a spoken request, a big result number
   as the anchor, and margin annotations for traceable + editable/learns. */

function AskChips() {
  const asks = ["Takeoff", "Estimate", "Sub-quote"]
  return (
    <div className="mb-5 flex flex-wrap items-center gap-1.5 text-[11px]">
      <span className="text-muted-foreground">Ask for a</span>
      {asks.map((a, i) => (
        <span
          key={a}
          className={cn(
            "rounded-full px-2 py-0.5 font-medium",
            i === 0 ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground",
          )}
        >
          {a}
        </span>
      ))}
    </div>
  )
}

function GaudiAnswer() {
  return (
    <div className="mx-auto max-w-[440px]">
      {/* the spoken request */}
      <div className="mb-2 flex items-start gap-2.5">
        <span className="mt-1 flex size-6 shrink-0 items-center justify-center rounded-md bg-primary text-[11px] font-semibold text-primary-foreground">
          G
        </span>
        <p className="text-pretty font-serif text-lg italic leading-snug text-foreground/85">
          &ldquo;Hey Gaudi, give me a takeoff on the Myra Ave project.&rdquo;
        </p>
      </div>
      <p className="mb-6 pl-[2.1rem] text-[11px] font-medium text-muted-foreground">
        <MessageSquare className="mr-1 inline size-3 text-primary" aria-hidden="true" />
        asked by text · answered in seconds
      </p>

      <AskChips />

      {/* the answer — big number as the anchor */}
      <div className="relative rounded-3xl border border-border bg-card p-6 shadow-xl shadow-primary/10">
        <span className="absolute -right-2 -top-3 rotate-6 rounded-md border border-primary/60 bg-background px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-primary shadow-sm">
          Ready to send
        </span>

        <p className="text-[11px] font-semibold uppercase tracking-wider text-primary">Material takeoff · Myra Ave</p>
        <p className="mt-2 font-sans text-5xl font-light tracking-tight text-foreground">$41,750</p>
        <p className="mt-1 text-sm text-muted-foreground">128 line items, priced and ready to send.</p>

        {/* one real line — specific, traceable, editable */}
        <div className="mt-5 flex items-center justify-between gap-3 rounded-xl bg-secondary/60 px-3.5 py-3">
          <div className="min-w-0">
            <p className="truncate text-[13px] font-medium text-foreground">1/2&quot; drywall · 68 sheets</p>
            <p className="mt-0.5 flex items-center gap-1 text-[11px] text-muted-foreground">
              <Search className="size-3 text-primary/70" aria-hidden="true" />
              Traced to Blueprint pg A-3
            </p>
          </div>
          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-dashed border-primary/50 bg-card px-2.5 py-1.5 text-[13px] font-semibold text-foreground">
            $965
            <Pencil className="size-3 text-primary" aria-hidden="true" />
          </span>
        </div>
      </div>

      {/* margin annotations */}
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <p className="flex items-start gap-2 text-pretty text-[13px] leading-snug text-muted-foreground">
          <Search className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
          Trace any figure back to the exact blueprint page or email it came from.
        </p>
        <p className="flex items-start gap-2 text-pretty text-[13px] leading-snug text-muted-foreground">
          <Sparkles className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
          Change a value and Gaudi learns your pricing for next time.
        </p>
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
            Any format, any channel.{" "}
            <span className="font-serif text-[1.06em] font-medium italic text-primary">Just ask</span> for what you
            need.
          </h2>
        </div>

        <div className="mt-14 rounded-3xl border border-border bg-secondary/50 p-6 sm:p-10">
          {/* Desktop flow */}
          <div className="hidden items-center gap-6 lg:flex">
            <div className="w-[300px] shrink-0">
              <ZoneLabel>However it arrives</ZoneLabel>
              <Channels />
            </div>

            <ArrowRight className="size-7 shrink-0 text-primary" aria-hidden="true" />

            <div className="shrink-0">
              <ZoneLabel>Gaudi runs it</ZoneLabel>
              <GaudiArch />
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
              <GaudiArch />
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
