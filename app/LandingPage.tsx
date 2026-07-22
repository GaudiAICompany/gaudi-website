import Navbar from "@/components/landing/Navbar"
import Hero from "@/components/landing/Hero"
import BackedBy from "@/components/landing/BackedBy"
import Mission from "@/components/landing/Mission"
import HowItWorks from "@/components/landing/HowItWorks"
import Benefits from "@/components/landing/Benefits"
import ROICalculator from "@/components/landing/ROICalculator"
import Testimonials from "@/components/landing/Testimonials"
import About from "@/components/landing/About"
import Events from "@/components/landing/Events"
import FinalCTA from "@/components/landing/FinalCTA"
import Footer from "@/components/landing/Footer"

export default function LandingPage({
  functionApiBase,
  functionApiKey,
}: {
  functionApiBase: string
  functionApiKey: string
}) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <Hero />
        <BackedBy />
        <Mission />
        <HowItWorks />
        <Benefits />
        <ROICalculator />
        <Testimonials />
        <About />
        <Events />
        <FinalCTA functionApiBase={functionApiBase} functionApiKey={functionApiKey} />
      </main>
      <Footer />
    </div>
  )
}
