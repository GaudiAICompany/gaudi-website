# Assumptions Log

Running log of educated guesses made where `visual-guide.md` says "Not yet defined."
Each is reversible. Only `#C35A25` (primary/brand accent) is a confirmed brand value.

## Landing page rebuild (app/LandingPage.tsx + components/landing/*)

### Color (in app/globals.css `:root`) — FINAL: "White + Charcoal + Orange"
Supersedes the "Site Green" direction — user rejected green outright ("i dnt like
this at all. remove the green background"). No green anywhere now. Clean neutral
scheme: white base, warm charcoal dark moments, Gaudi orange as the single accent.
Only `#C35A25` is a confirmed brand value.
- **Background `#ffffff` (pure white).** Bright, restrained base.
- **Section dark `#1c1c1a` (warm charcoal).** Why: the only dark tone; used for the hero photo overlay, the conversion band, the closing CTA, and the footer as intentional dark moments. No green tint.
- **Foreground `#1a1a1a` (charcoal)**, **muted `#666663` (neutral gray).** AA+ on white.
- **Card `#ffffff`**, **secondary/tiles `#f4f4f3` (soft neutral)**, **border `#e6e6e3`.** Quiet neutrals so orange does the talking. The how-it-works diagram sits on a `secondary/60` panel; Solutions cards are white with orange icons.
- **Primary `#C35A25`, white foreground.** Single accent, still locked — all buttons, icons, and italic emphasis.
- Footer wordmark fill neutralized to `#2c2c2a` (was a green tint).

### Typography (app/layout.tsx) — FINAL: "Swiss neutral" (Geist + Newsreader)
Supersedes Space Grotesk/Fraunces (user: "update the fonts again i dont love this
style"). Direction confirmed via AskUserQuestions: Swiss-neutral sans, keep an
italic accent.
- **Headings + body: Geist.** Why: clean, modern, neutral Swiss sans (Linear/Vercel feel). Headlines stay large (hero up to `text-7xl`, sections `text-5xl`–`text-6xl`) but tracking relaxed to `-0.02em` and weight to `semibold` since Geist is already tight/geometric.
- **Serif accent: Newsreader (italic).** Why: a readable, understated serif italic that pairs with Geist without feeling ornate — replaces the quirky Fraunces. Used for emphasis words ("sub coordinator", "already lands", "real", "own numbers?"). Two families total.

### Shape
- **`--radius: 1rem`, pills for buttons/inputs, `rounded-3xl` panels.** Why: Area reference is explicitly liked for its rounded corners; radius chosen generous to match.

### Motion
- Rotating hero word fade/slide, subtle diagram pulse. Respect `prefers-reduced-motion`. Low motion intensity per anti-visual-slop (trust-first).

### Dials used
Visual 7, Motion 3, Density 5, Directness 8.
