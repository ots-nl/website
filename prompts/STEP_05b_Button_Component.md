# STEP 05b — Button Component

**Project:** Ontwikkeling Tech Services — Marketing Website
**Type:** Claude Code prompt
**Estimated time:** 20–30 minutes
**Owner:** Virat
**Version:** 1.0

---

## Goal

Create a single `<Button>` React component that handles all four variants from Brand Bible §4.5 — `primary`, `secondary`, `ghost`, `nav` — and works as either a `<button>` element (for actions) or a locale-aware `<Link>` (for navigation).

By the end of this step, every future CTA on the site is one line:

```tsx
<Button variant="primary" href="/contact">Request an Audit</Button>
```

The variant, arrow behavior, hover state, and locale handling are all correct automatically.

---

## Context

- References Brand Bible v2 §4.5 (button system), §4.7 (motion), PRD §2.5 (button spec).
- Buttons appear in every section — Hero, Service ladder, Final CTA, essays, Contact. Centralising them prevents 15 slightly-different button styles at launch.
- Uses `type-button` utility from Step 3b for typography and existing `rounded-pill` token from Step 2b.

---

## Why one component with four variants (not four components)

Two design forces meet here:

1. **Buttons must be interchangeable.** A "Request an Audit" CTA is sometimes primary (Hero, Final CTA), sometimes secondary (Services page, next to another primary). If they're separate components, changing which is which means editing the component name in JSX. If they're one component with a `variant` prop, it's one string change.

2. **Buttons must sometimes be links.** *"Request an Audit"* triggers navigation to Contact — semantically a link, but visually a button. *"Verstuur"* on the contact form is a real form submit — semantically a button. One component that swaps between `<button>` and `<Link>` based on whether `href` is provided keeps the mental model simple.

**Type discipline:** the component uses a discriminated union — when `href` is present, TypeScript won't let you pass `onClick`, and vice versa. Prevents the "am I making an action or a navigation?" ambiguity that ships bugs.

---

## Prerequisites

- ✅ Step 5a complete: Section and Container components work.
- ✅ Latest commit is `feat(step-05a): add Section and Container layout components`.
- ✅ Git working tree clean.

---

## Files this step creates or modifies

**Creates:**
- `components/ui/Button.tsx` — the Button component

**Modifies:**
- `app/[locale]/page.tsx` — refactors to use Button throughout: hero CTAs (Request an Audit + Book a Discovery call), language toggle as ghost variant, adds a Button showcase demo section

**Does NOT touch:**
- `components/layout/*`, `app/globals.css`, `i18n/*`, or anything else.

---

## How to run

1. Save this file to `C:\Users\offic\Projects\ots-website\prompts\STEP_05b_Button_Component.md`.
2. Open VS Code, open Claude Code panel.
3. **Start a new session** ("+ New session").
4. Copy the entire prompt block below and paste into Claude Code.
5. Approve commands as they come.
6. When Task 5 pauses, verify in browser — including hover states on the ghost variant.
7. Screenshot and send back.

---

## THE PROMPT — paste this into Claude Code

```
You are executing Step 5b of the OTS website build. This step creates the Button component with four variants (primary, secondary, ghost, nav) and updates the home page to use it.

Follow this plan exactly. If anything fails or is unclear, pause and report.

CONTEXT:
- The project uses Next.js 16 with the App Router (Server Components by default).
- The Section, Container components exist at components/layout/ (Step 5a).
- next-intl's locale-aware Link is imported from ../../i18n/navigation.
- The `type-button` class exists in app/globals.css (Step 3b) with Inter 500, 13px, tight letter-spacing.
- The button component will be a Client Component (uses onClick, hover) — needs 'use client' directive.

TASK 1 — Verify prerequisites.
Report:
- `pwd` → confirm ots-website directory
- `git status` → confirm clean (only STEP_05b as untracked is fine)
- `git log --oneline -3` → confirm last commit is `feat(step-05a): add Section and Container layout components`
- Port 3000 check with if/else output PORT_FREE or PORT_OCCUPIED. Kill any orphan.

Pause for my approval before proceeding.

TASK 2 — Create the Button component.
Create a new file at `components/ui/Button.tsx` with this exact content:

'use client';

import { ReactNode } from 'react';
import { Link } from '../../i18n/navigation';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'nav';
type SupportedLocale = 'nl' | 'en';

interface ButtonBaseProps {
  children: ReactNode;
  variant?: ButtonVariant;
  hideArrow?: boolean;
  className?: string;
}

// Link mode — when href is provided, renders as next-intl Link (internal) or <a> (external).
interface ButtonAsLinkProps extends ButtonBaseProps {
  href: string;
  external?: boolean;
  locale?: SupportedLocale;
  type?: never;
  onClick?: never;
  disabled?: never;
}

// Button mode — no href, renders as <button>.
interface ButtonAsButtonProps extends ButtonBaseProps {
  href?: never;
  external?: never;
  locale?: never;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  disabled?: boolean;
}

type ButtonProps = ButtonAsLinkProps | ButtonAsButtonProps;

/**
 * variantClasses — Brand Bible v2 §4.5.
 * 
 * primary: accent orange pill, cream text, translateY(-1px) on hover.
 * secondary: transparent with 1px ink border, ink text, inverts on hover.
 * ghost: no background, underline draws in left-to-right via scaleX pseudo-element.
 * nav: accent pill, compact padding (for navigation only).
 */
const variantClasses: Record<ButtonVariant, string> = {
  primary: [
    'type-button',
    'inline-flex items-center gap-2',
    'rounded-pill',
    'bg-accent text-cream',
    'px-7 py-3.5',
    'transition-all duration-300 ease-out',
    'hover:bg-accent-deep hover:-translate-y-px',
    'active:translate-y-0',
    'disabled:opacity-50 disabled:pointer-events-none',
  ].join(' '),

  secondary: [
    'type-button',
    'inline-flex items-center gap-2',
    'rounded-pill',
    'bg-transparent border border-current',
    'px-7 py-3.5',
    'transition-all duration-300 ease-out',
    'hover:-translate-y-px',
    'active:translate-y-0',
    'disabled:opacity-50 disabled:pointer-events-none',
  ].join(' '),

  ghost: [
    'type-button',
    'inline-flex items-center gap-1',
    'text-current',
    'relative py-1',
    'after:content-[""]',
    'after:absolute after:bottom-0 after:left-0',
    'after:h-px after:w-full',
    'after:origin-left after:scale-x-0',
    'after:bg-current',
    'after:transition-transform after:duration-300 after:ease-out',
    'hover:after:scale-x-100',
  ].join(' '),

  nav: [
    'type-button',
    'inline-flex items-center gap-2',
    'rounded-pill',
    'bg-accent text-cream',
    'px-6 py-2.5',
    'transition-colors duration-300 ease-out',
    'hover:bg-accent-deep',
  ].join(' '),
};

export function Button(props: ButtonProps) {
  const {
    children,
    variant = 'primary',
    hideArrow = false,
    className = '',
  } = props;

  const showArrow =
    !hideArrow &&
    (variant === 'primary' || variant === 'secondary' || variant === 'ghost');
  const arrowSymbol = variant === 'ghost' ? '→' : '↗';

  const classes = [variantClasses[variant], className]
    .filter(Boolean)
    .join(' ');

  const content = (
    <>
      <span>{children}</span>
      {showArrow && (
        <span aria-hidden="true" className="text-[14px]">
          {arrowSymbol}
        </span>
      )}
    </>
  );

  // Link mode — external URL
  if ('href' in props && props.href && props.external) {
    return (
      <a
        href={props.href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
      >
        {content}
      </a>
    );
  }

  // Link mode — internal (locale-aware)
  if ('href' in props && props.href) {
    return (
      <Link
        href={props.href}
        locale={props.locale}
        className={classes}
      >
        {content}
      </Link>
    );
  }

  // Button mode
  return (
    <button
      type={props.type ?? 'button'}
      onClick={props.onClick}
      disabled={props.disabled}
      className={classes}
    >
      {content}
    </button>
  );
}

Confirm the file was written.

TASK 3 — Rewrite app/[locale]/page.tsx to use the Button component.
Replace the entire contents of `app/[locale]/page.tsx` with this exact content:

import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';

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
          {/* Language toggle — ghost variant */}
          <div className="mb-16 flex items-center justify-center gap-4 flex-wrap">
            <span className="type-caption text-muted">
              {t('current_language_label')}: {t('language_name')}
            </span>
            <Button variant="ghost" href="/" locale={otherLocale}>
              {t('switch_to')} {otherLocaleLabel}
            </Button>
          </div>

          <p className="type-label text-accent mb-8">{t('eyebrow')}</p>

          <h1 className="type-hero mb-10 max-w-4xl mx-auto">
            {t('tagline_part1')}{' '}
            <span className="type-accent-word">{t('tagline_accent')}</span>{' '}
            {t('tagline_part2')}
          </h1>

          <p className="type-body-lg text-ink-soft max-w-2xl mx-auto mb-12">
            {t('subhead')}
          </p>

          {/* Real CTAs — will link to /contact once we build that page */}
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Button variant="primary">Request an Audit</Button>
            <Button variant="secondary">Book a Discovery call</Button>
          </div>
        </Container>
      </Section>

      {/* Button variants showcase — cream-deep */}
      <Section background="cream-deep">
        <Container>
          <p className="type-label text-accent mb-6">
            Step 5b — Button variants
          </p>
          <h2 className="type-h2 mb-10 max-w-3xl">
            Four buttons.{' '}
            <span className="type-accent-word">One</span> component.
          </h2>

          <div className="space-y-10">
            <div className="flex items-center gap-8 flex-wrap">
              <p className="type-label text-muted min-w-32">Primary</p>
              <Button variant="primary">Request an Audit</Button>
            </div>

            <div className="flex items-center gap-8 flex-wrap">
              <p className="type-label text-muted min-w-32">Secondary</p>
              <Button variant="secondary">Book a Discovery call</Button>
            </div>

            <div className="flex items-center gap-8 flex-wrap">
              <p className="type-label text-muted min-w-32">Ghost</p>
              <Button variant="ghost">Read more</Button>
            </div>

            <div className="flex items-center gap-8 flex-wrap">
              <p className="type-label text-muted min-w-32">Nav</p>
              <Button variant="nav">Request an Audit</Button>
            </div>
          </div>

          <p className="type-body-sm text-muted mt-12 max-w-xl">
            Hover each button to see the transitions: primary shifts to
            accent-deep and lifts by 1px, secondary lifts, ghost draws an
            underline from left to right, nav shifts colour.
          </p>
        </Container>
      </Section>

      {/* Buttons on dark — night */}
      <Section background="night">
        <Container>
          <p className="type-label text-accent mb-6">
            Buttons on night background
          </p>
          <h2 className="type-h2 mb-10 max-w-3xl">
            The same component adapts.
          </h2>

          <div className="flex items-center gap-4 flex-wrap">
            <Button variant="primary">Request an Audit</Button>
            <Button variant="secondary">Book a Discovery call</Button>
            <Button variant="ghost">Read more</Button>
          </div>

          <p className="type-body-sm text-muted mt-12 max-w-xl">
            The secondary and ghost variants use border-current and text-current
            respectively — so on night sections they inherit cream automatically.
            No conditional colour logic required.
          </p>
        </Container>
      </Section>
    </main>
  );
}

Confirm the file was written.

TASK 4 — Start dev server and verify.
Run `npm run dev` in the background. Wait 15 seconds. Check whether http://localhost:3000/ and http://localhost:3000/en both return 200.

Report:
- Server startup on port 3000 (NOT 3001)
- HTTP status for `/` and `/en`
- Any compilation errors — pay particular attention to TypeScript errors from the Button's discriminated union types

If everything is clean, pause and wait for browser verification. If any errors, report exactly.

TASK 5 — Wait for user verification.
Pause here. I will visit http://localhost:3000/ and verify:
- All four button variants render distinctly
- Hover states work (translateY, colour shift, ghost underline draw-in)
- Buttons adapt correctly on night background (border-current, text-current)
- Language toggle uses ghost variant and switches locale
- No layout regressions from Step 5a

Once I say "verified", proceed to Task 6.

TASK 6 — Stop dev server, kill any lingering process.

TASK 7 — Commit and push.
Run `git status` and report. Should see:
- New: components/ui/Button.tsx, prompts/STEP_05b_Button_Component.md
- Modified: app/[locale]/page.tsx

Stage all: `git add -A`

Commit with:
`feat(step-05b): add Button component with four variants`

Push.

TASK 8 — Final report.

STEP 5b COMPLETE
- Component created: components/ui/Button.tsx (four variants, link/button mode, discriminated union types)
- app/[locale]/page.tsx: refactored — real CTAs in hero, language toggle as ghost, two demo sections showing all variants and dark-background adaptation
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

### Check 1 — Hero has real CTAs

Visit `http://localhost:3000/`. In the hero, below the subhead, you should now see two buttons side-by-side:

- **Primary — "Request an Audit"** — accent orange pill with cream text, arrow ↗ on the right
- **Secondary — "Book a Discovery call"** — transparent with 1px ink border, ink text, arrow ↗

Hover each. Primary should **shift to `accent-deep` (a slightly darker orange)** and **lift by 1px**. Secondary should just **lift by 1px**.

### Check 2 — Language toggle uses ghost variant

At the top of the hero, the language toggle should now look different from before. Instead of a pill button, it should be **plain text** with a small **→ arrow**. On hover, an **underline should draw in from left to right**.

Click it. Should still switch locale correctly (`/` → `/en` and back).

### Check 3 — The button showcase section (cream-deep)

Scroll down to the "Step 5b — Button variants" section. You should see all four variants labeled and demonstrated:

- Primary — accent pill
- Secondary — outline pill
- Ghost — plain text with underline on hover
- Nav — smaller accent pill (used for navigation)

**Hover each one** and observe the transitions:
- Primary: colour + lift
- Secondary: lift
- Ghost: underline draws in
- Nav: colour shift only (no lift)

### Check 4 — Buttons on night background

Scroll down to the "Buttons on night background" section. Verify:

- **Primary** — same accent orange (accent stays constant on any background)
- **Secondary** — now has a **CREAM border and CREAM text** (not ink). This proves `border-current` and `text-current` are working — the button inherits the section's default text colour.
- **Ghost** — cream text with cream underline on hover

Hover the secondary on night. It should lift by 1px but the colours should stay cream (which is fine for now — the "invert on hover" behavior can be added later if needed).

### Check 5 — Verify TypeScript discipline (bonus, optional)

In VS Code, open `app/[locale]/page.tsx`. Try adding this line inside the JSX to see the type system catch it:

```tsx
<Button variant="primary" href="/x" onClick={() => alert('test')}>Test</Button>
```

You should see a **red TypeScript error** — because when `href` is provided, `onClick` is typed as `never`. This is the discriminated union preventing "am I an action or a link?" ambiguity. Remove the line before continuing.

### Check 6 — Screenshot

Screenshot the page — either full-page or two halves. Send back.

### Check 7 — Tell Claude Code to commit

If everything looks correct, paste:

```
Verified — all four button variants render distinctly with correct hover states. Primary shifts to accent-deep and lifts. Secondary lifts. Ghost draws in an underline left-to-right. Nav shifts colour. On the night background, secondary and ghost correctly inherit cream via border-current and text-current. Language toggle now uses ghost variant. Discriminated union types confirmed working. Please stop the dev server and continue with Tasks 6, 7, and 8.
```

---

## If something goes wrong

**TypeScript error: "Property 'locale' does not exist on type 'X'."**
The discriminated union isn't narrowing correctly. Ask Claude Code to show the exact error line and paste to me.

**Ghost button underline doesn't animate.**
Check that `after:` classes are compiling. In browser dev tools, inspect the ghost button and look for `::after` in the pseudo-element list. If missing, Tailwind isn't recognising the arbitrary variants. Try a hard refresh (Ctrl+Shift+R).

**Secondary button on night shows ink border/text (not cream).**
The `border-current` class isn't inheriting from the parent section. Verify the Section component's night classes still include `text-cream` at the section level.

**"'use client' is required" error.**
The Button uses onClick and interactive state, so it must be a Client Component. Verify the first line of `Button.tsx` is exactly `'use client';` (with semicolon).

**Language toggle no longer switches locales.**
The Button component may not be passing `locale` through to Link correctly. Ask Claude Code to show the Link render branch and paste.

**Anything else.**
Paste the exact error and the current contents of the file that caused it.

---

## What comes next

Once all seven checks pass:

- ✅ All four variants render with correct hover states
- ✅ Buttons adapt to dark backgrounds via currentColor
- ✅ TypeScript discipline enforced (link vs button)
- ✅ Language toggle works via ghost variant
- ✅ Commit visible on GitHub

Come back and say:

> **"Step 5b done. Give me Step 5c."**

**Step 5c** is smaller — the **Eyebrow** and **AsteriskBreak** utilities. Eyebrow standardises the small orange uppercase labels that appear above every section title (currently you're writing `<p className="type-label text-accent mb-6">` every time). AsteriskBreak is the `✱` signature that appears between essay sections and as a footer mark. Both are 10-line components each — quick step, mostly discipline.

Then Step 5d is the ScrollIndicator (the rotating "SCROLL · DOWN" badge in the Hero). After that, Step 6 is the Navigation bar — where the site starts to look like a real product.

---

**Step 05b · Button Component · v1.0 (Claude Code-driven)**
*Behind every smooth business is a better system.*
