"use client"

import { useEffect, useState } from "react"
import { ConversionForm, CtaTrustRow } from "./conversion-form"

const ROTATING = ["estimator", "sub coordinator", "takeoff specialist"]

// Reserves the width of the longest option so a longer word never bumps the headline onto a new row.
const LONGEST = ROTATING.reduce((a, b) => (b.length > a.length ? b : a), "")

function RotatingWord() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % ROTATING.length), 1600)
    return () => clearInterval(id)
  }, [])

  return (
    <span className="relative inline-grid align-baseline font-serif text-[1.1em] font-medium italic leading-[0.9] text-primary">
      <span aria-hidden="true" className="invisible col-start-1 row-start-1 whitespace-nowrap">
        {LONGEST}
      </span>
      <span key={index} className="animate-word-in col-start-1 row-start-1 whitespace-nowrap">
        {ROTATING[index]}
      </span>
    </span>
  )
}

export function Hero() {
  return (
    <section id="hero" className="px-2 pt-2 sm:px-3 sm:pt-3">
      <div className="relative isolate overflow-hidden rounded-[1.75rem] bg-section-dark text-section-dark-foreground sm:rounded-[2.25rem]">
        {/* Weighted to the right so the headline copy stays readable over it. */}
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

            {/* Fluid below `sm` so the reserved width of the longest rotating word
                ("takeoff specialist") always fits a phone without clipping. */}
            <h1 className="font-sans text-[clamp(2rem,10.5vw,3rem)] font-light leading-[0.98] tracking-[-0.03em] sm:text-6xl lg:text-7xl xl:text-8xl">
              <span className="sm:whitespace-nowrap">
                The AI <RotatingWord />
              </span>{" "}
              that helps you win more work.
            </h1>

            <div className="mt-8 max-w-xl">
              <ConversionForm tone="dark" buttonLabel="Get started on a free estimate" />
            </div>

            <CtaTrustRow className="mt-5" />
          </div>
        </div>
      </div>
    </section>
  )
}
