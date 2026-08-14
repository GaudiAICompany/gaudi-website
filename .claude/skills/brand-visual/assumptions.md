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

### Fourth pass (per user feedback — lean visual, less UI-spec)
- **Left = image-led, label second.** Replaced the label-heavy channel cards
  with a `ChannelTile` masonry grid ([grid-auto-rows:6.5rem], call tile
  row-span-2). Each tile is a large edge-to-edge photo with a bottom scrim and a
  single small glass chip naming the channel (Call / Text / Email / Upload). The
  photo carries the format; the chip carries the path. No format pills, no body
  text. Call tile keeps a small waveform+0:47 overlay to signal voice.
- **Center = Gaudí catenary arch, not a rounded square.** The brand is named
  after Antoni Gaudí, so the hub is now his signature catenary arch as an inline
  SVG (single simple geometric mark, allowed by anti-slop): filled-primary
  gateway silhouette (evenodd hollow opening) + a primary-foreground keystone at
  the crown + three stacked "course" lines inside the opening = mess passing
  through and coming out as structured masonry. Brand-tinted drop-shadow. No
  soundwave/equalizer. Caption: "Sorts the chaos into structure".
- **Right = editorial answer, not a product table.** Dropped the boxed
  divide-y table. Now: a serif-italic spoken request ("Hey Gaudi, give me a
  takeoff on the Myra Ave project."), an "asked by text · answered in seconds"
  line, small Ask-for-a Takeoff/Estimate/Sub-quote chips, then a big display
  number ($41,750, text-5xl font-light) as the visual anchor with a rotated
  "Ready to send" stamp. One real line item demonstrates specific + traceable
  ("Traced to Blueprint pg A-3") + editable ($965 dashed box + pencil). Two
  short margin annotations (Search / Sparkles) cover trace-to-source and
  edit→learns. Reads as an art-directed marketing composition, not a screenshot.

### Fifth pass (per user feedback)
- **Tighter left headline.** Section title is now "Send it *however it lands*."
  (however it lands = Newsreader italic primary) — captures the "no reformatting
  needed" idea in the spirit of the old step-1 copy, but short.
- **Bigger input photos.** ChannelTile grid rows bumped 6.5rem → 8.5rem and left
  column widened to 340px so the photos are the clear focus, not thumbnails.
- **Center = brain, not arch.** The arch didn't communicate. Replaced GaudiArch
  with `GaudiMind`: a brain drawn in Gaudi's structural line language (folds as
  masonry "courses") inside the round primary hub, plus two lit synapse nodes =
  active thinking/processing. Caption: "Gaudi thinks it through".
- **Branded GC output document.** Replaced the abstract answer card with
  `EstimateDoc` — a real GC letterhead the contractor could forward to a client:
  monogram + "Rivera Construction Co. · Lic #GC-4471 · Austin, TX", doc title,
  "Prepared for J. Okafor", $41,750, and a "Ready to send" stamp.
- **Edit/audit made visual.** Line items now render inside the doc with an inline
  source-trace chip on every row (Blueprint pg A-3 / Email · Rivera / Site photo)
  and the drywall row shown mid-edit (dashed primary box + pencil, tinted). The
  interaction lives in the card, not as caption text.
- **Component is now interactive** ("use client" + useState). Output switcher
  chips: Takeoff / Estimate / Sub-quote / **Ask a question**. The Q&A option
  (`QuestionAnswer`) shows Gaudi answering a direct spec question ("20A
  tamper-resistant GFCI outlets…") with a source citation — Gaudi as something
  you can just ask, not only a document generator. Each tab swaps the serif
  request line too.
- **Reduced right-side copy** to two labeled idea cards: "Gaudi runs it" and
  "Review, not redo" (minimal supporting lines).

### Sixth pass (per user feedback)
- **Title** → "Any format, any channel. *Just ask for what you need.*" (second
  sentence = Newsreader italic primary). Container widened max-w-6xl → 7xl.
- **Left zone label** → "Send Gaudi your project information." Input tiles
  slightly shorter (8.5rem → 7.5rem) and column 340 → 280px to make room for the
  new transition graphic.
- **Chaos→order transition graphic.** New `ScribbleFlow` inline SVG replaces the
  plain arrow between inputs and Gaudi: a dense tangled muted-foreground scrawl
  (4 overlapping paths) that untangles into a single clean primary circle + a
  short arrow feeding the Gaudi mark. Pure line-art metaphor (no photos), per the
  user's chaos-to-a-single-circle reference images. Horizontal on desktop,
  centered horizontal (w-56) on mobile.
- **Branded GC estimate + sample prompts.** Reverted to a static (server)
  component — dropped "use client"/useState and the tab switcher. `EstimateDoc`
  now uses Rivera's OWN brand: a navy (#1e3a5f) letterhead bar with white text +
  monogram, navy title/total, "Ready to send" stamp — clearly the contractor's
  document, not Gaudi's. This is the ONE intentional extra color (contained to
  the mock doc; text-white only on that navy). Beside it, `SAMPLE_PROMPTS` shows
  four example asks tagged Spec lookup / Scheduling / Quantities / Financials
  (xl:column beside the doc, 2-col grid below it on smaller screens) — several
  examples, not one.
- **New bottom row** (separate from the main flow, `mt-6 grid lg:grid-cols-2`):
  (a) `AuditCard` "Trace any number. Change anything." — a blueprint thumbnail
  with a highlighted region + "page A-3" caption, a Search connector, and the
  editable $965 value (dashed box + pencil, "Edit → Gaudi relearns"). (b)
  `SubsCard` "Package it. Send it out for quotes." — a Folder package listing
  Plans/Scope/Specs PDFs, a Send icon, and a recipient list (Lone Star Electric
  = Quoted $18,400 via Check; Delta Mechanical / Austin Voltage = Invited).
- Old `output-estimate.png` stays deleted; no new image assets needed (reused
  input-blueprint.png in the audit card).
