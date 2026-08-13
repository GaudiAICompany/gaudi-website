# Assumptions Log

Running log of educated guesses made where `visual-guide.md` says "Not yet defined."
Each is reversible. Only `#C35A25` (primary/brand accent) is a confirmed brand value.

## Landing page rebuild (app/LandingPage.tsx + components/landing/*)

### Color (in app/globals.css `:root`) — REVISED to Area-inspired modern palette
Supersedes the earlier warm-cream direction (user request: "replace the beige/cream
background with a more modern palette inspired by area.us; dark high-contrast hero
with clean section breaks"). Only `#C35A25` remains a confirmed brand value.
- **Background `#f4f4f1` (clean cool-neutral off-white).** Why: area.us uses near-white section breaks rather than a flat warm neutral. Used as the light section base.
- **Foreground `#131211` (near-black).** Why: high-contrast text on the light base (AA+).
- **Muted text `#63625c` (neutral gray).** Why: WCAG AA on the light base; dropped the warm tint.
- **Secondary surface `#ebebe6`** and **border `#e1e1db`.** Why: neutral, one-family surfaces for cards/chips/tiles.
- **Card `#ffffff` (crisp white).** Why: clean lift above the neutral base, matching Area's white floating cards.
- **Section dark `#0e0d0b` (near-black).** Why: powers the high-contrast photographic hero, the mid-page conversion band, the closing CTA, and the footer. Hero uses the contractor photo behind a left→right dark gradient with a glass stat card (Area pattern).
- **Single accent = brand `#C35A25`.** Still locked (max 1 accent).

### Typography (app/layout.tsx)
- **Headings + body: Bricolage Grotesque.** Why: characterful, contemporary grotesque that reads as craftsmanlike/direct (brand voice) and avoids the generic serif-display cliché. Not an approved brand face.
- **Serif accent: Instrument Serif (italic only).** Why: used solely for the rotating hero word and single-word emphasis, echoing the Staxen serif-italic signature and the brand-voice note about italic emphasis. Two families total.

### Shape
- **`--radius: 1rem`, pills for buttons/inputs, `rounded-3xl` panels.** Why: Area reference is explicitly liked for its rounded corners; radius chosen generous to match.

### Motion
- Rotating hero word fade/slide, subtle diagram pulse. Respect `prefers-reduced-motion`. Low motion intensity per anti-visual-slop (trust-first).

### Dials used
Visual 7, Motion 3, Density 5, Directness 8.
