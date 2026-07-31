"use client"

import { useEffect, useRef } from "react"

// Dark-theme the embed via Calendly's supported URL params (hex without #):
// background matches our dark card surface, text light, accent = brand orange.
const CALENDLY_URL =
  "https://calendly.com/begumcital/gaudi-ai-intro-call-website?month=2026-07&hide_gdpr_banner=1&background_color=141414&text_color=ffffff&primary_color=cc6943"
const CALENDLY_SCRIPT_SRC = "https://assets.calendly.com/assets/external/widget.js"

type CalendlyGlobal = {
  initInlineWidget: (options: { url: string; parentElement: HTMLElement }) => void
}

// Inline (not popup) Calendly embed. Loads the widget script once, then uses
// the documented `initInlineWidget` API to hydrate our target div. A fixed
// height keeps the card from jumping when toggling tabs.
export function CalendlyInline({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const init = () => {
      const parent = containerRef.current
      const w = window as unknown as { Calendly?: CalendlyGlobal }
      if (!parent || !w.Calendly) return
      // Avoid double-initializing if the widget already rendered.
      if (parent.querySelector("iframe")) return
      parent.innerHTML = ""
      w.Calendly.initInlineWidget({ url: CALENDLY_URL, parentElement: parent })
    }

    const existing = document.querySelector<HTMLScriptElement>(`script[src="${CALENDLY_SCRIPT_SRC}"]`)

    if ((window as unknown as { Calendly?: CalendlyGlobal }).Calendly) {
      init()
      return
    }

    if (existing) {
      existing.addEventListener("load", init)
      return () => existing.removeEventListener("load", init)
    }

    const script = document.createElement("script")
    script.src = CALENDLY_SCRIPT_SRC
    script.async = true
    script.addEventListener("load", init)
    document.body.appendChild(script)
    return () => script.removeEventListener("load", init)
  }, [])

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ minWidth: "280px", height: "620px", backgroundColor: "#141414" }}
    />
  )
}
