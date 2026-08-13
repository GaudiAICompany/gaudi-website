---
name: brand-visual
description: Use when creating or reviewing visual/UI/design work (website, product UI, marketing assets, decks) to apply the brand visual identity — colors, typography, shape, and visual references.
---

# Brand Visual Identity

## What this skill is for
Use this whenever designing, building, or reviewing anything visual for the company: website pages, UI components, marketing assets, decks, or mockups. It defines the brand's visual identity and how to check new work against it.

## Files in this skill
- `visual-guide.md` — design tokens: brand color, type, spacing, radius. Some values are still marked "Not yet defined."
- `references.md` + `references-screenshots/` — screenshots and notes on websites/visual styles the team likes, with why.
- `anti-visual-slop.md` — quality and anti-pattern rules that apply regardless of brand specifics (avoid generic AI look, contrast checks, motion rules, layout variety, etc.). Always applies.
- `assumptions.md` — running log of educated guesses made for values not yet defined in `visual-guide.md`. Create this file if it doesn't exist yet. Review periodically to resolve into confirmed values.

## How to use these together
1. Read `visual-guide.md` first for confirmed brand values.
2. Read `references.md` for visual direction (shape, layout, feel) — especially wherever `visual-guide.md` is blank.
3. Apply every rule in `anti-visual-slop.md` regardless of how much of the brand is defined.

## Handling undefined values
Wherever `visual-guide.md` says "Not yet defined," make an educated guess rather than blocking — keep every guess visible and reversible.

Guess in this priority order:
1. `references.md` / `references-screenshots/` — mood and direction from liked reference sites.
2. Brand Voice qualities (direct, confident, craftsmanlike, warm, plainspoken) — for tone-appropriate choices.
3. `anti-visual-slop.md`'s neutral-plus-single-accent defaults (`#C35A25` as the one accent) as the fallback of last resort.

Every guess must be:
- Flagged clearly as an assumption, not a locked brand decision (e.g. a code comment like `/* assumption: heading font, not yet approved */`).
- Logged in `assumptions.md` with a one-line entry: what was guessed, why, and where it's used.

Don't wait for sign-off before proceeding. Keep building, keep the guess visible and easy to review.

## Precedence
If these ever conflict: confirmed values in `visual-guide.md` > `references.md` mood direction > `anti-visual-slop.md` generic defaults. Anti-visual-slop never overrides an explicit brand decision — it only fills gaps that haven't been decided yet.