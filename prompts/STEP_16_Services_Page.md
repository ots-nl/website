# STEP 16 — Services Page

**Project:** Ontwikkeling Tech Services — Marketing Website
**Type:** Claude Code prompt
**Estimated time:** 90–120 minutes (this is a full page, not a section — the largest single step since Step 0)
**Prerequisites:** Homepage complete (Steps 0–15), QA pass clean, Nav/Footer fixes committed.
**Version:** 1.0

---

## Goal

Build `/diensten` (NL) / `/en/services` (EN) — the definitive standalone reference for what OTS sells. PRD §5: *"A prospect from a referring peer often lands here before the homepage. The page must stand alone."*

---

## Context

- Design spec: PRD Section 5 — reproduced in full below, no need to look for the PRD file in the repo.
- Pricing source: `05_-_Services_Bible.md` — this build pulls the actual tiered pricing tables from the Services Bible, not just the single-number ranges used on the homepage's "What We Do" cards. This page is the one place on the site that shows full pricing detail.
- **No new photography needed for this page.** Unlike Steps 14 and the homepage's service cards, nothing in PRD §5 calls for a photograph — the deep-dive sections use oversized numerals and typography, not images. Confirmed by re-reading the full spec before writing this prompt.
- **This is the first standalone page beyond the homepage.** Every previous step added to a single route. This one introduces real locale-specific routing (`/diensten` vs `/services`, not just an `/en` prefix on the same slug) — the same pattern already proven working in Step 13 (Team's CTA link) and Step 15 (Footer's Services/Company links), where NL and EN use different path strings, not a translated version of the same one. Follow whatever mechanism is already established in this codebase for that — don't introduce a second, different routing approach.

---

## Files to Create or Modify

- `app/[locale]/diensten/page.tsx` (or wherever the existing i18n routing config expects locale-specific pages to live — check the established pattern before creating folders)
- `components/sections/services/PageHeader.tsx`
- `components/sections/services/ServiceDeepDive.tsx` (one reusable component, used three times with different content — don't build three separate components for Audit/Build/Retainer)
- `components/sections/services/ServiceLadder.tsx`
- `components/sections/services/WhatWeRefuse.tsx`
- Reuse the existing `FinalCta` component from the homepage for the page's closing section — don't rebuild it.
- `messages/nl.json` / `messages/en.json` — add a `services` namespace covering all of the above

---

## Detailed Specification

### Page structure (7 sections)

| # | Section | Background |
|---|---|---|
| 1 | Page header | Cream |
| 2 | Audit deep dive | Cream |
| 3 | Build deep dive | Cream-deep |
| 4 | Retainer deep dive | Cream |
| 5 | Service ladder | Night |
| 6 | What we refuse | Cream |
| 7 | Final CTA | Night (reused component) |

### 1. Page header

- Eyebrow: *"// Diensten"* / *"// Services"*.
- H1: Anton, `clamp(48px, 7vw, 112px)`. Text: *"Drie diensten. Eén weg. Geen uurwerk."* (NL) / *"Three services. One progression. No hourly work."* (EN).
- Subhead: Inter 400 18px, max-width 640px. NL: *"OTS verkoopt drie trajecten: een Audit, een Build, en een Retainer. Elke klantrelatie doorloopt deze weg. We verkopen geen uurwerk. We verkopen geen losse automatiseringen. We verkopen geen 'chatbots.' Hieronder wat elk is, wat het kost, en wat je krijgt."*

### 2–4. Service deep dives (Audit / Build / Retainer)

One reusable component, three instances, each with an anchor (`#audit`, `#build`, `#retainer`).

**Layout:** two-column asymmetric, left 40% headline+price / right 60% content, vertical padding 128px.

**Left column:** small eyebrow (*"01 — Audit"* etc.), Anton title, oversized numeral 01/02/03 in `--accent-tint` at 200px as texture, price in Anton 56px `--ink`, meta line below in Inter 400 13px `--muted`.

**Right column:** Wat het is (2–3 sentences) → Wat je krijgt (bulleted, `--accent` checkmark icons) → Hoe het loopt (mini timeline) → Wat je niet krijgt (1–3 honest exclusions, `--muted`) → primary CTA button.

**Audit** (`#audit`, eyebrow "01 — Audit", title "De diagnose." / "The diagnosis.", price "€2.500", meta "vaste prijs · twee weken" / "fixed price · two weeks"):

- Wat het is: *"Een tweewekelijkse diagnose van hoe je bedrijf nu operationeel loopt. We brengen elke workflow in kaart, elk hulpmiddel dat je gebruikt, elk stuk handwerk dat je team doet. Aan het eind lever je een geschreven rapport met een concrete systeemroadmap."*
- Wat je krijgt: Een geschreven rapport (10–15 pagina's) · Een gedetailleerde workflow-kaart van de audited functie · Een gerangschikte lijst van frictiepunten, met kosten voor je bedrijf · Een aanbevolen systeemroadmap · Één concrete "quick win" die je zelf morgen kunt uitvoeren.
- Hoe het loopt: Week 1 — Kickoff-gesprek, interviews (2–4 stakeholders), workflow-mapping · Week 2 — Analyse, opstellen rapport, interne review, opleveringsgesprek · Week 3 (optioneel, zonder extra kosten) — één follow-up van 60 minuten.
- Wat je niet krijgt: *"Geen implementatie. Geen software. Geen aanbevelingen zonder onderbouwing. Een Audit is een diagnose — geen behandeling. Dat is wat de Build voor is."*

**Build** (`#build`, eyebrow "02 — Build", title "Het systeem." / "The system.", price "€8.000–22.000+", meta "vaste prijs · vaste scope · vier tot twaalf weken" / "fixed price · fixed scope · four to twelve weeks"):

- Wat het is: *"Een vaste-prijs, vaste-scope traject van vier tot twaalf weken. We bouwen een werkend Business Operating System voor één specifieke functie in je bedrijf — reserveringen, patiëntenintake, offerte-tot-factuur — inclusief documentatie en training vanaf dag één, niet achteraf."*
- Wat je krijgt — lead with the three investment levels as a compact sub-table, then the shared inclusions below it:
  - **Foundation** — €8.000 · één systeem, één functie, 2–3 integraties · 4–6 weken.
  - **Core** — €14.000 · volledig operating system voor één functie, 4–6 integraties · 6–8 weken.
  - **Complete** — €22.000+ · multi-functie operating system, 6+ integraties, maatwerk logica · 8–12 weken.
  - Alle niveaus: volledige engineering, design en systeemlogica · volledige geschreven documentatie · training voor je team · 30 dagen stabilisatie na oplevering, inbegrepen.
- Hoe het loopt: Discovery (week 1) — kickoff, requirements, technisch ontwerp · Build (week 2 t/m N−2) — bouw, wekelijkse demo's · Testing (week N−1) — end-to-end testen met klant · Handover (week N) — documentatie, training, live gaan · Stabilisatie (30 dagen na oplevering, inbegrepen).
- Wat je niet krijgt: *"Licenties van software van derden — die betaal je rechtstreeks. Onderhoud na de 30 dagen stabilisatie — dat is de Retainer. Nieuwe functionaliteit na ondertekende scope, zonder change order."*

**Retainer** (`#retainer`, eyebrow "03 — Retainer", title "De partner." / "The partner.", price "€1.500–5.000+ / maand", meta "maandelijks · opzegbaar" / "monthly · cancellable"):

- Wat het is: *"Een maandelijkse samenwerking waarin OTS de systemen die we voor je hebben gebouwd onderhoudt, bewaakt en uitbreidt. Waar de meeste bureaus stoppen bij oplevering, begint hier de lange termijn."*
- Wat je krijgt — three tiers, same sub-table pattern as Build:
  - **Monitor** — €1.500/maand · monitoring, kleine fixes, maandelijks health report, één kleine uitbreiding per maand · reactie binnen 2 werkdagen.
  - **Operate** — €3.000/maand · alles in Monitor, plus proactieve verbeteringen, twee uitbreidingsprojecten per maand, kwartaalreview · reactie binnen 1 werkdag.
  - **Partner** — €5.000+/maand · alles in Operate, plus toegewijde engineering tijd, roadmapplanning, nieuwe systemen binnen afgesproken scope · on-call SLA.
- Hoe het loopt: Iedere maand — monitoring en gezondheidscheck · Ieder kwartaal — strategische review · Doorlopend — kleine verbeteringen en prioriteitswerk volgens jouw niveau.
- Wat je niet krijgt: *"Nieuwe grote systemen buiten scope zonder aparte Build-overeenkomst, tenzij je op Partner-niveau zit. Geen losse ad-hoc uren zonder maandelijkse overeenkomst."*

### 5. Service ladder

- Background `--night`, full-width horizontal diagram, three connected nodes (Audit → Build → Retainer) with number/name in Anton above, price/duration in Inter below, `--muted` connecting lines with small arrows.
- Bottom paragraph, Inter 400 17px `--cream` at 80%, max-width 720px, centred: *"Elke klantrelatie bij OTS doorloopt deze weg. Ongeveer zes op de tien Audits worden een Build. Ongeveer zeven op de tien Builds worden een Retainer. De Retainer is waar de echte relatie leeft — het lange, stille, samengestelde partnerschap. Dat is waar we naartoe werken bij elk eerste gesprek."*

### 6. What we refuse

- H2: *"Wat we weigeren te verkopen."* / *"What we refuse to sell."*
- Body intro: Inter 400 17px `--ink-soft`.
- Vertical list, `--accent` cross-mark icons instead of bullets: Uurwerk of tijd-en-materiaal. Nooit. · Losse "bouw-één-workflow" opdrachten zonder systeemcontext. · Standalone chatbot-projecten. · Website design of marketing als losse dienst. · Custom SaaS-builds voor externe klanten. · Elke opdracht onder €2.500 totaal. · "Ontdekkingsgesprekken" die stiekem gratis strategie-sessies worden.

### 7. Final CTA

Reuse the homepage `FinalCta` component as-is. PRD §5.6 notes copy can reference the Audit specifically, but reusing the exact existing component with its existing copy is acceptable for this build — don't fork it into a second component for a one-word difference.

---

## Ready-to-Paste Prompt for Claude Code

```
This prompt is self-contained — the full spec is written out above, no need
to look for a PRD file in the repo.

Before creating any new route, check how this codebase already handles
locale-specific paths (NL and EN using different slugs, not just an /en
prefix on the same one) — Step 13's Team CTA link and Step 15's Footer links
both already do this for /over-ons vs /about. Use that same established
mechanism for /diensten vs /services. Don't introduce a second routing
approach.

Build the Services page:

1. Create components/sections/services/PageHeader.tsx per the Page Header
   spec above (eyebrow, H1, subhead).

2. Create components/sections/services/ServiceDeepDive.tsx as ONE reusable
   component taking props for eyebrow, title, numeral, price, meta, "wat het
   is" text, a "wat je krijgt" list (which may be either a flat bullet list
   OR a small tiered sub-table — support both shapes since Build and Retainer
   need the tier table while Audit doesn't), a "hoe het loopt" timeline list,
   and "wat je niet krijgt" text. Use it three times — for #audit, #build,
   #retainer — with the exact content given above. Background alternates
   cream/cream-deep/cream per the section table.

3. Create components/sections/services/ServiceLadder.tsx per the Service
   Ladder spec — night background, three-node horizontal diagram, bottom
   explainer paragraph.

4. Create components/sections/services/WhatWeRefuse.tsx per spec — heading,
   intro, vertical list with accent cross-mark icons instead of bullets.

5. Import and reuse the existing FinalCta component (from
   components/sections/home/FinalCta.tsx) as the page's final section —
   do not create a new component for this.

6. Assemble all of the above into the new Services page route, in the order:
   PageHeader, Audit deep dive, Build deep dive, Retainer deep dive,
   ServiceLadder, WhatWeRefuse, FinalCta.

7. Add a "services" namespace to messages/nl.json and messages/en.json
   containing every string above, in both languages. Use the exact NL copy
   given; translate to natural English following the same tone used
   elsewhere in the site (calm, direct, no hype) rather than a literal
   word-for-word translation.

8. Confirm both /diensten and /en/services resolve correctly and render the
   same page content. Run tsc --noEmit and confirm no console errors in
   either locale.
```

---

## Acceptance Test

Verify:

1. `/diensten` and `/en/services` both resolve and render the full page — this is the first real test that the locale-specific-slug routing pattern generalizes beyond the two links that used it before.
2. All three deep-dive anchors (`#audit`, `#build`, `#retainer`) work — clicking a homepage "What We Do" card's "Meer over Audit →" link (built back in Step 09) should land correctly on this new page at the right anchor. Test at least one of these cross-page links.
3. Build and Retainer sections show their three-tier pricing sub-tables clearly, legibly, distinct from the flat bullet list Audit uses.
4. Service ladder renders as a connected three-node diagram, not three disconnected blocks.
5. What We Refuse list uses cross-mark icons, not standard bullets.
6. Final CTA at the bottom is visually identical to the homepage's — confirm it's genuinely the reused component, not a near-duplicate.
7. Mobile: every section collapses sensibly — deep-dive columns stack, ladder diagram becomes vertical or scrollable rather than overflowing.
8. No console errors, `tsc --noEmit` clean, in both locales.

---

## If This Doesn't Work

- **Locale-specific slugs don't route correctly:** don't hack around it with a redirect — find and reuse whatever config made `/over-ons` vs `/about` work in Step 13/15, since that's proof the mechanism already works in this codebase.
- **The reusable ServiceDeepDive component gets awkward trying to support both a flat list and a tiered table:** it's fine for the "wat je krijgt" section to accept a `variant: 'list' | 'tiers'` prop rather than forcing one shape — don't contort the data to fit a single format.
- **Homepage cards' anchor links (`/diensten#audit` etc., built in Step 09 before this page existed) don't land correctly now that the page is real:** double check those hrefs weren't accidentally pointing somewhere else during Step 09 — they were built to anchor into a page that didn't exist yet, so this is the first real test of them.
- **Paste the exact error, the file Claude Code produced, and "Step 16" back to Claude if anything else breaks.**

---

*Behind every smooth business is a better system.*
