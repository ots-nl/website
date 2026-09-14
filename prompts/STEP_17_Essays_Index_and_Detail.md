# STEP 17 — Essays Index + Detail

**Project:** Ontwikkeling Tech Services — Marketing Website
**Type:** Content decision + Claude Code prompt
**Estimated time:** 90–120 minutes
**Prerequisites:** Step 16 complete (Services page). `content/` directory not yet created — this step introduces it.

---

## Goal

Build `/essays` (index) and `/essays/[slug]` (detail) per PRD §6, and get the site's first real long-form essay live — not a placeholder, an actual piece that can go out under Deepak's name.

---

## Context — a content decision, not just a build decision

Essay content isn't something to fabricate inside a build prompt — it's real editorial work, same category as Sneha's job description on the team. But blocking the whole pipeline on three finished essays would delay proving the templates work at all. So this step ships with **one real essay**, attached below, and explicitly does not fake the other two.

**The essay:** *"Je reserveringen komen binnen via zes kanalen. Dat is het probleem, niet de drukte."* — it extends the homepage Problem section's first observation (already live since Step 4) into a full 1,600-word piece. No fabricated statistics, no invented client story — it's reasoning and framework, which is exactly what the Brand Bible's "no fabricated case studies" rule leaves room for. It maps to `essay-reservations.jpg`, already sourced back in Step 12b.

**What's still open:** PRD §4.6 requires a minimum of three essays before launch, but is explicit that *"if the third essay is not ready, the section renders with two essays, not three placeholders."* Two more essays are needed before launch — one on the Audit/diagnosis process (maps to `essay-audit.jpg`), one on why standalone chatbots don't solve the underlying problem (maps to `essay-chatbots.jpg`, ties directly to the "What We Refuse" list already live on the Services page). Both need real authorship — from Sneha, or from you — before this section can call itself done. This step builds the pipeline so dropping in essay #2 and #3 later is a content task, not an engineering one.

---

## Files to Create or Modify

- `content/essays/reserveringen-zes-kanalen.mdx` — the essay content (provided below, ready to paste)
- `lib/mdx.ts` — MDX loading/parsing utility (per PRD §11 file structure)
- `app/[locale]/essays/page.tsx` — Essays index
- `app/[locale]/essays/[slug]/page.tsx` — Essay detail
- `components/sections/essays/EssayCard.tsx` — reusable preview card (used on both the index and, ideally, refactored into what the homepage's Recent Essays section already uses — check Step 12's component first rather than duplicating)
- `components/sections/essays/EssayFilterBar.tsx`
- `messages/nl.json` / `messages/en.json` — `essays` namespace (page chrome text, not the essay content itself — that lives in the MDX frontmatter)

---

## The Essay Content

Save this exact file to `content/essays/reserveringen-zes-kanalen.mdx`:

```
---
title: "Je reserveringen komen binnen via zes kanalen. Dat is het probleem, niet de drukte."
slug: "reserveringen-zes-kanalen"
category: "Hospitality"
author: "Deepak"
date: "2026-04-01"
readTime: "9 min"
deck: "De meeste restaurants verliezen geen omzet door te weinig gasten. Ze verliezen omzet doordat niemand precies weet wie er komt, wanneer, en via welk kanaal ze het hebben laten weten."
heroImage: "essay-reservations.jpg"
---

[Full body — see content_essay_reserveringen.mdx, attached separately.
Paste the complete file content here; it includes two H2 sections, one H3,
one blockquote, and one bulleted list, which is exactly what's needed to
prove every element of the article-body typography spec renders correctly.]
```

**Frontmatter fields drive the meta line, index card, and detail page automatically** — don't hardcode any of title/category/author/date/readTime anywhere else; read them from the MDX frontmatter so essay #2 and #3 only require dropping in a new file.

---

## Detailed Specification

### Essays Index (`/essays` / `/en/essays`)

- Header: eyebrow *"// Essays"*, H1 Anton *"Systemen, denken, en de bedrijven erachter."* (NL) / *"Systems, thinking, and the businesses behind them."* (EN), subhead max-width 640px.
- Filter bar: pills for All / Hospitality / Health / Professional / Systems thinking — Inter 500 13px, 999px radius, `--accent` background + `--cream` text when active, `--rule` border + `--ink` text when inactive. **With only one essay live, the filter bar still renders** (it's part of the page chrome, not conditional on essay count) but only "All" and "Hospitality" will show any results — that's expected, not a bug, until more essays exist.
- Grid: 2-column desktop, single column mobile, 64px gap.
- Card: 4:3 photo, `border-radius: 20px`, meta line, Anton 32px title, 3-line-clamped excerpt, read link. Hover: photo scales to 1.03, title shifts to `--accent`.

### Essay Detail (`/essays/[slug]`)

- 720px centred article column, 96px top / 128px bottom padding.
- Meta line → H1 (Anton, `clamp(40px, 6vw, 88px)`) → deck (Inter 300 22px) → hero photo (3:2, `border-radius: 20px`, mt-64 mb-64) → body (Inter 400 18px, 1.7 line-height, H2s in Anton 32px, H3s in Anton 22px, blockquotes in Cormorant Garamond Italic with `--accent` left border) → one centred asterisk break → signature line (*"— Written by Deepak Sharma, Founder at OTS"*) → CTA card (`--cream-deep`, *"Herken je dit in je eigen bedrijf?"* / *"Recognize this in your own business?"*, links to Audit) → related essays grid (will show 0 items for now with only one essay live — hide the section entirely if there are fewer than 2 related essays available, don't render an empty grid).

### MDX rendering

Use whatever MDX toolchain fits this Next.js 16 / App Router setup cleanly — `next-mdx-remote` or `@next/mdx` are both reasonable; pick one, don't half-implement both. Frontmatter parsing via `gray-matter` is the standard pairing.

---

## Ready-to-Paste Prompt for Claude Code

```
This prompt is self-contained — full spec above, no need to look for a PRD
file in the repo.

1. Set up the MDX content pipeline:
   - Create content/essays/ and save the provided essay content to
     content/essays/reserveringen-zes-kanalen.mdx exactly as given (the full
     body text is in the attached content_essay_reserveringen.mdx file —
     use that verbatim, including frontmatter).
   - Create lib/mdx.ts with functions to read all essays from
     content/essays/, parse frontmatter (gray-matter or equivalent), and
     return both the list (for the index) and a single essay by slug (for
     the detail page). Pick one MDX rendering approach (next-mdx-remote or
     @next/mdx) and use it consistently — don't mix.

2. Before building a new EssayCard component, check whether Step 12's
   homepage Recent Essays section already has a reusable card component.
   If it does, extract/reuse it for the Essays index rather than
   duplicating — the index card is described as "same structure... but
   larger," which should be a size variant, not a separate component.

3. Build app/[locale]/essays/page.tsx (Essays index) per the spec: header,
   filter bar (renders even with only one essay matching most filters —
   that's expected), 2-column grid collapsing to 1 on mobile.

4. Build app/[locale]/essays/[slug]/page.tsx (Essay detail) per the spec:
   meta line, H1, deck, hero photo, MDX-rendered body with all typographic
   variants (H2, H3, blockquote, list) styled per spec, one asterisk break,
   signature line, CTA card linking to the Audit section on /diensten, and
   a related-essays grid that's hidden entirely (not rendered empty) when
   fewer than 2 other essays exist.

5. Add an "essays" namespace to messages/nl.json and messages/en.json for
   all page chrome (headers, filter labels, CTA card text) — NOT the essay
   content itself, which stays in the MDX frontmatter/body and doesn't need
   translation infrastructure yet since there's only one essay and it's
   Dutch-only for now (translating essay content is a separate, larger task
   — flag it, don't attempt it in this step).

6. Cross-check: the homepage's Recent Essays section (Step 12) links to
   essay slugs that were placeholders before this page existed. Update at
   least one of those three homepage cards to point to the real
   reserveringen-zes-kanalen slug so there's one genuine end-to-end path
   from homepage to a real published essay. Report what the other two
   homepage card slugs currently point to, since they'll 404 until essays
   #2 and #3 exist.

7. Run tsc --noEmit, confirm no console errors, confirm the essay renders
   correctly with all typography variants visible (check the blockquote
   and the list specifically — those are the two elements most likely to
   inherit wrong default styling from a generic MDX renderer).
```

---

## Acceptance Test

Verify:

1. `/essays` renders the index with the filter bar and exactly one essay card.
2. Clicking the card lands on `/essays/reserveringen-zes-kanalen` with the full article rendering correctly — check the blockquote specifically renders in Cormorant Garamond italic with the accent left border, not default `<blockquote>` browser styling.
3. The list ("Drie vragen die het probleem blootleggen") renders as a proper numbered list, not stripped of its numbering by the MDX pipeline (a common default-styles gap).
4. Asterisk break, signature line, and CTA card all render at the bottom.
5. Related essays grid is absent entirely (not an empty box) since there's only one essay.
6. At least one homepage Recent Essays card now links to this real essay and works end to end.
7. `tsc --noEmit` clean, no console errors, both locales load without crashing (even though essay content itself is Dutch-only for now).

---

## If This Doesn't Work

- **MDX strips list numbering or blockquote styling:** this is the most common MDX gotcha — the renderer needs explicit custom components mapped to each HTML element (`h2`, `blockquote`, `ul`, `ol`) rather than relying on default MDX output, since Tailwind's typography reset removes most default browser styling. Map custom components per element rather than trying to override with global CSS.
- **Related essays section renders as an empty gray box:** confirm the component has an explicit early return / conditional render for `relatedEssays.length < 2`, not just an empty `.map()` over zero items.
- **English essay page 404s or shows Dutch content unexpectedly:** that's expected for now — the content stays Dutch-only until it's actually translated, which is future work, not part of this step.
- **Paste the exact error, the file Claude Code produced, and "Step 17" back to Claude if anything else breaks.**

---

## Before this can be called done

Two more essays, not two more prompts. Both need real authorship:

- **Essay #2** — the Audit/diagnosis process, mapping to `essay-audit.jpg`.
- **Essay #3** — why standalone chatbots don't solve the underlying problem, mapping to `essay-chatbots.jpg` and tying directly into the "What We Refuse" list on the Services page.

Once those exist as `.mdx` files with the same frontmatter shape, they drop into `content/essays/` and the index/detail pages pick them up automatically — no further engineering step required. Worth putting on Sneha's plate now rather than treating it as a late-stage blocker the way founder photography became.

---

*Behind every smooth business is a better system.*
