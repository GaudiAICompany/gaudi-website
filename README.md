# gaudi-website
Any code related to the website for Gaudi AI 


## 📦 Project Structure

/app contains all the website routes where /app maps to / and every folder would map that folder name to an url path

## 🚀 Running locally

Needs Node 20+ (CI builds on 22).

```bash
npm install
npm run dev            # http://localhost:3000
```

That's enough for everything except the signup CTAs. Those POST to
`capture_cta_lead`, which lives in
[gaudi-agents-functions](https://github.com/GaudiAICompany/gaudi-agents-functions),
not here, so point the site at one:

```bash
# .env.local
NEXT_PUBLIC_LEAD_CAPTURE_URL=https://<backend-host>/api/capture_cta_lead
```

Against a backend running locally that's `http://localhost:7071/api/capture_cta_lead`,
after `func host start` in a clone of that repo. Leave the variable unset and the
CTAs fail immediately with `endpoint_unconfigured` in the console rather than
looking like a network error.

To exercise a backend without going through the UI:

```bash
npm run probe:cta -- --base https://<backend-host>
npm run probe:cta -- --base <host> --write     # also inserts a real row
```

Without `--write` the probe only touches paths that reject before reaching the
database, so it is safe against a live backend.

## ⚙️ Environment

The site is a **static export** (`output: 'export'`), so there is no server here
and no runtime configuration. Every variable is read by `next build` and inlined
into the JavaScript bundle, which has three consequences worth knowing before you
touch config:

- It has to be set **wherever the build runs**. Setting it in Azure does nothing —
  there is no process left to read it.
- It has to be named `NEXT_PUBLIC_*` for client code to see it. Anything else
  reads as `undefined` in the browser and the build still succeeds, so dropping
  the prefix breaks the site at runtime with no error to point at.
- The prefix controls whether client code *may* reference the value, not whether
  the value stays secret. Anything inlined is readable in the page source of every
  deployed page. **Never put a credential in this repo.**

| Variable | Required | Read by | Notes |
| --- | --- | --- | --- |
| `NEXT_PUBLIC_LEAD_CAPTURE_URL` | **yes** | `lib/capture-lead.ts` | Full URL of the backend's `capture_cta_lead` endpoint. A plain address, not a credential. Unset ⇒ every CTA fails fast with `code=endpoint_unconfigured`. |
| `NEXT_PUBLIC_BLUEPRINT_UPLOAD_URL` | no | `lib/upload-blueprint.ts` | Full URL of the backend endpoint that accepts a plan set from `/get-started`. **No such endpoint exists yet**, so unset is the expected state: signup still completes, and the last screen asks the visitor to forward the file by email instead. Also a plain address, not a credential. |
| `NEXT_PUBLIC_SITE_URL` | no | `app/waitlist/*/page.tsx` | Canonical origin for share links and OG metadata. Set nowhere today; falls back to `https://heygaudi.ai`. |
| `VERCEL_URL` | no | `app/waitlist/*/page.tsx` | Second fallback for the canonical origin. Never set on Azure. |

In production `NEXT_PUBLIC_LEAD_CAPTURE_URL` is a GitHub Actions **variable**
(Settings → Secrets and variables → Actions → Variables), read by the build step
in `.github/workflows/azure-static-web-apps-icy-smoke-0822f711e.yml`. A variable
rather than a secret because a public endpoint URL is not one, and keeping it
visible makes it obvious which backend the site is pointed at. Switching between
the dev and prod backends is that one value plus a rebuild — no code changes.


## 🔌 What the backend expects

The endpoint is live at `/api/capture_cta_lead` on the `agentic-back-office-dev`
function app. It takes no key: the backend owns the database credentials and
decides what actually gets written, and this repo holds a URL and nothing else.

A browser can only reach it from an allowed origin, and that takes **two**
independent settings on the function app:

- `LEAD_CAPTURE_ALLOWED_ORIGINS`, the allowlist the function itself enforces — a
  disallowed `Origin` gets a 403.
- Azure's platform CORS list, which is what answers the preflight. The function
  emits no CORS headers of its own, so an origin missing here is blocked by the
  browser before the function ever runs.

A new origin — another domain, a Static Web Apps preview URL — has to be added to
both, or the CTAs fail in a way that looks like the site is down.

## 🔎 Reading the logs

Every submission logs one line client-side, carrying no address and no credential
— browser consoles are effectively public:

```
[cta] failed source=Get started requestId=<uuid> status=404 code=http_404 durationMs=812 hint=endpoint-not-deployed
```

`status=no-response` means the request never reached a server at all (DNS, TLS,
offline, blocking extension), as distinct from a server error.

The same id appears in the backend's Application Insights traces, and the site
shows it beneath the error message, so a screenshot from a visitor is enough to
find the matching trace.
