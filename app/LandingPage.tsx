"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  ArrowRight,
  Mail,
  Phone,
  MapPin,
  Clock,
  Globe,
  FileCheck,
  DollarSign,
  AlertTriangle,
  FileText,
  CheckCircle2 
} from "lucide-react"
import ImageModal from "./ImageModal"

export default function LandingPage({
  functionApiBase,
  functionApiKey,
}: {
  functionApiBase: string
  functionApiKey: string
}) {
  const [email, setEmail] = useState("")
  const [activeStep, setActiveStep] = useState(0)
  const [navOnLight, setNavOnLight] = useState(false)
  const [contactSubmitted, setContactSubmitted] = useState(false)

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const form = e.currentTarget
    const action = form.getAttribute("data-action")
    const emailInput = form.querySelector('input[type="email"]') as HTMLInputElement
    const email = emailInput?.value || ''
    const url = `${functionApiBase}/api/capture_cta_email?code=${functionApiKey}`

    const firstNameInput = form.querySelector('input[name="firstName"]') as HTMLInputElement
    const lastNameInput = form.querySelector('input[name="lastName"]') as HTMLInputElement
    const companyInput = form.querySelector('input[name="company"]') as HTMLInputElement
    const messageInput = form.querySelector('textarea[name="message"]') as HTMLTextAreaElement

    // TODO: add location
    const payload = {
      email,
      firstName: firstNameInput?.value || '',
      lastName: lastNameInput?.value || '',
      company: companyInput?.value || '',
      message: messageInput?.value || '',
    }

    const lead_record_res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!lead_record_res.ok) {
      return console.error(`Function call failed: ${lead_record_res.status}`, { status: lead_record_res.status });
    }

    switch (action) {
      case "cal":
        window.open(`https://cal.com/gaudiai?email=${encodeURIComponent(email)}`, "_blank", "noopener,noreferrer")
        break
      case "contact-form":
        setContactSubmitted(true) // always succeed for now
        break
      default:
        console.warn('Unknown form action:', action)
    }

  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const trackCTA = (label: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'cta_click', {
        event_category: 'engagement',
        event_label: label,
      });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const timelineSteps = document.querySelectorAll("[data-timeline-step]")
      const viewportCenter = window.innerHeight / 2

      let newActiveStep = 0
      timelineSteps.forEach((step, index) => {
        const rect = step.getBoundingClientRect()
        const stepCenter = rect.top - rect.height / 3

        if (stepCenter <= viewportCenter) {
          newActiveStep = index
        }
      })

      setActiveStep(newActiveStep)

      const heroSection = document.getElementById("hero")
      if (heroSection) {
        const heroRect = heroSection.getBoundingClientRect()
        setNavOnLight(heroRect.bottom <= 100)
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Initial call
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const timelineSteps = [
    {
      title: "AR-Guided Capture",
      description:
        "Gaudi uses augmented reality to guide on-site crews through step-by-step capture based on your project’s blueprints and milestones. No inspections skipped, no angles missed.  The result? 100% complete, fully verified reports, every time.",
      wireframe: "/mobile-ar-inspection-wireframe.png",
    },
    {
      title: "Verified & Fraud-Proof",
      description:
        "Every image is geo-tagged, time-stamped, and cryptographically verified, so you know exactly when, where, and how it was captured. With device checks, Landmark Match, and Live Capture, Gaudi ensures every report is real, secure, and fraud-proof.",
      wireframe: "/mobile-photo-auth-wireframe.png",
    },
    {
      title: "Real-time Inspections",
      description:
        "Continuous monitoring and instant reporting replace traditional 5-13 day inspection delays, accelerating disbursements and keeping projects moving at full speed.",
      wireframe: "/mobile-realtime-inspection-wireframe.png",
    },
  ]

  const benefits = [
    {
      icon: <Clock className="h-11 w-11" />,
      title: "Faster Turnaround = Faster Returns",
      description:
        "Approve and fund draws in hours, not weeks. Interest accrues sooner, your loan portfolio turns faster and borrower satisfaction rises.",
    },
    {
      icon: <Globe className="h-11 w-11" />,
      title: "Expanded Lending Footprint",
      description:
        "Virtual inspections unlock new markets, rural builds, out-of-state borrowers, without adding field staff.",
    },
    {
      icon: <FileCheck className="h-11 w-11" />,
      title: "Fraud and Risk Free",
      description:
        "Every photo is geo-tagged, time-stamped, and tamper-proof, so you can trust what you fund.",
    },
    {
      icon: <DollarSign className="h-11 w-11" />,
      title: "Get Paid Without the Wait",
      description:
        "Skip the backlog. Inspections are approved in minutes, keeping cash flowing to crews, subs, and suppliers.",
    },
    {
      icon: <FileText className="h-11 w-11" />,
      title: "On Demand Inspections",
      description:
        "No waiting for inspectors. With self-guided AR capture, your team completes inspections when the work is done.",
    },
    {
      icon: <AlertTriangle className="h-11 w-11" />,
      title: "Spot Issues Early",
      description:
        "Live progress tracking flags delays and budget overdraws before they derail your schedule.",
    },
  ]

const faqs = [
  {
    question: "Do I need a trained inspector to use Gaudi?",
    answer:
      "No. Any team member on site with a smartphone and a hard hat can use Gaudi. Gaudi’s AR-guided prompts ensure every capture is accurate and complete. Gaudi works offline. Inspectors capture everything on-site, and files sync automatically once back online.",
  },
  {
    question: "Is this accepted by banks and regulators?",
    answer:
      "Yes. Unlike appraisals, construction draw inspections are not bound by federal licensing rules—lenders set their own requirements. Gaudi produces audit-ready, tamper-proof reports that meet or exceed traditional inspection standards, giving both credit officers and regulators the documentation they expect.",
  },
  {
    question: "How does Gaudi prevent fraud?",
    answer:
      "Every capture is geo-tagged, timestamped, and cryptographically verified. Photos can’t be reused, edited, or faked. Reports are digitally signed and immutable." +
      "Every file is encrypted at capture, optimized for upload, and stored immutably in the cloud. Lenders control retention settings, while role-based access ensures only authorized users can view reports.",
  },
  {
    question: "How do you protect privacy on site?",
    answer:
      "Faces, license plates, and other personal identifiers are automatically blurred on-device before upload. That means no biometric data leaves the phone, reducing compliance risk and protecting worker privacy.",
  }
]

  return (
    <div className="min-h-screen">
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          navOnLight ? "bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <a href="#" className="transition-colors">
              <img
                src="/logo_text.png" // Replace with your actual image path
                alt="Gaudi AI Logo"
                className={`h-6 w-auto ${navOnLight ? "filter-none" : "filter brightness-0 invert"}`}
              />
            </a>
            <div className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => scrollToSection("hero")}
                className={`text-sm font-medium transition-colors ${
                  navOnLight ? "text-foreground/80 hover:text-foreground" : "text-white/90 hover:text-white"
                }`}
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection("why-gaudi")}
                className={`text-sm font-medium transition-colors ${
                  navOnLight ? "text-foreground/80 hover:text-foreground" : "text-white/90 hover:text-white"
                }`}
              >
                How It Works
              </button>
              <button
                onClick={() => scrollToSection("benefits")}
                className={`text-sm font-medium transition-colors ${
                  navOnLight ? "text-foreground/80 hover:text-foreground" : "text-white/90 hover:text-white"
                }`}
              >
                Benefits
              </button>
              <button
                onClick={() => scrollToSection("faq")}
                className={`text-sm font-medium transition-colors ${
                  navOnLight ? "text-foreground/80 hover:text-foreground" : "text-white/90 hover:text-white"
                }`}
              >
                FAQ
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className={`text-sm font-medium transition-colors ${
                  navOnLight ? "text-foreground/80 hover:text-foreground" : "text-white/90 hover:text-white"
                }`}
              >
                Contact Us
              </button>
              <Button
                size="sm"
                onClick={() => {trackCTA("top-banner-book-demo")}}
                className={
                  navOnLight ? "bg-primary text-white hover:bg-primary/90" : "bg-white text-slate-900 hover:bg-white/90"
                }
              >
                <a
                  href={`https://cal.com/gaudiai?email=${encodeURIComponent(email)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center"
                >
                  Book Demo
                </a>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden pt-16">
        <div className="absolute inset-0 z-0">
          <video autoPlay muted loop playsInline preload="auto" className="w-full h-full object-cover" poster="/background.png"> 
            <source src="https://gaudi.blob.core.windows.net/website-assets/background.mp4"/>
          </video>
          <div className="absolute inset-0 video-overlay" />
        </div>

        <div className="relative z-10 text-center text-white max-w-3xl mx-auto px-6">
          <h1 className="font-playfair text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Faster Draw Inspections
            <span className="block"> Powered by AI</span>
          </h1>
          <p className="text-lg md:text-xl mb-12 text-gray-200 max-w-2xl mx-auto leading-relaxed">
            Workers capture job-site imagery guided by Augmented Reality. AI models authenticate progress instantly. Banks release funds in minutes effortlessly.
          </p>

          <form
            onSubmit={handleContactSubmit}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-lg mx-auto"
            data-action="cal"
          >
            <Input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white/95 border-0 text-foreground placeholder:text-muted-foreground h-12 text-base"
              required
            />
            <Button
              type="submit"
              size="lg"
              onClick={() => {trackCTA("main-hero-learn-more")}}
              className="bg-primary hover:bg-primary/90 text-white px-8 h-12 whitespace-nowrap font-medium"
            >
              <a
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center"
              >
                Learn More <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </form>
        </div>
      </section>

      <section id="why-gaudi" className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-6">Revolutionizing Draw Inspections</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Gaudi reimagines construction inspections with augmented reality, instant verification, and fraud-proof reporting, turning weeks of delay into minutes of progress.
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 bg-border h-full hidden md:block" />

            <div className="space-y-16">
              {timelineSteps.map((step, index) => (
                <div
                  key={index}
                  data-timeline-step={index}
                  className={`grid md:grid-cols-2 gap-12 items-center relative transition-all duration-500 ${
                    index % 2 === 1 ? "md:grid-flow-col-dense" : ""
                  } ${activeStep == index ? "opacity-100" : "opacity-60"}`}
                >
                  <div
                    className={`absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full border-4 border-background z-10 hidden md:block transition-all duration-300 ${
                      activeStep == index ? "bg-primary scale-125 shadow-lg shadow-primary/30" : "bg-muted"
                    }`}
                  />

                  <div
                    className={`${index % 2 === 1 ? "md:col-start-2 md:text-right" : ""} transition-all duration-500 ${
                      activeStep == index ? "transform translate-y-0" : "transform translate-y-4"
                    }`}
                  >
                    <h3
                      id={index === 1 ? "photo-authentication" : undefined}
                      className={`font-playfair text-3xl font-bold mb-4 transition-colors duration-300 ${
                        activeStep == index ? "text-foreground" : "text-muted-foreground"
                      }`}
                    >
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground mb-6 leading-relaxed text-lg max-w-md">{step.description}</p>
                    <Button
                      variant="outline"
                      onClick={() => {trackCTA("timeline-learn-more")}}
                      className={`border-primary hover:bg-primary hover:text-white bg-transparent transition-all duration-300 ${
                        activeStep == index ? "text-primary opacity-100" : "text-muted-foreground opacity-60"
                      }`}
                    >
                      <a
                        href={`https://cal.com/gaudiai?email=${encodeURIComponent(email)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center"
                      >
                        Learn More <ArrowRight className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </div>

                  <div
                    className={`${index % 2 === 1 ? "md:col-start-1" : ""} transition-all duration-500 ${
                      activeStep == index ? "transform translate-y-0 opacity-100" : "transform translate-y-8 opacity-70"
                    }`}
                  >
                    <div className="flex justify-center">
                        <ImageModal
                          src={step.wireframe || "/placeholder.svg?height=500&width=250&query=mobile app wireframe"}
                          alt={`${step.title} mobile app wireframe`}
                        />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="benefits" className="bg-background py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-6">Why Gaudi?</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Gaudi bridges the gap: delivering certainty and faster returns for lenders, while accelerating progress for builders.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center p-6">
                <div className="text-primary mb-6 flex justify-center">{benefit.icon}</div>
                <h3 className="font-playfair text-xl font-bold mb-4">{benefit.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <form
              onSubmit={handleContactSubmit}
              className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-lg mx-auto"
              data-action="cal"
            >
              <Input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white border-2 border-primary/30 focus:border-primary text-foreground placeholder:text-muted-foreground h-12 text-base focus:ring-2 focus:ring-primary/20 transition-all duration-200"
              />
              <Button
                type="submit"
                size="lg"
                onClick={() => {trackCTA("main-hero-learn-more")}}
                className="bg-primary hover:bg-primary/90 text-white px-8 h-12 whitespace-nowrap font-medium"
              >
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center"
                >
                  Book a demo <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </form>
          </div>
        </div>
      </section>

      <section id="faq" className="bg-gray-50 py-20">
        <div className="max-w-4xl mx-auto px-6 pb-8">
          <div className="text-center mb-10">
            <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-6">Frequently Asked Questions</h2>
            <p className="text-xl text-muted-foreground">Get answers to common questions about Gaudi AI.</p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-0 bg-gray-50/50 hover:bg-white/80 transition-colors duration-200 shadow-sm"
              >
                <AccordionItem value={`item-${index}`} className="border-0 px-6 py-1">
                  <AccordionTrigger className="text-left font-semibold hover:no-underline py-4 text-base">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed pb-4 text-sm">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </div>
            ))}
          </Accordion>
        </div>
      </section>

      <section id="contact" className="bg-secondary/30 py-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-6">
              Ready to Transform Your Construction Projects?
            </h2>
            <p className="text-xl text-muted-foreground">Get in touch with our team to schedule a personalized demo.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="font-playfair text-2xl font-bold mb-6">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-primary" />
                  <a href="mailto:contact@heygaudi.ai" className="hover:text-primary transition-colors">
                    contact@heygaudi.ai
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-primary" />
                  <span>+1 (773) 633-5032</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span>San Francisco, CA</span>
                </div>
              </div>
            </div>

            <Card className="p-8">
              <CardContent className="space-y-4 p-0">
                {contactSubmitted ? (
                  <div
                    className="flex flex-col items-center justify-center text-center py-12"
                    role="status"
                    aria-live="polite"
                    tabIndex={-1}
                  >
                    <CheckCircle2 className="h-12 w-12 text-primary mb-4" />
                    <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                    <p className="text-muted-foreground mb-6">
                      Thanks for reaching out. Our team will get back to you shortly.
                    </p>
                    <Button onClick={() => setContactSubmitted(false)} className="bg-primary hover:bg-primary/90 text-white">
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <form
                    onSubmit={handleContactSubmit} 
                    className="space-y-4"
                    data-action="contact-form"
                  >
                    <div className="grid md:grid-cols-2 gap-4">
                      <Input placeholder="First Name" type="text" name="firstName" required/>
                      <Input placeholder="Last Name" type="text" name="lastName" required/>
                    </div>
                    <Input
                      type="email"
                      placeholder="Email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <Input placeholder="Company Name" type="text" name="company" />
                    <textarea
                      name="message"
                      placeholder="Tell us about your project..."
                      className="w-full p-3 border border-input rounded-md resize-none h-32"
                    />
                    <Button
                      type="submit"
                      onClick={() => {trackCTA("contact-form-send-message")}}
                      className="w-full bg-primary hover:bg-primary/90"
                    >
                      Send Message <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <footer className="bg-foreground text-background py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <h3 className="font-playfair text-2xl font-bold mb-4">Gaudi AI</h3>
              <p className="text-background/80 mb-6 max-w-md">
                Gaudi reimagines construction inspections with augmented reality, instant verification, and fraud-proof reporting.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-background/80">
                <li>
                  <a href="#why-gaudi" className="hover:text-background transition-colors">
                    Features
                  </a>
                </li>
                <li></li>
                <li></li>
                <li>
                  <a href="#benefits" className="hover:text-background transition-colors">
                    Documentation
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-background/80">
                <li>
                  <a href="#" className="hover:text-background transition-colors">
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
          </div>

          <div className="border-t border-background/20 mt-12 pt-8 text-center text-background/60">
            <p>&copy; 2025 Gaudi AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
