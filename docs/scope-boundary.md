# Scope Boundary — Brand v0.2 Redesign

**Status**: DRAFT — pending Virat + Deepak sign-off
**Author**: Virat (drafted via Claude Code, PRD v2.1 Phase 0 Step 0.3)
**Date**: 2026-10-13
**Supersedes**: n/a — first scope boundary for v0.2

Phase 1 does not begin until Section 6 is initialled by both Virat and Deepak.

---

## 1. In scope — Phase 1–3

**Blocker count = 9** (drift report, Step 0.2). Per the Phase 0 acceptance rule in the PRD, blocker counts over 5 are a signal that Phase 1 may need re-scoping. The drift report itself groups these 9 line items under two root causes — the pricing-model mismatch (5 lines) and accent over-use on homepage/services (4 lines) — rather than nine unrelated fixes. Treat Phase 1 as "fix two root causes," not "fix nine items," when estimating.

Everything below ships before DNS cutover. Organised by phase.

### Phase 1 — Brand v0.2 integration

- Strip the three-tier price architecture (Audit €2,500; Build €8,000–22,000+; Retainer €1,500–5,000+/month) from `/diensten`, `/en/services`, and the homepage teaser (NL/EN) — *drift report §7, blocker, M3*. Why it blocks launch: Brandbook §9.2 requires exactly one visible price; shipping three contradicts the core pricing decision the whole team already made.
- Strip all Build and Retainer price references (€450, €1,500, €400 — site copy, metadata, schema) from every surface. Add "Vanaf €89 · Audit Lite · 60 minuten" (NL) / "From €89 · Audit Lite · 60 minutes" (EN) to exactly three surfaces: homepage Final CTA (section 06), /audit-lite (hero + body), /diensten (entry rung as the three-service model's entry point). All other surfaces carry zero price references. Resolves per D8. (NL/EN) — *drift report §7, blocker, M3*. Why it blocks launch: the one price the Brandbook mandates does not exist anywhere in the current build, and Build/Retainer floors must disappear from every other surface per the resolved pricing display policy.
- Rewrite Build/Retainer copy to read exactly "Scoped in conversation" everywhere numeric floors currently appear (NL/EN) — *drift report §7, blocker*. Why it blocks launch: Brandbook requires this exact phrase; numeric floors are explicitly barred from site copy.
- Remove the homepage teaser's condensed price-range repeat ("01/02/03" process block) (NL/EN) — *drift report §7, major*. Why it blocks launch: it's the same pricing-model contradiction surfacing a second time; the main pricing fix isn't complete while this stands.
- Delete the `AsteriskBreak` component and its render on every essay page (NL/EN) — *drift report §3, blocker, M2*. Why it blocks launch: the asterisk is explicitly retired as a brand mark (§3.2); this is the component built specifically to keep using it.
- Remove the literal `✱` from `Footer.tsx` (NL/EN) — *drift report §3, blocker, M2*. Why it blocks launch: a second, independent site-wide usage of the same retired mark — present on every page via the global footer.
- Replace `app/favicon.ico` with a text-only "OTS" favicon in the display face on cream — *drift report §3, major, M2*. Why it blocks launch: Brandbook §3.2 names the favicon explicitly as a mark-deferral surface; an image favicon is drift by the letter of the rule.
- Sweep for Krishna-era brand assets and ex-team names (`ots-mark`, `BrandMark`, `logo.svg/png`, `krishna`, `sneha`) — *drift report §3/§6, verify-only, already clean per grep, M9*. Also correct `README.md`'s "Owners" section, which still lists Krishna (Visual) and Sneha (Copy) as current owners — a stale internal doc, not user-facing, but cheap to fix in the same pass.
- Verify the four former team members are fully removed from code/content — *drift report §6, verify-only, prior removal already committed; confirmed clean, M10*.
- Replace the display font (currently Anton, weight 400 only) with Recoleta Alt self-hosted via `next/font/local`, or the documented Fraunces interim proxy if Recoleta isn't ready — *drift report §2, major (two drift lines, same root cause)*. Why it blocks launch: Anton is neither the locked display face nor the accepted interim exception; it's the single largest typography drift in the build. (Subsumes the "Anton weight 400 only" and "Inter weight 300 extra" minors — both become moot once the font stack is corrected.)
- Remove the internal dev-note `_meta` blocks ("DRAFT — pending Deepak's review…") from `messages/en.json` / `messages/nl.json` before any further Phase 1 content edits build on top of them (NL/EN) — *drift report §5, minor, promoted*. Why it blocks launch: these are internal production notes currently sitting in a shipped, user-facing content file; any Phase 1 copy edit should not be made on top of an unresolved question about what's actually in the bundle.
  `[DECISION NEEDED — Virat]`: Confirm these notes are stripped from the build bundle at build time, or relocate them out of `messages/*.json` entirely (e.g. a `_notes/` doc).
- Reduce accent-color usage on the homepage (37 → 5–8, both locales) and on `/diensten` / `/en/services` (91 → 5–8) to match the Brandbook §4.4 ceiling — *drift report §9, blocker*. Why it blocks launch: both pages are more than double the >15 blocker threshold; this is one of the two root causes behind the entire blocker overrun.
- Bring `/privacybeleid` and `/algemene-voorwaarden` accent counts up from 4 into the 5–8 range (NL) — *drift report §9, major*. Why it blocks launch: opposite-direction drift from the same palette rule; cheap to fix in the same accent-restraint pass as the homepage/services work above.
- Replace the `bg-[#0A0806]` hex literal in `Footer.tsx` and the `mist (#DDE6DA)` comment in `Section.tsx` with real tokens, once the decision below is resolved — *drift report §1, minor, promoted (token hygiene gates the palette-token phase cleanly)*.
  `[DECISION NEEDED — Virat]`: Is `mist` an approved v0.2 token addition, or pure drift to be deleted?
- Fix or remove the site-wide dead `/over-ons` link (Footer + homepage Team section) (NL/EN) — *baseline audit §3, flagged "new item," promoted*. Why it blocks launch: it's a live 404 on every page today, and the About page it points to is decided "Not doing" (Section 4) — so there is no correct destination to leave it pointing at unresolved.
- Strip all founder-presence elements from `/audit-lite` and `/contact`: remove `InitialAvatar` components, founder names (Virat, Ankur, Deepak), roles/titles, and any related layout containers. Pages become text-only. Why it blocks launch: shipping with placeholder monograms contradicts the resolved D7 policy; the site cannot go live mid-state. Resolves per D7.

### Phase 2 — Redesign deltas + homepage consolidation (15 → 7)

- Homepage consolidation to 7 sections per Brandbook §9.1: 01 Hero (cream) · 02 Vertical Cards (cream) · 03 Approach (cream) · 04 Solution (night) · 05 Cases (cream) · 06 Final CTA (night) · 07 Footer (cream). Team section removed from homepage (no destination — site ships founder-free per D7) — *drift report §8, major, M1 (settled — the whole-team redesign-before-launch call already covers adding/removing homepage elements; no evidence the specific 7-section count was excluded)*. Why it blocks launch: this is the named Phase 2 deliverable and the current build renders 8 content sections in the wrong order. RESOLVED 2026-10-15 (Deepak): Brandbook §9.1 stands. Homepage consolidates to 7 sections. Team section removed from homepage (no destination — site ships founder-free per D7).
- Remove `Problem.tsx`, `WhatWeDo.tsx`, `RecentEssays.tsx` as standalone homepage sections and delete Team.tsx component and all its imports/usages (no destination — site ships founder-free per D7), consistent with the consolidation above (NL/EN) — *drift report §8, major (4 lines, one root cause)*. Why it blocks launch: these are literally the extra sections named in the drift report as not present in the target 7.
- Build the missing "Cases" section (one signature case) for the homepage — *drift report §8, major*. Why it blocks launch: the target 7-section layout requires a Cases section; none exists anywhere in `components/sections/` today.
  `[DECISION NEEDED — Virat]`: Does `Verticals.tsx` satisfy target section "02 Vertical Cards" as-is, or does it need rebuilding to match the new homepage spec?
  `[DECISION NEEDED — Virat/Deepak]`: Is `HowWeWork.tsx` meant to become "03 Approach" or "04 Solution (night)" — the two target slots can't both be satisfied by one file, so a third section may be needed either way.
- New `/audit-lite` dedicated route per Brandbook §9.2 — *PRD §A4.1, M4*. Why it blocks launch: Audit Lite is the one product the redesign is built around; it has no dedicated page today.
- Hero re-scale: bring `.type-hero` down from `clamp(56px, 8vw, 128px)` to spec (72–96px desktop, 48–64px mobile) — *drift report §2, major*. Why it blocks launch: this is the explicit Phase 2 "hero re-scale" deliverable, and the current desktop max overshoots spec by 32px.
- Bundle the `.type-h2` clamp fix (currently `clamp(40px, 5vw, 72px)`, target 48–64px desktop / 32–40px mobile) into the same editorial-typography pass as the hero re-scale above (NL/EN) — *drift report §2, minor, bundled*. Why it blocks launch: shipping the hero scale fix without the section-heading scale leaves the type system half-corrected in the same PR.
- Fix Services page night sections: add the new Audit Lite hero as the second night section alongside `FinalCta` (currently only `ServiceLadder` is night) — *drift report §1, major*. Why it blocks launch: the Services page target explicitly requires 2 night sections (Audit Lite hero + Final CTA), and the missing one is literally the route being built in this same phase.

### Phase 3 — Motion layer

- Standardize all `whileInView` section-reveal entrances from 600ms to the canonical 400ms default, across the 8 named files (`Problem`, `WhatWeDo`, `Verticals`, `HowWeWork`, `PageHeader`, `ServiceDeepDive`, `ServiceLadder`, `Team`, `EssayCard`) — *drift report §4, major*. Why it blocks launch: this is the named default entrance duration in the motion vocabulary spec, and every section in the build is currently 200ms over it.
- Fix `Hero.tsx`'s headline reveal from 800ms to the canonical 600ms hero/section-transition duration (800ms is reserved for count-up only) — *drift report §4, major*. Why it blocks launch: it's the most visible animated element on the page, violating an explicit canonical-duration rule.
- Fix `WhatWeDo.tsx`'s card-hover transition to animate only `transform`/`opacity`, dropping `border-color` — *drift report §4, major*. Why it blocks launch: "transform and opacity only" is an explicit rule; any other animated property is named drift.
- Fix `Nav.tsx`'s transition to drop `background-color`, `backdrop-filter`, `border-color`, and `box-shadow`, animating only `transform`/`opacity` — *drift report §4, major*. Why it blocks launch: same property rule, on the component visible on every page at all times.
- Bundle two minor duration fixes into this pass: `WhatWeRefuse.tsx`'s 500ms → a canonical value, and the 350ms link-underline draw (`RecentEssays.tsx`, `WhatWeDo.tsx`) → the spec's 300ms exception — *drift report §4, minor, bundled*. Why it blocks launch: both are non-canonical motion values already being touched by this phase's motion rewrite; fixing them separately later would mean a second motion PR.

---

## 2. Deferred to Phase 4+

Items that move to pre-launch gates. Each needs an owner and a trigger.

| Item | Owner | Trigger to resolve | Source |
|---|---|---|---|
| Dutch lawyer review of `/privacybeleid` and `/algemene-voorwaarden` | Virat (coordinates) · Lawyer (executes) | Lawyer engagement signed | Drift report §7 / PRD §4.1 (M5) |
| Deepak's full Dutch copy pass across all NL strings | Deepak | NL copy export complete (`/docs/nl-copy-review.md`) | PRD §4.2 (M6) |
| Physical address + WhatsApp number in footer/contact | Deepak | Mailbox and SIM confirmed | Baseline audit §7 / PRD §4.3 (M7) |
| EN legal pages (`/en/privacybeleid`, `/en/algemene-voorwaarden`) — currently both 404. `[DECISION NEEDED — Virat/Deepak]`: create EN translations, or stay NL-only by design? | Virat/Deepak (decide scope) → Deepak/Lawyer (execute if approved) | Decision resolved, then included in the Phase 4.1 lawyer engagement | Drift report §7 (EN) |
| Confirm "Sharma" is the correct, approved surname for the essay byline ("Written by Deepak Sharma, Founder at OTS") (NL/EN). `[DECISION NEEDED — Deepak]`: approved surname, or correct it? | Deepak | Resolved as part of the Phase 4.2 NL/EN copy pass | Drift report §6 |

---

## 3. Post-launch only

Items we ship v1 without. Revisit after 5–10 completed client engagements.

- Case study detail pages (`/cases/[slug]`) — one signature case on the new homepage Cases section plus the existing three-essay teaser is enough for v1; a full case-study template is Horizon 2 scope (Brandbook §9.1, M12).

---

## 4. Not doing (until re-opened)

| Item | Rationale | Re-trigger criteria |
|---|---|---|
| About page | Site ships founder-free per D7; an About page would exist to introduce founders not introduced anywhere else, contradicting the stripped-presence policy. (M11) | Deepak commissions portraits **and** two signed clients explicitly request it |
| Newsletter signup | Nothing to sign up for yet — no publication cadence exists (M13) | First Horizon 2 publication cadence |
| Cookie banner | Plausible is cookieless; no legal trigger exists today (M14) | Adding any cookie-dropping third-party tool |
| Live chat widget | Email + Audit Lite booking is the funnel; a chat widget burns Deepak's time without converting better (M15) | Volume > 20 inbound inquiries/week sustained for 4 weeks |
| Footer `bg-[#0A0806]` hex literal cleanup | Not worth tracking as a standalone item: visually correct value, just not sourced from a token. Opportunistic fix if `Footer.tsx` is touched during Phase 1 anyway | Any dedicated hex-literal/token audit of `app`/`components` |
| Homepage night-section naming mismatch (`HowWeWork` not literally named "Solution") | Not worth tracking: count already matches target (2 night sections); naming resolves automatically once Phase 2's homepage consolidation lands with the correct §9.1 section names | Phase 2 homepage work ships without resolving the naming |
| `Anton` weight-400-only / `Inter` weight-300-extra font-loading nuances | Not worth tracking: both become moot the moment the Phase 1 display-font swap (Anton → Recoleta Alt/Fraunces) lands | Font swap is deferred or rolled back after sign-off |
| Founder presence on site (photos, names, roles, avatars) | Current OTS stage carries no marquee reputation for named founders to amplify; faceless, text-only pages ship cleaner and avoid placeholder-feeling monograms | Signed clients explicitly request founder visibility, OR OTS reaches reputation threshold where named founders become a buying signal (Deepak judges) |

---

## 5. Decisions still open

| ID | Question | Who decides | By when |
|---|---|---|---|
| D1 | Is `mist (#DDE6DA)` an approved v0.2 token addition, or pure drift to delete from `Section.tsx`? | Virat | Before Phase 1 palette-token work starts |
| D2 | Does `Verticals.tsx` satisfy target homepage section "02 Vertical Cards" as-is, or does it need rebuilding? | Virat | Before Phase 2 homepage consolidation starts |
| D3 | Is `HowWeWork.tsx` meant to become "03 Approach" or "04 Solution (night)"? The two target slots can't both be satisfied by one file — is a third section missing? | Virat / Deepak | Before Phase 2 homepage consolidation starts |
| D4 | Are the `_meta`-style "DRAFT — pending Deepak's review" dev notes in `messages/en.json`/`nl.json` excluded from the production bundle, or do they need relocating out of the shipped content files? | Virat | Before any Phase 1 copy edit touches `messages/*.json` |
| D5 | Is "Sharma" the correct, approved surname to publish in the essay byline for Deepak? | Deepak | Before the Phase 4.2 NL/EN copy pass executes |
| D6 | Do EN legal pages get created (translated from the NL originals), or does the site stay NL-only for `/privacybeleid` and `/algemene-voorwaarden` by design? | Virat / Deepak | Before the Phase 4.1 lawyer engagement is scoped |
| D7 | Founder presence on site (photographs, names, roles, avatars) | Virat + Deepak | RESOLVED 2026-10-15: No founder presence on the site. No photographs, no InitialAvatar monograms, no names, no roles on /audit-lite, /contact, or anywhere else. Site ships founder-free. Revisit post-launch only if reputation or client requests make faces worth attaching. |
| D8 | Pricing display policy | Virat + Deepak | RESOLVED 2026-10-15: "Vanaf €89 · Audit Lite · 60 minuten" (NL) / "From €89 · Audit Lite · 60 minutes" (EN) appears on three surfaces only: homepage Final CTA (section 06), /audit-lite (hero + body), /diensten (entry rung). Zero price references on any other surface. Build and Retainer remain "in gesprek bepaald" / "scoped in conversation" everywhere. |

---

## 6. Sign-off

- [ ] **Virat** — date: __________ · initials: ____
- [ ] **Deepak** — date: __________ · initials: ____

Phase 1 does not begin until both lines are initialled. Any item added to Phases 1–3 after this sign-off becomes a Decision Log entry (PRD §C3), not a silent addition.
