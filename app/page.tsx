import LandingPage from "./LandingPage"

export default function Page({ functionApiBase, functionApiKey }: {
  functionApiBase: string
  functionApiKey: string
}) {
  return (
    <LandingPage
      functionApiBase={functionApiBase}
      functionApiKey={functionApiKey}
    />
  )
}

export async function getServerSideProps() {
  return {
    props: {
      functionApiBase: process.env.FUNCTION_API_BASE || "",
      functionApiKey: process.env.FUNCTION_API_KEY || "",
    },
  }
}
