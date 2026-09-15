import { NextResponse } from "next/server"
import faqs from "@/public/faqs.json"

export function GET() {
  return NextResponse.json(faqs, {
    headers: {
      "Cache-Control": "public, max-age=86400, stale-while-revalidate",
    },
  })
}
