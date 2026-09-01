# STEP 07d — Hero Page-Load Animation

**Project:** Ontwikkeling Tech Services — Marketing Website
**Type:** Claude Code prompt
**Estimated time:** 30–45 minutes
**Owner:** Virat
**Version:** 1.0
**Phase:** 3 — Navigation and Homepage

---

## Goal

Turn the static Hero into the choreographed first-impression moment the PRD calls for: a staggered reveal sequence — eyebrow, then two headline lines cascading, then subheadline, CTAs, photograph, and finally the scroll indicator — each on its own precise timing, all respecting the visitor's reduced-motion preference. This is the last of the four Hero sub-steps.

---

## Context

- References **PRD v1.1 §4.1** ("Motion — Hero page load," verbatim timings) and **Brand Bible §4.7** (Motion principles — "slower than default," specific ease curves, `prefers-reduced-motion` mandate).
- Framer Motion is already a project dependency (established in Step 5d for ScrollIndicator; extended in Step 6 for the Nav mobile overlay). No new packages.
- Prerequisite: Step 7c complete. Every visual element in the Hero is now present and correctly styled. Only motion is missing.

### One structural change worth naming: Hero becomes a Client Component

This is the second time in the whole build a component crosses the server-to-client boundary — Nav was the first, in Step 6. The reasoning is the same, applied to a different situation.

Nav needed to be a Client Component because it had to react to *user* events happening in the browser: scroll position, menu open/close. Hero doesn't need to react to user events — but it does need to orchestrate a *time-based* sequence that only makes sense once the page is actually running in a browser. A staggered reveal requires `useEffect` to be able to say "start counting from now"; server-rendered HTML has no concept of "now."

The single `'use client'` directive at the top of `Hero.tsx` is what enables this. Everything else about the component stays the same — same JSX shape, same imports, same content.

### The pattern: Hero orchestrates, components own their own motion

An easy trap here would be to add motion logic to every individual component the Hero renders — the `<Eyebrow>`, the `<Button>`, the `<ScrollIndicator>`. Don't. Those are shared components that get reused across every future section, and none of the other sections want the Hero's exact reveal sequence.

The clean split is:

- **Hero.tsx owns the choreography.** It wraps each element in a `motion.div` with the specific delay and duration from the PRD, and stops there.
- **Each component keeps owning its own internal motion.** `ScrollIndicator` keeps its rotation and its scroll-fade — those are properties of the component, not of the Hero. Hero just controls *when it first appears*.

That way, when Step 8 uses `<Eyebrow>` in the Problem section with a completely different scroll-triggered fade, nothing about the Eyebrow component has to change.

---

## Files this step creates or modifies

**Modifies:**
- `components/sections/Hero.tsx` — adds `'use client'`, wraps each element in a `motion.div`, adds `useReducedMotion` handling

**Creates:**
- `prompts/STEP_07d_Hero_Animation.md` — this file

**Does NOT touch:**
- `components/ui/ScrollIndicator.tsx` — its rotation and scroll-fade behaviour stay exactly as built; Hero only wraps its render for the initial fade-in
- `components/ui/Eyebrow.tsx`, `components/ui/Button.tsx` — no changes; Hero wraps them from outside
- Any other component or config

---

## The timing sequence — PRD §4.1 verbatim

| Element | Delay (from page load) | Duration | Motion |
|---|---|---|---|
| Eyebrow | 0.2s | 500ms | Fade in from `translateY(12px)` |
| Headline Line 1 | 0.4s | 800ms | Fade in from `translateY(12px)` |
| Headline Line 2 (contains the italic accent word inline — no separate motion for it) | 0.55s | 800ms | Fade in from `translateY(12px)` |
| Subheadline | 0.8s | 600ms | Fade in from `translateY(16px)` |
| CTA group (as a single unit) | 1.1s | 500ms | Fade in from `translateY(12px)` |
| Photograph | 1.4s | 900ms | Fade in from `scale(0.98)` to `scale(1)` — no Y translation |
| Scroll indicator | 1.8s | 600ms | Fade in only |

**Ease curve for all entrances:** `cubic-bezier(0.16, 1, 0.3, 1)` — this is the Brand Bible's established entrance ease. In Framer Motion, that's the array `[0.16, 1, 0.3, 1]` passed as the `ease` prop.

**Total sequence length:** ~2.4 seconds from page load to fully settled. This is deliberately slow-ish — the Brand Bible §4.7: *"Slower than default. Our transitions run at 500–800ms with soft easing, not 200ms snap. This is a warmth choice."*

### One trade-off worth naming out loud

Everything starts at opacity 0. The Largest Contentful Paint element (almost certainly the headline or the photograph) doesn't become visible until 400ms–1400ms into page load. This is a small but real Lighthouse LCP hit — you're trading a fraction of a second of measured performance for the brand's choreographed entrance. The PRD already made this call, and 1.4s LCP is still well within "good" (Google's threshold is 2.5s), so it's fine — but worth knowing that when Lighthouse gets run in Step 20's launch-prep pass, this is where any Hero-related LCP delta will come from.

---

## THE PROMPT — paste this into Claude Code

```
You are executing Step 7d of the OTS website build. This step adds the choreographed page-load reveal sequence to the Hero section using Framer Motion, converting Hero.tsx to a Client Component in the process.

Follow this plan exactly. If anything fails or is unclear, pause and report — do not attempt fixes without asking.

CONTEXT:
- components/sections/Hero.tsx currently exists as a Server Component with all visual elements complete (eyebrow, headline, subheadline, CTAs, foot note, photograph, ScrollIndicator).
- Framer Motion is already a project dependency — verify by checking package.json for "framer-motion" before starting. If for any reason it's not present, stop and report; do not npm install unilaterally.
- ScrollIndicator (components/ui/ScrollIndicator.tsx) already owns its rotation and scroll-fade behaviour. Do NOT modify it. This step wraps its render for the initial fade-in only.
- Eyebrow and Button components must not be modified either. Wrap them from outside.
- The Brand Bible entrance ease curve is cubic-bezier(0.16, 1, 0.3, 1), which in Framer Motion is [0.16, 1, 0.3, 1].
- The pattern for prefers-reduced-motion is already established in ScrollIndicator (Step 5d) and Nav's mobile overlay (Step 6). Follow the same pattern here — use Framer Motion's useReducedMotion hook.

TASK 1 — Verify prerequisites.
Report:
- pwd, git status (clean except this step's untracked prompt file), git log --oneline -3 (last commit should be Step 7c's photograph commit)
- Port 3000 check, kill any orphan
- Read package.json, confirm "framer-motion" is present with its version
- Read components/sections/Hero.tsx in full, report its current structure — specifically confirm it is currently a Server Component (no 'use client' directive), and identify each of the six elements that will need motion wrapping: eyebrow, headline line 1, headline line 2, subheadline, CTA group, photograph container, and the ScrollIndicator render
- Read components/ui/ScrollIndicator.tsx briefly, confirm how it self-positions (so you don't accidentally break its positioning when wrapping it in a motion.div in Hero)
- Read how useReducedMotion is imported and used in either components/ui/ScrollIndicator.tsx or wherever the Nav mobile overlay motion lives — you will use the exact same import path and pattern

Pause for my approval before proceeding.

TASK 2 — Convert Hero.tsx to a Client Component and add the reveal sequence.

At the top of components/sections/Hero.tsx:
1. Add 'use client' as the very first line.
2. Import: motion and useReducedMotion from framer-motion (via the same import path used elsewhere in the codebase — check ScrollIndicator or Nav for precedent).

Inside the component:
3. Call useReducedMotion() and assign to a local const shouldReduce.
4. Define a helper (either inline per element or as a small object at the top of the component) that returns the motion props for a given element, respecting shouldReduce:
   - When shouldReduce is true: return props that make the element appear immediately at final state (initial and animate both set to the "at rest" values — opacity 1, y 0, scale 1), with a duration of 0 or near-zero. This ensures reduced-motion users see the page immediately with no motion.
   - When shouldReduce is false: return the full initial + animate + transition with the timing from the spec.

Then wrap the six existing elements. Do NOT change their content, styling, or nesting — only wrap each in a motion.div (or replace the outer div of each with motion.div where one already exists, to avoid an extra DOM node). Timings:

| Element | delay | duration | initial | animate |
|---|---|---|---|---|
| Eyebrow | 0.2 | 0.5 | { opacity: 0, y: 12 } | { opacity: 1, y: 0 } |
| Headline Line 1 | 0.4 | 0.8 | { opacity: 0, y: 12 } | { opacity: 1, y: 0 } |
| Headline Line 2 (the entire line including the accent-word span) | 0.55 | 0.8 | { opacity: 0, y: 12 } | { opacity: 1, y: 0 } |
| Subheadline | 0.8 | 0.6 | { opacity: 0, y: 16 } | { opacity: 1, y: 0 } |
| CTA group (wrap the container holding both buttons, not each button separately — the group animates as one unit) | 1.1 | 0.5 | { opacity: 0, y: 12 } | { opacity: 1, y: 0 } |
| Photograph (wrap the container that holds the next/image and the warm-tone overlay, NOT the column itself, so the grid-break bleed positioning is unaffected) | 1.4 | 0.9 | { opacity: 0, scale: 0.98 } | { opacity: 1, scale: 1 } |
| ScrollIndicator render | 1.8 | 0.6 | { opacity: 0 } | { opacity: 1 } |

Every transition uses ease: [0.16, 1, 0.3, 1].

For the ScrollIndicator wrapping specifically: the motion.div is a non-positioned wrapper. ScrollIndicator continues to absolutely-position itself as before. Confirm this doesn't affect its layout position by verifying in the browser after restart. If wrapping breaks its positioning, revert to wrapping and instead move ScrollIndicator's positioning classes onto the wrapping motion.div, but check first before rearranging.

For the foot note: the PRD spec does not give it its own timing. Group it visually with the CTA reveal — either include it inside the same motion.div wrapper as the CTA group, OR give it the same delay/duration as the CTA group (1.1, 0.5). Whichever fits the existing element grouping in Hero.tsx more cleanly — report which you chose.

Confirm the file was updated and report its new line count and the number of motion.div wrappers introduced.

TASK 3 — Start dev server and verify.
Run npm run dev in the background. Wait 15 seconds. Check whether http://localhost:3000/ and http://localhost:3000/en both return 200. Report any compilation, TypeScript, or Framer Motion errors.

If clean, pause and wait for my browser verification.

TASK 4 — Wait for user verification.
Pause here. I will check:
- On page load, elements appear in the correct order: eyebrow first, then headline line 1, then line 2 (with the italic accent word appearing as part of line 2, not separately), then subheadline, then CTAs (and foot note), then photograph, then scroll indicator
- The timing feels choreographed and calm — no element snaps in abruptly (500-900ms durations, not 200ms snap)
- The italic accent word "better" does not have its own separate animation — it appears as part of line 2's fade
- No visible layout shift during the sequence — elements fade/translate into their final positions, they don't push each other around
- The photograph reveals with a subtle scale (grows very slightly), not just a fade
- ScrollIndicator appears last and immediately begins its rotation (its own existing behaviour)
- Reload the page multiple times — the sequence plays each time cleanly
- With OS "Reduce Motion" enabled (accessibility settings), reloading the page shows everything immediately with no reveal animation — the page is fully usable at t=0
- Nav still behaves correctly (transparent-over-hero, frosted-after-scroll — unchanged from Step 6)

Once I say "verified", proceed to Task 5.

TASK 5 — Stop dev server. Kill orphans. Commit and push.
Run git status and report. Should see:
- Modified: components/sections/Hero.tsx
- New: prompts/STEP_07d_Hero_Animation.md

Stage all: git add -A

Commit with:
feat(step-07d): add Hero page-load reveal sequence with reduced-motion support

Push.

TASK 6 — Final report.

STEP 7d COMPLETE
- File modified: components/sections/Hero.tsx ([new line count] lines, [N] motion.div wrappers added)
- Foot note grouping approach: [inside CTA wrapper / separate wrapper with matching timing / other — describe]
- Dev server: [worked / did not work]
- User verification: [confirmed / not confirmed]
- Reduced motion verification: [confirmed / not tested / N/A]
- Git commit: [hash and message]
- Git push: [succeeded / failed]
- Port 3000: [free at end / occupied]

END OF PROMPT.
```

---

## Acceptance test — what you verify after Claude Code finishes

### Check 1 — Sequence order
Reload the page. Watch the top-to-bottom cascade: eyebrow first, then the two headline lines in quick succession, then subheadline, then CTAs, then photograph, then the scroll indicator. Everything should come in in the right order — if any element beats another to visibility, the delay is wrong.

### Check 2 — Timing feels intentional
This is a subjective check but a real one. The sequence should feel *choreographed* — deliberate, calm, warm. If it feels rushed or snappy, the durations are too short. If it feels sluggish or you find yourself waiting, they're too long. The PRD's values should land it in the right zone; you're gut-checking that they actually did.

### Check 3 — Italic accent word doesn't animate separately
When line 2 (`is a better system.`) fades in, `better` should appear as part of that fade — same time, same motion. If it flashes in or animates independently, that's wrong.

### Check 4 — No layout shift
Watch specifically for elements *pushing each other around* as they appear. Everything is animated with opacity + transform (not top/margin/height), so this shouldn't happen — but confirm it doesn't. If you see the CTAs jump when the photograph appears, something's animating a property it shouldn't.

### Check 5 — Photograph scale is subtle
The photograph goes from `scale(0.98)` to `scale(1)` — that's a 2% grow. It should feel like a gentle settling, not a zoom-in. If it looks like the image is popping toward you, the scale range is off.

### Check 6 — Reduced motion works
This is the check people forget and it matters. Enable "Reduce Motion" in your OS accessibility settings:
- **Windows:** Settings → Accessibility → Visual effects → Animation effects → Off
- **macOS:** System Settings → Accessibility → Display → Reduce motion → On

Reload the page. Every element should be immediately visible at final state, no fades, no translations, no scale. The page should be fully usable at t=0. The Brand Bible mandates this ("All animations must be pausable and respect `prefers-reduced-motion`") — it's not optional.

Toggle it back off when done so you can keep working normally.

### Check 7 — Multiple reloads
Reload 5–10 times in a row. The sequence should play cleanly every time — no stutters, no elements getting stuck at opacity 0, no timing drift.

### Check 8 — No regressions
Nav still behaves correctly, ScrollIndicator's rotation still runs at 8s linear infinite, all copy still renders correctly on both `/` and `/en`.

---

## If this doesn't work

Paste back to me:
1. The exact error message or unexpected behaviour.
2. Which check (1–8) failed.
3. A short screen recording if it's a motion issue — a static screenshot won't capture what's wrong with a reveal sequence.

Do not let Claude Code guess-and-retry more than once on the same error.

---

## What comes next

Once all eight checks pass, come back and say:

> **"Step 7d done. Give me Step 8."**

**Step 8 is the Problem section** — the first section below the Hero. It's the "operational chaos" narrative from the Brand Bible: three observation blocks against a `--cream-deep` background, with the oversized muted numerals as a grid-break moment, and scroll-triggered (not page-load) reveal animations. This is where you leave the Hero behind and start the argument the site is actually making.

You'll also notice from Step 8 onward that the Hero doesn't need to be touched again for many steps — it's a completed section, and the pattern established here (Section component in `components/sections/`, Client Component only when needed, motion via Framer Motion, reduced-motion respected) is the template for everything that follows.

---

**Step 07d · Hero Page-Load Animation · v1.0 (Claude Code-driven)**
*Behind every smooth business is a better system.*
