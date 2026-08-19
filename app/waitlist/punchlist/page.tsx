import "../../globals.css"
import { notFound } from "next/navigation"
import { getWaitlistConfig } from "@/lib/waitlist-config"
import WaitlistPage from "@/components/waitlist/WaitlistPage"
import { Metadata } from "next"

export default function WaitlistSchedulingPage() {
  const config = getWaitlistConfig("punchlist")

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
    />
  )
}

const baseUrlForMeta =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null) ||
  "https://heygaudi.ai"

export function generateMetadata(): Metadata {
  return {
    title: "Automated Punch List Detection for Construction | Gaudi AI",
    description:
      "Let the power of AI handle your punch list for you. Never miss a government code, lose design or client context, or manually track and verify punch list items again.",
    openGraph: {
      title: "Automated Punch List Detection for Construction | Gaudi AI",
      description:
        "Let the power of AI handle your punch list for you. Never miss a government code, lose design or client context, or manually track and verify punch list items again.",
      url: `${baseUrlForMeta}/waitlist/punchlist`,
      siteName: "Gaudi AI",
    },
  }
}
