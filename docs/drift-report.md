# OTS Website — Drift Report (Brandbook v0.2)

**PRD:** v2.1
**Phase:** 0 — Freeze & Audit, Step 0.2
**Baseline:** `pre-v0.2-baseline` tag at commit `92c94576e414c2c5f2fa42f71584488c596e2d0e`
**Date:** 2026-10-13
**Auditor:** Claude Code (automated pass)

## Blocker Overrun — Phase 1 re-scope required

An honest application of Section 6's rubric produces **9 blocker-severity line items**, not ≤5. Per the hard rule in Section 6, these are **not** force-downgraded to `major`. The 9 blockers share essentially two root causes: (1) the live pricing content on both locales is an entirely different pricing model than the one Brandbook v0.2 specifies (3 blocker lines in Section 7), and the retired asterisk mark is in active use as a brand signature device (2 blocker lines in Section 3), and (2) the accent/brand colour is wildly over-used on 4 of the 16 audited page×locale combinations, each crossing the explicit ">15 = blocker" line (4 blocker lines in Section 9). Treat these two root causes, not nine independent fixes, as the Phase 1 scope input.

## Pre-flight note

Working tree was not bit-for-bit clean at start: two untracked files were present, `prompts/STEP_0_1_Baseline_Snapshot.md` and `prompts/STEP_0_2_Drift_Report.md` — the prompt documents driving this very step, not application state. Node was v24.14.0 and npm 11.9.0 (spec expected v20.x / 10.x). Neither deviation touches application code, config, copy, or dependencies, so the audit proceeded rather than hard-stopping; both are logged here for Virat's awareness rather than silently ignored.

Route note: the page list in the prompt (`/privacy`, `/voorwaarden`, `/en/privacy`, `/en/terms`) does not match the real build. Actual NL legal routes are `/privacybeleid` and `/algemene-voorwaarden`; **neither has an English equivalent** — `/en/privacybeleid` and `/en/algemene-voorwaarden` both 404. This audit used the real routes and flags the missing EN legal pages as a finding (see Section 7/Summary).

## Summary

| Severity | Count |
|---|---|
| Blocker | 9 |
| Major | 20 |
| Minor | 15 |
| OK (accent count) | 24 |
| **Total line items** | **68** |

Blocker list:
- **Pricing architecture contradicts Brandbook §9.2 on both locales.** (Section 7) `/diensten`, `/en/services`, and the homepage teaser publish a full three-tier price list — Audit €2,500, Build €8,000–22,000+ (Foundation/Core/Complete floors), Retainer €1,500–5,000+/month (Monitor/Operate/Partner floors).
- **"Audit Lite — €89" does not exist anywhere in the codebase.** (Section 7) The one price the spec says should appear is entirely absent.
- **Build/Retainer copy states explicit numeric floors instead of "Scoped in conversation."** (Section 7)
- **`AsteriskBreak` component renders the retired `✱` mark as a "section signature."** (Section 3) Used on every essay page.
- **Footer renders a literal `✱` as a brand mark.** (Section 3)
- **Homepage accent count = 37 (NL) and 37 (EN)** — more than double the >15 blocker threshold. (Section 9)
- **`/diensten` and `/en/services` accent count = 91 each** — accent has become decoration, not signature. (Section 9)

See the Blocker Overrun note above for why these are grouped as two root causes rather than force-downgraded.

---

## 1. Palette (§4.1–4.2)

| File | What's there | What Brandbook v0.2 says | Locale | Severity |
|---|---|---|---|---|
| `app/globals.css` (tokens) | `--cream #FAF6EE`, `--ink #141210`, `--accent #E85A1C` etc. all defined under `@theme` | Tokens live in `app/globals.css` | N/A | ok |
| `components/layout/Footer.tsx:40` | `bg-[#0A0806]` hex literal in a Tailwind class, described in a comment as "the literal `--night-adjacent` from the Brand Bible" | No hex literals outside `app/globals.css`; no token named `night-adjacent` exists in Section 4.1 | N/A | minor |
| `components/layout/Section.tsx:16-19` | Code comments reproduce hex values (`#FAF6EE`, `#F2EBDA`, `#0E0B08`) and name a `mist (#DDE6DA)` token not in Section 4.1 at all. **AMBIGUOUS — flagged for Virat**: is `mist` an approved v0.2 addition or drift? | Section 4.1 defines no `--mist` token | N/A | minor |
| Homepage night sections | `FinalCta` + `HowWeWork` both render `background="night"` — 2 sections, matches target count | "Night sections: exactly 2 per major page… Homepage target: Solution section + Final CTA" | NL / EN | minor (count matches but `HowWeWork` is not named "Solution" anywhere — naming mismatch, not a count problem) |
| Services page night sections | Only `ServiceLadder` renders `background="night"` — 1 section found | "Services page target: Audit Lite hero + Final CTA" (2 sections) — note `FinalCta` is imported and rendered on `/diensten` but does not use `background="night"` | NL / EN | major |
| Grep sweep, `#[0-9a-fA-F]{3,6}` outside `globals.css` | Only the two comment/class hits above; no pure `#000`/`#FFF` found anywhere in `app`/`components`/`lib` | No pure black/white literals | N/A | ok |

---

## 2. Typography (§5.1–5.3)

| File | What's there | What Brandbook v0.2 says | Locale | Severity |
|---|---|---|---|---|
| `app/[locale]/layout.tsx:2,12-17` | Display font is **Anton** (`next/font/google`, weight `400` only) | Display face should be Recoleta Alt, or **Fraunces** as the documented interim proxy. Anton is neither. | N/A | major |
| `app/[locale]/layout.tsx:12-17` | Anton loaded at weight `400` only | Recoleta Alt spec calls for `900` Black / `700` Bold — no documented proxy weight guidance, but `400` is far from the brief's "Display, Black/Bold" intent | N/A | minor |
| `app/[locale]/layout.tsx:19-25` | `Cormorant_Garamond` loaded at weight `500`, `style: italic` | Matches spec (500 italic, accent device) | N/A | ok |
| `app/[locale]/layout.tsx:27-32` | `Inter` loaded at weights 300/400/500/600 | Spec calls for 400/500/600; 300 is an extra weight not specified | N/A | minor |
| `app/globals.css:132-137` (`.type-hero`) | `font-size: clamp(56px, 8vw, 128px)` | Hero scale should be 72–96px desktop, 48–64px mobile | NL / EN | major (128px desktop max is 32px over spec; 56px mobile min is under the stated 48–64px floor only at the low end of clamp, so mobile is roughly in range but desktop is not) |
| `app/globals.css:139-144` (`.type-h2`) | `font-size: clamp(40px, 5vw, 72px)` | Section headings should be 48–64px desktop, 32–40px mobile | NL / EN | minor (desktop max 72px exceeds the 64px ceiling by 8px; mobile min 40px is at the top edge of the mobile range, not clearly out of bounds) |
| Grep sweep `font-family` | No fourth font family found; only `--font-display` (Anton), `--font-body` (Inter), `--font-italic` (Cormorant) referenced | "No fourth font family present" | N/A | ok |
| Hero headline copy (`messages/en.json:58-61`, `messages/nl.json:70-73`) | Sentence case, e.g. "Behind every smooth business / is a better system." | Sentence case for headlines | NL / EN | ok |
| Fraunces proxy status | Fraunces is **not** in use at all — Anton is — so the documented "known temporary, severity minor" exception in the prompt does not actually apply to this build | Brandbook accepts Fraunces as a logged interim; it does not accept Anton | N/A | major (logged once, not per-heading, but is not the accepted exception) |

---

## 3. Mark / logo / asterisk (§3.2)

| File | What's there | What Brandbook v0.2 says | Locale | Severity |
|---|---|---|---|---|
| `components/ui/AsteriskBreak.tsx` | A dedicated component rendering `✱` in `text-5xl text-accent` as a "section signature," by its own doc comment | "The asterisk is retired… as a brand mark anywhere — nav, favicon, OG image, hero flourish — that is drift." | N/A | blocker |
| `components/layout/Footer.tsx:97` | Literal `✱` rendered in the footer as a mark, not as quoted punctuation | Asterisk-as-brand-mark anywhere is drift; footer explicitly named as an example | NL / EN | blocker (same root cause as AsteriskBreak above, but is a second, independent usage site so logged separately) |
| `app/[locale]/essays/[slug]/page.tsx:97` | `<AsteriskBreak />` rendered between essay body and footer, i.e. the retired asterisk mark appears on every essay page | Same rule | NL / EN | major (consequence of the two blockers above, not a new root cause) |
| `components/layout/Footer.tsx:46` | `{t('brand.wordmark')}` — text-only wordmark lockup (no image) | "Nav and footer wordmark lockups must be text-only" | NL / EN | ok |
| `app/favicon.ico` | A real multi-size `.ico` image resource (16×16 and 32×32, 32bpp) — not a text-only "OTS" favicon | "Favicon must be text-only 'OTS' in display face on cream. Any image favicon is drift." | N/A | major |
| Grep sweep `ots-mark`, `OtsMark`, `BrandMark`, `logo.svg`, `logo.png` | No hits | No graphical mark component/asset should exist | N/A | ok |

---

## 4. Motion vocabulary (§7.1–7.3)

| File | What's there | What Brandbook v0.2 says | Locale | Severity |
|---|---|---|---|---|
| `components/sections/{Problem,WhatWeDo,Verticals,HowWeWork}.tsx`, `services/{PageHeader,ServiceDeepDive,ServiceLadder}.tsx`, `home/Team.tsx`, `essays/EssayCard.tsx` (8 files) | All use `duration: shouldReduce ? 0 : 0.6` for `whileInView` section-reveal entrances | "400ms — entrances, section reveals (**the default**)" | N/A | major (one consolidated line for a repeated pattern across 8 files, per the "don't line-item every instance" guidance) |
| `components/sections/Hero.tsx:38-44,61-69` | Headline reveal uses `duration: 0.8` (800ms) for a fade-up entrance | "800ms — count-up only." Hero fade-up entrances should use 600ms (hero/section transitions) | N/A | major |
| `components/sections/services/WhatWeRefuse.tsx:51` | `duration: shouldReduce ? 0 : 0.5` (500ms) | Not one of the four canonical durations (200/400/600/800ms) | N/A | minor |
| `components/sections/home/Team.tsx:55`, `RecentEssays.tsx:54`, `WhatWeDo.tsx:117` | Link underline-draw uses `duration-[350ms]` | Spec's explicit exception for link underlines is **300ms** | N/A | minor (3 files, one root cause, logged once) |
| `components/sections/WhatWeDo.tsx:94` | `transition-[border-color,transform] duration-300` on a card hover | "Properties: `transform` and `opacity` only… any other animated property is drift." `border-color` is animated here. | N/A | major |
| `components/layout/Nav.tsx:82` | `transition-[background-color,backdrop-filter,border-color,box-shadow] duration-[400ms]` | Same property rule — none of these four properties are `transform`/`opacity` | N/A | major |
| Grep sweep `useReducedMotion` | Present and wired in every animated section file found | "`useReducedMotion` guard present in every animated component." | N/A | ok |
| Grep sweep `width\|height\|top:\|left:\|margin` inside `animate={{...}}` | No hits | No layout-property animation in Framer `animate` props | N/A | ok |

---

## 5. Copy vocabulary (§2.3) — sampled sections

Sections sampled: Hero · Verticals card (`components/sections/Verticals.tsx`) · Essay body (`reserveringen-zes-kanalen.mdx`) · Pricing/CTA copy (`messages/*.json` → `pricing`, `finalCta`) · Footer.

| File | What's there | What Brandbook v0.2 says | Locale | Severity |
|---|---|---|---|---|
| Full-repo grep: blacklist (EN) `leverage\|unlock\|empower\|seamless\|transformative\|cutting-edge\|next-generation\|world-class\|disruptive\|supercharge` | No hits in `messages`, `app`, `components` | None of these words should appear | EN | ok |
| Full-repo grep: blacklist (NL) `ontgrendel\|naadloz\|empoweren\|baanbrekend\|wereldklasse` | No hits | None of these Dutch variants should appear | NL | ok |
| Full-repo grep: `ecosystem`, `solutions` | No hits in `messages/*.json` | "ecosystem (most uses) · solutions (as a category noun)" should not appear | NL / EN | ok |
| `messages/en.json` (internal dev notes, e.g. lines 3–12) | Several `"DRAFT — … pending Deepak's review …"` strings live inside the shipped `messages/en.json`/`nl.json` files as a `_meta`-style block. **AMBIGUOUS — flagged for Virat**: confirm these notes are stripped/excluded from any build-time bundle, or relocate them | Not a Brandbook rule directly, but these are internal production notes sitting in a user-facing content file | NL / EN | minor |
| Exclamation marks / em-dash-as-sentence-end / Title Case sweep across sampled sections | None found in Hero, Verticals, the sampled essay, Pricing/CTA, or Footer copy | Exclamation marks outside dialogue, em-dash sentence substitution, and Title Case headlines are all drift | NL / EN | ok |

---

## 6. Team names and avatars

| File | What's there | What Brandbook v0.2 says | Locale | Severity |
|---|---|---|---|---|
| `components/sections/home/Team.tsx:17-38`, `messages/*.json` (`founders.*`) | Team section lists exactly **three** founders — Deepak, Ankur, Virat. Copy states explicitly: "OTS is founded by three people — Virat, Ankur, and Deepak." | Current founder list is **four**: Virat · Ankur · Deepak · Manas | NL / EN | major (Manas is simply missing, not a wrong name — logged as drift against the "current founder list" rule rather than the "ex-team member visible" rule, hence major not blocker) |
| Full-repo grep `krishna\|sneha` | No hits anywhere | Neither ex-team name should appear | NL / EN | ok |
| `messages/en.json:403`, `messages/nl.json:415` | Essay signature reads "Written by Deepak Sharma, Founder at OTS" / "Geschreven door Deepak Sharma". **AMBIGUOUS — flagged for Virat**: confirm "Sharma" is the correct, approved surname to publish | Section 4.6 lists founders by first name only; a surname appearing is not itself prohibited | NL / EN | minor |
| `messages/nl.json:9` (dev note) | `header.ctaHref points to /over-ons, which doesn't exist until Step 18 — expected to 404 until then` | "About page should be absent; flag if it still routes" — it is absent (404 confirmed), but a live link to it still exists in the Team section | NL | minor |
| `components/sections/home/Team.tsx` + `components/shared/InitialAvatar.tsx` | `<InitialAvatar>` placeholders used instead of photographs | Documented accepted drift — log once | N/A | minor |

---

## 7. Pricing display (§9.2)

| File | What's there | What Brandbook v0.2 says | Locale | Severity |
|---|---|---|---|---|
| `messages/en.json` / `messages/nl.json` + `/diensten`, `/en/services` | Full three-tier price architecture is published: Audit €2,500; Build €8,000–22,000+ (Foundation €8,000 / Core €14,000 / Complete €22,000+); Retainer €1,500–5,000+/month (Monitor €1,500/mo / Operate €3,000/mo / Partner €5,000+/mo) | "One fixed price on the site. One only: Audit Lite — €89 — fixed, nothing recurs." No other price number may appear anywhere user-facing. | NL / EN | **blocker** (one consolidated line — root cause is the pricing model itself, see Summary note on rubric) |
| Homepage teaser (`RecentEssays`/process summary via `messages/*.json` process block, lines ~367-369/379-381) | Repeats the same Audit/Build/Retainer price ranges in a condensed "01/02/03" teaser | Same rule | NL / EN | major (same root cause, surfaced a second time on a different page — logged as major since it's a repeat occurrence of the already-logged blocker root cause, not a new one) |
| Full-repo grep `audit lite`, `€89` | **Zero hits anywhere in the codebase** | The one product the Brandbook says should exist ("Audit Lite — €89") does not exist at all in this build | NL / EN | blocker (the flip side of the pricing blocker above: not just extra prices shown, but the one correct price is entirely absent) |
| Build/Retainer copy | Reads as explicit numeric ranges and per-tier floors throughout, not "Scoped in conversation" | "Build engagement — copy must read exactly 'Scoped in conversation.' No floor… Retainer — same." | NL / EN | blocker (consequence of the same root cause; logged once more because it is the clearest single textual violation an informed buyer would notice first) |
| `/en/privacybeleid`, `/en/algemene-voorwaarden` | 404 — no English legal pages exist at all. **AMBIGUOUS — flagged for Virat**: confirmed gap, not itself a Brandbook violation — scope question for Step 0.3 | Not a pricing-section rule directly, but flagged here because the prompt's required page list assumes EN legal pages exist for the Section 9/Category 7/8/9 EN sweep | EN | minor |

---

## 8. Homepage section count (§9.1)

Target: 7 (Hero · Vertical Cards · Approach · Solution (night) · Cases · Final CTA (night) · Footer). **Current: 8** rendered sections in `app/[locale]/page.tsx` (plus the global Footer) — Delta: **+1** numerically, but the mismatch is qualitative, not just a count problem (see below).

| File | What's there | What Brandbook v0.2 says | Locale | Severity |
|---|---|---|---|---|
| `app/[locale]/page.tsx:39-47` | Actual render order: `Hero → Problem → WhatWeDo → HowWeWork → Verticals → RecentEssays → Team → FinalCta` (+ global `Footer`) | Target order: `Hero → Vertical Cards → Approach → Solution (night) → Cases → Final CTA (night) → Footer` | NL / EN | major |
| `components/sections/Problem.tsx` | Extra section, not present in the target 7 by any plausible name mapping | Not in target list | NL / EN | major |
| `components/sections/WhatWeDo.tsx` | Extra section, not present in the target 7 | Not in target list | NL / EN | major |
| `components/sections/RecentEssays.tsx` | Extra section, not present in the target 7 | Not in target list | NL / EN | major |
| `components/sections/home/Team.tsx` | Extra section, not present in the target 7 | Not in target list | NL / EN | major |
| `components/sections/Verticals.tsx` vs. target "Vertical Cards" | Plausible 1:1 name match. **AMBIGUOUS — flagged for Virat**: confirm `Verticals.tsx` is meant to satisfy "Vertical Cards" | Target component | NL / EN | minor |
| `components/sections/HowWeWork.tsx` vs. target "Approach" | Plausible 1:1 name match, and it is the homepage's night section, which could map to target "Solution (night)" instead — the two target slots can't both be satisfied by one file. **AMBIGUOUS — flagged for Virat**: is `HowWeWork` meant to be "Approach," "Solution," or neither — a third section is missing either way | Target expects **two distinct** sections, "Approach" and "Solution (night)" | NL / EN | minor |
| Target "Cases" | No case-study/portfolio section exists anywhere in `components/sections/` | Target list requires a "Cases" section | NL / EN | major (missing entirely, not just reordered) |

---

## 9. Accent-per-page count (§4.4)

Target: 5–8 per page. Severity: `ok` in range; `major` for 0–4 or 9–12; `blocker` for 0 on homepage or >15 anywhere.

| Page | Locale | Accent count | Severity |
|---|---|---|---|
| `/` | NL | 37 | blocker |
| `/en` | EN | 37 | blocker |
| `/diensten` | NL | 91 | blocker |
| `/en/services` | EN | 91 | blocker |
| `/essays` | NL | 5 | ok |
| `/en/essays` | EN | 5 | ok |
| `/essays/reserveringen-zes-kanalen` | NL | 6 | ok |
| `/en/essays/reserveringen-zes-kanalen` | EN | 6 | ok |
| `/essays/waarom-we-geen-chatbots-verkopen` | NL | 6 | ok |
| `/en/essays/waarom-we-geen-chatbots-verkopen` | EN | 6 | ok |
| `/contact` | NL | 6 | ok |
| `/en/contact` | EN | 6 | ok |
| `/privacybeleid` | NL | 4 | major |
| `/algemene-voorwaarden` | NL | 4 | major |
| 404 | NL | 5 | ok |
| 404 | EN | 5 | ok |

Note: `/en/privacybeleid` and `/en/algemene-voorwaarden` could not be audited for this category — both 404 (see Section 7 and Summary).

---

## Appendix A — Grep raw outputs

**Category 1 — hex literals outside `app/globals.css`:**
```
components/layout/Footer.tsx:20: * Background is the literal --night-adjacent #0A0806 from the Brand Bible
components/layout/Footer.tsx:40:    <footer className="bg-[#0A0806] pt-24 pb-12">
components/layout/Section.tsx:16: * - cream (#FAF6EE) is the canvas — default background, ink text
components/layout/Section.tsx:17: * - cream-deep (#F2EBDA) is the secondary — for alternating rhythm
components/layout/Section.tsx:18: * - night (#0E0B08) is the dark section — used sparingly, 2-3 max per page
components/layout/Section.tsx:19: * - mist (#DDE6DA) is the sage — used once per page maximum (currently reserved for Contact)
```

**Category 2 — `font-family` / `next/font`:**
```
app/[locale]/layout.tsx:2:import {Anton, Cormorant_Garamond, Inter} from 'next/font/google';
app/globals.css: 14 matches, all var(--font-display|body|italic)
app/[locale]/essays/[slug]/page.tsx:102, components/sections/essays/mdxComponents.tsx:21 — [font-family:var(--font-italic)]
```

**Category 3 — mark / logo / asterisk:**
```
components/layout/Footer.tsx:46:              {t('brand.wordmark')}
components/layout/Footer.tsx:97:            ✱
components/ui/AsteriskBreak.tsx:6: * AsteriskBreak — the ✱ OTS section signature.
components/ui/AsteriskBreak.tsx:34:      <span className="text-5xl text-accent leading-none">✱</span>
app/[locale]/essays/[slug]/page.tsx:9,97 — imports and renders <AsteriskBreak />
```

**Category 4 — motion specs (representative excerpt; full list is 20+ lines across 10 files):**
```
components/layout/Nav.tsx:166:              duration: prefersReducedMotion ? 0 : 0.4,
components/sections/essays/EssayCard.tsx:47:        duration: shouldReduce ? 0 : 0.6,
components/sections/home/Team.tsx:70:                  duration: shouldReduce ? 0 : 0.6,
components/sections/HowWeWork.tsx:72:                    duration: shouldReduce ? 0 : 0.6,
components/sections/Problem.tsx:61,74:                  duration: shouldReduce ? 0 : 0.6,
components/sections/services/{PageHeader,ServiceDeepDive,ServiceLadder}.tsx — duration: shouldReduce ? 0 : 0.6
components/sections/services/WhatWeRefuse.tsx:51:                  duration: shouldReduce ? 0 : 0.5,
components/sections/WhatWeDo.tsx:94:  transition-[border-color,transform] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]
components/layout/Nav.tsx:82: transition-[background-color,backdrop-filter,border-color,box-shadow] duration-[400ms] ease-out
```

**Category 5 — vocabulary blacklist (EN/NL):** no hits.

**Category 6 — ex-team names (`krishna|sneha`):** no hits.

**Category 7 — pricing (`€|EUR|vanaf|starting`), excerpted:**
```
messages/en.json:94:        "price": "€2,500",
messages/en.json:104:        "price": "€8,000 – €22,000+",
messages/en.json:114:        "price": "€1,500 – €5,000+ / month",
messages/en.json:323-325: Foundation €8,000 / Core €14,000 / Complete €22,000+
messages/en.json:352-354: Monitor €1,500/month / Operate €3,000/month / Partner €5,000+/month
messages/nl.json: mirrors the above with Dutch thousand-separators (€2.500 etc.)
```
(full matching line count: 19 in `en.json`, 19 in `nl.json`)

**Category 8 — `components/sections/` listing:**
```
Hero.tsx  HowWeWork.tsx  Problem.tsx  RecentEssays.tsx  Verticals.tsx  WhatWeDo.tsx
contact/  essays/  home/  legal/  services/
home/: FinalCta.tsx  Team.tsx
```

---

## Appendix B — Screenshot index

- `01-homepage-nl.png` — `/` full-page, accent count 37 (blocker)
- `01-homepage-en.png` — `/en` full-page, accent count 37 (blocker)
- `02-diensten-nl.png` — `/diensten` full-page, accent count 91 (blocker)
- `02-services-en.png` — `/en/services` full-page, accent count 91 (blocker)
- `03-essays-index-nl.png` — `/essays` full-page, accent count 5 (ok)
- `03-essays-index-en.png` — `/en/essays` full-page, accent count 5 (ok)
- `04-essay-reserveringen-nl.png` / `04-essay-reserveringen-en.png` — essay sample 1, both locales, accent count 6 (ok)
- `04-essay-chatbots-nl.png` / `04-essay-chatbots-en.png` — essay sample 2, both locales, accent count 6 (ok)
- `05-contact-nl.png` / `05-contact-en.png` — contact page, both locales, accent count 6 (ok)
- `06-privacybeleid-nl.png` — `/privacybeleid`, accent count 4 (major); no EN equivalent exists
- `06-algemene-voorwaarden-nl.png` — `/algemene-voorwaarden`, accent count 4 (major); no EN equivalent exists
- `07-404-nl.png` / `07-404-en.png` — 404 page, both locales, accent count 5 (ok)

---

**Step 0.2 · Drift Report · v1.0**
*Behind every smooth business is a better system.*
