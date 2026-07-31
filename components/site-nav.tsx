"use client"

import type React from "react"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

type Lang = "en" | "es"

// Single source of truth for the primary menu items shared across pages.
// The section ids stay identical across languages so smooth-scrolling works
// on both the English and Spanish landing pages.
export const NAV_ITEMS = [
  { label: "Product", id: "product" },
  { label: "How it Works", id: "how-it-works" },
  { label: "Why Gaudi", id: "why-gaudi" },
  { label: "Company", id: "about" },
] as const

const NAV_ITEMS_ES = [
  { label: "Producto", id: "product" },
  { label: "Cómo Funciona", id: "how-it-works" },
  { label: "Por qué Gaudi", id: "why-gaudi" },
  { label: "Empresa", id: "about" },
] as const

export function SiteNav({
  cta,
  lang = "en",
  langToggle = true,
}: {
  cta?: React.ReactNode
  lang?: Lang
  langToggle?: boolean
}) {
  const pathname = usePathname()

  const isSpanish = lang === "es"
  const home = isSpanish ? "/es" : "/"
  const isHome = pathname === home
  const items = isSpanish ? NAV_ITEMS_ES : NAV_ITEMS
  const anchorBase = isSpanish ? "/es#" : "/#"
  const ctaLabel = isSpanish ? "Contáctanos" : "Contact Us"
  const languageLink = isSpanish
    ? { href: "/", label: "In English" }
    : { href: "/es", label: "En Español" }

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    // On the current landing page, intercept the anchor to smooth-scroll in place.
    if (isHome) {
      const element = document.getElementById(id)
      if (element) {
        e.preventDefault()
        element.scrollIntoView({ behavior: "smooth" })
      }
    }
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-transparent">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <a href={home} className="transition-colors">
            <img src="/logo_text.png" alt="Gaudi AI Logo" className="h-6 w-auto filter brightness-0 invert" />
          </a>
          <div className="hidden md:flex flex-1 items-center justify-end space-x-8">
            {items.map((item) => (
              <a
                key={item.id}
                href={`${anchorBase}${item.id}`}
                onClick={(e) => handleClick(e, item.id)}
                className="text-sm font-medium transition-colors text-white/90 hover:text-white"
              >
                {item.label}
              </a>
            ))}
            {langToggle && (
              <a
                href={languageLink.href}
                className="text-sm font-medium transition-colors text-white/90 hover:text-white"
              >
                {languageLink.label}
              </a>
            )}
            {cta ?? (
              <Button size="sm" asChild className="bg-white text-slate-900 hover:bg-white/90">
                <a href={`${anchorBase}contact`} onClick={(e) => handleClick(e, "contact")}>
                  {ctaLabel} <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
