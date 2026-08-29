# STEP 03a — Fonts

**Project:** Ontwikkeling Tech Services — Marketing Website
**Type:** Claude Code prompt
**Estimated time:** 20–35 minutes (font downloads can be slow with antivirus)
**Owner:** Virat
**Version:** 1.0

---

## Goal

Load the three OTS fonts specified in the Brand Bible v2 — Anton (display), Cormorant Garamond Italic (editorial accent), and Inter (body & interface) — via Next.js's `next/font/google`. Wire them into the root layout. Register them as Tailwind utility classes. Verify by rendering a headline that uses all three fonts.

By the end of this step, `localhost:3000` will show the OTS tagline set correctly:

> *"Behind every smooth business is a **better** system."*

— where the headline is in **Anton** (bold condensed), the word *"better"* is in **Cormorant Garamond Italic** in accent orange, and the surrounding body copy is in **Inter**. This is the first moment the site reads as unmistakably OTS.

---

## Context

- References Brand Bible v2 §4.2 (typography specification, type scale, "the italic accent word — the single most opinionated visual choice on the site").
- References PRD v1.1 §2.3 (font stack), §10 (tech stack — fonts via `next/font`).
- All three fonts are free and served through Google Fonts, delivered via Next.js's font optimisation system.

---

## Why fonts matter this much

The Brand Bible v2 §4.2 opens with: *"Typography is the loudest surface of the v2 brand. It carries the personality that in v1 was carried by restraint."*

Read another way: the colours and layout we've built so far are correct but restrained. The site is warm and considered but visually generic. What makes it *specifically OTS* — what makes it unmistakable at thumbnail size, in a proposal, in a screenshot on LinkedIn — is the type.

**Three families, one job each:**

1. **Anton** — the display face. Bold, condensed, editorial. Used at hero scale (56px+). Never used at small sizes. This is what makes headlines feel like OTS instead of Next.js.

2. **Cormorant Garamond Italic** — used *exactly once per page*, on a single word inside a display headline. It's the "made by a person with taste" signal. Overuse collapses the effect.

3. **Inter** — everything else. Body copy, buttons, navigation, forms, meta. Neutral, honest, hard-working. Never carries the personality — supports it.

Together, they produce the tension that makes the brand work: **expressive display type, restrained words**. Neither extreme alone would be right.

---

## Prerequisites

- ✅ Step 2b complete: `.container-ots`, `.section-ots`, and border radius tokens work correctly.
- ✅ Latest commit on GitHub is `feat(step-02b): add radius tokens, layout primitives, accessibility base rules`.
- ✅ Git working tree is clean.
- ✅ VS Code open, Claude Code panel accessible.
- ✅ Stable internet connection (needed for the initial font download from Google Fonts).

---

## Files this step modifies

- `app/layout.tsx` — imports the three fonts via `next/font/google`, applies their CSS variables to `<html>`, updates page metadata to real OTS values, changes `lang="en"` to `lang="nl"` (Dutch is our primary language per the PRD).
- `app/globals.css` — extends `@theme` block with three font tokens (`--font-display`, `--font-italic`, `--font-body`) referencing the next/font-provided CSS variables. Sets Inter as the default body font.
- `app/page.tsx` — updates verification test to render the OTS tagline in Anton with a Cormorant italic accent word.

**Files this step does NOT touch:**
- Anything outside `app/`.
- `.gitignore`, `README.md`, `prompts/`.

---

## How to run this step

1. Save this file into `C:\Users\offic\Projects\ots-website\prompts\STEP_03a_Fonts.md`.
2. Open VS Code, open the Claude Code panel.
3. **Start a new session** (always start fresh — click "+ New session").
4. Copy the entire prompt block below.
5. Paste into Claude Code and send.
6. Approve each command.
7. When Claude Code pauses at Task 5, verify the page in your browser and screenshot it back to me.

---

## THE PROMPT — paste this into Claude Code

```
You are executing Step 3a of the OTS website build. This step loads three fonts (Anton, Cormorant Garamond Italic, Inter) via next/font/google, wires them into the root layout, registers them as Tailwind theme tokens, and updates the verification page to render the OTS tagline in the correct typography.

Follow this plan exactly. Do not add extra fonts, weights, or configuration. If anything is unclear or a step fails, pause and report to me — do not attempt fixes without asking.

CONTEXT:
- The project uses Tailwind CSS v4, configured in `app/globals.css`.
- `next/font/google` provides zero-layout-shift font loading. Each font call creates a CSS variable (e.g., `--font-anton`) that we reference in Tailwind's @theme block as `--font-display: var(--font-anton), ...`. This gives us `font-display`, `font-italic`, `font-body` utility classes.
- Anton and Cormorant Garamond are brand-critical, so they use `display: 'block'` (invisible until loaded, no flash of wrong font). Inter uses `display: 'swap'` (shows fallback immediately) because body text should always be visible.

TASK 1 — Verify prerequisites and clean any zombie processes.
Run these checks and report the output:
- `pwd` to confirm we're in `ots-website`
- `git status` to confirm working tree is clean (or only has STEP_03a as untracked)
- `git log --oneline -3` to confirm the last commit is `feat(step-02b): add radius tokens, layout primitives, accessibility base rules`

Check for orphaned Node processes on port 3000:
- Wrap Get-NetTCPConnection in an if/else to output clearly: PORT_FREE or PORT_OCCUPIED with the PID.
- If PORT_OCCUPIED, kill the process with `taskkill /PID <PID> /F`.
- Verify port 3000 is free before proceeding.

Report the output of all checks. Pause for my approval before proceeding.

TASK 2 — Rewrite app/layout.tsx to load the three fonts.
Replace the entire contents of `app/layout.tsx` with this exact content:

import type { Metadata } from "next";
import { Anton, Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

// Anton — display face for hero headlines and section titles.
// Ships one weight (400) which renders as bold-condensed.
// Brand Bible §4.2: never used below 32px.
const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  display: "block",
  variable: "--font-anton",
});

// Cormorant Garamond Italic — the editorial accent word.
// Used exactly once per page, on a single word inside a display headline.
// Brand Bible §4.2: "the single most opinionated visual choice on the site".
const cormorant = Cormorant_Garamond({
  weight: "500",
  style: "italic",
  subsets: ["latin"],
  display: "block",
  variable: "--font-cormorant",
});

// Inter — body copy, UI, buttons, navigation, forms.
// The neutral, hard-working face that carries meaning without personality.
const inter = Inter({
  weight: ["300", "400", "500", "600"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "OTS — Business Operating Systems voor dienstverleners in Nederland",
  description:
    "Wij bouwen Business Operating Systems voor restaurants, klinieken en professionele dienstverleners in Nederland. Minder handwerk. Betere data. Systemen die stil hun werk doen.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="nl"
      className={`${anton.variable} ${cormorant.variable} ${inter.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}

Confirm the file was written.

TASK 3 — Extend app/globals.css with font tokens.
The current `@theme` block contains colour tokens and radius tokens. Add three new font tokens INSIDE the same @theme block, immediately after the radius tokens. Do NOT rewrite the entire file — use a targeted edit that inserts the font tokens in the right place.

The font tokens to add:

  /* Type — from Brand Bible v2 §4.2 */
  --font-display: var(--font-anton), Impact, "Helvetica Neue", sans-serif;
  --font-italic: var(--font-cormorant), Georgia, "Times New Roman", serif;
  --font-body: var(--font-inter), system-ui, -apple-system, "Segoe UI", sans-serif;

Also, add `font-family: var(--font-body);` to the body selector inside `@layer base` so Inter becomes the default body font. The body selector currently looks like:

  body {
    background-color: var(--color-cream);
    color: var(--color-ink);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
  }

Insert `font-family: var(--font-body);` as the first declaration inside body, so the updated block becomes:

  body {
    font-family: var(--font-body);
    background-color: var(--color-cream);
    color: var(--color-ink);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
  }

Show me the final contents of app/globals.css after these edits so I can verify.

TASK 4 — Rewrite app/page.tsx to demonstrate the three fonts.
Replace the entire contents of `app/page.tsx` with this exact content:

export default function Home() {
  return (
    <main>
      <section className="section-ots">
        <div className="container-ots text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent mb-8">
            Step 3a — Typography
          </p>

          <h1 className="font-display text-[clamp(48px,7vw,112px)] text-ink leading-[0.92] tracking-[-0.02em] mb-10 max-w-4xl mx-auto">
            Behind every smooth business is a{" "}
            <span className="font-italic italic text-accent">better</span>{" "}
            system.
          </h1>

          <p className="text-lg text-ink-soft leading-relaxed max-w-2xl mx-auto mb-12">
            The typography now carries the voice of the brand. Anton for
            display headlines, Cormorant Garamond italic for the single accent
            word, Inter for everything else you&apos;re reading right now.
          </p>

          <div className="flex gap-2 justify-center flex-wrap mb-10">
            <span className="px-3 py-1 rounded-chip text-xs bg-cream-deep text-ink">
              cream-deep
            </span>
            <span className="px-3 py-1 rounded-chip text-xs bg-accent text-cream">
              accent
            </span>
            <span className="px-3 py-1 rounded-chip text-xs bg-night text-cream">
              night
            </span>
            <span className="px-3 py-1 rounded-chip text-xs bg-mist text-ink">
              mist
            </span>
          </div>

          <div className="inline-block bg-cream-deep rounded-card p-8 mb-10 max-w-md">
            <p className="text-sm text-ink-soft leading-relaxed">
              Card body in Inter. Container respects 96px side padding on
              desktop, 48px on tablet, 24px on mobile.
            </p>
          </div>

          <div className="mb-12">
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

TASK 5 — Start dev server and verify.
Run `npm run dev` in the background. Wait 15 seconds (fonts sometimes take longer to compile on first run). Check whether http://localhost:3000 responds with 200. Report:
- Whether the server started on port 3000 (NOT 3001)
- Whether the response was 200
- Any compilation errors — pay particular attention to font-related errors from next/font
- Any warnings about font subsets, weights, or CSS variable names

If the server is running on port 3000 with no compilation errors, pause and wait for my browser verification. If anything is wrong, report it and do not proceed.

TASK 6 — Wait for user verification.
Pause here. I will visit http://localhost:3000 in my browser to confirm the typography renders correctly. Once I say "verified", proceed to Task 7.

TASK 7 — Stop the dev server cleanly.
Stop the dev server. Verify port 3000 is free afterwards. If any process still holds port 3000, kill it with taskkill.

TASK 8 — Commit and push.
Run `git status` and report the changes. Three files should be modified: `app/layout.tsx`, `app/globals.css`, `app/page.tsx`. The new prompt file `prompts/STEP_03a_Fonts.md` should also be untracked.

Stage all changes: `git add app/layout.tsx app/globals.css app/page.tsx prompts/STEP_03a_Fonts.md`

Commit with this exact message:
`feat(step-03a): load Anton, Cormorant Garamond, Inter via next/font`

Push to GitHub with `git push`.

If Git asks for authentication, prompt me for my GitHub username `virat-ots` and Personal Access Token.

TASK 9 — Final report.
Produce a summary in this format:

STEP 3a COMPLETE
- app/layout.tsx: three fonts loaded (Anton weight 400, Cormorant weight 500 italic, Inter weights 300/400/500/600), lang="nl", metadata updated
- app/globals.css: three font tokens added to @theme, Inter set as default body font
- app/page.tsx: updated to demonstrate all three fonts in the OTS tagline
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

### Check 1 — The three fonts render correctly

Visit **http://localhost:3000** (make sure it's `:3000`, not `:3001`).

**What you should see:**

- **The hero headline** — *"Behind every smooth business is a better system."* — set in **Anton**: bold, condensed, dramatically larger than before. This is the biggest visible change.

- **The word "better"** — in the middle of the headline, in **Cormorant Garamond italic**, coloured **accent orange**. It should look distinctly different from the surrounding Anton — a serif italic set against a bold sans-serif. This contrast is the whole point.

- **The body paragraph** below the headline — set in **Inter** at 18px. Neutral, calm, unassuming. It should read cleanly and disappear into the content (which is what body type should do).

- **The four chip pills** — labels in **Inter**, still with rounded 4px corners.

- **The card body text** — in **Inter**, wrapped in the cream-deep card.

- **The pill button text** — *"Pill button — hover me"* — in **Inter**, medium weight.

- **The muted footer** — in **Inter**, small, quiet.

### Check 2 — Visual comparison to before

If you have a screenshot from Step 2b, compare it to now. The most obvious differences:

1. **The headline is much bigger and much bolder** — Anton at up to 112px is a real presence.
2. **The word "better" stands out** — different family, different weight, different colour.
3. **Everything else feels tighter and more considered** — Inter is a workhorse designed for interfaces; it makes body copy feel professional in a way the browser default doesn't.

If the headline still looks like the browser default (a generic system sans-serif at 40-something px), the fonts didn't load. Screenshot and paste to me.

### Check 3 — Test text selection

Select some text on the page. The highlight should still be **orange** (from Step 2b). This confirms nothing regressed.

### Check 4 — Tell Claude Code to proceed

If everything renders correctly, reply in Claude Code:

```
Verified — Anton renders the hero headline in bold condensed display, Cormorant Garamond italic renders "better" in orange, Inter renders all body copy and UI. All three fonts loading correctly. Please stop the dev server and continue with Tasks 7, 8, and 9.
```

### Check 5 — GitHub shows the new commit

Refresh https://github.com/ots-nl/website. Latest commit should be `feat(step-03a): load Anton, Cormorant Garamond, Inter via next/font`. **5 commits total.**

---

## If something goes wrong

**The fonts don't load — headline still looks like generic system font.**
Two possibilities:
1. Antivirus is blocking the download from Google Fonts. Ask Claude Code to look at the terminal output — there may be errors mentioning `fonts.gstatic.com` or download failures. Restart the dev server and try again.
2. The CSS variable references are wrong. Ask Claude Code to show the final contents of `app/globals.css` and `app/layout.tsx`. Paste both to me.

**"better" appears in the wrong font — same as the rest of the headline.**
The `font-italic` utility isn't generating from the `--font-italic` token. Ask Claude Code to check whether the `@theme` block correctly contains the three font tokens. Paste to me if unsure.

**"better" appears in italic but not orange.**
The `text-accent` colour isn't being applied to the `<span>`. Check the JSX — the class should be `font-italic italic text-accent`. All three are needed: `font-italic` for the family, `italic` for the style, `text-accent` for the colour.

**Dev server compilation error mentioning "next/font".**
Copy the exact error to me. Font import errors can be about (a) weight not being available for that font, (b) subset name mismatch, or (c) the CSS variable name colliding with something else.

**Page loads but shows huge amounts of layout shift (jumping around).**
The `display: 'block'` on Anton and Cormorant might not be right for your system. This is unusual — `next/font` is normally very stable. Screenshot the "jumping" behaviour and describe it.

**Font download is very slow (>60 seconds).**
Reason Cybersecurity may be scanning the font files as they download. This is annoying but should resolve after the first successful compile — Next.js caches the fonts locally.

**Anything else.**
Paste the exact error, what Claude Code was doing, and the current contents of `app/layout.tsx` and `app/globals.css`.

---

## What comes next

Once all five acceptance checks pass:

- ✅ Anton headline visible at large size
- ✅ "better" in Cormorant italic + orange
- ✅ Inter body copy throughout
- ✅ No compilation errors
- ✅ Commit visible on GitHub

Come back and say:

> **"Step 3a done. Give me Step 4a."**

**Step 4a** starts the internationalisation setup — `next-intl` configuration, message files for Dutch and English, and the `[locale]` folder structure that will hold every page. It's less visually exciting than Step 3a but architecturally important — every subsequent page section will live inside the `[locale]` structure.

---

**Step 03a · Fonts · v1.0 (Claude Code-driven)**
*Behind every smooth business is a better system.*
