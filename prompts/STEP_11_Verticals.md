# STEP 11 — The Verticals Section

**Project:** Ontwikkeling Tech Services — Marketing Website
**Type:** Claude Code prompt
**Estimated time:** 45–60 minutes
**Owner:** Virat
**Version:** 1.0
**Phase:** 3 — Navigation and Homepage

---

## Goal

Build the Verticals section: the fifth homepage section. A centred header ("Three industries. Deep, not broad.") sits above three equal-width cards for Hospitality, Health & Wellness, and Professional Services. Each card carries one small custom SVG icon, a title, one paragraph on what "system" means for that vertical, and a short list of the standard systems OTS builds there.

The point of the section is signalling: OTS is not a generic agency. It works with three specific kinds of business, deeply — and refuses everything else.

---

## Context

- References **PRD v1.1 §4.5** (Verticals section spec, verbatim structure).
- Cross-references **Services Bible §3** for the standard systems per vertical and **Services Bible §5** for the "verticals we serve / verticals we refuse" positioning.
- Prerequisite: Step 10 complete. HowWeWork dark-background section is live.
- Component library: `Section`, `Container`, `Eyebrow` — all reused.

### Two things worth naming before you start

**1. First time icons enter the site.** The Brand Bible is explicit about how OTS handles iconography (§4.5):

> *"All icons are custom SVGs, written or drawn in-house. Never a Lucide library, never Heroicons, never Font Awesome. Style: single-weight line at 1.5px stroke on a 24px grid. Rounded caps. Sparse detail. Icons never carry the message. Text carries the message. Icons decorate at most."*

That's a real constraint with a specific implementation implication: **don't `npm install` a Lucide-icons or Heroicons package for this step, even though it would be one line of code to do so.** The three icons this section needs — a wine glass, a stethoscope arc, and a folio — get hand-written as inline SVG. I've drafted them in the spec below. They're rough; if you look at any of them rendered and it feels off, tune the path values, don't reach for a library.

If more sections start needing icons, we can extract them into a shared `components/ui/Icons.tsx` file at that point. For three icons in one section, inline SVG is simpler.

**2. First centred-header section.** Every prior section has used an asymmetric left/right layout (40/60 or 45/55). This one puts the header dead centre — eyebrow, H2, and subhead all `text-center` with the subhead capped at `max-w-[640px]` and horizontally centred. This is a deliberate rhythmic change: after four asymmetric sections, a centred moment gives the page a different heartbeat. Don't overthink it — it's just alignment classes — but it's worth understanding *why* the PRD asks for it (the section is a declarative statement, not a narrative, and centred typography reads more declarative than left-aligned).

### Content flags (running total: 5 unreviewed drafts, and I mean it now)

- **H2:** English is given by PRD (*"Three industries. Deep, not broad."*). Dutch drafted here — *"Drie sectoren. Diep, niet breed."*
- **Subhead:** Neither language is specified by PRD (the spec gives shape but no words). Drafted in both languages here.
- **Card titles, bodies, and system lists:** Dutch card bodies are verbatim PRD. Titles and system-list wordings drafted in both languages.

That takes the running count to **5 unreviewed Dutch drafts** across the homepage. This is now genuinely urgent. **Send Deepak a batch review request today** — one 30-minute Zoom or a shared Google Doc with all five in one place. Not the day before launch. This week. If not this week, at least tell me you've scheduled it, so I stop noting it in every step file.

---

## Files this step creates or modifies

**Creates:**
- `components/sections/Verticals.tsx` — Client Component (uses `whileInView`)
- `prompts/STEP_11_Verticals.md` — this file

**Modifies:**
- `app/[locale]/page.tsx` — imports `<Verticals />` and renders after `<HowWeWork />`
- `messages/nl.json` — adds `verticals` namespace
- `messages/en.json` — adds `verticals` namespace

**Does NOT touch:**
- Any shared component — all consumed unchanged
- `Section.tsx` — `cream` background is already the default
- Any npm dependencies — no icon library, no new packages, nothing

---

## The copy — verbatim, both languages

**Header eyebrow:**
- NL: `// Waar we het beste in zijn`
- EN: `// What we specialise in`

**Header H2:**
- NL *(draft — pending Deepak review)*: `Drie sectoren. Diep, niet breed.`
- EN: `Three industries. Deep, not broad.`

**Header subhead:**
- NL *(draft — pending Deepak review)*: `Drie sectoren die we door en door kennen. Geen vier, geen twaalf — drie, en we gaan diep.`
- EN *(draft — pending Deepak review)*: `Three industries we know intimately. Not four, not a dozen — three, and we go deep.`

**Card 01 — Hospitality:**
- Title NL: `Restaurants & horeca.` / EN: `Restaurants & hospitality.`
- Body NL *(verbatim PRD)*: `Reserveringen die niet zoekraken. Gasten die geen commissie kosten. Herinneringen die zichzelf versturen. Alles wat er tussen "wij hebben een tafel vrij" en "kom nog eens terug" gebeurt.`
- Body EN *(draft)*: `Reservations that don't get lost. Guests who don't cost commission. Reminders that send themselves. Everything that happens between "we have a table" and "come back again."`
- Systems list (identical in both locales — these are internal product names):
 - `Reservation-to-Review System`
 - `Front-of-House Operations`
 - `Supplier & Inventory OS`

**Card 02 — Health & Wellness:**
- Title NL: `Klinieken & praktijken.` / EN: `Clinics & practices.`
- Body NL *(verbatim PRD)*: `Patiëntenintake zonder papierwerk. Herinneringen die de no-show ratio halveren. Follow-up die niet wordt vergeten. Systemen die zorg mogelijk maken in plaats van administratie.`
- Body EN *(draft)*: `Patient intake without paperwork. Reminders that halve the no-show rate. Follow-up that doesn't get forgotten. Systems that make care possible instead of administration.`
- Systems list:
 - `Patient Intake & Retention`
 - `Clinical Operations`
 - `No-show Recovery`

**Card 03 — Professional Services:**
- Title NL: `Accountants, adviseurs, kantoren.` / EN: `Accountants, advisors, firms.`
- Body NL *(verbatim PRD)*: `De weg van offerte naar factuur, zonder één handmatige stap ertussen. Deliverables die op tijd komen. Klanten die zichzelf verlengen omdat de dienst zichzelf herhaalt.`
- Body EN *(draft)*: `From quote to invoice, without a single manual step in between. Deliverables that arrive on time. Clients who renew themselves because the service repeats itself.`
- Systems list:
 - `Client Lifecycle OS`
 - `Internal Knowledge & Delivery`
 - `Proposal-to-Renewal`

---

## The three custom SVG icons

Written to the Brand Bible §4.5 spec: 24×24 viewBox, single 1.5px stroke, rounded caps, `currentColor` so the fill/stroke follows the parent's colour. Rendered at 32×32 in the card, in `--accent`.

**Hospitality — stylised wine glass:**

```jsx
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
  <path d="M8 3h8l-1 6a3 3 0 0 1-6 0L8 3z" />
  <line x1="12" y1="15" x2="12" y2="21" />
  <line x1="8" y1="21" x2="16" y2="21" />
</svg>
```

**Health — stylised stethoscope arc:**

```jsx
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
  <path d="M6 3v6a5 5 0 0 0 10 0V3" />
  <path d="M11 14v3a4 4 0 0 0 8 0v-1" />
  <circle cx="19" cy="14" r="2" />
</svg>
```

**Professional services — stylised folio:**

```jsx
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
  <path d="M6 4h9l3 3v13a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z" />
  <path d="M15 4v3h3" />
</svg>
```

If any of these render awkwardly when you see them, adjust the path values directly in `Verticals.tsx`. They're deliberately simple — 3-4 SVG primitives each. Don't reach for an icon library to "fix" a stroke you don't like; the whole point of the Brand Bible's rule is that OTS's iconography looks handmade and specific, not templated.

---

## Detailed specification (PRD §4.5)

**Section wrapper:**
- `<Section background="cream">` (default — omit the prop if `cream` is Section's default).
- Vertical padding: `128px` on desktop (Section's default).

**Header (full-width, centred):**
- All three elements — eyebrow, H2, subhead — centred horizontally.
- Eyebrow: `<Eyebrow>` component, plain variant, `text-center` on its parent. PRD says accent-coloured (the default for plain variant, no override needed).
- H2: same `type-h2` utility used in Problem/WhatWeDo/HowWeWork. Colour `--ink`. `text-center`. No manual line break — the H2 is short enough to sit on one or two lines naturally depending on viewport.
- Subhead: Inter 400 18px, colour `--ink-soft`, line-height 1.6, `max-w-[640px]`, centred (`mx-auto text-center`). `mt-6` below the H2.

**Cards row (three equal columns below the header):**
- `mt-20` (80px) below the header.
- Grid: `grid-cols-1 md:grid-cols-3 gap-8` (32px gap).
- Each card `min-h-[420px]` (or whatever height allows all three to align cleanly with the longest content — smaller than the Service Ladder's 480px because there's no photograph).

**Card structure (identical for all three, only content changes):**

- Container: `flex flex-col`, `bg-cream-deep`, `rounded-[20px]`, `p-10` (40px internal padding), **no border** (per PRD spec — different from Service Ladder cards which have a border).
- Icon at top: 32×32 wrapper (`w-8 h-8`), `text-accent`. The icon inherits `currentColor`, so setting the parent to `text-accent` colours the SVG orange.
- Title: Anton, 28px, `--ink`, `mt-8` (32px below the icon).
- Body: Inter 400 15px, `--ink-soft`, line-height 1.6, `mt-4` (16px below the title).
- Systems list: pushed to the bottom of the card with `mt-auto pt-8`. Each item Inter 400 13px, `--muted`, listed vertically with `space-y-1.5` (6px vertical rhythm). Rendered as a `<ul>` for semantic correctness, with `list-none` (no bullets — PRD doesn't specify custom markers here, unlike the "What we refuse" section elsewhere).

**No hover state, no click target:**
- Vertical cards are informational, not interactive. They don't link anywhere. No border-colour transition, no lift, no cursor pointer. This is a deliberate contrast from the Service Ladder cards, which ARE clickable — the difference in interaction affordance tells the visitor which cards are for exploring further and which are for reading.

**Motion (scroll-triggered — same pattern as WhatWeDo cards):**
- Header (all three centred elements): static, no scroll animation.
- Each card: `initial={{ opacity: 0, y: 24 }}`, `whileInView={{ opacity: 1, y: 0 }}`, `viewport={{ once: true, amount: 0.2 }}`, `transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}`.
- 100ms stagger, matching WhatWeDo (horizontal card row, coordinated arrival).
- Respect `prefers-reduced-motion` via `useReducedMotion` — same handling as every prior section.

---

## THE PROMPT — paste this into Claude Code

```
You are executing Step 11 of the OTS website build. This step creates the Verticals section — the fifth section on the homepage — with a centred header and three vertical cards for Hospitality, Health, and Professional Services.

Follow this plan exactly. If anything fails or is unclear, pause and report — do not attempt fixes without asking.

CONTEXT:
- components/sections/HowWeWork.tsx is complete as of Step 10. The section-add pattern is well-established by this point.
- This section is on --cream background (default) — no dark-mode handling needed.
- Three custom SVG icons will be defined inline in the component. Do NOT install any icon library. Do NOT reach for Lucide, Heroicons, Font Awesome, or any other icon package.
- Cards are informational and non-interactive — no hover state, no border-colour transition, no lift, no Link wrapping.

TASK 1 — Verify prerequisites.
Report:
- pwd, git status (clean except this step's untracked prompt file), git log --oneline -3 (last commit should be Step 10's HowWeWork commit)
- Port 3000 check, kill any orphan
- Confirm the type-h2 utility from Step 8 still exists in globals.css
- Confirm design tokens still resolve as expected: --cream (section bg), --cream-deep (card bg), --ink, --ink-soft, --muted, --accent
- Read components/ui/Eyebrow.tsx one more time to confirm the plain variant's centring behaviour — specifically, does it play well with a text-center parent, or does it force its own alignment?

Pause for my approval before proceeding.

TASK 2 — Add verticals translations.
Add a "verticals" namespace to messages/nl.json and messages/en.json, nested by section — "header" and "cards.hospitality" / "cards.health" / "cards.professional". Use values EXACTLY as given in the step file; do not paraphrase, do not adjust punctuation, do not translate the systems lists (they are internal product names, identical in both locales).

Full key list per locale:
- header.eyebrow, header.h2, header.subhead
- cards.hospitality.title, cards.hospitality.body, cards.hospitality.systems (an array of 3 strings)
- cards.health.title, cards.health.body, cards.health.systems (array of 3)
- cards.professional.title, cards.professional.body, cards.professional.systems (array of 3)

For arrays in translations, next-intl supports them natively — see the messages docs. Store each systems list as a JSON array of three strings. If for any reason the project's next-intl setup doesn't support array messages, fall back to three separate keys (e.g. cards.hospitality.system1, .system2, .system3) — report which approach was chosen.

Apply the DRAFT-flag pattern to mark header.h2 and header.subhead in nl.json (and header.subhead in en.json) as pending Deepak review.

Report the diff for both files before proceeding.

TASK 3 — Create the Verticals section component.
Create components/sections/Verticals.tsx.

Structure:
1. 'use client' at the top.
2. Imports: motion, useReducedMotion from framer-motion; useTranslations from next-intl; Section, Container from components/layout/; Eyebrow from components/ui/.
3. Define the three icons as small React components at the top of the file (or as an object mapping keys → JSX). Use the exact SVG source given in the step file — do NOT rewrite the paths, do NOT simplify the SVG, do NOT install an icon library. If a path looks weird when rendered, that's a visual tuning task for me to review, not for you to fix.
4. Inside the component:
   a. useTranslations('verticals')
   b. useReducedMotion assigned to shouldReduce
   c. Build a cards array — three entries with { id, icon (a JSX element), title, body, systems (array of strings) }.
5. Return:
   <Section background="cream">
     <Container>
       {/* Centred header */}
       <div className="text-center">
         <Eyebrow>{t('header.eyebrow')}</Eyebrow>
         <h2 className="[type-h2 utility] text-ink mt-6">
           {t('header.h2')}
         </h2>
         <p className="text-ink-soft text-lg leading-relaxed mt-6 max-w-[640px] mx-auto">
           {t('header.subhead')}
         </p>
       </div>

       {/* Cards row */}
       <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
         {cards.map((card, i) => (
           <motion.article
             key={card.id}
             className="flex flex-col bg-cream-deep rounded-[20px] p-10 min-h-[420px]"
             initial={shouldReduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true, amount: 0.2 }}
             transition={{ duration: shouldReduce ? 0 : 0.6, delay: shouldReduce ? 0 : i * 0.1, ease: [0.16, 1, 0.3, 1] }}
           >
             <div className="w-8 h-8 text-accent">
               {card.icon}
             </div>
             <h3 className="font-display text-[28px] leading-tight text-ink mt-8">
               {card.title}
             </h3>
             <p className="text-ink-soft text-[15px] leading-relaxed mt-4">
               {card.body}
             </p>
             <ul className="mt-auto pt-8 list-none space-y-1.5">
               {card.systems.map((system) => (
                 <li key={system} className="text-muted text-[13px]">
                   {system}
                 </li>
               ))}
             </ul>
           </motion.article>
         ))}
       </div>
     </Container>
   </Section>

Notes on the JSX above:
- Adjust type-h2 utility name to whatever was established (Step 8).
- If Eyebrow needs an explicit alignment prop to centre correctly, add it — otherwise the text-center on the parent should be sufficient.
- font-display should map to the Anton variable set up in Step 3a; check the exact utility name before assuming.
- The icons use text-accent on the wrapper; the SVGs use currentColor so they inherit that orange.
- The <ul> semantic is correct for the systems list (a list of items).
- Cards are static — no border, no hover, no wrapping Link.

Confirm the file was written and report its line count.

TASK 4 — Wire Verticals into the page.
Open app/[locale]/page.tsx. Import Verticals from '@/components/sections/Verticals' and render it directly after <HowWeWork />. No wrapping div.

Report the diff.

TASK 5 — Start dev server and verify.
Run npm run dev in the background. Wait 15 seconds. Check whether http://localhost:3000/ and http://localhost:3000/en both return 200. Report any compilation, TypeScript, or missing-translation-key warnings. Also confirm no icon-library packages were installed (check that package.json has not gained any icon dependencies).

If clean, pause and wait for my browser verification.

TASK 6 — Wait for user verification.
Pause here. I will check:
- Scrolling down from HowWeWork, the section appears with cream background — visually returning to the "surface plane" after HowWeWork's dark section
- Header is centred: eyebrow, H2, and subhead all horizontally centred, subhead capped at a readable width (~640px)
- Three cards render below the header with generous horizontal spacing between them
- Each card shows the correct icon at the top-left (wine glass for hospitality, stethoscope arc for health, folio for professional) in accent orange
- Icons look intentional and hand-drawn rather than off-the-shelf — if any icon looks wrong or clunky visually, flag it and we tune the SVG path
- Below each icon: title, body copy, and the systems list at the bottom of the card
- Cards align at their tops even if body length varies slightly (min-h-[420px] enforces baseline)
- Cards are NOT clickable — no hover lift, no border transition, cursor stays default (not pointer)
- Cards fade up on scroll with 100ms stagger, arriving as a coordinated set
- With OS Reduce Motion enabled, cards appear immediately at final state
- Mobile: cards stack vertically at natural height, still legible, icons still visible
- No regressions: Hero, Nav, Problem, WhatWeDo, HowWeWork all still look and behave as expected

Once I say "verified", proceed to Task 7.

TASK 7 — Stop dev server. Kill orphans. Commit and push.
Run git status and report. Should see:
- New: components/sections/Verticals.tsx, prompts/STEP_11_Verticals.md
- Modified: app/[locale]/page.tsx, messages/nl.json, messages/en.json
- NOT modified: package.json, package-lock.json (no dependencies were added)

Stage all: git add -A

Commit with:
feat(step-11): add Verticals section with custom SVG icons (NL H2 and subhead drafts pending review)

Push.

TASK 8 — Final report.

STEP 11 COMPLETE
- Component created: components/sections/Verticals.tsx ([line count] lines)
- Icons implemented: inline SVG (3 icons — wine glass, stethoscope arc, folio)
- Package.json touched: NO (confirm)
- Files modified: app/[locale]/page.tsx, messages/nl.json, messages/en.json
- Dev server: [worked / did not work]
- User verification: [confirmed / not confirmed]
- Git commit: [hash and message]
- Git push: [succeeded / failed]
- Port 3000: [free at end / occupied]
- Content debt: 5 unreviewed Dutch drafts now

END OF PROMPT.
```

---

## Acceptance test — what you verify after Claude Code finishes

### Check 1 — Centred header reads as intentional
The eyebrow, H2, and subhead should all sit horizontally centred, with the subhead capped at a readable width (~640px). If the subhead runs edge-to-edge or the H2 sits left-aligned, the centring classes aren't applied.

### Check 2 — Icons look hand-drawn, not templated
This is the check most likely to catch a real issue. Look at each icon. The wine glass, stethoscope arc, and folio should each feel like specific, intentional shapes — sparse detail, single-weight line, rounded caps. If any looks awkward or "off," adjust the SVG path directly in the component. If any looks *too* clean or "generic library-icon," that's a signal something's wrong — the whole point of the Brand Bible's icon rule is that OTS's iconography looks handmade.

### Check 3 — Icon colour is accent orange
Icons should be visibly the same warm orange as the H2's accent word "better," CTAs, and eyebrow text. If an icon renders black, white, or a different colour, the `currentColor` on the SVG isn't inheriting from `text-accent` on the wrapper.

### Check 4 — Cards are visually static (not clickable)
Hover over a card. Nothing should happen — no border colour change, no lift, no cursor becoming a pointer. This is deliberate and different from the Service Ladder cards (which ARE clickable). If you get any hover feedback, the card is accidentally interactive.

### Check 5 — Cards align at their tops
The three cards should line up at their top edges regardless of small variations in body-copy length. If one card is taller than another (making the top edges misalign), the `min-h-[420px]` isn't applying or its value needs adjusting up.

### Check 6 — Systems list sits at the bottom
Within each card, the systems list should be pushed to the bottom of the card, not sitting right after the body. This is what `mt-auto pt-8` on the `<ul>` does. If the list floats up right after the body copy, the flex column isn't set up correctly.

### Check 7 — Scroll reveal
Same as prior sections: cards fade up in a 100ms staggered sequence as the section enters view. Nothing unusual, but confirm it works.

### Check 8 — No new dependencies
Open `package.json`. Confirm no icon-library packages have been added (no `lucide-react`, no `@heroicons/react`, no `react-icons`, no `@fortawesome/*`). If any exist, back them out — the Brand Bible rule is not optional.

### Check 9 — Mobile
Cards stack vertically. Icons, titles, bodies, and system lists all render at the full mobile card width. Nothing overflows.

### Check 10 — No regressions
Scroll through all five sections. Nothing above the Verticals section should have changed.

---

## If this doesn't work

Paste back:
1. Exact error or unexpected behaviour.
2. Which check (1–10) failed.
3. For icon issues: a screenshot of the specific icon, so I can suggest a path adjustment.

---

## What comes next

Once all ten checks pass, come back and say:

> **"Step 11 done. Give me Step 12."**

**Step 12 is the Recent Essays section** — the sixth homepage section, back on cream-deep background, showcasing three essay previews with photographs, titles, dates, and read-more links. Same "essays don't exist yet as real content" situation as CTA links and service pages — the previews will be placeholder essays until Phase 4's essay system exists. This is the first section that begins pointing the visitor *outward* (toward long-form content) rather than *inward* (into OTS's own offering). Two thirds of the homepage will be complete after Step 12.

---

**Step 11 · The Verticals Section · v1.0 (Claude Code-driven)**
*Behind every smooth business is a better system.*
