# HOMEPAGE QA — Pre-Phase-4 Check

**Project:** Ontwikkeling Tech Services — Marketing Website
**Type:** Verification pass — not a Claude Code build prompt
**Estimated time:** 20–30 minutes
**Purpose:** Fourteen sections + footer were built one prompt at a time across many sessions. This is the first look at all of them together. Better to catch drift now than mid-way through the Services page build.

---

## How to run this

Start the dev server. Go through each row below in order, in the browser, at the listed breakpoint and locale. Tick as you go. Anything that fails, note it — don't fix inline. At the end, batch everything you found into one message back to Claude, and it'll come back as either quick fixes or a short numbered prompt for Claude Code, whichever fits.

---

## Pass 1 — Desktop, `/nl`, top to bottom

- [ ] **Nav:** transparent over Hero, frosted cream after 80px scroll. Language toggle shows `--accent` on the active side (Step 6's flagged near-black issue — check if it's actually fixed or still open).
- [ ] **Hero:** headline reveal animation runs once on load, doesn't re-trigger on scroll-back-up. "beter" (or whichever word carries it) is the only italic accent word on the whole page — check nothing else on the page is also italic-accented.
- [ ] **Problem section:** numerals 01/02/03 sit at low-opacity `--accent-tint`, offset into the left margin. Text is Dutch, not the PRD's placeholder English.
- [ ] **What We Do:** three cards equal height regardless of copy length. Hover lifts the card and turns the border `--accent`.
- [ ] **How We Work:** `--night` background. Dashed connecting line visible between the four step circles on desktop.
- [ ] **Verticals:** three-column grid, centered header.
- [ ] **Essays Preview:** real photos (Step 12b), not placeholders.
- [ ] **Team:** three `InitialAvatar` placeholders, distinct colours (D/A/V), initials centered regardless of viewport width.
- [ ] **Final CTA:** background photo dim but the tilted card photo clearly visible; heading's accent word colored but not italic; period after "hier"/"here" is NOT accent-colored (Step 14's fix — confirm it held).
- [ ] **Footer:** four columns, trust line reads `KVK 42027611 · BTW NL005440779B20 · Amsterdam` exactly, no WhatsApp/address line, single accent asterisk bottom-right of the bottom bar.

## Pass 2 — Desktop, `/en`, same order

- [ ] Same checklist as Pass 1, but confirm every section actually switched language — not just the ones you'd expect to check. Easy to miss one string that's still Dutch inside an otherwise-English page.
- [ ] Footer trust line is the identical string as `/nl` (KVK/BTW/city shouldn't be "translated" or reformatted).
- [ ] Tagline in the footer ("Behind every smooth business is a better system.") is identical in both locales — confirm it wasn't accidentally translated somewhere along the way.

## Pass 3 — Mobile width (375px), `/nl` only is fine here

- [ ] Nav collapses to hamburger, full-viewport overlay opens correctly, closes correctly.
- [ ] Every two/three-column section collapses to single column in the right order (text before image where specified, not after).
- [ ] Team's founder cards stack single-column.
- [ ] Final CTA's photo card appears *below* the text, not above.
- [ ] Footer stacks to single column, still no visual gap where WhatsApp/address would be.
- [ ] No horizontal scroll anywhere on the page — this is the most common thing that slips through single-section testing.

## Pass 4 — Console and network, either locale

- [ ] Open devtools console, reload the page fully. Zero errors, zero warnings (React key warnings are easy to miss when testing section-by-section).
- [ ] Network tab: confirm no 404s for anything that's supposed to exist (images, fonts) — 404s for `/over-ons`, `/contact`, etc. are expected and fine, don't flag those.
- [ ] `tsc --noEmit` clean from a fresh terminal, not just relying on the last session's result.

## Pass 5 — Cross-section consistency (the stuff single-section QA can't catch)

- [ ] Only **one** `--night` (dark) section other than the Final CTA and How We Work — confirm nothing else went dark by accident.
- [ ] Only **one** italic accent word on the whole homepage (Hero).
- [ ] Only **one** grid-break/oversized element per section — skim for any section that has two competing focal points.
- [ ] Section vertical padding reads consistently rhythmic scrolling top to bottom — Final CTA should feel *deeper* than the others (160px vs 128px), not by accident but because you can feel it.
- [ ] No section's background color repeats back-to-back (e.g., two `--cream` sections in a row with no `--cream-deep` or `--night` between them to create rhythm) unless the PRD's section order specifically calls for it — check against PRD §3.2's table if something looks off.

---

## What to send back

For each failed checkbox: which section, which locale/breakpoint, and what you saw vs. expected. A screenshot helps more than a description for anything visual. I'll batch the fixes into however many prompts make sense — probably one for anything trivial, separate ones for anything that touches a shared component (since that could ripple into pages you haven't built yet).

---

*Behind every smooth business is a better system.*
