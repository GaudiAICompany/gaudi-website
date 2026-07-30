"use client"

import type React from "react"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

// Single source of truth for the primary menu items shared across pages.
export const NAV_ITEMS = [
  { label: "Product", id: "product" },
  { label: "How it Works", id: "how-it-works" },
  { label: "Why Gaudi", id: "why-gaudi" },
  { label: "Company", id: "about" },
] as const

export function SiteNav({ cta }: { cta?: React.ReactNode }) {
  const pathname = usePathname()
  const isHome = pathname === "/"

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    // On the landing page, intercept the anchor to smooth-scroll in place.
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
          <a href="/" className="transition-colors">
            <img src="/logo_text.png" alt="Gaudi AI Logo" className="h-6 w-auto filter brightness-0 invert" />
          </a>
          <div className="hidden md:flex flex-1 items-center justify-end space-x-8">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={`/#${item.id}`}
                onClick={(e) => handleClick(e, item.id)}
                className="text-sm font-medium transition-colors text-white/90 hover:text-white"
              >
                {item.label}
              </a>
            ))}
            {cta ?? (
              <Button size="sm" asChild className="bg-white text-slate-900 hover:bg-white/90">
                <a href="/#about" onClick={(e) => handleClick(e, "about")}>
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
