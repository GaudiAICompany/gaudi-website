"use client"

import { useEffect, useRef } from "react"

const CALENDLY_URL = "https://calendly.com/begumcital/gaudi-ai-intro-call-website?month=2026-07"
const CALENDLY_SCRIPT_SRC = "https://assets.calendly.com/assets/external/widget.js"

// Inline (not popup) Calendly embed. Loads the widget script once and lets
// Calendly hydrate the target div. A fixed min-height keeps the card from
// jumping in height when toggling tabs.
export function CalendlyInline({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${CALENDLY_SCRIPT_SRC}"]`)

    // Calendly hydrates any `.calendly-inline-widget` present when its script
    // initializes. If the script is already loaded, ask it to (re)process.
    const init = () => {
      const w = window as unknown as { Calendly?: { initInlineWidgets: () => void } }
      if (w.Calendly && containerRef.current) {
        w.Calendly.initInlineWidgets()
      }
    }

    if (existing) {
      init()
      return
    }

    const script = document.createElement("script")
    script.src = CALENDLY_SCRIPT_SRC
    script.async = true
    script.onload = init
    document.body.appendChild(script)
  }, [])

  return (
    <div
      ref={containerRef}
      className={`calendly-inline-widget ${className ?? ""}`}
      data-url={CALENDLY_URL}
      style={{ minWidth: "280px", height: "620px" }}
    />
  )
}
