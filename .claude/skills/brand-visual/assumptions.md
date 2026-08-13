# Assumptions Log

Running log of educated guesses made where `visual-guide.md` says "Not yet defined."
Each is reversible. Only `#C35A25` (primary/brand accent) is a confirmed brand value.

## Landing page rebuild (app/LandingPage.tsx + components/landing/*)

### Color (in app/globals.css `:root`) — REVISED again to "Blueprint & Site"
Supersedes the neutral off-white direction, which read too close to the original
beige (user: "start over on the color scheme... a confident, non-neutral palette
like area.us, real contrast and intention, not a default light theme"). Only
`#C35A25` remains a confirmed brand value; the pine/stone system is an assumption.
- **Section dark `#0e1a15` (deep pine ink).** Why: area.us anchors on a deep, saturated green rather than plain black — a confident non-neutral base. Powers the hero, conversion band, closing CTA, and footer.
- **Background `#e7e8e2` (cool concrete stone).** Why: an unmistakably COOL gray (the opposite of beige) that evokes concrete/site material; provides real contrast against the pine dark sections and crisp white cards.
- **Foreground `#12201a` (pine ink text).** Why: tints text toward the brand green instead of flat black; AA+ on stone and white.
- **Muted text `#53605a` (sage-gray).** Why: WCAG AA on both stone and white; carries the green undertone.
- **Card `#ffffff`**, **secondary/tiles `#d7d9d1`**, **border `#cfd2ca`.** Why: crisp white cards pop hard on cool stone (area.us panel pattern); one cool-neutral family.
- **Primary `#C35A25` with `--primary-foreground: #0a0f0c` (dark ink on orange).** Why: area.us uses dark-on-color CTAs for bold, high-contrast buttons; also improves contrast vs. white-on-orange. Single accent, still locked.

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
