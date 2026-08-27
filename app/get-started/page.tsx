import type { Metadata } from "next"

import { OnboardingFlow } from "@/components/onboarding/onboarding-flow"

export const metadata: Metadata = {
  title: "Get started | Gaudi AI Estimator",
  description:
    "Send your blueprint and a few details, and your dedicated Gaudi Estimator turns it into a full estimate priced to your region. First 5 estimates free, then $150 each.",
  // A signup funnel has nothing to rank for and should not compete with the pages that do.
  robots: { index: false, follow: true },
}

export default function GetStartedPage() {
  return <OnboardingFlow />
}
