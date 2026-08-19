/**
 * Smoke-tests the CTA capture endpoint end to end.
 *
 *   npm run probe:cta -- --base https://agentic-back-office-dev-....azurewebsites.net
 *   npm run probe:cta -- --base http://localhost:7071          # local `func host start`
 *   npm run probe:cta -- --base <host> --write                 # opt in to a real row
 *
 * Without --write it only exercises paths that reject before touching the
 * database, so it is safe to point at a live backend.
 */

const args = process.argv.slice(2)
const flag = (name, fallback = null) => {
  const i = args.indexOf(`--${name}`)
  return i !== -1 && args[i + 1] ? args[i + 1] : fallback
}

const base = (flag("base", "http://localhost:7071") || "").replace(/\/$/, "")
const write = args.includes("--write")
const origin = flag("origin", "https://heygaudi.ai")
const endpoint = `${base}/api/capture_cta_email`

async function call(label, init, expected) {
  const started = Date.now()
  try {
    const res = await fetch(endpoint, init)
    const text = await res.text()
    let body = text
    try {
      body = JSON.stringify(JSON.parse(text))
    } catch {
      body = text.slice(0, 200)
    }
    const pass = expected ? res.status === expected : res.ok
    console.log(`${pass ? "ok  " : "FAIL"} ${label}`)
    console.log(`     ${res.status}${expected ? ` (expected ${expected})` : ""} ${body}  (${Date.now() - started}ms)`)
    return pass
  } catch (err) {
    console.log(`FAIL ${label}\n     no response: ${err.name}: ${err.message}`)
    return false
  }
}

const post = (payload, headers = {}) => ({
  method: "POST",
  headers: { "Content-Type": "application/json", Origin: origin, ...headers },
  body: JSON.stringify(payload),
})

console.log(`probing ${endpoint}\n`)

await call("rejects an empty body", post({}), 400)
await call("rejects a malformed address", post({ email: "nope", source: "probe" }), 400)
await call(
  "rejects a disallowed origin",
  post({ email: "probe@example.com", source: "probe" }, { Origin: "https://not-our-site.example" }),
  403,
)

if (write) {
  console.log("\n-- live write: this inserts a real row --")
  const ok = await call(
    "captures a lead",
    post({ email: "probe@example.com", source: "probe" }, { "x-request-id": "probe-write" }),
    200,
  )
  if (ok) {
    // Re-POSTing the same address must update rather than collide, since visitors
    // retry constantly.
    await call("upserts on a repeat submission", post({ email: "probe@example.com", source: "probe" }), 200)
  }
} else {
  console.log("\nskipped the write path; pass --write to insert a real row")
}
