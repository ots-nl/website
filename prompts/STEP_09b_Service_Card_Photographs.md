# STEP 09b — Service Card Photographs

**Project:** Ontwikkeling Tech Services — Marketing Website
**Type:** Claude Code prompt
**Estimated time:** 20–30 minutes (build) + sourcing time (do this first, separately)
**Owner:** Virat
**Version:** 1.0
**Phase:** 3 — Navigation and Homepage

---

## Before you run anything: three real files must exist first

Same as Step 7c: this step has a hard prerequisite that isn't code — **three real photographs have to exist in the repo before Claude Code touches anything.** The Brand Bible's AI-imagery ban and its photography rules apply identically. The one thing that's changed since Hero is *scale* — this is three curated photos, not one.

**This is a real "hand it to Sneha" moment.** One photo, curated well, is 15 minutes of focused browsing. Three photos, curated well and matched to each other in tone, is closer to an hour — enough that if you do it yourself in the middle of a build session, you'll either rush it or lose the build momentum. Sneha's remit covers exactly this kind of task, and the criteria below are complete enough to hand her as a brief with no further guidance from you.

If you're going to do it yourself anyway, that's fine — just budget the hour honestly rather than expecting to knock it out between steps.

### Sourcing criteria — three photographs, matched in tone

All three photographs must:

- Feel like the same photographer took them, in the same warm afternoon light, in the same visual register. They'll appear side-by-side on the homepage; if one is cold-blue-lit and another is warm-lit, the row falls apart visually.
- Follow the Brand Bible §4.6 rules: documentary tone, warm natural light, negative space, no people looking at camera, no HDR processing, no over-saturated colour.
- Be **landscape** or roughly square orientation (they sit in a 240px-tall card zone that spans the card's full width — landscape ~3:2 or 16:9 works best; portrait shots crop badly here).
- Minimum **1200px on the long side** (smaller than Hero's 1600px because these render smaller).
- No AI-generated imagery. No exceptions. Repeated because it matters.

Per PRD §9.2, each card has a specific compositional intent:

**Card 01 — Audit (`card-audit.jpg`):** Something that reads as *diagnosis* or *observation.* Pexels search terms worth trying, in order: `notebook writing desk warm`, `hand writing notes desk`, `laptop notebook coffee workspace`, `journal writing morning light`. Reject anything with corporate-looking planners, stock notebooks with visible logos, or anything that reads as "productivity influencer content." The image should feel like a real person's real workspace — a moment of quiet attention.

**Card 02 — Build (`card-build.jpg`):** Something that reads as *making* or *construction.* Search: `workshop wood tools warm`, `craftsman workspace natural light`, `developer desk laptop code`, `dashboard screen warm office`. Avoid glossy tech-office shots, avoid anyone in a hoodie hunched dramatically over a screen, avoid stock "startup" imagery. The image should feel considered — someone building something specific, not "tech vibes."

**Card 03 — Retainer (`card-retainer.jpg`):** Something that reads as *continuity* or *the long term.* Search: `calendar desk planning warm`, `monthly planner workspace`, `wooden desk plant coffee`, `open notebook calendar week`. This is the hardest of the three to source well — "ongoing relationship" doesn't have an obvious visual. Fall back on: a workspace that reads as *lived-in* — plants, natural wear, warm surfaces, a sense that someone works there every day rather than posed for a shoot.

### What to do with the files

1. Save all three to `public/images/` with these exact filenames:
 - `public/images/card-audit.jpg`
 - `public/images/card-build.jpg`
 - `public/images/card-retainer.jpg`

 (JPG is fine — Next.js will optimise to WebP automatically at request time. Same as Hero.)

2. Update `public/images/CREDITS.md` — add a new section for the service cards. The file already exists from Step 7c; you're appending to it, not creating from scratch. Add exactly this block, filling in the real details from each Pexels/Unsplash page:

 ```markdown
 ## Service Cards

 - **File:** `card-audit.jpg`
 - **Photographer:** [Name from Pexels/Unsplash page]
 - **Source:** [Pexels / Unsplash] — [URL of the image page]
 - **Licence:** [Pexels License / Unsplash License]
 - **Used since:** Step 09b, [today's date]

 - **File:** `card-build.jpg`
 - **Photographer:** [Name]
 - **Source:** [Site] — [URL]
 - **Licence:** [Licence]
 - **Used since:** Step 09b, [today's date]

 - **File:** `card-retainer.jpg`
 - **Photographer:** [Name]
 - **Source:** [Site] — [URL]
 - **Licence:** [Licence]
 - **Used since:** Step 09b, [today's date]
 ```

3. Verify all three files exist at their paths and all three have complete credit entries in `CREDITS.md` before running the prompt.

---

## Goal

Replace the three placeholder photograph zones in the service cards (Audit / Build / Retainer) with real `next/image` renders. Apply the same warm-tone treatment used on the Hero photograph so all site photography reads as unified. Keep the existing card layout, hover behaviour, and scroll reveal untouched — this step only swaps four DOM nodes.

---

## Context

- References **PRD v1.1 §4.3** (Service card structure), **§9.2** (Photography sourcing plan), and **Brand Bible §4.6** (Photography rules — warm tone across pages).
- Prerequisite: Step 9a complete, and three real image files present per the sourcing steps above.
- The exact warm-tone treatment used on the Hero photograph (Step 7c) needs to be re-applied identically here — same overlay/filter approach, same values. Cohesion across photography is the whole point of the treatment.

### One performance detail worth understanding

The Hero photograph uses `priority` on its `<Image>` component because it's above the fold and likely the page's Largest Contentful Paint element. **These three card photographs must NOT use `priority`.** They sit further down the page, and Next.js's default lazy-loading is the correct behaviour — the browser only downloads them when the user scrolls near them. Setting `priority=true` on below-the-fold images wastes bandwidth on every page load for visitors who may never scroll that far, and it actively hurts LCP by competing with the true above-the-fold assets for the browser's early loading budget.

Small detail; matters at scale.

---

## Files this step modifies

**Modifies:**
- `components/sections/WhatWeDo.tsx` — three placeholder divs become three `<Image>` renders
- `messages/nl.json` — adds three alt-text keys under the `whatWeDo` namespace
- `messages/en.json` — adds three alt-text keys under the `whatWeDo` namespace
- `public/images/CREDITS.md` — updated by you before running the prompt (already contains Hero entry; you're appending)

**Creates:**
- `prompts/STEP_09b_Service_Card_Photographs.md` — this file

**Does NOT touch:**
- Card layout, hover behaviour, scroll reveal, or any copy other than alt text — all frozen from Step 9a

---

## Detailed specification

**Alt text — draft, both languages, three images:**

- Audit: NL: `Notitieboek en laptop op een warm verlichte werkplek` / EN: `Notebook and laptop on a warm-lit desk`
- Build: NL: `Werkplek met laptop en dashboard in natuurlijk licht` / EN: `Workspace with laptop and dashboard in natural light`
- Retainer: NL: `Kalender en planner op een houten bureau` / EN: `Calendar and planner on a wooden desk`

Adjust these to match what the actual photos depict — the alt text describes what's actually visible, not a generic label. If the Audit photo you sourced doesn't show a notebook, don't leave the alt text saying "notebook."

**Image render, per card:**

- `next/image` component from `next/image`.
- `src` from `/images/card-audit.jpg` (or `/build.jpg` / `/retainer.jpg`).
- `alt` from the translation key (e.g. `t('cards.audit.photoAlt')`).
- `fill` prop — the image sizes to its containing element (the 240px-tall zone).
- `sizes` attribute — critical for responsive image loading efficiency: `sizes="(max-width: 768px) 100vw, 33vw"` (below the `md` breakpoint the card is full-width; at `md` and up three cards share the row, so each card is roughly a third of the viewport width).
- `priority` explicitly set to `false` (or omitted — false is the default; being explicit makes the below-the-fold intent obvious to future readers of the code).
- `className="object-cover"` so the image fills the zone without distortion, cropping where necessary.

**Container (replaces the placeholder div):**

- Same 240px fixed height as the placeholder.
- Rounded top corners: `rounded-t-[20px]` (matching the card's outer radius).
- `overflow-hidden` so the rounded corners actually clip the image.
- `position: relative` so `fill` on the Image works correctly (Next.js Image with `fill` requires a positioned ancestor).
- **The border-bottom dashed line goes away** — that was placeholder styling.

**Warm-tone treatment:**

- Apply the exact same approach used on the Hero photograph in Step 7c. Whether that was implemented as an overlay div with a specific `mix-blend-mode` + opacity, or as a CSS `filter` on the image itself, use identically the same approach and identically the same values here.
- If Hero used an overlay: include the same overlay div inside each card's photo container.
- If Hero used a filter: apply the same filter string to the Image.
- **Do not tune per-image** — uniformity across all four site photographs (Hero + three cards) is the whole reason for the treatment.

---

## THE PROMPT — paste this into Claude Code

```
You are executing Step 9b of the OTS website build. This step replaces the three placeholder photograph zones in the Service Ladder cards with real, already-sourced images.

Follow this plan exactly. If anything fails or is unclear, pause and report — do not attempt fixes without asking.

CONTEXT:
- components/sections/WhatWeDo.tsx exists from Step 9a with three cards, each containing a labelled placeholder photograph zone at the top ("Photograph — Step 9b").
- Three image files should already exist at:
  public/images/card-audit.jpg
  public/images/card-build.jpg
  public/images/card-retainer.jpg
- public/images/CREDITS.md should already contain credit entries for all three under a "Service Cards" section (in addition to the existing Hero entry from Step 7c).
- The warm-tone treatment used on the Hero photograph in Step 7c must be reused identically here — SAME approach, SAME values. Uniformity across site photography is the point.

TASK 1 — Verify prerequisites.
Report:
- pwd, git status, git log --oneline -3 (last commit should be Step 9a's Service Ladder commit)
- Port 3000 check, kill any orphan
- List contents of public/images/ — report every file found
- Read public/images/CREDITS.md in full, confirm that entries for card-audit.jpg, card-build.jpg, and card-retainer.jpg all exist with photographer + source URL + licence populated
- Read components/sections/Hero.tsx and locate the warm-tone treatment applied to the Hero photograph — report the exact technique used (overlay div with what background/opacity/blend-mode, OR a CSS filter with what values). This is the treatment we will re-apply identically to the three cards.
- Read components/sections/WhatWeDo.tsx, confirm the three placeholder photograph zones exist and identify their exact JSX structure

If any of the three image files is missing, or CREDITS.md has any incomplete entry for the three cards, STOP HERE and report back. Do not proceed to Task 2 under any circumstances. Do not generate placeholder images. Do not attempt to source images programmatically.

Pause for my approval before proceeding, once the three files and their credits are confirmed present.

TASK 2 — Add photo alt-text translations.
Extend the existing "whatWeDo" namespace in messages/nl.json and messages/en.json by adding a photoAlt key to each of the three cards' translation blocks:

NL (nested under cards.audit / cards.build / cards.retainer):
- cards.audit.photoAlt: "Notitieboek en laptop op een warm verlichte werkplek"
- cards.build.photoAlt: "Werkplek met laptop en dashboard in natuurlijk licht"
- cards.retainer.photoAlt: "Kalender en planner op een houten bureau"

EN:
- cards.audit.photoAlt: "Notebook and laptop on a warm-lit desk"
- cards.build.photoAlt: "Workspace with laptop and dashboard in natural light"
- cards.retainer.photoAlt: "Calendar and planner on a wooden desk"

If the actual images depict something different from what these alt-text drafts describe, STOP and ask me for revised alt text — do not silently use inaccurate descriptions. Alt text must reflect what's actually in the image.

Report the diff for both files before proceeding.

TASK 3 — Replace the placeholder photograph zones in WhatWeDo.tsx.
In each of the three cards, replace the placeholder div (currently: bg-cream-deep border-b border-dashed with the "Photograph — Step 9b" label) with:

1. A container div: h-[240px], rounded-t-[20px], overflow-hidden, position: relative (relative is required for next/image fill to work).
2. Inside the container: a next/image component with:
   - src pointing to /images/card-audit.jpg (or card-build.jpg / card-retainer.jpg — matched to the card being modified)
   - alt from t('cards.[audit|build|retainer].photoAlt')
   - fill
   - sizes="(max-width: 768px) 100vw, 33vw"
   - priority explicitly false (or simply omit the priority prop — do NOT set it to true)
   - className="object-cover"
3. The warm-tone treatment — apply IDENTICALLY to how it was applied to the Hero photograph in Step 7c, per the Task 1 findings. If Hero used an overlay div, add the same overlay div here (absolutely positioned inside the container, with the same background/opacity/blend-mode). If Hero used a CSS filter on the image, apply the same filter here.

Do not modify the border, hover behaviour, motion wrapper, or any other aspect of the card. Only the internal contents of the top zone change.

Confirm the file was updated and report its new line count.

TASK 4 — Start dev server and verify.
Run npm run dev in the background. Wait 15 seconds. Check whether http://localhost:3000/ and http://localhost:3000/en both return 200. Report any compilation, TypeScript, or next/image errors.

If clean, pause and wait for my browser verification.

TASK 5 — Wait for user verification.
Pause here. I will check:
- All three cards now show real photographs instead of placeholders
- Each photograph fills its 240px zone cleanly with object-cover (no distortion, appropriate cropping)
- Top corners of each image are rounded, matching the card's outer border-radius, with no visible clipping issues
- The warm-tone treatment is visible on all three images and is IDENTICAL in intensity to the Hero photograph — the four photographs on the page should feel like they belong together
- Card hover behaviour still works: border transitions to accent, card lifts, text link underline draws in
- Card scroll reveal still works: cards fade up in staggered sequence as the section scrolls into view
- Images do NOT preload on page load — they should only appear in the Network tab when scrolling near them (check dev tools Network tab, filter to images, reload the page; the card images should not appear until you scroll toward that section)
- On mobile (below md), cards stack, images still fill their zones cleanly at the full mobile card width
- Alt text is accurate (inspect via dev tools or view-source and confirm it matches what's visible in the image)

Once I say "verified", proceed to Task 6.

TASK 6 — Stop dev server. Kill orphans. Commit and push.
Run git status and report. Should see:
- Modified: components/sections/WhatWeDo.tsx, messages/nl.json, messages/en.json
- New (if not already tracked): public/images/card-audit.jpg, public/images/card-build.jpg, public/images/card-retainer.jpg
- Modified: public/images/CREDITS.md
- New: prompts/STEP_09b_Service_Card_Photographs.md

Stage all: git add -A

Commit with:
feat(step-09b): add service card photographs with warm-tone treatment

Push.

TASK 7 — Final report.

STEP 9b COMPLETE
- File modified: components/sections/WhatWeDo.tsx ([new line count] lines)
- Images added: card-audit.jpg, card-build.jpg, card-retainer.jpg — all credited in CREDITS.md
- Warm-tone approach used: [same as Hero — describe technique and values]
- priority=false confirmed for all three images
- Dev server: [worked / did not work]
- User verification: [confirmed / not confirmed]
- Git commit: [hash and message]
- Git push: [succeeded / failed]
- Port 3000: [free at end / occupied]

END OF PROMPT.
```

---

## Acceptance test — what you verify after Claude Code finishes

### Check 1 — Photograph cohesion
The four site photographs — the Hero interior on top, then the three card images below — should feel like they belong to the same visual family. Warm palette, similar light quality, similar tone. If the cards' warm-tone treatment is stronger or weaker than the Hero's, they'll read as "different photos on the same page" instead of "the same photographic voice." This is the check most likely to catch an actual bug in this step.

### Check 2 — Object-cover works cleanly
Each image should fill its 240px zone without distortion, cropping tastefully where the source aspect ratio doesn't match the zone's. If any image shows white/cream bars on the side, or looks stretched, `object-cover` isn't applied.

### Check 3 — Rounded corners clip
Top-left and top-right corners of each image should be rounded (matching the card's `rounded-[20px]`). If the image shows sharp corners inside a rounded card, `overflow-hidden` isn't applied to the container.

### Check 4 — Lazy loading (dev tools required)
Open dev tools, Network tab, filter to Images. Reload the page. On initial load, only the Hero photograph should download — the three card photos should NOT appear in the Network tab yet. Scroll down toward the Service Ladder section — the card photos should download as you approach them. If all four images download immediately on page load, `priority` is incorrectly set to `true` somewhere or `fill` is missing.

This is a boring check that saves real money on bandwidth once the site is live at scale.

### Check 5 — Alt text accuracy
Inspect one of the card images. Confirm the `alt` attribute value describes what's actually in the image. If the Retainer image shows a plant on a wooden desk and the alt text says "calendar and planner," the alt text is misleading — screen reader users will hear an inaccurate description. Fix if wrong.

### Check 6 — Hover and reveal still work
Nothing about the card's behaviour should have changed — same hover lift, same border-colour transition, same scroll-triggered fade-up. If any of those broke, this step accidentally modified something outside its scope.

### Check 7 — Mobile
On mobile width, cards stack; images should still fill their zones at the full mobile card width without distortion.

### Check 8 — No regressions
Hero, Nav, Problem, and the Service Ladder cards' copy/prices should all look and behave exactly as before.

---

## If this doesn't work

Paste back:
1. Exact error or unexpected behaviour.
2. Which check (1–8) failed.
3. Screenshot for visual issues — especially for Check 1 (cohesion), a side-by-side view of the Hero photograph and any card photograph tells the story.

---

## What comes next

Once all eight checks pass, come back and say:

> **"Step 9b done. Give me Step 10."**

**Step 10 is the How We Work section** — the four-step process (Discovery → Audit → Build → Retainer) on a `--night` (dark) background. This is the first dark-background section on the site, so it's the first time you'll see the token colours inverted (cream text on dark, `--muted` for meta, `--accent` still holds). The oversized "04" numeral behind the H2 is the grid-break for this section. No photographs — text and typography only.

---

**Step 09b · Service Card Photographs · v1.0 (Claude Code-driven)**
*Behind every smooth business is a better system.*
