"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Mail, Linkedin, Twitter, CheckCircle2 } from "lucide-react"

export default function LandingPage({
  functionApiBase,
  functionApiKey,
}: {
  functionApiBase: string
  functionApiKey: string
}) {

  const [email, setEmail] = useState("")
  const [contactSubmitted, setContactSubmitted] = useState(false)

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
      <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-transparent">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <a href="/" className="transition-colors">
              <img
                src="/logo_text.png"
                alt="Gaudi AI Logo"
                className="h-6 w-auto filter brightness-0 invert"
              />
            </a>
            <div className="hidden md:flex flex-1 items-center justify-end space-x-8">
              <button
                onClick={() => scrollToSection("hero")}
                className="text-sm font-medium transition-colors text-white/90 hover:text-white"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className="text-sm font-medium transition-colors text-white/90 hover:text-white"
              >
                Team
              </button>
              <a
                href="/careers/engineering"
                className="text-sm font-medium transition-colors text-white/90 hover:text-white"
              >
                Careers
              </a>
              <button
                onClick={() => scrollToSection("contact")}
                className="text-sm font-medium transition-colors text-white/90 hover:text-white"
              >
                Contact
              </button>
              <Button
                size="sm"
                onClick={() => scrollToSection("contact")}
                className="bg-white text-slate-900 hover:bg-white/90"
              >
                Learn More <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

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

          <Card className="p-12 border-2 border-primary/20" style={{ background: 'rgba(255, 255, 255, 0.10)' }}>
            <CardContent className="p-0">
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
                    About
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
                <a href="https://www.linkedin.com/in/sebastian-piedra-rodriguez/" className="text-background/80 hover:text-background transition-colors">
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
