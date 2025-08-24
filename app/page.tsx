import LandingPage from "./LandingPage"

export default function Page() {
  const functionApiBase = process.env.FUNCTION_API_BASE || ""
  const functionApiKey = process.env.FUNCTION_API_KEY || ""

  console.log("FUNCTION_API_BASE:", process.env.FUNCTION_API_BASE)
  console.log("FUNCTION_API_KEY:", process.env.FUNCTION_API_KEY)

  return (
    <LandingPage
      functionApiBase={functionApiBase}
      functionApiKey={functionApiKey}
    />
  )
}
