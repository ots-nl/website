# STEP 07a — Hero Layout Structure

**Project:** Ontwikkeling Tech Services — Marketing Website
**Type:** Claude Code prompt
**Estimated time:** 45–60 minutes
**Owner:** Virat
**Version:** 1.0
**Phase:** 3 — Navigation and Homepage

---

## Goal

Build the structural skeleton of the Hero section: the full-viewport-height cream section, the 55/45 asymmetric two-column grid, and placeholder blocks in the correct position and rough proportion for every piece of content that's coming. No real headline, no real photograph, no animation yet — just the frame everything else gets poured into.

This is also the step where the Step 5 demo showcase sections leave `page.tsx` for good.

---

## Context

- References **PRD v1.1 §4.1** (Hero Section spec) and **§2.4** (Spacing and Layout — asymmetry rule, 12-column grid).
- Components available: `Section`, `Container` (`components/layout/`), `Button`, `Eyebrow`, `AsteriskBreak`, `ScrollIndicator` (`components/ui/`), `Nav` (`components/layout/`, wired into the root layout as of Step 6).
- Prerequisite: Step 6 complete. Nav is live on every page.

### Why placeholders instead of building it all at once

Every other step so far built one complete, working piece and shipped it. This step deliberately doesn't — it builds an empty frame with labelled boxes standing in for headline, subhead, CTAs, and photograph.

The reason is risk isolation. The Hero is the single most scrutinised section of the site — the PRD calls it out with a warning: *"Must answer in four seconds: what OTS is, who it is for, why the visitor should care."* If Steps 7a–7d were one giant step, a mistake in the typography (7b) would be tangled up with a mistake in the grid (7a), and you'd be debugging two unknowns at once. By shipping the grid alone first, you can verify — with total confidence — that the *structure* is correct before a single word of real copy or a single photograph enters the picture. Every subsequent step then has exactly one variable changing.

This is the same reasoning behind commit discipline in general — small, verifiable, revertible units — just applied one level up, to how a single section gets designed.

### A repo decision worth naming: Hero becomes its own component

Up to now, `page.tsx` has held everything directly. Starting here, each homepage section gets its own file under `components/sections/` — `Hero.tsx` today, then `Problem.tsx`, `WhatWeDo.tsx`, and so on as Steps 8–14 arrive. `page.tsx` becomes a short, readable list of section components in order.

Why now and not from the start: earlier components (`Button`, `Eyebrow`) were *reused* across the page, so they obviously needed their own files. Homepage sections are each used exactly once — there was no forcing reason to split them out yet. But a homepage built as nine sections' worth of JSX in one file becomes unreadable and hard to reason about. Splitting by section now, before that file grows, is the cheap moment to establish the pattern. Retrofitting it after five sections are tangled together in one file is the expensive moment.

---

## Files this step creates or modifies

**Creates:**
- `components/sections/Hero.tsx` — the Hero skeleton
- `prompts/STEP_07a_Hero_Layout_Structure.md` — this file

**Modifies:**
- `app/[locale]/page.tsx` — removes the Step 5 demo showcase sections (Button variants, Eyebrow/AsteriskBreak demo), imports and renders `<Hero />` as the first and, for now, only real section

**Does NOT touch:**
- `components/layout/Nav.tsx`, `components/ui/*` — Hero consumes these, doesn't modify them
- `messages/*.json` — no new copy yet, that's Step 7b

---

## Detailed specification (from PRD §4.1, structural portion only)

**Container:**
- Full viewport height minimum: `100vh`, with a hard floor of `720px` (so on short laptop screens or with browser chrome eating vertical space, the Hero never collapses below a usable height).
- Background: cream (`--cream` token — same as `Section`'s default `background="cream"`).
- Sits directly below Nav. Nav is `position: fixed` and transparent by default, so Hero's content needs enough top padding that the Eyebrow (coming in 7b) doesn't sit under the logo — PRD says the eyebrow position accounts for "where nav would be after scroll," i.e. roughly 72px (Nav's height) plus normal section padding.

**Grid — desktop (≥1024px):**
- Two columns: **55% left (text), 45% right (photograph)**. Not 50/50 — PRD's asymmetry rule (§2.4) is explicit that symmetric two-column layouts "read as templated."
- Column gap: 24px, matching the standard grid gap used elsewhere.
- Both columns vertically centred within the available height.

**Grid — mobile (<1024px):**
- Single column. Text stacks above where the photograph will go (photograph placeholder appears below the text placeholder, at a visibly reduced height — PRD specifies "reduced height" on mobile, not the same tall aspect ratio as desktop).

**Left column — placeholder stack (top to bottom), each a distinctly labelled block:**
1. Eyebrow placeholder — small pill-shaped block, roughly the size a short uppercase label would occupy (~180px × 28px)
2. Headline placeholder — two stacked bars at large scale representing the two-line Anton headline (roughly 90% and 70% width, tall — headline occupies the largest visual weight in this column)
3. Subheadline placeholder — a shorter block, 3 lines' worth of body-text height, max-width matching the eventual 520px cap
4. CTA group placeholder — two pill-shaped blocks side by side (primary + secondary button footprint), left-aligned, never centred (per the button system rule: buttons sit at the natural end of the content column)
5. Foot note placeholder — a single thin line of small-text height

**Right column — placeholder:**
- A single block filling the column height, `border-radius: 20px`, representing the editorial photograph. Roughly portrait-oriented (taller than wide) to match "single tall editorial photograph."
- Do not implement the grid-break bleed (`right: -48px` beyond the container edge) yet — that's a Step 7c detail once a real image exists. For now the placeholder respects the column width cleanly.

**Below both columns — Scroll indicator:**
- This one is *not* a placeholder. `ScrollIndicator` already exists and works (Step 5d) — render the real component here, absolutely positioned at the bottom, horizontally centred within the Hero section. It already handles its own rotation and scroll-based fade; nothing new to build.

**Placeholder visual treatment (applies to all placeholder blocks, not the ScrollIndicator):**
- Background: `bg-cream-deep` (visually distinct from the Hero's own `bg-cream`, so placeholders read clearly as "not real content yet")
- Border: 1px dashed, using the `--rule` token colour
- A small centred label inside each block in `--muted`, describing what it will become and which step fills it in — e.g. `"Headline — Step 7b"`, `"Photograph — Step 7c"`. This makes the skeleton self-documenting: anyone opening the page mid-build (including you, a week from now) can see exactly what's pending and where.

---

## THE PROMPT — paste this into Claude Code

```
You are executing Step 7a of the OTS website build. This step creates the structural skeleton of the Hero section — a full-viewport-height, two-column asymmetric grid with placeholder blocks — and retires the Step 5 demo showcase content from page.tsx.

Follow this plan exactly. If anything fails or is unclear, pause and report — do not attempt fixes without asking.

CONTEXT:
- Next.js 16, App Router. Hero.tsx is a Server Component (no client-side state needed for the structure itself — ScrollIndicator, which it renders, already handles its own client-side behaviour internally).
- Existing components: components/layout/Section.tsx, components/layout/Container.tsx, components/ui/ScrollIndicator.tsx.
- Design tokens confirmed in Step 6: check app/globals.css for the exact CSS variable / Tailwind class names for cream, cream-deep, ink, muted, and rule tokens before use.

TASK 1 — Verify prerequisites.
Report:
- `pwd` → confirm ots-website directory
- `git status` → confirm clean tree (only STEP_07a as untracked is fine)
- `git log --oneline -3` → confirm last commit is the Step 6 Navigation commit
- Port 3000 check with if/else output PORT_FREE or PORT_OCCUPIED. Kill any orphan.
- Read app/[locale]/page.tsx in full and report its current structure — specifically identify the Step 5 demo showcase sections (Button variants, Eyebrow/AsteriskBreak demo) that need to be removed.
- Read components/layout/Section.tsx and components/layout/Container.tsx to confirm their exact prop names and usage pattern.
- Read components/ui/ScrollIndicator.tsx to confirm its export name and whether it takes any required props.

Pause for my approval before proceeding.

TASK 2 — Create the Hero component skeleton.
Create components/sections/Hero.tsx (create the components/sections/ directory if it doesn't exist). Structure:

1. Server Component — no 'use client' needed.
2. Import Section, Container, and ScrollIndicator from their existing paths.
3. Root wrapper: use Section with background="cream", wrapped in an outer element (or via className passthrough if Section supports it — check first, otherwise wrap Section in a parent div) that enforces `min-height: 100vh` with a `720px` floor — use Tailwind's `min-h-screen` combined with an explicit `min-h-[720px]` to guarantee the floor holds even where 100vh is smaller. Do not modify Section.tsx itself to add this — it's a Hero-specific requirement, keep it scoped to Hero.tsx with a wrapping className.
4. Inside Section, use Container, then a two-column grid: `grid grid-cols-1 lg:grid-cols-[55%_45%] gap-6 lg:gap-6 items-center min-h-[inherit]` (adjust gap value to match the project's existing gap scale if different — check globals.css/tailwind config for the established gap token before hardcoding).
5. Left column: a flex column (`flex flex-col gap-4` or similar) containing five placeholder divs in order — eyebrow, headline, subheadline, CTA group, foot note — each styled per the placeholder treatment spec below, sized roughly per the proportions described.
6. Right column: a single placeholder div filling the column height, portrait-oriented, rounded-[20px].
7. Placeholder treatment for every placeholder div: bg-cream-deep, border border-dashed (1px, rule-token colour), rounded corners appropriate to the element (small for eyebrow/foot note, larger for headline/subhead/photograph blocks), centred text label inside using the muted token colour, small size (12-13px), text content describing what fills this slot and which step — e.g. "Eyebrow — Step 7b", "Headline (2 lines) — Step 7b", "Subheadline — Step 7b", "CTA buttons — Step 7b", "Foot note — Step 7b", "Photograph — Step 7c".
8. Below the grid (still inside Section, but positioned to sit at the bottom of the full-height Hero, not inline in document flow after the grid): render <ScrollIndicator /> exactly as its existing API expects — absolutely positioned, bottom-centred. Check whether ScrollIndicator already self-positions (from its Step 5d implementation) or needs a positioning wrapper here.
9. On mobile (below 1024px), confirm via the grid-cols-1 fallback that the right column (photograph placeholder) appears below the left column stack, at a visibly reduced height relative to desktop (add a responsive height utility, e.g. shorter min-height on the photograph placeholder below the lg breakpoint).

Confirm the file was written and report its line count.

TASK 3 — Update page.tsx.
Open app/[locale]/page.tsx. Remove the Step 5 demo showcase sections entirely (the Button variants demo, the Eyebrow/AsteriskBreak/mist-background demo — everything that existed purely to visually verify shared components in isolation). Import Hero from '@/components/sections/Hero' and render it as the sole content inside the page component for now. Keep any necessary page-level structure (e.g. getTranslations setup) that other parts of the file still need — don't remove i18n scaffolding, only the demo content.

Report the full diff.

TASK 4 — Start dev server and verify.
Run `npm run dev` in the background. Wait 15 seconds. Check whether http://localhost:3000/ and http://localhost:3000/en both return 200. Report any compilation or TypeScript errors.

If clean, pause and wait for my browser verification.

TASK 5 — Wait for user verification.
Pause here. I will check:
- The Hero section fills the full viewport height on page load (no visible content below the fold before scrolling, aside from perhaps a sliver)
- On desktop, the two-column grid is clearly asymmetric — left column visibly wider than right (not a 50/50 split)
- All five left-column placeholder blocks are stacked correctly, each labelled and legible, in the right relative order and rough proportion (headline block is the largest, foot note the smallest)
- The photograph placeholder on the right is portrait-oriented and fills the column height
- The ScrollIndicator renders and rotates at the bottom, exactly as it did in Step 5d
- Resizing below 1024px collapses to a single column: text placeholders stack, photograph placeholder appears below at reduced height
- Nav still overlays correctly — transparent at the top of the page, frosted after scrolling — with no visual conflict against the Hero's cream background
- The Step 5 demo sections are gone — page.tsx now shows only the Hero skeleton

Once I say "verified", proceed to Task 6.

TASK 6 — Stop dev server. Kill orphans. Commit and push.
Run `git status` and report. Should see:
- New: components/sections/Hero.tsx, prompts/STEP_07a_Hero_Layout_Structure.md
- Modified: app/[locale]/page.tsx

Stage all: `git add -A`

Commit with:
`feat(step-07a): add Hero section layout structure with placeholder content`

Push.

TASK 7 — Final report.

STEP 7a COMPLETE
- Component created: components/sections/Hero.tsx ([line count] lines)
- Files modified: app/[locale]/page.tsx (demo sections removed, Hero wired in)
- Dev server: [worked / did not work]
- User verification: [confirmed / not confirmed]
- Git commit: [hash and message]
- Git push: [succeeded / failed]
- Port 3000: [free at end / occupied]
- Any warnings or unexpected output: [list, or "none"]

END OF PROMPT.
```

---

## Acceptance test — what you verify after Claude Code finishes

### Check 1 — Full viewport height
Load `http://localhost:3000/`. The Hero should fill the screen — you shouldn't see the start of any next section without scrolling (there isn't one yet, but the point is the Hero itself reads as a deliberate full-screen "first impression," not a short strip of content sitting at the top of a mostly-empty page).

### Check 2 — Asymmetric grid
At a normal desktop width, the left column (placeholder stack) should be visibly wider than the right column (photograph placeholder) — roughly 55/45, not an even split. If it looks 50/50, something's wrong with the grid template.

### Check 3 — Placeholder stack order and proportion
Top to bottom in the left column: eyebrow (small), headline (large — the biggest block in the column), subheadline (medium, narrower), CTA buttons (two pills side by side), foot note (thin line). Each block's label should be readable and correctly describe what's coming.

### Check 4 — Photograph placeholder
Right column, portrait-oriented, rounded corners, fills the column height, labelled "Photograph — Step 7c."

### Check 5 — ScrollIndicator unaffected
The rotating "SCROLL · DOWN" badge at the bottom should look and behave exactly as it did when you tested it in isolation in Step 5d — this step only repositions it into its permanent home, it shouldn't have changed at all.

### Check 6 — Mobile collapse
Resize below 1024px (or use device toolbar). Confirm single-column stacking, text on top, photograph placeholder below at a shorter height than its desktop version.

### Check 7 — Nav still correct
Confirm Nav's transparent-over-hero and frosted-on-scroll behaviour (verified in Step 6) still looks right against the Hero's cream background — this step shouldn't have touched Nav, but it's worth a fast visual re-check since Hero is now the first thing Nav sits above.

### Check 8 — Demo content gone
Confirm the Step 5 Button/Eyebrow/AsteriskBreak showcase sections no longer appear anywhere on the page.

---

## If this doesn't work

Paste back to me:
1. The exact error message or unexpected behaviour.
2. Which check (1–8) failed.
3. A screenshot if it's visual — this step is almost entirely visual, so a screenshot will usually say more than a description.

Do not let Claude Code guess-and-retry more than once on the same error — if the first fix attempt doesn't resolve it, stop and paste the situation back to me before a second attempt.

---

## What comes next

Once all eight checks pass, come back and say:

> **"Step 7a done. Give me Step 7b."**

**Step 7b is Hero Typography and CTA** — this is where the eyebrow, headline (with the italic accent word on "better"), subheadline, and the two real CTA buttons replace their placeholders with actual Dutch and English copy. The grid you just built doesn't change; its slots just start filling in with the real thing.

---

**Step 07a · Hero Layout Structure · v1.0 (Claude Code-driven)**
*Behind every smooth business is a better system.*
