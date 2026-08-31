# STEP 07b — Hero Typography and CTA

**Project:** Ontwikkeling Tech Services — Marketing Website
**Type:** Claude Code prompt
**Estimated time:** 45–60 minutes
**Owner:** Virat
**Version:** 1.0
**Phase:** 3 — Navigation and Homepage

---

## Goal

Replace four of the five left-column placeholders — eyebrow, headline, subheadline, CTA group, foot note — with real, final Dutch and English copy. The photograph placeholder (Step 7c) and the page-load animation (Step 7d) are untouched. Static, correct, bilingual content — nothing moves yet.

---

## Context

- References **PRD v1.1 §4.1** (Hero copy, verbatim) and **§2.3** (the italic accent word rule — used once per page, and this is the page it's used on).
- Prerequisite: Step 7a complete. Grid and placeholder structure exist in `components/sections/Hero.tsx`.
- Components available: `Eyebrow`, `Button` (`components/ui/`) — both already built (Step 5b) and already proven in the Step 5 demo sections that Step 7a removed. This step is their first real, production use.

### One content gap you need to know about before running this

The PRD gives exact, final copy for the eyebrow, subheadline, both CTA buttons, and the foot note — that copy goes in verbatim, no drafting needed. But the **headline itself** is only specified in English in the PRD (*"Behind every smooth business / is a **better** system"*). There's no signed-off Dutch headline anywhere in the foundational docs.

This isn't an oversight to fix in code — it's a content decision that belongs to Deepak. The Brand Bible is explicit: *"Every piece of Dutch copy is written by a Dutch-native writer (Deepak, or a hired Dutch copywriter) or reviewed by one before publish."* A literal translation of a headline is exactly the kind of thing that can read flat or slightly off in ways only a native speaker reliably catches — this is the highest-visibility sentence on the entire site, so it's the last place to guess.

So this step ships a **draft** Dutch headline — a direct rendering of the company's own North Star sentence, which is already trusted copy — clearly marked as pending review, so the build isn't blocked:

- Line 1: *"Achter elk soepel bedrijf"*
- Line 2: *"zit een **beter** systeem."* (with *beter* as the italic accent word)

This is the literal Dutch of "Behind every smooth business is a better system" — the company's own North Star sentence — so it's about as low-risk a draft as a headline gets. But it's still a draft. **Send it to Deepak before this goes live**, and flag it as unreviewed in your commit/PR notes so it doesn't quietly become permanent just because it shipped and looked fine.

### The CTA destinations don't exist yet either — same pattern as Step 6

Both CTA buttons need somewhere to point. Neither the contact/booking flow nor a dedicated Audit page exists yet (contact comes with the Final CTA section, Steps 8–14; dedicated service pages come in Phase 4). Following the same approach as Nav's links in Step 6: both buttons point to in-page anchors (`/#audit`, `/#contact`) that don't resolve to anything yet but will the moment those sections are built. Not a new decision — just staying consistent with one already made.

---

## Files this step creates or modifies

**Modifies:**
- `components/sections/Hero.tsx` — five placeholder divs become real content (four of them; photograph stays a placeholder)
- `messages/nl.json` — adds a `hero` translation namespace
- `messages/en.json` — adds a `hero` translation namespace

**Creates:**
- `prompts/STEP_07b_Hero_Typography_and_CTA.md` — this file

**Does NOT touch:**
- The photograph placeholder (right column) — Step 7c
- Any animation/motion — Step 7d
- `components/ui/Eyebrow.tsx`, `components/ui/Button.tsx` — consumed, not modified

---

## The copy — verbatim, both languages

**Eyebrow:**
- NL: `Voor Nederlandse dienstverleners`
- EN: `For Dutch service businesses`

**Headline (two lines, italic accent word bolded here for clarity — bold is not the actual styling, italic accent colour is):**
- NL *(draft — pending Deepak review)*:
 - Line 1: `Achter elk soepel bedrijf`
 - Line 2: `zit een **beter** systeem.`
- EN:
 - Line 1: `Behind every smooth business`
 - Line 2: `is a **better** system.`

**Subheadline:**
- NL: `We bouwen Business Operating Systems voor restaurants, klinieken en professionele dienstverleners in Nederland. Minder handwerk. Betere data. Systemen die stil hun werk doen.`
- EN: `We build Business Operating Systems for restaurants, clinics, and professional services firms in the Netherlands. Less manual work. Better data. Systems that do their work quietly.`

**CTA — Primary:**
- NL: `Vraag een Audit aan`
- EN: `Request an Audit`

**CTA — Secondary:**
- NL: `Boek een gesprek van 45 minuten`
- EN: `Book a 45-min call`

**Foot note:**
- NL: `Audit — €2.500 vaste prijs. Twee weken.`
- EN: `Audit — €2,500 fixed. Two weeks.`

---

## Detailed specification

**Eyebrow:** use the existing `Eyebrow` component as-is, passing the translated string as its child. Check its exact prop signature in `components/ui/Eyebrow.tsx` before wiring — don't assume.

**Headline:** Anton, `clamp(56px, 8vw, 128px)`, `--ink`, line-height 0.92, letter-spacing -0.02em (this is the `type-hero` utility from the Step 3b type scale — use it rather than hand-writing the clamp again). Two lines, manually broken (a `<br />` or two separate block-level elements — not left to the browser to wrap). The accent word (`beter` / `better`) sits inline within line 2, set in Cormorant Garamond Italic 500, colour `--accent`, same font-size as the surrounding Anton text. Split the translation string so the accent word can be styled independently — e.g. three translation keys per language (`headlineLine1`, `headlineLine2Pre`, `headlineLine2Accent`, `headlineLine2Post`) rather than one string with embedded markup, since next-intl string interpolation for inline styled spans is the cleaner pattern here. Check how the Brand Bible's own example (`Behind every smooth business is a **better** system`) is structured and mirror that split.

**Subheadline:** Inter 400, 18px, `--ink-soft`, line-height 1.6, `max-width: 520px` (this is the `type-body-large` utility if it matches — confirm against the Step 3b type scale before hardcoding a new size).

**CTA group:** the `Button` component, two instances — primary variant (accent pill) and secondary/outline variant (check `Button.tsx` for the exact variant name — the PRD calls it "outline pill," the component's internal naming from Step 5b may differ). Side by side on desktop with the established gap token, stacked full-width on mobile. Both left-aligned with the rest of the column — never centred. `href="/#audit"` for primary, `href="/#contact"` for secondary.

**Foot note:** Inter 400, 13px, `--muted`.

**Layout:** the five elements replace the five placeholder divs in the same order, same relative spacing already established by Step 7a's skeleton — don't redesign the vertical rhythm, just swap the content type.

---

## THE PROMPT — paste this into Claude Code

```
You are executing Step 7b of the OTS website build. This step replaces four of the five Hero placeholder blocks — eyebrow, headline, subheadline, CTA group, foot note — with real bilingual copy. The photograph placeholder and all animation are out of scope for this step.

Follow this plan exactly. If anything fails or is unclear, pause and report — do not attempt fixes without asking.

CONTEXT:
- components/sections/Hero.tsx exists from Step 7a with five labelled placeholder divs in the left column and one in the right column (leave the right column placeholder untouched).
- components/ui/Eyebrow.tsx and components/ui/Button.tsx exist from Step 5b. Read both files first to confirm exact prop names — do not assume a prop signature.
- Type scale utilities exist from Step 3b (type-hero, type-body-large, etc. — read app/globals.css or the relevant type-scale file to confirm exact utility class names before using them).
- next-intl translation pattern already established in messages/nl.json and messages/en.json (see the existing "nav" namespace from Step 6 for the pattern to follow).

TASK 1 — Verify prerequisites.
Report:
- `pwd`, `git status` (clean except this step's untracked prompt file), `git log --oneline -3` (last commit should be Step 7a's Hero layout structure commit)
- Port 3000 check, kill any orphan
- Read components/sections/Hero.tsx in full, confirm the five placeholder divs and their current structure
- Read components/ui/Eyebrow.tsx and components/ui/Button.tsx, report their exact prop signatures (especially Button's variant prop options)
- Read the type scale definitions in app/globals.css (or wherever Step 3b implemented them), confirm the exact utility class names for hero-scale display text and body-large text

Pause for my approval before proceeding.

TASK 2 — Add hero translations.
Add a "hero" namespace to messages/nl.json and messages/en.json with these keys (values below — use exactly as given, do not paraphrase):

NL:
- eyebrow: "Voor Nederlandse dienstverleners"
- headlineLine1: "Achter elk soepel bedrijf"
- headlineLine2Pre: "zit een "
- headlineLine2Accent: "beter"
- headlineLine2Post: " systeem."
- subheadline: "We bouwen Business Operating Systems voor restaurants, klinieken en professionele dienstverleners in Nederland. Minder handwerk. Betere data. Systemen die stil hun werk doen."
- ctaPrimary: "Vraag een Audit aan"
- ctaSecondary: "Boek een gesprek van 45 minuten"
- footnote: "Audit — €2.500 vaste prijs. Twee weken."

EN:
- eyebrow: "For Dutch service businesses"
- headlineLine1: "Behind every smooth business"
- headlineLine2Pre: "is a "
- headlineLine2Accent: "better"
- headlineLine2Post: " system."
- subheadline: "We build Business Operating Systems for restaurants, clinics, and professional services firms in the Netherlands. Less manual work. Better data. Systems that do their work quietly."
- ctaPrimary: "Request an Audit"
- ctaSecondary: "Book a 45-min call"
- footnote: "Audit — €2,500 fixed. Two weeks."

Add a code comment directly above the "headlineLine1"/"headlineLine2*" keys in nl.json only: `// DRAFT — direct rendering of the North Star sentence, pending Deepak's review before this is considered final Dutch copy.` This comment must survive — do not let JSON formatting/linting strip it if messages/nl.json is strict JSON without comment support; if the file format doesn't allow comments, instead add a top-level "_notes" key (excluded from any translation-loading logic) containing this same text, or report back to me if neither approach is clean so we can decide together.

Report the diff for both files before proceeding.

TASK 3 — Replace the placeholders in Hero.tsx.
In components/sections/Hero.tsx, replace the five left-column placeholder divs with:
1. Eyebrow placeholder → real <Eyebrow> component wrapping t('hero.eyebrow')
2. Headline placeholder → two-line headline using the type-hero (or equivalent, per Task 1 findings) utility class, ink colour, manually broken lines. Line 1 renders t('hero.headlineLine1'). Line 2 renders headlineLine2Pre + an inline span for headlineLine2Accent (Cormorant Garamond italic font, accent colour token, same font-size as surrounding text) + headlineLine2Post.
3. Subheadline placeholder → real subheadline text using the type-body-large (or equivalent) utility, ink-soft colour, max-width 520px, rendering t('hero.subheadline')
4. CTA group placeholder → two Button components side by side (stack on mobile), primary variant with href="/#audit" and children t('hero.ctaPrimary'), secondary/outline variant (confirm exact variant name from Task 1) with href="/#contact" and children t('hero.ctaSecondary')
5. Foot note placeholder → small muted text rendering t('hero.footnote')

Leave the right-column photograph placeholder exactly as Step 7a built it. Leave ScrollIndicator exactly as is.

Confirm the file was updated and report its new line count.

TASK 4 — Start dev server and verify.
Run `npm run dev` in the background. Wait 15 seconds. Check whether http://localhost:3000/ and http://localhost:3000/en both return 200. Report any compilation or TypeScript errors, and specifically confirm no next-intl "missing translation key" warnings appear in the server log.

If clean, pause and wait for my browser verification.

TASK 5 — Wait for user verification.
Pause here. I will check:
- Eyebrow renders with the correct Dutch/English text and correct pill styling (matches how it looked in the old Step 5 demo)
- Headline renders as two lines, correct copy, with the accent word visibly in a different typeface (italic) and colour (orange) from the surrounding text, on both / and /en
- Subheadline text is correct, wraps within its max-width, doesn't overflow the column
- Both CTA buttons render with correct copy, correct relative styling (primary looks filled/accent, secondary looks outlined), sit side by side on desktop and stack on mobile
- Foot note renders small and muted below the CTAs
- Photograph placeholder and ScrollIndicator are unchanged from Step 7a
- No layout shift or overflow introduced by the real (longer/shorter than placeholder) text

Once I say "verified", proceed to Task 6.

TASK 6 — Stop dev server. Kill orphans. Commit and push.
Run `git status` and report. Should see:
- Modified: components/sections/Hero.tsx, messages/nl.json, messages/en.json
- New: prompts/STEP_07b_Hero_Typography_and_CTA.md

Stage all: `git add -A`

Commit with:
`feat(step-07b): add Hero headline, subheadline, and CTA copy (NL draft pending review)`

Push.

TASK 7 — Final report.

STEP 7b COMPLETE
- File modified: components/sections/Hero.tsx ([new line count] lines)
- Translations added: messages/nl.json, messages/en.json (hero namespace)
- Dev server: [worked / did not work]
- Missing-translation warnings: [none / list]
- User verification: [confirmed / not confirmed]
- Git commit: [hash and message]
- Git push: [succeeded / failed]
- Port 3000: [free at end / occupied]
- Reminder in output: "Dutch headline is DRAFT — send to Deepak for review before this copy is considered final."

END OF PROMPT.
```

---

## Acceptance test — what you verify after Claude Code finishes

### Check 1 — Eyebrow
Correct copy, correct pill shape/colour, on both `/` and `/en`.

### Check 2 — Headline
Two lines, correct text, the accent word (*beter* / *better*) is visibly italic and orange against the surrounding upright ink-coloured Anton text. This is the single most important visual check in this step — the italic accent word is, per the Brand Bible, "the single most opinionated choice in the visual system." If it doesn't read as clearly different from the rest of the line, something's off in the styling.

### Check 3 — Subheadline
Correct copy, doesn't overflow or wrap awkwardly within its 520px cap.

### Check 4 — CTAs
Both buttons present, correctly labelled, visually distinct from each other (filled vs outline), side by side on desktop, stacked on mobile. Clicking either doesn't error — it's fine that the anchors don't resolve to a real section yet.

### Check 5 — Foot note
Small, muted, present, correct copy.

### Check 6 — No regressions
Photograph placeholder and ScrollIndicator look exactly as they did after Step 7a. Nav still behaves correctly.

### Check 7 — No layout breakage
Real copy is a different length than the placeholder labels were — confirm nothing overflows its container or causes horizontal scrolling on any screen width you check.

---

## If this doesn't work

Paste back to me:
1. The exact error message or unexpected behaviour.
2. Which check (1–7) failed.
3. A screenshot if it's visual.

Do not let Claude Code guess-and-retry more than once on the same error — if the first fix attempt doesn't resolve it, stop and paste the situation back to me before a second attempt.

---

## Before this is truly "done"

Separately from the code checks above: **send the Dutch headline to Deepak.** `"Achter elk soepel bedrijf zit een beter systeem"` is a safe, literal rendering of the North Star sentence, but it hasn't been reviewed by a Dutch-native speaker, and this is the highest-visibility sentence on the entire site. Don't let it sit unreviewed just because it shipped and looks fine in the browser.

---

## What comes next

Once all seven checks pass, come back and say:

> **"Step 7b done. Give me Step 7c."**

**Step 7c is the Hero Photograph** — sourcing or generating the actual editorial image, wiring it into the right column with the correct warm treatment, and implementing the grid-break bleed (`right: -48px`) that the placeholder deliberately skipped.

---

**Step 07b · Hero Typography and CTA · v1.0 (Claude Code-driven)**
*Behind every smooth business is a better system.*
