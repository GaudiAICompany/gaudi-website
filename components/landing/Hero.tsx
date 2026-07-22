"use client"

import { ArrowRight, FileText, AlertTriangle, Check } from "lucide-react"

const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })

const bidRows = [
  { scope: "Sitework & excavation", a: "$284,500", b: "$268,000", c: "$301,200", low: "b" },
  { scope: "Concrete & foundations", a: "$512,000", b: "$498,750", c: "$505,000", low: "b" },
  { scope: "Structural steel", a: "$733,200", b: "$761,000", c: "$728,400", low: "c" },
  { scope: "Waterproofing", a: "—", b: "$44,300", c: "$41,900", low: "c", gap: "a" },
]

export default function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 lg:grid-cols-[1.05fr_1fr] lg:gap-10">
        {/* Left: message */}
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            The AI back office for construction teams
          </div>

          <h1 className="mt-6 text-pretty text-4xl font-semibold leading-[1.08] tracking-tight md:text-5xl lg:text-6xl">
            Run your back office at the speed of the{" "}
            <span className="text-primary">jobsite</span>.
          </h1>

          <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
            Gaudi turns plans, specs, and subcontractor bids into structured, reviewable work —
            automating estimating, bid leveling, proposal drafting, document review, and project
            updates so your team spends less time on admin and more time building.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={() => scrollTo("contact")}
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Contact Us <ArrowRight className="h-4 w-4" />
            </button>
            <a
              href="/waitlist/estimations"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
            >
              Join Waitlist
            </a>
          </div>

          <p className="mt-6 text-sm text-muted-foreground">
            Built for general contractors, estimators, and project managers.
          </p>
        </div>

        {/* Right: bid leveling product visual */}
        <div className="relative">
          <div className="rounded-xl border border-border bg-card shadow-[0_1px_0_rgba(0,0,0,0.02),0_20px_50px_-30px_rgba(0,0,0,0.25)]">
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
              <div className="flex items-center gap-2 text-sm font-medium">
                <FileText className="h-4 w-4 text-primary" />
                Bid leveling — Concourse Phase II
              </div>
              <span className="rounded-full bg-secondary px-2 py-0.5 text-xs font-medium text-muted-foreground">
                3 subs
              </span>
            </div>

            <div className="overflow-hidden">
              <table className="w-full font-mono text-xs">
                <thead>
                  <tr className="text-muted-foreground">
                    <th className="px-4 py-2 text-left font-medium">Scope</th>
                    <th className="px-2 py-2 text-right font-medium">Apex</th>
                    <th className="px-2 py-2 text-right font-medium">Vertex</th>
                    <th className="px-4 py-2 text-right font-medium">Meridian</th>
                  </tr>
                </thead>
                <tbody>
                  {bidRows.map((row) => (
                    <tr key={row.scope} className="border-t border-border">
                      <td className="px-4 py-2.5 font-sans text-foreground">{row.scope}</td>
                      {(["a", "b", "c"] as const).map((col) => (
                        <td
                          key={col}
                          className={`px-2 py-2.5 text-right last:pr-4 ${
                            row.gap === col
                              ? "text-primary"
                              : row.low === col
                                ? "font-semibold text-foreground"
                                : "text-muted-foreground"
                          }`}
                        >
                          {row.gap === col ? (
                            <span className="inline-flex items-center gap-1">
                              <AlertTriangle className="h-3 w-3" /> gap
                            </span>
                          ) : (
                            (row as Record<string, string>)[col]
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex items-start gap-2 border-t border-border bg-secondary/60 px-4 py-3">
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <p className="text-xs leading-relaxed text-foreground">
                <span className="font-semibold">Scope gap flagged:</span> Apex omitted waterproofing.
                Normalize before award to compare apples-to-apples.
              </p>
            </div>
          </div>

          {/* Floating status chip */}
          <div className="absolute -bottom-4 -left-4 hidden items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-xs font-medium shadow-lg sm:flex">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10">
              <Check className="h-3 w-3 text-primary" />
            </span>
            Leveled in seconds
          </div>
        </div>
      </div>
    </section>
  )
}
