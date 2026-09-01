# STEP 07c — Hero Photograph

**Project:** Ontwikkeling Tech Services — Marketing Website
**Type:** Claude Code prompt
**Estimated time:** 30–45 minutes (build) + however long sourcing takes (do this part first, separately)
**Owner:** Virat
**Version:** 1.0
**Phase:** 3 — Navigation and Homepage

---

## Before you run anything: this step needs a real file first

Unlike every step so far, this one has a hard dependency that isn't code: **an actual photograph has to exist in the repo before Claude Code touches anything.** Sourcing it is a curatorial decision, not an engineering one — the Brand Bible's photography rules are specific and opinionated (documentary tone, warm natural light, no AI imagery, no stock-agency clichés), and that's a judgment call that belongs to you or Krishna, not to an agent picking the first plausible search result.

**Worth knowing: this was actually supposed to already be done.** Back in Step 0's Part 3, the sourcing plan set an explicit goal — *"all photography in hand by Step 7 (Hero) — approximately 4–6 build steps from now."* If you or Sneha already curated a Hero candidate, great, skip to "If you already have the file" below. If not, that's fine too — nothing broke, but it's worth closing this loop now rather than letting it slide further.

### Sourcing criteria (Brand Bible §4.6 + PRD §9.2)

- **Subject:** a restaurant interior before service, a clinic reception area, or hands at work at a real desk — something that reads as "a real Dutch service business," not a generic office.
- **Light:** warm and natural. No harsh flash, no studio lighting.
- **Composition:** wide crop, generous negative space — crop to composition, not to fill a frame.
- **Tone:** documentary. It should feel observed, not staged or posed for camera.
- **Orientation:** portrait, roughly 4:5, since it fills a tall right-hand column.
- **Resolution:** minimum 1600px on the short side.
- **Source priority, in order:** (1) OTS's own commissioned photography if any exists yet, (2) a client site with permission, (3) licensed European photography, (4) **Pexels or Unsplash, carefully curated** — this is the realistic option for a first Hero image, and it's explicitly sanctioned in the PRD as long as the result "looks like it was made rather than harvested."
- **Hard rule, no exceptions: no AI-generated imagery.** The Brand Bible states this twice, in identical words each time. Do not generate a placeholder image to fill this slot, even temporarily.
- **Never:** teams high-fiving, people pointing at whiteboards, over-saturated food photography, anything that reads as generic stock.

### What to do with the file once you've picked it

1. Save it to `public/images/` with a descriptive filename — `hero-restaurant-interior.webp`, not `pexels-photo-2103949.jpg`. (WebP if you can get it; JPEG is fine if that's what the source provides — Next's image pipeline will optimise it either way.)
2. Add a line to `public/images/CREDITS.md` crediting the source (create this file if it doesn't exist yet — per the Step 0 plan, every sourced image gets a credit line here, permanently. This is the first entry.)

### If you already have the file

Confirm it's saved under `public/images/` with a sensible filename, and that `public/images/CREDITS.md` has a credit line for it, before running the prompt below.

---

## Goal

Wire the real photograph into the Hero's right column, replacing the Step 7a placeholder: `next/image` with correct sizing and priority loading, the subtle warm-tone treatment the Brand Bible calls for, `border-radius: 20px`, and the desktop grid-break bleed (`right: -48px`) that makes this section's one deliberate "breaks the grid" moment.

---

## Context

- References **PRD v1.1 §4.1** (Hero photograph spec), **§4.3** (grid-break rule — once per page, this is the Hero's), and **§13.3** (Core Web Vitals — Hero image must be `priority` since it's almost certainly the page's LCP element).
- Prerequisite: Step 7b complete, and a real image file present per the sourcing steps above.

---

## Files this step creates or modifies

**Modifies:**
- `components/sections/Hero.tsx` — right-column placeholder becomes a real `next/image`
- `public/images/CREDITS.md` — new file if it didn't already exist, or confirmed present

**Creates:**
- `prompts/STEP_07c_Hero_Photograph.md` — this file

**Does NOT touch:**
- Left column (copy is finished as of 7b)
- Any animation — still Step 7d

---

## Detailed specification (PRD §4.1, §4.3, §13.3)

- `next/image`, `priority` prop set (this image loads above the fold and is very likely the page's Largest Contentful Paint element — `priority` tells Next to preload it rather than lazy-load it).
- Explicit width/height (or `fill` with a sized parent — check which pattern fits the existing grid column better; `fill` is usually the right call inside a grid column with a defined height).
- `border-radius: 20px`.
- `overflow: hidden` on the containing element (so the border-radius actually clips the image rather than just rounding a box behind it).
- **No text overlay, no sticker, no badge on the photograph.** The image is the whole story in this column.
- **Warm-tone treatment:** a subtle unifying cream cast, per Brand Bible §4.6 — "slight warm tone applied to unify photography across pages." The PRD doesn't give exact filter values (this is a visual-judgment call, tune it while verifying), but a reasonable starting point is a very light warm overlay — something like a low-opacity (~6–10%) `--accent-tint` or `--cream` layer blended over the image (`mix-blend-mode: multiply` or `overlay`, low opacity), or a subtle CSS `filter` (slight `sepia()` and `saturate()` adjustment, kept minimal — the Brand Bible is explicit that this should never push colour into "unnatural registers"). Get it close, then eyeball it against the Brand Bible's "warm, not filtered" standard during verification.
- **Desktop grid-break:** the image bleeds slightly past the right edge of the container — `right: -48px` relative to the column, so it extends into the page's outer margin. This is deliberate asymmetry, not a bug — it's the one "breaks the grid" moment the Brand Bible calls for on this section (§4.3: "once per page — never more").
- **Mobile:** no bleed (contained cleanly within the mobile column), reduced height relative to desktop — this matches the "reduced height" behaviour already scaffolded as a placeholder in Step 7a; keep whatever responsive height rule that step established.
- **Alt text:** required, descriptive, in both locales via the translation system (accessibility requirement per PRD §13.1 — Lighthouse Accessibility target 95+, alt text is part of that). Something like "Warm-lit restaurant interior" / "Warm verlicht restaurantinterieur" — adjust to whatever the actual sourced image depicts.

---

## THE PROMPT — paste this into Claude Code

```
You are executing Step 7c of the OTS website build. This step replaces the Hero section's right-column photograph placeholder with the real, already-sourced image.

Follow this plan exactly. If anything fails or is unclear, pause and report — do not attempt fixes without asking.

CONTEXT:
- components/sections/Hero.tsx exists from Steps 7a/7b. Its right column currently holds a placeholder div labelled "Photograph — Step 7c".
- A real image file should already exist under public/images/ — do NOT proceed if you cannot find one. If public/images/ is empty or contains no obvious Hero candidate, stop immediately and report back rather than guessing or generating a placeholder.
- public/images/CREDITS.md should exist with a credit line for this image. If it doesn't, stop and report — do not silently skip attribution.
- Design tokens (--cream, --accent-tint, --rule, etc.) already established in app/globals.css.

TASK 1 — Verify prerequisites.
Report:
- `pwd`, `git status`, `git log --oneline -3` (last commit should be Step 7b's Hero copy commit)
- Port 3000 check, kill any orphan
- List contents of public/images/ — report every file found
- Check for public/images/CREDITS.md — report its contents if present, or its absence
- Read components/sections/Hero.tsx, confirm the current right-column placeholder structure

If no suitable image file is found in public/images/, or CREDITS.md is missing/has no entry for it, STOP HERE and report back. Do not proceed to Task 2 under any circumstances until I've confirmed the file and credit are in place.

Pause for my approval before proceeding, once the image is confirmed present.

TASK 2 — Add photograph alt text translations.
Add to the existing "hero" namespace in messages/nl.json and messages/en.json:
- photoAlt: [a short, accurate description of what the actual sourced image depicts, in Dutch and English — infer this from the filename and/or ask me if it's ambiguous]

Report the diff.

TASK 3 — Replace the photograph placeholder.
In components/sections/Hero.tsx, replace the right-column placeholder div with:
1. A containing element with overflow-hidden, border-radius 20px, filling the column height (same footprint the placeholder occupied).
2. A next/image using the sourced file from public/images/, with fill (confirm this fits the existing column sizing better than explicit width/height — check how the column's height is currently established, e.g. via the grid's items-center + a min-height, and use whichever image-sizing approach is compatible), priority set to true, and alt text from t('hero.photoAlt').
3. object-fit: cover (via className or style, whichever matches how other images are handled elsewhere in the codebase so far, if any precedent exists — otherwise just use Tailwind's object-cover).
4. The warm-tone treatment: implement as a low-opacity overlay div (absolutely positioned, inset-0, background using --accent-tint or --cream at roughly 6–10% opacity, mix-blend-mode multiply or overlay — try one, check how it looks) OR a CSS filter on the image itself (slight sepia + saturate adjustment) — pick one approach, keep it subtle, and flag in your report that the exact values may need visual tuning during verification.
5. On desktop (lg breakpoint and up), apply the grid-break bleed: the image container should extend right: -48px beyond its normal column boundary (position relative on the column, or a negative margin/right offset on the image container — use whichever technique doesn't fight the existing grid layout; report which you used and why).
6. On mobile, no bleed — contained cleanly, and confirm the reduced-height behaviour from Step 7a's placeholder is preserved.

Confirm the file was updated and report its new line count.

TASK 4 — Start dev server and verify.
Run `npm run dev` in the background. Wait 15 seconds. Check whether http://localhost:3000/ and http://localhost:3000/en both return 200. Report any compilation, TypeScript, or next/image configuration errors (next/image sometimes needs the image's domain or local path allowlisted in next.config.js if anything unusual is happening — check for that specific error class).

If clean, pause and wait for my browser verification.

TASK 5 — Wait for user verification.
Pause here. I will check:
- The real photograph renders (not the placeholder), fills the right column, correct portrait proportions
- Border-radius and overflow-hidden are both working — corners are rounded and nothing overflows the rounded shape
- The warm-tone treatment is visible but subtle — it should read as "cohesive with the palette," not as an obvious filter slapped on top
- On desktop, the image visibly bleeds past the right edge of the container into the outer margin — this should be a noticeable but not jarring asymmetry
- On mobile, no bleed, reduced height, sits cleanly below the text stack
- Image loads quickly and doesn't cause layout shift (should be true automatically with priority + defined dimensions, but confirm visually)
- Alt text is present (inspect via browser dev tools or view-source) and accurately describes the image
- CREDITS.md is committed alongside the image reference

Once I say "verified", proceed to Task 6.

TASK 6 — Stop dev server. Kill orphans. Commit and push.
Run `git status` and report. Should see:
- Modified: components/sections/Hero.tsx, messages/nl.json, messages/en.json
- New (if not already tracked): public/images/[filename], public/images/CREDITS.md, prompts/STEP_07c_Hero_Photograph.md

Stage all: `git add -A`

Commit with:
`feat(step-07c): add Hero photograph with warm-tone treatment and grid-break bleed`

Push.

TASK 7 — Final report.

STEP 7c COMPLETE
- File modified: components/sections/Hero.tsx ([new line count] lines)
- Image used: [filename], credited in CREDITS.md
- Warm-tone approach used: [overlay / filter, and specific values]
- Grid-break technique used: [description]
- Dev server: [worked / did not work]
- User verification: [confirmed / not confirmed]
- Git commit: [hash and message]
- Git push: [succeeded / failed]
- Port 3000: [free at end / occupied]

END OF PROMPT.
```

---

## Acceptance test — what you verify after Claude Code finishes

### Check 1 — Real image, correct fit
The actual photograph renders, fills the right column at the correct portrait proportions, no distortion or awkward cropping.

### Check 2 — Rounded corners actually clip
Border-radius is visible on all four corners and nothing (image content, overlay) escapes the rounded shape.

### Check 3 — Warm tone is subtle, not a filter
Glance at it, then look away, then look again — if the treatment jumps out as "this photo has a filter on it," it's too strong. It should feel like part of the palette, not an Instagram effect.

### Check 4 — Grid-break bleed
On a normal desktop width, the photograph should visibly extend slightly past where the container's right edge would otherwise be — a small, deliberate asymmetry. This is the section's one "breaks the grid" moment per the Brand Bible rule (once per page, no more).

### Check 5 — Mobile behaviour
No bleed, shorter than the desktop version, sits cleanly below the text stack with no overflow.

### Check 6 — Performance sanity check
Open dev tools, Network tab, reload — the image should load early (priority, not lazy), and shouldn't cause a visible layout jump as it finishes loading.

### Check 7 — Attribution
`public/images/CREDITS.md` has an accurate entry for this image and its source.

---

## If this doesn't work

Paste back to me:
1. The exact error message or unexpected behaviour.
2. Which check (1–7) failed.
3. A screenshot if it's visual.

Do not let Claude Code guess-and-retry more than once on the same error — if the first fix attempt doesn't resolve it, stop and paste the situation back to me before a second attempt.

---

## What comes next

Once all seven checks pass, come back and say:

> **"Step 7c done. Give me Step 7d."**

**Step 7d is the Hero page-load animation** — the staggered Framer Motion reveal sequence (eyebrow → headline → subhead → CTAs → photograph → scroll indicator, each on its own timing) that turns this now-complete-but-static section into the actual first-impression moment the PRD describes. This is also where the Hero component needs to become a Client Component for the first time, since orchestrating that sequence needs client-side state — worth knowing going in.

---

**Step 07c · Hero Photograph · v1.0 (Claude Code-driven)**
*Behind every smooth business is a better system.*
