# STEP 05c — Eyebrow & AsteriskBreak

**Project:** Ontwikkeling Tech Services — Marketing Website
**Type:** Claude Code prompt
**Estimated time:** 20–30 minutes
**Owner:** Virat
**Version:** 1.0

---

## Goal

Create two small utility components — `<Eyebrow>` and `<AsteriskBreak>` — that codify visual patterns currently written by hand everywhere in the codebase.

By the end of this step:
- Every "small orange uppercase label" on the site is `<Eyebrow>Some text</Eyebrow>` — one import, one line
- The `✱` OTS section signature is `<AsteriskBreak />` — used between sections, at the end of essays, and as a footer mark

---

## Context

- References Brand Bible v2 §4.2 (type-label style) and §6.2 (asterisk as OTS signature).
- Both components are pure Server Components — no `'use client'`, no interactivity.
- Neither is architecturally significant. This is a "codify what we're writing by hand" step.

---

## Why these two together

Look at your current `page.tsx`. Every section eyebrow is written as:

```tsx
<p className="type-label text-accent mb-8">Some label</p>
```

That's four things to get right, remembered by discipline, in every section. Small friction, but it adds up — and it's exactly the kind of small friction that leads to inconsistency across a codebase.

**`<Eyebrow>`** removes the friction. `<Eyebrow>Step 5c</Eyebrow>` and the type + colour are guaranteed correct.

**`<AsteriskBreak>`** is a stronger case — the Brand Bible §6.2 defines the `✱` as a signature that appears in specific positions (between sections, essay ends, footer). If we don't codify it, someone six months from now uses a `*` or `❋` or `⁕` instead of `✱`, and the signature quietly fragments.

Two small components, one small step. Genuinely quick.

---

## Prerequisites

- ✅ Step 5b complete: Button component works, all four variants render.
- ✅ Latest commit on GitHub is `feat(step-05b): add Button component with four variants`.
- ✅ Git working tree clean.

---

## Files this step creates or modifies

**Creates:**
- `components/ui/Eyebrow.tsx` — the eyebrow label component (2 colour variants)
- `components/ui/AsteriskBreak.tsx` — the `✱` section signature component

**Modifies:**
- `app/[locale]/page.tsx` — refactors existing eyebrows to use `<Eyebrow>`, adds one `<AsteriskBreak>` between sections to verify it renders correctly

**Does NOT touch:**
- Anything else. This is a codify-what-exists step.

---

## How to run

1. Save this file to `C:\Users\offic\Projects\ots-website\prompts\STEP_05c_Eyebrow_and_AsteriskBreak.md`.
2. Open VS Code, open Claude Code panel.
3. **Start a new session** ("+ New session").
4. Copy the entire prompt block below and paste into Claude Code.
5. Approve commands as they come.
6. When Task 5 pauses, verify in browser — screenshot and paste back.

---

## THE PROMPT — paste this into Claude Code

```
You are executing Step 5c of the OTS website build. This step creates two small utility components — Eyebrow and AsteriskBreak — and refactors the home page to use them.

Follow this plan exactly. If anything fails or is unclear, pause and report — do not attempt fixes without asking.

CONTEXT:
- Next.js 16, App Router, Server Components by default.
- Existing components live at components/layout/ (Section, Container) and components/ui/ (Button).
- The `type-label` utility already exists in app/globals.css (Step 3b) with uppercase, 0.14em letter-spacing, Inter 600 at 11px.
- The `✱` (U+2731) character is well-supported in modern browsers and doesn't require a special font.

TASK 1 — Verify prerequisites.
Report:
- `pwd` → confirm ots-website directory
- `git status` → confirm clean (only STEP_05c as untracked is fine)
- `git log --oneline -3` → confirm last commit is `feat(step-05b): add Button component with four variants`
- Port 3000 check with if/else output PORT_FREE or PORT_OCCUPIED. Kill any orphan.

Pause for my approval before proceeding.

TASK 2 — Create the Eyebrow component.
Create a new file at `components/ui/Eyebrow.tsx` with this exact content:

import { ReactNode, HTMLAttributes } from 'react';

type EyebrowColor = 'accent' | 'muted';

interface EyebrowProps extends HTMLAttributes<HTMLParagraphElement> {
  children: ReactNode;
  color?: EyebrowColor;
}

const colorClasses: Record<EyebrowColor, string> = {
  accent: 'text-accent',
  muted: 'text-muted',
};

/**
 * Eyebrow — the small uppercase label that appears above section titles.
 *
 * Brand Bible v2 §4.2: uses the type-label style (Inter 600, 11px, 0.14em
 * letter-spacing, uppercase). Default colour is accent — the standard
 * "section eyebrow" pattern. Use color="muted" for design-system reference
 * labels (e.g., labels-on-labels in a type showcase).
 *
 * Usage:
 *   <Eyebrow>Step 5c — Small utilities</Eyebrow>
 *   <Eyebrow color="muted" className="mb-4">type-hero</Eyebrow>
 */
export function Eyebrow({
  children,
  color = 'accent',
  className = '',
  ...rest
}: EyebrowProps) {
  const classes = ['type-label', colorClasses[color], className]
    .filter(Boolean)
    .join(' ');

  return (
    <p className={classes} {...rest}>
      {children}
    </p>
  );
}

Confirm the file was written.

TASK 3 — Create the AsteriskBreak component.
Create a new file at `components/ui/AsteriskBreak.tsx` with this exact content:

interface AsteriskBreakProps {
  className?: string;
}

/**
 * AsteriskBreak — the ✱ OTS section signature.
 *
 * Brand Bible v2 §6.2: "The asterisk is the OTS section signature. A single
 * character between sections, at the end of essays, and as a footer mark.
 * Never decorative — always semantically 'here's a pause.'"
 *
 * Renders as a centered accent-orange asterisk with generous vertical padding.
 * The padding creates the breath around it — the pause is the point.
 *
 * Sits BETWEEN sections in the JSX tree, not inside them:
 *   <Section>...</Section>
 *   <AsteriskBreak />
 *   <Section>...</Section>
 *
 * The asterisk is marked aria-hidden — it's a visual mark, not information.
 */
export function AsteriskBreak({ className = '' }: AsteriskBreakProps) {
  const classes = [
    'flex justify-center',
    'py-16 lg:py-24',
    'bg-cream',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes} aria-hidden="true">
      <span className="text-5xl text-accent leading-none">✱</span>
    </div>
  );
}

Confirm the file was written.

TASK 4 — Refactor app/[locale]/page.tsx to use the new components.
Replace the entire contents of `app/[locale]/page.tsx` with this exact content:

import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { AsteriskBreak } from '@/components/ui/AsteriskBreak';

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('home');
  const otherLocale: 'nl' | 'en' = locale === 'nl' ? 'en' : 'nl';
  const otherLocaleLabel = locale === 'nl' ? 'English' : 'Nederlands';

  return (
    <main>
      {/* Hero — cream */}
      <Section>
        <Container className="text-center">
          {/* Language toggle */}
          <div className="mb-16 flex items-center justify-center gap-4 flex-wrap">
            <span className="type-caption text-muted">
              {t('current_language_label')}: {t('language_name')}
            </span>
            <Button variant="ghost" href="/" locale={otherLocale}>
              {t('switch_to')} {otherLocaleLabel}
            </Button>
          </div>

          <Eyebrow className="mb-8">{t('eyebrow')}</Eyebrow>

          <h1 className="type-hero mb-10 max-w-4xl mx-auto">
            {t('tagline_part1')}{' '}
            <span className="type-accent-word">{t('tagline_accent')}</span>{' '}
            {t('tagline_part2')}
          </h1>

          <p className="type-body-lg text-ink-soft max-w-2xl mx-auto mb-12">
            {t('subhead')}
          </p>

          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Button variant="primary">Request an Audit</Button>
            <Button variant="secondary">Book a Discovery call</Button>
          </div>
        </Container>
      </Section>

      {/* OTS section signature — sits between sections as a visual pause */}
      <AsteriskBreak />

      {/* Button variants showcase — cream-deep */}
      <Section background="cream-deep">
        <Container>
          <Eyebrow className="mb-6">Step 5b — Button variants</Eyebrow>
          <h2 className="type-h2 mb-10 max-w-3xl">
            Four buttons.{' '}
            <span className="type-accent-word">One</span> component.
          </h2>

          <div className="space-y-10">
            <div className="flex items-center gap-8 flex-wrap">
              <Eyebrow color="muted" className="min-w-32">Primary</Eyebrow>
              <Button variant="primary">Request an Audit</Button>
            </div>

            <div className="flex items-center gap-8 flex-wrap">
              <Eyebrow color="muted" className="min-w-32">Secondary</Eyebrow>
              <Button variant="secondary">Book a Discovery call</Button>
            </div>

            <div className="flex items-center gap-8 flex-wrap">
              <Eyebrow color="muted" className="min-w-32">Ghost</Eyebrow>
              <Button variant="ghost">Read more</Button>
            </div>

            <div className="flex items-center gap-8 flex-wrap">
              <Eyebrow color="muted" className="min-w-32">Nav</Eyebrow>
              <Button variant="nav">Request an Audit</Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* Buttons on dark — night */}
      <Section background="night">
        <Container>
          <Eyebrow className="mb-6">Buttons on night background</Eyebrow>
          <h2 className="type-h2 mb-10 max-w-3xl">
            The same component adapts.
          </h2>

          <div className="flex items-center gap-4 flex-wrap">
            <Button variant="primary">Request an Audit</Button>
            <Button variant="secondary">Book a Discovery call</Button>
            <Button variant="ghost">Read more</Button>
          </div>
        </Container>
      </Section>

      {/* Step 5c demo — mist */}
      <Section background="mist">
        <Container>
          <Eyebrow className="mb-6">Step 5c — Eyebrow &amp; AsteriskBreak</Eyebrow>
          <h2 className="type-h2 mb-6 max-w-3xl">
            Two small utilities.
          </h2>
          <p className="type-body-lg max-w-2xl">
            Every eyebrow on this page — including the small &quot;PRIMARY&quot;,
            &quot;SECONDARY&quot; labels above — is now the same{' '}
            <code className="type-body-sm">Eyebrow</code> component, with a
            color variant for the muted labels. And the accent-orange asterisk
            between the hero and the Button section is <code className="type-body-sm">AsteriskBreak</code> —
            the OTS section signature per Brand Bible §6.2.
          </p>
        </Container>
      </Section>
    </main>
  );
}

Confirm the file was written.

TASK 5 — Start dev server and verify.
Run `npm run dev` in the background. Wait 15 seconds. Check whether http://localhost:3000/ and http://localhost:3000/en both return 200.

Report:
- Server startup on port 3000 (NOT 3001)
- HTTP status for `/` and `/en`
- Any compilation errors

If clean, pause and wait for my browser verification.

TASK 6 — Wait for user verification.
Pause here. I will visit http://localhost:3000/ to verify:
- All eyebrows (hero, section headers, small labels in Button showcase) render consistently
- The AsteriskBreak appears between hero and cream-deep sections as a centered accent-orange ✱ with generous vertical space
- The new Step 5c mist section renders correctly
- Nothing regressed from Step 5b

Once I say "verified", proceed to Task 7.

TASK 7 — Stop dev server. Kill orphans.

TASK 8 — Commit and push.
Run `git status` and report. Should see:
- New: components/ui/Eyebrow.tsx, components/ui/AsteriskBreak.tsx, prompts/STEP_05c_Eyebrow_and_AsteriskBreak.md
- Modified: app/[locale]/page.tsx

Stage all: `git add -A`

Commit with:
`feat(step-05c): add Eyebrow and AsteriskBreak utility components`

Push.

TASK 9 — Final report.

STEP 5c COMPLETE
- Components created: components/ui/Eyebrow.tsx (accent/muted variants), components/ui/AsteriskBreak.tsx
- app/[locale]/page.tsx: refactored — all eyebrows use <Eyebrow>, AsteriskBreak inserted between hero and Button showcase, Step 5c demo section added on mist background
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

### Check 1 — All eyebrows look consistent

Visit `http://localhost:3000/`. Every small orange uppercase label on the page — the hero eyebrow, "Step 5b — Button variants", "Buttons on night background", "Step 5c — Eyebrow & AsteriskBreak" — should look **identical** in style. Same size, same weight, same letter-spacing, same color. That consistency is what codification buys you.

### Check 2 — The muted eyebrows in the Button showcase

In the Button showcase section (cream-deep), the small labels next to each button — "PRIMARY", "SECONDARY", "GHOST", "NAV" — should be uppercase in a **muted gray**, not accent orange. Same size and letter-spacing as the accent eyebrows, but visually secondary. This is `<Eyebrow color="muted">` working.

### Check 3 — The AsteriskBreak

Between the hero section and the Button showcase section, there should be a **strip of cream background** containing a centered **large accent-orange `✱`** with generous vertical space around it. The mark should feel like a pause, not a decoration — you should intuitively feel "the section is ending" before you reach the next colored section.

If the asterisk looks like a plain `*` or a strange character box, the Unicode character didn't render — tell me.

### Check 4 — Nothing regressed

Buttons still work. Language toggle still switches locale. Type-scale still consistent. Take a moment to scroll the whole page and confirm.

### Check 5 — Screenshot

Screenshot the asterisk break specifically (between hero and Button showcase). And screenshot the muted eyebrows in the Button showcase if possible. Paste back.

### Check 6 — Tell Claude Code to commit

If everything looks correct, paste:

```
Verified — all eyebrows render consistently (accent and muted variants), the AsteriskBreak displays as a centered accent-orange ✱ with generous vertical breath between hero and Button showcase sections, and the new Step 5c mist section renders correctly. Nothing regressed from Step 5b. Please stop the dev server and continue with Tasks 7, 8, and 9.
```

---

## If something goes wrong

**The asterisk shows as a plain `*` or a weird character.**
The Unicode character `✱` (U+2731) isn't in the default font's glyph coverage. Ask Claude Code to change the character to `∗` (U+2217, asterisk operator) or `❋` (U+274B) — either usually renders reliably.

**Eyebrow color="muted" shows accent orange anyway.**
The `colorClasses` map has a typo, or `text-muted` isn't a valid Tailwind class. Verify `--color-muted` is still in the @theme block in globals.css. Paste globals.css to me if in doubt.

**The AsteriskBreak has no vertical space around it.**
The `py-16 lg:py-24` classes aren't applying. Hard-refresh the browser (Ctrl+Shift+R). If still broken, inspect the element in browser dev tools and see what classes are on the div.

**TypeScript error about Eyebrow's HTMLAttributes.**
Should be `HTMLAttributes<HTMLParagraphElement>` since Eyebrow renders as `<p>`. If Claude Code wrote something else, that's the fix.

**Anything else.**
Paste the exact error and the current contents of the file that caused it.

---

## What comes next

Once all six checks pass:

- ✅ Eyebrow renders consistently in accent and muted variants
- ✅ AsteriskBreak displays as a centered accent-orange ✱ between sections
- ✅ Nothing regressed
- ✅ Commit visible on GitHub

Come back and say:

> **"Step 5c done. Give me Step 5d."**

**Step 5d** is the **ScrollIndicator** — the rotating "SCROLL · DOWN" badge that sits in the Hero's bottom-right corner. It's the first component with real animation (Framer Motion for rotation, scroll-based opacity fade). More substantive than 5c, but still a single component.

After 5d, Step 6 begins the **Navigation** — the site's persistent top bar, first real production UI.

---

**Step 05c · Eyebrow & AsteriskBreak · v1.0 (Claude Code-driven)**
*Behind every smooth business is a better system.*
