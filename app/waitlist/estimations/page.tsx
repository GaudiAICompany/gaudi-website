import "../../globals.css"
import { notFound } from "next/navigation"
import { getWaitlistConfig } from "@/lib/waitlist-config"
import WaitlistPage from "@/components/waitlist/WaitlistPage"
import { Metadata } from "next"

export default function WaitlistSchedulingPage() {
  const config = getWaitlistConfig("estimations")
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
    title: "Your AI Estimator | Gaudi AI",
    description:
      "Never miss scope again. Gaudi captures every line item, pulls current pricing, and delivers accurate estimates. Bid 1 job or 100—same quality and speed.",
    openGraph: {
      title: "Your AI Estimator | Gaudi AI",
      description:
        "Never miss scope again. Gaudi captures every line item, pulls current pricing, and delivers accurate estimates. Bid 1 job or 100—same quality and speed.",
      url: `${baseUrlForMeta}/waitlist/estimating`,
      siteName: "Gaudi AI",
    },
  }
}