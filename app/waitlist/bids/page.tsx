import "../../globals.css"
import { notFound } from "next/navigation"
import { getWaitlistConfig } from "@/lib/waitlist-config"
import WaitlistPage from "@/components/waitlist/WaitlistPage"
import { Metadata } from "next"

// TODO: reformat this, so not scheduiling specific
export default function WaitlistSchedulingPage() {
  const config = getWaitlistConfig("bids")
  const functionApiBase = process.env.FUNCTION_API_BASE || ""
  const functionApiKey = process.env.FUNCTION_API_KEY || ""

  if (!config) {
    notFound()
  }

  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null) ||
    "https://heygaudi.ai"

  return (
    <WaitlistPage
      config={config}
      baseUrl={baseUrl}
      functionApiBase={functionApiBase}
      functionApiKey={functionApiKey}
    />
  )
}

const baseUrlForMeta =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null) ||
  "https://heygaudi.ai"

export function generateMetadata(): Metadata {
  return {
    title: "AI-powered Bid Leveling | Gaudi AI",
    description:
        "Stop reformatting PDFs and emails. Auto-create a bid package, gather quotes, and compare everything instantly in one standardized view.",
    openGraph: {
      title: "AI-powered Bid Leveling | Gaudi AI",
      description:
        "Stop reformatting PDFs and emails. Auto-create a bid package, gather quotes, and compare everything instantly in one standardized view.",
      url: `${baseUrlForMeta}/waitlist/bids`,
      siteName: "Gaudi AI",
    },
  }
}