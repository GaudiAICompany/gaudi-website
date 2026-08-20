import { SiteHeader } from "@/components/landing/site-header"
import { Hero } from "@/components/landing/hero"
import { HowItWorks } from "@/components/landing/how-it-works"
import { ConversionBand } from "@/components/landing/conversion-band"
import { Pricing } from "@/components/landing/pricing"
import { ClosingCta, Contact, SiteFooter } from "@/components/landing/closing-footer"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main>
        <Hero />
        <HowItWorks />
        <ConversionBand />
        <Pricing />
        <ClosingCta />
        <Contact />
      </main>
      <SiteFooter />
    </div>
  )
}
