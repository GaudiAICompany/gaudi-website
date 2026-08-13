"use client"

import { useEffect, useState } from "react"
import { ConversionForm } from "./conversion-form"

const ROTATING = ["estimator", "sub coordinator", "takeoff specialist"]

// Longest option reserves the width so a longer word never bumps the headline
// onto a new row — the rotating word always sits right after "The AI".
const LONGEST = ROTATING.reduce((a, b) => (b.length > a.length ? b : a), "")

function RotatingWord() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % ROTATING.length), 2600)
    return () => clearInterval(id)
  }, [])

  return (
    <span className="relative inline-grid align-baseline font-sans font-light leading-[0.9] text-primary">
      <span aria-hidden="true" className="invisible col-start-1 row-start-1 whitespace-nowrap">
        {LONGEST}
      </span>
      <span key={index} className="animate-word-in col-start-1 row-start-1 whitespace-nowrap">
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

            <h1 className="font-sans text-5xl font-light leading-[0.98] tracking-[-0.03em] sm:text-6xl lg:text-7xl xl:text-8xl">
              <span className="whitespace-nowrap">
                The AI <RotatingWord />
              </span>{" "}
              that helps you win more work.
            </h1>

            <p className="mt-7 max-w-xl text-pretty text-lg leading-relaxed text-white/80">
              Gaudi turns blueprints, RFPs, and site notes into accurate, ready-to-send estimates in minutes, so you can
              bid faster and win more work.
            </p>

            <div className="mt-8 max-w-xl">
              <ConversionForm apiBase={apiBase} apiKey={apiKey} tone="dark" buttonLabel="Get started on a free estimate" />
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-white/70">
              <span className="inline-flex items-center gap-2 whitespace-nowrap font-semibold text-white">
                <span className="rounded-full bg-primary px-2 py-0.5 text-xs font-bold uppercase tracking-wide text-primary-foreground">
                  Free
                </span>
                First 5 estimates
              </span>
              <span className="hidden h-4 w-px bg-white/25 sm:block" />
              <span className="whitespace-nowrap">then $150 each</span>
              <span className="hidden h-4 w-px bg-white/25 sm:block" />
              <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
                <svg viewBox="0 0 20 20" className="size-4 text-primary" fill="currentColor" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M16.7 5.3a1 1 0 0 1 0 1.4l-7.5 7.5a1 1 0 0 1-1.4 0L3.3 9.7a1 1 0 1 1 1.4-1.4l3.3 3.29 6.8-6.8a1 1 0 0 1 1.4 0Z"
                    clipRule="evenodd"
                  />
                </svg>
                No credit card required
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
