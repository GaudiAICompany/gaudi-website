import "./globals.css"
import LandingPage from "./LandingPage"

export default function InspectionsPage() {
  const functionApiBase = process.env.FUNCTION_API_BASE || ""
  const functionApiKey = process.env.FUNCTION_API_KEY || ""
  return (
    <LandingPage
      functionApiBase={functionApiBase}
      functionApiKey={functionApiKey}
    />
  )
}
