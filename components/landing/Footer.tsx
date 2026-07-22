import { Linkedin, Mail } from "lucide-react"

const workflows = [
  { label: "Estimates", href: "/waitlist/estimations" },
  { label: "Bid leveling", href: "/waitlist/bids" },
  { label: "Scheduling", href: "/waitlist/scheduling" },
  { label: "Punch lists", href: "/waitlist/punchlist" },
  { label: "Draw inspections", href: "/inspections" },
]

const company = [
  { label: "Team", href: "#about" },
  { label: "Careers", href: "/careers/engineering" },
  { label: "Privacy", href: "/privacy" },
]

export default function Footer() {
  return (
    <footer className="bg-section-dark text-section-dark-foreground">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-1">
            <img
              src="/logo_text.png"
              alt="Gaudi AI"
              className="h-6 w-auto brightness-0 invert"
            />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
              The AI back office for construction teams — automating estimating, bid leveling,
              proposals, document review, and project updates.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold">Workflows</h3>
            <ul className="mt-4 space-y-2.5">
              {workflows.map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="text-sm text-white/60 transition-colors hover:text-white">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold">Company</h3>
            <ul className="mt-4 space-y-2.5">
              {company.map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="text-sm text-white/60 transition-colors hover:text-white">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold">Connect</h3>
            <div className="mt-4 flex gap-3">
              <a
                href="https://www.linkedin.com/company/gaudiai/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Gaudi AI on LinkedIn"
                className="flex h-9 w-9 items-center justify-center rounded-md border border-white/15 text-white/70 transition-colors hover:border-white/30 hover:text-white"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href="mailto:contact@heygaudi.ai"
                aria-label="Email Gaudi AI"
                className="flex h-9 w-9 items-center justify-center rounded-md border border-white/15 text-white/70 transition-colors hover:border-white/30 hover:text-white"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-8 text-sm text-white/50 sm:flex-row">
          <p>&copy; {new Date().getFullYear()} Gaudi AI. All rights reserved.</p>
          <a href="mailto:contact@heygaudi.ai" className="hover:text-white">
            contact@heygaudi.ai
          </a>
        </div>
      </div>
    </footer>
  )
}
