# Anti-visual-slop

## Purpose

This skill prevents website work from looking or sounding like generic AI output.

It does **not** define the brand. It does **not** choose brand colors, fonts, logo style, positioning, or tone of voice.

If there is a brand guide, voice guide, design system, product brief, customer research, or approved-claims document, read that first. Those documents win. This skill only checks for quality, specificity, clarity, usability, and truthfulness.

## 1. Read the room first

Before writing copy or designing UI, identify:

1. **Page type**
    - Homepage
    - Landing page
    - Product page
    - Pricing page
    - About page
    - Case study
    - Waitlist page
    - Demo page
    - Feature page
    - Blog or editorial page
2. **Audience**
    - Who is reading this?
    - What do they already know?
    - What are they skeptical of?
    - What would make them trust this?
    - What would make them leave?
3. **Page job**
    - Explain the product
    - Build trust
    - Generate leads
    - Drive signups
    - Sell a specific offer
    - Educate the buyer
    - Answer objections
    - Show proof
    - Collect waitlist interest
4. **Source of truth**
    - Brand guide
    - Voice guide
    - Product brief
    - Customer notes
    - Approved claims
    - Approved numbers
    - Design system
    - Existing site
    - Reference sites

Before producing the page, write one sentence:

> Reading this as: [page type] for [audience], where the page needs to [main job], so the design and copy should feel [qualities from the brief] and avoid [specific risks].
> 

If the brief is too ambiguous to make a good decision, ask **one** clarifying question. Do not ask a long list.

## 2. Brand and voice rules

### 2.1 Do not override brand voice

If a brand voice guide exists, it wins.

This skill should never add personality that is not in the brand guide. Do not add slang, humor, luxury language, technical language, warmth, edge, or formality unless the brand guide supports it.

This skill only enforces:

- Specificity
- Clarity
- Truthfulness
- Visual quality
- Usability
- Accessibility
- Non-generic structure
- Non-generic copy

### 2.2 Emoji policy

Discouraged by default in code, markup, and visible text. Replace symbols with icon-library glyphs.

**Override:** allow emojis only when the user explicitly asks for a playful / chat-style / social-native vibe, and even then use them sparingly with intent.

## 3. Set the website dials

Before designing, choose these values based on the brief:

- `VISUAL_DISTINCTIVENESS: 1-10`
- `MOTION_INTENSITY: 1-10`
- `CONTENT_DENSITY: 1-10`
- `COPY_DIRECTNESS: 1-10`

Use them like this:

**VISUAL_DISTINCTIVENESS**

- 1-3: familiar, conservative, trust-first
- 4-6: polished, clean, moderately distinct
- 7-8: memorable, art-directed, asymmetric
- 9-10: experimental, campaign-like, risky

**MOTION_INTENSITY**

- 1-3: mostly static, hover and focus only
- 4-6: tasteful transitions and reveals
- 7-8: scroll choreography or kinetic moments
- 9-10: cinematic, only when clearly justified

**CONTENT_DENSITY**

- 1-3: sparse, one idea per section
- 4-6: standard marketing-page density
- 7-8: proof-heavy, comparison-heavy, detail-heavy
- 9-10: dashboard, documentation, or technical reference density

**COPY_DIRECTNESS**

- 1-3: softer, more atmospheric
- 4-6: clear and polished
- 7-8: plainspoken, specific, punchy
- 9-10: extremely direct, only if brand voice allows

State the dials briefly before work.

Example:

> Dials: Visual 6, Motion 3, Density 5, Directness 8. The page needs to build trust quickly, not show off.
> 

## 4. Structure and content quality

### 4.1 Avoid default AI website patterns

Do not default to:

- Purple or blue AI gradient
- Glowing blobs
- Glassmorphism cards everywhere
- Fake product dashboard made from rectangles
- Fake charts with fake numbers
- Generic bento grid with text-only tiles
- Isometric SaaS illustrations
- Stock photos that say nothing
- Logo wall inside the hero
- “Trusted by” logos without real proof
- Alternating image-left and text-right sections over and over
- Every section using eyebrow, headline, paragraph, cards
- Decorative grid lines that do not organize content
- Scroll cue at the bottom of the hero
- Version labels, fake status labels, or fake terminal-style details

Use familiar patterns only when they are the right answer, not because they are the default.

### 4.2 Every section needs a job

Each section must do one clear thing:

- Explain
- Prove
- Compare
- Demonstrate
- Reduce risk
- Answer an objection
- Show a workflow
- Show a result
- Move the visitor to action

If a section exists only because websites usually have it, remove it.

### 4.3 Hero rules

The hero must answer the main question quickly.

A good hero makes clear:

- What this is
- Who it is for
- Why it matters
- What to do next

Rules:

- Headline should usually be 1-2 lines on desktop
- Subtext should usually be 25 words or less
- Primary CTA should be visible without scrolling
- Do not put a full feature list in the hero
- Do not put a logo wall in the hero
- Do not put pricing details in the hero unless the page is pricing-led
- Do not use a vague hero just because it looks premium

A beautiful but unclear hero fails.

### 4.4 Layout rules

Avoid repetitive section structure.

Do not use the same pattern for every section:

- Feature grid
- Feature grid
- Testimonial grid
- Card grid
- CTA card

Instead, vary structure based on the job of each section:

- Hero
- Short proof strip
- Workflow section
- Deep feature section
- Comparison section
- Objection handling
- FAQ
- Final CTA

Layout variety should feel intentional, not random.

## 5. Visual system rules

### 5.1 Typography rules

Typography should create hierarchy.

Avoid:

- Too many type sizes
- Too many font weights
- Too many font families
- Giant text that breaks the layout
- Tiny gray text that is hard to read
- All-caps labels on every section
- Random italic words for fake sophistication
- Gradient text unless the brand strongly supports it
- Overusing bold inside body copy

Use the brand type system if it exists.

### 5.2 Color rules

Use the brand palette if one exists.

Do not invent a new palette unless asked. Do not drift into unrelated colors section by section. Do not use low-contrast text. Do not use color alone to communicate meaning. Do not use gradients to hide weak content. Do not make CTAs hard to read.

If no palette exists, create a small, consistent system:

- Background
- Main text
- Muted text
- Border
- Primary accent
- Button states
- Error and success states

### 5.3 Color calibration

- Max 1 accent color. Saturation < 80% by default.
- **THE LILA RULE:** The "AI Purple / Blue glow" aesthetic is discouraged as a default. No automatic purple button glows, no random neon gradients. Use neutral bases (Zinc / Slate / Stone) with high-contrast singular accents (Emerald, Electric Blue, Deep Rose, Burnt Orange, etc.).
- **Override:** if the brand or brief explicitly asks for purple / violet / lila, embrace it. But execute with intent: consistent palette, harmonised neutrals, restrained gradients. Not generic AI gradient slop.
- **One palette per project.** Do not fluctuate between warm and cool grays within the same project.
- **COLOR CONSISTENCY LOCK (mandatory):** Once an accent color is chosen for a page, it is used on the WHOLE page. A warm-grey site does not suddenly get a blue CTA in section 7. A rose-accented site does not get a teal status badge in the footer. Pick one accent, lock it, audit every component before shipping.
- When a shadow is used, tint it to the background hue. No pure-black drop shadows on light backgrounds.

### 5.4 Shape and component rules

Pick one visual logic and follow it.

Be consistent with:

- Border radius
- Borders
- Shadows
- Card style
- Icon style
- Button style
- Form style
- Illustration style

Avoid:

- Everything in cards
- Random pill shapes
- Mixed icon styles
- Heavy shadows for no reason
- Hairline borders around every object
- Components that look like they came from different websites

## 6. Visual asset rules

### 6.1 Image and visual rules

Do not use visuals as filler.

Good visuals:

- Show the real product
- Show the real workflow
- Show the real output
- Show the audience's world
- Explain something faster than text
- Create a memorable brand moment

Bad visuals:

- Fake dashboards
- Fake charts
- Generic stock photos
- Abstract gradients with no meaning
- Decorative screenshots
- Random icons on every card
- AI images that look impressive but say nothing

If a real visual does not exist, use a clearly labeled placeholder and say what asset is needed. Do not pretend filler is final.

### 6.2 Image and visual asset strategy

Landing pages and portfolios are **visual products**. Text-only pages with fake-screenshot divs are slop.

**Priority order for visual assets:**

1. **Image-generation tool first.** If ANY image-gen tool is available in the environment (`generate_image`, MCP image tool, IDE-integrated gen, OpenAI image tools, etc.) you MUST use it to create section-specific assets: hero photography, product shots, texture backgrounds, mood images. Generate at the right aspect ratio for the section. Do not skip this step because hand-rolled CSS feels faster.
2. **Real web images second.** When no gen tool is available, use real photography sources. Acceptable defaults:
    - `https://picsum.photos/seed/{descriptive-seed}/{w}/{h}` for placeholder photography (seed should describe the section, e.g. `marrow-cookware-kitchen`)
    - Actual stock or brand URLs when the brief provides them
    - Open-license sources (Unsplash via direct URL, Pexels) if explicitly allowed
3. **Last resort: tell the user.** If neither is possible, do NOT fill the page with hand-rolled SVG illustrations or div-based "fake screenshots." Instead, leave clearly-labeled placeholder slots (`<!-- TODO: hero product photo, 1600x1200 -->`) and at the end of the response say: *"This page needs real images at: [list of placements]. Please generate or provide them."*

**Even minimalist sites need real images.** A pure-text page is not minimalism. It is incomplete work. Even an editorial Linear-style site needs at least 2-3 real images (hero, one product/lifestyle shot, one supporting image). Generate B&W minimalist photography if the brief is restrained; do not skip images entirely because the dial is low.

### 6.3 Logo walls and social proof

**Real company logos for social proof.**

When the brief calls for a "Trusted by / Used by / Customers" logo wall, do NOT default to plain text wordmarks (`<span>Acme Co</span>` styled in a row). Use real SVG logos:

- **Source: Simple Icons** (`https://cdn.simpleicons.org/{slug}/ffffff` for any color, or `simple-icons` npm package). Covers most known brands.
- **Alternative: devicon** for tech-stack logos (`@svgr/cli` or CDN).
- **Make-up the brand name? Then make-up an SVG mark too.** Generate a simple monogram (one letter in a circle, two-letter ligature, abstract glyph) rendered as an inline `<svg>` matching the page style. Plain text wordmarks for invented brand names look generic.
- **Always** ensure logos render in both light and dark mode (white-on-dark, black-on-light, or single-color theme variable).
- **LOGO-ONLY rule (mandatory):** logo wall = logos and nothing else. Do NOT print industry / category labels below each logo (no `Vercel` + `hosting` underneath, no `Stripe` + `payments`, no `Cloudflare` + `infra`). The logo is the credibility, the label adds nothing the user does not already know. Optional: brand name as alt-text for screen readers, optional link to the brand's site. That is it.

### 6.4 Hand-rolled illustrations and fake screenshots

**Hand-rolled illustrations:**

- SVG icons from libraries: fine
- Hand-rolled decorative SVGs (custom illustrations, logos, marks): **strongly discouraged**, never as default. Acceptable only when:
    - The brief explicitly calls for it ("draw me an SVG logo")
    - It's a single, simple geometric mark (a square, a circle, a wordmark in display type)
    - You're confident in the output quality

**Div-based fake screenshots are banned.**

A "hand-built product preview" rendered with `<div>` rectangles, fake task lists, fake dashboards, fake terminal windows is a Tell. If you need to show a product:

- Use a real screenshot URL if one exists
- Generate one via image tool
- Use a real component preview (an actual mini-version of the UI inside the page)
- Or skip the preview entirely and use editorial photography

## 7. Interaction, motion, and states

### 7.1 Motion rules

Motion must have a reason.

Use motion for:

- Feedback
- State change
- Revealing hierarchy
- Showing progress
- Explaining a sequence
- Making interaction feel responsive

Do not use motion for:

- Looking expensive
- Distracting from weak copy
- Filling empty space
- Showing off

Rules:

- Respect reduced motion
- Do not use infinite animation everywhere
- Do not use scroll hijacking unless truly needed
- Do not use multiple marquees
- Do not animate layout in a way that causes jank
- Do not rely on hover for mobile understanding

### 7.2 Interactive UI states

LLMs default to "static successful state only." Always implement full cycles:

- **Loading:** Skeletal loaders matching the final layout's shape. Avoid generic circular spinners.
- **Empty States:** Beautifully composed; indicate how to populate.
- **Error States:** Clear, inline (forms), or contextual (toasts only for transient).
- **Tactile Feedback:** On `:active`, use `-translate-y-[1px]` or `scale-[0.98]` to simulate a physical push.

### 7.3 Button and CTA rules

- **BUTTON CONTRAST CHECK (mandatory, a11y):** Before shipping any button, verify the button text is readable against the button background. White button + white text, `bg-white` CTA with `text-white` label, transparent button against the page background with no border → all banned. Audit every CTA: contrast ratio WCAG AA min (4.5:1 for body, 3:1 for large text 18px+). Same rule applies to ghost buttons over photographic backgrounds (use a backdrop, scrim, or stroke).
- **CTA BUTTON WRAP BAN (mandatory):** Button text MUST fit on one line at desktop. If a label like "VIEW SELECTED WORK" wraps to 2 or 3 lines, the button is broken. Fix by EITHER shortening the label (3 words max for primary CTAs, ideally 1-2) OR widening the button (do not artificially constrain `max-width` on CTAs). Wrapped CTAs at desktop are a Pre-Flight Fail.
- **NO DUPLICATE CTA INTENT (mandatory):** Two CTAs with the same intent on one page is a Pre-Flight Fail. Examples of same intent: "Get in touch" + "Contact us" + "Let's talk" + "Start a project" + "Start something" + "Reach out" = all "contact" intent → pick ONE label and use it everywhere on the page (nav, hero, footer). Same for "Try free" + "Get started" + "Sign up free" (all "signup" intent) and "View work" + "See selected work" + "Browse projects" (all "portfolio" intent). One label per intent.

## 8. Forms

### 8.1 Data and form patterns

- Label ABOVE input. Helper text optional but present in markup. Error text BELOW input. Standard `gap-2` for input blocks.
- No placeholder-as-label. Ever.

### 8.2 Form contrast check

- **FORM CONTRAST CHECK (mandatory, a11y):** Form inputs, placeholder text, focus rings, helper text, and error text all pass WCAG AA contrast against the section background. Light placeholders on a near-white form, white form on white page section, form labels grayer than 4.5:1 contrast → all banned. Audit every form before shipping.

## 9. Mobile rules

The mobile version is not an afterthought.

Check:

- Hero fits
- Nav works
- CTAs are visible
- Text is readable
- Cards do not become endless clutter
- Images crop intentionally
- Forms are usable
- Tap targets are large enough
- No horizontal overflow
- No hover-only content
