# STEP 09a — Service Ladder Structure

**Project:** Ontwikkeling Tech Services — Marketing Website
**Type:** Claude Code prompt
**Estimated time:** 75–105 minutes
**Owner:** Virat
**Version:** 1.0
**Phase:** 3 — Navigation and Homepage

---

## Goal

Build the "What We Do — Service Ladder" section: the third section on the homepage, below the Problem. A full-width header (H2 + subhead) sits above three equal-width service cards for Audit, Build, and Retainer. Each card carries a placeholder photograph zone at the top, then eyebrow / title / body copy, and closes with real pricing and a text-link out to the (not-yet-existing) service page.

This step deliberately ships **cards with photograph placeholders**, not real photos — same split rationale as the Hero (Step 7a scaffolded the structure, Step 7c wired the real image). Step 9b handles the three real photographs once curated.

---

## Context

- References **PRD v1.1 §4.3** (Service Ladder section spec, verbatim copy and pricing) and **Services Bible §1–4** (the commercial model, pricing verified).
- Prerequisite: Step 8 complete. Problem section is live, and the scroll-triggered reveal pattern is proven.
- Component library available: `Section`, `Container`, `Eyebrow` (plain variant), and the shared type utilities. No new shared components are introduced this step.

### Why the split into 9a and 9b

Same reasoning as Hero:
- **9a (this step):** the whole section — layout, all copy, pricing, hover interactions, scroll reveal — with the three photograph zones as clearly-labelled placeholders.
- **9b (next):** the three real photographs, curated per Brand Bible §4.6 and the PRD §9.2 sourcing plan (Audit: notebook/laptop; Build: dashboard/workshop; Retainer: calendar/desk), wired via `next/image`.

This isolates risk. If the hover interaction has a bug, or the price rendering is wrong, or the mobile layout collapses badly, you find out here — without any photograph work in the same commit to obscure the cause. And you get to close a real, verifiable step today without waiting on Sneha (or yourself) to source three images first.

### Two things worth naming before you start

**1. This is the first commercially-material section on the site.** Every previous section — Hero, Problem — was voice and positioning. This one names *money*. €2,500 for the Audit. €8,000–22,000+ for a Build. €1,500–5,000+ per month for a Retainer. **These numbers must exactly match the Services Bible.** I've verified them against §2 (Audit), §3 (Build pricing tiers), and §4 (Retainer tiers) — the copy in this step reflects reality. If any prospect reads a homepage price that contradicts a proposal you send them, the credibility damage is severe. So: the prices in this file are non-negotiable; don't let Claude Code paraphrase or "round" them.

**2. Cards are visually clickable but semantically one link.** A recurring anti-pattern is to make a card feel clickable by nesting a "Read more →" link inside a wrapping `<a>` — which is invalid HTML (you can't nest anchors) and confuses screen readers. The clean pattern this step uses: **the entire card is a single `<Link>` component**, and the "Meer over Audit →" text at the bottom is *styled text, not a nested anchor*. Clicking anywhere on the card navigates to the same destination. Hover state applies to the whole card. This is worth understanding — you'll use the same pattern in essay cards (Step 12), vertical cards, and anywhere else cards appear.

### Content flags (running total: 3 unreviewed drafts)

- **H2:** Fully specified in both languages by the PRD. **Not a draft.**
- **Subhead:** English is given by the PRD, but no Dutch version exists — this step ships a draft. Now **3rd unreviewed Dutch line waiting on Deepak** (after Hero headline + Problem H2). Time to batch a review session.
- **Card body copy:** Dutch is verbatim from PRD (already authored). English is drafted here — lower-stakes since it's translating from authored Dutch, but still Deepak-reviewable.
- **"Meta line" under Build and Retainer prices:** PRD only explicitly gives the Audit meta line (*"vaste prijs · twee weken"*). Build and Retainer meta lines are drafted here — direct extractions from the Services Bible's own tier descriptions, so low-risk drafts.

---

## Files this step creates or modifies

**Creates:**
- `components/sections/WhatWeDo.tsx` — the section component (Client Component — uses `whileInView`)
- `prompts/STEP_09a_Service_Ladder_Structure.md` — this file

**Modifies:**
- `app/[locale]/page.tsx` — imports `<WhatWeDo />` and renders it after `<Problem />`
- `messages/nl.json` — adds a `whatWeDo` translation namespace
- `messages/en.json` — adds a `whatWeDo` translation namespace

**Does NOT touch:**
- Any shared component — this step consumes them, doesn't modify them
- `Section.tsx` — `cream` background is already the default (from Step 5a)
- Any photograph asset — that's Step 9b

---

## The copy — verbatim, both languages

**Header eyebrow:**
- NL: `// Onze diensten`
- EN: `// What we do`

**Header H2 (two parts, on separate lines):**
- NL: `Drie diensten.` / `Eén weg.`
- EN: `Three services.` / `One progression.`

**Header subhead:**
- NL *(draft — pending Deepak review)*: `Elke OTS-samenwerking begint bij een Audit, groeit naar een Build, en wordt uiteindelijk een Retainer. Je klimt de ladder wanneer het voor jouw bedrijf zin heeft — niet eerder.`
- EN: `Every OTS engagement starts with an Audit, evolves into a Build, and matures into a Retainer. You climb the ladder as it makes sense for your business — not before.`

**Card 01 — Audit:**
- Eyebrow (both locales): `01 · Audit`
- Title NL: `De diagnose.` / EN: `The diagnosis.`
- Body NL *(verbatim from PRD)*: `Twee weken. We brengen in kaart hoe je bedrijf nu werkt — de workflows, de tools, het handwerk. We leveren een geschreven rapport met een systeemroadmap. Ook als je daarna niks bij ons afneemt, ben je verder dan waar je begon.`
- Body EN *(draft translation)*: `Two weeks. We map how your business actually works today — the workflows, the tools, the manual work. We deliver a written report with a systems roadmap. Even if you take nothing else from us afterwards, you're further along than where you started.`
- Price NL: `€2.500` / EN: `€2,500`
- Meta NL: `vaste prijs · twee weken` / EN: `fixed price · two weeks`
- Link text NL: `Meer over Audit →` / EN: `More about Audit →`
- Link target: `/#audit` (in-page anchor placeholder — same pattern as Nav; the real `/diensten#audit` route arrives in Phase 4)

**Card 02 — Build:**
- Eyebrow (both locales): `02 · Build`
- Title NL: `Het systeem.` / EN: `The system.`
- Body NL *(verbatim from PRD)*: `Vaste prijs. Vaste scope. Vier tot twaalf weken. We bouwen een werkend Business Operating System voor één specifieke functie in je bedrijf — reserveringen, patiëntenintake, offerte-tot-factuur — inclusief documentatie en training.`
- Body EN *(draft translation)*: `Fixed price. Fixed scope. Four to twelve weeks. We build a working Business Operating System for one specific function in your business — reservations, patient intake, quote-to-invoice — including documentation and training.`
- Price NL: `€8.000 – €22.000+` / EN: `€8,000 – €22,000+`
- Meta NL: `vaste prijs · vaste scope · 4–12 weken` / EN: `fixed price · fixed scope · 4–12 weeks`
- Link text NL: `Meer over Build →` / EN: `More about Build →`
- Link target: `/#build`

**Card 03 — Retainer:**
- Eyebrow (both locales): `03 · Retainer`
- Title NL: `De partner.` / EN: `The partner.`
- Body NL *(verbatim from PRD)*: `Maandelijks. We onderhouden en ontwikkelen de systemen die we voor je hebben gebouwd. Kleine verbeteringen, monitoring, kwartaalreviews, prioriteitswerk. De lange termijn.`
- Body EN *(draft translation)*: `Monthly. We maintain and extend the systems we've built for you. Small improvements, monitoring, quarterly reviews, priority work. The long term.`
- Price NL: `€1.500 – €5.000+ / maand` / EN: `€1,500 – €5,000+ / month`
- Meta NL: `maandelijks · doorlopende relatie` / EN: `monthly · ongoing relationship`
- Link text NL: `Meer over Retainer →` / EN: `More about Retainer →`
- Link target: `/#retainer`

---

## Detailed specification (PRD §4.3)

**Section wrapper:**
- `<Section background="cream">` (default — no prop needed if `cream` is the Section default; confirm in Task 1).
- Vertical padding: `128px` on desktop (same as Problem — should already be Section's default at the standard breakpoint).

**Header (above the cards, full-width — not a card-column):**
- Two-column asymmetric grid: **left 60%, right 40%**.
- Left column: Eyebrow → H2 (two lines, manual `<br />`), using the same `type-h2` (or equivalent) utility established in Step 8.
- Right column: subhead in Inter 400 18px `--ink-soft`, line-height 1.6, vertically aligned with the H2's baseline (align-end on the flex, or use grid alignment).
- **80px gap between the header and the cards row below** (per PRD).
- Header stays static — no scroll animation (same pattern as Problem).

**Cards row (three equal columns):**
- Grid: `grid-cols-1 md:grid-cols-3 gap-8` (32px gap = `gap-8`).
- Each card is `~480px` tall on desktop — enforce with a `min-h-[480px]` on the card element so cards match heights even if body copy lengths differ slightly.
- On mobile (below `md`), cards stack vertically at natural height.

**Card structure (identical for all three, only content changes):**

Each card is a **single `<Link>` component** (from `next-intl`'s locale-aware navigation, the same import used elsewhere in the codebase — check `Nav.tsx` for the exact pattern) wrapping the whole card. The card is a `flex flex-col` container with three internal zones stacked top-to-bottom:

**Zone 1 — Photograph placeholder (top, 240px fixed height):**
- `bg-cream-deep` background.
- `border border-dashed border-rule` (or the exact rule token in use).
- Rounded top corners only: `rounded-t-[20px]`. Rounded corners must match the card's outer border-radius so the placeholder's dashed edge doesn't clash — the card as a whole has a `rounded-[20px]` border.
- Centred small text label inside, `text-muted text-xs`: `"Photograph — Step 9b"` (English label is fine even in the NL card; this is a build-time note, not user copy).

**Zone 2 — Middle content (flex-1, padding 32px on all sides):**
- Eyebrow: use the `<Eyebrow>` component (plain variant, no `variant` prop needed). Its content string comes from translations — e.g. `t('cards.audit.eyebrow')` renders `01 · Audit`. Note: PRD spec says the eyebrow here uses `--muted` (not `--accent` like the Problem section's eyebrow). Confirm the Eyebrow component supports a colour override — if it takes a `color` prop with `muted` as a valid value (per Step 5c's build), use it. If not, wrap the eyebrow in a span with a muted-text utility, or add `muted` as a supported color value at that time.
- Title: Anton, 32px (spec value — this may or may not warrant its own utility class; if a suitable one doesn't exist yet, inline the size using the `type-h3` naming pattern or use `font-display text-[32px] leading-tight`), colour `--ink`. `mt-4` (16px) below the eyebrow.
- Body: Inter 400 15px, colour `--ink-soft`, line-height 1.6. `mt-4` below the title.

**Zone 3 — Bottom pricing block (padding 32px, `mt-auto` to push it to the bottom):**
- Price: Anton, 40px, colour `--ink`. Use the same "inline size" approach as the title if no `type-price` utility exists.
- Meta line: Inter 400 12px, colour `--muted`. `mt-2` below the price.
- Text link (styled text, NOT a nested anchor): Inter 500 13px, colour `--ink`, with an underline that draws in on card hover. `mt-8` (32px) below the meta. The link is visually a link, but its click behaviour is handled by the parent `<Link>` wrapping the entire card.

**Card visual state and hover:**
- Default: 1px `--rule` border, `bg-cream` background (same as the section — cards read as "surfaces on the same plane," not raised cards).
- Hover: border colour transitions to `--accent`, card translates up 4px, the text link's underline draws in.
- Transition: `300ms cubic-bezier(0.4, 0, 0.2, 1)` on `border-color` and `transform`.
- Cursor: pointer.
- **Focus-visible:** show a visible focus outline (default browser focus ring is fine, or a 2px `--accent` outline offset 4px) — keyboard users must be able to see which card is focused. This is the check that gets missed and shouldn't be.

**Motion (scroll-triggered reveal — same pattern as Problem):**
- Header: static, no animation.
- Each card: `initial={{ opacity: 0, y: 24 }}`, `whileInView={{ opacity: 1, y: 0 }}`, `viewport={{ once: true, amount: 0.2 }}`, `transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}`.
- 100ms stagger (slightly tighter than Problem's 150ms) — cards read as a coordinated set entering together, not a slow left-to-right sequence.
- Respect `prefers-reduced-motion` via `useReducedMotion` — same handling as Hero/Problem.

**A note about the card `<Link>` and Framer Motion:**
The whole card is a `<Link>` component. To also make it a `motion` component for the reveal, use `motion(Link)` or the newer `motion.create(Link)` API — check which pattern Framer Motion's current version prefers, and follow the framer-motion docs pattern for wrapping a Next.js `Link`. If this creates unnecessary complexity, an alternative is to wrap the entire `<Link>` inside a `<motion.div>` — one extra DOM node, but simpler. Pick whichever is cleaner given the framer-motion version in the project.

---

## THE PROMPT — paste this into Claude Code

```
You are executing Step 9a of the OTS website build. This step creates the "What We Do" section — the third section on the homepage, below the Problem — with three service cards for Audit, Build, and Retainer. Photograph zones remain placeholders in this step; real photos are Step 9b.

Follow this plan exactly. If anything fails or is unclear, pause and report — do not attempt fixes without asking.

CONTEXT:
- components/sections/Problem.tsx is complete as of Step 8. The scroll-triggered reveal pattern (motion.div with whileInView + viewport + delay-per-index stagger) is proven and reusable.
- Framer Motion is installed. The Brand Bible entrance ease is [0.16, 1, 0.3, 1].
- Eyebrow supports a plain (default) variant and a pill variant (added in Step 7c). This step uses plain. Confirm whether Eyebrow also supports a color prop or similar mechanism for muted-coloured eyebrows — the card eyebrows per PRD §4.3 use --muted, not --accent.
- next-intl locale-aware Link import path is established in Nav.tsx and elsewhere. Use the same import path here for the card wrappers.
- Design tokens (--cream, --cream-deep, --ink, --ink-soft, --muted, --rule, --accent, --accent-tint) are established in globals.css.
- The type-h2 utility was added in Step 8 (if it wasn't already present from Step 3b).

TASK 1 — Verify prerequisites and confirm what exists.
Report:
- pwd, git status (clean except this step's untracked prompt file), git log --oneline -3 (last commit should be Step 8's Problem section commit)
- Port 3000 check, kill any orphan
- Read components/ui/Eyebrow.tsx and report its full current prop signature — specifically what colour options it supports, and confirm whether "muted" is a supported value or would need to be added
- Read components/sections/Problem.tsx briefly to confirm the exact reveal pattern used (import path for motion + useReducedMotion, exact viewport config, exact stagger structure). This step follows that pattern with only the stagger delay changed to 0.1s.
- Read app/globals.css and confirm: is there a type utility for H3-scale display text (~32px Anton) and for price display (~40px Anton)? If either is missing, propose the minimal addition (name consistent with existing type-* naming).
- Read the locale-aware Link import from any existing component that uses it (Nav.tsx is a good reference) and report the exact import path so we don't invent a different one for WhatWeDo.tsx.

Pause for my approval before proceeding.

TASK 2 — Add whatWeDo translations.
Add a "whatWeDo" namespace to messages/nl.json and messages/en.json. Nest by section — "header" and "cards.audit" / "cards.build" / "cards.retainer" for readability. Use values EXACTLY as given in the step file's copy section; do not paraphrase, do not adjust punctuation, do not translate the verbatim Dutch bodies.

Full key list (both locales get all keys):
- header.eyebrow, header.h2Part1, header.h2Part2, header.subhead
- cards.audit.eyebrow, cards.audit.title, cards.audit.body, cards.audit.price, cards.audit.meta, cards.audit.linkText, cards.audit.href
- cards.build.[same six keys]
- cards.retainer.[same six keys]

The href values do vary per locale? No — hrefs are the same in both locales, they are in-page anchors (/#audit, /#build, /#retainer). Store them in both locale files identically for consistency with the existing translation shape.

Apply the same DRAFT-flag pattern used in previous steps to mark header.subhead in nl.json as pending Deepak review (via _notes key or comment, whichever pattern was chosen in earlier steps).

Report the diff for both files before proceeding.

TASK 3 — Any needed changes to Eyebrow or globals.css.
Based on Task 1 findings, make only the minimum additions needed:
- If Eyebrow doesn't currently support a "muted" color option, add it in the same style as its existing colour options. Do not restructure the component.
- If globals.css doesn't have type utilities for card-title-scale (~32px display) and price-scale (~40px display), add them using the existing type-* naming convention.
- If both are already fine, skip this task and note that no changes were needed.

Report any diffs.

TASK 4 — Create the WhatWeDo section component.
Create components/sections/WhatWeDo.tsx.

Structure:
1. 'use client' at the top.
2. Imports: motion and useReducedMotion from framer-motion; useTranslations from next-intl; Section, Container from components/layout/; Eyebrow from components/ui/; the locale-aware Link from wherever Nav.tsx imports it.
3. Inside the component:
   a. useTranslations('whatWeDo')
   b. useReducedMotion assigned to shouldReduce
   c. Build a cards array — three entries, each with { id, eyebrow, title, body, price, meta, linkText, href } drawn from translations
4. Return:
   <Section background="cream"> (or omit the prop if cream is the default)
     <Container>
       {/* Header — full width */}
       <div className="grid grid-cols-1 lg:grid-cols-[60%_40%] gap-6 items-end">
         <div>
           <Eyebrow>{t('header.eyebrow')}</Eyebrow>
           <h2 className="[type-h2 utility] text-ink mt-6">
             {t('header.h2Part1')}
             <br />
             {t('header.h2Part2')}
           </h2>
         </div>
         <p className="text-ink-soft text-lg leading-relaxed">
           {t('header.subhead')}
         </p>
       </div>

       {/* 80px gap between header and cards */}
       <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
         {cards.map((card, i) => (
           <motion.div
             key={card.id}
             initial={shouldReduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true, amount: 0.2 }}
             transition={{ duration: shouldReduce ? 0 : 0.6, delay: shouldReduce ? 0 : i * 0.1, ease: [0.16, 1, 0.3, 1] }}
           >
             <Link
               href={card.href}
               className="group relative flex flex-col min-h-[480px] rounded-[20px] border border-rule bg-cream overflow-hidden transition-[border-color,transform] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:border-accent hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-4"
             >
               {/* Zone 1 — photograph placeholder */}
               <div className="h-[240px] bg-cream-deep border-b border-dashed border-rule flex items-center justify-center">
                 <span className="text-muted text-xs">Photograph — Step 9b</span>
               </div>

               {/* Zone 2 — middle content */}
               <div className="p-8 flex-1 flex flex-col">
                 <Eyebrow color="muted">{card.eyebrow}</Eyebrow>
                 <h3 className="[card-title utility] text-ink mt-4">{card.title}</h3>
                 <p className="text-ink-soft text-[15px] leading-relaxed mt-4">{card.body}</p>

                 {/* Zone 3 — bottom pricing, pushed to bottom */}
                 <div className="mt-auto pt-8">
                   <div className="[price utility] text-ink">{card.price}</div>
                   <div className="text-muted text-xs mt-2">{card.meta}</div>
                   <div className="mt-8 text-ink text-[13px] font-medium relative inline-block after:content-[''] after:absolute after:left-0 after:right-0 after:-bottom-0.5 after:h-[1px] after:bg-current after:scale-x-0 group-hover:after:scale-x-100 after:origin-left after:transition-transform after:duration-[350ms] after:ease-[cubic-bezier(0.4,0,0.2,1)]">
                     {card.linkText}
                   </div>
                 </div>
               </div>
             </Link>
           </motion.div>
         ))}
       </div>
     </Container>
   </Section>

Notes on the JSX above:
- Adjust type utility class names to match what was confirmed or added in Task 3.
- The Eyebrow "color=muted" call assumes Task 3 made muted a supported value; if it took a different prop name, adjust.
- The text-link at the bottom uses an ::after pseudo-element for the underline draw-in — the exact same technique Nav's link hovers and Button's ghost variant use. Reuse consistently.
- group and group-hover: on the Link and the text-link's after: ensure the underline reveals on the whole card being hovered, not just the text link itself.
- The whole card is one Link, so the text at the bottom that reads "Meer over Audit →" is styled text, not a nested anchor.

Confirm the file was written and report its line count.

TASK 5 — Wire WhatWeDo into the page.
Open app/[locale]/page.tsx. Import WhatWeDo from '@/components/sections/WhatWeDo' and render it directly after <Problem />. No wrapping div.

Report the diff.

TASK 6 — Start dev server and verify.
Run npm run dev in the background. Wait 15 seconds. Check whether http://localhost:3000/ and http://localhost:3000/en both return 200. Report any compilation errors, TypeScript errors, or missing-translation-key warnings.

If clean, pause and wait for my browser verification.

TASK 7 — Wait for user verification.
Pause here. I will check:
- Scrolling down from Problem, the WhatWeDo section appears with a cream background (same as Hero — the section reads as returning to the "surface" plane after Problem's darker cream-deep)
- Header renders in a two-column layout: eyebrow + H2 on the left, subhead on the right, subhead vertically anchored to the H2's baseline
- H2 splits into two lines correctly (part 1 above the break, part 2 below)
- Three cards render in a row below the header with generous horizontal spacing
- Each card shows: a labelled placeholder photograph zone at the top ("Photograph — Step 9b"), then the eyebrow, title, body, price, meta line, and text link — in the correct order and correct approximate proportions
- Prices render EXACTLY as: "€2.500" (NL) / "€2,500" (EN), "€8.000 – €22.000+" / "€8,000 – €22,000+", "€1.500 – €5.000+ / maand" / "€1,500 – €5,000+ / month" — no rounding, no paraphrasing
- Hovering a card: border colour transitions to the accent orange, card lifts by ~4px, the text link's underline draws in from left to right
- Clicking a card doesn't error (target anchor doesn't resolve yet, that's expected)
- Keyboard-focusing a card via Tab shows a visible focus outline
- As each card enters the viewport on scroll, it fades up with a slight vertical translation; all three arrive in a coordinated cascade rather than simultaneously
- With OS Reduce Motion enabled, cards appear immediately at final state on scroll — no animation
- Mobile view (below md): cards stack vertically, each at natural height, hover/tap behaviour still works
- Hero, Nav, and Problem all still behave exactly as they did before this step

Once I say "verified", proceed to Task 8.

TASK 8 — Stop dev server. Kill orphans. Commit and push.
Run git status and report. Should see:
- New: components/sections/WhatWeDo.tsx, prompts/STEP_09a_Service_Ladder_Structure.md
- Modified: app/[locale]/page.tsx, messages/nl.json, messages/en.json
- Possibly modified: components/ui/Eyebrow.tsx and/or app/globals.css (only if Task 3 required changes)

Stage all: git add -A

Commit with:
feat(step-09a): add Service Ladder section with three service cards (photos pending, NL subhead draft)

Push.

TASK 9 — Final report.

STEP 9a COMPLETE
- Component created: components/sections/WhatWeDo.tsx ([line count] lines)
- Eyebrow.tsx changes: [none / added muted color / describe]
- globals.css changes: [none / added type utilities for card-title and price / describe]
- Files modified: app/[locale]/page.tsx, messages/nl.json, messages/en.json
- Dev server: [worked / did not work]
- User verification: [confirmed / not confirmed]
- Git commit: [hash and message]
- Git push: [succeeded / failed]
- Port 3000: [free at end / occupied]
- Reminder: header.subhead is DRAFT (Dutch pending Deepak review). All prices confirmed exact match to Services Bible.

END OF PROMPT.
```

---

## Acceptance test — what you verify after Claude Code finishes

### Check 1 — Pricing is exact
This is the most important check in this step. Read each card's price and confirm it matches character-for-character:
- Audit: `€2.500` (NL) / `€2,500` (EN)
- Build: `€8.000 – €22.000+` (NL) / `€8,000 – €22,000+` (EN)
- Retainer: `€1.500 – €5.000+ / maand` (NL) / `€1,500 – €5,000+ / month` (EN)

If any price is off by even one character, fix it before commit. Cross-check against `05 - Services Bible.md §2, §3, §4` — the numbers there are the source of truth.

### Check 2 — Card hover works cleanly
Hover slowly onto a card. The border should transition from the light rule colour to the accent orange, the card should visibly lift ~4px, and the text link's underline at the bottom should draw in left-to-right. All three should happen at the same duration (300ms). If the underline draws instantly or independently of the border transition, timing is off.

### Check 3 — Whole card is clickable (not just the link text)
Click somewhere in the middle of a card — the body copy area, or even the placeholder photo. It should navigate (to the same anchor as the text link at the bottom). If only clicking the "Meer over Audit →" text works, the whole card isn't wrapped in the `<Link>` correctly.

### Check 4 — Keyboard focus visible
Tab through the page from the top. When focus reaches each card, you should see a clear visible outline (whether the default browser ring or the accent-coloured outline the step spec suggests). Keyboard users need this — it's not optional.

### Check 5 — Scroll reveal timing
Scroll down slowly to the section. Cards should arrive in a coordinated but staggered sequence — 100ms between each. Not all three snapping in simultaneously (stagger not applying), not one-at-a-time-slowly (stagger too long).

### Check 6 — Reduce motion
Toggle OS Reduce Motion. Reload. Scroll to the section. All three cards should be already-visible with no animation. This check should be routine now — the same shared `useReducedMotion` pattern from Hero and Problem is in use here.

### Check 7 — Mobile
Below the `md` breakpoint, cards stack vertically. Nothing overflows. Hover on desktop, tap on mobile — the whole card should still be tappable.

### Check 8 — No regressions
Scroll back up. Hero, Nav, and Problem all still look and behave as they did.

---

## If this doesn't work

Paste back:
1. Exact error or unexpected behaviour.
2. Which check (1–8) failed.
3. Screenshot for visual issues.

Do not let Claude Code guess-and-retry more than once — pause and paste back.

---

## What comes next

Once all eight checks pass, come back and say:

> **"Step 9a done. Give me Step 9b."**

**Step 9b is the three service card photographs** — same shape as Step 7c (Hero photograph), but three times. Same sourcing rules (Brand Bible §4.6, no AI, Pexels/Unsplash curated with attribution). The PRD's Image Strategy (§9.2) already names what each card wants: Audit — a notebook/laptop composition; Build — a dashboard/workshop scene; Retainer — a calendar/desk scene. Same `CREDITS.md` update pattern, three new entries. Consider this the moment to hand the sourcing to Sneha in one batched brief instead of doing it yourself in the middle of a build session — three images is where "I'll do it myself" starts costing an hour rather than fifteen minutes.

---

**Step 09a · Service Ladder Structure · v1.0 (Claude Code-driven)**
*Behind every smooth business is a better system.*
