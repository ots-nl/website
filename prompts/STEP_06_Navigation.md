# STEP 06 — Navigation

**Project:** Ontwikkeling Tech Services — Marketing Website
**Type:** Claude Code prompt
**Estimated time:** 60–90 minutes
**Owner:** Virat
**Version:** 1.0
**Phase:** 3 — Navigation and Homepage (first step)

---

## Goal

Build `Nav.tsx` — the persistent top navigation bar — and wire it into the root locale layout so it appears on every page. Transparent over the hero, frosted-glass cream after 80px of scroll. Logo left, section links center, language toggle + CTA right. Full mobile hamburger overlay.

This is the moment the site stops being a design-system demo and starts being a real product shell.

---

## Context

- References **PRD v1.1 §4.0** (Navigation spec) and **§2.6** (animation principles — nav scroll transition is 400ms ease).
- Components available from Phase 2: `Section`, `Container` (`components/layout/`), `Button`, `Eyebrow`, `AsteriskBreak` (`components/ui/`).
- `next-intl` is configured (Step 4a) with `as-needed` locale prefix — Dutch has no URL prefix, English is under `/en`.
- Prerequisite: Step 5d complete. Full shared component library exists: Section, Container, Button, Eyebrow, AsteriskBreak, ScrollIndicator.

### A decision worth naming before you start

The PRD's site architecture (§3.1) plans dedicated pages — `/diensten`, `/essays`, `/over-ons` — but those don't exist yet. They're built in **Phase 4** (Step 16 onward). Right now, the homepage is still being assembled section by section (Steps 8–13: Problem, What We Do, How We Work, Verticals, Essays Preview, Team).

So for this step, the three nav links point to **in-page anchors on the homepage** — `#diensten`, `#essays`, `#team` — not real routes. This is a deliberate placeholder, not a shortcut: it means the nav is fully functional and useful as soon as those homepage sections exist (in a few steps), rather than linking to 404s. When Phase 4 builds the dedicated pages, we'll come back to Nav.tsx and swap the anchors for real routes — a five-minute change, noted in `STEP_16_Services_Page.md` when we get there.

This is the same "build what's true today, leave a clean seam for tomorrow" pattern you saw with the Button component's discriminated union — don't overbuild for a future that isn't real yet.

---

## Files this step creates or modifies

**Creates:**
- `components/layout/Nav.tsx` — the navigation bar (client component — it needs scroll state and mobile menu state)
- `prompts/STEP_06_Navigation.md` — this file, saved to the repo

**Modifies:**
- `app/[locale]/layout.tsx` — imports and renders `<Nav />` above `{children}`
- `messages/nl.json` — adds a `nav` translation namespace
- `messages/en.json` — adds a `nav` translation namespace

**Does NOT touch:**
- `app/[locale]/page.tsx` (homepage content) — anchors will resolve once those sections exist in later steps; until then they simply scroll to the bottom of the current page, which is fine and expected.

---

## Detailed specification (from PRD §4.0)

**Dimensions:** 72px height desktop, 60px mobile. `position: fixed`, `top: 0`, `z-index: 200`.

**Default state (page at top, over hero):**
- Background transparent.
- Logo colour `--ink` (near-black ink token).
- Links colour `--ink-soft`.

**Scrolled state (after 80px of scroll):**
- Background `rgba(250, 246, 238, 0.88)` — translucent cream.
- `backdrop-filter: blur(20px)`.
- `border-bottom: 1px solid` the `--rule` token.
- `box-shadow: 0 4px 24px rgba(20, 18, 16, 0.05)`.
- Transition between states: 400ms ease, on `background`, `backdrop-filter`, `box-shadow`, `border-color`.

**Left — Logo:**
- Wordmark `ontwikkeling.` in Anton, 22px, `--ink`, letter-spacing `-0.02em`. The trailing period is part of the mark — don't drop it.
- On mobile (below 768px), wordmark shortens to `OTS` at 24px.
- Wraps in a `Link` to `/` (locale-aware — next-intl handles the prefix).

**Center — Links (desktop only, hidden below 768px):**
- Three links: Diensten / Essays / Over ons (NL), Services / Essays / About (EN).
- Inter 400, 14px, `0.02em` letter-spacing, colour `--ink-soft`, hover `--ink`.
- Hover animation: underline draws in left-to-right via `scaleX` on a `::after` pseudo-element, 350ms.

**Right — Controls:**
- **NL/EN toggle:** small pill, 32px height, Inter 500, 12px. Active locale gets `--accent` background + `--cream` text. Inactive locale is `--ink-soft` on transparent. Clicking switches locale while preserving the current path (next-intl's locale switcher pattern).
- **CTA button:** "Vraag een Audit aan" / "Request an Audit" — this is the `Button` component's `nav` variant, already built in Step 5b.

**Mobile (below 768px):**
- Wordmark left (`OTS`), hamburger icon right — three horizontal lines, 22px, `--ink`.
- Tapping the hamburger opens a full-viewport overlay, `--cream` background, the hamburger icon morphs into an `✕`.
- Overlay content, stacked and centred: three links at 32px Inter 500, language toggle below them, primary CTA button at the bottom.
- Animation: overlay fades + slides in from the top-right corner, 400ms, `cubic-bezier(0.16, 1, 0.3, 1)`.
- Body scroll is locked while the overlay is open (a real, easy-to-miss detail — forgetting it means the page scrolls behind the open menu).

**Accessibility:**
- Hamburger button needs `aria-label` ("Open menu" / "Close menu", swapping with state) and `aria-expanded`.
- Nav links and controls are keyboard-reachable in a sensible tab order.
- All touch targets ≥ 44×44px (the hamburger icon itself is small, but its tappable button area must meet this).

---

## Two technical decisions worth understanding

**1. Why `Nav.tsx` has to be a Client Component.**

Everything you've built so far — `Section`, `Container`, even `page.tsx` — is a Server Component by default. That's Next.js 16's App Router default, and it's usually what you want: the server renders the HTML once, ships it down, done. No JavaScript needed for a `<div>` with some text in it.

Nav breaks that. It needs to *know things that only exist in the browser*: how far the user has scrolled (for the transparent → frosted transition), and whether the mobile menu is currently open. Those are runtime, client-side facts — `useState` and a scroll event listener. The moment a component needs `useState`, `useEffect`, or any browser API, it has to be marked `'use client'` at the top of the file. That single line is the boundary between "rendered once on the server" and "runs live in the visitor's browser."

This is also why Nav is the *first* component in the build that needs this directive — everything before it was pure presentation.

**2. Why the scroll threshold is a plain number, not a fraction of viewport height.**

80px is a fixed pixel value, not "10% of the hero." That's intentional. A fraction-of-viewport threshold means the nav's transition point moves depending on screen size and zoom level — inconsistent, unpredictable, hard to design against. A fixed 80px means the nav always transitions at the same physical scroll distance, regardless of device. Small detail, but it's the difference between "we thought about this" and "we didn't."

---

## THE PROMPT — paste this into Claude Code

```
You are executing Step 6 of the OTS website build. This step creates the persistent Navigation component and wires it into the root locale layout so it appears on every page.

Follow this plan exactly. If anything fails or is unclear, pause and report — do not attempt fixes without asking.

CONTEXT:
- Next.js 16, App Router. Nav.tsx must be a Client Component ('use client') because it needs scroll state and mobile menu open/close state.
- Existing components: components/layout/Section.tsx, components/layout/Container.tsx, components/ui/Button.tsx (has a 'nav' variant), components/ui/Eyebrow.tsx, components/ui/AsteriskBreak.tsx.
- next-intl is configured with as-needed locale prefix (Dutch at /, English at /en). Before writing any locale-aware Link or locale-switching logic, first inspect the existing i18n setup — look at i18n/routing.ts (or i18n/navigation.ts, whichever exists), middleware.ts or proxy.ts, and how app/[locale]/page.tsx currently imports Link or navigation helpers — and reuse that exact pattern. Do not invent a different import path.
- Design tokens (from app/globals.css @theme block): --ink, --ink-soft, --cream, --accent, --rule. Confirm exact token names in globals.css before use.

TASK 1 — Verify prerequisites.
Report:
- `pwd` → confirm ots-website directory
- `git status` → confirm clean tree (only STEP_06 as untracked is fine)
- `git log --oneline -3` → confirm last commit is the Step 5d ScrollIndicator commit
- Port 3000 check with if/else output PORT_FREE or PORT_OCCUPIED. Kill any orphan.
- Read app/globals.css and confirm the exact CSS variable names for ink, ink-soft, cream, accent, and rule tokens.
- Read the existing i18n routing/navigation file and report which Link/navigation import pattern is in use.

Pause for my approval before proceeding.

TASK 2 — Add nav translations.
Add a "nav" namespace to messages/nl.json and messages/en.json with these keys:
- logo: "ontwikkeling." (both locales — this is a wordmark, not translated)
- logoMobile: "OTS" (both locales)
- linkDiensten: "Diensten" (nl) / "Services" (en)
- linkEssays: "Essays" (both — same word in both languages)
- linkOverOns: "Over ons" (nl) / "About" (en)
- cta: "Vraag een Audit aan" (nl) / "Request an Audit" (en)
- openMenu: "Open menu" (nl) / "Open menu" (en)
- closeMenu: "Sluit menu" (nl) / "Close menu" (en)

Report the diff for both files before proceeding.

TASK 3 — Create the Nav component.
Create components/layout/Nav.tsx as a Client Component. Structure:

1. 'use client' directive at the top.
2. Imports: useState, useEffect from react; the locale-aware Link/navigation helper identified in Task 1; useTranslations and useLocale from next-intl; the Button component.
3. State: `scrolled` (boolean, false initially), `mobileMenuOpen` (boolean, false initially).
4. useEffect that adds a scroll listener on mount: sets `scrolled` to true when window.scrollY > 80, false otherwise. Removes the listener on cleanup. Use a passive listener for scroll performance.
5. useEffect that locks body scroll (document.body.style.overflow = 'hidden') when mobileMenuOpen is true, and restores it ('') when false or on unmount.
6. Desktop layout (hidden below 768px / md breakpoint): fixed top-0 left-0 right-0 z-[200] header, height 72px, three-part flex layout (logo left, links center, controls right), background/backdrop-filter/border/shadow conditionally applied based on `scrolled` state via Tailwind conditional classes, 400ms transition on background-color, backdrop-filter, border-color, box-shadow.
7. Logo: wordmark from translations, Anton font (should already be available as a font variable from Step 3a — check layout.tsx or globals.css for the exact CSS variable/class name), 22px, ink colour, letter-spacing -0.02em, wrapped in locale-aware Link to "/".
8. Center links: three Link elements to "/#diensten", "/#essays", "/#team" (in-page anchors — the corresponding homepage sections don't exist yet and will be built in Steps 8-13; these anchors are a deliberate forward-reference, not an error). Inter 400, 14px, ink-soft colour, hover:ink, with an ::after pseudo-element underline that scales in on hover (use Tailwind's group-hover or a small inline style/CSS module — pick whichever matches how Button's ghost variant hover underline was implemented in Step 5b, for consistency).
9. Right controls: a locale toggle (NL/EN pill, switches locale while preserving current path using the pattern identified in Task 1) and the Button component with variant="nav" for the CTA.
10. Mobile layout (visible below 768px): height 60px, logo (mobile short form "OTS") left, hamburger button right with aria-label from translations (openMenu/closeMenu) and aria-expanded={mobileMenuOpen}. Hamburger is three lines that morph to an X when open (CSS transform, no extra library needed).
11. Mobile overlay: full-viewport fixed div, cream background, z-index above the nav bar itself, rendered conditionally when mobileMenuOpen is true. Contains the same three links (32px Inter 500, centred, stacked), the locale toggle, and the primary CTA button. Fade + slide-in animation from top-right, 400ms, cubic-bezier(0.16, 1, 0.3, 1). Clicking any link or the CTA closes the overlay (set mobileMenuOpen to false).
12. Respect prefers-reduced-motion: if set, skip the slide/fade animation on the mobile overlay and the scroll colour transition duration should drop to near-instant.

Confirm the file was written and report its line count.

TASK 4 — Wire Nav into the root locale layout.
Open app/[locale]/layout.tsx. Import Nav and render it as the first child inside the body, above {children}. Do not wrap it in Section or Container — Nav manages its own fixed positioning and full-width background.

Report the diff.

TASK 5 — Start dev server and verify.
Run `npm run dev` in the background. Wait 15 seconds. Check whether http://localhost:3000/ and http://localhost:3000/en both return 200. Report any compilation or TypeScript errors.

If clean, pause and wait for my browser verification.

TASK 6 — Wait for user verification.
Pause here. I will check:
- Nav is transparent over the hero, and transitions to frosted cream with a visible blur after scrolling ~80px, on both / and /en
- Logo reads "ontwikkeling." on desktop, shrinks to "OTS" below 768px width (resize the browser or use device toolbar)
- The three links, language toggle, and CTA button are all present and styled correctly on the right
- Hovering a nav link shows the underline draw-in animation
- Clicking the language toggle switches locale and keeps me on the same page
- On mobile width: hamburger appears, tapping it opens the full-screen overlay with working links, toggle, and CTA, and tapping the X (or a link) closes it
- Page does not scroll behind the open mobile overlay
- Nothing on the existing page content (hero, Button showcase sections) regressed

Once I say "verified", proceed to Task 7.

TASK 7 — Stop dev server. Kill orphans.

TASK 8 — Commit and push.
Run `git status` and report. Should see:
- New: components/layout/Nav.tsx, prompts/STEP_06_Navigation.md
- Modified: app/[locale]/layout.tsx, messages/nl.json, messages/en.json

Stage all: `git add -A`

Commit with:
`feat(step-06): add Navigation component with scroll behaviour and mobile menu`

Push.

TASK 9 — Final report.

STEP 6 COMPLETE
- Component created: components/layout/Nav.tsx ([line count] lines)
- Files modified: app/[locale]/layout.tsx, messages/nl.json, messages/en.json
- Dev server: [worked / did not work]
- User verification: [confirmed / not confirmed]
- Git commit: [hash and message]
- Git push: [succeeded / failed]
- Port 3000: [free at end / occupied]
- Any warnings or unexpected output: [list, or "none"]

END OF PROMPT.
```

---

## Acceptance test — what you verify after Claude Code finishes

### Check 1 — Transparent-to-frosted transition
Visit `http://localhost:3000/`. At the very top of the page, the nav should be invisible against the hero — no background, no line, no shadow — just the logo, links, and CTA floating over the photograph/text. Scroll down about 100px. The nav should smoothly (not instantly) gain a translucent cream background with a visible blur behind it, a thin bottom border, and a soft shadow. Scroll back up — it should reverse.

### Check 2 — Logo and responsive breakpoint
At desktop width, the logo reads `ontwikkeling.` — note the trailing period. Shrink the browser window (or open dev tools device toolbar) below 768px — the logo should switch to `OTS` and the center links should disappear, replaced by a hamburger icon on the right.

### Check 3 — Link hover
Hover over "Diensten" (or "Services" on `/en`). An underline should draw in smoothly from left to right underneath the text. It should not appear instantly or draw right-to-left.

### Check 4 — Language toggle
Click "EN" while on the Dutch homepage. You should land on `/en` — same page, English content, and the toggle now shows EN as active. Click "NL" to go back.

### Check 5 — Mobile menu
At mobile width, tap the hamburger. A full-screen cream overlay should slide/fade in from the top-right, showing the three links stacked, the language toggle, and the CTA button, all centred. The page behind it should not scroll. Tap a link or the X — the overlay closes.

### Check 6 — No regressions
Everything built in Steps 5a–5d (Button showcase, Eyebrow/AsteriskBreak demo, ScrollIndicator in the hero) should still render and function exactly as before. The nav sits on top of all of it without pushing content down (it's `position: fixed`, so it overlays rather than occupying document flow).

---

## If this doesn't work

Paste back to me:
1. The exact error message or unexpected behaviour.
2. Which check (1–6) failed.
3. A screenshot if it's visual.

Do not let Claude Code guess-and-retry more than once on the same error — if the first fix attempt doesn't resolve it, stop and paste the situation back to me before a second attempt.

---

## What comes next

Once all six checks pass, come back and say:

> **"Step 6 done. Give me Step 7a."**

**Step 7a is Hero Layout Structure** — this is where the homepage stops being a placeholder and becomes the real thing: the two-column grid (55% text / 45% photograph), the section backgrounds, the container structure. Steps 7b–7d layer in typography, the photograph, and the page-load animation sequence on top of this skeleton.

Step 6 was the last "shared infrastructure" step for a while — from here, every step builds visible, real homepage content.

---

**Step 06 · Navigation · v1.0 (Claude Code-driven)**
*Behind every smooth business is a better system.*
