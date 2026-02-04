import "./globals.css"
import Inspections from "./Inspections"

export default function InspectionsPage() {
  const functionApiBase = process.env.FUNCTION_API_BASE || ""
  const functionApiKey = process.env.FUNCTION_API_KEY || ""
  return (
    <Inspections
      functionApiBase={functionApiBase}
      functionApiKey={functionApiKey}
    />
  )
}
