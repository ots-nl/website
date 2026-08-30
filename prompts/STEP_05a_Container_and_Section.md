# STEP 05a — Container and Section Components

**Project:** Ontwikkeling Tech Services — Marketing Website
**Type:** Claude Code prompt
**Estimated time:** 15–25 minutes
**Owner:** Virat
**Version:** 1.0

---

## Goal

Create two reusable React components — `<Section>` and `<Container>` — that wrap the CSS primitives from Step 2b (`.section-ots` and `.container-ots`). The `<Section>` component accepts a typed `background` prop that automatically applies the correct text color for each background choice.

By the end of this step, every future page section will be written as `<Section background="night"><Container>...</Container></Section>` instead of a raw div-and-class combo. The design system is enforced at the component level.

---

## Context

- References Brand Bible v2 §4.3 (spacing and layout) and PRD v1.1 §2.4.
- Builds on the CSS primitives from Step 2b (`.section-ots`, `.container-ots`).
- First real React component work of the build — kicks off the shared component library.

---

## Why React wrappers when CSS classes already exist

Right now, if you write a page section, you have to remember:

```tsx
<section className="section-ots bg-night text-cream">
  <div className="container-ots">
    {content}
  </div>
</section>
```

Four things to get right, every time, in every section. Easy to forget `text-cream` on a night background and end up with unreadable ink text on black. Easy to forget the `.container-ots` wrapper and get content that stretches edge-to-edge.

**With the wrapper components:**

```tsx
<Section background="night">
  <Container>
    {content}
  </Container>
</Section>
```

Three concrete wins:

1. **Type safety.** `background` is typed as `'cream' | 'cream-deep' | 'night' | 'mist'` — no other value compiles. Typo becomes a build error, not a broken page.

2. **Automatic text colour.** The Section component pairs each background with the correct default text colour (`bg-night` → `text-cream`, `bg-cream` → `text-ink`, etc). One decision, not two.

3. **Documented in code.** When Ankur or a future hire opens `Section.tsx`, they see the Brand Bible rules ("no more than 2-3 night sections per page", "mist appears once per page maximum") as comments right next to the code.

---

## Prerequisites

- ✅ Step 4a complete: `/` shows Dutch, `/en` shows English.
- ✅ Latest commit on GitHub is `feat(step-04a): configure next-intl for Dutch/English routing`.
- ✅ Git working tree clean.
- ✅ VS Code and Claude Code ready.

---

## Files this step creates or modifies

**Creates:**
- `components/layout/Section.tsx` — the Section component
- `components/layout/Container.tsx` — the Container component

**Modifies:**
- `app/[locale]/page.tsx` — refactors the hero to use `<Section>` and `<Container>`, adds three demo sections showing every background variant

**Does NOT touch:**
- `app/globals.css`, `app/[locale]/layout.tsx`, `i18n/`, `messages/`, `middleware.ts`, `next.config.ts`, or anything else.

---

## How to run

1. Save this file to `C:\Users\offic\Projects\ots-website\prompts\STEP_05a_Container_and_Section.md`.
2. Open VS Code, open the Claude Code panel.
3. **Start a new session** ("+ New session").
4. Copy the entire prompt block below.
5. Paste into Claude Code and send.
6. Approve each command as it comes.
7. When Claude Code pauses at Task 5, verify in your browser and screenshot.

---

## THE PROMPT — paste this into Claude Code

```
You are executing Step 5a of the OTS website build. This step creates two reusable React components — Section and Container — that wrap the CSS primitives from Step 2b, and refactors the home page to use them.

Follow this plan exactly. If anything fails or is unclear, pause and report.

CONTEXT:
- The project uses Next.js 16 with the App Router. Server Components by default.
- CSS classes `.section-ots` (vertical rhythm) and `.container-ots` (1280px max-width, responsive padding) were created in Step 2b and live in app/globals.css.
- Path alias `@/*` is configured in tsconfig.json — imports like `@/components/layout/Section` will resolve to `./components/layout/Section` at project root.
- The current app/[locale]/page.tsx is a server component using getTranslations from next-intl.

TASK 1 — Verify prerequisites.
Report:
- `pwd` → confirm ots-website directory
- `git status` → confirm clean tree (only STEP_05a as untracked is fine)
- `git log --oneline -3` → confirm last commit is `feat(step-04a): configure next-intl for Dutch/English routing`
- Port 3000 check with if/else output PORT_FREE or PORT_OCCUPIED. Kill any orphan.

Pause for my approval before proceeding.

TASK 2 — Create the Section component.
Create a new file at `components/layout/Section.tsx` with this exact content:

import { ReactNode, HTMLAttributes } from 'react';

type SectionBackground = 'cream' | 'cream-deep' | 'night' | 'mist';

interface SectionProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  background?: SectionBackground;
  spacing?: 'default' | 'large';
}

/**
 * Background-to-classes map.
 * Each background pairs with the correct default text colour.
 *
 * From Brand Bible v2 §4.1:
 * - cream (#FAF6EE) is the canvas — default background, ink text
 * - cream-deep (#F2EBDA) is the secondary — for alternating rhythm
 * - night (#0E0B08) is the dark section — used sparingly, 2-3 max per page
 * - mist (#DDE6DA) is the sage — used once per page maximum (currently reserved for Contact)
 */
const backgroundClasses: Record<SectionBackground, string> = {
  'cream': 'bg-cream text-ink',
  'cream-deep': 'bg-cream-deep text-ink',
  'night': 'bg-night text-cream',
  'mist': 'bg-mist text-ink',
};

/**
 * Section — the standard OTS page section wrapper.
 *
 * From Brand Bible v2 §4.3: uses .section-ots CSS class for vertical rhythm
 * (128px desktop, 80px mobile). Longer sections (Hero, Final CTA) can pass
 * spacing="large" to add extra vertical padding on desktop.
 *
 * Usage:
 *   <Section background="night">
 *     <Container>...</Container>
 *   </Section>
 */
export function Section({
  children,
  background = 'cream',
  spacing = 'default',
  className = '',
  ...rest
}: SectionProps) {
  const classes = [
    'section-ots',
    backgroundClasses[background],
    spacing === 'large' ? 'lg:py-40' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <section className={classes} {...rest}>
      {children}
    </section>
  );
}

TASK 3 — Create the Container component.
Create a new file at `components/layout/Container.tsx` with this exact content:

import { ReactNode, HTMLAttributes } from 'react';

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

/**
 * Container — the standard OTS content container.
 *
 * From Brand Bible v2 §4.3: 1280px max-width, responsive horizontal padding
 * (96px desktop, 48px tablet, 24px mobile). Always used inside a Section.
 *
 * Usage:
 *   <Section>
 *     <Container>...content...</Container>
 *   </Section>
 */
export function Container({
  children,
  className = '',
  ...rest
}: ContainerProps) {
  const classes = ['container-ots', className].filter(Boolean).join(' ');

  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  );
}

TASK 4 — Refactor app/[locale]/page.tsx to use the new components.
Replace the entire contents of `app/[locale]/page.tsx` with this exact content:

import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '../../i18n/navigation';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('home');
  const otherLocale = locale === 'nl' ? 'en' : 'nl';
  const otherLocaleLabel = locale === 'nl' ? 'English' : 'Nederlands';

  return (
    <main>
      {/* Hero — default cream background */}
      <Section>
        <Container className="text-center">
          {/* Language toggle */}
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

          <h1 className="type-hero mb-10 max-w-4xl mx-auto">
            {t('tagline_part1')}{' '}
            <span className="type-accent-word">{t('tagline_accent')}</span>{' '}
            {t('tagline_part2')}
          </h1>

          <p className="type-body-lg text-ink-soft max-w-2xl mx-auto">
            {t('subhead')}
          </p>
        </Container>
      </Section>

      {/* Demo — cream-deep background */}
      <Section background="cream-deep">
        <Container>
          <p className="type-label text-accent mb-6">Section — cream-deep</p>
          <p className="type-body-lg max-w-2xl">
            This section uses <code className="type-body-sm">background=&quot;cream-deep&quot;</code>.
            The Section component automatically applies both the background colour
            and the correct default text colour. Alternating cream tones create
            rhythm between sections without loud contrast.
          </p>
        </Container>
      </Section>

      {/* Demo — night background */}
      <Section background="night">
        <Container>
          <p className="type-label text-accent mb-6">Section — night</p>
          <p className="type-body-lg max-w-2xl">
            This section uses <code className="type-body-sm">background=&quot;night&quot;</code>.
            Text automatically flips to cream. Per Brand Bible §4.1: reserved for
            high-contrast moments — no more than 2-3 night sections per page.
            Used for &quot;How We Work&quot;, the Service Ladder, and the Final CTA.
          </p>
        </Container>
      </Section>

      {/* Demo — mist background */}
      <Section background="mist">
        <Container>
          <p className="type-label text-accent mb-6">Section — mist</p>
          <p className="type-body-lg max-w-2xl">
            This section uses <code className="type-body-sm">background=&quot;mist&quot;</code>.
            Per Brand Bible §4.1: the mist sage appears once per page maximum.
            Currently reserved for the Contact page — this demo is temporary.
          </p>
        </Container>
      </Section>
    </main>
  );
}

Confirm the file was written.

TASK 5 — Start dev server and verify.
Run `npm run dev` in the background. Wait 15 seconds. Check whether http://localhost:3000/ returns 200 and http://localhost:3000/en returns 200.

Report:
- Server startup on port 3000 (NOT 3001)
- HTTP status for `/`
- HTTP status for `/en`
- Any compilation errors — especially TypeScript errors from the new Section/Container components

If everything is clean, pause and wait for my browser verification. If any errors, report them exactly.

TASK 6 — Wait for user verification.
Pause here. I will visit http://localhost:3000/ and confirm the four stacked sections render correctly with the right backgrounds and text colours. Once I say "verified", proceed to Task 7.

TASK 7 — Stop the dev server.
Stop the server and verify port 3000 is free. Kill any lingering process with taskkill.

TASK 8 — Commit and push.
Run `git status` and report changes. You should see:
- New: components/layout/Section.tsx, components/layout/Container.tsx, prompts/STEP_05a_Container_and_Section.md
- Modified: app/[locale]/page.tsx

Stage all: `git add -A`

Commit with this exact message:
`feat(step-05a): add Section and Container layout components`

Push with `git push`.

TASK 9 — Final report.
Produce a summary in this format:

STEP 5a COMPLETE
- Components created: components/layout/Section.tsx (with typed background prop), components/layout/Container.tsx
- app/[locale]/page.tsx: refactored to use Section and Container; added three demo sections showing all four backgrounds (cream, cream-deep, night, mist)
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

### Check 1 — The four stacked sections render correctly

Visit **http://localhost:3000/**. This is the first time the page will have real multi-section structure — you'll see the site actually starting to look like a scrollable site, not just a demo page.

**What you should see, scrolling top to bottom:**

1. **First section — cream background** (default) — the hero with the OTS tagline in Dutch, the language toggle, etc. Same as Step 4a.

2. **Second section — cream-deep background** — slightly darker warm background, text stays dark. The transition between cream and cream-deep should be visible but subtle. This is what "alternating rhythm" looks like.

3. **Third section — night background** — near-black background, all text switches to cream. **This is the automatic text-colour pairing working.** The accent orange label at the top still appears in orange (accent stays constant across backgrounds).

4. **Fourth section — mist background** — sage green background, text is dark again. The mist is much more muted than accent orange — it's a "quiet" surface, not a shouting one.

Each section has the standard section-ots vertical padding (128px desktop) — so scrolling should feel unhurried and generous.

### Check 2 — Section content uses Container correctly

In every section, the content shouldn't stretch to the full browser width. On a wide monitor, you should see clear left and right margins in every section. This confirms `<Container>` is enforcing the 1280px max-width.

### Check 3 — Switch to English

Click the toggle button in the hero. URL should become `/en`, content should switch to English. The three demo sections should also stay stacked, still with correct backgrounds. English demo content is fine — it's the same three demo sections (the copy inside them is English/generic).

### Check 4 — Text selection is still orange

Select any text on any section. Highlight should still be orange (from Step 2b's accent-selection rule). Confirming nothing regressed.

### Check 5 — Take screenshots

Screenshot both:
- The full stacked page (Dutch view). If too tall to fit in one screenshot, do top-half and bottom-half.
- Confirm the transition from cream-deep to night — that's the biggest visual moment.

### Check 6 — Tell Claude Code to commit

If everything renders correctly, paste to Claude Code:

```
Verified — all four Section backgrounds render correctly. Cream (hero), cream-deep, night, and mist all stack cleanly with correct text colours (ink on light backgrounds, cream on night). Container respects 1280px max-width in every section. Language toggle still works, orange text selection preserved. Please stop the dev server and continue with Tasks 7, 8, and 9.
```

---

## If something goes wrong

**TypeScript compilation error in Section.tsx or Container.tsx.**
Likely a strict-mode issue with the `HTMLAttributes` typing. Ask Claude Code to show the exact error text. Common fix: sometimes strict mode needs the `React.` prefix explicitly (`React.HTMLAttributes<HTMLElement>` instead of just `HTMLAttributes<HTMLElement>`).

**"Module not found: Can't resolve '@/components/layout/Section'".**
The path alias isn't resolving from the new folder. Verify: (a) `components/layout/Section.tsx` was created at project root (not inside `app/`), and (b) `tsconfig.json` has `"@/*": ["./*"]` in paths. If both are correct, restart the dev server (path alias resolution sometimes caches).

**The night section shows ink-coloured text instead of cream.**
The `text-cream` class isn't applying. Check the browser dev tools — inspect the section element and see what classes are actually on it. If `bg-night` is there but `text-cream` isn't, the backgroundClasses map has a typo. If both are there but text is still dark, Tailwind's specificity or purge might be an issue.

**Sections stack without any visible padding between them.**
`.section-ots` isn't loading. Check `app/globals.css` still exists at that path and contains the `.section-ots` class.

**Anything else.**
Paste the exact error and the contents of the file that caused it.

---

## What comes next

Once all six checks pass:

- ✅ Four sections stack with correct backgrounds
- ✅ Text colours pair correctly with backgrounds
- ✅ Container respects max-width in every section
- ✅ Language toggle still works
- ✅ Commit visible on GitHub

Come back and say:

> **"Step 5a done. Give me Step 5b."**

**Step 5b** is the **Button** component — the four variants from the Brand Bible §4.5 (primary, secondary, ghost, nav). Buttons appear in every section and are the primary interaction surface, so getting them right centrally is important. Then Step 5c is smaller UI atoms (Eyebrow, AsteriskBreak), and Step 5d is the ScrollIndicator (the rotating badge in the Hero). By the end of Step 5, you have every reusable piece needed to start assembling the actual page sections in Step 6.

---

**Step 05a · Container and Section Components · v1.0 (Claude Code-driven)**
*Behind every smooth business is a better system.*
