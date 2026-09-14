# STEP 15 — Footer

**Project:** Ontwikkeling Tech Services — Marketing Website
**Type:** Claude Code prompt
**Estimated time:** 45–60 minutes
**Prerequisites:** Step 14 complete and committed (Final CTA Section). This is the **last homepage section** — once this ships, the homepage build is complete.
**Version:** 1.0

---

## Goal

Build the site-wide footer (PRD §4.9): four columns of links and trust signals on the deepest-dark background the site uses, closing every page.

---

## Context

- Design spec: PRD Section 4.9 ("Footer") — reproduced in full below, no need to look for the PRD file in the repo.
- Trust-signal standard: Brand Bible §8.1 — *"KVK and BTW must be real. Verified before launch."*
- Confirmed real values for this build:
  - **KVK:** `42027611`
  - **BTW:** `NL005440779B20`
  - **City:** Amsterdam
  - **Contact email:** `admin@ontwikkelingtechservices.nl`
- **Deliberately omitted, not placeholder-filled:** physical address and WhatsApp link. The spec calls for both, but neither is real yet — OTS doesn't have an office (Brand Bible §5.7 confirms this directly), and no WhatsApp business number is set up. Per the same standard applied to KVK/BTW: a missing item is fine, a fake one is not. Both are flagged in the Acceptance Test and again at the end of this file as pre-launch items — nothing here needs re-flagging by you until you're doing the final launch pass.
- **Spec says "Deepak's direct email"; this build uses `admin@` instead.** That's a deliberate, temporary substitution — worth knowing it's there before this ships, since the Brand Bible voice standard is specifically "named person, not generic inbox" (§8.2: *"Vragen? WhatsApp Deepak direct"* is the model, not an aliased address). Not asking you to reconsider now — just don't want it to look accidental later.

---

## Files to Create or Modify

- `components/layout/Footer.tsx` — new
- `app/[locale]/layout.tsx` — add `<Footer />` (footer is site-wide, not homepage-only — confirm it renders on every page going forward, not just `/`)
- `messages/nl.json` — add `footer` namespace
- `messages/en.json` — add `footer` namespace

---

## Detailed Specification

### Structure

- Background: `#0A0806` (a distinct, deeper dark than `--night` — use the literal hex, not the `--night` token).
- Padding: 96px top, 48px bottom.
- Four-column grid desktop, single column mobile.

### Column 1 — Brand

- Wordmark: *"ontwikkeling."* in Anton 32px, `--cream`.
- Tagline, mt-16: Inter 400 14px, `--cream` at 60% opacity. Text (same in both locales — this is the fixed North Star line, never translated): *"Behind every smooth business is a better system."*
- Trust line, mt-32: Inter 400 12px, `--cream` at 40% opacity.
  - NL: *"KVK 42027611 · BTW NL005440779B20 · Amsterdam"*
  - EN: same string, unchanged (KVK/BTW numbers and city names aren't translated).

### Column 2 — Services (DIENSTEN)

- Header: Inter 600 11px uppercase, `--cream` at 40% opacity, letter-spacing 0.14em. *"DIENSTEN"* (NL) / *"SERVICES"* (EN).
- Links, Inter 400 14px, `--cream` at 80% opacity, 12px vertical rhythm:
  - Audit → `/diensten#audit` (NL) / `/en/services#audit` (EN)
  - Build → `/diensten#build` / `/en/services#build`
  - Retainer → `/diensten#retainer` / `/en/services#retainer`
  - Alle diensten / All services → `/diensten` / `/en/services`
- Hover: colour to full `--cream`, underline draws in.

### Column 3 — Company (BEDRIJF)

- Header: *"BEDRIJF"* (NL) / *"COMPANY"* (EN).
- Links: Essays → `/essays` / `/en/essays`; Over ons / About → `/over-ons` / `/en/about`; Contact → `/contact` / `/en/contact`.
- **All three routes 404 until later steps** (Essays index/detail, About, Contact aren't built yet). Expected — same pattern as the Team section CTA in Step 13. Build the links now.

### Column 4 — Contact

- Header: *"CONTACT"* (NL) / *"CONTACT"* (EN).
- `admin@ontwikkelingtechservices.nl` as a `mailto:` link, Inter 400 14px `--cream` at 80% opacity.
- **No WhatsApp link, no physical address** — omit both entirely rather than rendering an empty or placeholder line. Don't leave visual gap-filler where they'd go; the column is simply shorter.
- Privacybeleid / Privacy policy → `/privacybeleid` / `/en/privacy`.
- Algemene voorwaarden / Terms → `/algemene-voorwaarden` / `/en/terms`.
- Both legal-page links also 404 for now — same expected pattern (Phase 4 steps).

### Bottom bar

- mt-64, pt-24, border-top `1px --rule`.
- Left: Inter 400 12px, `--cream` at 40% opacity.
  - NL: *"© 2026 Ontwikkeling Tech Services. Alle rechten voorbehouden."*
  - EN: *"© 2026 Ontwikkeling Tech Services. All rights reserved."*
- Right: a single asterisk mark *✱*, `--accent`, 20px — "the signature," per the Brand Bible's once-per-page grid-break/signature system.

---

## Ready-to-Paste Prompt for Claude Code

```
Build the site-wide footer:

1. Create components/layout/Footer.tsx per this spec:
   - Background #0A0806 (literal hex, not the --night CSS variable), padding
     96px top / 48px bottom, four-column grid desktop collapsing to single
     column mobile.
   - Column 1 (Brand): "ontwikkeling." wordmark in Anton 32px --cream; tagline
     mt-16 Inter 400 14px --cream/60%, exact text "Behind every smooth business
     is a better system." (unchanged in both locales — do not translate this
     line); trust line mt-32 Inter 400 12px --cream/40%: "KVK 42027611 · BTW
     NL005440779B20 · Amsterdam" (identical string in both locales).
   - Column 2 (Services/Diensten): header + four links (Audit/Build/Retainer/
     All services) pointing to the anchor hashes on /diensten or
     /en/services as specified, Inter 400 14px --cream/80%, hover to full
     --cream with underline draw-in.
   - Column 3 (Company/Bedrijf): header + three links (Essays, Over ons/About,
     Contact) to their locale-aware routes. These will 404 until later build
     steps — that's expected, don't build the target pages.
   - Column 4 (Contact): header, then ONLY a mailto: link to
     admin@ontwikkelingtechservices.nl, then Privacybeleid/Privacy and
     Algemene voorwaarden/Terms links (also expected to 404 for now). Do NOT
     add a WhatsApp link or a physical address line — omit them completely,
     don't leave placeholder gaps.
   - Bottom bar: mt-64, pt-24, top border 1px --rule. Left: copyright text
     (NL: "© 2026 Ontwikkeling Tech Services. Alle rechten voorbehouden.",
     EN: "© 2026 Ontwikkeling Tech Services. All rights reserved."), Inter
     400 12px --cream/40%. Right: a single "✱" character in --accent, 20px.

2. Add the footer to app/[locale]/layout.tsx so it renders on every page site-
   wide, not just the homepage.

3. Add a "footer" namespace to messages/nl.json and messages/en.json with all
   copy above.

4. Run the dev server, confirm the footer renders correctly at the bottom of
   the homepage in both /nl and /en, and that no TypeScript or console errors
   appear.
```

---

## Acceptance Test

Verify:

1. Footer renders at the bottom of the homepage, both locales, with the correct four-column layout desktop and single-column stack mobile.
2. Column 1 shows the wordmark, the untranslated tagline, and the trust line reading exactly `KVK 42027611 · BTW NL005440779B20 · Amsterdam` in both `/nl` and `/en`.
3. Column 4 shows only the `admin@` mailto link and the two legal links — confirm there is no WhatsApp icon, no address line, and no empty placeholder space where they'd normally sit.
4. All Column 2/3/4 page links resolve to the correct paths (even though most currently 404 — check the `href`, not the destination page).
5. Bottom bar shows the correct copyright text per locale and a single accent-coloured asterisk on the right.
6. Footer is confirmed rendering on a second route (not just `/`) — e.g. check it also appears if you navigate to a nonexistent page and land on the 404, or confirm via the `layout.tsx` placement directly.
7. No console errors, no TypeScript errors.

---

## If This Doesn't Work

- **Footer only shows on homepage, not site-wide:** confirm it was added to `app/[locale]/layout.tsx`, not `app/[locale]/page.tsx` — the former wraps every page, the latter is homepage-only.
- **Trust line renders differently between locales:** the KVK/BTW/city string must be hardcoded identically in both `nl.json` and `en.json` — don't let it flow through any translation logic that might alter formatting.
- **Column 4 looks visually unbalanced without WhatsApp/address:** that's expected and correct for now — don't add filler content to balance it. If it looks genuinely broken (not just shorter), check `align-items` on the column isn't assuming a fixed number of children.
- **Paste the exact error, the file Claude Code produced, and "Step 15" back to Claude if anything else breaks.**

---

## Homepage Build: Complete

Once this ships, all nine homepage sections + navigation + footer are done. Before Phase 4 (Services, Essays, About, Contact pages) or launch, the following are still open and worth carrying on an explicit list rather than trusting memory:

- Physical address and WhatsApp number — add to the footer once real.
- `admin@` → Deepak's personal email, if you decide to make that switch.
- Founder portraits (blocks the About page team section, not this footer).
- Dutch copy review by Deepak across all `nl.json` entries, including this footer's trust line and copyright text.
- KVK number worth a final visual double-check against kvk.nl yourself before launch — I couldn't independently verify it via web search (KVK registrations aren't Google-indexed), so treat this as unconfirmed on my end, not cleared.

---

*Behind every smooth business is a better system.*
