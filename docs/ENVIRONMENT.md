# Environment variables

Every variable this repo reads, where it is read, and where to set it.

The site is a **static export** (`output: 'export'`), so there is no server here
and no runtime configuration. Everything below is **build-time**: inlined into the
JavaScript bundle by `next build`.

> **This is the important part.** Anything a page passes into a client component
> ends up **publicly readable in the page source** — `NEXT_PUBLIC_` prefix or not.
> The prefix controls whether client code may reference the variable, *not*
> whether the value stays secret. **Never put a credential in this repo.**
> Misreading this is exactly how a function key ended up in the public HTML of
> every deployed page.

## Variables

| Variable | Required | Read by | Notes |
| --- | --- | --- | --- |
| `NEXT_PUBLIC_LEAD_CAPTURE_URL` | **yes** | `lib/capture-lead.ts` | Full URL of the backend's `capture_cta_email` endpoint. A plain address, not a credential. Unset ⇒ every CTA fails fast with `code=endpoint_unconfigured`. |
| `NEXT_PUBLIC_SITE_URL` | no | `app/waitlist/*/page.tsx` | Canonical URL for share links and OG metadata. Falls back to `https://heygaudi.ai`. |
| `VERCEL_URL` | no | `app/waitlist/*/page.tsx` | Legacy fallback from a Vercel deploy. Unused on Azure. |

**Production:** `NEXT_PUBLIC_LEAD_CAPTURE_URL` is a GitHub Actions **variable**
(Settings → Secrets and variables → Actions → Variables), written into
`.env.production` by the deploy workflow. It's a variable rather than a secret
because it is not one — and keeping it visible makes it obvious which backend the
site is pointed at.

Switching the site between the dev and prod backends is that one value plus a
rebuild. No code changes.

**Local:** put it in `.env.local`:

```bash
NEXT_PUBLIC_LEAD_CAPTURE_URL=http://localhost:7071/api/capture_cta_email
```

## Retired

| Variable | Status |
| --- | --- |
| `FUNCTION_API_BASE` | **Unused.** Pointed at a function app that no longer exists, which is what broke the CTAs. |
| `FUNCTION_API_KEY` | **Unused, and leaked.** It shipped in the query string of a client-side `fetch`, so it was readable in the page source of every deployed page. Rotate it, then delete it. |

Delete both from the repo secrets and from the Static Web App's application
settings. The workflow step that wrote them into `.env.production` is gone.

---

# Where the backend lives

The endpoint is **not** in this repo. It is `capture_cta_email` in
[`GaudiAICompany/gaudi-agents-functions`](https://github.com/GaudiAICompany/gaudi-agents-functions),
deployed to the `agentic-back-office` function apps.

That split is deliberate: the backend owns the database credentials and decides
what gets written. This repo holds a URL and nothing else. There is no
`api/` folder here, and there shouldn't be — a second backend would mean a second
secret store and a second thing to audit.

---

# Running locally

## Front end only

```bash
npm install
npm run dev            # http://localhost:3000
```

Point `NEXT_PUBLIC_LEAD_CAPTURE_URL` at a deployed backend to exercise the CTAs,
or leave it unset and expect `code=endpoint_unconfigured` in the console.

## Against a local backend

In a clone of `gaudi-agents-functions`:

```bash
cp local.settings.json.example local.settings.json   # fill in DATABASE_URL
func host start                                       # http://localhost:7071
```

Then here, with `NEXT_PUBLIC_LEAD_CAPTURE_URL=http://localhost:7071/api/capture_cta_email`:

```bash
npm run dev
```

## Verifying the endpoint

```bash
npm run probe:cta -- --base http://localhost:7071
npm run probe:cta -- --base https://agentic-back-office-dev-....azurewebsites.net
npm run probe:cta -- --base <host> --write     # also inserts a real row
```

Without `--write` the probe only touches paths that reject before reaching the
database, so it is safe against a live backend.

## Reading the logs

Client-side, every submission logs one line, carrying no address and no
credential — browser consoles are effectively public:

```
[cta] failed source=Get started requestId=<uuid> status=429 code=RATE_LIMITED durationMs=812
```

`status=no-response` means the request never reached a server at all (DNS, TLS,
offline, blocking extension) — that is what the original outage looked like, and
it is now distinguishable from a server error rather than collapsing into the
same generic message.

The same id appears in the backend's Application Insights traces, and the site
renders it as `Ref:` on the error state, so a screenshot from a visitor is enough
to find the matching trace.
