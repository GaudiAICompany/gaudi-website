"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Mail, Linkedin, Phone, MapPin, Clock } from "lucide-react"

export default function Careers() {
  return (
    <div className="min-h-screen bg-section-dark text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-transparent">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <a href="/" className="transition-colors">
              <img src="/logo_text.png" alt="Gaudi AI Logo" className="h-6 w-auto filter brightness-0 invert" />
            </a>
            <div className="hidden md:flex flex-1 items-center justify-end space-x-8">
              <a
                href="/"
                className="text-sm font-medium transition-colors text-white/90 hover:text-white"
              >
                Home
              </a>
              <a
                href="/#about"
                className="text-sm font-medium transition-colors text-white/90 hover:text-white"
              >
                Team
              </a>
              <a
                href="/careers/engineering"
                className="text-sm font-medium transition-colors text-white"
              >
                Careers
              </a>
              <a
                href="/#contact"
                className="text-sm font-medium transition-colors text-white/90 hover:text-white"
              >
                Contact
              </a>
              <Button size="sm" asChild className="bg-white text-slate-900 hover:bg-white/90">
                <a href="mailto:hiring@heygaudi.ai">
                  Apply Now <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hiring Banner */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/15 via-transparent to-transparent" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 mb-8">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary" />
            </span>
            <span className="text-sm font-medium tracking-wide text-white/90">Now Hiring</span>
          </div>
          <h1 className="font-playfair text-5xl md:text-7xl font-bold mb-6 leading-tight text-balance">
            We&apos;re Hiring
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed text-pretty">
            Join Gaudi AI and help build real AI products for the construction industry. We value what you can build over
            where you came from.
          </p>
        </div>
      </section>

      {/* Job Posting */}
      <section className="pb-28">
        <div className="max-w-3xl mx-auto px-6">
          <p className="mb-6 text-sm font-medium uppercase tracking-widest text-primary text-center">1 Open Position</p>

          <Card className="border-2 border-primary/20" style={{ background: "rgba(255, 255, 255, 0.06)" }}>
            <CardContent className="p-8 md:p-12">
              {/* Header */}
              <div className="border-b border-white/15 pb-8 mb-8">
                <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-4 text-white text-balance">
                  AI Engineer / Full-Stack Developer
                </h2>
                <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-gray-300">
                  <span className="inline-flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" /> Costa Rica
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <Clock className="h-4 w-4 text-primary" /> Full-time · Immediate start
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <ArrowRight className="h-4 w-4 text-primary" /> ~$2,600 USD/month
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="space-y-6 text-gray-300 leading-relaxed">
                <p className="text-lg text-white">
                  We&apos;re hiring AI Engineers in Costa Rica.
                </p>
                <p>
                  Gaudi AI is a San Francisco-based startup backed by top venture funds in the US and Latam.
                </p>
                <p>
                  We&apos;re looking for an exceptional AI Engineer / Full-Stack Developer who is self-taught, learns fast,
                  and loves building. <span className="text-white font-medium">Experience &gt; credentials.</span>
                </p>
                <p>
                  The work is building real AI products for the construction industry: computer vision, AI workflows,
                  automations, and tools used by real customers.
                </p>

                <div>
                  <h3 className="font-semibold text-white mb-2">Stack</h3>
                  <p>
                    Python, Azure (Functions, Cosmos DB, Blob Storage, Service Bus, etc.), SQL, React, LLMs/VLMs, and
                    agentic coding tools.
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 pt-2">
                  <div className="rounded-md border border-white/10 bg-white/5 p-4">
                    <p className="text-xs uppercase tracking-widest text-gray-400 mb-1">Compensation</p>
                    <p className="text-white font-medium">~$2,600 USD/month</p>
                    <p className="text-sm text-gray-400">Adjustable based on experience and profile.</p>
                  </div>
                  <div className="rounded-md border border-white/10 bg-white/5 p-4">
                    <p className="text-xs uppercase tracking-widest text-gray-400 mb-1">Schedule</p>
                    <p className="text-white font-medium">Full-time</p>
                    <p className="text-sm text-gray-400">Immediate start.</p>
                  </div>
                </div>
              </div>

              {/* Contact */}
              <div className="border-t border-white/15 pt-8 mt-8">
                <h3 className="font-semibold text-white mb-4">Contact</h3>
                <div className="flex flex-col gap-3">
                  <a
                    href="mailto:hiring@heygaudi.ai"
                    className="inline-flex items-center gap-3 text-gray-300 hover:text-primary transition-colors"
                  >
                    <Mail className="h-4 w-4 text-primary" /> hiring@heygaudi.ai
                  </a>
                  <a
                    href="https://wa.me/16084404036"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 text-gray-300 hover:text-primary transition-colors"
                  >
                    <Phone className="h-4 w-4 text-primary" /> WhatsApp +1 608-440-4036
                  </a>
                </div>

                <h3 className="font-semibold text-white mt-8 mb-4">Founders</h3>
                <div className="flex flex-col gap-3">
                  <a
                    href="https://www.linkedin.com/in/sebastian-piedra-rodriguez"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 text-gray-300 hover:text-primary transition-colors"
                  >
                    <Linkedin className="h-4 w-4 text-primary" /> Sebastian Piedra Rodriguez
                  </a>
                  <a
                    href="https://www.linkedin.com/in/begumcital/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 text-gray-300 hover:text-primary transition-colors"
                  >
                    <Linkedin className="h-4 w-4 text-primary" /> Begum Cital
                  </a>
                </div>

                <Button asChild size="lg" className="mt-8 bg-primary hover:bg-primary/90 text-white h-12 font-medium">
                  <a href="mailto:hiring@heygaudi.ai">
                    Apply Now <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Social links - bottom left */}
      <div className="fixed bottom-6 left-6 z-40 flex flex-col gap-3">
        <span className="text-xs font-medium tracking-widest uppercase text-gray-500">Connect</span>
        <div className="flex gap-3">
          <a
            href="https://www.linkedin.com/company/gaudiai/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-10 h-10 rounded-sm border border-white/10 bg-white/5 text-gray-400 hover:text-white hover:border-white/20 hover:bg-white/10 transition-all"
            aria-label="LinkedIn"
          >
            <Linkedin className="h-4 w-4" />
          </a>
          <a
            href="mailto:contact@heygaudi.ai"
            className="flex items-center justify-center w-10 h-10 rounded-sm border border-white/10 bg-white/5 text-gray-400 hover:text-white hover:border-white/20 hover:bg-white/10 transition-all"
            aria-label="Email"
          >
            <Mail className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  )
}
