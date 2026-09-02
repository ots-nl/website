# STEP 12a — Recent Essays Structure

**Project:** Ontwikkeling Tech Services — Marketing Website
**Type:** Claude Code prompt
**Estimated time:** 60–75 minutes
**Owner:** Virat
**Version:** 1.0
**Phase:** 3 — Navigation and Homepage

---

## Goal

Build the "Recent Essays" section: the sixth homepage section. A left-header + right-ghost-link header sits above three equal-width essay preview cards on a cream-deep background. Each card shows a placeholder photograph zone, meta line (read time · category · date), title, two-line excerpt, and a "Read essay →" link.

Cards use a **different hover interaction** from the Service Ladder cards — no lift, no border transition; instead the photograph subtly scales up and the title colour transitions to accent. This is the section's one small distinctive interaction.

Photograph zones remain placeholders in this step. Real photography is Step 12b — same split rationale as Hero (7a/7c) and Service Ladder (9a/9b).

---

## Context

- References **PRD v1.1 §4.6** (Recent Essays section spec, verbatim structure).
- Prerequisite: Step 11 complete. Verticals section is live.
- Component library: `Section`, `Container`, `Eyebrow` — all reused.

### The one thing that's genuinely uncomfortable about this section

**The three essays don't exist yet. They will be drafted placeholders.**

The PRD is emphatic on this (§4.6):

> *"At launch, essays are Phase-1 content — we should have a minimum of 3 essays live before launch. Never publish a 'coming soon' placeholder. If the third essay is not ready, the section renders with two essays, not three placeholders."*

So there's a real tension between the build phase (which is now, well before launch) and the launch requirement (which comes later, in Phase 4 with the essay system). What this step ships:

- Three drafted essay previews with realistic titles, excerpts, dates, categories, and read times. These render in the section exactly as real essays would.
- "Read essay →" links pointing to `/essays/[slug]` anchors that don't yet resolve — same pattern used for Nav links (Step 6), Service Ladder CTAs (Step 9a), and the "See all essays" link in this section's header.
- A **clear content flag** in `nl.json` marking these as placeholder essays that must be replaced with real published essays before the site launches publicly.

**What this step is NOT:**

- A launch. This work does not go live in front of prospects. The homepage in-progress lives on localhost or a staging URL.
- A commitment to these specific essays. Deepak and Ankur will write real essays before launch; the drafts here are just plausible placeholders so the section has content to render during development. If the real essays end up on totally different topics, that's fine — the previews get replaced when the essay system arrives in Phase 4.

**What still has to happen before public launch (tracked as debt, not this step's problem):**

- Real essays authored by Deepak/Ankur (minimum 3).
- `/essays` index page built (Phase 4).
- `/essays/[slug]` detail pages built (Phase 4).
- This section's translation values updated to reference the real essays.

Same "known Phase 4 dependency" pattern as anchors and other unresolved routes. No shortcut around this one; the PRD's rule about placeholders exists for a reason.

### Interaction pattern that's new

Service Ladder cards hover with a whole-card lift + border colour transition. Essay cards use a different, more restrained pattern:

- The photograph subtly scales up (1 → 1.03) over 500ms.
- The title text colour transitions from `--ink` to `--accent`.
- Nothing else moves — no lift, no border change, no shadow.

Two things to know about implementing this:

1. **The photo container needs `overflow-hidden`** or the scaling image will spill out of its rounded shape. Small detail, easy to miss, breaks the whole effect if missed.
2. **The title colour transition is driven by the parent's hover state**, not the title's own hover. Because the whole card is one `<Link>`, we use Tailwind's `group` on the card and `group-hover:text-accent` on the title. Same pattern as the Service Ladder cards' text-link underline.

### Content flags (running total: 5 unreviewed drafts + placeholder essays)

- **H2:** Given in both languages by PRD. Not a draft. ✓
- **Header ghost link ("See all essays →"):** English given by PRD; Dutch drafted here — *"Alle essays →"*. Small draft.
- **Read link on each card ("Read essay →"):** Not in PRD; Dutch drafted here — *"Lees essay →"*.
- **Three essay previews:** ALL placeholder content — titles, excerpts, meta lines. Flagged as placeholders, not drafts (different category — drafts need review, placeholders need replacement).

Still 5 unreviewed Dutch drafts across the homepage from prior steps. Still waiting on Deepak.

---

## Files this step creates or modifies

**Creates:**
- `components/sections/RecentEssays.tsx` — Client Component (uses `whileInView`)
- `prompts/STEP_12a_Recent_Essays_Structure.md` — this file

**Modifies:**
- `app/[locale]/page.tsx` — imports `<RecentEssays />` and renders after `<Verticals />`
- `messages/nl.json` — adds `recentEssays` namespace with a PLACEHOLDER flag on essay content
- `messages/en.json` — adds `recentEssays` namespace

**Does NOT touch:**
- Any shared component
- Any photograph asset — that's Step 12b
- The `/essays` route — doesn't exist yet, Phase 4 work

---

## The copy — verbatim, both languages

**Header eyebrow:**
- NL: `// Essays`
- EN: `// Essays`

**Header H2:**
- NL: `Waar we mee bezig zijn.`
- EN: `What we've been thinking about.`

**Header ghost link (right-aligned):**
- NL *(draft)*: `Alle essays →`
- EN: `See all essays →`
- Link target: `/essays` (route doesn't exist yet — resolves in Phase 4)

**Essay 01 — placeholder:**
- Meta line NL: `8 min · Systemen · februari 2026` / EN: `8 min · Systems · February 2026`
- Title NL: `Waarom we geen chatbots verkopen.` / EN: `Why we don't sell chatbots.`
- Excerpt NL: `Elke maand brengt weer een agency een chatbot uit. Elke maand wordt de onderliggende operationele chaos erger.`
- Excerpt EN: `Every month another agency ships a chatbot. Every month the underlying operational chaos gets worse.`
- Read link target: `/essays/waarom-we-geen-chatbots-verkopen` (NL) / `/essays/why-we-dont-sell-chatbots` (EN)

**Essay 02 — placeholder:**
- Meta line NL: `12 min · Horeca · januari 2026` / EN: `12 min · Hospitality · January 2026`
- Title NL: `Het reserveringsplatform is jouw bankrekening. Iemand anders heeft de sleutel.` / EN: `The reservation platform is your bank account. Someone else has the key.`
- Excerpt NL: `Een restaurant met 200 couverts per avond bezit een dataset die meer waard is dan de meeste SaaS-bedrijven. De meeste restaurants bezitten die dataset niet.`
- Excerpt EN: `A restaurant with 200 covers a night has a data asset worth more than most SaaS companies. Most restaurants don't own it.`
- Read link target: `/essays/het-reserveringsplatform` (NL) / `/essays/the-reservation-platform` (EN)

**Essay 03 — placeholder:**
- Meta line NL: `10 min · Systemen · december 2025` / EN: `10 min · Systems · December 2025`
- Title NL: `Hoe een Audit van twee weken er echt uitziet.` / EN: `What a two-week Audit actually looks like.`
- Excerpt NL: `Interviews, workflows en een rapport van 15 pagina's — binnen de twee weken die aan elke OTS Build voorafgaan.`
- Excerpt EN: `Interviews, workflows, and a 15-page report — inside the two weeks that precede every OTS Build.`
- Read link target: `/essays/hoe-een-audit-eruitziet` (NL) / `/essays/what-an-audit-looks-like` (EN)

**Card read link text:**
- NL *(draft)*: `Lees essay →`
- EN: `Read essay →`

---

## Detailed specification (PRD §4.6)

**Section wrapper:**
- `<Section background="cream-deep">` — using the token added in Step 8.
- Vertical padding: 128px on desktop.

**Header (two-column):**
- Layout: `flex flex-row justify-between items-end` on desktop, stacks on mobile.
- Left cluster: eyebrow + H2 stacked vertically.
- Right: a single "See all essays" ghost link, right-aligned, vertically anchored to the H2's baseline.
- The ghost link is Inter 500 15px `--ink`, with the ghost-arrow underline pattern already established in the Button component's `ghost` variant / Nav link hovers — reuse the same `::after` pseudo-element underline draw-in pattern. If wrapping the link in the existing Button component's `ghost` variant is cleaner, do that; if not, replicate the underline pattern inline.

**Cards row:**
- `mt-16` (64px) below the header.
- Grid: `grid-cols-1 md:grid-cols-3 gap-8` (32px gap).
- No `min-h-*` on cards — essay cards have no border/background, so they naturally align by content top with the grid.

**Card structure (identical for all three):**

- The entire card is one `<Link>` component wrapping the whole thing (same pattern as Service Ladder). The "Read essay →" text at the bottom is styled text, not a nested anchor.
- `<Link className="group flex flex-col ...">` — the `group` class is essential; the title's hover transition depends on it.
- **No border, no background, no padding on the card itself.** The card is unstyled beyond its `flex flex-col` structure. Contrast with Service Ladder cards (which have `bg-cream`, borders, padding) — the essay cards are meant to feel like editorial content, not UI chrome.

**Zone 1 — Placeholder photograph zone (top):**
- Container: `w-full aspect-[4/3]` (aspect ratio 4:3), `rounded-2xl` (16px border-radius per PRD), `overflow-hidden`, `bg-cream` (LIGHT cream to contrast against the section's cream-deep background — inverse of Service Ladder's placeholder treatment). `border border-dashed border-rule` for the placeholder-mode dashed frame.
- Centred label inside: `text-muted text-xs` — `"Photograph — Step 12b"`.
- `overflow-hidden` here is critical — it's what will clip the real image's `1 → 1.03` scale on hover in Step 12b. Even with a placeholder inside, keep it in place so 12b's swap doesn't need to re-verify this.

**Zone 2 — Content below the photo:**
- `mt-6` (24px) below the photo container.
- Meta line: Inter 400 12px `--muted`. E.g. `"12 min · Hospitality · January 2026"`.
- Title: Anton, 24px, `--ink`, line-height 1.15, `mt-2` (8px below meta). The title element has the class `transition-colors duration-500 group-hover:text-accent` — this is what makes the title turn accent-orange when the card is hovered.
- Excerpt: Inter 400 14px `--ink-soft`, line-height 1.55, `mt-3` (12px below title). Add `line-clamp-2` (Tailwind's built-in) so long excerpts truncate at exactly two lines with an ellipsis.
- Read link: `mt-4` (16px below excerpt). Inter 500 13px `--ink`. Styled text with a ghost arrow — no nested anchor.

**Placeholder photo hover behaviour (deferred):**
- In this step (12a), there's no image to scale — just a placeholder. That's fine; leave the hover as-is on the container. The `group-hover:scale-[1.03]` will attach to the real `<Image>` in Step 12b, not to the placeholder. Don't add scale behaviour to the placeholder — it would just look like a weird box growing on hover.
- The title colour hover DOES work in this step because it's a text-colour change, not dependent on the image being present.

**Motion (scroll-triggered — same pattern as prior sections):**
- Header (eyebrow + H2 + ghost link): static, no scroll animation.
- Each card: `initial={{ opacity: 0, y: 24 }}`, `whileInView={{ opacity: 1, y: 0 }}`, `viewport={{ once: true, amount: 0.2 }}`, `transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}`.
- 100ms stagger, matching Verticals and WhatWeDo.
- Respect `prefers-reduced-motion` via `useReducedMotion`.

---

## THE PROMPT — paste this into Claude Code

```
You are executing Step 12a of the OTS website build. This step creates the Recent Essays section — the sixth section on the homepage — with three essay preview cards on cream-deep background. Photograph zones remain placeholders; real photos are Step 12b. Essay content itself is drafted PLACEHOLDER content that will be replaced with real essays before public launch — the drafts render in the section during development to prove the layout works.

Follow this plan exactly. If anything fails or is unclear, pause and report — do not attempt fixes without asking.

CONTEXT:
- components/sections/Verticals.tsx is complete as of Step 11.
- Section background is --cream-deep (added in Step 8). Ensure it's applied at the top-level Section wrapper.
- The cards use a distinctive hover interaction: photograph scales 1 → 1.03 over 500ms, title colour transitions from --ink to --accent. This is different from Service Ladder cards' whole-card lift.
- The essay content values in the translation files are PLACEHOLDERS — not real published essays. They must be flagged as such in nl.json (using the same _notes or comment pattern as prior draft flags).
- Read links point to /essays/[slug] URLs that don't resolve yet — Phase 4 work.
- Both languages get their own slug in the href (Dutch slugs for NL, English slugs for EN). Store slugs in the translation files.

TASK 1 — Verify prerequisites.
Report:
- pwd, git status (clean except this step's untracked prompt file), git log --oneline -3 (last commit should be Step 11's Verticals commit)
- Port 3000 check, kill any orphan
- Confirm --cream-deep exists as a Section background variant (added Step 8)
- Confirm the type-h2 utility from Step 8 is present
- Read components/ui/Button.tsx briefly and confirm the ghost variant's underline-draw-in ::after pseudo-element pattern — the header's "See all essays →" ghost link and the cards' "Read essay →" text link will reuse this exact pattern for hover underline
- Confirm the locale-aware Link import path being used elsewhere (see Nav.tsx / WhatWeDo.tsx) so the essay card wrappers use the same import

Pause for my approval before proceeding.

TASK 2 — Add recentEssays translations.
Add a "recentEssays" namespace to messages/nl.json and messages/en.json, nested by section — "header" and "essays.e1" / "essays.e2" / "essays.e3", plus a top-level "readLinkText". Use values EXACTLY as given in the step file; do not paraphrase, do not adjust punctuation, do not translate the URL slugs.

Full key list per locale:
- header.eyebrow
- header.h2
- header.viewAllLinkText
- header.viewAllHref (both "/essays" — same in both locales)
- essays.e1.meta
- essays.e1.title
- essays.e1.excerpt
- essays.e1.href (localised slug: NL "/essays/waarom-we-geen-chatbots-verkopen", EN "/essays/why-we-dont-sell-chatbots")
- essays.e2.meta / title / excerpt / href (same shape as e1)
- essays.e3.meta / title / excerpt / href (same shape as e1)
- readLinkText

CRITICAL: apply a placeholder flag in BOTH nl.json AND en.json (not just Dutch — these are placeholders in both languages) marking the three essays.e1/e2/e3 blocks. Use the same _notes/comment pattern established in prior steps. Text of the flag: "PLACEHOLDER — these three essays are development-time content, NOT real published essays. Must be replaced with real essays authored by Deepak/Ankur before public launch, along with the corresponding /essays/[slug] pages built in Phase 4."

Also apply the DRAFT flag to header.viewAllLinkText and readLinkText in nl.json (Dutch drafts pending Deepak review).

Report the diff for both files before proceeding.

TASK 3 — Create the RecentEssays section component.
Create components/sections/RecentEssays.tsx.

Structure:
1. 'use client' at the top.
2. Imports: motion, useReducedMotion from framer-motion; useTranslations from next-intl; Section, Container from components/layout/; Eyebrow from components/ui/; the locale-aware Link from wherever Nav.tsx imports it.
3. Inside the component:
   a. useTranslations('recentEssays')
   b. useReducedMotion assigned to shouldReduce
   c. Build an essays array — three entries with { id, meta, title, excerpt, href } drawn from translations
4. Return:
   <Section background="cream-deep">
     <Container>
       {/* Header — left cluster + right ghost link */}
       <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6">
         <div>
           <Eyebrow>{t('header.eyebrow')}</Eyebrow>
           <h2 className="[type-h2 utility] text-ink mt-6">
             {t('header.h2')}
           </h2>
         </div>
         <Link
           href={t('header.viewAllHref')}
           className="group relative inline-block text-ink text-[15px] font-medium after:content-[''] after:absolute after:left-0 after:right-0 after:-bottom-0.5 after:h-[1px] after:bg-current after:scale-x-0 hover:after:scale-x-100 after:origin-left after:transition-transform after:duration-[350ms] after:ease-[cubic-bezier(0.4,0,0.2,1)]"
         >
           {t('header.viewAllLinkText')}
         </Link>
       </div>

       {/* Cards row */}
       <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
         {essays.map((essay, i) => (
           <motion.div
             key={essay.id}
             initial={shouldReduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true, amount: 0.2 }}
             transition={{ duration: shouldReduce ? 0 : 0.6, delay: shouldReduce ? 0 : i * 0.1, ease: [0.16, 1, 0.3, 1] }}
           >
             <Link href={essay.href} className="group flex flex-col">
               {/* Photo placeholder — will be replaced with next/image in Step 12b */}
               <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden bg-cream border border-dashed border-rule flex items-center justify-center">
                 <span className="text-muted text-xs">Photograph — Step 12b</span>
               </div>

               {/* Content */}
               <div className="mt-6">
                 <div className="text-muted text-xs">{essay.meta}</div>
                 <h3 className="font-display text-2xl leading-tight text-ink mt-2 transition-colors duration-500 group-hover:text-accent">
                   {essay.title}
                 </h3>
                 <p className="text-ink-soft text-sm leading-relaxed mt-3 line-clamp-2">
                   {essay.excerpt}
                 </p>
                 <div className="mt-4 text-ink text-[13px] font-medium">
                   {t('readLinkText')}
                 </div>
               </div>
             </Link>
           </motion.div>
         ))}
       </div>
     </Container>
   </Section>

Notes on the JSX above:
- The "group" class on each essay card's Link is what enables the group-hover:text-accent on the title.
- overflow-hidden on the photo placeholder is future-proofing for Step 12b's scaling image — even though there's no image to scale in this step, keep the class so 12b doesn't need to re-verify layout.
- The photo placeholder uses bg-cream (light) on the cream-deep section — this is the inverse of Service Ladder placeholder treatment, giving visible contrast.
- The header's ghost link reuses the ::after underline pattern from Button ghost variant / Nav link hovers — copy that exact pattern if the utility isn't extractable.
- line-clamp-2 truncates long excerpts to exactly two lines with an ellipsis. Requires Tailwind v3.3+ (should be present; verify if it's not).
- Adjust type-h2 utility name to whatever was established in Step 8.
- Slugs in href values are localised per essay — pass them through from translations.

Confirm the file was written and report its line count.

TASK 4 — Wire RecentEssays into the page.
Open app/[locale]/page.tsx. Import RecentEssays from '@/components/sections/RecentEssays' and render it directly after <Verticals />. No wrapping div.

Report the diff.

TASK 5 — Start dev server and verify.
Run npm run dev in the background. Wait 15 seconds. Check whether http://localhost:3000/ and http://localhost:3000/en both return 200. Report any compilation, TypeScript, or missing-translation-key warnings.

If clean, pause and wait for my browser verification.

TASK 6 — Wait for user verification.
Pause here. I will check:
- Scrolling down from Verticals, the section appears with cream-deep background — same background as Problem section, visibly deeper than the surrounding cream sections
- Header renders correctly: eyebrow + H2 on the left, "See all essays →" ghost link right-aligned and vertically baseline-anchored to the H2
- Hovering the "See all essays →" link draws in the underline from left to right (matching the ghost pattern used elsewhere)
- Three essay preview cards render below the header with generous horizontal spacing
- Each card shows: labelled placeholder photo (4:3 aspect ratio, rounded corners, dashed border, "Photograph — Step 12b" label), then meta line, then title, then two-line excerpt (truncated with ellipsis if longer), then "Read essay →" text
- Placeholders read as clearly not-yet-real (dashed border, bg-cream on cream-deep contrasts visibly)
- Hovering a card: the title text transitions from --ink to --accent orange smoothly (500ms). Nothing else moves on the card (no lift, no border change — this is deliberate, different from Service Ladder cards). The whole card is clickable (not just the "Read essay" text)
- Clicking a card doesn't error — the target /essays/[slug] doesn't resolve yet, that's expected
- Meta lines render correctly: "8 min · Systems · February 2026" (EN), "8 min · Systemen · februari 2026" (NL) — categories translated appropriately per language, dates in the correct locale format
- As each card enters the viewport on scroll, it fades up with 100ms stagger between cards
- With OS Reduce Motion enabled, cards appear immediately at final state; hover behaviours (title colour change) still work but any transition duration should still be applied (reduce-motion is about preventing motion-induced discomfort, not disabling hover feedback entirely — 500ms colour transitions are fine even under reduce-motion since colour isn't motion)
- Mobile: cards stack vertically; hover becomes tap; layout stays clean
- No regressions above the section

Once I say "verified", proceed to Task 7.

TASK 7 — Stop dev server. Kill orphans. Commit and push.
Run git status and report. Should see:
- New: components/sections/RecentEssays.tsx, prompts/STEP_12a_Recent_Essays_Structure.md
- Modified: app/[locale]/page.tsx, messages/nl.json, messages/en.json

Stage all: git add -A

Commit with:
feat(step-12a): add Recent Essays section structure with placeholder essay content

Push.

TASK 8 — Final report.

STEP 12a COMPLETE
- Component created: components/sections/RecentEssays.tsx ([line count] lines)
- Files modified: app/[locale]/page.tsx, messages/nl.json, messages/en.json
- Dev server: [worked / did not work]
- User verification: [confirmed / not confirmed]
- Git commit: [hash and message]
- Git push: [succeeded / failed]
- Port 3000: [free at end / occupied]
- CRITICAL launch-blocker reminders:
  * The three essay preview entries in recentEssays.essays.e1/e2/e3 are PLACEHOLDERS — real essays must be authored before public launch
  * The /essays index route and /essays/[slug] detail routes do not exist yet — Phase 4 work
  * Dutch drafts pending Deepak: header.viewAllLinkText, readLinkText

END OF PROMPT.
```

---

## Acceptance test — what you verify after Claude Code finishes

### Check 1 — Header layout is correct
Eyebrow + H2 on the left, "See all essays →" ghost link on the right, both vertically anchored so the ghost link sits level with the H2's baseline. On mobile, stacks: header above, ghost link below (or hidden — either is acceptable if it collapses cleanly).

### Check 2 — Placeholder photo zones are visibly distinct
The dashed-border light-cream placeholder should read as clearly "not-yet-real" against the section's cream-deep background. If placeholders blend in with the background or look accidental, contrast is off.

### Check 3 — Title colour hover is the whole interaction
Hover slowly over a card. The title text should transition from `--ink` to `--accent` orange over ~500ms. **Nothing else on the card should move** — no lift, no border change, no shadow. This is deliberate and different from the Service Ladder cards. If the whole card lifts, some styling leaked over from the Service Ladder pattern.

### Check 4 — Excerpt truncates cleanly
Read essay 02's excerpt (the reservation-platform one — it's the longest). It should truncate at exactly two lines with an ellipsis. If it wraps to three lines or overflows, `line-clamp-2` isn't applying.

### Check 5 — Meta line renders with correct locale formatting
Switch between `/` and `/en`. Dutch meta should read `"8 min · Systemen · februari 2026"` etc; English should read `"8 min · Systems · February 2026"`. Category names and month names both translate. If the category stays "Hospitality" on the Dutch page, translation didn't apply.

### Check 6 — Ghost link underline draws
Hover "See all essays →" at the top. The underline should draw in from left to right (matching Nav link hovers, Service Ladder text links, and the Button ghost variant). Same pattern as everywhere else.

### Check 7 — Reduce motion
Standard check. Enable OS Reduce Motion, reload, scroll to section. Cards appear without the fade-up animation. Title colour hover still works (it's a colour transition, not motion).

### Check 8 — Mobile
Cards stack cleanly. Placeholder photos still respect the 4:3 aspect ratio at mobile width. Hover becomes tap. Header layout collapses without breaking.

### Check 9 — No regressions
Scroll through all six sections. Everything above still looks and behaves as expected.

---

## If this doesn't work

Paste back:
1. Exact error or unexpected behaviour.
2. Which check (1–9) failed.
3. Screenshot for visual issues.

---

## What comes next

Once all nine checks pass, come back and say:

> **"Step 12a done. Give me Step 12b."**

**Step 12b is the three essay preview photographs** — same sourcing shape as Service Card photos (Step 9b) but for editorial rather than service-context imagery. These photos don't have to align to specific compositional intents like the service cards did; they can be more purely editorial (a warm-lit desk, a book open on a table, an architectural detail — anything documentary that reads as "essay illustration" rather than "product shot"). Three more images to source, plus the `1 → 1.03` scale-on-hover behaviour wires in on the real `<Image>`.

After 12b, the section is fully complete and six of eight homepage sections are done. Team (Step 13) and Final CTA (Step 14) remain, plus the Footer.

---

**Step 12a · Recent Essays Structure · v1.0 (Claude Code-driven)**
*Behind every smooth business is a better system.*
