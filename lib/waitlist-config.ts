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
    releaseDate: "Q1 2026",
    shareOneLiner: "Join the waitlist for AI-powered construction scheduling. From chaos to clarity.",
  },
}

export function getWaitlistConfig(productSlug: string): WaitlistProductConfig | null {
  return waitlistProducts[productSlug] ?? null
}

export function getAllWaitlistSlugs(): string[] {
  return Object.keys(waitlistProducts)
}
