# STEP 20 — 404 Page

**Project:** Ontwikkeling Tech Services — Marketing Website
**Type:** Claude Code prompt
**Estimated time:** 30–45 minutes
**Prerequisites:** Step 19 complete (Privacy + Terms). No new dependencies.

---

## Goal

Build the site's not-found page (PRD §3.1, page #9). This is the last page in the architecture that hasn't been built. Once it ships, Phase 4 is functionally complete and the site is ready for a Vercel preview deploy.

---

## Context

- Design spec: PRD §3.1 describes it only as *"Not found — with a link back."* — no dedicated section, so this build reuses the site's existing editorial pattern rather than inventing new components.
- Next.js App Router convention: a file named `not-found.tsx` inside `app/[locale]/` handles both explicit 404s (typing a URL that doesn't exist) and calls to `notFound()` inside pages (already used by the Privacy/Terms pages in Step 19 to gate their EN locale). So this isn't just cosmetic — it's the fallback that catches the deliberate 404s already firing elsewhere in the site.

---

## Files to Create or Modify

- `app/[locale]/not-found.tsx` — new
- `messages/nl.json` / `messages/en.json` — add `notFound` namespace

---

## Detailed Specification

### Layout

Reuse the site's existing centred single-column pattern — same measure (720px max-width) as the essay and legal pages. Consistency over novelty; a 404 that looks like a different site than the rest of the pages tells the visitor something's more broken than it actually is.

- Background `--cream`.
- Full viewport height, content vertically centred (`min-h-screen`, flex-column-centred).
- No nav or footer suppression — the site chrome renders as normal. A visitor hitting a 404 needs *more* navigation, not less.

### Content

- Eyebrow: *"// 404"* — same eyebrow treatment used throughout the site.
- H1: Anton, `clamp(56px, 7vw, 96px)`.
  - NL: *"Deze pagina bestaat niet."*
  - EN: *"This page doesn't exist."*
- Body: Inter 400 17px `--ink-soft`, max-width 480px, mt-24.
  - NL: *"Misschien is de link verouderd, of hebben we de pagina verplaatst. Vanaf hier gaat het meestal het snelst terug via de startpagina of onze diensten."*
  - EN: *"The link may be outdated, or we may have moved the page. From here, the fastest way back is usually the homepage or our services."*
- Two links, side by side desktop / stacked mobile, mt-48:
  - Primary button: *"Naar startpagina"* / *"Back to homepage"* → `/`
  - Ghost link with arrow: *"Bekijk onze diensten →"* / *"See our services →"* → `/diensten` (NL) / `/en/services` (EN) — use the same locale-aware `Link` pattern already proven in the Footer.
- No decorative image or illustration. The Brand Bible's warmth-through-editorial-photography rule applies to marketing surfaces; a 404 is a utility page, and a moody restaurant photo behind "this page doesn't exist" would read as tonally weird, not warm.

### One thing to get right

Make sure the page uses the site's real `Nav` and `Footer` components — App Router's `not-found.tsx` sits inside the locale layout, so this should happen automatically, but worth confirming rather than assuming. The visitor should be able to use the language toggle to switch locales even from a 404, and both footer links and the primary CTA should still work.

---

## Ready-to-Paste Prompt for Claude Code

```
Build the site's 404 page.

1. Create app/[locale]/not-found.tsx per this spec:
   - Background --cream, min-h-screen, content vertically centred in a
     720px max-width column (match the essay/legal page measure).
   - Nav and Footer must render as they do on any other page — do not
     suppress them.
   - Eyebrow "// 404", Anton H1 clamp(56px, 7vw, 96px), body copy Inter
     400 17px --ink-soft (max-width 480px, mt-24), then two links mt-48:
     primary button "Naar startpagina" / "Back to homepage" linking to /,
     and a ghost arrow link "Bekijk onze diensten →" / "See our services →"
     linking to /diensten or /en/services using the locale-aware Link
     pattern already used in the Footer.

2. Add a "notFound" namespace to messages/nl.json and messages/en.json with
   the exact NL and EN copy from this prompt file.

3. Verify with Playwright:
   - Navigate to a URL that doesn't exist, e.g. /this-page-does-not-exist,
     and confirm the new 404 page renders instead of a Next.js default.
   - Do the same at /en/this-page-does-not-exist and confirm the English
     copy renders.
   - Navigate to /en/privacybeleid (which was deliberately gated to 404
     in Step 19) and confirm THIS page's 404 renders there too — that
     confirms the not-found.tsx correctly catches both URL-based 404s and
     notFound() calls from within other pages.
   - Confirm Nav and Footer render on all three test cases, and that
     clicking the primary "Homepage" button returns to /.
   - Capture browser console output on each — expect zero errors, zero
     warnings.

4. Run tsc --noEmit and confirm clean.

Report each verification individually and save screenshots to
qa-screenshots/ with descriptive names.
```

---

## Acceptance Test

Verify:

1. A URL that doesn't exist (e.g. `/random-nonsense`) renders the new 404 page in NL, and `/en/random-nonsense` renders it in EN.
2. `/en/privacybeleid` (deliberately 404'd in Step 19) also renders this page — confirms the `not-found.tsx` catches `notFound()` calls, not just URL-based misses.
3. Nav and Footer both render, and the language toggle in the Nav works from the 404.
4. Primary "Homepage" button returns to `/` correctly; "Services" ghost link goes to the correct locale-specific slug.
5. `tsc --noEmit` clean, zero console errors/warnings on any of the test cases above.

---

## What this completes

Every page in PRD §3.1's site architecture table is now built, except About (deliberately dropped, not deferred). The site is ready for a Vercel preview deploy — which is the natural next step, and the one that finally tests whether all of this actually works outside `localhost`.

---

*Behind every smooth business is a better system.*
