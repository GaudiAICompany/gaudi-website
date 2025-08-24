import LandingPage from "./LandingPage"

export default function Page() {
  const functionApiBase = process.env.FUNCTION_API_BASE || ""
  const functionApiKey = process.env.FUNCTION_API_KEY || ""
  console.log("Function API Base:", functionApiBase)

  return (
    <LandingPage
      functionApiBase={functionApiBase}
      functionApiKey={functionApiKey}
    />
  )
}
