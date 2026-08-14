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

## How-it-works redesign (components/landing/how-it-works.tsx)
Reworked the section from a text-heavy diagram (headline + 3 feature cards +
3 numbered text steps) into a visual-led input → processing → output infographic,
per user request ("let the visual do the explaining").
- **Imagery over icon+label.** Inputs are now real generated photos (messy
  handwritten note, blueprint, job-site, phone with texts/missed call) arranged
  as an overlapping tilted collage to *show* the variety/mess of raw inputs.
  Output is a generated photo of a clean, finished cost estimate — showing the
  result rather than labeling it "Estimator". Assets in
  public/images/how-it-works/. Why: anti-visual-slop bans div fake-screenshots
  and icon-on-every-card filler; use real product/workflow visuals.
- **Copy cut to minimum.** One short headline ("Everything in. One estimate
  out." with "One estimate" as the Newsreader italic orange accent) plus three
  tiny zone labels (However it lands / Gaudi runs it / Priced & ready) and
  "Sorts the chaos". No paragraphs, no numbered steps.
- **Layout.** Kept the sand `secondary/50` rounded-3xl panel. Desktop =
  horizontal flow with orange arrows between zones; mobile = stacked with down
  arrows. Uses only confirmed/logged tokens (orange accent, sand panel, warm
  border, Geist + Newsreader). No new colors introduced.

### Second pass (per user feedback)
- **More/varied inputs.** Expanded to 6 fragments — added a call-while-driving
  photo, a printed PDF contract, and a client/sub email thread — so the left
  side reads as genuinely fragmented, not four similar photos. Desktop is an
  overlapping tilted collage; mobile is a 2/3-col grid.
- **Modern color grading.** Regenerated all input photos with modern, true-to-
  color, neutral-white-balance grading (explicitly NOT sepia/vintage).
- **Modernized hub.** Replaced the circular badge with a rounded-squircle
  (rounded-[26px]) primary tile + an animated equalizer indicator (reusing
  animate-flow-pulse). Sublabel: "Structured project context".
- **Conversational output.** Reframed the right side from a static document into
  an "Ask Gaudi" chat card: channel chips (Text / Call / Email), a user request
  bubble ("...material takeoff on the Myra Ave project"), a Gaudi reply embedding
  the actual estimate output image, and a follow-up request bubble ("...estimate
  on the Market Street apartment complex"). Headline updated to "Everything in.
  *Just ask* for what you need."

### Third pass (per user feedback)
- **Left side = channels, not a photo pile.** Restructured into four labeled
  channel cards — Call & voicemail, Text message, Email, Dashboard upload — so
  both dimensions are legible: the channel/path (card header + icon) and the
  format/type (format pills: Voice / Photo / Handwritten note / PDF / Blueprint /
  Thread / Plans / Photos / Files). Voice channel renders a div waveform; upload
  renders a dashed drop zone. Headline changed to "Any format, any channel.
  *Just ask* for what you need."
- **Removed white photo frames.** Dropped the `bg-card p-1` white matte around
  each image (that framing read as dated). Thumbnails are now bare
  `rounded-lg ring-1 ring-border` images, 56px squares.
- **Output is a rendered digital result, not a photo.** Deleted
  output-estimate.png. Right side is now real HTML: a "Hey Gaudi" prompt bar
  (+ "via text" chip), output-type tabs (Takeoff active / Estimate / Sub quote)
  to signal Gaudi builds whatever you ask, and a takeoff card with line items,
  quantities, per-line source-trace chips, an estimated total. This is a
  legitimate requested product preview (not banned decorative fake-chrome).
- **Traceability + edit + learning.** Every line item shows a "Traced to
  {Blueprint · A-3 / Email · Rivera / Site photo}" chip. The selected row's
  value is rendered as an editable box (dashed border + pencil). A footer note
  (Sparkles) states you can trace any number to its source and that Gaudi learns
  from edits going forward.
