# Assumptions Log

Running log of educated guesses made where `visual-guide.md` says "Not yet defined."
Each is reversible. Only `#C35A25` (primary/brand accent) is a confirmed brand value.

## Landing page rebuild (app/LandingPage.tsx + components/landing/*)

### Color (in app/globals.css `:root`)
- **Background `#f6f1e9` (warm paper).** Why: references.md favorites (Area, Staxen) use warm, light, welcoming backgrounds with rounded corners. Chosen slightly warmer/lighter than the generic "cream" cliché. Used as the page base.
- **Foreground `#201d18` (warm near-black).** Why: high-contrast, warm-toned text to pair with paper background (AA+). Used for headings/body.
- **Muted text `#6f665a`.** Why: warm gray that keeps WCAG AA on the paper background. Used for subheads/secondary copy.
- **Secondary surface `#ece4d6` (warm sand)** and **border `#e2d8c6`.** Why: keep one warm neutral family (anti-visual-slop: one palette per project). Used for cards/chips/icon tiles/borders.
- **Card `#fffdf8` (warm off-white).** Why: subtle lift above the paper base.
- **Section dark `#191510` (warm charcoal).** Why: Mikatalo reference pairs orange with black/white; used for the mid-page conversion band and footer as distinct visual moments. Text on it is the paper color.
- **Single accent = brand `#C35A25`.** Locked per anti-visual-slop 5.3 (max 1 accent, saturation restraint). No green/teal secondary introduced despite Area's green logo, to keep the accent lock.

### Typography (app/layout.tsx)
- **Headings + body: Bricolage Grotesque.** Why: characterful, contemporary grotesque that reads as craftsmanlike/direct (brand voice) and avoids the generic serif-display cliché. Not an approved brand face.
- **Serif accent: Instrument Serif (italic only).** Why: used solely for the rotating hero word and single-word emphasis, echoing the Staxen serif-italic signature and the brand-voice note about italic emphasis. Two families total.

### Shape
- **`--radius: 1rem`, pills for buttons/inputs, `rounded-3xl` panels.** Why: Area reference is explicitly liked for its rounded corners; radius chosen generous to match.

### Motion
- Rotating hero word fade/slide, subtle diagram pulse. Respect `prefers-reduced-motion`. Low motion intensity per anti-visual-slop (trust-first).

### Dials used
Visual 7, Motion 3, Density 5, Directness 8.
