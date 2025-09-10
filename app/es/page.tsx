import LandingPageEs from "./LandingPageEs"

export default function Page() {
  const functionApiBase = process.env.FUNCTION_API_BASE || ""
  const functionApiKey = process.env.FUNCTION_API_KEY || ""
  return (
    <LandingPageEs
      functionApiBase={functionApiBase}
      functionApiKey={functionApiKey}
    />
  )
}
