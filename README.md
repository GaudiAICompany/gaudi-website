# gaudi-website
Any code related to the website for Gaudi AI 


## 📦 Project Structure

/app contains all the website routes where /app maps to / and every folder would map that folder name to an url path

## 🚀 Running locally

Needs Node 20+.

```bash
npm install
npm run dev            # http://localhost:3000
```

That's enough for everything except the signup CTAs. Those POST to an endpoint
that lives in [gaudi-agents-functions](https://github.com/GaudiAICompany/gaudi-agents-functions),
not here, so point the site at one:

```bash
# .env.local
NEXT_PUBLIC_LEAD_CAPTURE_URL=https://<backend-host>/api/capture_cta_email
```

Leave it unset and the CTAs fail immediately with `endpoint_unconfigured` in the
console — deliberately loud, rather than looking like a network error.

One thing to know before touching config: this site is a **static export**, so
`next build` compiles `NEXT_PUBLIC_*` values into the bundle. They have to be set
wherever the build runs, and setting them in Azure does nothing — there is no
server left to read them.

See [docs/ENVIRONMENT.md](docs/ENVIRONMENT.md) for every variable, how the
deploy supplies them, and how to run against a backend on localhost.
