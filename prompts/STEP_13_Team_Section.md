# STEP 13 — Team Section

**Project:** Ontwikkeling Tech Services — Marketing Website
**Type:** Claude Code prompt
**Estimated time:** 45–60 minutes
**Prerequisites:** Step 12b complete and committed (Essay Preview Photographs). `Container`, `Section`, `Eyebrow` components exist. i18n (`next-intl`) working with `nl.json` / `en.json`.
**Version:** 1.0

---

## Goal

Build the homepage Team section (PRD §4.7) — the human layer that proves OTS is three named founders and a real team, not an anonymous agency. Two-column asymmetric layout: intro + CTA on the left, three founder cards on the right.

---

## Context

- Design spec: `OTS_Website_PRD_v1.1.md`, Section 4.7 ("The Team").
- Design tokens: `04_-_Brand_Bible.md`, §4.2–4.4 (colour, shape, form).
- Photography standard: Brand Bible §4.6 — no corporate headshots, no stock, no AI-generated imagery.

**Founder portrait status: not yet commissioned.** This was flagged as a likely blocker back in Step 0 planning, and it's arrived. Virat's decision: **skip real photography for now, ship this step with a text-based placeholder, swap in real portraits later** — no separate placeholder-tracking step needed. This is the right call: it keeps momentum on the build without pretending a stock photo is a real founder, which is exactly what the Brand Bible rules out. Treat the placeholder as genuinely temporary — it should look like a deliberate design choice, not a broken image icon.

**Placeholder treatment:** an initial-letter mark, not a silhouette or generic icon. Each card gets a solid-colour block at the same 4:5 aspect ratio and 16px radius the real photo will eventually occupy, with the founder's first initial centred in Anton at large scale. Rotate through three of the existing design tokens so the three cards read as distinct people, not a repeated pattern.

---

## Files to Create or Modify

- `components/sections/home/Team.tsx` — new
- `components/shared/InitialAvatar.tsx` — new, reusable placeholder (this shape will recur — About page team grid in Step 18 needs the same thing for six more people)
- `app/[locale]/page.tsx` — add `<Team />` between Essays Preview and Final CTA
- `messages/nl.json` — add `team` namespace
- `messages/en.json` — add `team` namespace

---

## Detailed Specification

### Layout

- Background: `--cream`.
- Section padding: 128px vertical (`Section` component default — confirm it already applies this).
- Two-column asymmetric grid: **left 40% / right 60%**, gap 64px desktop. Stacks to single column on mobile, left content above right grid.

### Left column

- Eyebrow: `// Het team` (NL) / `// The team` (EN).
- H2: Anton, `clamp(40px, 5vw, 72px)`, `--ink`.
  - NL: *"Negen mensen. Eén standaard."*
  - EN: *"Nine people. One standard."*
- Subhead: Inter 400 17px `--ink-soft`, max-width 400px, mt-24.
  - NL: *"OTS is opgericht door drie mensen — Virat, Ankur en Deepak. We werken met een team van zes door heel Nederland en India. Elk project wordt geleverd door mensen met een naam, niet door 'het team'. Je weet precies wie jouw systeem bouwt."*
  - EN: *"OTS is founded by three people — Virat, Ankur, and Deepak. We work with a team of six across the Netherlands and India. Every project is delivered by named people, not by 'the team.' You will know exactly who is building your system."*
- CTA: ghost link, Inter 500 15px `--ink`, arrow suffix, mt-32.
  - NL: *"Ontmoet het hele team →"* / EN: *"Meet the whole team →"*
  - Links to `/over-ons` (NL) / `/en/about` (EN). **This route doesn't exist until Step 18 — that's expected.** Build the link now; it 404s until then. Don't skip it or point it at `#`.

### Right column — founder grid

- Three cards, equal width, 24px gap, single row desktop → stacked single column mobile (breakpoint: match whatever the Verticals section (Step 11) used for its three-column → single-column collapse, for consistency).
- Each card:
  - `InitialAvatar`, aspect ratio 4:5, `border-radius: 16px`.
  - Below (mt-20): name — Anton 22px `--ink`; role — Inter 500 13px `--accent`, mt-4; description — Inter 400 14px `--ink-soft`, mt-12, max 2 lines (`line-clamp-2`).

### `InitialAvatar` component

Props: `initial: string`, `variant: 'cream-deep' | 'night-soft' | 'accent-tint'`.

- Fills the 4:5 box, `border-radius: 16px`, `display: flex`, centred content.
- Background per variant token.
- Initial letter: Anton, sized to roughly 40% of the box height, colour chosen for contrast against its variant (`--ink` on `cream-deep`/`accent-tint`, `--cream` on `night-soft`).
- `role="img"` with `aria-label` set to the founder's full name (not just "avatar" — screen readers should hear the actual name, since this stands in for a portrait).
- No border, no icon, no silhouette. This is a colour-and-type mark, deliberately graphic rather than trying to imitate a photo.

### Founder content (order matches PRD table — Deepak, Ankur, Virat)

| Card | Initial | Variant | Name | Role (NL / EN) | Description (NL / EN) |
|---|---|---|---|---|---|
| 1 | D | `cream-deep` | Deepak | Commercieel & Vertrouwen / Commercial & Trust | NL: *"Nederland-anker. Draagt de klantrelatie van eerste bericht tot getekende opdracht."* EN: *"Netherlands anchor. Owns the client relationship from first message to signed engagement."* |
| 2 | A | `night-soft` | Ankur | Levering & Operatie / Delivery & Operations | NL: *"De brug tussen technische bouw en klantresultaat. Verantwoordelijk voor elke levering."* EN: *"The bridge between technical build and client outcome. Owns every delivery."* |
| 3 | V | `accent-tint` | Virat | Product & Technische Richting / Product & Technical Direction | NL: *"Langetermijn technisch bouwer. Verantwoordelijk voor architectuur en de richting van het toekomstige platform."* EN: *"Long-term technical builder. Owns architecture and the direction of the eventual platform."* |

---

## Ready-to-Paste Prompt for Claude Code

```
Read PRD Section 4.7 (The Team) in OTS_Website_PRD_v1.1.md and Brand Bible §4.2–4.4 for design tokens before starting.

Build the homepage Team section:

1. Create components/shared/InitialAvatar.tsx — a reusable placeholder component
   for a person's portrait, since real founder photography isn't ready yet.
   Props: initial (string), variant ('cream-deep' | 'night-soft' | 'accent-tint').
   Renders a div at 4:5 aspect ratio, border-radius 16px, background set from the
   variant's CSS custom property, with the initial letter centred in the Anton font
   at roughly 40% of the box height. Text colour: --ink on cream-deep and
   accent-tint variants, --cream on night-soft. Add role="img" and an aria-label
   prop (pass the full name through, not just "avatar"). No border, no icon.

2. Create components/sections/home/Team.tsx:
   - Background --cream, standard Section vertical padding.
   - Two-column asymmetric grid, 40% left / 60% right, 64px gap, collapsing to
     single column on mobile (left content stacks above the founder grid).
   - Left column: Eyebrow ("// Het team" / "// The team"), H2 (Anton, clamp(40px,
     5vw, 72px)), subhead (Inter 400 17px, --ink-soft, max-width 400px, mt-24),
     ghost-link CTA to /over-ons (NL) or /en/about (EN) with an arrow suffix, mt-32.
   - Right column: three founder cards in a row (24px gap, stacks to single column
     on mobile at the same breakpoint the Verticals section uses), each with an
     InitialAvatar, then name (Anton 22px), role (Inter 500 13px, --accent, mt-4),
     and a 2-line-clamped description (Inter 400 14px, --ink-soft, mt-12).
   - Founder order and content: Deepak (initial D, variant cream-deep), Ankur
     (initial A, variant night-soft), Virat (initial V, variant accent-tint).
     Use the exact NL and EN copy from the PRD table in this prompt file for each
     founder's role and description.

3. Add a "team" namespace to messages/nl.json and messages/en.json containing all
   the copy above (eyebrow, heading, subhead, CTA label, and per-founder role +
   description). Match the nesting/key style already used by the essaysPreview
   namespace from Step 12 for consistency.

4. Add <Team /> to app/[locale]/page.tsx between the Essays Preview section and
   the Final CTA section (Final CTA doesn't exist yet — just add Team as the last
   section in the file for now).

5. Run the dev server and confirm no TypeScript or console errors.

Do not attempt to source, generate, or fake real photographs for the founders —
the InitialAvatar placeholder is the intended, final-for-now treatment. Do not
create the /over-ons or /en/about pages — the CTA link is expected to 404 until
Step 18.
```

---

## Acceptance Test

Verify:

1. Team section renders below Essays Preview on the homepage in both `/nl` (or `/`) and `/en`.
2. Left column shows eyebrow, heading, subhead, and CTA link — text switches correctly between NL and EN.
3. Right column shows three cards in a row on desktop, each with a distinct-coloured `InitialAvatar` (D / A / V) at 4:5 aspect ratio with 16px rounded corners — no two cards look identical.
4. Name, role (in `--accent` colour), and description render under each avatar; long descriptions clip at 2 lines rather than overflowing.
5. Resize to mobile width: layout stacks to a single column, left content above the founder grid, founder cards stack single-column.
6. Inspect an `InitialAvatar` in devtools: confirm `role="img"` and `aria-label` contain the founder's actual name, not a generic string.
7. Click the "Meet the whole team" / "Ontmoet het hele team" link — confirms it 404s (expected; not a bug) rather than pointing at `#` or being missing.
8. No console errors, no TypeScript errors.

---

## If This Doesn't Work

- **Grid ratio looks off (not 40/60):** check the parent grid uses fixed fractional widths (e.g. `grid-template-columns: 2fr 3fr` desktop) rather than `flex` with unconstrained children — flex will let content width fight the ratio.
- **Avatar text not centred or wrong size:** the initial should scale with the box, not be a fixed px value — use a relative unit (`clamp()` or a percentage-based approach) so it holds proportion if the card width changes at different breakpoints.
- **aria-label missing or generic:** confirm the `name` prop is actually threaded from `Team.tsx` into `InitialAvatar`, not hardcoded to "avatar" inside the component.
- **Link to /over-ons throws a build error instead of a clean 404:** in Next.js App Router a missing route should soft-404 at runtime, not fail the build. If it fails the build, check you're using a plain `<Link href="/over-ons">`, not something that tries to resolve the route at build time.
- **Paste the exact error, the file Claude Code produced, and "Step 13" back to Claude if anything else breaks.**

---

*Behind every smooth business is a better system.*
