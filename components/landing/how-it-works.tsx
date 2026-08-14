import { ArrowRight, ArrowDown, MessageSquare, Phone, Mail, Upload, Pencil, Search, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

/* ----------------------------- Left: channels ---------------------------- */

function Thumb({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="overflow-hidden rounded-lg ring-1 ring-border">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src || "/placeholder.svg"} alt={alt} className="h-14 w-14 object-cover" />
    </div>
  )
}

function FormatPill({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full bg-secondary px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
      {children}
    </span>
  )
}

function Waveform() {
  const bars = [5, 11, 7, 15, 9, 17, 8, 13, 6, 12, 7, 16, 10, 6]
  return (
    <div className="flex h-14 items-center gap-[3px] rounded-lg bg-primary/5 px-3 ring-1 ring-border" aria-hidden="true">
      {bars.map((h, i) => (
        <span key={i} className="w-[3px] rounded-full bg-primary/60" style={{ height: `${h}px` }} />
      ))}
    </div>
  )
}

function ChannelCard({
  icon: Icon,
  channel,
  formats,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>
  channel: string
  formats: string[]
  children: React.ReactNode
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-3.5">
      <div className="mb-3 flex items-center gap-2">
        <span className="flex size-7 items-center justify-center rounded-lg bg-primary/10">
          <Icon className="size-3.5 text-primary" />
        </span>
        <span className="text-sm font-semibold text-foreground">{channel}</span>
      </div>
      <div className="flex items-center gap-2">{children}</div>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {formats.map((f) => (
          <FormatPill key={f}>{f}</FormatPill>
        ))}
      </div>
    </div>
  )
}

function Channels() {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
      <ChannelCard icon={Phone} channel="Call & voicemail" formats={["Voice"]}>
        <Waveform />
        <span className="text-xs text-muted-foreground">Voicemail · 0:47</span>
      </ChannelCard>

      <ChannelCard icon={MessageSquare} channel="Text message" formats={["Photo", "Handwritten note"]}>
        <Thumb src="/images/how-it-works/input-photo.png" alt="Job-site photo texted from the field" />
        <Thumb src="/images/how-it-works/input-note.png" alt="Handwritten site notes with measurements" />
      </ChannelCard>

      <ChannelCard icon={Mail} channel="Email" formats={["PDF", "Blueprint", "Thread"]}>
        <Thumb src="/images/how-it-works/input-contract.png" alt="Printed construction contract PDF" />
        <Thumb src="/images/how-it-works/input-blueprint.png" alt="Architectural floor plan blueprint" />
      </ChannelCard>

      <ChannelCard icon={Upload} channel="Dashboard upload" formats={["Plans", "Photos", "Files"]}>
        <div className="flex h-14 flex-1 items-center justify-center gap-2 rounded-lg border border-dashed border-primary/40 bg-primary/5 text-xs font-medium text-primary">
          <Upload className="size-3.5" />
          Drop plans &amp; photos
        </div>
      </ChannelCard>
    </div>
  )
}

/* ------------------------------ Center: hub ------------------------------ */

function GaudiHub() {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative flex size-28 items-center justify-center rounded-[26px] bg-primary shadow-xl shadow-primary/25 ring-1 ring-inset ring-primary-foreground/15">
        <span className="font-sans text-lg font-semibold tracking-tight text-primary-foreground">Gaudi</span>
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

/* --------------------------- Right: the output --------------------------- */

const lineItems = [
  { name: "2×6 framing lumber", qty: "1,240 lf", total: "$3,534", source: "Blueprint · A-3", icon: Search },
  { name: '1/2" drywall', qty: "68 sheets", total: "$965", source: "Email · Rivera", selected: true },
  { name: "R-19 insulation", qty: "2,400 sf", total: "$2,208", source: "Site photo" },
]

function OutputTabs() {
  const tabs = ["Takeoff", "Estimate", "Sub quote"]
  return (
    <div className="mb-3 flex gap-1.5">
      {tabs.map((t, i) => (
        <span
          key={t}
          className={cn(
            "rounded-full px-2.5 py-1 text-[11px] font-medium",
            i === 0 ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground",
          )}
        >
          {t}
        </span>
      ))}
    </div>
  )
}

function GaudiResult() {
  return (
    <div className="mx-auto max-w-[420px]">
      {/* Hey Gaudi prompt */}
      <div className="mb-3 flex items-center gap-2 rounded-2xl border border-border bg-card px-3.5 py-2.5">
        <span className="flex size-6 shrink-0 items-center justify-center rounded-md bg-primary text-[11px] font-semibold text-primary-foreground">
          G
        </span>
        <p className="flex-1 text-pretty text-[13px] leading-snug text-foreground">
          &ldquo;Hey Gaudi, give me a material takeoff on the Myra Ave project.&rdquo;
        </p>
        <span className="hidden shrink-0 items-center gap-1 rounded-full bg-secondary px-2 py-0.5 text-[10px] font-medium text-muted-foreground sm:inline-flex">
          <MessageSquare className="size-3 text-primary" /> via text
        </span>
      </div>

      {/* Generated digital result */}
      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-xl shadow-foreground/10">
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Material takeoff</p>
            <p className="text-sm font-semibold text-foreground">Myra Ave</p>
          </div>
          <OutputTabs />
        </div>

        <div className="divide-y divide-border">
          {lineItems.map((item) => (
            <div
              key={item.name}
              className={cn("px-4 py-2.5", item.selected && "bg-primary/[0.06] ring-1 ring-inset ring-primary/30")}
            >
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate text-[13px] font-medium text-foreground">{item.name}</p>
                  <p className="text-[11px] text-muted-foreground">{item.qty}</p>
                </div>

                {item.selected ? (
                  <span className="inline-flex items-center gap-1.5 rounded-md border border-dashed border-primary/50 bg-card px-2 py-1 text-[13px] font-semibold text-foreground">
                    {item.total}
                    <Pencil className="size-3 text-primary" />
                  </span>
                ) : (
                  <span className="text-[13px] font-semibold text-foreground">{item.total}</span>
                )}
              </div>

              {/* traceability chip */}
              <div className="mt-1.5 flex items-center gap-1 text-[10px] text-muted-foreground">
                <Search className="size-3 text-primary/70" />
                <span>Traced to {item.source}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between border-t border-border bg-secondary/40 px-4 py-2.5">
          <span className="text-[11px] font-medium text-muted-foreground">Estimated total</span>
          <span className="text-sm font-semibold text-foreground">$41,750</span>
        </div>
      </div>

      {/* audit + learn note */}
      <p className="mt-3 flex items-start gap-1.5 text-pretty text-xs leading-relaxed text-muted-foreground">
        <Sparkles className="mt-0.5 size-3.5 shrink-0 text-primary" />
        <span>
          Trace any number back to the exact blueprint page or email it came from. Edit a value and Gaudi learns your
          pricing going forward.
        </span>
      </p>
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
            <div className="w-[280px] shrink-0">
              <ZoneLabel>However it arrives</ZoneLabel>
              <Channels />
            </div>

            <ArrowRight className="size-7 shrink-0 text-primary" aria-hidden="true" />

            <div className="shrink-0">
              <ZoneLabel>Gaudi runs it</ZoneLabel>
              <GaudiHub />
            </div>

            <ArrowRight className="size-7 shrink-0 text-primary" aria-hidden="true" />

            <div className="flex-1">
              <ZoneLabel>Just ask</ZoneLabel>
              <GaudiResult />
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
              <GaudiHub />
            </div>

            <ArrowDown className="size-6 text-primary" aria-hidden="true" />

            <div className="w-full max-w-md">
              <ZoneLabel>Just ask</ZoneLabel>
              <GaudiResult />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
