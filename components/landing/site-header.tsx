"use client"

import { useEffect, useRef, useState } from "react"
import { Menu, X, ChevronDown } from "lucide-react"

export function SiteHeader({ solid = false }: { solid?: boolean }) {
  const [scrolled, setScrolled] = useState(solid)
  const [mobileOpen, setMobileOpen] = useState(false)
  const headerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    // Interior pages pass `solid` to keep the bar in its light/solid state.
    if (solid) return
    const onScroll = () => {
      const hero = document.getElementById("hero")
      const headerBottom = headerRef.current?.getBoundingClientRect().bottom ?? 0
      if (hero) {
        // Keep the bar dark as long as any part of the hero is still behind the
        // nav; only switch to the light background once the hero's bottom edge
        // has scrolled above the bottom of the nav bar.
        setScrolled(hero.getBoundingClientRect().bottom <= headerBottom)
      } else {
        setScrolled(window.scrollY > 8)
      }
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [solid])

  // While the hero is still behind the bar it floats over the dark image, so nav needs light text.
  const onDark = !solid && !scrolled

  return (
    <header ref={headerRef} className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6">
        <div
          className={`flex items-center justify-between gap-4 rounded-full px-4 py-2 transition-all sm:px-5 ${
            scrolled ? "border border-border bg-card/90 shadow-sm backdrop-blur-md" : "border border-transparent"
          }`}
        >
          <a href="/" className="flex items-center" aria-label="Gaudi AI home">
            <img src="/logo_text.png" alt="Gaudi AI" className="h-6 w-auto sm:h-7" />
          </a>

          <nav className="hidden items-center gap-1 lg:flex">
            <a
              href="/#product"
              className={`rounded-full px-3 py-2 text-sm font-medium transition-colors ${
                onDark ? "text-white/80 hover:text-white" : "text-foreground/80 hover:text-foreground"
              }`}
            >
              Product
            </a>
            <a
              href="/#pricing"
              className={`rounded-full px-3 py-2 text-sm font-medium transition-colors ${
                onDark ? "text-white/80 hover:text-white" : "text-foreground/80 hover:text-foreground"
              }`}
            >
              Pricing
            </a>
            {/* Resources is now a dropdown; About lives inside it alongside Newsroom */}
            <div className="group relative">
              <button
                type="button"
                aria-haspopup="menu"
                className={`inline-flex items-center gap-1 rounded-full px-3 py-2 text-sm font-medium transition-colors ${
                  onDark ? "text-white/80 hover:text-white" : "text-foreground/80 hover:text-foreground"
                }`}
              >
                Resources
                <ChevronDown className="size-3.5 transition-transform group-hover:rotate-180" aria-hidden="true" />
              </button>
              <div className="invisible absolute left-1/2 top-full -translate-x-1/2 pt-2 opacity-0 transition-all duration-150 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                <div className="min-w-44 rounded-2xl border border-border bg-card p-1.5 shadow-lg" role="menu">
                  <a
                    href="/about"
                    role="menuitem"
                    className="block rounded-xl px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
                  >
                    About
                  </a>
                  <a
                    href="/newsroom"
                    role="menuitem"
                    className="block rounded-xl px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
                  >
                    Newsroom
                  </a>
                  <a
                    href="/partner"
                    role="menuitem"
                    className="block rounded-xl px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
                  >
                    Partner
                  </a>
                </div>
              </div>
            </div>
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            <a
              href="/#contact"
              className={`inline-flex h-10 items-center justify-center rounded-full border px-4 text-sm font-semibold transition-colors ${
                onDark
                  ? "border-white/25 text-white hover:bg-white/10"
                  : "border-border text-foreground hover:bg-secondary"
              }`}
            >
              Contact Sales
            </a>
            <a
              href="/#hero"
              className="inline-flex h-10 items-center justify-center rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 active:scale-[0.98]"
            >
              Get started
            </a>
          </div>

          <button
            type="button"
            className={`inline-flex size-10 items-center justify-center rounded-full transition-colors lg:hidden ${
              onDark ? "text-white" : "text-foreground"
            }`}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>

        {mobileOpen && (
          <div className="mt-2 rounded-2xl border border-border bg-card p-3 shadow-lg lg:hidden">
            <nav className="flex flex-col">
              <a
                href="/#product"
                onClick={() => setMobileOpen(false)}
                className="rounded-xl px-3 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
              >
                Product
              </a>
              <a href="/#pricing" onClick={() => setMobileOpen(false)} className="rounded-xl px-3 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary">
                Pricing
              </a>
              <p className="px-3 pb-1 pt-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Resources
              </p>
              <a href="/about" onClick={() => setMobileOpen(false)} className="rounded-xl px-3 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary">
                About
              </a>
              <a href="/newsroom" onClick={() => setMobileOpen(false)} className="rounded-xl px-3 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary">
                Newsroom
              </a>
              <a href="/partner" onClick={() => setMobileOpen(false)} className="rounded-xl px-3 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary">
                Partner
              </a>
              <div className="mt-2 flex flex-col gap-2 border-t border-border pt-3">
                <a
                  href="/#contact"
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex h-11 items-center justify-center rounded-full border border-border px-4 text-sm font-semibold text-foreground"
                >
                  Contact Sales
                </a>
                <a
                  href="/#hero"
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex h-11 items-center justify-center rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground"
                >
                  Get started
                </a>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
