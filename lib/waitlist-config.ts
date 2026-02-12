export type WaitlistProductConfig = {
  slug: string
  title: string
  title2: string
  subtitle: string
  image: string
  releaseDate: string
  /** One-liner used when sharing to social media */
  shareOneLiner: string
}

const waitlistProducts: Record<string, WaitlistProductConfig> = {
  scheduling: {
    slug: "scheduling",
    title: "Instant scheduling",
    title2: "for the built world",
    subtitle: "A smart scheduler that delivers instant results with no overhead, lower cost, and early issue detection.",
    image: "/scheduling.png",
    releaseDate: "Early Access: Weekly invites",
    shareOneLiner: "Join the waitlist for AI-powered construction scheduling. From chaos to clarity.",
  },
  punchlist: {
    slug: "punchlist",
    title: "Catch every issue",
    title2: "before inspectors do",
    subtitle: "Let the power of AI handle your punch list for you. Never miss a government code, lose design or client context, or manually track and verify punch list items again.",
    image: "/punchlist.png",
    releaseDate: "Early Access: Weekly invites",
    shareOneLiner: "Join the waitlist to never worry about a punch list item again. The future of construction is now!",
  },
  estimations: {
    slug: "estimations",
    title: "Your AI estimator",
    title2: "Never misses scope",
    subtitle: "Missed scope and outdated pricing kill bids. Gaudi captures every line item, pulls current pricing, delivers accurate estimates. 1 job or a 100: same quality & speed.",
    image: "/estimator.png",
    releaseDate: "Early Access: Weekly invites",
    shareOneLiner: "Join the waitlist to never worry about a punch list item again. The future of construction is now!",
  }
}

export function getWaitlistConfig(productSlug: string): WaitlistProductConfig | null {
  return waitlistProducts[productSlug] ?? null
}

export function getAllWaitlistSlugs(): string[] {
  return Object.keys(waitlistProducts)
}
