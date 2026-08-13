"use client"

import { useEffect, useState } from "react"
import { ConversionForm } from "./conversion-form"

const ROTATING = ["estimator", "sub coordinator"]

function RotatingWord() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % ROTATING.length), 2600)
    return () => clearInterval(id)
  }, [])

  return (
    <span className="relative inline-flex text-primary">
      <span key={index} className="animate-word-in font-serif italic">
        {ROTATING[index]}
      </span>
    </span>
  )
}

export function Hero({ apiBase, apiKey }: { apiBase: string; apiKey: string }) {
  return (
    <section id="hero" className="relative overflow-hidden px-4 pt-28 sm:px-6 sm:pt-32 lg:pt-40">
      <div className="mx-auto grid max-w-7xl items-center gap-10 pb-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 lg:pb-24">
        <div>
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-sm font-medium text-muted-foreground">
            <span className="size-1.5 rounded-full bg-primary" />
            Your next best hire
          </p>

          <h1 className="text-balance font-sans text-4xl font-extrabold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            The AI <RotatingWord /> that helps you win more work.
          </h1>

          <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
            Gaudi turns blueprints, RFPs, and site notes into accurate, ready-to-send estimates in minutes, so you can
            bid faster and win more work.
          </p>

          <div className="mt-8 max-w-xl">
            <ConversionForm apiBase={apiBase} apiKey={apiKey} buttonLabel="Get started on a free estimate" />
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">5 first estimates free</span>
            <span className="hidden h-4 w-px bg-border sm:block" />
            <span>Then $150 per estimate, edits included</span>
          </div>
        </div>

        <div className="relative">
          <div className="relative overflow-hidden rounded-3xl border border-border bg-secondary shadow-sm">
            <img
              src="/hero-contractor.png"
              alt="A general contractor reviewing blueprints and a tablet on an active job site"
              className="aspect-[4/5] w-full object-cover"
            />
          </div>
          <div className="absolute -bottom-5 -left-3 max-w-[15rem] rounded-2xl border border-border bg-card p-4 shadow-md sm:-left-5">
            <p className="font-sans text-3xl font-extrabold tracking-tight text-foreground">5 min</p>
            <p className="mt-1 text-sm leading-snug text-muted-foreground">
              A complete estimate back, down from days of takeoffs.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
