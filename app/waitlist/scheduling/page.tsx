import "../../globals.css"
import { notFound } from "next/navigation"
import { getWaitlistConfig } from "@/lib/waitlist-config"
import WaitlistPage from "@/components/waitlist/WaitlistPage"

export default function WaitlistSchedulingPage() {
  const config = getWaitlistConfig("scheduling")
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

export const metadata = {
  title: "AI-Powered Construction Scheduling | Gaudi AI",
  description:
    "From chaos to clarity: automated schedules that improve in real time.",
  openGraph: {
    title: "AI-Powered Construction Scheduling | Gaudi AI",
    description:
      "From chaos to clarity: automated schedules that improve in real time.",
    url: `${baseUrlForMeta}/waitlist/scheduling`,
    siteName: "Gaudi AI",
  },
}
