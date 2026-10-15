# Step 0.1 — Snapshot current main (pre-v0.2-baseline)

**PRD**: v2.1 · Phase 0 · Step 0.1
**Goal**: Produce an honest snapshot of the current (pre-redesign) site so we have a tagged diff/rollback point and a documented baseline to measure Phase 1–3 progress against.
**Code changes**: None. Documentation + git tag only.
**Estimated time**: 20–30 minutes.

---

## Prerequisites (confirm before starting)

1. Working tree on `main` is clean. If dirty → `git status` → stash or commit first.
2. You are on the `main` branch (`git branch --show-current`).
3. Latest commit on `main` is pushed to GitHub.
4. **A working Vercel Preview or Production URL exists.** If the latest preview is red or unavailable:
   - Trigger a fresh preview with a trivial file change (e.g. touch `README.md`), OR
   - Run `npm run build && npm run start` locally and Lighthouse against `http://localhost:3000`
   - Note which option was used in the audit document.
5. Playwright MCP is configured (`.mcp.json` at repo root). If not, this step cannot run — flag and stop.

---

## Deliverables

1. **Git tag**: `pre-v0.2-baseline` pushed to `origin`
2. **File**: `/docs/baseline-audit.md`
3. **Directory**: `/docs/baseline-screenshots/` containing one PNG per homepage section + one PNG per Phase 4 page

---

## Spec

### 1. Create and push the git tag

```bash
git tag pre-v0.2-baseline -m "Snapshot before Brand v0.2 redesign — PRD v2.1 Phase 0"
git push origin pre-v0.2-baseline
```

Verify: `git tag --list | grep pre-v0.2-baseline` returns one line.

### 2. Create `/docs/baseline-audit.md`

Create the file at `/docs/baseline-audit.md` with the following structure. Fill every section. Do not leave `TBD` or empty placeholders — if a value is genuinely unknown, write `not available (reason: …)` instead.

```markdown
# Baseline Audit — pre-v0.2-baseline

**Date**: {today, ISO}
**Author**: Virat
**Git tag**: `pre-v0.2-baseline`
**Commit hash**: {run `git rev-parse HEAD` and paste full SHA}
**Branch**: main
**Deploy target used for audit**: {Vercel Preview URL | Vercel Production URL | localhost:3000 — pick one, paste the URL}

---

## 1. Lighthouse scores

Captured via Chrome DevTools Lighthouse (not web.dev/measure — too noisy). One run per page per form factor. If a score fluctuates ±5, take the lower.

### Homepage (NL — `/`)
| Form factor | Performance | Accessibility | Best Practices | SEO |
|---|---|---|---|---|
| Desktop | | | | |
| Mobile | | | | |

### Homepage (EN — `/en`)
| Form factor | Performance | Accessibility | Best Practices | SEO |
|---|---|---|---|---|
| Desktop | | | | |
| Mobile | | | | |

### Services (`/diensten`)
| Form factor | Performance | Accessibility | Best Practices | SEO |
|---|---|---|---|---|
| Desktop | | | | |
| Mobile | | | | |

### Essays index (`/essays`)
| Form factor | Performance | Accessibility | Best Practices | SEO |
|---|---|---|---|---|
| Desktop | | | | |
| Mobile | | | | |

### Contact (`/contact`)
| Form factor | Performance | Accessibility | Best Practices | SEO |
|---|---|---|---|---|
| Desktop | | | | |
| Mobile | | | | |

### Privacy (`/privacy`)
| Form factor | Performance | Accessibility | Best Practices | SEO |
|---|---|---|---|---|
| Desktop | | | | |
| Mobile | | | | |

### Terms (`/voorwaarden`)
| Form factor | Performance | Accessibility | Best Practices | SEO |
|---|---|---|---|---|
| Desktop | | | | |
| Mobile | | | | |

---

## 2. Current homepage section inventory (expected: 15)

List each section in render order, top to bottom. For each: section name, component file path, approximate pixel height on 1440px desktop, whether a `useReducedMotion` guard is present.

| # | Section | Component file | Approx height (px) | Reduced-motion guard? |
|---|---|---|---|---|
| 01 | Hero | | | |
| 02 | | | | |
| … | | | | |
| 15 | | | | |

### 3. Pages inventory

| Path (NL) | Path (EN) | Component | Status |
|---|---|---|---|
| `/` | `/en` | | |
| `/diensten` | `/en/services` | | |
| `/essays` | `/en/essays` | | |
| `/essays/[slug]` | `/en/essays/[slug]` | | |
| `/contact` | `/en/contact` | | |
| `/privacy` | `/en/privacy` | | |
| `/voorwaarden` | `/en/terms` | | |
| 404 | 404 | | |

Note: `/audit-lite` does NOT yet exist — it is created in Phase 2 (PRD v2.1 §A4.1).

---

## 4. Installed npm packages (production dependencies only)

Run `npm list --prod --depth=0` and paste the raw output in a fenced block.

```
{paste output}
```

Flag anything the drift report (Step 0.2) will want to look at:
- Third-party icon libraries (`lucide-react`, `@heroicons/react`, `react-icons`) — slated for removal in Phase 2.6
- Anton or any non-brandbook font loaders — removed in Phase 1.2
- Any analytics/tracking packages not Plausible or Sentry — flag

---

## 5. Environment variable names (names only, no values)

Scan `.env.local`, `.env.example`, Vercel project settings. List every `KEY` name. Never paste values.

```
NEXT_PUBLIC_SITE_URL
NEXT_PUBLIC_PLAUSIBLE_DOMAIN
SUPABASE_URL
…
```

Flag any variable in `.env.local` that is NOT also in `.env.example` — that's a documentation gap for the next developer.

Flag `AUDIT_LITE_BOOKING_URL` specifically: expected missing (new in PRD v2.1 §A3.5), will be added in Phase 4.

---

## 6. Screenshots

See `/docs/baseline-screenshots/`. Captured via Playwright MCP (see §Playwright capture below).

### Homepage sections (15 expected)
- `01-hero.png` through `15-footer.png` — one per section at 1440×900 desktop viewport
- `homepage-mobile-full.png` — full-page scroll on 390×844 mobile viewport
- `homepage-desktop-full.png` — full-page scroll on 1440×900 desktop viewport

### Other pages (full-page, desktop + mobile)
- `services-desktop.png` / `services-mobile.png`
- `essays-desktop.png` / `essays-mobile.png`
- `essay-detail-desktop.png` / `essay-detail-mobile.png` (pick the first essay)
- `contact-desktop.png` / `contact-mobile.png`
- `privacy-desktop.png` / `privacy-mobile.png`
- `terms-desktop.png` / `terms-mobile.png`
- `404-desktop.png` / `404-mobile.png`

---

## 7. Known pre-launch open items (carried from v1.1)

These are NOT closed by this baseline — they close in Phase 4. Listing here for completeness:

- [ ] Dutch lawyer review of Privacy + Terms (Phase 4.1)
- [ ] Deepak NL copy sign-off pass (Phase 4.2)
- [ ] Physical address + WhatsApp number in footer/contact (Phase 4.3)
- [ ] KVK self-verification against kvk.nl (Phase 4.4)
- [ ] Image CREDITS.md complete (Phase 4.5)
- [ ] Successful Vercel production deployment (Phase 5.1)
- [ ] Founder photographs commissioned (Horizon 2 — not blocking launch)

---

## 8. Rollback instructions

If Phase 1–3 produces a result the team rejects:

```bash
git checkout pre-v0.2-baseline
# OR create a rollback branch
git checkout -b rollback/pre-v0.2 pre-v0.2-baseline
```

Vercel: redeploy the commit SHA logged in §1 above.
```

### 3. Playwright capture

Use Playwright MCP to capture every screenshot listed in §6 of the audit document.

**Capture pattern** (apply to each page):

1. Navigate to the URL on the deploy target chosen in §Prerequisites item 4.
2. Set viewport to 1440×900 for desktop, 390×844 for mobile.
3. Wait for network idle (not just DOMContentLoaded — hero images matter).
4. Capture full-page screenshot (not just viewport).
5. For the 15 homepage section screenshots: scroll to each section, let any entrance animation complete, screenshot the section bounding box.
6. Save with the filename exactly as specified in §6.

**For each page, also record**:
- Console errors (if any) — paste in audit §1 under the relevant page's row
- Whether `document.body.scrollWidth === window.innerWidth` on both desktop and mobile (horizontal scroll check)
- Note any obvious broken images or 404 asset requests

Save all screenshots to `/docs/baseline-screenshots/`.

### 4. Verification

Before committing, verify every acceptance test:

- [ ] `git tag --list | grep pre-v0.2-baseline` → 1 line
- [ ] `git ls-remote --tags origin | grep pre-v0.2-baseline` → 1 line (tag pushed)
- [ ] `/docs/baseline-audit.md` exists and every section is filled (no empty tables, no `TBD`)
- [ ] `/docs/baseline-screenshots/` contains at minimum: 15 section PNGs + 7 pages × 2 form factors = 29 screenshots total
- [ ] Lighthouse scores recorded for every page × form factor pair
- [ ] All 15 homepage sections inventoried with component paths

### 5. Commit

```bash
git add docs/baseline-audit.md docs/baseline-screenshots/
git commit -m "docs: baseline audit for Phase 0 freeze — PRD v2.1 Phase 0.1"
git push origin main
```

Verify Vercel kicks a deploy (the audit docs are a real file change, so this should not hit the empty-commit skip issue).

---

## Common failures to watch for

- **Working tree not clean** → stash or commit uncommitted work before tagging.
- **Vercel preview URL expired** → the free-tier previews can rot after inactivity. If 404, trigger a fresh preview with a one-line README touch and use the new URL. Note in audit §1.
- **Lighthouse scores vary wildly between runs** → run three times, take the median. Note variance in audit §1 if >10 points spread.
- **Playwright MCP missing images** → the hard-stop rule applies even here. If a page references an image that returns 404, log it in audit §6 "Known broken images" — do NOT substitute a placeholder.
- **Mobile viewport screenshots cut off** → use `fullPage: true` in the Playwright page.screenshot() call, not viewport-only.
- **npm list output exceeds a reasonable paste size** → `--depth=0` keeps it to direct deps only. If still huge, verify `--prod` flag.

---

## What this step does NOT do

- Does not change any code, token, component, or copy
- Does not run any migrations or env changes
- Does not touch the brandbook or any content files
- Does not evaluate the brandbook drift (that's Step 0.2)
- Does not define scope for Phase 1–3 (that's Step 0.3)

If the audit surfaces something that feels urgent, write it in the "Flag" sections — do not fix it in this step.

---

## Commit message (exact)

```
docs: baseline audit for Phase 0 freeze — PRD v2.1 Phase 0.1
```

---

## Next step

Once this is committed and pushed, return to Virat (chat) with:
1. Confirmation the tag exists on GitHub (link)
2. The commit hash from `/docs/baseline-audit.md` §1
3. Any flags surfaced during the audit (broken images, missing env vars, unexpected packages, Lighthouse scores below 70)

Then Virat generates the Step 0.2 (Drift Report) prompt.
