# STEP 02b — Layout Primitives & Motion Base

**Project:** Ontwikkeling Tech Services — Marketing Website
**Type:** Claude Code prompt
**Estimated time:** 15–25 minutes
**Owner:** Virat
**Version:** 1.0

---

## Goal

Expand the design token system with border-radius tokens and add two reusable layout primitives (`.container-ots` and `.section-ots`) that every future page section will use. Add base accessibility rules — reduced-motion support and accent-coloured text selection.

By the end of this step, every future step can use `bg-cream`, `rounded-card`, `.container-ots`, `.section-ots` — a consistent vocabulary for building the site.

---

## Context

- References Brand Bible v2 §4.3 (spacing and layout), §4.4 (border radius), §4.7 (motion principles).
- References PRD v1.1 §2.4 (spacing and layout table).
- This step continues the pattern from Step 2a — extending the Tailwind v4 `@theme` block, not creating new files.
- **Motion tokens (easing curves, animation durations) are deferred to a later step** when we actually start writing animations. Setting them up prematurely without using them clutters the token system.

---

## Why these primitives now

Every future page section will need:

1. **A container** that respects the max-width (1280px) with responsive side padding.
2. **A section** with the consistent vertical rhythm (128px desktop, 80px mobile).

If we don't build these as reusable primitives now, every future step will re-invent the same padding and max-width logic — and small inconsistencies will creep in. The Brand Bible's discipline about generous whitespace is only maintained if the discipline is baked into shared primitives.

**`.container-ots` and `.section-ots`** solve this. From Step 3a onwards, every section will look like:

```tsx
<section className="section-ots bg-cream">
  <div className="container-ots">
    {/* content */}
  </div>
</section>
```

Clean. Consistent. Impossible to accidentally break.

---

## Prerequisites

- ✅ Step 2a complete: cream background renders at `localhost:3000`, all four colour pills visible.
- ✅ Latest commit on GitHub is `feat(step-02a): configure Tailwind v4 with OTS brand tokens`.
- ✅ Git working tree is clean.
- ✅ VS Code open, Claude Code panel accessible.
- ✅ No orphaned dev server processes running (Task 1 of the prompt below verifies this).

---

## Files this step modifies

- `app/globals.css` — extends `@theme` with border radius tokens; adds `@layer components` with layout primitives; adds `@layer base` accessibility rules
- `app/page.tsx` — updates verification test to use the new primitives (card demo, pill button demo)

**Files this step does NOT touch:**
- `app/layout.tsx`, `.gitignore`, `README.md`, `prompts/`, anything else

---

## How to run this step

1. Save this file into `C:\Users\offic\Projects\ots-website\prompts\STEP_02b_Layout_Primitives_and_Motion_Base.md`.
2. Open VS Code, open the Claude Code panel.
3. Start a **new session** (click "+ New session" — always start fresh so old context doesn't confuse things).
4. Copy the entire prompt block below.
5. Paste it into Claude Code and send.
6. Approve each command as Claude Code proposes it.
7. When Claude Code says the dev server is running, verify the page in your browser.
8. Tell Claude Code to commit, and verify on GitHub.

---

## THE PROMPT — paste this into Claude Code

```
You are executing Step 2b of the OTS website build. This step extends the design token system with border radius tokens and adds two reusable layout primitives (`.container-ots` and `.section-ots`) plus base accessibility rules.

Follow this plan exactly. Do not add extra styles, tokens, or components beyond what is listed. If anything is unclear or a step fails, pause and report to me.

CONTEXT:
The project uses Tailwind CSS v4, configured through the `@theme` block in `app/globals.css`. Tailwind v4 automatically generates utility classes from `--radius-*` variables (e.g., `--radius-card: 20px` becomes `rounded-card`).

TASK 1 — Verify prerequisites and clean any zombie processes.
Run these checks and report the output:
- `pwd` to confirm we're in the `ots-website` directory
- `git status` to confirm the working tree is clean (or only has STEP_02b as untracked)
- `git log --oneline -3` to confirm the last commit is `feat(step-02a): configure Tailwind v4 with OTS brand tokens`

Then check for orphaned Node.js processes on port 3000:
- Run `Get-NetTCPConnection -LocalPort 3000 -ErrorAction SilentlyContinue`
- If ANY process is bound to port 3000, run `taskkill /PID <that-PID> /F` to kill it.
- Verify port 3000 is free.

Report the output of all checks. Pause for my approval before proceeding.

TASK 2 — Rewrite app/globals.css with the expanded token system.
Replace the entire contents of `app/globals.css` with this exact content:

@import "tailwindcss";

@theme {
  /* Colour tokens — from OTS Brand Bible v2 §4.1 */

  /* Backgrounds */
  --color-cream: #FAF6EE;
  --color-cream-deep: #F2EBDA;
  --color-night: #0E0B08;
  --color-night-soft: #1A1612;

  /* Text */
  --color-ink: #141210;
  --color-ink-soft: #2C2822;
  --color-muted: #8A7F6E;

  /* Accent — the single accent colour of the brand */
  --color-accent: #E85A1C;
  --color-accent-deep: #B8420E;
  --color-accent-tint: #FBE6D8;

  /* Rare tertiary — the mist sage */
  --color-mist: #DDE6DA;

  /* Rule — for borders and dividers */
  --color-rule: rgb(20 18 16 / 0.14);

  /* Border radius — from Brand Bible v2 §4.4 */
  --radius-chip: 4px;
  --radius-card: 20px;
  --radius-card-sm: 16px;
  --radius-pill: 999px;
}

@layer base {
  html {
    background-color: var(--color-cream);
    color: var(--color-ink);
    scroll-behavior: smooth;
  }

  body {
    background-color: var(--color-cream);
    color: var(--color-ink);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
  }

  /* Focus outlines use the accent colour */
  *:focus-visible {
    outline: 2px solid var(--color-accent);
    outline-offset: 4px;
  }

  /* Selected text uses the accent — a small brand signature */
  ::selection {
    background-color: var(--color-accent);
    color: var(--color-cream);
  }

  /* Respect user motion preferences — from Brand Bible v2 §4.7 */
  @media (prefers-reduced-motion: reduce) {
    html {
      scroll-behavior: auto;
    }

    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
}

@layer components {
  /* Standard OTS container — 1280px max, responsive padding.
     From Brand Bible v2 §4.3.
     Usage: <div class="container-ots">...</div> */
  .container-ots {
    width: 100%;
    max-width: 1280px;
    margin-left: auto;
    margin-right: auto;
    padding-left: 24px;
    padding-right: 24px;
  }

  @media (min-width: 768px) {
    .container-ots {
      padding-left: 48px;
      padding-right: 48px;
    }
  }

  @media (min-width: 1024px) {
    .container-ots {
      padding-left: 96px;
      padding-right: 96px;
    }
  }

  /* Standard OTS section — vertical rhythm.
     From Brand Bible v2 §4.3: 128px desktop, 80px mobile.
     Usage: <section class="section-ots">...</section> */
  .section-ots {
    padding-top: 80px;
    padding-bottom: 80px;
  }

  @media (min-width: 1024px) {
    .section-ots {
      padding-top: 128px;
      padding-bottom: 128px;
    }
  }
}

Confirm the file was written. Do not add any other CSS.

TASK 3 — Rewrite app/page.tsx to demonstrate the new primitives.
Replace the entire contents of `app/page.tsx` with this exact content:

export default function Home() {
  return (
    <main>
      <section className="section-ots">
        <div className="container-ots text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent mb-6">
            Step 2b — Design tokens & layout primitives
          </p>
          <h1 className="text-4xl font-bold text-ink mb-4 leading-tight">
            Ontwikkeling Tech Services
          </h1>
          <p className="text-base text-ink-soft mb-10 leading-relaxed max-w-xl mx-auto">
            The visual foundation now includes a 1280px container with responsive
            padding, a section with generous vertical rhythm, and border radius
            tokens for chips, cards, and pills.
          </p>

          <div className="flex gap-2 justify-center flex-wrap mb-10">
            <span className="px-3 py-1 rounded-chip text-xs bg-cream-deep text-ink">
              rounded-chip · cream-deep
            </span>
            <span className="px-3 py-1 rounded-chip text-xs bg-accent text-cream">
              rounded-chip · accent
            </span>
            <span className="px-3 py-1 rounded-chip text-xs bg-night text-cream">
              rounded-chip · night
            </span>
            <span className="px-3 py-1 rounded-chip text-xs bg-mist text-ink">
              rounded-chip · mist
            </span>
          </div>

          <div className="inline-block bg-cream-deep rounded-card p-8 mb-10 max-w-md">
            <p className="text-sm text-ink-soft leading-relaxed">
              This card uses <code className="text-accent">rounded-card</code>{" "}
              (20px). The container respects 96px side padding on desktop,
              48px on tablet, 24px on mobile.
            </p>
          </div>

          <div className="mb-10">
            <button className="rounded-pill bg-accent text-cream px-7 py-3.5 text-sm font-medium hover:bg-accent-deep transition-colors">
              Pill button — hover me
            </button>
          </div>

          <p className="text-xs text-muted">
            Behind every smooth business is a better system.
          </p>
        </div>
      </section>
    </main>
  );
}

Confirm the file was written.

TASK 4 — Start the dev server and verify.
Run `npm run dev` in the background. Wait 10 seconds. Check whether `http://localhost:3000` responds with a 200 status code. Report:
- Whether the server started on port 3000 (NOT 3001 — if it's on 3001 there's still an orphaned process)
- Whether the response was 200
- Any compilation errors from the terminal output

If the server is running on port 3000 with no errors, pause and wait for my verification. If anything is wrong, report it and do not proceed.

TASK 5 — Wait for user verification.
Pause here. I will visit http://localhost:3000 in my browser and confirm the page looks correct. Once I say "verified", proceed to Task 6.

TASK 6 — Stop the dev server cleanly.
Stop the dev server. Verify port 3000 is free afterwards using `Get-NetTCPConnection -LocalPort 3000 -ErrorAction SilentlyContinue`. If any process still has port 3000 bound, kill it with taskkill.

TASK 7 — Commit and push.
Run `git status` and report the changes. Two files should be modified: `app/globals.css` and `app/page.tsx`. The new prompt file `prompts/STEP_02b_Layout_Primitives_and_Motion_Base.md` should also be untracked.

Stage all changes: `git add app/globals.css app/page.tsx prompts/STEP_02b_Layout_Primitives_and_Motion_Base.md`

Commit with this exact message:
`feat(step-02b): add radius tokens, layout primitives, accessibility base rules`

Push to GitHub with `git push`.

If Git asks for authentication, prompt me — I will provide my GitHub username `virat-ots` and Personal Access Token.

TASK 8 — Final report.
Produce a summary in this format:

STEP 2b COMPLETE
- app/globals.css: extended with 4 radius tokens, .container-ots primitive, .section-ots primitive, reduced-motion rules, accent selection
- app/page.tsx: updated to demonstrate new primitives (rounded-chip, rounded-card, rounded-pill, container-ots, section-ots)
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

### Check 1 — The page looks correct

Visit **http://localhost:3000** (make sure the URL is `:3000`, not `:3001`).

**What you should see:**

- **Cream background** (same as Step 2a — verify it's still there).
- **Small orange eyebrow** at the top: *"STEP 2B — DESIGN TOKENS & LAYOUT PRIMITIVES"*.
- **Big dark headline**: *"Ontwikkeling Tech Services"*.
- **A short paragraph** below the headline.
- **Four pills** (same colours as Step 2a) — text is slightly longer now: *"rounded-chip · cream-deep"*, etc.
- **A new element: a cream-deep card** with soft 20px rounded corners, containing explanation text.
- **A new element: an orange pill button** — *"Pill button — hover me"* — with fully rounded ends.
- **When you hover the button**, it should darken to a slightly deeper orange (`accent-deep`). This is the `hover:bg-accent-deep` transition working.
- **Muted footer**: *"Behind every smooth business is a better system."*

**Also verify:**

- **The page content is NOT stretched to the full browser width** — even on a wide monitor, the content should be centred with visible margins on the left and right. This proves `.container-ots` is respecting the 1280px max-width.
- **Resize your browser window narrower** (drag the corner). The side margins should stay proportional and comfortable — never crashing the content against the edge.

**Screenshot the page and paste it here.**

### Check 2 — Test text selection

Click and drag to select some text on the page (e.g., the paragraph).

**The highlighted background should be orange (accent),** not the default blue. This confirms the `::selection` rule is working — a subtle brand signature that appears whenever anyone copies text from the site.

### Check 3 — Tell Claude Code to commit

If everything looks right, reply in Claude Code:

```
Verified — cream background, all colour pills, rounded-card demo, rounded-pill button all render correctly. Container respects max-width and responsive padding. Text selection is orange. Please stop the dev server and continue to Tasks 6, 7, and 8.
```

### Check 4 — GitHub shows the new commit

Once Claude Code reports STEP 2b COMPLETE, refresh https://github.com/ots-nl/website.

**Latest commit message should read:** `feat(step-02b): add radius tokens, layout primitives, accessibility base rules`

Commits should now show **4 total** — Step 0, Step 1, Step 2a, Step 2b.

---

## If something goes wrong

**The cream card corners look sharp, not rounded.**
`rounded-card` isn't being generated. Ask Claude Code to show the compiled CSS. The `--radius-card` variable may not be in the right format. Paste output to me.

**The pill button corners are only slightly rounded, not fully round.**
`rounded-pill` isn't generating properly. Same fix — show me the compiled CSS.

**The container isn't respecting max-width — content stretches to full browser width.**
The `@layer components` rule may not be loading. Ask Claude Code to verify the `globals.css` file was written correctly and re-check the browser after a hard refresh (Ctrl+Shift+R).

**Dev server starts on port 3001 instead of 3000.**
Zombie process from a previous session. Ask Claude Code to run `Get-NetTCPConnection -LocalPort 3000` and identify the PID, then kill it with `taskkill /PID <PID> /F`. Restart.

**Anything else.**
Paste to me the exact error, what Claude Code was doing, and the contents of `app/globals.css`.

---

## What comes next

Once all four acceptance checks pass:

- ✅ Cream card with 20px rounded corners visible
- ✅ Orange pill button visible with hover darken
- ✅ Container respects max-width (visible margins on wide screens)
- ✅ Text selection is orange (small brand signature)
- ✅ Commit visible on GitHub

Come back to Claude and say:

> **"Step 2b done. Give me Step 3a."**

**Step 3a is fonts** — this is the big visual moment. Anton for display (bold condensed hero headlines), Cormorant Garamond for the italic accent word, Inter for all body text. When Step 3a is done, viewing `localhost:3000` will look genuinely OTS — the typography does most of the emotional work in the Brand Bible v2, and Step 3a is where it arrives.

---

**Step 02b · Layout Primitives & Motion Base · v1.0 (Claude Code-driven)**
*Behind every smooth business is a better system.*
