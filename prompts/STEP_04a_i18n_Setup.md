# STEP 04a — Internationalisation Setup (next-intl)

**Project:** Ontwikkeling Tech Services — Marketing Website
**Type:** Claude Code prompt
**Estimated time:** 40–60 minutes (architectural refactor + configuration)
**Owner:** Virat
**Version:** 1.0

---

## Goal

Configure `next-intl` so the site can serve Dutch at `/` (default) and English at `/en/`. Restructure `app/` to use a `[locale]` dynamic segment. Create Dutch and English message files. Verify by rendering a language toggle that actually switches locales in the browser.

By the end of this step:
- `http://localhost:3000/` shows the OTS tagline in Dutch
- `http://localhost:3000/en` shows the OTS tagline in English
- A toggle in the UI switches between them
- Every future page section can call `useTranslations()` to get its copy from `messages/nl.json` or `messages/en.json`

---

## Context

- References PRD v1.1 §3.3 (language and routing).
- References Brand Bible v2 (voice consistency across languages).
- **This is an architectural step.** It moves files and reshapes routing — no visual changes to speak of. Its value is invisible: every future step depends on it.
- `next-intl` was installed as a dependency in Step 1.

---

## Why this matters

The Marketing Bible and Company Brain both name the Netherlands as the primary market. Deepak is our Netherlands anchor. A serious Dutch buyer needs to arrive at `ontwikkelingtechservices.nl` and see Dutch immediately — not a language selector, not English with a "translate to Dutch?" banner, not machine-translated content. Just Dutch.

**But we also need English.** A referring peer from Belgium might send a prospect. A prospective hire from another EU country might want to read our essays. English at `/en/` provides that access without dominating the site.

**The choice of `next-intl` over other i18n libraries** was made in the PRD (Section 10). Reasons: (1) it's the de facto standard for Next.js App Router, (2) it works with static rendering (important for SEO), and (3) message files are simple JSON — a Dutch copywriter can edit `nl.json` directly without needing to touch code.

---

## Honest expectation setting

This is the most complex step so far. It involves:

- **Moving files** — `app/layout.tsx` and `app/page.tsx` move into a new `app/[locale]/` folder.
- **Creating new files** — `i18n/routing.ts`, `i18n/request.ts`, `i18n/navigation.ts`, `middleware.ts`, `messages/nl.json`, `messages/en.json`.
- **Modifying config** — `next.config.mjs` needs the next-intl plugin wrapper.
- **Rewriting the layout** — layout must handle async locale params and set up the translation context.
- **Rewriting the page** — page uses `useTranslations()` instead of hardcoded strings.

If any single piece is misconfigured, the whole thing breaks with cryptic errors. Claude Code should proceed carefully and verify at each step.

**Session budget:** if the session runs out mid-step, everything up to the last successful task will still be committed. Coming back tomorrow you'd continue from where it stopped. No lost work.

---

## Prerequisites

- ✅ Step 3b complete: type scale codified, all utilities work.
- ✅ Latest commit on GitHub is `feat(step-03b): codify OTS type scale as reusable utilities`.
- ✅ Git working tree is clean.
- ✅ `next-intl` package installed (from Step 1).
- ✅ VS Code open, Claude Code panel accessible.

---

## Files this step creates or modifies

**Creates (new):**
- `i18n/routing.ts` — locale list, default locale, prefix strategy
- `i18n/request.ts` — request-time config that loads the right message file
- `i18n/navigation.ts` — locale-aware Link and useRouter
- `middleware.ts` — at project root, handles locale detection and URL rewriting
- `messages/nl.json` — Dutch copy
- `messages/en.json` — English copy
- `app/[locale]/layout.tsx` — replaces the old `app/layout.tsx`, wired into next-intl
- `app/[locale]/page.tsx` — replaces the old `app/page.tsx`, uses translations

**Modifies:**
- `next.config.mjs` (or `.ts`) — wraps config in `createNextIntlPlugin()`

**Deletes:**
- `app/layout.tsx` (moved to `[locale]/layout.tsx`)
- `app/page.tsx` (moved to `[locale]/page.tsx`)

**Untouched:**
- `app/globals.css` — stays at same path
- `app/favicon.ico` — stays at same path
- Everything outside `app/`

---

## How to run this step

1. Save this file to `C:\Users\offic\Projects\ots-website\prompts\STEP_04a_i18n_Setup.md`.
2. Open VS Code, open the Claude Code panel.
3. **Start a new session** — always fresh for a new step.
4. Copy the entire prompt block below.
5. Paste into Claude Code and send.
6. Approve commands as they come. **This step has more file moves and creations than any previous step** — read each proposed action carefully.
7. When Task 8 pauses, verify the language toggle actually works in your browser.

---

## THE PROMPT — paste this into Claude Code

```
You are executing Step 4a of the OTS website build. This step configures next-intl for Dutch/English routing.

This step is architecturally significant. Follow the plan exactly. Do not improvise. If any single step fails or produces unexpected output, STOP and report to me before continuing.

CONTEXT:
- `next-intl` is already installed as a dependency (installed in Step 1).
- We want Dutch (nl) as default with no URL prefix; English (en) at `/en/*` URLs.
- Current directory structure: app/layout.tsx, app/page.tsx, app/globals.css, app/favicon.ico.
- Target structure: app/[locale]/layout.tsx, app/[locale]/page.tsx, app/globals.css (unchanged), app/favicon.ico (unchanged).
- Additional new folders: i18n/ at project root, messages/ at project root.
- middleware.ts and next.config.mjs modifications at project root.

TASK 1 — Verify prerequisites.
Report the output of:
- `pwd` → confirm ots-website directory
- `git status` → confirm clean tree (only STEP_04a as untracked is fine)
- `git log --oneline -3` → confirm last commit is `feat(step-03b): codify OTS type scale as reusable utilities`
- Port 3000 check — wrap in if/else, kill any orphan.
- `cat package.json | grep next-intl` → confirm next-intl is installed. Report the version number.

Pause for my approval before proceeding.

TASK 2 — Create the i18n configuration files.
Create these three files at the project root inside a new `i18n/` folder:

FILE: i18n/routing.ts
CONTENT:
import {defineRouting} from 'next-intl/routing';

export const routing = defineRouting({
  // Locales this site supports.
  locales: ['nl', 'en'],

  // Dutch is the default (Company Brain: Netherlands is our primary market).
  defaultLocale: 'nl',

  // Prefix strategy: default locale has no prefix (/), non-default gets a prefix (/en).
  // Matches PRD v1.1 §3.3.
  localePrefix: 'as-needed'
});

FILE: i18n/navigation.ts
CONTENT:
import {createNavigation} from 'next-intl/navigation';
import {routing} from './routing';

// Locale-aware wrappers around Next.js navigation primitives.
// Use `Link` from here instead of `next/link` — it preserves locale automatically.
export const {Link, redirect, usePathname, useRouter, getPathname} =
  createNavigation(routing);

FILE: i18n/request.ts
CONTENT:
import {hasLocale} from 'next-intl';
import {getRequestConfig} from 'next-intl/server';
import {routing} from './routing';

export default getRequestConfig(async ({requestLocale}) => {
  // Read the incoming locale from the URL (via middleware).
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default
  };
});

If the version of next-intl installed does not export `hasLocale` from 'next-intl' directly, adapt the import — some versions may export it from 'next-intl/server' or use a different helper name. Report if you have to adapt anything.

TASK 3 — Create the middleware.
FILE: middleware.ts (at project root, NOT inside app/)
CONTENT:
import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Match every route except static assets and API routes.
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};

TASK 4 — Modify next.config.mjs (or next.config.ts).
First read the current content of `next.config.mjs` (or `next.config.ts` if that's what exists — check both). Report the current content.

Then rewrite it to wrap the existing config with `createNextIntlPlugin`.

If the current file is `next.config.mjs`, the new content should be:

import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Preserve any existing config from the original file here.
};

export default withNextIntl(nextConfig);

If the current file is `next.config.ts`, the new content should be:

import createNextIntlPlugin from 'next-intl/plugin';
import type {NextConfig} from 'next';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const nextConfig: NextConfig = {
  // Preserve any existing config from the original file here.
};

export default withNextIntl(nextConfig);

Report which one you rewrote and the final content.

TASK 5 — Create the message files.
Create these two files at the project root inside a new `messages/` folder:

FILE: messages/nl.json
CONTENT:
{
  "meta": {
    "title": "OTS — Business Operating Systems voor dienstverleners in Nederland",
    "description": "Wij bouwen Business Operating Systems voor restaurants, klinieken en professionele dienstverleners in Nederland. Minder handwerk. Betere data. Systemen die stil hun werk doen."
  },
  "home": {
    "eyebrow": "Stap 4a — Internationalisatie",
    "tagline_part1": "Achter elk soepel bedrijf zit een",
    "tagline_accent": "beter",
    "tagline_part2": "systeem.",
    "subhead": "Deze pagina is nu in het Nederlands. Klik op de knop hierboven om over te schakelen naar Engels — de URL verandert naar /en en de tekst wordt opnieuw geladen.",
    "current_language_label": "Huidige taal",
    "language_name": "Nederlands",
    "switch_to": "Wissel naar"
  }
}

FILE: messages/en.json
CONTENT:
{
  "meta": {
    "title": "OTS — Business Operating Systems for Dutch service businesses",
    "description": "We build Business Operating Systems for restaurants, clinics, and professional services firms in the Netherlands. Less manual work. Better data. Systems that do their work quietly."
  },
  "home": {
    "eyebrow": "Step 4a — Internationalisation",
    "tagline_part1": "Behind every smooth business is a",
    "tagline_accent": "better",
    "tagline_part2": "system.",
    "subhead": "This page is now in English. Click the button above to switch to Dutch — the URL will change to / and the text will re-render.",
    "current_language_label": "Current language",
    "language_name": "English",
    "switch_to": "Switch to"
  }
}

Note: the Dutch copy is a first-pass placeholder. A Dutch-native writer (Deepak) will refine it in a later content-authoring pass.

TASK 6 — Restructure the app/ folder.
Create the new folder `app/[locale]/` (with square brackets — this is a Next.js dynamic route segment).

Move `app/layout.tsx` to `app/[locale]/layout.tsx`.
Move `app/page.tsx` to `app/[locale]/page.tsx`.

Do NOT move:
- `app/globals.css` — stays at app/globals.css
- `app/favicon.ico` — stays at app/favicon.ico

After moving, `app/` should contain: `[locale]/`, `globals.css`, `favicon.ico`. Verify by running `ls app/`.

TASK 7 — Rewrite the layout to use next-intl.
Replace the entire contents of `app/[locale]/layout.tsx` with this exact content:

import type {Metadata} from 'next';
import {Anton, Cormorant_Garamond, Inter} from 'next/font/google';
import {hasLocale, NextIntlClientProvider} from 'next-intl';
import {getTranslations, setRequestLocale} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {routing} from '../../i18n/routing';
import '../globals.css';

const anton = Anton({
  weight: '400',
  subsets: ['latin'],
  display: 'block',
  variable: '--font-anton',
});

const cormorant = Cormorant_Garamond({
  weight: '500',
  style: 'italic',
  subsets: ['latin'],
  display: 'block',
  variable: '--font-cormorant',
});

const inter = Inter({
  weight: ['300', '400', '500', '600'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

// Pre-render static pages for each locale.
export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

// Locale-aware metadata — reads title and description from the right message file.
export async function generateMetadata({
  params,
}: {
  params: Promise<{locale: string}>;
}): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'meta'});

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;

  // 404 if someone requests a locale we don't support.
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Required for static rendering with dynamic locale segment.
  setRequestLocale(locale);

  return (
    <html
      lang={locale}
      className={`${anton.variable} ${cormorant.variable} ${inter.variable}`}
    >
      <body>
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}

TASK 8 — Rewrite the home page to use translations.
Replace the entire contents of `app/[locale]/page.tsx` with this exact content:

import {getTranslations, setRequestLocale} from 'next-intl/server';
import {Link} from '../../i18n/navigation';

export default async function Home({
  params,
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  setRequestLocale(locale);

  const t = await getTranslations('home');
  const otherLocale = locale === 'nl' ? 'en' : 'nl';
  const otherLocaleLabel = locale === 'nl' ? 'English' : 'Nederlands';

  return (
    <main>
      <section className="section-ots">
        <div className="container-ots text-center">
          {/* Language toggle — proof that next-intl routing works */}
          <div className="mb-16 flex items-center justify-center gap-4 flex-wrap">
            <span className="type-caption text-muted">
              {t('current_language_label')}: {t('language_name')}
            </span>
            <Link
              href="/"
              locale={otherLocale}
              className="type-button rounded-pill bg-ink text-cream px-5 py-2 hover:bg-accent transition-colors"
            >
              {t('switch_to')} {otherLocaleLabel} →
            </Link>
          </div>

          <p className="type-label text-accent mb-8">{t('eyebrow')}</p>

          <h1 className="type-hero text-ink mb-10 max-w-4xl mx-auto">
            {t('tagline_part1')}{' '}
            <span className="type-accent-word">{t('tagline_accent')}</span>{' '}
            {t('tagline_part2')}
          </h1>

          <p className="type-body-lg text-ink-soft max-w-2xl mx-auto">
            {t('subhead')}
          </p>
        </div>
      </section>
    </main>
  );
}

TASK 9 — Start dev server and verify.
Run `npm run dev` in the background. Wait 20 seconds (this step involves a bigger refactor, so first compile may take longer). Check whether http://localhost:3000 responds with 200. Also test whether http://localhost:3000/en responds with 200.

Report:
- Whether the server started on port 3000
- HTTP status for `/` (should be 200)
- HTTP status for `/en` (should be 200)
- Any compilation errors, especially anything mentioning next-intl, hydration, or middleware

If any compilation errors appear, STOP and report them to me exactly. Do not attempt fixes.

TASK 10 — Wait for user verification.
Pause here. I will visit http://localhost:3000 in my browser to verify Dutch renders, then click the toggle to verify English renders, then click back. Once I say "verified", proceed to Task 11.

TASK 11 — Stop the dev server cleanly.
Stop the server. Verify port 3000 is free. Kill any lingering process.

TASK 12 — Commit and push.
Run `git status` and report changes. You should see:
- New files: i18n/routing.ts, i18n/navigation.ts, i18n/request.ts, middleware.ts, messages/nl.json, messages/en.json, app/[locale]/layout.tsx, app/[locale]/page.tsx, prompts/STEP_04a_i18n_Setup.md
- Deleted files: app/layout.tsx, app/page.tsx
- Modified files: next.config.mjs (or .ts)

Stage everything: `git add -A`

Commit with this exact message:
`feat(step-04a): configure next-intl for Dutch/English routing`

Push with `git push`.

TASK 13 — Final report.
Produce a summary in this format:

STEP 4a COMPLETE
- next-intl version installed: [version]
- Files created: [list of new files]
- Files moved: app/layout.tsx → app/[locale]/layout.tsx, app/page.tsx → app/[locale]/page.tsx
- next.config.[mjs|ts]: wrapped with createNextIntlPlugin
- Dev server on port 3000: [worked / did not work]
- `/` returned 200 in Dutch: [yes / no]
- `/en` returned 200 in English: [yes / no]
- User verification: [confirmed / not confirmed]
- Git commit: [hash and message]
- Git push: [succeeded / failed]
- Any warnings or unexpected output: [list, or "none"]

END OF PROMPT.
```

---

## Acceptance test — what you verify after Claude Code finishes

### Check 1 — Dutch renders at `/`

Visit **http://localhost:3000**.

**What you should see:**
- The eyebrow reads *"STAP 4A — INTERNATIONALISATIE"* (Dutch: "Stap" not "Step")
- The tagline reads *"Achter elk soepel bedrijf zit een ***beter*** systeem."* (Dutch: with "beter" as the italic accent word)
- The subhead is in Dutch
- The toggle button at the top says *"Wissel naar English →"*
- The current language label reads *"Huidige taal: Nederlands"*
- Browser tab title reads *"OTS — Business Operating Systems voor dienstverleners in Nederland"*

### Check 2 — English renders at `/en`

Click the toggle button that says *"Wissel naar English →"*.

The URL should change to **http://localhost:3000/en** and the page should re-render.

**What you should see now:**
- URL bar shows `localhost:3000/en`
- Eyebrow reads *"STEP 4A — INTERNATIONALISATION"* (English)
- Tagline reads *"Behind every smooth business is a ***better*** system."*
- Subhead is in English
- Toggle button now says *"Switch to Nederlands →"*
- Current language label reads *"Current language: English"*
- Browser tab title changes to the English metadata

### Check 3 — Toggle back to Dutch

Click *"Switch to Nederlands →"*.

URL should return to `localhost:3000/` (no `/nl` prefix — because Dutch is default). The Dutch page should render again.

### Check 4 — 404 for unsupported locale

Visit **http://localhost:3000/fr**.

Should return a 404 page (or Next.js's default 404). This confirms unsupported locales are correctly rejected.

### Check 5 — Screenshot both languages

Screenshot the Dutch view AND the English view (two screenshots). Paste both back to me.

### Check 6 — Tell Claude Code to commit

If all four checks pass, reply in Claude Code:

```
Verified — Dutch renders correctly at / with translated eyebrow, tagline (including italic accent word "beter"), subhead, and toggle button in Dutch. English renders correctly at /en with all copy translated including "better" accent word. Toggle works in both directions. Metadata (browser tab title) changes with locale. 404 works for unsupported locales. Please stop the dev server and continue with Tasks 11, 12, and 13.
```

### Check 7 — GitHub shows the new commit

Refresh https://github.com/ots-nl/website. Latest commit should read `feat(step-04a): configure next-intl for Dutch/English routing`. **7 commits total.**

You should also see the new folder structure: `i18n/`, `messages/`, and `app/[locale]/`.

---

## If something goes wrong

**Compilation error mentioning `hasLocale` is not a function.**
The installed next-intl version exports `hasLocale` differently. Ask Claude Code to check the installed version (`npm list next-intl`) and adapt: newer versions may need `hasLocale` imported from a different path, or use an inline check like `routing.locales.includes(locale as any)`.

**Compilation error about `params` not being a Promise.**
Next.js changed params to async in v15+. If we're on Next.js 14, params is not a Promise. Ask Claude Code to check the Next.js version and adjust — remove `Promise<{locale: string}>` and `await params`, just use `{locale}` directly.

**Page loads but shows "Missing message" errors in the console.**
The message keys in the JSX don't match the keys in nl.json/en.json. Ask Claude Code to show the current contents of both JSON files.

**Middleware doesn't route — `/en` shows the same content as `/`.**
`middleware.ts` isn't being picked up. Ask Claude Code to verify the file is at project root (NOT inside `app/` or `src/`), and check the matcher pattern.

**"Cannot find module '@/i18n/routing'" or similar path errors.**
The `@/` path alias may not be configured for the new folder location. Ask Claude Code to show the `tsconfig.json` paths section. It should include the project root — should work out of the box, but path resolution can be finicky. As a fallback, use relative imports (`../../i18n/routing`) instead of `@/i18n/routing`. **Note: the prompt above already uses relative paths for safety.**

**Fonts don't load anymore after the refactor.**
The layout was moved and the globals.css import path may be wrong. Should be `import '../globals.css';` (one level up from `[locale]/` to `app/`). If Claude Code wrote `./globals.css`, the fonts won't load.

**Dev server crashes with "Middleware invalid response".**
The middleware matcher pattern is wrong. Should be `matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']`. Note the escaped backslash for the file extension check.

**Anything else.**
Paste the exact error, what Claude Code was doing, and the current contents of the relevant files.

---

## What comes next

Once all six acceptance checks pass:

- ✅ Dutch renders at `/`
- ✅ English renders at `/en`
- ✅ Toggle switches locale
- ✅ Metadata updates with locale
- ✅ 404 works for unsupported locales
- ✅ Commit visible on GitHub

Come back and say:

> **"Step 4a done. Give me Step 5a."**

**Step 5a** starts the shared component library — the atomic building blocks every future section will compose. First up: the `Container` and `Section` React components (thin wrappers around the CSS primitives from Step 2b), and the `Button` component with its four variants (primary, secondary, ghost, nav). These are small components but they establish the patterns every future component will follow.

---

**Step 04a · Internationalisation Setup · v1.0 (Claude Code-driven)**
*Behind every smooth business is a better system.*
