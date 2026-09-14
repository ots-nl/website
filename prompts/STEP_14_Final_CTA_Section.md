# STEP 14 — Final CTA Section

**Project:** Ontwikkeling Tech Services — Marketing Website
**Type:** Photo sourcing (manual) + Claude Code prompt
**Estimated time:** 30–45 min sourcing + 45–60 min build
**Prerequisites:** Step 13 complete and committed (Team Section). `Button` component (four variants, Step 05b) exists.
**Version:** 1.0

---

## Goal

Build the homepage's closing section (PRD §4.8) — the last conversion moment before the footer. Dark, atmospheric, unhurried. Two-column asymmetric: invitation copy + two CTAs on the left, a single tilted "reward" photograph on the right.

---

## Context

- Design spec: `OTS_Website_PRD_v1.1.md`, Section 4.8 ("Final CTA").
- Image strategy: PRD §9.2 — Final CTA background + card is a **Medium**-priority, Pexels/Unsplash-sourceable image (unlike the founder portraits, this one isn't gated on commissioned photography).
- This is the **second** `--night` (dark) section on the homepage, after How We Work (Step 10). PRD caps night sections at two to three per page — this is fine, don't add a third anywhere else without checking.

---

## Part 1 — Photo Sourcing (do this before running Claude Code)

Two images needed, both saved to `/public/images/`:

| File | Role | What it should look like |
|---|---|---|
| `final-cta-background.webp` | Full-bleed background, sits behind the whole section at low visibility | Warm restaurant interior at night, deliberately out of focus / shallow depth of field. Search: *"restaurant interior warm dark moody"* / *"cozy restaurant night blur bokeh"*. |
| `final-cta-card.webp` | The tilted photo card, right column — this is the "reward" image, not the "problem" image | A plated dish on a wooden table, a warmly lit clinic reception, or a lit desk at dusk — something that feels like an outcome, not a diagnosis. Search: *"plated dish wooden table warm light"* / *"clinic reception warm interior"* / *"desk lamp dusk workspace"*. |

**Sourcing checklist:**

1. Pexels or Unsplash only (per Brand Bible §4.6 sourcing priority — original/commissioned would be better but isn't warranted for a background/mood image at Medium priority).
2. Both images should sit inside the OTS palette — creams, warm browns, warm oranges, deep blacks. Reject anything blue-toned, green-toned (other than the rare `--mist` sage, not relevant here), or high-saturation.
3. Download, rename to the exact filenames above, save to `/public/images/`.
4. Add both to `/public/images/CREDITS.md` with photographer name and source URL, matching the format already used for the Hero and Essay images.
5. Confirm both files exist on disk before starting Part 2 — Claude Code should not be asked to source images itself.

---

## Part 2 — Component Build

### Files to Create or Modify

- `components/sections/home/FinalCta.tsx` — new
- `app/[locale]/page.tsx` — add `<FinalCta />` after `<Team />`
- `messages/nl.json` — add `finalCta` namespace
- `messages/en.json` — add `finalCta` namespace

### Detailed Specification

**Layout:**
- `final-cta-background.webp` full-bleed behind the whole section (`next/image`, `fill`, `object-fit: cover`), with a dark overlay on top — `rgba(14, 11, 8, 0.78)` (roughly `--night` at 78% opacity) — to bring the photo down to the ~22% visible brightness the PRD calls for while keeping text contrast solid. Don't use a CSS `brightness()` filter alone — an overlay gives more predictable contrast for the text sitting on top.
- Section padding: 160px vertical (deeper than every other section — this is deliberate, don't reuse the standard 128px).
- Two-column asymmetric grid: **left 55% / right 45%**, stacks to single column on mobile (photo card below text).

**Left column:**
- Eyebrow: `// Volgende stap` (NL) / `// Next step` (EN) — same eyebrow style as other sections, `--accent`, on top of the dark background so confirm contrast holds.
- H2: Anton, `clamp(56px, 7vw, 96px)`, `--cream`.
  - NL: *"Wanneer je zover bent, zijn wij hier."* — **"hier" in `--accent`**, still Anton (not italic — the italic accent word is already spent on the Hero, don't repeat it here).
  - EN: *"When you're ready, we're here."* — **"here" in `--accent`**.
- Body: Inter 400 18px, `--cream` at 80% opacity, line-height 1.6, max-width 520px, mt-32.
  - NL: *"Een Audit kost €2.500. Het duurt twee weken. Zijn we niet de juiste partner voor jou? Dan zeggen we dat eerlijk aan het eind van het Discovery-gesprek — en verwijzen we je door naar iemand die dat wél is."*
  - EN: *"An Audit is €2,500. It takes two weeks. If we're not the right partner for you, we'll tell you at the end of the Discovery call — and we'll suggest someone who might be."*
- CTA group, mt-48, side-by-side desktop / stacked mobile:
  - Primary: *"Vraag een Audit aan"* / *"Request an Audit"*.
  - Secondary: *"Boek een gesprek van 45 minuten"* / *"Book a 45-min call"*.
  - Reuse the existing `Button` component's primary/secondary variants — don't rebuild button styling here.

**Right column:**
- Single photo card: `final-cta-card.webp`, 400px × 500px, `border-radius: 20px`, `rotate(-2deg)`, `box-shadow: 0 40px 80px rgba(0,0,0,0.4)`.
- This tilt + shadow is the grid-break moment for this section — don't add another oversized/offset element alongside it.
- `next/image` with explicit width/height, meaningful alt text (describe the actual image, e.g. "Plated dish on a warm wooden table" — not "final CTA image").

---

## Ready-to-Paste Prompt for Claude Code

```
Read PRD Section 4.8 (Final CTA) in OTS_Website_PRD_v1.1.md before starting.
Confirm /public/images/final-cta-background.webp and
/public/images/final-cta-card.webp already exist — if either is missing, stop
and tell me; do not source or generate a replacement image yourself.

Build the homepage Final CTA section:

1. Create components/sections/home/FinalCta.tsx:
   - Full-bleed background using next/image with `fill` and `object-fit: cover`
     for final-cta-background.webp, with an overlay div on top at
     rgba(14, 11, 8, 0.78) to bring it down to roughly 22% visible brightness
     while keeping foreground text readable.
   - Section vertical padding 160px (deeper than the standard Section spacing
     used elsewhere — override it locally for this section only).
   - Two-column asymmetric grid, 55% left / 45% right, gap appropriate to the
     column split, collapsing to single column on mobile with the photo card
     stacking below the text.
   - Left column: Eyebrow ("// Volgende stap" / "// Next step"), H2 in Anton at
     clamp(56px, 7vw, 96px) with the last word ("hier" / "here") wrapped in a
     span coloured --accent (still Anton, not italic), body copy in Inter 400
     18px at 80% opacity on --cream, max-width 520px, mt-32, then a CTA group
     (mt-48) using the existing Button component: primary "Vraag een Audit aan"
     / "Request an Audit", secondary "Boek een gesprek van 45 minuten" /
     "Book a 45-min call".
   - Right column: final-cta-card.webp at 400x500, border-radius 20px,
     rotate(-2deg), box-shadow 0 40px 80px rgba(0,0,0,0.4), via next/image with
     explicit dimensions and descriptive alt text.

2. Add a "finalCta" namespace to messages/nl.json and messages/en.json with the
   eyebrow, heading (store the accent word separately if that's cleaner for the
   component to wrap it in a span), body copy, and both CTA labels — use the
   exact NL and EN copy from this prompt file.

3. Add <FinalCta /> to app/[locale]/page.tsx immediately after <Team />.

4. Run the dev server and confirm no TypeScript or console errors, and that the
   background photo, overlay, and text all render with clearly readable
   contrast in both /nl and /en.
```

---

## Acceptance Test

Verify:

1. Section renders after Team on the homepage, both locales — background photo visible but dim, text fully legible against it.
2. H2 renders with the last word in `--accent` colour, rest in `--cream`, all in Anton — no italic anywhere in this heading.
3. Body copy, both CTA buttons, and the eyebrow render correctly in NL and EN.
4. Right-column photo card shows the correct rotation (−2°) and drop shadow; card doesn't overflow or clip awkwardly at any breakpoint.
5. Mobile: layout stacks to single column, photo card appears below the text block, not above.
6. Section padding is visibly deeper than the sections above and below it (160px vs 128px).
7. `/public/images/CREDITS.md` has entries for both new images.
8. No console errors, no TypeScript errors.

---

## If This Doesn't Work

- **Text contrast too low against the photo:** increase the overlay opacity slightly (e.g. to 0.82–0.85) rather than reaching for a heavier CSS filter — the overlay approach is more predictable across different source photos.
- **Photo card rotation causes layout overflow:** the rotated card needs a slightly larger invisible bounding box than its visual 400×500 — wrap it in a container with a bit of extra margin so the shadow and rotated corners don't clip against the section edge.
- **Accent word in the heading breaks the line oddly:** confirm the span around the accent word doesn't force an unwanted line-break — `white-space: nowrap` on just that span, or restructure the heading string so the accent word naturally falls at the line's end, matching the PRD's intent.
- **Images missing:** don't let Claude Code substitute a placeholder or source one on its own — stop, source per Part 1, then re-run.
- **Paste the exact error, the file Claude Code produced, and "Step 14" back to Claude if anything else breaks.**

---

*Behind every smooth business is a better system.*
