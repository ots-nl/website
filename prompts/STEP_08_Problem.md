# STEP 08 — The Problem Section

**Project:** Ontwikkeling Tech Services — Marketing Website
**Type:** Claude Code prompt
**Estimated time:** 60–90 minutes
**Owner:** Virat
**Version:** 1.0
**Phase:** 3 — Navigation and Homepage

---

## Goal

Build the Problem section: the second section on the homepage, immediately below the Hero. A cream-deep-background section that carries the "operational chaos" narrative from the Brand Bible — the moment where a visiting restaurant owner or clinic manager reads the copy and thinks *"they're describing my business."*

Left column carries the section header (eyebrow + H2). Right column stacks three observation blocks, each with an oversized muted numeral above the block's title and body. Blocks fade up on scroll — the first below-the-fold reveal in the whole build.

---

## Context

- References **PRD v1.1 §4.2** (Problem Section spec, verbatim copy) and **Brand Bible §2** ("The operational chaos" narrative — one of the three narratives OTS tells).
- Prerequisite: Step 7d complete. Hero is done and the pattern for `components/sections/*` is established.
- All existing infrastructure applies: `Section`, `Container` (with cream-deep background variant — confirm in Task 1), `Eyebrow` with the `plain` (default) variant this time — the `//` prefix format from PRD §4.2, not the pill used in Hero.

### One genuinely new pattern this step introduces: scroll-triggered reveal

The Hero animated once, on page load. Everything below the Hero animates *when the user scrolls it into view* — a fundamentally different trigger. Framer Motion's `whileInView` prop handles this cleanly: it uses IntersectionObserver under the hood to detect when the element enters the viewport, and fires the animation at that moment.

Two things worth understanding about `whileInView` before you see it in the code:

**The `viewport` config controls when the reveal fires.** `once: true` means it plays once and doesn't replay on re-scroll (this is what we want — a re-triggering reveal every scroll gets old fast). `amount: 0.3` means the animation fires when 30% of the element is visible, not when the very first pixel appears — this avoids the awkward moment where content animates while it's still mostly below the fold.

**Stagger is done via delay-per-index, not variants.** For the three observation blocks, each one gets a `delay: index * 0.15` in its transition — so block 1 fires immediately on intersection, block 2 fires 150ms later, block 3 fires 300ms later. Cleaner than Framer's `staggerChildren` variants for this case because each block enters on its own intersection, not as a coordinated group entry.

**Every section from Step 9 onward will use this same pattern.** So the way it's built here becomes the template — worth getting right once.

### Two content flags to know about before you run this

**1. Dutch H2 is a draft.** Same situation as the Hero headline in Step 7b: the PRD gives the English *"Most service businesses are held together by memory, WhatsApp, and effort"* and explicitly says the Dutch should "carry the same weight, not a literal translation." No signed-off Dutch version exists. This step ships a draft — *"De meeste dienstverleners draaien op geheugen, WhatsApp en moeite."* — flagged in the commit message and in the JSON. **Get Deepak to review before launch.** Same reasoning as Hero.

**2. The three block bodies are Dutch-first, verbatim from PRD.** These are the "chaos" observations — restaurant reservations across six channels, customer data on someone else's server, reminders sent by hand. The Dutch is the authored source; the English translations in this step are drafts of the translations (still worth Deepak's eye eventually, but lower stakes than the H2 since the content is faithful to the Dutch original).

---

## Files this step creates or modifies

**Creates:**
- `components/sections/Problem.tsx` — the section component (Client Component from the start — `whileInView` requires it)
- `prompts/STEP_08_Problem.md` — this file

**Modifies:**
- `app/[locale]/page.tsx` — imports `<Problem />` and renders it after `<Hero />`
- `messages/nl.json` — adds a `problem` translation namespace
- `messages/en.json` — adds a `problem` translation namespace

**May modify (only if needed):**
- `components/layout/Section.tsx` — only if it doesn't already support a `cream-deep` background variant (see Task 1)
- `app/globals.css` — only if the type scale from Step 3b doesn't already include an H2 utility matching `clamp(40px, 5vw, 72px)` (see Task 1)

**Does NOT touch:**
- Hero, Nav, or any shared component (`Eyebrow`, `Button`, etc.) — this step consumes them, never modifies them

---

## The copy — verbatim, both languages

**Eyebrow:**
- NL: `// Het probleem`
- EN: `// The problem`

**H2 (two parts — the second part sits on its own isolated line):**
- NL *(draft — pending Deepak review)*:
 - Part 1: `De meeste dienstverleners draaien op geheugen, WhatsApp en`
 - Part 2 (isolated line): `moeite.`
- EN:
 - Part 1: `Most service businesses are held together by memory, WhatsApp, and`
 - Part 2 (isolated line): `effort.`

**Block 01 — Title + Body:**
- NL: `De reserveringen komen binnen via zes verschillende kanalen.` / `Telefoon, Instagram DM, e-mail, de website, walk-ins, en die ene reserveringsplatform die je 3% commissie kost. Iemand — meestal jij — houdt ze bij in een schrift naast de kassa. Elke gemiste boeking is een gemiste avond.`
- EN: `Reservations come in through six different channels.` / `Phone, Instagram DM, email, the website, walk-ins, and that one booking platform charging you 3% commission. Someone — usually you — keeps track in a notebook next to the register. Every missed booking is a missed evening.`

**Block 02 — Title + Body:**
- NL: `Je klantgegevens leven op iemand anders' server.` / `Namen, telefoonnummers, bezoekgeschiedenis — allemaal in platforms die je niet bezit. Je kunt je eigen vaste gasten niet direct bereiken. Elke keer dat ze terugkomen, betaal je opnieuw.`
- EN: `Your customer data lives on someone else's server.` / `Names, phone numbers, visit history — all in platforms you don't own. You can't reach your own regulars directly. Every time they come back, you pay again.`

**Block 03 — Title + Body:**
- NL: `De herinneringen worden met de hand verstuurd.` / `De receptioniste stuurt de bevestigingen. De praktijkassistent belt de no-shows na. De ober appt de tafel van vanavond of ze nog komen. Werk dat een systeem zou moeten doen, gebeurt in mensenhoofden.`
- EN: `Reminders go out by hand.` / `The receptionist sends the confirmations. The practice assistant calls the no-shows. The waiter texts tonight's table to ask if they're still coming. Work a system should do, happening in people's heads.`

---

## Detailed specification (PRD §4.2)

**Section wrapper:**
- Background `--cream-deep`.
- Vertical padding: `128px` on desktop, scaled down on mobile per the existing Section responsive behaviour (confirm in Task 1 what Section already does).

**Grid:**
- Desktop (`lg` and up): two columns, `40% / 60%` — narrower left column for the header, wider right column for the blocks.
- Mobile: single column, header stacks above blocks.
- Container gap: match the standard grid gap used in Hero.

**Left column (header):**
- Eyebrow: `<Eyebrow>` component, **plain variant** (no `variant` prop needed since plain is the default). Renders as accent-coloured Inter 600 11px uppercase text with the `//` prefix inline in the string.
- H2: Anton, `clamp(40px, 5vw, 72px)`, `--ink`, line-height 1.05 (a touch looser than Hero's 0.92 since this is smaller display), letter-spacing -0.02em. Rendered as two parts with a manual `<br />` between — Part 1 is the main clause, Part 2 (`moeite.` / `effort.`) sits alone on its own line to isolate that word as the emotional weight.
- Left-aligned within the column, no forced verticalcentring — the header sits at the top of its column, letting the taller right column visually anchor the section.

**Right column (three blocks stacked vertically):**
- Vertical rhythm: `80px` between blocks (use `space-y-20` or explicit `mt-20` — pick whichever matches how vertical rhythm is expressed elsewhere in the codebase).
- Each block contains, top to bottom:
 1. **Muted numeral** — the string `01`, `02`, `03`. Anton, `120px`, colour `--accent-tint` (the very light warm-orange — should read as barely-visible texture, not information). Offset `-24px` to the left of its block's own left edge (so it protrudes slightly into the left margin — this is the small grid-break for each block). `aria-hidden="true"` on it since it's decorative.
 2. **Title** — Inter 600, 20px, `--ink`. Renders below the numeral (the numeral overlaps the title visually because of its size — that's the intended effect; z-index the title above the numeral so text stays readable). Line-height 1.3.
 3. **Body** — Inter 400, 16px, `--ink-soft`, line-height 1.6, `max-width: 440px`, `mt-4` (16px) below the title.

**Motion:**
- Each of the three blocks: `initial={{ opacity: 0, y: 24 }}`, `whileInView={{ opacity: 1, y: 0 }}`, `viewport={{ once: true, amount: 0.3 }}`, `transition={{ duration: 0.6, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}`.
- The muted numeral inside each block gets an additional small delay (~80ms after its parent block's delay) — the PRD says "muted numerals animate a fraction later." Handle as a nested `motion.span` inside the block with its own transition delay, or as a variant on the block's own reveal. Nested motion is simpler.
- The section header (eyebrow + H2) stays static — no scroll animation. Reasoning: the header enters the viewport first as the user scrolls the section into view, and by the time the reader is engaging with the blocks, the header is already fully visible above. Static header + revealing blocks reads as intentional; animating the header on top would feel busy.
- Respect `prefers-reduced-motion` via `useReducedMotion` from Framer Motion — same pattern as Hero (Step 7d). When reduced, all blocks appear immediately at final state.

**A note on the grid-break rule:**
Brand Bible §2.4 says "once per page" for grid-breaks. The Hero already used its grid-break moment (the photograph bleed). Strictly reading the rule, the Problem numerals' `-24px` offset would violate it. In practice: the Brand Bible's rule is about *major* grid-break moments — one big obvious bleed. Small controlled asymmetries like a -24px numeral offset are better read as "controlled asymmetry within the grid" than "grid-break." The PRD explicitly calls for the numeral offset, so implement it as specified — but flag it in your final report if the visual result feels like it fights the Hero's bleed for attention rather than complementing it.

---

## THE PROMPT — paste this into Claude Code

```
You are executing Step 8 of the OTS website build. This step creates the Problem section — the second section on the homepage, below the Hero — and introduces the scroll-triggered reveal pattern that every below-the-fold section will use from here on.

Follow this plan exactly. If anything fails or is unclear, pause and report — do not attempt fixes without asking.

CONTEXT:
- components/sections/Hero.tsx is complete as of Step 7d. The pattern for components/sections/ files is established: Client Component when motion is needed, Server Component otherwise; motion via framer-motion; shared components consumed from components/ui/ and components/layout/.
- Framer Motion is a project dependency (verified in Step 7d).
- The Eyebrow component supports a variant prop as of Step 7c — plain is the default, pill is opt-in. This step uses plain, so no variant prop is needed on the <Eyebrow> call.
- Design tokens (--cream-deep, --ink, --ink-soft, --accent, --accent-tint, --muted, --rule) already exist in app/globals.css.
- The Brand Bible entrance ease is [0.16, 1, 0.3, 1].
- next-intl translation pattern is established — see the "hero" namespace in messages/nl.json / messages/en.json for the reference shape.

TASK 1 — Verify prerequisites and confirm what exists.
Report:
- pwd, git status (clean except this step's untracked prompt file), git log --oneline -3 (last commit should be Step 7d's Hero animation commit)
- Port 3000 check, kill any orphan
- Read components/layout/Section.tsx and report: does it already support a "cream-deep" (or equivalently-named) background prop value? What are all the background variants it currently supports? If cream-deep is missing, what's the minimal change to add it (add a variant case that applies bg-cream-deep from the token)?
- Read app/globals.css and report: does the type scale include a utility class for H2-scale display text at clamp(40px, 5vw, 72px)? If a utility already matches (something like type-h2 or type-display-medium), report its exact name. If none matches, what's the cleanest way to add one (a new @utility class named type-h2 with the clamp, Anton font-family, appropriate line-height/tracking)?
- Confirm framer-motion is still installed (should be — just sanity-check package.json).
- Read app/[locale]/page.tsx and report its current structure — should show just <Hero /> rendered inside the page component.

Pause for my approval before proceeding. In your report, name any small changes you'd need to make to Section.tsx or globals.css so we can approve them explicitly rather than have them happen silently.

TASK 2 — Add problem translations.
Add a "problem" namespace to messages/nl.json and messages/en.json with these keys — use values EXACTLY as given, do not paraphrase:

NL:
- eyebrow: "// Het probleem"
- h2Part1: "De meeste dienstverleners draaien op geheugen, WhatsApp en"
- h2Part2: "moeite."
- block1Numeral: "01"
- block1Title: "De reserveringen komen binnen via zes verschillende kanalen."
- block1Body: "Telefoon, Instagram DM, e-mail, de website, walk-ins, en die ene reserveringsplatform die je 3% commissie kost. Iemand — meestal jij — houdt ze bij in een schrift naast de kassa. Elke gemiste boeking is een gemiste avond."
- block2Numeral: "02"
- block2Title: "Je klantgegevens leven op iemand anders' server."
- block2Body: "Namen, telefoonnummers, bezoekgeschiedenis — allemaal in platforms die je niet bezit. Je kunt je eigen vaste gasten niet direct bereiken. Elke keer dat ze terugkomen, betaal je opnieuw."
- block3Numeral: "03"
- block3Title: "De herinneringen worden met de hand verstuurd."
- block3Body: "De receptioniste stuurt de bevestigingen. De praktijkassistent belt de no-shows na. De ober appt de tafel van vanavond of ze nog komen. Werk dat een systeem zou moeten doen, gebeurt in mensenhoofden."

EN:
- eyebrow: "// The problem"
- h2Part1: "Most service businesses are held together by memory, WhatsApp, and"
- h2Part2: "effort."
- block1Numeral: "01"
- block1Title: "Reservations come in through six different channels."
- block1Body: "Phone, Instagram DM, email, the website, walk-ins, and that one booking platform charging you 3% commission. Someone — usually you — keeps track in a notebook next to the register. Every missed booking is a missed evening."
- block2Numeral: "02"
- block2Title: "Your customer data lives on someone else's server."
- block2Body: "Names, phone numbers, visit history — all in platforms you don't own. You can't reach your own regulars directly. Every time they come back, you pay again."
- block3Numeral: "03"
- block3Title: "Reminders go out by hand."
- block3Body: "The receptionist sends the confirmations. The practice assistant calls the no-shows. The waiter texts tonight's table to ask if they're still coming. Work a system should do, happening in people's heads."

If the JSON format used elsewhere doesn't support comments, use the same pattern established for the Hero draft flag in nl.json (either the "_notes" key approach or whatever approach was chosen in Step 7b) to mark the Dutch h2Part1 and h2Part2 as DRAFT pending Deepak review. Do not silently omit this flag.

Report the diff for both files before proceeding.

TASK 3 — Any needed changes to Section.tsx or globals.css.
Based on your Task 1 findings, apply only the minimum changes needed:
- If Section.tsx doesn't support cream-deep, add it as a variant case using the existing pattern (do not restructure the component).
- If globals.css doesn't have an H2-scale utility matching the spec, add one (name it consistently with the existing type-* utility naming pattern from Step 3b — e.g. type-h2 or type-display-md, whichever fits).
- If both already exist, skip this task and note that no changes were needed.

Report the diff for any changes.

TASK 4 — Create the Problem section component.
Create components/sections/Problem.tsx. Structure:

1. 'use client' at the top of the file.
2. Imports: motion, useReducedMotion from framer-motion; useTranslations from next-intl; Section, Container from components/layout/; Eyebrow from components/ui/.
3. Inside the component:
   a. Call useTranslations('problem').
   b. Call useReducedMotion() and assign to shouldReduce.
   c. Build an array of the three blocks — [{ numeral: t('block1Numeral'), title: t('block1Title'), body: t('block1Body') }, ...] — so the JSX can .map() over them cleanly rather than repeating three near-identical block markups.
4. Return:
   <Section background="cream-deep"> (or the equivalent name confirmed in Task 1)
     <Container>
       <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] gap-6 lg:gap-6"> (adjust exact gap to match project convention from Hero)
         <div> {/* Left column — header */}
           <Eyebrow>{t('eyebrow')}</Eyebrow>
           <h2 className="[type-h2 utility] text-ink mt-6"> {/* mt-6 or whatever matches Hero eyebrow-to-headline rhythm */}
             {t('h2Part1')}
             <br />
             {t('h2Part2')}
           </h2>
         </div>
         <div className="space-y-20"> {/* Right column — three blocks with 80px vertical rhythm */}
           {blocks.map((block, i) => (
             <motion.div
               key={i}
               initial={shouldReduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true, amount: 0.3 }}
               transition={{ duration: shouldReduce ? 0 : 0.6, delay: shouldReduce ? 0 : i * 0.15, ease: [0.16, 1, 0.3, 1] }}
               className="relative"
             >
               <motion.span
                 aria-hidden="true"
                 className="absolute -left-6 -top-2 font-display text-[120px] leading-none text-accent-tint select-none pointer-events-none"
                 initial={shouldReduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true, amount: 0.3 }}
                 transition={{ duration: shouldReduce ? 0 : 0.6, delay: shouldReduce ? 0 : i * 0.15 + 0.08, ease: [0.16, 1, 0.3, 1] }}
               >
                 {block.numeral}
               </motion.span>
               <h3 className="relative z-10 text-ink font-medium text-xl leading-snug">{block.title}</h3>
               <p className="text-ink-soft text-base leading-relaxed mt-4 max-w-[440px]">{block.body}</p>
             </motion.div>
           ))}
         </div>
       </div>
     </Container>
   </Section>

Notes on the JSX above:
- Adjust exact utility class names to match the project's actual conventions (font-display should map to the Anton variable set up in Step 3a; check the exact name before using).
- The -left-6 (24px) offset on the numeral is the small grid-break per PRD spec.
- text-accent-tint means the numeral is barely-visible warm-orange — texture, not information. If accent-tint isn't a Tailwind class in the project, use inline style with the CSS variable directly (style={{ color: 'var(--color-accent-tint)' }}).
- The blocks-container uses space-y-20 for the 80px vertical rhythm between blocks (Tailwind's space-y-20 = 5rem = 80px).
- z-10 on the h3 ensures the title sits above the oversized numeral even though it comes after it in source order.
- The section header (eyebrow + H2) is NOT wrapped in motion — it stays static, per the spec reasoning above.

Confirm the file was written and report its line count.

TASK 5 — Wire Problem into the page.
Open app/[locale]/page.tsx. Import Problem from '@/components/sections/Problem' and render it directly after <Hero />. No wrapping div — Problem is a Section and manages its own vertical layout.

Report the diff.

TASK 6 — Start dev server and verify.
Run npm run dev in the background. Wait 15 seconds. Check whether http://localhost:3000/ and http://localhost:3000/en both return 200. Report any compilation, TypeScript, or missing-translation-key errors.

If clean, pause and wait for my browser verification.

TASK 7 — Wait for user verification.
Pause here. I will check:
- Scrolling down from the Hero, the Problem section appears with cream-deep background (visibly slightly deeper than the Hero's cream)
- Section header (eyebrow + H2) sits in the left column, static — no animation
- H2 renders as two lines with the emphasized word ("moeite." NL / "effort." EN) isolated on its own line
- Three blocks stack in the right column with generous vertical spacing between them
- Each block shows: an oversized barely-visible numeral (01/02/03) positioned so it slightly overlaps the title area from behind, then the title in bold ink, then the body in softer ink-soft, contained within its readable width
- As each block scrolls into view, it fades up smoothly (opacity + a small vertical translation) — not all at once, they arrive in sequence as you scroll
- The muted numeral of each block appears a fraction later than its title/body — a subtle secondary reveal
- With OS Reduce Motion enabled, scrolling shows everything already-visible with no animation
- Mobile view (below lg): single column, header stacks above blocks, everything remains legible with no overflow

Once I say "verified", proceed to Task 8.

TASK 8 — Stop dev server. Kill orphans. Commit and push.
Run git status and report. Should see:
- New: components/sections/Problem.tsx, prompts/STEP_08_Problem.md
- Modified: app/[locale]/page.tsx, messages/nl.json, messages/en.json
- Possibly modified: components/layout/Section.tsx and/or app/globals.css (only if Task 3 required changes)

Stage all: git add -A

Commit with:
feat(step-08): add Problem section with scroll-triggered reveal (NL H2 draft pending review)

Push.

TASK 9 — Final report.

STEP 8 COMPLETE
- Component created: components/sections/Problem.tsx ([line count] lines)
- Section.tsx changes: [none / added cream-deep variant / describe]
- globals.css changes: [none / added type-h2 utility / describe]
- Files modified: app/[locale]/page.tsx, messages/nl.json, messages/en.json
- Dev server: [worked / did not work]
- User verification: [confirmed / not confirmed]
- Git commit: [hash and message]
- Git push: [succeeded / failed]
- Port 3000: [free at end / occupied]
- Reminder: Dutch H2 ("De meeste dienstverleners draaien op geheugen, WhatsApp en moeite.") is DRAFT — send to Deepak for review before treating as final copy.

END OF PROMPT.
```

---

## Acceptance test — what you verify after Claude Code finishes

### Check 1 — Section reads as "the next section"
Scroll down from the Hero. The Problem section's cream-deep background should be visibly slightly darker/warmer than the Hero's cream — the transition should read as "you've entered a new section," not as an accidental colour shift.

### Check 2 — H2 word isolation lands emotionally
The H2 should render as two lines, with `moeite.` (or `effort.`) alone on the second line. That word standing alone is doing real work — it's the emotional weight of the sentence. If both parts render on one line, the manual break isn't applied. If the second line has more than one word, adjust the split.

### Check 3 — Numerals read as texture, not information
The `01`, `02`, `03` should be visible but *quiet* — the accent-tint colour means they read as ghostly, warm-orange decoration behind the title text, not as prominent labels. If they compete for attention with the titles, the colour is too strong. If they're invisible, the colour token is wrong.

### Check 4 — Scroll reveal timing feels natural
Scroll slowly down through the Problem section, watching the blocks appear. Each one should fade up as it enters ~30% into the viewport, and the second and third blocks should arrive slightly staggered rather than all three at once. If all three animate simultaneously, the stagger delay isn't applying. If a block appears fully before you can see it, the intersection threshold is too low.

### Check 5 — Muted numeral micro-delay
Watch a block's reveal closely. The numeral behind the text should appear a fraction after the title and body — a subtle secondary layer. If they arrive perfectly in sync, the +80ms nested delay isn't applying. Not a big deal if it's tight, but the PRD calls for it.

### Check 6 — Reduce motion works (the check that keeps getting skipped)
Enable OS Reduce Motion. Reload. Scroll through the Problem section. Everything should already be visible, no fade-ups, no motion. This isn't optional — it's a Brand Bible mandate and an accessibility requirement.

### Check 7 — Mobile
Below the `lg` breakpoint, the section collapses to a single column: header first, then blocks stacked below. Confirm nothing overflows and that the numeral offset (which is designed for the desktop grid) doesn't cause the numeral to escape the viewport on mobile — if it does, the `-left-6` may need to be responsive (e.g. `-left-2 lg:-left-6`).

### Check 8 — No regressions
Hero, Nav, and everything above the Problem section should behave exactly as they did after Step 7d. Scroll back up to confirm.

---

## If this doesn't work

Paste back to me:
1. The exact error message or unexpected behaviour.
2. Which check (1–8) failed.
3. A screenshot for visual issues.

Do not let Claude Code guess-and-retry more than once on the same error — pause and paste back.

---

## What comes next

Once all eight checks pass, come back and say:

> **"Step 8 done. Give me Step 9."**

**Step 9 is the What We Do — Service Ladder section** — three service cards (Audit / Build / Retainer) presenting the OTS commercial model. This is the first section with card components and card-hover interactions, and it's also the first section that references pricing directly. Expect it to be a larger step (three cards with three photographs each, hover states, and links to service pages that don't exist yet but will be anchored the same way Nav links were).

Also, once Step 8 lands: you now have two content sections on the homepage using two distinct animation patterns (page-load reveal in Hero, scroll-triggered reveal in Problem). Worth taking one look at both together and confirming they feel like the same site, not two separate design experiments. If they don't, that's real feedback to me — better to catch a tone mismatch now than after five more sections are built on the same patterns.

---

**Step 08 · The Problem Section · v1.0 (Claude Code-driven)**
*Behind every smooth business is a better system.*
