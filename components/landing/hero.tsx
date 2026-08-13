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
    <section id="hero" className="px-2 pt-2 sm:px-3 sm:pt-3">
      <div className="relative isolate overflow-hidden rounded-[1.75rem] bg-section-dark text-section-dark-foreground sm:rounded-[2.25rem]">
        {/* Photographic backdrop, weighted to the right so the copy stays readable */}
        <img
          src="/hero-contractor.png"
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover object-[75%_center] opacity-70"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-section-dark via-section-dark/85 to-section-dark/20"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-section-dark via-transparent to-section-dark/30"
        />

        <div className="relative mx-auto max-w-7xl px-6 pb-14 pt-32 sm:px-10 sm:pb-20 sm:pt-36 lg:px-14 lg:pb-24 lg:pt-44">
          <div className="max-w-2xl">
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-sm font-medium text-white/80 backdrop-blur-sm">
              <span className="size-1.5 rounded-full bg-primary" />
              Your next best hire
            </p>

            <h1 className="text-balance font-sans text-4xl font-extrabold leading-[1.03] tracking-tight sm:text-5xl lg:text-6xl">
              The AI <RotatingWord /> that helps you win more work.
            </h1>

            <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-white/75">
              Gaudi turns blueprints, RFPs, and site notes into accurate, ready-to-send estimates in minutes, so you can
              bid faster and win more work.
            </p>

            <div className="mt-8 max-w-xl">
              <ConversionForm apiBase={apiBase} apiKey={apiKey} tone="dark" buttonLabel="Get started on a free estimate" />
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/70">
              <span className="font-semibold text-white">5 first estimates free</span>
              <span className="hidden h-4 w-px bg-white/25 sm:block" />
              <span>Then $150 per estimate, edits included</span>
            </div>
          </div>

          {/* Floating stat card, Area-style glass panel */}
          <div className="mt-12 inline-flex items-center gap-4 rounded-2xl border border-white/15 bg-white/[0.07] p-4 pr-6 backdrop-blur-md lg:absolute lg:bottom-10 lg:right-10 lg:mt-0">
            <p className="font-sans text-4xl font-extrabold tracking-tight text-primary">5 min</p>
            <p className="max-w-[13rem] text-sm leading-snug text-white/80">
              A complete estimate back, down from days of takeoffs.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
