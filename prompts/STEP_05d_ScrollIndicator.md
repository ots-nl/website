# STEP 05d — ScrollIndicator

**Project:** Ontwikkeling Tech Services — Marketing Website
**Type:** Claude Code prompt
**Estimated time:** 30–40 minutes
**Owner:** Virat
**Version:** 1.0

---

## Goal

Create the **ScrollIndicator** — a small rotating badge with the text "SCROLL · DOWN · SCROLL · DOWN ·" curved around a circle, with a downward arrow in the center. Sits in the Hero's bottom-right corner. Rotates continuously (slow), fades out on scroll.

By the end of this step, the shared component library is complete. Step 6 (Navigation) is next — the first real production UI.

---

## Context

- References Brand Bible v2 §4.5 (scroll indicator described) and §4.7 (motion principles — considered, slow, purposeful).
- **First component with actual animation** — uses CSS keyframes for the continuous rotation and Framer Motion for scroll-based fade.
- Framer Motion was installed in Step 1.

---

## Why this component matters even though it's tiny

Everything else in the design system so far is static — colors, type, layouts, buttons, eyebrows. The ScrollIndicator is the first place where motion enters the site.

Motion is not decoration. Per Brand Bible §4.7: *"Motion signals affordance and rhythm. Something rotating slowly says 'this is alive, this is a system, keep looking.' Something jittery or bouncy says 'I'm a toy.' We are never a toy."*

The ScrollIndicator sits in the Hero and its slow continuous rotation is the visual proof that the site is alive and considered. When you scroll past the hero, it fades away — because its job is done.

Getting the motion character right here sets the pattern for every future animation.

---

## What it looks like

- **Size:** approximately 96×96px circle
- **Position:** absolutely positioned inside the Hero, bottom-right corner, with 32px padding from the edges
- **Rotation:** the text "SCROLL · DOWN · SCROLL · DOWN ·" wraps around the circle, rotating clockwise at 20 seconds per revolution (very slow — intentional)
- **Center content:** a small downward arrow `↓` in accent orange
- **Scroll behavior:** opacity fades from 1 → 0 as you scroll from 0 → 400px down the page
- **Reduced motion:** respects `prefers-reduced-motion` — no rotation, just a static badge

---

## Two technical decisions worth naming

**1. Text curved around a circle using SVG textPath.**

There are two ways to make text curve around a circle: (a) manually rotating each letter with CSS transforms, or (b) SVG's `<textPath>` with a circular path. Option B is dramatically cleaner and better for accessibility (screen readers can still read the text linearly).

We use SVG textPath.

**2. Two separate animations.**

The rotation is a CSS `@keyframes` animation (runs forever, doesn't care about scroll position). The opacity fade is a Framer Motion `useScroll` + `useTransform` (needs React state to track scroll position). These are separate concerns, so they use different tools — each tool doing what it's best at.

---

## Prerequisites

- ✅ Step 5c complete: Eyebrow and AsteriskBreak render correctly.
- ✅ Latest commit on GitHub is `feat(step-05c): add Eyebrow and AsteriskBreak utility components`.
- ✅ Git working tree clean.
- ✅ `framer-motion` is installed (from Step 1).

---

## Files this step creates or modifies

**Creates:**
- `components/ui/ScrollIndicator.tsx` — the component
- Adds a CSS keyframe animation to `app/globals.css`

**Modifies:**
- `app/[locale]/page.tsx` — adds the ScrollIndicator to the Hero section

**Does NOT touch:**
- Anything else.

---

## How to run

1. Save this file to `C:\Users\offic\Projects\ots-website\prompts\STEP_05d_ScrollIndicator.md`.
2. Open VS Code, open Claude Code panel.
3. **Start a new session** ("+ New session").
4. Copy the entire prompt block below and paste into Claude Code.
5. Approve commands as they come.
6. When Task 6 pauses, verify in browser — including scrolling to see the fade.

---

## THE PROMPT — paste this into Claude Code

```
You are executing Step 5d of the OTS website build. This step creates the ScrollIndicator component — a rotating badge in the Hero that fades on scroll.

Follow this plan exactly. If anything fails or is unclear, pause and report — do not attempt fixes without asking.

CONTEXT:
- Next.js 16, App Router.
- Framer Motion is installed (from Step 1).
- The Hero section currently lives in app/[locale]/page.tsx. The ScrollIndicator will be added to it.
- The Hero's outer Section will need `relative` positioning so the ScrollIndicator can be `absolute`-positioned inside it.
- The component uses SVG textPath for curved text — this is the correct pattern for text-around-a-circle.
- The scroll-fade uses Framer Motion's useScroll + useTransform hooks — so this is a Client Component ('use client').
- Respect prefers-reduced-motion: no continuous rotation for users who opt out.

TASK 1 — Verify prerequisites.
Report:
- `pwd` → confirm ots-website directory
- `git status` → confirm clean (only STEP_05d as untracked is fine)
- `git log --oneline -3` → confirm last commit is `feat(step-05c): add Eyebrow and AsteriskBreak utility components`
- Port 3000 check with if/else output PORT_FREE or PORT_OCCUPIED. Kill any orphan.
- `cat package.json | grep framer-motion` → confirm framer-motion is installed and report the version

Pause for my approval before proceeding.

TASK 2 — Add the rotation keyframe to app/globals.css.
Open app/globals.css. The existing @layer components block currently contains .container-ots, .section-ots, and the type-* utilities. Add ONE new @keyframes definition at the top level of the file (NOT inside a @layer block), immediately after the closing brace of @layer components.

Add this exact content:

@keyframes rotate-slow {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

Do NOT rewrite any other part of globals.css. Show me the final state of globals.css to verify nothing else changed.

TASK 3 — Create the ScrollIndicator component.
Create a new file at `components/ui/ScrollIndicator.tsx` with this exact content:

'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';

/**
 * ScrollIndicator — the rotating badge in the Hero's bottom-right corner.
 *
 * Brand Bible v2 §4.5: a small circular indicator with curved text
 * ("SCROLL · DOWN · SCROLL · DOWN ·") rotating slowly around a
 * downward arrow. Fades out on scroll — its job ends once the user
 * has scrolled past the hero.
 *
 * Brand Bible v2 §4.7: motion is considered, not decorative. Slow
 * continuous rotation (20s per revolution) signals "alive system",
 * not "toy". Respects prefers-reduced-motion.
 */
export function ScrollIndicator() {
  const { scrollY } = useScroll();
  // Fade from opacity 1 to 0 as scroll goes from 0 to 400px.
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  // Check for reduced motion preference on mount.
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return (
    <motion.div
      style={{ opacity }}
      className="absolute bottom-8 right-8 z-10 pointer-events-none"
      aria-hidden="true"
    >
      <div className="relative w-24 h-24 flex items-center justify-center">
        {/* Rotating curved text — SVG with textPath */}
        <svg
          viewBox="0 0 100 100"
          className="absolute inset-0 w-full h-full"
          style={{
            animation: prefersReducedMotion
              ? 'none'
              : 'rotate-slow 20s linear infinite',
          }}
        >
          <defs>
            <path
              id="scroll-indicator-circle"
              d="M 50, 50 m -38, 0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0"
              fill="none"
            />
          </defs>
          <text
            className="type-label"
            style={{
              fontSize: '9px',
              letterSpacing: '0.28em',
              fill: 'var(--color-ink)',
            }}
          >
            <textPath href="#scroll-indicator-circle" startOffset="0%">
              SCROLL · DOWN · SCROLL · DOWN ·
            </textPath>
          </text>
        </svg>

        {/* Central downward arrow */}
        <span
          className="text-accent text-lg leading-none"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          ↓
        </span>
      </div>
    </motion.div>
  );
}

Confirm the file was written.

TASK 4 — Add the ScrollIndicator to the Hero section in page.tsx.
Open `app/[locale]/page.tsx`. The current Hero section is the first <Section> element without a background prop (default cream). Make TWO changes to that section:

Change 1: Add `className="relative"` to the Hero Section so it becomes a positioning context for the absolutely-positioned ScrollIndicator.

BEFORE:
      <Section>
        <Container className="text-center">

AFTER:
      <Section className="relative">
        <Container className="text-center">

Change 2: Add the ScrollIndicator import at the top of the file, and render the component inside the Hero Section (just before the closing </Section> tag).

Import to add (with the other component imports):
import { ScrollIndicator } from '@/components/ui/ScrollIndicator';

JSX to add inside the Hero Section, immediately before </Section>:
          <ScrollIndicator />

Show me the final contents of app/[locale]/page.tsx after these edits so I can verify no other changes were made.

TASK 5 — Start dev server and verify.
Run `npm run dev` in the background. Wait 15 seconds. Check whether http://localhost:3000/ and http://localhost:3000/en both return 200.

Report:
- Server startup on port 3000 (NOT 3001)
- HTTP status for `/` and `/en`
- Any compilation errors — pay particular attention to errors from Framer Motion, useScroll, or the 'use client' directive
- Any hydration warnings (Client Components rendered inside Server Components can occasionally cause these)

If clean, pause and wait for browser verification.

TASK 6 — Wait for user verification.
Pause here. I will visit http://localhost:3000/ to verify:
- A small circular badge appears in the bottom-right of the hero section
- The badge has "SCROLL · DOWN · SCROLL · DOWN ·" text curving around it
- A small orange ↓ arrow is centered inside
- The text rotates slowly (one full rotation every 20 seconds)
- When I scroll down, the badge fades out (fully invisible around 400px scroll)
- When I scroll back up, it fades in again

Once I say "verified", proceed to Task 7.

TASK 7 — Stop dev server. Kill orphans.

TASK 8 — Commit and push.
Run `git status` and report. Should see:
- New: components/ui/ScrollIndicator.tsx, prompts/STEP_05d_ScrollIndicator.md
- Modified: app/globals.css, app/[locale]/page.tsx

Stage all: `git add -A`

Commit with:
`feat(step-05d): add ScrollIndicator with rotating text and scroll fade`

Push.

TASK 9 — Final report.

STEP 5d COMPLETE
- Component created: components/ui/ScrollIndicator.tsx (Client Component with useScroll + useTransform, SVG textPath for curved text, prefers-reduced-motion support)
- app/globals.css: added rotate-slow @keyframes animation
- app/[locale]/page.tsx: Hero Section wrapped in `relative`, ScrollIndicator rendered inside
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

### Check 1 — The badge appears in the Hero

Visit `http://localhost:3000/`. In the **bottom-right corner of the hero** (the cream section with the tagline), you should see:

- A small **circular badge**, approximately 96×96px
- The text **"SCROLL · DOWN · SCROLL · DOWN ·"** wrapped around the circle
- A small **accent-orange `↓` arrow** in the center
- The whole thing feels subtle — not screaming for attention

### Check 2 — The rotation

Watch the badge for 5-10 seconds. The text should **slowly rotate clockwise**. A full rotation takes 20 seconds — deliberately slow. If it's rotating fast, or jittery, or spinning quickly, the animation duration is wrong.

The Brand Bible §4.7 says: *"slow continuous rotation signals 'alive system', not 'toy'."* This is where that principle is tested. If it looks like a toy spinner, we've failed.

### Check 3 — The scroll fade

**Scroll down slowly** (mouse wheel, trackpad, or arrow keys). The badge should **fade out** as you scroll — fully invisible by around 400px of scroll (about the point where the AsteriskBreak becomes visible).

**Scroll back up.** The badge should fade back in.

The fade should feel smooth, not sudden.

### Check 4 — The AsteriskBreak still renders correctly

Scroll down. Confirm the AsteriskBreak still appears between hero and Button showcase. Nothing regressed.

### Check 5 — Screenshots

Send:
1. **The Hero with the ScrollIndicator visible** (top of page, badge in bottom-right corner)
2. **Optional but nice: a mid-scroll screenshot** showing the badge partially faded

### Check 6 — Tell Claude Code to commit

If everything looks right, paste to Claude Code:

```
Verified — the ScrollIndicator renders in the bottom-right of the Hero, rotates slowly (visibly clockwise, deliberate pace not toy-spinner-fast), fades out on scroll (fully invisible by ~400px), fades back in on scroll up. The AsteriskBreak still renders correctly, no regressions. Please stop the dev server and continue with Tasks 7, 8, and 9.
```

---

## If something goes wrong

**The badge appears but doesn't rotate.**
The CSS keyframe wasn't added correctly, or the `animation: rotate-slow 20s linear infinite` inline style isn't applying. Ask Claude Code to show the current contents of `app/globals.css` (should have `@keyframes rotate-slow` at the top level, outside @layer components) and the SVG's `style` attribute in ScrollIndicator.tsx.

**The text is curved but overlaps at the seam.**
The `startOffset="0%"` on the textPath and the text length combined don't quite complete the circle. Fine for a first render — we can adjust the letter-spacing or trim the text if it bothers you visually.

**The badge doesn't fade on scroll.**
`useScroll` isn't tracking. Check that the component has `'use client';` as its first line. If missing, the hooks won't run.

**"Module not found: framer-motion".**
Package didn't install correctly in Step 1. Ask Claude Code to run `npm install framer-motion` again with the slow settings (`npm config set maxsockets 3` etc from Step 1 if antivirus is interfering).

**"Cannot use hooks in Server Component" error.**
The `'use client';` directive is missing from ScrollIndicator.tsx. Verify it's the very first line of the file.

**The badge is huge, or in the wrong position.**
The Hero Section doesn't have `relative` positioning, so `absolute` isn't anchored correctly. Verify `<Section className="relative">` in page.tsx.

**Hydration warning in the browser console.**
Framer Motion sometimes triggers these on first render. If harmless (page still works), ignore. If it's a hard error, paste the exact text to me.

**Anything else.**
Paste the exact error and the current contents of the file that caused it.

---

## What comes next

Once all six checks pass:

- ✅ ScrollIndicator visible in the Hero
- ✅ Rotates slowly (20s per revolution)
- ✅ Fades on scroll, restores on scroll up
- ✅ No regressions to existing sections
- ✅ Commit visible on GitHub

Come back and say:

> **"Step 5d done. Give me Step 6."**

**Step 6 is the Navigation** — the site's persistent top bar. Logo on the left, three links (Services, About, Essays), language toggle, "Request an Audit" nav CTA on the right. Sticky on scroll, backdrop-blur on background sections. First real production UI — the moment the site starts looking like an actual product, not a design system demo.

Step 6 is bigger than 5d — closer to 60-90 minutes. But you'll have full session budget and the whole shared component library ready to compose.

---

**Step 05d · ScrollIndicator · v1.0 (Claude Code-driven)**
*Behind every smooth business is a better system.*
