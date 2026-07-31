"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { SiteNav } from "@/components/site-nav"
import { CalendlyInline } from "@/components/calendly-inline"
import { RoiCalculator } from "@/components/roi-calculator"
import {
  ArrowRight,
  Mail,
  Linkedin,
  Twitter,
  CheckCircle2,
  CalendarClock,
  ClipboardCheck,
  Calculator,
  Scale,
  Building2,
  Ruler,
  MessageSquare,
  Upload,
  Cpu,
  Sparkles,
} from "lucide-react"

export default function LandingPage({
  functionApiBase,
  functionApiKey,
}: {
  functionApiBase: string
  functionApiKey: string
}) {

  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [contactSubmitted, setContactSubmitted] = useState(false)
  const [contactTab, setContactTab] = useState<"call" | "message">("call")

  const handleTryItOut = (prefilledMessage: string) => {
    setContactTab("message")
    setContactSubmitted(false)
    setMessage(prefilledMessage)
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
  }

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const form = e.currentTarget as HTMLFormElement

    const emailInput = form.querySelector('input[name="email"]') as HTMLInputElement
    const firstNameInput = form.querySelector('input[name="firstName"]') as HTMLInputElement
    const lastNameInput = form.querySelector('input[name="lastName"]') as HTMLInputElement
    const phoneInput = form.querySelector('input[name="phone"]') as HTMLInputElement
    const companyInput = form.querySelector('input[name="company"]') as HTMLInputElement
    const messageInput = form.querySelector('textarea[name="message"]') as HTMLTextAreaElement

    const payload = {
      email: emailInput?.value || "",
      firstName: firstNameInput?.value || "",
      lastName: lastNameInput?.value || "",
      phone: phoneInput?.value || "",
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

  const handleGetInTouch = () => {
    setContactTab("call")
    setContactSubmitted(false)
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
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
            <span className="text-primary">AI back office</span>
            <span className="block text-white">for construction teams.</span>
          </h1>
          <p className="text-xl md:text-2xl mb-12 text-gray-200 max-w-2xl mx-auto leading-relaxed">
            We handle the hassle. You handle the build.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              onClick={() => scrollToSection("contact")}
              className="bg-primary hover:bg-primary/90 text-white px-8 h-12 font-medium"
            >
              Try it out <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Product Section */}
      <section id="product" className="bg-section-dark py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-sm font-semibold uppercase tracking-widest text-primary">Product</span>
            <h2 className="font-playfair text-4xl md:text-5xl font-bold mt-4 mb-6 text-white text-balance">
              AI Agent That Delivers Finished Work
            </h2>
            <p className="text-lg text-gray-300 leading-relaxed text-pretty">
              Gaudi delivers completed, auditable work, calibrated to your business without asking you to change how you operate.
            </p>
          </div>

          {/* Sub-label above workflow icons */}
          <p className="text-center text-xs font-medium uppercase tracking-[0.2em] text-gray-400 mb-8">
            Automate Your Workflow
          </p>

          {/* Circular workflow icon buttons */}
          <div className="flex flex-wrap items-start justify-center gap-x-8 gap-y-10 max-w-[288px] sm:max-w-xl mx-auto">
            {[
              { icon: Ruler, title: "Material Takeoff", rgb: "204, 105, 67", href: undefined },
              { icon: Calculator, title: "Estimates", rgb: "74, 107, 138", href: "/waitlist/estimations" },
              { icon: Scale, title: "Bid Leveling", rgb: "169, 169, 155", href: "/waitlist/bids" },
              { icon: CalendarClock, title: "Scheduling", rgb: "204, 105, 67", href: "/waitlist/scheduling" },
              { icon: ClipboardCheck, title: "Punch Lists", rgb: "74, 107, 138", href: "/waitlist/punchlist" },
              { icon: MessageSquare, title: "Proactive Client Updates", rgb: "169, 169, 155", href: undefined },
              { icon: Building2, title: "Draw Inspections", rgb: "204, 105, 67", href: "/inspections" },
            ].map((item, index) => {
              const circle = (
                <>
                  <div
                    className="flex h-[88px] w-[88px] items-center justify-center rounded-full border transition-transform group-hover:scale-105"
                    style={{
                      backgroundColor: `rgba(${item.rgb}, 0.12)`,
                      borderColor: `rgba(${item.rgb}, 0.3)`,
                      color: `rgb(${item.rgb})`,
                    }}
                  >
                    <item.icon className="h-9 w-9" />
                  </div>
                  <span className="mt-3 text-sm font-medium leading-snug text-gray-200 text-balance">
                    {item.title}
                  </span>
                </>
              )
              return item.href ? (
                <a key={index} href={item.href} className="group flex w-28 flex-col items-center text-center">
                  {circle}
                </a>
              ) : (
                <div key={index} className="flex w-28 flex-col items-center text-center">
                  {circle}
                </div>
              )
            })}
          </div>

          {/* Closing CTA */}
          <div className="mt-16 pt-4 text-center">
            <p className="text-gray-300 mb-6 text-pretty">
              Looking for something different that&apos;s not here? We can still help.
            </p>
            <Button
              size="lg"
              onClick={handleGetInTouch}
              className="bg-primary hover:bg-primary/90 text-white px-8 h-12 font-medium"
            >
              Get in touch <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
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
              Calculate your ROI
            </h2>
            <p className="text-lg text-gray-300 leading-relaxed text-pretty">
              For your bidding and estimating workflow
            </p>
          </div>
          <RoiCalculator onTryItOut={handleTryItOut} />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="bg-section-dark py-24 border-t border-white/10">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-sm font-semibold uppercase tracking-widest text-primary">Company</span>
            <h2 className="font-playfair text-4xl md:text-5xl font-bold mt-4 mb-8 text-white">
              Meet the Team
            </h2>
            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
              Gaudi is built by people who have managed construction projects, owned and operated properties and shipped AI products used by Fortune 500 companies. We’ve worked inside leading tech companies and research institutions, but we know how construction really works because we’ve lived it.
            </p>
            <div className="mb-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
              <a
                href="https://www.linkedin.com/in/sebastian-piedra-rodriguez"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-gray-300 transition-colors hover:text-white"
              >
                <Linkedin className="h-4 w-4" aria-hidden="true" />
                Sebastian Piedra Rodriguez
              </a>
              <a
                href="https://www.linkedin.com/in/begumcital"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-gray-300 transition-colors hover:text-white"
              >
                <Linkedin className="h-4 w-4" aria-hidden="true" />
                Begum Cital
              </a>
            </div>
            <Button
              asChild
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white px-8 h-12 font-medium"
            >
              <a href="/careers/engineering">Join Us</a>
            </Button>
          </div>
          <div className="relative h-96 rounded-lg overflow-hidden mt-16">
            <img src="/team.jpeg" alt="Gaudi AI team" className="absolute inset-0 w-full h-full object-cover" />
          </div>
        </div>
                  {/* Stats Carousel */}
            <div className="mt-20 relative max-w-4xl mx-auto">
            <p className="text-sm font-semibold uppercase tracking-widest text-gray-300 text-center mb-8">Our backgrounds</p>
            <div className="overflow-hidden">
              <div className="flex gap-0 animate-scroll">
                {[...stats, ...stats, ...stats].map((stat, index) => (
                  <div key={index} className="flex-shrink-0 w-40 text-center">
                    <div className="h-12 flex items-center justify-center mb-2">
                      {stat.image ? (
                        <img
                          src={stat.image}
                          alt={stat.label || 'stat-image'}
                          className="mx-auto max-h-12 object-contain"
                          style={{ filter: 'grayscale(1) brightness(1.1) opacity(0.6)' }}
                        />
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
      <section id="contact" className="bg-section-dark py-24 border-t border-white/10">
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
                contactTab === "call" ? "bg-primary text-white" : "text-gray-400 hover:text-white"
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
                contactTab === "message" ? "bg-primary text-white" : "text-gray-400 hover:text-white"
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
                    <Input
                      name="phone"
                      type="tel"
                      placeholder="Phone number"
                      className="bg-white/12 border-white/20 text-white h-12 placeholder-white/80"
                    />
                    <Input name="company" placeholder="Company Name" type="text" className="bg-white/12 border-white/20 text-white h-12 placeholder-white/80" required />
                    <textarea
                      name="message"
                      placeholder="How can we help?"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="flex w-full rounded-md border border-white/20 bg-white/12 px-3 py-2 text-base md:text-sm text-white placeholder:text-muted-foreground resize-none h-25 focus-visible:outline-none focus-visible:ring-ring/50 focus-visible:ring-[3px]"
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

          <div className="mt-16 text-center">
              <p className="text-gray-300 mb-6">Have more questions? Reach out directly:</p>
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
                <h4 className="font-semibold mb-4">Product</h4>
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

          <div className="pt-8 text-center text-background/60">
            <p>&copy; 2026 Gaudi AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
