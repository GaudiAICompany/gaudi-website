"use client"

import { useEffect, useRef, useState } from "react"
import { ChevronDown, Menu, X } from "lucide-react"

type MenuItem = { label: string; href: string; desc?: string }

const products: MenuItem[] = [
  { label: "Estimator", href: "#how-it-works", desc: "Takeoffs, quantities, and pricing, checked automatically." },
  { label: "Bid coordinator", href: "#how-it-works", desc: "Level bids and keep every sub on the same page." },
]

const solutions: MenuItem[] = [
  { label: "General Contractors", href: "#solutions", desc: "Win more bids without hiring more estimators." },
  { label: "Estimators", href: "#solutions", desc: "Spend your day reviewing, not re-typing." },
  { label: "Developers", href: "#solutions", desc: "Know your real costs before you commit." },
]

function NavDropdown({ label, items, onDark }: { label: string; items: MenuItem[]; onDark: boolean }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className={`flex items-center gap-1 rounded-full px-3 py-2 text-sm font-medium transition-colors ${
          onDark ? "text-white/80 hover:text-white" : "text-foreground/80 hover:text-foreground"
        }`}
      >
        {label}
        <ChevronDown className={`size-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="absolute left-0 top-full w-72 pt-2">
          <div className="overflow-hidden rounded-2xl border border-border bg-popover p-2 shadow-lg">
            {items.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className="block rounded-xl px-3 py-2.5 transition-colors hover:bg-secondary"
              >
                <span className="block font-sans text-sm font-semibold text-foreground">{item.label}</span>
                {item.desc && (
                  <span className="mt-0.5 block font-sans text-sm font-normal leading-relaxed text-muted-foreground">
                    {item.desc}
                  </span>
                )}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const headerRef = useRef<HTMLElement>(null)

  useEffect(() => {
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
  }, [])

  // While the hero is still behind the bar it floats over the dark image, so nav needs light text.
  const onDark = !scrolled

  return (
    <header ref={headerRef} className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6">
        <div
          className={`flex items-center justify-between gap-4 rounded-full px-4 py-2 transition-all sm:px-5 ${
            scrolled ? "border border-border bg-card/90 shadow-sm backdrop-blur-md" : "border border-transparent"
          }`}
        >
          <a href="#hero" className="flex items-center" aria-label="Gaudi AI home">
            <img src="/logo_text.png" alt="Gaudi AI" className="h-6 w-auto sm:h-7" />
          </a>

          <nav className="hidden items-center gap-1 lg:flex">
            <NavDropdown label="Products" items={products} onDark={onDark} />
            <NavDropdown label="Solutions" items={solutions} onDark={onDark} />
            <a
              href="#pricing"
              className={`rounded-full px-3 py-2 text-sm font-medium transition-colors ${
                onDark ? "text-white/80 hover:text-white" : "text-foreground/80 hover:text-foreground"
              }`}
            >
              Pricing
            </a>
            <a
              href="#how-it-works"
              className={`rounded-full px-3 py-2 text-sm font-medium transition-colors ${
                onDark ? "text-white/80 hover:text-white" : "text-foreground/80 hover:text-foreground"
              }`}
            >
              Resources
            </a>
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            <a
              href="#contact"
              className={`inline-flex h-10 items-center justify-center rounded-full border px-4 text-sm font-semibold transition-colors ${
                onDark
                  ? "border-white/25 text-white hover:bg-white/10"
                  : "border-border text-foreground hover:bg-secondary"
              }`}
            >
              Contact Sales
            </a>
            <a
              href="#hero"
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
              {[...products, ...solutions].map((item) => (
                <a
                  key={`${item.label}-m`}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-xl px-3 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
                >
                  {item.label}
                </a>
              ))}
              <a href="#pricing" onClick={() => setMobileOpen(false)} className="rounded-xl px-3 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary">
                Pricing
              </a>
              <a href="#how-it-works" onClick={() => setMobileOpen(false)} className="rounded-xl px-3 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary">
                Resources
              </a>
              <div className="mt-2 flex flex-col gap-2 border-t border-border pt-3">
                <a
                  href="#contact"
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex h-11 items-center justify-center rounded-full border border-border px-4 text-sm font-semibold text-foreground"
                >
                  Contact Sales
                </a>
                <a
                  href="#hero"
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
