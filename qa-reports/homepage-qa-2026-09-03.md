# Homepage QA Report — 2026-09-03

Read-only verification pass against `localhost:3000` (dev server started for this run). Desktop = 1440×900, Mobile = 375×812. Screenshots saved to `qa-screenshots/` (paths below are relative to that folder). No files were modified as part of this QA pass beyond this report and the screenshots.

## Summary

| Pass | Scope | PASS | FAIL | UNCERTAIN |
|---|---|---|---|---|
| 1 — Desktop /nl | 10 checks | 9 | 1 | 0 |
| 2 — Desktop /en | 12 checks (10 + 2 extra) | 11 | 1 | 0 |
| 3 — Mobile /nl | 6 checks | 6 | 0 | 0 |
| 4 — Console/network | 2 checks | 1 | 1 | 0 |
| 5 — Source inspection | 4 checks | 4 | 0 | 0 |
| **Total** | **34 checks** | **31** | **2** | **0** |

The two FAILs are two symptoms of the same two underlying issues (one styling bug present on both locales, one console warning present on both locales) — not four independent bugs.

---

## FAIL / UNCERTAIN items

### 1. Nav language toggle: active locale still uses near-black background, not `--accent` (Pass 1 item 1, Pass 2 item 1)

**Status: FAIL — the previously-flagged issue is NOT fixed.**

The active locale pill (`nl` on `/`, `en` on `/en`) renders with class `bg-ink text-cream` — computed background `rgb(20, 18, 16)` (near-black) — instead of the accent color (`--color-accent: #E85A1C`) called for in `prompts/STEP_06_Navigation.md:80` ("Active locale gets `--accent` background + `--cream` text").

- **File:** [components/layout/Nav.tsx:69](components/layout/Nav.tsx#L69) — the ternary applies `'bg-ink text-cream'` for the active branch where `'bg-accent text-cream'` (or equivalent) is expected.
- Confirmed identically on both `/` (NL) and `/en` (EN) — the toggle for whichever locale is active always renders `bg-ink`, never accent.
- Screenshots: `01-nav-top-desktop-nl.png`, `01-nav-scrolled-desktop-nl.png`, `01-nav-top-desktop-en.png`, `01-nav-scrolled-desktop-en.png` — visible in each as the dark pill around "nl"/"en".

### 2. Console warning: Next.js Image sizing mismatch on Final CTA card photo (Pass 4 item 1)

**Status: FAIL — real, reproducible warning on every load.**

On a fresh reload of `/nl`, the browser console logs:

```
[WARNING] Image with src "/images/final-cta-card.jpg" has either width or height modified, but not the other.
If you use CSS to change the size of your image, also include the styles 'width: "auto"' or 'height: "auto"'
to maintain the aspect ratio.
```

- **File:** [components/sections/home/FinalCta.tsx:57-63](components/sections/home/FinalCta.tsx#L57-L63) — `<Image width={400} height={500} className="w-full h-full object-cover" />`. The `w-full h-full` Tailwind classes let CSS drive both dimensions of the image while the `width`/`height` props set fixed intrinsic values, which is what triggers Next's aspect-ratio warning.
- No React key warnings and no other console errors/warnings were present. Full capture: 0 errors, 1 warning, exactly the message above (also logged once more on the mobile-pass reload).
- Network requests: no unexpected 404s. All font/image/JS chunk requests returned 200/304/307. (The task's explicitly-allowed 404 routes — `/over-ons`, `/contact`, `/en/about`, etc. — were not visited in this pass since the checklist scoped this check to the homepage's own network activity.)

### 3. UNCERTAIN — bare `/` can redirect to `/en` after visiting `/en` once (not a numbered checklist item, flagging as an observation)

Not part of the five passes' explicit checks, but worth surfacing: after navigating to `/en` in the same browser session, a subsequent request to `http://localhost:3000/` (or `/nl`) redirected to `/en` rather than showing NL. This is `next-intl`'s default `localeDetection` behavior reading the `NEXT_LOCALE` cookie set by the earlier `/en` visit — most likely intentional (remembering a visitor's language choice) rather than a bug, but flagging as UNCERTAIN since the task described "/" as reliably NL and a first-time visitor arriting at "/" after being sent a `/en` link elsewhere (e.g. a shared link) would see EN unexpectedly. No code change made; worth a product decision, not a fix.

---

## PASS 1 — Desktop (1440×900), /nl

| # | Check | Result | Note |
|---|---|---|---|
| 1 | Nav transparent→frosted on scroll; active toggle color | **FAIL** | Frosted-on-scroll transition works correctly (see `01-nav-scrolled-desktop-nl.png`); active toggle color bug per above |
| 2 | Hero reveal animation; exactly one Cormorant italic span sitewide | PASS | Only `<span class="type-accent-word">` ("beter") found via computed-style scan of every element on the page |
| 3 | Problem section copy is Dutch | PASS | Confirmed Dutch body copy via accessibility tree |
| 4 | What We Do: 3 cards, hover border/lift | PASS | All three cards have `hover:border-accent hover:-translate-y-1`; hover screenshot `04-whatwedo-hover-audit-desktop-nl.png` |
| 5 | How We Work: dark bg, connecting line visible | PASS | `bg-night`; dashed connector line (`border-dashed border-muted/30`) confirmed rendered, 481px tall |
| 6 | Verticals: 3-column grid | PASS | `06-verticals-desktop-nl.png` |
| 7 | Essays: real photographs load | PASS | All three essay images loaded (naturalWidth 475, complete:true) once scrolled into view |
| 8 | Team: 3 distinct-colored avatars, initials D/A/V | PASS | Deepak = cream-deep bg, Ankur = night-soft bg, Virat = accent-tint bg — three distinct colors |
| 9 | Final CTA: accent word excludes trailing period | PASS | `h2Accent: "hier"`, `h2Suffix: "."` rendered outside the accent `<span>` |
| 10 | Footer trust line exact text; no WhatsApp/address | PASS | Trust line reads exactly `KVK 42027611 · BTW NL005440779B20 · Amsterdam`; contact column has only email + Privacy + Terms links |

## PASS 2 — Desktop (1440×900), /en

Same 10 checks repeated; only item 1 differs from NL.

| # | Check | Result | Note |
|---|---|---|---|
| 1 | Nav active toggle color | **FAIL** | Same bug, active `en` pill also renders `bg-ink` |
| 2–10 | Hero/Problem/WhatWeDo/HowWeWork/Verticals/Essays/Team/FinalCta/Footer | PASS | All render correctly in English |
| extra | No leftover Dutch text anywhere | PASS | Full accessibility-tree text dump reviewed section by section — 100% English |
| extra | Footer trust line + tagline byte-identical to /nl | PASS | Both `"KVK 42027611 · BTW NL005440779B20 · Amsterdam"` and `"Behind every smooth business is a better system."` are character-for-character identical in `messages/nl.json` and `messages/en.json` (by design, untranslated) |

## PASS 3 — Mobile (375×812), /nl

| # | Check | Result | Note |
|---|---|---|---|
| 1 | Nav collapse/hamburger/overlay/close | PASS | `11-nav-collapsed-mobile-nl.png` → `11-nav-open-mobile-nl.png` → `11-nav-closed-mobile-nl.png` |
| 2 | All sections collapse to single column | PASS | Verified via bounding-rect checks (all cards share the same `x`) and screenshots `12`–`19` |
| 3 | Team cards stacked vertically | PASS | All three avatar cards at `x: 24`, distinct `y` values |
| 4 | Final CTA photo card below text block | PASS | Heading `top` (13182px) < photo `top` (14000px) in document flow |
| 5 | Footer single-column, no WhatsApp/address gap | PASS | `20-footer-mobile-nl.png`; all footer column headings at `x: 24` |
| 6 | No horizontal scroll anywhere | PASS | `document.body.scrollWidth` (360px) never exceeded `window.innerWidth` (375px) at any scroll position checked |

## PASS 4 — Console and network, /nl

| # | Check | Result | Note |
|---|---|---|---|
| 1 | Console errors/warnings on fresh reload | **FAIL** | 0 errors, 1 real warning (Next Image sizing mismatch, see above). No React key warnings. |
| 2 | Network 404s (excluding known future-page routes) | PASS | No unexpected 404s among font/JS/image requests captured on the homepage load |

## PASS 5 — Structural source inspection

| # | Check | Result | Note |
|---|---|---|---|
| 1 | Exactly 2 dark/night sections on homepage | PASS | `grep` for `bg-night` / `background="night"` across `components/sections/` found exactly `HowWeWork.tsx` and `home/FinalCta.tsx` (the `bg-night` inside HowWeWork's step-circle markup is a detail within that same section, not a third section). Footer's `#0A0806` is separate and correctly excluded. |
| 2 | Exactly 1 Cormorant italic instance sitewide | PASS | `grep -i "cormorant\|italic\|type-accent-word"` across `components/` found exactly one usage: `Hero.tsx:70` |
| 3 | Footer tagline byte-identical nl/en | PASS | Confirmed via direct read of both `messages/nl.json:228` and `messages/en.json:224` |
| 4 | Homepage section order matches spec | PASS | `app/[locale]/page.tsx` renders `Hero, Problem, WhatWeDo, HowWeWork, Verticals, RecentEssays, Team, FinalCta`, wrapped by `Nav`/`Footer` in `layout.tsx` — matches expected order exactly |

**Note on directory structure:** the task described checking `components/sections/home/`, but only `Team.tsx` and `FinalCta.tsx` actually live there — the rest of the homepage sections (`Hero`, `Problem`, `WhatWeDo`, `HowWeWork`, `Verticals`, `RecentEssays`) live directly in `components/sections/`. Searches above were run across the full `components/sections/` tree to get accurate counts.

---

## No issues found (clean, no re-check needed)

- Nav frosted/transparent scroll transition
- Single Cormorant Garamond italic instance sitewide (both locales, both source and rendered)
- Problem section Dutch/English copy correctness
- What We Do card hover states (border color + lift, all 3 cards)
- How We Work dark background + visible dashed connector line
- Verticals 3-column grid
- Essays real photographs loading correctly
- Team avatar distinct colors + initials
- Final CTA accent-word/period color split
- Footer trust line exact text, tagline byte-identity, no WhatsApp/address
- Full EN translation completeness (no leftover Dutch anywhere)
- Mobile nav hamburger open/close flow
- Mobile single-column collapse across every section
- Mobile Team card vertical stacking
- Mobile Final CTA photo-below-text ordering
- No horizontal scroll at any point on mobile
- No unexpected network 404s
- Exactly 2 dark sections on the homepage (How We Work, Final CTA)
- Homepage section order matches spec exactly
