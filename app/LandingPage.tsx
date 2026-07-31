"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { SiteNav } from "@/components/site-nav"
import { CalendlyInline } from "@/components/calendly-inline"
import {
  ArrowRight,
  Mail,
  Linkedin,
  Twitter,
  CheckCircle2,
  CalendarClock,
  ClipboardList,
  Calculator,
  Scale,
  Building2,
  Upload,
  Cpu,
  Sparkles,
  HardHat,
  Clock,
  ShieldCheck,
} from "lucide-react"

export default function LandingPage({
  functionApiBase,
  functionApiKey,
}: {
  functionApiBase: string
  functionApiKey: string
}) {

  const [email, setEmail] = useState("")
  const [contactSubmitted, setContactSubmitted] = useState(false)
  const [contactTab, setContactTab] = useState<"call" | "message">("call")

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const form = e.currentTarget as HTMLFormElement

    const emailInput = form.querySelector('input[name="email"]') as HTMLInputElement
    const firstNameInput = form.querySelector('input[name="firstName"]') as HTMLInputElement
    const lastNameInput = form.querySelector('input[name="lastName"]') as HTMLInputElement
    const companyInput = form.querySelector('input[name="company"]') as HTMLInputElement
    const messageInput = form.querySelector('textarea[name="message"]') as HTMLTextAreaElement

    const payload = {
      email: emailInput?.value || "",
      firstName: firstNameInput?.value || "",
      lastName: lastNameInput?.value || "",
      company: companyInput?.value || "",
      message: messageInput?.value || "",
    }

    const url = `${functionApiBase}/api/capture_cta_email?code=${functionApiKey}`
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        console.error("Contact submission failed", res.status)
        return
      }

      setContactSubmitted(true)
      setEmail("")
    } catch (err) {
      console.error("Contact submission error", err)
    }
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const stats = [
    { label: "", image: "/msft.png" },
    { label: "", image: "/harvard.png" },
    { label: "", image: "/amzn.png" },
    { label: "", image: "/gs.png" },
    { label: "", image: "/chicago.png" },
    { label: "", image: "/adtheorent.png" },
    // { label: "Fraud Prevented", value: "100%" },
  ]

  return (
    <div className="min-h-screen bg-section-dark text-white">
      {/* Navigation */}
      <SiteNav />

      {/* Hero Section */}
      <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden pt-16">
        <div className="absolute inset-0 z-0">
          <video autoPlay muted loop playsInline preload="auto" className="w-full h-full object-cover" poster="/background.png">
            <source src="https://gaudi.blob.core.windows.net/website-assets/background.mp4" />
          </video>
          <div className="absolute inset-0 video-overlay" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#020202]" />
        </div>

        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-6">
          <h1 className="font-playfair text-6xl md:text-7xl font-bold mb-6 leading-tight">
            Building the Future of
            <span className="block text-primary">Construction</span>
          </h1>
          <p className="text-lg md:text-xl mb-12 text-gray-200 max-w-2xl mx-auto leading-relaxed">
            Bringing AI to the physical world with construction workflow automations
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              onClick={() => scrollToSection("about")}
              className="bg-primary hover:bg-primary/90 text-white px-8 h-12 font-medium"
            >
              Learn More <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Product Section */}
      <section id="product" className="bg-section-dark py-24 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-sm font-semibold uppercase tracking-widest text-primary">Product</span>
            <h2 className="font-playfair text-4xl md:text-5xl font-bold mt-4 mb-6 text-white text-balance">
              One Platform for Every Construction Workflow
            </h2>
            <p className="text-lg text-gray-300 leading-relaxed text-pretty">
              Gaudi automates the manual, time-consuming work across your projects, so your teams can focus on building instead of paperwork.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: CalendarClock, title: "Scheduling", desc: "Generate and maintain accurate project schedules that adapt as conditions change.", href: "/waitlist/scheduling" },
              { icon: ClipboardList, title: "Punch Lists", desc: "Capture, assign, and close out punch list items with AI-assisted tracking.", href: "/waitlist/punchlist" },
              { icon: Calculator, title: "Estimates", desc: "Produce fast, reliable cost estimates from your plans and specs.", href: "/waitlist/estimations" },
              { icon: Scale, title: "Bid Leveling", desc: "Compare bids apples-to-apples and surface the details that matter.", href: "/waitlist/bids" },
              { icon: Building2, title: "Draw Inspections", desc: "Streamline draw inspections with verified, AR-guided field capture.", href: "/inspections" },
            ].map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="group rounded-lg border border-white/10 bg-white/5 p-8 transition-colors hover:border-primary/40 hover:bg-white/10"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/15 text-primary">
                  <item.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-white">{item.title}</h3>
                <p className="text-gray-300 leading-relaxed">{item.desc}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="how-it-works" className="bg-section-dark py-24 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-sm font-semibold uppercase tracking-widest text-primary">How it Works</span>
            <h2 className="font-playfair text-4xl md:text-5xl font-bold mt-4 mb-6 text-white text-balance">
              From Field Data to Finished Work in Three Steps
            </h2>
            <p className="text-lg text-gray-300 leading-relaxed text-pretty">
              Gaudi fits into the way your teams already work, turning everyday project inputs into automated, verified outputs.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Upload, step: "01", title: "Connect Your Data", desc: "Bring in your plans, specs, schedules, and field captures. No complex setup required." },
              { icon: Cpu, step: "02", title: "Let Gaudi Work", desc: "Our AI processes your inputs, automating estimates, schedules, punch lists, and inspections." },
              { icon: Sparkles, step: "03", title: "Get Verified Results", desc: "Review complete, accurate outputs you can trust and share across your team instantly." },
            ].map((item, index) => (
              <div key={index} className="relative rounded-lg border border-white/10 bg-white/5 p-8">
                <div className="mb-5 flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/15 text-primary">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <span className="font-playfair text-3xl font-bold text-white/30">{item.step}</span>
                </div>
                <h3 className="mb-2 text-xl font-semibold text-white">{item.title}</h3>
                <p className="text-gray-300 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Gaudi Section */}
      <section id="why-gaudi" className="bg-section-dark py-24 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-sm font-semibold uppercase tracking-widest text-primary">Why Gaudi</span>
            <h2 className="font-playfair text-4xl md:text-5xl font-bold mt-4 mb-6 text-white text-balance">
              Built by People Who Know Construction
            </h2>
            <p className="text-lg text-gray-300 leading-relaxed text-pretty">
              We pair deep field experience with world-class AI to deliver tools that actually work on the jobsite.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: HardHat, title: "Industry Expertise", desc: "Built by people who have managed projects and operated properties in the real world." },
              { icon: Clock, title: "Save Time", desc: "Automate hours of manual work so your crews can focus on building." },
              { icon: ShieldCheck, title: "Verified Accuracy", desc: "Trustworthy, complete outputs that hold up in the field and on the books." },
              { icon: Calculator, title: "Cut Costs", desc: "Reduce rework, catch issues early, and keep every project on budget." },
            ].map((item, index) => (
              <div key={index} className="rounded-lg border border-white/10 bg-white/5 p-8">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/15 text-primary">
                  <item.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-white">{item.title}</h3>
                <p className="text-gray-300 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="bg-section-dark py-8">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-8 text-white">
                Who We Are
              </h2>
              <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                Gaudi is built by people who have managed construction projects, owned and operated properties and shipped AI products used by Fortune 500 companies. We’ve worked inside leading tech companies and research institutions, but we know how construction really works because we’ve lived it.
              </p>
              <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                We’re building AI tools that save time, cut headaches, and help every crew and project run smoother. If you build for a living, Gaudi is here to make your job easier.
              </p>
            </div>
            <div className="relative h-96 rounded-lg overflow-hidden">
              <img src="/team.jpeg" alt="Gaudi AI team" className="absolute inset-0 w-full h-full object-cover" />
            </div>
          </div>
        </div>
                  {/* Stats Carousel */}
            <div className="mt-20 pt-6 relative border-t border-white/20 max-w-4xl mx-auto">
            <div className="overflow-hidden">
              <div className="flex gap-0 animate-scroll">
                {[...stats, ...stats, ...stats].map((stat, index) => (
                  <div key={index} className="flex-shrink-0 w-40 text-center">
                    <div className="h-12 flex items-center justify-center mb-2">
                      {stat.image ? (
                        <img src={stat.image} alt={stat.label || 'stat-image'} className="mx-auto max-h-12 object-contain" />
                      ) : (
                        <div className="text-3xl md:text-4xl font-bold text-primary">{stat.value}</div>
                      )}
                    </div>
                    <div className="text-sm md:text-base text-gray-300">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="bg-section-dark py-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-6 text-white">
              Ready to Build Smarter?
            </h2>
            <p className="text-xl text-gray-300">
              Join forward-thinking builders who are accelerating growth and decreasing costs with Gaudi.
            </p>
          </div>

          {/* Segmented tab control */}
          <div
            role="tablist"
            aria-label="Contact options"
            className="mx-auto mb-6 flex w-full max-w-xs items-center gap-1 rounded-full bg-white/10 p-1"
          >
            <button
              type="button"
              role="tab"
              id="contact-tab-call"
              aria-selected={contactTab === "call"}
              aria-controls="contact-panel-call"
              onClick={() => setContactTab("call")}
              className={`flex-1 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                contactTab === "call" ? "bg-white/20 text-white" : "text-gray-400 hover:text-white"
              }`}
            >
              Book a call
            </button>
            <button
              type="button"
              role="tab"
              id="contact-tab-message"
              aria-selected={contactTab === "message"}
              aria-controls="contact-panel-message"
              onClick={() => setContactTab("message")}
              className={`flex-1 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                contactTab === "message" ? "bg-white/20 text-white" : "text-gray-400 hover:text-white"
              }`}
            >
              Send a message
            </button>
          </div>

          <Card className="p-12 border-2 border-primary/20" style={{ background: 'rgba(255, 255, 255, 0.10)' }}>
            <CardContent className="p-0">
              {/* Book a call panel */}
              <div
                role="tabpanel"
                id="contact-panel-call"
                aria-labelledby="contact-tab-call"
                hidden={contactTab !== "call"}
              >
                {contactTab === "call" && <CalendlyInline className="rounded-md overflow-hidden" />}
              </div>

              {/* Send a message panel */}
              <div
                role="tabpanel"
                id="contact-panel-message"
                aria-labelledby="contact-tab-message"
                hidden={contactTab !== "message"}
              >
                {contactSubmitted ? (
                  <div className="flex flex-col items-center justify-center text-center py-12" role="status" aria-live="polite">
                    <CheckCircle2 className="h-12 w-12 text-primary mb-4" />
                    <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                    <p className="text-gray-300 mb-6">Thanks for reaching out. Our team will get back to you shortly.</p>
                    <Button onClick={() => setContactSubmitted(false)} className="bg-primary hover:bg-primary/90 text-white">
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <form className="space-y-6" onSubmit={handleContactSubmit}>
                    <div className="grid md:grid-cols-2 gap-4">
                      <Input name="firstName" placeholder="First Name" type="text" className="bg-white/12 border-white/20 text-white h-12 placeholder-white/80" required />
                      <Input name="lastName" placeholder="Last Name" type="text" className="bg-white/12 border-white/20 text-white h-12 placeholder-white/80" required />
                    </div>
                    <Input
                      name="email"
                      type="email"
                      placeholder="Email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-white/12 border-white/20 text-white h-12 placeholder-white/80"
                      required
                    />
                    <Input name="company" placeholder="Company Name" type="text" className="bg-white/12 border-white/20 text-white h-12 placeholder-white/80" required />
                    <textarea
                      name="message"
                      placeholder="Tell us about your use case..."
                      className="w-full p-3 border border-white/20 rounded-md resize-none h-25 bg-white/12 text-white placeholder-white/80"
                    />
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-primary hover:bg-primary/90 text-white h-12 font-medium"
                    >
                      Get in Touch <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </form>
                )}
              </div>
            </CardContent>
          </Card>

          <div className="mt-16 pt-16 border-t border-slate-700 text-center">
            <p className="text-gray-300 mb-6">Questions? Reach out directly:</p>
            <a href="mailto:contact@heygaudi.ai" className="text-primary hover:text-primary/80 font-medium">
              contact@heygaudi.ai
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-section-dark text-background py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <h3 className="font-playfair text-2xl font-bold mb-4">Gaudi AI</h3>
              <p className="text-background/80 leading-relaxed">
                Transforming construction through
              </p>
              <p className="text-background/80 leading-relaxed">
                AI-powered automations.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Construction Case Studies</h4>
              <ul className="space-y-2 text-background/80">
                <li>
                  <a href="/waitlist/scheduling" className="hover:text-background transition-colors">
                    Scheduling
                  </a>
                </li>
                <li>
                  <a href="/waitlist/punchlist" className="hover:text-background transition-colors">
                    Punch lists
                  </a>
                </li>
                <li>
                  <a href="/waitlist/estimations" className="hover:text-background transition-colors">
                    Estimates
                  </a>
                </li>
                <li>
                  <a href="/waitlist/bids" className="hover:text-background transition-colors">
                    Bid Leveling
                  </a>
                </li>
                <li>
                  <a href="/inspections" className="hover:text-background transition-colors">
                    Draw Inspections
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-background/80">
                <li>
                  <a href="#about" className="hover:text-background transition-colors">
                    Team
                  </a>
                </li>
                <li>
                  <a href="/careers/engineering" className="hover:text-background transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="/privacy" className="hover:text-background transition-colors">
                    Privacy
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <div className="flex gap-4">
                <a href="https://www.linkedin.com/company/gaudiai/" className="text-background/80 hover:text-background transition-colors">
                  <Linkedin className="h-5 w-5" />
                </a>
                <a href="mailto:contact@heygaudi.ai" className="text-background/80 hover:text-background transition-colors">
                  <Mail className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-background/20 pt-8 text-center text-background/60">
            <p>&copy; 2026 Gaudi AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
