import type { MetadataRoute } from "next"

export const dynamic = "force-static"

const BASE_URL = "https://heygaudi.ai"

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  const routes: {
    path: string
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]
    priority: number
  }[] = [
    { path: "/", changeFrequency: "weekly", priority: 1 },
    { path: "/about", changeFrequency: "monthly", priority: 0.8 },
    { path: "/newsroom", changeFrequency: "weekly", priority: 0.8 },
    { path: "/partnership", changeFrequency: "monthly", priority: 0.7 },
    { path: "/get-started", changeFrequency: "monthly", priority: 0.9 },
    { path: "/privacy", changeFrequency: "yearly", priority: 0.3 },
    { path: "/faq", changeFrequency: "monthly", priority: 0.7 },
  ]

  return routes.map((route) => ({
    url: `${BASE_URL}${route.path === "/" ? "" : route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }))
}
