# Assumptions Log

Running log of educated guesses made where `visual-guide.md` says "Not yet defined."
Each is reversible. Only `#C35A25` (primary/brand accent) is a confirmed brand value.

## Landing page rebuild (app/LandingPage.tsx + components/landing/*)

### Color (in app/globals.css `:root`) — REVISED again to "Site Green"
Supersedes the stone/pine direction, which still read gray/dull because the light
sections were a flat cool gray and green only appeared in near-black strips (user:
"still the same colorscheme and it looks bad"). New direction confirmed via
AskUserQuestions: WHITE base + BOLD forest-green panels (area.us uses its brand
color as large confident surface fills on white, not just dark strips). Colors
only — no layout changes. Only `#C35A25` is a confirmed brand value.
- **Background `#ffffff` (pure white).** Why: a genuinely bright base, not the gray that made prior versions feel unchanged.
- **Section/panel green `#14472f` (bold forest green).** Why: clearly reads as green (not near-black); used as large surface panels — hero photo overlay, the how-it-works diagram panel, the conversion band, the Solutions cards, the closing CTA, and the footer.
- **Foreground `#14211b` (forest ink)**, **muted `#5b6660` (sage-gray).** Why: green-tinted dark text, AA+ on white.
- **Card `#ffffff`**, **secondary/tiles `#eef2ec` (soft sage)**, **border `#e4e8e2`.** Why: quiet neutrals on white so the green panels and orange do the talking.
- **Primary `#C35A25`, white foreground.** Why: bold orange CTAs read strongly on both white and the forest-green panels. Single accent, still locked.

### Typography (app/layout.tsx) — REVISED for sharper letterforms + bigger scale
Supersedes Bricolage/Instrument Serif (user: "letterforms too rounded, need sharper
geometric; italic accent too narrow — pick a wider italic set larger; headlines
big and bold like area.us").
- **Headings + body: Space Grotesk.** Why: sharp, geometric grotesk with squared terminals — far less rounded than Bricolage. Headlines set large (hero up to `text-7xl`, sections `text-5xl`–`text-6xl`) with tight negative tracking for area-style clarity.
- **Serif accent: Fraunces (variable, italic).** Why: a wide, high-contrast expressive serif italic — replaces the narrow Instrument Serif. Set ~1.08–1.14em relative to the headline so italic emphasis ("estimator", "already lands", "real", "own numbers?") reads as a real visual beat. Two families total.

### Shape
- **`--radius: 1rem`, pills for buttons/inputs, `rounded-3xl` panels.** Why: Area reference is explicitly liked for its rounded corners; radius chosen generous to match.

### Motion
- Rotating hero word fade/slide, subtle diagram pulse. Respect `prefers-reduced-motion`. Low motion intensity per anti-visual-slop (trust-first).

### Dials used
Visual 7, Motion 3, Density 5, Directness 8.
