# STEP 10 — How We Work

**Project:** Ontwikkeling Tech Services — Marketing Website
**Type:** Claude Code prompt
**Estimated time:** 60–90 minutes
**Owner:** Virat
**Version:** 1.0
**Phase:** 3 — Navigation and Homepage

---

## Goal

Build the "How We Work" section: the fourth section on the homepage. This is the first **dark-background** section on the site, and its job is to demystify the OTS delivery process — Discovery → Audit → Build → Retainer, rendered as a vertical list of four numbered circles with descriptions, connected by a subtle dashed line.

By the end of this section, a visitor should know exactly what happens between "we start" and "we ship."

---

## Context

- References **PRD v1.1 §4.4** (How We Work section spec, verbatim copy and structure).
- Prerequisite: Step 9b complete. Service Ladder cards are live with real photographs.
- Component library: `Section`, `Container`, `Eyebrow` — all reused. No new shared components introduced.

### Two genuinely new things in this step

**1. First dark-background section.** Every section so far has been on `--cream` or `--cream-deep`. This one uses `--night`, which flips the colour system — text becomes `--cream` (light on dark), and `--muted` still reads as "quieter than the primary text" but relative to the new palette. `--accent` (the orange) still holds; it's designed to work on both backgrounds. This colour inversion is the same pattern the Footer (Step 15) and the Final CTA (Step 14) will use, so the utility classes established here get reused later.

Two things to watch for on dark backgrounds:
- **Contrast ratios still matter for accessibility.** Cream-on-night should still hit WCAG AA (4.5:1 for body text, 3:1 for large text). This is fine with the current tokens but worth a mental note — it's the thing that breaks if someone later "polishes" the palette.
- **The `--muted` token can go too quiet on dark.** If body text set in `--muted` becomes hard to read against `--night`, that's not a design intent, it's a token calibration issue. Flag it if it happens; the fix is at the token level, not per-component.

**2. The step circles + connecting dashed line.** This is a small but distinctive visual pattern the section relies on. Four circles (48px diameter each, 1px `--muted` border, transparent fill, number inside) stacked vertically with 64px between them, connected by a single dashed vertical line running through their centres on desktop only. On mobile the line is hidden — the vertical stack is enough to imply sequence without needing the connector.

There are several ways to build the dashed line technically (single absolute-positioned line spanning the container, per-step `::after` pseudo-element, background gradient trick). I've left the specific technique to Claude Code to choose based on what fits cleanest with the CSS already in use, but flagged the visual outcome precisely so any technique that produces it is acceptable.

### Content flags (running total: 4 unreviewed drafts)

- **H2:** English is given by PRD (*"From first message to shipped system, in four honest phases."*). Dutch drafted here — *"Van eerste bericht tot draaiend systeem, in vier eerlijke fasen."* This is now the **4th unreviewed Dutch line waiting on Deepak** (Hero headline + Problem H2 + WhatWeDo subhead + this).
- **Step titles + bodies:** Dutch is verbatim authored copy from the PRD. English translations are drafted here.
- **Grid-break rule reminder:** the oversized "04" numeral in this section is another texture-numeral (like Problem's 01/02/03). Following the same interpretation as Step 8 — Brand Bible's "once per page" refers to *major* grid-breaks (like Hero's photo bleed), not to controlled decorative offsets. Same debt line item as before.

**Four unreviewed Dutch drafts is the point where a review session with Deepak stops being optional.** Ten minutes with him this week clears the whole backlog before it grows further. Sooner rather than later.

---

## Files this step creates or modifies

**Creates:**
- `components/sections/HowWeWork.tsx` — Client Component (uses `whileInView`)
- `prompts/STEP_10_How_We_Work.md` — this file

**Modifies:**
- `app/[locale]/page.tsx` — imports `<HowWeWork />` and renders after `<WhatWeDo />`
- `messages/nl.json` — adds `howWeWork` namespace
- `messages/en.json` — adds `howWeWork` namespace

**May modify (only if needed):**
- `components/layout/Section.tsx` — only if `night` isn't already a supported background variant (check Task 1)

**Does NOT touch:**
- Any shared UI component — Eyebrow, Button, ScrollIndicator all consumed unchanged

---

## The copy — verbatim, both languages

**Header eyebrow:**
- NL: `// Werkwijze`
- EN: `// How we work`

**Header H2 (two parts, on separate lines):**
- NL *(draft — pending Deepak review)*:
 - Part 1: `Van eerste bericht tot draaiend systeem,`
 - Part 2: `in vier eerlijke fasen.`
- EN:
 - Part 1: `From first message to shipped system,`
 - Part 2: `in four honest phases.`

**Oversized decorative numeral (behind/overlapping H2):**
- Both locales: `04` (aria-hidden — decorative texture, not read by screen readers)

**Step 01 — Discovery:**
- Title NL *(verbatim PRD)*: `Discovery — 45 minuten.` / EN: `Discovery — 45 minutes.`
- Body NL *(verbatim PRD)*: `Een echt gesprek. Wij stellen vragen; jij vertelt hoe je bedrijf loopt. Aan het eind zeggen we eerlijk of we de juiste partner zijn — of niet.`
- Body EN *(draft)*: `A real conversation. We ask questions; you tell us how your business runs. At the end, we say honestly whether we're the right partner — or not.`

**Step 02 — Audit:**
- Title NL *(verbatim PRD)*: `Audit — twee weken, €2.500.` / EN: `Audit — two weeks, €2,500.`
- Body NL *(verbatim PRD)*: `We brengen je operatie in kaart. Interviews, workflows, tools. Je krijgt een geschreven rapport met een concrete roadmap.`
- Body EN *(draft)*: `We map your operation. Interviews, workflows, tools. You get a written report with a concrete roadmap.`

**Step 03 — Build:**
- Title NL *(verbatim PRD)*: `Build — vaste prijs, vaste scope.` / EN: `Build — fixed price, fixed scope.`
- Body NL *(verbatim PRD)*: `We bouwen het systeem. Wekelijkse demo's. Documentatie tijdens het bouwen, niet erna. Training voor je team. Live gaan met vertrouwen.`
- Body EN *(draft)*: `We build the system. Weekly demos. Documentation written as we build, not after. Training for your team. Going live with confidence.`

**Step 04 — Retainer:**
- Title NL *(verbatim PRD)*: `Retainer — de lange termijn.` / EN: `Retainer — the long term.`
- Body NL *(verbatim PRD)*: `We houden het systeem in de lucht, en breiden het uit terwijl je bedrijf verandert. Iedere Build wordt bedoeld om er één te worden.`
- Body EN *(draft)*: `We keep the system running, and extend it as your business changes. Every Build is meant to become one.`

---

## Detailed specification (PRD §4.4)

**Section wrapper:**
- `<Section background="night">` — this is the FIRST dark-background section. Confirm in Task 1 whether Section.tsx already supports `night`; if not, add it as a variant using the same pattern used to add `cream-deep` in Step 8.
- Vertical padding: `128px` on desktop (Section's default).
- All text inside inherits from `--cream` by default at the section level — set this at the top-level section wrapper so descendants don't each need to override text colour.

**Grid (header + steps):**
- Two-column asymmetric: `45% left, 55% right` at `lg` and up.
- Single column below `lg`, header stacks above steps.
- Gap: match the standard container gap used in Problem and WhatWeDo.

**Left column (header):**
- Eyebrow: `<Eyebrow>{t('header.eyebrow')}</Eyebrow>` — plain variant. **Important:** the Eyebrow's default `--accent` colour is correct on dark backgrounds (accent orange reads well against night), but confirm the plain-variant text colour doesn't try to invert to something else. If Eyebrow was built assuming a light background, its default colour may need adjustment or an explicit `color` prop passed.
- H2: same `type-h2` utility from Step 8. Colour: `--cream`. Rendered as two parts with a manual `<br />` between (same technique as Problem's H2).
- Oversized `04`: Anton, `200px`, colour `--night-soft` (a very dark warm-orange or dark cream token — barely visible against `--night`, reads as texture, not information). Positioned absolute or with negative margin/translate so it slightly overlaps the H2 from behind — z-index it *behind* the H2 so the H2 stays readable. `aria-hidden="true"`.
- Confirm `--night-soft` exists as a token in `globals.css`. If it doesn't, this step needs to add it (a value between `--night` and `--cream`, warm-tinted, roughly 15-25% lighter than `--night` — Claude Code can propose a hex value in Task 1 that fits the existing warm palette).

**Right column (four steps, stacked vertically):**
- Container: `flex flex-col` with `space-y-16` (64px between steps) — vertical rhythm per PRD spec.
- Position `relative` so the dashed connecting line can be absolutely positioned inside it.

**Each step (row):**
- Layout: `flex flex-row items-start gap-6` (24px horizontal gap between circle and text).
- **Number circle:** `w-12 h-12` (48px), `rounded-full`, `border border-muted` (1px muted-token border), `bg-transparent`, centred content, `flex-shrink-0` so it doesn't collapse when text wraps. Number inside: Inter 600, 14px, `--cream`, centred. `relative z-10` so it sits above the connecting line.
- **Text block:** flex-1. Title: Inter 600, 20px, `--cream`, line-height 1.3. Body: Inter 400, 15px, `--muted`, line-height 1.6, `mt-2` below the title.

**Dashed connecting line (desktop only, hidden below `lg`):**
- A single vertical line running from the centre of the first circle to the centre of the last circle.
- Positioned to sit at the horizontal centre of the circles (left offset = 24px from the container's left edge, matching the circle's radius).
- 1px wide, dashed pattern, colour `--rule` on cream would be too light on night — use a slightly stronger token, likely `--muted` at reduced opacity or a dedicated `--night-rule` if such a token exists. If not, use `--muted` with 30-40% opacity via a Tailwind class like `border-muted/30`.
- Sits *behind* the number circles (z-index below the circles) so the circles cleanly overlap it.
- Hidden on mobile: `hidden lg:block`.

Implementation choice for the dashed line: leave it to whichever approach fits cleanest. Two viable options — (a) a single absolutely-positioned `<div>` inside the container spanning top-of-first-circle to bottom-of-last-circle, styled with `border-l border-dashed`; or (b) a `::before` pseudo-element on the container that does the same. Either is fine. Report which was chosen.

**Motion (scroll-triggered — same pattern as Problem and WhatWeDo):**
- Header (eyebrow + H2 + oversized numeral): all static — no scroll animation.
- Each step: `initial={{ opacity: 0, y: 24 }}`, `whileInView={{ opacity: 1, y: 0 }}`, `viewport={{ once: true, amount: 0.3 }}`, `transition={{ duration: 0.6, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}`.
- 120ms stagger — slightly more than WhatWeDo's card stagger (100ms) because these steps are read sequentially top-to-bottom, so a small pause between each helps the eye follow.
- Respect `prefers-reduced-motion` — same handling as Hero/Problem/WhatWeDo.

---

## THE PROMPT — paste this into Claude Code

```
You are executing Step 10 of the OTS website build. This step creates the "How We Work" section — the fourth section on the homepage, and the first with a dark night background.

Follow this plan exactly. If anything fails or is unclear, pause and report — do not attempt fixes without asking.

CONTEXT:
- components/sections/WhatWeDo.tsx is complete as of Step 9b. The section-component pattern and the scroll-triggered reveal (motion.div with whileInView + delay-per-index) are established and proven.
- This section uses a --night background — first dark section on the site. Text becomes --cream; --muted still holds relatively; --accent unchanged.
- Framer Motion, next-intl, and all shared components are unchanged.

TASK 1 — Verify prerequisites and confirm what exists.
Report:
- pwd, git status (clean except this step's untracked prompt file), git log --oneline -3 (last commit should be Step 9b's card photographs commit)
- Port 3000 check, kill any orphan
- Read components/layout/Section.tsx and report: does it support a "night" background variant? If it supports cream and cream-deep but not night, what would need to change to add night (same pattern used to add cream-deep in Step 8)?
- Read app/globals.css and report:
  - Does --night exist as a token? What value?
  - Does --night-soft (or an equivalent name for "slightly-lighter-than-night, warm-tinted") exist? If yes, what value? If no, propose a value that would work (roughly 15-25% lighter than --night, warm-tinted to sit in the existing palette).
  - Does --cream exist as a foreground token that reads well on --night? (Should be fine; just confirming.)
  - Is there a dedicated dashed-line token for use on dark backgrounds, or should we use --muted at reduced opacity?
- Read components/ui/Eyebrow.tsx and confirm: does its plain (default) variant assume a light background? Specifically, if we render <Eyebrow>text</Eyebrow> inside a --night section, does the text colour default work (should render as --accent orange, which is fine on either background) or does it force a colour that won't read on dark?
- Confirm the type-h2 utility from Step 8 is still present in globals.css.

Pause for my approval before proceeding. Name any additions to Section.tsx or globals.css that would be needed so I can approve them explicitly.

TASK 2 — Any needed additions to Section.tsx or globals.css.
Based on Task 1 findings:
- If Section.tsx doesn't support "night", add it as a variant.
- If --night-soft (or equivalent) is missing from globals.css, add it. Use the proposed value from Task 1 or ask me for confirmation on the exact hex value first if uncertain.
- If a dashed-line-on-dark token is genuinely needed and doesn't exist, prefer using --muted with a Tailwind opacity utility (e.g. border-muted/30) rather than introducing a new token — smaller surface area.

Report any diffs.

TASK 3 — Add howWeWork translations.
Add a "howWeWork" namespace to messages/nl.json and messages/en.json, nested by section — "header" and "steps.step1" through "steps.step4". Use values EXACTLY as given below; do not paraphrase, do not adjust punctuation.

NL:
- header.eyebrow: "// Werkwijze"
- header.h2Part1: "Van eerste bericht tot draaiend systeem,"
- header.h2Part2: "in vier eerlijke fasen."
- header.numeral: "04"
- steps.step1.number: "01"
- steps.step1.title: "Discovery — 45 minuten."
- steps.step1.body: "Een echt gesprek. Wij stellen vragen; jij vertelt hoe je bedrijf loopt. Aan het eind zeggen we eerlijk of we de juiste partner zijn — of niet."
- steps.step2.number: "02"
- steps.step2.title: "Audit — twee weken, €2.500."
- steps.step2.body: "We brengen je operatie in kaart. Interviews, workflows, tools. Je krijgt een geschreven rapport met een concrete roadmap."
- steps.step3.number: "03"
- steps.step3.title: "Build — vaste prijs, vaste scope."
- steps.step3.body: "We bouwen het systeem. Wekelijkse demo's. Documentatie tijdens het bouwen, niet erna. Training voor je team. Live gaan met vertrouwen."
- steps.step4.number: "04"
- steps.step4.title: "Retainer — de lange termijn."
- steps.step4.body: "We houden het systeem in de lucht, en breiden het uit terwijl je bedrijf verandert. Iedere Build wordt bedoeld om er één te worden."

EN:
- header.eyebrow: "// How we work"
- header.h2Part1: "From first message to shipped system,"
- header.h2Part2: "in four honest phases."
- header.numeral: "04"
- steps.step1.number: "01"
- steps.step1.title: "Discovery — 45 minutes."
- steps.step1.body: "A real conversation. We ask questions; you tell us how your business runs. At the end, we say honestly whether we're the right partner — or not."
- steps.step2.number: "02"
- steps.step2.title: "Audit — two weeks, €2,500."
- steps.step2.body: "We map your operation. Interviews, workflows, tools. You get a written report with a concrete roadmap."
- steps.step3.number: "03"
- steps.step3.title: "Build — fixed price, fixed scope."
- steps.step3.body: "We build the system. Weekly demos. Documentation written as we build, not after. Training for your team. Going live with confidence."
- steps.step4.number: "04"
- steps.step4.title: "Retainer — the long term."
- steps.step4.body: "We keep the system running, and extend it as your business changes. Every Build is meant to become one."

Apply the DRAFT-flag pattern (matching what previous steps used) to mark header.h2Part1 and header.h2Part2 in nl.json as pending Deepak review.

Report the diff for both files before proceeding.

TASK 4 — Create the HowWeWork section component.
Create components/sections/HowWeWork.tsx.

Structure:
1. 'use client' at the top.
2. Imports: motion, useReducedMotion from framer-motion; useTranslations from next-intl; Section, Container from components/layout/; Eyebrow from components/ui/.
3. Inside the component:
   a. useTranslations('howWeWork')
   b. useReducedMotion assigned to shouldReduce
   c. Build a steps array from translations — four entries with { number, title, body }.
4. Return:
   <Section background="night">
     <Container>
       <div className="grid grid-cols-1 lg:grid-cols-[45%_55%] gap-6">
         {/* Left column — header with the oversized 04 numeral behind the H2 */}
         <div className="relative">
           <Eyebrow>{t('header.eyebrow')}</Eyebrow>
           <h2 className="[type-h2 utility] text-cream mt-6 relative z-10">
             {t('header.h2Part1')}
             <br />
             {t('header.h2Part2')}
           </h2>
           <span
             aria-hidden="true"
             className="absolute top-8 -left-4 font-display text-[200px] leading-none text-night-soft select-none pointer-events-none"
           >
             {t('header.numeral')}
           </span>
         </div>

         {/* Right column — four steps with dashed connecting line */}
         <div className="relative">
           {/* Dashed connecting line — desktop only, positioned behind circles */}
           <div
             aria-hidden="true"
             className="hidden lg:block absolute left-6 top-6 bottom-6 border-l border-dashed border-muted/30"
           />
           <div className="flex flex-col space-y-16 relative">
             {steps.map((step, i) => (
               <motion.div
                 key={step.number}
                 className="flex flex-row items-start gap-6"
                 initial={shouldReduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true, amount: 0.3 }}
                 transition={{ duration: shouldReduce ? 0 : 0.6, delay: shouldReduce ? 0 : i * 0.12, ease: [0.16, 1, 0.3, 1] }}
               >
                 <div className="w-12 h-12 rounded-full border border-muted flex items-center justify-center flex-shrink-0 bg-night relative z-10">
                   <span className="text-cream font-semibold text-sm">{step.number}</span>
                 </div>
                 <div className="flex-1">
                   <h3 className="text-cream font-semibold text-xl leading-snug">{step.title}</h3>
                   <p className="text-muted text-[15px] leading-relaxed mt-2">{step.body}</p>
                 </div>
               </motion.div>
             ))}
           </div>
         </div>
       </div>
     </Container>
   </Section>

Notes on the JSX above:
- The circle has bg-night (not bg-transparent) so it visually clips the dashed line behind it, giving the impression of the line "passing through" clean gaps. This is important — if the circle is transparent, the line runs through the number, which looks broken.
- The dashed line's left offset is left-6 (24px), which matches the horizontal centre of a 48px circle (48/2 = 24). This aligns the line exactly with the circle centres.
- The dashed line spans top-6 bottom-6 — meaning it starts 24px from the top of the container (aligning with the first circle's centre) and ends 24px from the bottom (aligning with the last circle's centre). If this doesn't produce clean alignment in practice, the numbers may need adjustment.
- z-10 on the circles ensures they sit above the dashed line.
- The dashed line's border-muted/30 is a starting opacity — if it reads too subtle or too strong against night, adjust the /30 value.
- Adjust type-h2 utility name to whatever was established in Step 8.
- Adjust text-night-soft class name to match whatever token name was used or added in Task 2.

Confirm the file was written and report its line count.

TASK 5 — Wire HowWeWork into the page.
Open app/[locale]/page.tsx. Import HowWeWork from '@/components/sections/HowWeWork' and render it directly after <WhatWeDo />. No wrapping div.

Report the diff.

TASK 6 — Start dev server and verify.
Run npm run dev in the background. Wait 15 seconds. Check whether http://localhost:3000/ and http://localhost:3000/en both return 200. Report any compilation errors, TypeScript errors, or missing-translation-key warnings.

If clean, pause and wait for my browser verification.

TASK 7 — Wait for user verification.
Pause here. I will check:
- Scrolling down from WhatWeDo, the section appears with a dark (--night) background — a real, visible switch from cream to dark, not a subtle shade change
- All text on the dark background reads clearly — cream on night for the H2 and step titles, muted (but still legible) for the step bodies
- The oversized "04" numeral is visible but subtle behind the H2 — reads as texture, not as prominent content; H2 sits on top and stays fully readable
- H2 splits into two lines with the manual break (Part 1 above, Part 2 below)
- Four numbered circles stack vertically on the right, connected by a dashed line running through their centres on desktop
- The dashed line does NOT visibly pass through the number circles — it appears to route behind them cleanly (achieved via the circle's opaque bg-night background)
- On mobile (below lg), the dashed line disappears; steps stack cleanly with the same circle + text layout
- As each step scrolls into view, it fades up with a slight vertical translation; the four steps arrive in staggered sequence, not simultaneously
- With OS Reduce Motion enabled, everything is immediately visible with no animation
- Hero, Problem, and WhatWeDo above still behave as expected — no regressions from the added section

Once I say "verified", proceed to Task 8.

TASK 8 — Stop dev server. Kill orphans. Commit and push.
Run git status and report. Should see:
- New: components/sections/HowWeWork.tsx, prompts/STEP_10_How_We_Work.md
- Modified: app/[locale]/page.tsx, messages/nl.json, messages/en.json
- Possibly modified: components/layout/Section.tsx and/or app/globals.css (only if Task 2 required changes)

Stage all: git add -A

Commit with:
feat(step-10): add How We Work section on night background (NL H2 draft pending review)

Push.

TASK 9 — Final report.

STEP 10 COMPLETE
- Component created: components/sections/HowWeWork.tsx ([line count] lines)
- Section.tsx changes: [none / added night variant / describe]
- globals.css changes: [none / added --night-soft token with value X / describe]
- Files modified: app/[locale]/page.tsx, messages/nl.json, messages/en.json
- Dashed connecting line technique used: [describe]
- Dev server: [worked / did not work]
- User verification: [confirmed / not confirmed]
- Git commit: [hash and message]
- Git push: [succeeded / failed]
- Port 3000: [free at end / occupied]
- Content debt: 4 unreviewed Dutch drafts now (Hero headline, Problem H2, WhatWeDo subhead, HowWeWork H2)

END OF PROMPT.
```

---

## Acceptance test — what you verify after Claude Code finishes

### Check 1 — Dark section transition feels intentional
Scroll down from the cream WhatWeDo cards into the night HowWeWork section. The transition should feel like a deliberate mode switch — a "different chapter" of the page — not a jarring jump or an ambiguous colour shift. If it reads as harsh or accidental, the section spacing (padding above/below) may need adjustment.

### Check 2 — Contrast reads well
Every piece of text should be comfortably readable. Cream body text on night is the primary text combination for this section — if it feels dim or if you find yourself squinting, the token calibration is off. Same check on the muted step-body text: it should read as "quieter than the title but still fully legible."

### Check 3 — Oversized "04" is texture, not content
The 200px "04" behind the H2 should be visible but *subtle* — background texture, not a shouty label. If it competes with the H2 for attention, `--night-soft` is too bright; adjust the token. If it's invisible, adjust the other way.

### Check 4 — Dashed line routes cleanly behind circles
Look closely at where the dashed line meets each number circle. The dashes should visually "pass behind" the circle, not continue *through* the number. If the line runs across the number, the circle's `bg-night` isn't opaque, or the z-index stacking is wrong.

### Check 5 — Step reveal staggers naturally
Scroll into the section slowly. Steps should fade up in sequence, not simultaneously. The 120ms stagger should feel like a slow, deliberate cascade — matching the section's slower, more considered tone. If they arrive all at once, the delay-per-index isn't applying.

### Check 6 — Reduce motion
Toggle OS Reduce Motion. Reload. Scroll to the section. All four steps should be already-visible, no reveal. Routine check by now — same shared `useReducedMotion` pattern.

### Check 7 — Mobile
Below `lg`, the two-column layout collapses to one column: header stacks above the four steps. The dashed line disappears. Steps still show circles + text, still animate on scroll.

### Check 8 — No regressions
Scroll back up. Hero, Nav, Problem, WhatWeDo all still look and behave as expected.

---

## If this doesn't work

Paste back:
1. Exact error or unexpected behaviour.
2. Which check (1–8) failed.
3. Screenshot for visual issues — dark-background sections are especially hard to describe in words.

Do not let Claude Code guess-and-retry more than once — pause and paste back.

---

## What comes next

Once all eight checks pass, come back and say:

> **"Step 10 done. Give me Step 11."**

**Step 11 is the Verticals section** — back to a cream background, centred header, three-column grid showing OTS's three specific verticals (Hospitality / Health & Wellness / Professional Services). It's a smaller section than HowWeWork with no new patterns, and it's the last "positioning" section before the site starts pointing outward — Essays (Step 12), Team (Step 13), Final CTA (Step 14).

By that point, five of eight homepage sections will be complete. Half the homepage.

---

**Step 10 · How We Work · v1.0 (Claude Code-driven)**
*Behind every smooth business is a better system.*
