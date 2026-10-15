# STEP 0.2 — Drift Report

**Project:** Ontwikkeling Tech Services — Marketing Website
**Phase:** 0 — Freeze & Audit
**Type:** Claude Code prompt — **READ-ONLY audit pass. No code changes.**
**Prerequisite:** Step 0.1 complete. `pre-v0.2-baseline` tag pushed. `/docs/baseline-audit.md` committed on `main`.
**Deliverable:** `/docs/drift-report.md`
**Commit message (exact):** `docs: drift report — PRD v2.1 Phase 0`

---

## 1. Hard rules for this step

1. **Read-only.** You do **not** change a single line of application code, config, copy, or asset. If you catch yourself about to "quickly fix" something — stop and log it as a drift line instead. Every finding goes into the report, nothing gets patched.
2. **Self-contained.** Everything you need to audit against — palette tokens, typography families, motion specs, vocabulary blacklist, founder list, pricing policy, section target — is reproduced in Section 4 of this prompt. Do not look for a PRD file; it is not in the repo.
3. **Hard-stop on ambiguity.** If a Brandbook spec in Section 4 is unclear, or a file you expected is missing, write "AMBIGUOUS — flagged for Virat" as the drift line and move on. Do not guess.
4. **NL and EN audited separately.** The site serves Dutch at `/` and English at `/en`. Every page gets both locales audited; locale is a column on each line item.
5. **Severities are rationed.** See Section 6. "Everything is a blocker" is a failure mode; re-read criteria if blockers exceed 5.
6. **No new dependencies, no network fetches to third-party services, no AI-generated imagery.** Playwright MCP running against local dev is the only external tool.

---

## 2. Pre-flight

Run these in order. If any fails, stop and report before continuing.

```bash
# Working tree clean on main
git checkout main
git pull origin main
git status
# Expect: "nothing to commit, working tree clean"

# Baseline tag present
git tag -l pre-v0.2-baseline
# Expect: pre-v0.2-baseline

# Baseline audit committed
ls docs/baseline-audit.md
# Expect: file exists

# Node + deps
node --version   # expect v20.x
npm --version    # expect 10.x
```

**Windows only** (Reason Cybersecurity friction):
```powershell
npm config set maxsockets 3
Get-NetTCPConnection -LocalPort 3000 -ErrorAction SilentlyContinue
# If any process is bound to :3000, stop it before running `npm run dev`
```

Install only if `node_modules` is missing:
```bash
npm install
```

Boot the dev server in one terminal and leave it running for Playwright MCP:
```bash
npm run dev
# expect http://localhost:3000
```

---

## 3. What you are auditing

Nine categories, in this order. Each gets at least two line items in the report — more if drift is real. The goal is **≥25 total line items across the full report**, roughly balanced across categories, not 25 in one category.

| # | Category | Compare against |
|---|---|---|
| 1 | Palette tokens | Brandbook §4.1–4.2 (Section 4.1 below) |
| 2 | Typography families | Brandbook §5.1–5.3 (Section 4.2 below) |
| 3 | Mark / logo / asterisk references | Brandbook §3.2 (Section 4.3 below) |
| 4 | Motion variants | Brandbook §7.1–7.3 (Section 4.4 below) |
| 5 | Copy vocabulary (sample 5 sections) | Brandbook §2.3 blacklist (Section 4.5 below) |
| 6 | Team names and avatars | Current founder list (Section 4.6 below) |
| 7 | Pricing display | Brandbook §9.2 (Section 4.7 below) |
| 8 | Homepage section count | Brandbook §9.1 target of 7 (Section 4.8 below) |
| 9 | Accent-per-page count | Brandbook §4.4 range of 5–8 (Section 4.9 below) |

Pages in scope (all pages, both locales):

```
NL                EN
/                 /en
/diensten         /en/services
/essays           /en/essays
/essays/[slug]    /en/essays/[slug]      (sample two essays)
/contact          /en/contact
/privacy          /en/privacy
/voorwaarden      /en/terms
404               404
```

The `/audit-lite` dedicated page does **not** yet exist in v1.1 build. Do not flag its absence here — scope-boundary (Step 0.3) handles that.

---

## 4. Brandbook v0.2 truth — reproduce verbatim in audit

### 4.1 Palette (§4.1–4.2)

**Primary — these are the brand.**

| Token | Hex | Rule |
|---|---|---|
| `--cream` | `#FAF6EE` | Primary surface. 80%+ of every surface. Cream, never white. |
| `--ink` | `#141210` | Primary text. Warm ink, never pure black (`#000`). |
| `--accent` | `#E85A1C` | Single accent. Section markers, links, CTAs, numeric callouts. |

**Extended — for depth, not variation.**

| Token | Hex | Role |
|---|---|---|
| `--cream-deep` | `#F2EBDA` | Subtle section separation, card backgrounds |
| `--ink-soft` | `#2C2822` | Secondary text, metadata labels |
| `--muted` | `#8A7F6E` | Captions, timestamps, mono labels |
| `--accent-deep` | `#B8420E` | Accent on hover / pressed |
| `--accent-tint` | `#FBE6D8` | Accent background washes, callouts |
| `--night` | `#0E0B08` | Deep warm black. 2 sections per page only. |

**Rules to audit:**
- Tokens live in `app/globals.css` under `@theme`.
- **No hex literals anywhere outside `app/globals.css`.** Grep for them.
- No pure `#000` or `#FFF` anywhere — ink is warm, surface is cream.
- Night sections: exactly 2 per major page. Homepage target: Solution section + Final CTA. Services page target: Audit Lite hero + Final CTA. (v1.1 build will not yet match this — flag whatever it does.)

### 4.2 Typography (§5.1–5.3)

**Three faces. Each has one job. No others, ever.**

| Face | Role | Weights | Notes |
|---|---|---|---|
| Recoleta Alt (Latinotype) | Display | 900 Black, 700 Bold | Headlines, section titles, section numerals. Display only — never body, never captions, never buttons. |
| Cormorant Garamond | Accent italic | 500 italic | One accent word per page or section. Signature device, not an emphasis toggle. |
| Inter | Body + mono | 400 / 500 / 600 | Body 16–18px, line-height 1.6. Mono labels 11–12px uppercase, letter-spacing 0.08–0.18em. |

**License reality:** Recoleta Alt purchase is pending. The current build may use **Fraunces (Google Fonts) as the proxy** via `next/font/google`. Fraunces is a legitimate placeholder; log it as a known temporary (severity: minor) with the launch-blocker flag on Section C1 of the PRD — it is **not** a blocker for Phase 0.

**Rules to audit:**
- No fourth font family present. Grep `font-family` and `next/font` imports.
- Recoleta Alt or Fraunces as display, Cormorant Garamond as accent italic, Inter as body. Any other face is drift.
- Hero scale 72–96px desktop, 48–64px mobile. Section headings 48–64px desktop, 32–40px mobile. Flag out-of-range values.
- Sentence case for headlines. Flag Title Case headings.

### 4.3 Mark / logo / asterisk (§3.2)

**Status: deferred.** No graphical mark exists for Phase 1 launch. The brand speaks through typography alone.

**Rules to audit — all drift:**
- Any `<Image>` or `<img>` of a logo, mark, or wordmark SVG.
- Any `.ots-mark` CSS class, `OtsMark` React component, or `BrandMark` component rendering a graphic.
- Any `✱` asterisk-as-brand usage. (The asterisk is retired. If it appears as literal punctuation inside quoted copy, that is fine; as a brand mark anywhere — nav, favicon, OG image, hero flourish — that is drift.)
- Favicon must be text-only "OTS" in display face on cream. Any image favicon is drift.
- Nav and footer wordmark lockups must be text-only.

Grep targets (non-exhaustive): `ots-mark`, `OtsMark`, `BrandMark`, `logo.svg`, `wordmark`, `✱`, `favicon.ico` content check.

### 4.4 Motion vocabulary (§7.1–7.3)

**Easing — two curves, forever.**
- Entrances: `cubic-bezier(0.22, 1, 0.36, 1)`
- Exits + micro-interactions: `cubic-bezier(0.4, 0, 0.2, 1)`
- No bounces, elastics, overshoot.

**Durations — four values, nothing longer than 800ms.**
- 200ms — hover, micro
- 400ms — entrances, section reveals (the default)
- 600ms — hero, section transitions
- 800ms — count-up only

**Stagger — 80–120ms between elements in a sequence.**

**Entrance patterns — four, no more.**
1. Fade-up: opacity 0→1, translateY 12px→0. Default.
2. Fade-in: opacity 0→1 only. Backgrounds, static images.
3. Scale-and-fade: opacity 0→1, scale 0.96→1. Italic accent word + one signature element per page.
4. Count-up: numeric interpolation. Stats only.

**Hover & scroll (§7.3).**
- Buttons: lift 2px, shadow deepens, colour shifts (200ms)
- Links: underline draws from left (300ms — explicit exception to the four-duration list; log as drift if any other link animation duration appears)
- Image cards: scale to 1.02, subtle crop shift (400ms)
- Parallax: exactly two moments per page — hero image at 0.3× scroll + one mid-page photograph. Never on text.
- `useReducedMotion` guard present in every animated component.

**Properties:** `transform` and `opacity` only. Any `width`, `height`, `top`, `left`, `margin` animations in Framer Motion variants are drift.

Grep targets: `cubic-bezier`, `duration`, `useReducedMotion`, `whileInView`, `transition=`.

### 4.5 Vocabulary blacklist (§2.3)

Sample **five sections** (your choice, but include at least: Hero, one Vertical card, one Essay body, Pricing/CTA copy, and Footer). For each, scan for these words. Each hit is one drift line.

**Blacklist:** leverage · unlock · empower · seamless · transformative · cutting-edge · next-generation · world-class · disruptive · supercharge · ecosystem (most uses) · solutions (as a category noun)

**Punctuation rules — also drift:**
- Exclamation marks outside quoted dialogue
- Em-dashes replacing a finished sentence
- Title Case headlines (sentence case only)

**Also flag any variant appearing in both NL and EN** (`seamless` → `naadloze`; `unlock` → `ontgrendel`; `empower` → `empoweren`). The Dutch forms are drift too.

### 4.6 Current founder list

**On-site as of this redesign:** Virat · Ankur · Deepak · Manas.

Any other person — Krishna, Sneha, or anyone else — appearing in a team section, avatar, byline, or metadata is drift. Specifically audit:
- Homepage Team section (if it still exists)
- Essays bylines (three essays live)
- Any "About" references (About page should be absent; flag if it still routes)
- Footer or contact page team mentions
- Image alt text and avatar `src` filenames

Current state uses `<InitialAvatar>` placeholders rather than photographs — that is accepted drift (log once as minor, do not line-item per section).

### 4.7 Pricing display (§9.2)

**One fixed price on the site. One only: Audit Lite — €89 — fixed, nothing recurs.**

- Audit Lite €89 may appear on: Homepage Final CTA, Services page as the entry rung, and (future) `/audit-lite`. Nowhere else.
- Build engagement — copy must read exactly "Scoped in conversation." No floor, no "starting from", no "from €X".
- Retainer — same: "Scoped in conversation." No floor.
- **`starting from €89`, `vanaf €89`, `from €89` as a decorative badge is drift** (even though Step 0.1-era interim copy may use it — flag it).
- Any other price number (€1,500 Build floor, €400/month Retainer floor) appearing anywhere user-facing is **blocker-severity** drift. These are sales-internal only.

Grep targets: `€`, `EUR`, `vanaf`, `from `, `starting`, `price`, `prijs`.

### 4.8 Homepage section count (§9.1)

**Target: 7 sections, in order:** Hero · Vertical Cards · Approach · Solution (night) · Cases · Final CTA (night) · Footer.

**Current built state: 15 sections.** The gap IS the drift. Line-item each extra section the current build renders (Problem, What We Do, How We Work, Verticals, Case, Essays, Team, Refuse, Pricing, FAQ, Stats, Trust, etc.). One line per section file in `components/sections/` that is not in the target 7.

Do **not** fix anything. Step 2.8 does the consolidation.

### 4.9 Accent-per-page count (§4.4)

**Target: 5–8 orange appearances per page.** More than 8 = decoration. Fewer than 5 = signature lost at thumbnail scale.

For each page in scope (NL and EN), **count orange appearances** using Playwright MCP:
1. Navigate to the page.
2. Extract computed `color` and `background-color` of every element.
3. Count elements whose computed colour resolves to `#E85A1C`, `#B8420E`, or `#FBE6D8` (accent / accent-deep / accent-tint).
4. Record the count per page.

Record one line per page per locale (so 8 pages × 2 locales = up to 16 lines in this category alone — that is fine, this is a quantitative audit).

**Scoring:**
- Count in 5–8 range → one line with severity `ok` and the number
- Count outside range → one line with severity `major` (if 0–4 or 9–12) or `blocker` (if 0 on homepage, or >15 anywhere)

---

## 5. Audit methodology — step by step

Work the categories in order. For each, do code inspection first, then Playwright MCP on the running site. Save screenshots to `docs/drift-screenshots/` using filenames like `01-palette-globals-css.png`, `03-mark-nav-header.png`, `09-accent-count-homepage-nl.png`.

### 5.1 Static code sweeps (no browser)

```bash
# Category 1 — hex literals outside globals.css
grep -rnE "#[0-9a-fA-F]{3,6}\b" app components lib --include="*.ts" --include="*.tsx" --include="*.css" | grep -v "app/globals.css"

# Category 2 — font-family declarations and font imports
grep -rnE "font-family|next/font" app components lib --include="*.ts" --include="*.tsx" --include="*.css"

# Category 3 — mark / logo / asterisk references
grep -rnE "ots-mark|OtsMark|BrandMark|wordmark|logo\.svg|logo\.png" app components lib public --include="*.ts" --include="*.tsx" --include="*.css"
grep -rn "✱" app components lib public messages --include="*.ts" --include="*.tsx" --include="*.json"

# Category 4 — motion specs
grep -rnE "cubic-bezier|useReducedMotion|whileInView|duration:" components --include="*.tsx"

# Category 5 — vocabulary blacklist (English)
grep -rniE "\b(leverage|unlock|empower|seamless|transformative|cutting-edge|next-generation|world-class|disruptive|supercharge)\b" messages app components --include="*.ts" --include="*.tsx" --include="*.json" --include="*.md" --include="*.mdx"

# Category 5 — vocabulary blacklist (Dutch common forms)
grep -rniE "\b(ontgrendel|naadloz|empoweren|baanbrekend|wereldklasse)\b" messages app components --include="*.ts" --include="*.tsx" --include="*.json" --include="*.md" --include="*.mdx"

# Category 6 — ex-team names
grep -rniE "\b(krishna|sneha)\b" app components public messages --include="*.ts" --include="*.tsx" --include="*.json" --include="*.md" --include="*.mdx"

# Category 7 — pricing floors and "from" phrasing
grep -rnE "€|EUR|vanaf|starting|\\bfrom \\€" messages app components --include="*.ts" --include="*.tsx" --include="*.json" --include="*.md" --include="*.mdx"

# Category 8 — homepage section files
ls -1 components/sections/
```

Record raw hit counts per sweep in a scratch file; promote the real drift lines into the report. A grep hit inside `app/globals.css` for category 1 is **not** drift. A hit in a Framer variant file for category 4 might be.

### 5.2 Playwright MCP browser sweep

Use the Playwright MCP server already configured via `.mcp.json`. For each page × locale:

1. Navigate to `http://localhost:3000{path}`.
2. Screenshot full page, save to `docs/drift-screenshots/{path-slug}-{locale}.png`.
3. Capture console errors and warnings.
4. For accent counting (Category 9), evaluate in the page context:
   ```js
   const all = Array.from(document.querySelectorAll('*'));
   const target = new Set(['rgb(232, 90, 28)', 'rgb(184, 66, 14)', 'rgb(251, 230, 216)']);
   const hits = all.filter(el => {
     const s = getComputedStyle(el);
     return target.has(s.color) || target.has(s.backgroundColor) || target.has(s.borderColor);
   });
   return { url: location.href, accentHits: hits.length };
   ```
5. For mark detection (Category 3), check `<link rel="icon">` href resolves to a text favicon not an image mark.

The browser pass is strictly read. Do not interact with forms. Do not submit anything.

---

## 6. Severity rubric

Assign one of four severities per line item. Count totals at the end.

| Severity | Definition | Examples |
|---|---|---|
| `blocker` | Brand integrity failure visible to any informed buyer; cannot ship. Pricing shown that must not appear, ex-team member visible, graphical mark present where none exists, wrong primary colour. | Build floor €1,500 shown on homepage. Krishna's name in a byline. `#000` as body text. |
| `major` | Visible drift that an informed viewer notices; must fix in Phase 1 or 2. | Accent count of 3 on a page. Title Case headline. One blacklist word in Hero copy. Section 02 renders in wrong order. |
| `minor` | Hygiene / polish; fix opportunistically. Does not block launch alone, but twenty of these together do. | Hex literal in a rarely-rendered component. Section numeral uses `--ink-soft` instead of `--accent`. Fraunces proxy still in use (one line, not per-page). |
| `ok` | Audited and conforming. Only used for the quantitative accent-count category to record pages that pass. | Homepage NL accent count = 6. |

**Hard rule from PRD:** **blockers ≤ 5.** If your audit produces more than 5 blockers, you have misapplied the rubric. Re-read definitions and re-grade — "visible drift" is `major`, not `blocker`. If after honest re-grading you still exceed 5 blockers, write a one-paragraph note at the top of the report titled **"Blocker Overrun — Phase 1 re-scope required"**, do not force items down to `major`.

---

## 7. Output format — `/docs/drift-report.md`

Create the file at `docs/drift-report.md` with this exact structure. Do not reflow or decorate.

```markdown
# OTS Website — Drift Report (Brandbook v0.2)

**PRD:** v2.1
**Phase:** 0 — Freeze & Audit, Step 0.2
**Baseline:** `pre-v0.2-baseline` tag at commit `<HASH>`
**Date:** YYYY-MM-DD
**Auditor:** Claude Code (automated pass)

## Summary

| Severity | Count |
|---|---|
| Blocker | X |
| Major | X |
| Minor | X |
| OK (accent count) | X |
| **Total line items** | **X** |

Blocker list (if >0):
- <blocker 1 — one line each>

## 1. Palette (§4.1–4.2)

| File | What's there | What Brandbook v0.2 says | Locale | Severity |
|---|---|---|---|---|
| ... | ... | ... | NL / EN / N/A | blocker / major / minor |

## 2. Typography (§5.1–5.3)
<same table>

## 3. Mark / logo / asterisk (§3.2)
<same table>

## 4. Motion vocabulary (§7.1–7.3)
<same table>

## 5. Copy vocabulary (§2.3) — sampled sections

Sections sampled: Hero · <vertical card> · <essay body> · Pricing/CTA · Footer.

<same table — one line per blacklist hit, locale column indicates NL or EN>

## 6. Team names and avatars

<same table>

## 7. Pricing display (§9.2)
<same table>

## 8. Homepage section count (§9.1)

Target: 7. Current: <N>. Delta: <N − 7> sections to consolidate in Step 2.8.

<one line per non-target section file in components/sections/>

## 9. Accent-per-page count (§4.4)

Target: 5–8 per page.

| Page | Locale | Accent count | Severity |
|---|---|---|---|
| / | NL | 6 | ok |
| /en | EN | 3 | major |
| ... | ... | ... | ... |

## Appendix A — Grep raw outputs

<verbatim grep output per sweep from Section 5.1, inside ```fenced``` blocks>

## Appendix B — Screenshot index

- `01-palette-globals-css.png` — ...
- `03-mark-nav-header.png` — ...
- ...
```

Keep lines terse. The "What's there" column names the exact token / string / component / file and line number where useful. The "What Brandbook v0.2 says" column quotes the Section 4 spec in half a sentence — do not paste the whole spec.

---

## 8. Acceptance tests

Before you commit, verify:

- [ ] `/docs/drift-report.md` exists on `main`
- [ ] Total line items ≥ 25 (across all categories combined, excluding Appendix content)
- [ ] All nine categories have at least one line item (or an explicit "no drift found — audited" line if genuinely clean)
- [ ] Every line item has a severity in {blocker, major, minor, ok}
- [ ] Blocker count ≤ 5, OR a "Blocker Overrun" note is present at the top
- [ ] NL and EN audited for Categories 5, 7, 8, 9 (locale column populated)
- [ ] `docs/drift-screenshots/` folder exists with at least one screenshot per audited page × locale
- [ ] No application code or copy changed. Confirm with:
  ```bash
  git status
  # Expect: only docs/drift-report.md and docs/drift-screenshots/* staged
  git diff --stat --cached -- ':!docs'
  # Expect: empty output
  ```
- [ ] No new npm dependencies installed. `package.json` and `package-lock.json` unchanged.

If any acceptance test fails, do not commit. Fix the audit, not the code.

---

## 9. Common failures to avoid

- **"Everything is a blocker."** Re-read Section 6. A minor hex literal in a component is `minor`. A pricing floor shown on homepage is `blocker`. The two are not the same category.
- **Missing EN locale audit.** Dutch is default, English is served under `/en`. Both need the Playwright pass for Categories 5, 7, 8, 9. Dutch-only audit = incomplete.
- **"Fixing" drift during the audit.** If you catch a typo or a `#000` and fix it, you have failed the step. Log and move on.
- **Line items that are not actually drift.** Fraunces as display font IS a Brandbook-documented interim state — log it as one minor line, do not line-item every heading. `InitialAvatar` placeholders are accepted — log once, not per face.
- **Grep hits in `app/globals.css` reported as palette drift.** Tokens live there; that is the correct location.
- **Not counting accents.** The quantitative accent count is the single most useful artefact in this report for Step 2.8. Do not skip it or hand-wave it.
- **Opening more than one dev server.** Port 3000 orphans will silently serve stale builds. Kill before you start.

---

## 10. Commit

Only `docs/drift-report.md` and `docs/drift-screenshots/*` change. From the repo root:

```bash
git add docs/drift-report.md docs/drift-screenshots
git status
# Confirm nothing else is staged
git commit -m "docs: drift report — PRD v2.1 Phase 0"
git push origin main
```

Verify on GitHub that the commit landed and the drift report is viewable in the rendered Markdown.

---

## 11. What comes next

When this step is committed, come back to Claude (chat) and say:

> **"Step 0.2 done. Give me Step 0.3."**

Step 0.3 — Scope Boundary — consumes this drift report. It locks what Phases 1–3 will fix, what gets deferred, and what we explicitly refuse to touch until re-opened. The blocker list from this report becomes the Phase 1–3 "In scope" section verbatim.

Start Step 0.3 in a **fresh chat** inside the OTS project. One PRD-v2.1 step per chat is the convention.

---

**Step 0.2 · Drift Report · v1.0**
*Behind every smooth business is a better system.*
