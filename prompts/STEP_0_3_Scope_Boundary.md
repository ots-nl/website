# STEP 0.3 — Scope Boundary

**Phase**: 0 — Freeze & Audit
**Type**: Documentation only — no code, no Playwright MCP, no npm
**Owner (draft)**: Claude Code, from `/docs/drift-report.md`
**Owner (sign-off)**: Virat + Deepak
**Prerequisites**: Steps 0.1 and 0.2 committed and pushed. `/docs/baseline-audit.md` and `/docs/drift-report.md` exist on `main`.
**Output**: `/docs/scope-boundary.md`
**Estimated time**: Claude Code draft ~15 min · team review ~30–45 min
**Commit after sign-off**: `docs: scope boundary for v0.2 redesign — PRD v2.1 Phase 0`

---

## Goal

Lock the Phase 1–3 scope. Prevent mid-phase creep.

The drift report identified every divergence from Brandbook v0.2. This step decides which drifts we fix before launch, which we defer to pre-launch gates, which we revisit after real client work, and which we're not doing at all. Once signed off, this document is the fence around Phases 1–3. Anything added to that scope after sign-off becomes a Decision Log entry, not a quiet addition.

---

## Context — what you (Claude Code) need to know

You cannot read the PRD or the brandbook. Everything you need to classify drift items is reproduced below. Do not guess at sections not reproduced here.

### Phase layout (used for classification)

- **Phase 1 — Brand v0.2 integration (mechanical)**: palette tokens, typography families, mark deferral (removing the ✱ asterisk), team list cleanup, pricing simplification, vocabulary pass.
- **Phase 2 — Redesign deltas + homepage consolidation (15 → 7)**: hero re-scale, section numerals, cream/night cadence, editorial typography, image treatment, Final CTA, new `/audit-lite` route, homepage section consolidation.
- **Phase 3 — Motion layer**: Framer Motion variants, scroll reveals, two parallax moments per page, reduced-motion fallbacks.
- **Phase 4 — Pre-launch gates (non-redesign)**: Dutch lawyer review of `/privacy` and `/voorwaarden`, Deepak's full Dutch copy pass, physical address + WhatsApp, real founder photographs replacing `InitialAvatar`.
- **Phase 5 — Production deploy**: Vercel production, DNS cutover at TransIP, Plausible/Sentry/Better Stack instrumentation.
- **Phase 6 — Horizon 2**: case study detail pages, newsletter, careers page, additional languages, product-shaped surfaces.

### Brandbook v0.2 anchors (quote-level, for classification only)

- **§3.2** — Mark In Development. The asterisk is retired. No logo until post-launch.
- **§4.1–4.2** — Palette tokens: cream (default surface) + night (signature contrast surface) + a single accent per page, 5–8 accent moments max per page.
- **§5.1–5.3** — Typography: Recoleta Alt as display face (self-hosted via `next/font/local`), body stack 16–18px / line-height 1.6, mono/label 11–12px uppercase 0.08–0.18em letter-spacing.
- **§7.1–7.3** — Motion vocabulary: two easing curves total (`cubic-bezier(0.22,1,0.36,1)` entrance, `cubic-bezier(0.4,0,0.2,1)` exit), 80–120ms stagger, exactly two parallax moments per page (hero image + one mid-page), never on text.
- **§9.1** — Homepage: 7 sections, in this order — **01 Hero (cream) · 02 Vertical Cards (cream) · 03 Approach (cream) · 04 Solution (night) · 05 Cases (cream) · 06 Final CTA (night) · 07 Footer (cream)**. Team moves off homepage to `/audit-lite` and `/contact`.
- **§9.2** — Pricing: **€89 Audit Lite is the one visible price on the site.** Build and Retainer are "scoped in conversation" everywhere; internal floors (€1,500 / €400 per month) are sales-only and never on the site. Audit Lite is "a one-hour look at what's costing you hours" — 60-minute call, 3-page diagnostic, one-week delivery.

### Pre-existing team decisions (settled — do not re-open in this step)

- The redesign ships before launch (whole-team call).
- Recoleta Alt is the locked display face.
- Direction 2 (independent studio) leads, Direction 1 (editorial magazine) supports — Instrument-lean specifically.
- Motion follows the Dotwise/Sansbro reference reel (Version A), not animated dashboard mockups (Version B rejected).
- Pricing stripped to "€89 Audit Lite only" during portfolio phase.
- Mark/logo deferred to post-launch.
- About page dropped; four former team members already removed.
- `InitialAvatar` placeholders stand in for founder photographs.
- Visual-layer ownership is Virat (code) + Deepak (buyer-fit) jointly, replacing Krishna's former sole ownership.

### What this site does NOT have (from PRD A4.4 — reproduced so you don't re-propose them)

No About page · no careers page in Phase 1 · no pricing calculator · no live chat widget · no newsletter signup in Phase 1 · no cookie banner (Plausible is cookieless) · no case study detail pages in Phase 1 · no Team section on homepage.

---

## Spec

Create `/docs/scope-boundary.md` with the structure below. Markdown only. Honest, direct, minimal.

### Section skeleton

1. **Header** — title, status (`DRAFT — pending Virat + Deepak sign-off`), author, date, supersedes field.
2. **1. In scope — Phase 1–3** — split into Phase 1 / Phase 2 / Phase 3 sub-headings. Every item has a one-line *why it blocks launch*.
3. **2. Deferred to Phase 4+** — table with columns: Item · Owner · Trigger to resolve · Source (drift ID or PRD section).
4. **3. Post-launch only** — bullet list. Each with a one-line *why not v1*.
5. **4. Not doing (until re-opened)** — table with columns: Item · Rationale · Re-trigger criteria.
6. **5. Decisions still open** — table with columns: ID · Question · Who decides · By when. Every `[DECISION NEEDED]` marker from your draft lands here as well.
7. **6. Sign-off** — two checkbox lines: Virat (date, initials) · Deepak (date, initials). One line below: *Phase 1 does not begin until both lines are initialled.*

### Classification rules

- **Every blocker from `/docs/drift-report.md` → Section 1 (In scope).** Non-negotiable per Phase 0 acceptance criteria. If a drift blocker genuinely does not fit Phase 1–3, flag it `[DECISION NEEDED — Virat]` rather than quietly deferring it.
- **Majors**: default to Section 1 if achievable within Phase 1–3 boundaries. Push to Section 2 (Phase 4+) only with an explicit reason in the row.
- **Minors**: default to Section 3 (Post-launch) or Section 4 (Not doing). Only promote to Section 1 if a blocker depends on them.
- **Items that are pre-launch gates by nature** (legal review, Dutch copy pass, physical address, WhatsApp, real photographs) → Section 2, regardless of severity.
- **NL and EN audited separately in Step 0.2**: carry that locale split through. Any item that is NL-only or EN-only must be tagged `(NL)` or `(EN)` in-line.

### Mandatory items to classify explicitly

Even if the drift report missed them, each of these must appear in exactly one section:

| # | Item | Default placement | Decision marker |
|---|---|---|---|
| M1 | Homepage consolidation 15 → 7 sections per Brandbook §9.1 | Section 1 — Phase 2 | Flag `[DECISION NEEDED — Virat/Deepak]` **only if** the team call that approved "adding/removing elements before launch" did not cover the specific 15 → 7 count. Otherwise treat as settled. |
| M2 | Asterisk/mark retirement everywhere in repo (incl. `.ots-mark` class, SVG, favicon references) | Section 1 — Phase 1 | — |
| M3 | Pricing simplification to €89 Audit Lite only visible on site | Section 1 — Phase 1 | — |
| M4 | New `/audit-lite` dedicated route (Brandbook §9.2) | Section 1 — Phase 2 | — |
| M5 | Dutch lawyer review of `/privacy` and `/voorwaarden` | Section 2 — Phase 4.1 | — |
| M6 | Deepak's full Dutch copy pass across all NL strings | Section 2 — Phase 4.2 | — |
| M7 | Physical address + WhatsApp number | Section 2 — Phase 4.3 | — |
| M8 | Real founder photographs replacing `InitialAvatar` | Section 3 (Post-launch) | Flag `[DECISION NEEDED — Deepak]`: commission during Phase 2.4 image track and promote to Phase 4, or ship v1 with `InitialAvatar`? |
| M9 | Krishna-era brand assets anywhere in repo (sweep) | Section 1 — Phase 1.3 | — |
| M10 | Four former team members in code/content | Section 1 — Phase 1.4 (verify-only; prior removal already committed) | — |
| M11 | About page | Section 4 — Not doing | Rationale: founder portraits not commissioned; founder context lives on `/audit-lite` and `/contact` per §9.1. |
| M12 | Case study detail pages (`/cases/[slug]`) | Section 3 — Post-launch | One signature case + three Essays teaser on homepage is enough for v1. |
| M13 | Newsletter signup | Section 4 — Not doing | Rationale: no newsletter yet; nothing to sign up for. Re-trigger: first Horizon 2 publication cadence. |
| M14 | Cookie banner | Section 4 — Not doing | Rationale: Plausible is cookieless; no legal trigger. Re-trigger: adding any cookie-dropping tool. |
| M15 | Live chat widget | Section 4 — Not doing | Rationale: email + Audit Lite booking is the funnel; a chat widget burns Deepak's time without converting better. |

### Flagging decisions

Where a reasonable person could disagree, mark the row inline:

```
[DECISION NEEDED — <who>]: <one-line question>
```

Example:

```
- Strip €450, €1,500, €400 price references from site copy, metadata, and schema.
  [DECISION NEEDED — Virat]: Also delete internal `content/pricing.ts` floor fields, or keep as sales-only reference for the repricing phase?
```

Do **not** resolve `[DECISION NEEDED]` markers yourself. Mirror every marker into Section 5 so Virat and Deepak have one place to work through them.

---

## Pre-work (do these in order before drafting)

1. `cat docs/drift-report.md` — if missing, STOP and tell Virat: *"Step 0.2 is not committed. Cannot proceed."*
2. `cat docs/baseline-audit.md` — use the screenshot inventory to sanity-check that the drift report caught every section visible on the current homepage.
3. `cat README.md` and `ls prompts/` — scan for build decisions that override drift report severities (e.g. four former team members already removed means that item is "verify", not "blocker").
4. Count blockers in the drift report. If count > 5, note in your draft that Phase 1 may need re-scoping (per Phase 0 acceptance rule in the PRD).

Do **not**:
- Open the brandbook HTML or the PRD files — not in your context.
- Guess at brandbook sections not reproduced above.
- Touch `app/`, `components/`, `content/`, or any production code.
- Install anything or run the dev server.

---

## Draft template (fill in — do not ship empty sections)

```markdown
# Scope Boundary — Brand v0.2 Redesign

**Status**: DRAFT — pending Virat + Deepak sign-off
**Author**: Virat (drafted via Claude Code, PRD v2.1 Phase 0 Step 0.3)
**Date**: <YYYY-MM-DD>
**Supersedes**: n/a — first scope boundary for v0.2

Phase 1 does not begin until Section 6 is initialled by both Virat and Deepak.

---

## 1. In scope — Phase 1–3

Everything in this list ships before DNS cutover. Organised by phase.

### Phase 1 — Brand v0.2 integration

- <drift item> — <file reference> — *why it blocks launch*
- ...

### Phase 2 — Redesign deltas + homepage consolidation (15 → 7)

- Homepage consolidation to 7 sections per Brandbook §9.1: 01 Hero (cream) · 02 Vertical Cards (cream) · 03 Approach (cream) · 04 Solution (night) · 05 Cases (cream) · 06 Final CTA (night) · 07 Footer (cream). Team section moves off homepage to `/audit-lite` and `/contact`.
- New `/audit-lite` dedicated route.
- ...

### Phase 3 — Motion layer

- ...

---

## 2. Deferred to Phase 4+

Items that move to pre-launch gates. Each needs an owner and a trigger.

| Item | Owner | Trigger to resolve | Source |
|---|---|---|---|
| Dutch lawyer review of `/privacy` and `/voorwaarden` | Virat (coordinates) · Lawyer (executes) | Lawyer engagement signed | Drift report / PRD §4.1 |
| Deepak's full Dutch copy pass | Deepak | NL copy export complete (`/docs/nl-copy-review.md`) | PRD §4.2 |
| Physical address + WhatsApp number | Deepak | Mailbox and SIM confirmed | PRD §4.3 |
| ... | | | |

---

## 3. Post-launch only

Items we ship v1 without. Revisit after 5–10 completed client engagements.

- Case study detail pages (`/cases/[slug]`) — one signature case on homepage + three Essays teaser is enough for v1 (Brandbook §9.1).
- Real founder photographs replacing `InitialAvatar` — see decision D<n> in Section 5.
- ...

---

## 4. Not doing (until re-opened)

| Item | Rationale | Re-trigger criteria |
|---|---|---|
| About page | Founder portraits not commissioned; founder context lives on `/audit-lite` and `/contact` per §9.1 | Deepak commissions portraits **and** two signed clients explicitly request it |
| Newsletter signup | Nothing to sign up for yet | First Horizon 2 publication cadence |
| Cookie banner | Plausible is cookieless; no legal trigger | Adding any cookie-dropping third-party tool |
| Live chat widget | Burns Deepak's time without converting better than email + Audit Lite booking | Volume > 20 inbound inquiries/week sustained for 4 weeks |
| ... (minimum five rows) | | |

---

## 5. Decisions still open

| ID | Question | Who decides | By when |
|---|---|---|---|
| D1 | <mirror of each [DECISION NEEDED] marker in Sections 1–4> | Virat / Deepak / both | Before Phase 1.1 starts |
| ... | | | |

---

## 6. Sign-off

- [ ] **Virat** — date: __________ · initials: ____
- [ ] **Deepak** — date: __________ · initials: ____

Phase 1 does not begin until both lines are initialled. Any item added to Phases 1–3 after this sign-off becomes a Decision Log entry (PRD §C3), not a silent addition.
```

Fill every section. Do not leave `...` placeholders in the final draft. If a section is genuinely empty (e.g. no items go to Post-launch), write: *"No items. See decision D<n>."* rather than ship an empty header.

---

## Acceptance tests (self-check before telling Virat you're done)

- [ ] Every blocker from `/docs/drift-report.md` appears in Section 1. Grep the drift report for `blocker` and cross-check the count against Section 1 blocker-sourced items.
- [ ] Every major from the drift report appears somewhere in Sections 1–3 (not dropped).
- [ ] Section 1 is organised by Phase 1 / Phase 2 / Phase 3 sub-headings.
- [ ] Every Section 1 item carries a one-line *why it blocks launch*.
- [ ] Section 2 ("Deferred to Phase 4+") has an owner **and** a trigger for every row.
- [ ] Section 3 ("Post-launch") has a one-line reason per item.
- [ ] Section 4 ("Not doing") has at least five rows. An empty "Not doing" list means scope has not actually been constrained.
- [ ] Every Section 4 row has a rationale **and** a re-trigger criterion.
- [ ] Section 5 mirrors every `[DECISION NEEDED]` marker from Sections 1–4 — one row per marker, no orphans.
- [ ] Mandatory items M1–M15 above are each placed in exactly one section.
- [ ] NL-only or EN-only items are tagged `(NL)` or `(EN)`.
- [ ] File is at `/docs/scope-boundary.md` — not `/scope-boundary.md`, not `/docs/scope.md`.
- [ ] File ends with the Sign-off block, unchecked. Do not pre-tick.

---

## Common failures

- **"Everything is in scope."** You read "in scope" as "we care about this". It means **blocks DNS cutover**. If an item does not block launch, it belongs in Section 2, 3, or 4.
- **"Not doing" list empty.** The point of this document is to say no out loud. If you cannot find five items to kill, re-read the "What this site does NOT have" list in the context block above and the Horizon 2 markers in Phase 6.
- **Silently resolving `[DECISION NEEDED]`.** If you can't pick between two reasonable placements, flag it. Don't guess and move on.
- **Dropping minors into the void.** Minors go to Section 3 (Post-launch) or Section 4 (Not doing). If a minor is truly not worth tracking, say so in Section 4 with rationale *"not worth tracking: <reason>"* — do not just omit it.
- **Blockers > 5.** Phase 0 acceptance in the PRD says Phase 1 should be re-scoped if blockers exceed five. If the drift report has more than five blockers, add a short note at the top of Section 1: *"Blocker count = N. Phase 1 may require re-scoping per PRD Phase 0 acceptance."*
- **Treating M1 (homepage 15 → 7) as unresolved.** The team already called the redesign-before-launch decision, which covered adding/removing elements. Default this to Section 1 Phase 2. Only flag `[DECISION NEEDED]` if the specific 7-section target was never named in the team call — in which case Virat will tell you.

---

## DO NOT

- **Do not commit.** This is a human-review step. Virat and Deepak read the draft, resolve `[DECISION NEEDED]` markers, initial Section 6, then Virat commits.
- Do not run any code, start the dev server, or touch `app/`, `components/`, `content/`, or `prompts/`.
- Do not open the brandbook HTML or the PRD markdown — the context block above is what you have.
- Do not pre-tick the sign-off checkboxes.
- Do not fill in bracketed placeholders you cannot resolve from the drift report. Leave them as `[DECISION NEEDED]`.
- Do not reword drift report items beyond what's needed to classify them — the drift report wording is the source of truth for what's wrong.

---

## After sign-off (Virat executes, not Claude Code)

Once Virat and Deepak have both initialled Section 6:

```bash
git add docs/scope-boundary.md
git commit -m "docs: scope boundary for v0.2 redesign — PRD v2.1 Phase 0"
git push origin main
```

Phase 0 is complete when all three documents (`baseline-audit.md`, `drift-report.md`, `scope-boundary.md`) are committed on `main` and the `pre-v0.2-baseline` tag is live on GitHub.

---

## What comes next

Open a new chat in the OTS project and say:

> **"Step 0.3 signed off and committed. Give me Step 1.1."**

Step 1.1 — **Palette tokens (Brandbook §4.1–4.2)**. First step in the v2.1 build that writes code. Cream + night + accent tokens into `app/globals.css` `@theme` block, replacing current drifted values.

---

**Step 0.3 · Scope Boundary · PRD v2.1 Phase 0**
*Behind every smooth business is a better system.*
