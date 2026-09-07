# gaudi-website

The website for Gaudi AI. Next.js 15, static export, deployed to Azure Static Web Apps.

## 📦 Project Structure

`/app` holds the routes: `/app` maps to `/`, and every folder under it maps to the URL
path of the same name. `/components` holds the UI, `/lib` the calls to the backend,
`/scripts` the probes.

## 🚀 Running locally

Node 20+ (CI builds on 22).

```bash
npm install
npm run dev            # http://localhost:3000
```

That covers everything except the forms, which POST to
[gaudi-agents-functions](https://github.com/GaudiAICompany/gaudi-agents-functions),
not to anything in this repo. Put the endpoints from the table below in `.env.local` to
point the site at a backend — a deployed one, or `http://localhost:7071` after
`func host start` in a clone of that repo.

To exercise the capture endpoint without going through the UI:

```bash
npm run probe:cta -- --base https://<backend-host>
npm run probe:cta -- --base <host> --write     # also inserts a real row
```

Without `--write` the probe only touches paths that reject before reaching the database,
so it is safe against a live backend.

## ⚙️ Environment

The site is a **static export** (`output: 'export'`), so `next build` inlines every
variable into the JavaScript bundle and there is no runtime configuration at all. Three
consequences worth knowing before you touch config:

- Set them **wherever the build runs** — GitHub Actions, or `.env.local`. Setting them in
  Azure does nothing; no process survives the build to read them.
- Only `NEXT_PUBLIC_*` reaches client code. Drop the prefix and the value reads as
  `undefined` in the browser while the build still succeeds, so the site breaks at runtime
  with no error to point at.
- The prefix controls whether client code *may* read a value, not whether it stays secret.
  Anything inlined is readable in the page source. **Never put a credential in this repo.**

| Variable | Required | Read by | Purpose |
| --- | --- | --- | --- |
| `NEXT_PUBLIC_LEAD_CAPTURE_URL` | **yes** | `lib/capture-lead.ts` | `capture_cta_lead`, behind the landing CTAs. Unset ⇒ every CTA fails fast with `code=endpoint_unconfigured`. |
| `NEXT_PUBLIC_ONBOARDING_URL` | **yes** for `/get-started` | `lib/submit-onboarding.ts` | `onboard_client`, the last step of signup. Unset ⇒ nobody can sign up. |
| `NEXT_PUBLIC_CHECK_CONTACT_URL` | no | `lib/check-contact.ts` | `check_contact`. Fills in the company already on file and turns an existing client away while they are still on the first field. Fails open ⇒ unset, the form simply asks. |
| `NEXT_PUBLIC_STAGE_BLUEPRINT_URL` | no, but wanted | `lib/stage-blueprint.ts` | `stage_blueprint`. Uploads the plan set and starts its estimate mid-form, so the final submit feels instant. Unset ⇒ signup still works, the files just go with the submit. |
| `NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY` | no locally, **yes** deployed | `lib/turnstile.ts` | Turnstile **site** key (public; the secret half is verified on the backend). Gates the two anonymous endpoints. Unset ⇒ a dev backend waves the request through and a deployed one refuses it with `CHALLENGE_FAILED`, which stops signup, not just staging. |
| `NEXT_PUBLIC_SITE_URL` | no | `app/waitlist/*/page.tsx` | Canonical origin for the waitlist share links and OG tags. Set nowhere today; falls back to `https://heygaudi.ai`, through a `VERCEL_URL` branch that Azure never sets. |

Each `lib/` module's header explains why its endpoint behaves the way it does.

In production all of these are GitHub Actions **variables** (Settings → Secrets and
variables → Actions → Variables), read by the build step in
`.github/workflows/azure-static-web-apps-icy-smoke-0822f711e.yml`. Variables rather than
secrets because a public endpoint URL is not one, and keeping them visible makes it
obvious which backend the site is pointed at. Switching between the dev and prod backends
is those values plus a rebuild — no code changes.

## 🔌 What the backend expects

Four endpoints on the `agentic-back-office-dev` function app, none of them keyed: the
backend owns the database credentials and decides what actually gets written, and this
repo holds URLs and nothing else.

`onboard_client` is a single `multipart/form-data` POST carrying `name`, `email`, `phone`,
`company`, `notes`, and either the PDF plan sets or the draft id `stage_blueprint` already
stored them under. It records the lead row, creates the Supabase user and company, and
starts the estimate. It answers `200` with `blueprint: "sent" | "failed" | "none"`, so a
plan set that did not reach the pipeline costs the visitor a forward rather than the
signup.

An email or phone that already has an account is refused with `409` and a `field` naming
which one (`PHONE_INVALID` is the same shape with `400`). `FIELD_REJECTIONS` in
`components/onboarding/onboarding-flow.tsx` turns those into a message on that input, so
the visitor corrects the field instead of reading a generic failure.

A browser can only reach any of them from an allowed origin, and that takes **two**
independent settings on the function app:

- `LEAD_CAPTURE_ALLOWED_ORIGINS`, the allowlist the function itself enforces — a
  disallowed `Origin` gets a 403.
- Azure's platform CORS list, which is what answers the preflight. The function emits no
  CORS headers of its own, so an origin missing here is blocked by the browser before the
  function ever runs.

A new origin — another domain, a Static Web Apps preview URL — has to be added to both, or
the forms fail in a way that looks like the site is down.

## 🔎 Reading the logs

Every submission logs one line client-side, carrying no address and no credential —
browser consoles are effectively public:

```
[cta] failed source=Get started requestId=<uuid> status=404 code=http_404 durationMs=812 hint=endpoint-not-deployed
[onboarding] submitted files=2 requestId=<uuid> status=200 code=none blueprint=sent durationMs=1840
```

`status=no-response` means the request never reached a server at all (DNS, TLS, offline,
blocking extension), as distinct from a server error.

The same id appears in the backend's Application Insights traces, and the site shows it
beneath the error message, so a screenshot from a visitor is enough to find the matching
trace.
