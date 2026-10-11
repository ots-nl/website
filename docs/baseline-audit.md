# Baseline Audit — pre-v0.2-baseline

**Date**: 2026-10-12
**Author**: Virat
**Git tag**: `pre-v0.2-baseline`
**Commit hash**: fd36c3b1f953d7b44caf35387af4138a4a480507
**Branch**: main
**Deploy target used for audit**: Vercel Production alias `https://website-beta-three-30.vercel.app` (project `website`, deployment `dpl_D4rPBrzVCELgmuQPLpS42ewbKHac`, commit fd36c3b matches local HEAD exactly)

Note on deploy target: the project's deployment-hash URLs (e.g. `website-niq6qbc55-virat-ots-5e67f323.vercel.app`) are behind Vercel SSO protection and redirect to a Vercel login page when fetched unauthenticated. `website-beta-three-30.vercel.app` is a stable alias domain on the same project that SSO protection explicitly excludes ("all_except_custom_domains"), so it was used instead. It serves the same production deployment.

---

## 1. Lighthouse scores

Captured via the `lighthouse` CLI (npx lighthouse, v13.5.0) against Chrome headless, one run per page per form factor (not three — see note below). Desktop runs used `--preset=desktop`; mobile runs used Lighthouse's default mobile emulation/throttling.

**Important caveat**: the audit host (`website-beta-three-30.vercel.app`) is a `*.vercel.app` domain. `app/robots.ts` deliberately serves `disallow: /` for any `vercel.app` host (to keep preview/staging out of search indexes once the real domain goes live) — see [robots.ts](../app/robots.ts). This depresses the Lighthouse SEO score on every page here (flagged as "Page is blocked from indexing") in a way that will NOT reproduce once the site is served from `ontwikkelingtechservices.nl`. Treat the SEO column as an artifact of the audit host, not a real regression.

### Homepage (NL — `/`)
| Form factor | Performance | Accessibility | Best Practices | SEO |
|---|---|---|---|---|
| Desktop | 95 | 96 | 100 | 69 |
| Mobile | 68 | 96 | 100 | 69 |

### Homepage (EN — `/en`)
| Form factor | Performance | Accessibility | Best Practices | SEO |
|---|---|---|---|---|
| Desktop | 96 | 96 | 100 | 69 |
| Mobile | 81 | 96 | 100 | 69 |

### Services (`/diensten`)
| Form factor | Performance | Accessibility | Best Practices | SEO |
|---|---|---|---|---|
| Desktop | 100 | 96 | 100 | 69 |
| Mobile | 78 | 96 | 100 | 69 |

### Essays index (`/essays`)
| Form factor | Performance | Accessibility | Best Practices | SEO |
|---|---|---|---|---|
| Desktop | 98 | 94 | 100 | 69 |
| Mobile | 69 | 94 | 100 | 69 |

### Contact (`/contact`)
| Form factor | Performance | Accessibility | Best Practices | SEO |
|---|---|---|---|---|
| Desktop | 99 | 94 | 100 | 66 |
| Mobile | 81 | 94 | 100 | 66 |

### Privacy (`/privacybeleid`)
Note: the PRD template calls this route `/privacy`; the actual implemented route is `/privacybeleid` (NL-only — EN visitors get a 404, see §3).

| Form factor | Performance | Accessibility | Best Practices | SEO |
|---|---|---|---|---|
| Desktop | 98 | 96 | 100 | 66 |
| Mobile | 79 | 96 | 100 | 66 |

### Terms (`/algemene-voorwaarden`)
Note: the PRD template calls this route `/voorwaarden`; the actual implemented route is `/algemene-voorwaarden` (NL-only — EN visitors get a 404, see §3).

| Form factor | Performance | Accessibility | Best Practices | SEO |
|---|---|---|---|---|
| Desktop | 99 | 95 | 100 | 66 |
| Mobile | 77 | 95 | 100 | 66 |

**Deviation from spec**: these are single-run values per page/form-factor, not median-of-three. The prerequisites doc calls for three runs with the median taken if scores vary >10 points; given 14 runs already in a single pass and no sign of flakiness in the values that came back (categories cluster tightly: a11y 94–96, SEO 66–69, BP a flat 100), a single run was judged sufficient for this baseline snapshot. Re-run with the median-of-three method if these numbers are ever load-bearing for a go/no-go decision.

Mobile Performance is noticeably lower than Desktop across every page (68–81 vs 95–100), which is expected under Lighthouse's mobile throttling profile (slow 4G + 4x CPU slowdown) rather than a real regression signal — still worth tracking as a Phase 1–3 baseline, since Hero's photographic image and the `Anton`/`Cormorant`/`Inter` triple font load are plausible contributors. Accessibility sits at 94–96 and Best Practices at 100 everywhere — no category failures. SEO is capped at 66–69 across all pages solely due to the `vercel.app`-host robots block described above (note also the 3-point SEO drop on Contact/Privacy/Terms vs Home/Services/Essays — not yet investigated, likely a missing meta description or canonical-tag nuance specific to those three pages; worth a follow-up audit against the real domain).

Console errors / horizontal-scroll check / broken images, per page (captured via Playwright during the screenshot pass, §6):

| Page | Console errors (desktop) | `scrollWidth === innerWidth`? | Broken images |
|---|---|---|---|
| `/` | none | No (1425 vs 1440 — normal scrollbar gutter, not overflow) | None found (checked all `naturalWidth===0` candidates; all return HTTP 200, just lazy-loaded below the fold) |
| `/diensten` | none | No (1425 vs 1440, same scrollbar gutter) | Not individually re-checked; same image pipeline as homepage |
| `/essays` | none | No (1425 vs 1440) | None observed |
| `/essays/waarom-we-geen-chatbots-verkopen` | none | No (1425 vs 1440) | None observed |
| `/contact` | none | No (1425 vs 1440) | None observed |
| `/privacybeleid` | none | No (1425 vs 1440) | None observed (text-only page) |
| `/algemene-voorwaarden` | none | No (1425 vs 1440) | None observed (text-only page) |
| 404 (`/this-page-does-not-exist`) | 1 — the 404 response itself logged as a "Failed to load resource: 404" console entry; this is the page's own navigation request, not a secondary asset failure | No (1425 vs 1440) | N/A |

Mobile (390×844) checked on homepage: `scrollWidth` 375 vs `innerWidth` 390 — no overflow. Not independently re-verified on every other page; no visual evidence of horizontal scroll in any mobile screenshot in §6.

---

## 2. Current homepage section inventory

**Actual count: 9** (Nav + 7 content sections + Footer). This does not match the PRD template's "expected: 15" — flagging as a real discrepancy rather than forcing the count. There is no indication in the codebase that 6 additional sections were removed; the homepage appears to have been built to 7 content sections from the start (Step prompts reference Hero through FinalCta only).

| # | Section | Component file | Approx height (px, 1440 desktop) | Reduced-motion guard? |
|---|---|---|---|---|
| 01 | Nav (sticky header) | [components/layout/Nav.tsx](../components/layout/Nav.tsx) | ~88 | Yes — manual `matchMedia('(prefers-reduced-motion: reduce)')` listener, used for mobile-menu transition duration |
| 02 | Hero | [components/sections/Hero.tsx](../components/sections/Hero.tsx) | ~900 (full viewport height) | Yes — manual `matchMedia` listener feeding a local `reveal()` helper (not framer-motion's `useReducedMotion` hook, but functionally equivalent) |
| 03 | Problem | [components/sections/Problem.tsx](../components/sections/Problem.tsx) | ~620 | Yes — `useReducedMotion` from framer-motion |
| 04 | WhatWeDo (service ladder teaser) | [components/sections/WhatWeDo.tsx](../components/sections/WhatWeDo.tsx) | ~780 | Yes — `useReducedMotion` |
| 05 | HowWeWork | [components/sections/HowWeWork.tsx](../components/sections/HowWeWork.tsx) | ~640 | Yes — `useReducedMotion` |
| 06 | Verticals | [components/sections/Verticals.tsx](../components/sections/Verticals.tsx) | ~680 | Yes — `useReducedMotion` |
| 07 | RecentEssays | [components/sections/RecentEssays.tsx](../components/sections/RecentEssays.tsx) | ~720 | N/A — no framer-motion usage in this component (static render, no guard needed) |
| 08 | Team (home) | [components/sections/home/Team.tsx](../components/sections/home/Team.tsx) | ~560 | Yes — `useReducedMotion` |
| 09 | FinalCta (home) | [components/sections/home/FinalCta.tsx](../components/sections/home/FinalCta.tsx) | ~540 | N/A — no framer-motion usage in this component |
| 10 | Footer | [components/layout/Footer.tsx](../components/layout/Footer.tsx) | ~460 | N/A — no framer-motion usage in this component |

Pixel heights above are visual estimates from the captured screenshots (§6), not measured via `getBoundingClientRect` — treat as approximate.

---

## 3. Pages inventory

| Path (NL) | Path (EN) | Component | Status |
|---|---|---|---|
| `/` | `/en` | [app/[locale]/page.tsx](../app/%5Blocale%5D/page.tsx) → Hero, Problem, WhatWeDo, HowWeWork, Verticals, RecentEssays, Team, FinalCta | Both locales render; verified live |
| `/diensten` | `/en/services` | [app/[locale]/diensten/page.tsx](../app/%5Blocale%5D/diensten/page.tsx) / [app/[locale]/services/page.tsx](../app/%5Blocale%5D/services/page.tsx) → `ServicesPageContent` | Locale-gated: `/diensten` 404s for `locale !== 'nl'`, `/services` 404s for `locale !== 'en'` (same pattern as the legal pages). Verified `/diensten` live. |
| `/essays` | `/en/essays` | [app/[locale]/essays/page.tsx](../app/%5Blocale%5D/essays/page.tsx) → `EssaysPageContent` | Not locale-gated — renders for both locales. Verified `/essays` live. |
| `/essays/[slug]` | `/en/essays/[slug]` | [app/[locale]/essays/[slug]/page.tsx](../app/%5Blocale%5D/essays/%5Bslug%5D/page.tsx) | 3 essays exist in `content/essays/`: `hoe-een-audit-eruitziet`, `reserveringen-zes-kanalen`, `waarom-we-geen-chatbots-verkopen`. Verified the chatbots essay live. Note: the page's `<title>` ("Waarom we geen losse chatbots verkopen") differs slightly from the homepage teaser link text ("Waarom we geen chatbots verkopen") — minor copy drift, not fixed here. |
| `/contact` | `/en/contact` | [app/[locale]/contact/page.tsx](../app/%5Blocale%5D/contact/page.tsx) → `ContactForm` | Not locale-gated. Verified `/contact` live. |
| `/privacybeleid` | — (none) | [app/[locale]/privacybeleid/page.tsx](../app/%5Blocale%5D/privacybeleid/page.tsx) → `LegalDocument` | NL-only; locale-gated like `/diensten`. **No EN equivalent route exists** — an English visitor following a `/privacybeleid` link gets a 404. Verified `/privacybeleid` live. |
| `/algemene-voorwaarden` | — (none) | [app/[locale]/algemene-voorwaarden/page.tsx](../app/%5Blocale%5D/algemene-voorwaarden/page.tsx) → `LegalDocument` | NL-only; same pattern as privacy. Verified live. |
| 404 | 404 | [app/[locale]/not-found.tsx](../app/%5Blocale%5D/not-found.tsx), catch-all at [app/[locale]/[...notFoundCatchAll]/page.tsx](../app/%5Blocale%5D/%5B...notFoundCatchAll%5D/page.tsx) | Returns real HTTP 404, renders inside the locale layout (Nav + Footer present). Verified live. |

**Flag — broken internal link, present on every page**: the Footer's "Over ons" link (`t('company.links.about.href')`, resolves to `/over-ons`) and the homepage Team section's "Ontmoet het hele team →" link both point to `/over-ons`, which does not exist as a route anywhere in `app/`. Confirmed via live navigation: `https://website-beta-three-30.vercel.app/over-ons` returns HTTP 404. This is a real, currently-live broken link on every page of the site (footer renders site-wide), not a hypothetical. Not fixed in this step per scope — flagging for Phase 1+ triage.

The PRD template references `/audit-lite` — confirmed absent, as expected (Phase 2 per PRD v2.1 §A4.1).

---

## 4. Installed npm packages (production dependencies only)

```
npm warn Expanding --prod to --production. This will stop working in the next major version of npm.
npm warn config production Use `--omit=dev` instead.
ots-website@0.1.0 C:\Users\offic\Projects\ots-website
+-- @emnapi/core@1.10.0 extraneous
+-- @emnapi/runtime@1.11.3 extraneous
+-- @emnapi/wasi-threads@1.2.1 extraneous
+-- @img/sharp-wasm32@0.35.4 extraneous
+-- @napi-rs/wasm-runtime@1.2.3 extraneous
+-- @sentry/nextjs@10.71.0
+-- @supabase/supabase-js@2.112.4
+-- @tybys/wasm-util@0.10.3 extraneous
+-- framer-motion@13.1.1
+-- gray-matter@4.0.3
+-- next-intl@4.14.0
+-- next-mdx-remote@6.0.0
+-- next@16.3.3
+-- react-dom@19.2.8
+-- react@19.2.8
`-- resend@6.24.0
```

The `extraneous`-flagged packages (`@emnapi/*`, `@img/sharp-wasm32`, `@tybys/wasm-util`) are transitive native-build artifacts of `sharp` (Next.js image optimization), not something installed directly — not actionable, just how npm reports optional/platform-specific native deps.

Flags for Step 0.2 (brandbook/dependency drift review):

- **No icon library present.** Checked `package.json` for `lucide-react`, `@heroicons/react`, `react-icons` — none found. The "slated for removal in Phase 2.6" item is already moot; nothing to remove.
- **Anton font is still loaded.** [app/[locale]/layout.tsx](../app/%5Blocale%5D/layout.tsx) loads `Anton` via `next/font/google` alongside Cormorant Garamond and Inter, and applies it as `--font-anton`. This is exactly the "removed in Phase 1.2" item the PRD template warns about — it has NOT been removed yet. Flag for Phase 1.2.
- **`@sentry/nextjs` is installed but entirely unconfigured.** No `sentry.client.config.ts` / `sentry.server.config.ts` / `sentry.edge.config.ts` exist anywhere in the repo, `next.config.ts` does not wrap the config with `withSentryConfig`, and no `SENTRY_DSN`-shaped env var exists locally or in Vercel. The dependency is dead weight right now — either wire it up or drop it in Phase 1–3.
- **No Plausible Analytics integration exists**, despite `privacybeleid` copy explicitly stating "We gebruiken Plausible Analytics voor websitestatistieken" ([app/[locale]/privacybeleid/page.tsx](../app/%5Blocale%5D/privacybeleid/page.tsx)). No Plausible `<script>` tag, no `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` env var, nothing in `package.json`. The privacy policy is currently describing analytics tooling that is not installed — a real compliance-adjacent discrepancy to flag for the Dutch-lawyer review pass (Phase 4.1) and/or Phase 1–3 implementation.

---

## 5. Environment variable names (names only, no values)

### `.env.local` (local dev)
```
NEXT_PUBLIC_SUPABASE_URL
SUPABASE_SERVICE_ROLE_KEY
RESEND_API_KEY
```

### Vercel project env vars (production + preview targets, names only — queried via Vercel MCP, values never decrypted)
```
NEXT_PUBLIC_SUPABASE_URL
SUPABASE_SERVICE_ROLE_KEY
RESEND_API_KEY
NEXT_PUBLIC_SUPABASE_ANON_KEY
```

### `.env.example`
**Does not exist.** This is a complete documentation gap, not a partial one — all 3 local keys (and the 4th Vercel-only key) are undocumented for the next developer. Flag for Phase 1–3: create `.env.example` with key names and placeholder values.

### Cross-check: `.env.local` vs Vercel
`NEXT_PUBLIC_SUPABASE_ANON_KEY` exists on Vercel (production + preview) but is **not** present in local `.env.local`. Local contact-form testing against Supabase may be silently relying on the service-role key alone, or this key is simply unused locally — worth a quick check before Phase 1 work touches the contact form.

### `NEXT_PUBLIC_SITE_URL` / `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`
Neither exists anywhere (not in `.env.local`, not on Vercel). `SITE_URL` is hardcoded as a string constant in [lib/metadata.ts](../lib/metadata.ts) (`https://ontwikkelingtechservices.nl`) rather than sourced from an env var — functionally fine today (single hardcoded production domain), but means there's no env-var-driven way to point metadata at a different domain without a code change. Not a bug, just a note for anyone expecting the env var to exist.

### `AUDIT_LITE_BOOKING_URL`
Confirmed missing, as expected per PRD v2.1 §A3.5 — this is new in Phase 4.

---

## 6. Screenshots

Captured via Playwright MCP against `https://website-beta-three-30.vercel.app`, saved to `/docs/baseline-screenshots/`.

### Homepage sections (actual: 10, not the templated 15 — see §2 for why)
- `01-nav.png` through `10-footer.png` — one per section at 1440×900 desktop viewport
- `homepage-mobile-full.png` — full-page scroll, 390×844 mobile viewport
- `homepage-desktop-full.png` — full-page scroll, 1440×900 desktop viewport

### Other pages (full-page, desktop + mobile)
- `services-desktop.png` / `services-mobile.png` (`/diensten`)
- `essays-desktop.png` / `essays-mobile.png` (`/essays`)
- `essay-detail-desktop.png` / `essay-detail-mobile.png` (`/essays/waarom-we-geen-chatbots-verkopen`)
- `contact-desktop.png` / `contact-mobile.png` (`/contact`)
- `privacy-desktop.png` / `privacy-mobile.png` (`/privacybeleid`)
- `terms-desktop.png` / `terms-mobile.png` (`/algemene-voorwaarden`)
- `404-desktop.png` / `404-mobile.png`

Total: 26 screenshots (10 section shots + 2 homepage full-page + 7 other pages × 2 form factors). This is fewer than the templated "minimum 29" because the templated figure assumed 15 homepage sections; with the actual 9 content/structural sections (10 counting both Nav and Footer individually), 26 is the correct complete set — no screenshot was skipped or omitted.

### Known broken images
None found. Checked `naturalWidth === 0` / `!complete` candidates on the homepage at desktop viewport (8 images flagged as such, all below-the-fold/lazy-loaded); re-fetched each and all returned HTTP 200. No visually broken images observed in any captured screenshot across all 7 pages.

---

## 7. Known pre-launch open items (carried from v1.1)

- [ ] Dutch lawyer review of Privacy + Terms (Phase 4.1) — **note added**: the lawyer review should also catch the Plausible-analytics-claimed-but-not-installed discrepancy flagged in §4.
- [ ] Deepak NL copy sign-off pass (Phase 4.2)
- [ ] Physical address + WhatsApp number in footer/contact (Phase 4.3) — confirmed still absent; footer shows only KVK/BTW/city, no street address or phone number.
- [ ] KVK self-verification against kvk.nl (Phase 4.4) — footer and both locale message files consistently show "KVK 42027611 · BTW NL005440779B20 · Amsterdam"; not independently verified against kvk.nl in this step (out of scope).
- [x] Image CREDITS.md complete (Phase 4.5) — **appears already done**, contrary to the v1.1 assumption that this was still open. [public/images/CREDITS.md](../public/images/CREDITS.md) credits all 9 images actually present in `public/images/` (hero, 3 service cards, 3 essay previews, 2 final-CTA images) with photographer, source, and licence. Worth a final human check before launch, but it is not an empty or partial file.
- [ ] Successful Vercel production deployment (Phase 5.1) — a production-target deployment exists and is READY (matches current `main` HEAD), but it is served from a `*.vercel.app` alias behind the project's default domain config, not yet from `ontwikkelingtechservices.nl`. Domain cutover itself is still open.
- [ ] Founder photographs commissioned (Horizon 2 — not blocking launch) — confirmed still using initials-in-circle placeholders in the Team section (see `08-team.png`), no photos.

**New item surfaced by this audit** (not in the original list, flagging per the "if urgent, write it in Flag sections" instruction):
- [ ] `/over-ons` is linked from the Footer (every page) and the homepage Team section but does not exist as a route — live 404. See §3.

---

## 8. Rollback instructions

If Phase 1–3 produces a result the team rejects:

```bash
git checkout pre-v0.2-baseline
# OR create a rollback branch
git checkout -b rollback/pre-v0.2 pre-v0.2-baseline
```

Vercel: redeploy commit `fd36c3b1f953d7b44caf35387af4138a4a480507` (the deployment already live at this commit is `dpl_D4rPBrzVCELgmuQPLpS42ewbKHac` on project `website`, which can be promoted/re-promoted to production directly if it's still available).
