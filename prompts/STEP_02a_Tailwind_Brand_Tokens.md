# STEP 02a — Tailwind Brand Tokens

**Project:** Ontwikkeling Tech Services — Marketing Website
**Type:** Claude Code prompt
**Estimated time:** 15–25 minutes
**Owner:** Virat
**Version:** 1.0

---

## Goal

Configure Tailwind CSS with the OTS brand colour palette from the Brand Bible v2. Make cream (`#FAF6EE`) the default page background and ink (`#141210`) the default text colour. Verify the tokens work by loading a simple test page.

By the end of this step, `localhost:3000` will show a cream background with dark ink text — the first sign the site is becoming OTS instead of a Next.js template.

---

## Context

- References Brand Bible v2 §4.1 (colour tokens) and PRD v1.1 §2.2 (colour tokens table).
- Tailwind v4 was installed by create-next-app in Step 1 — this changes how we configure it. Instead of a `tailwind.config.ts` file (Tailwind v3), we configure directly in `app/globals.css` using the `@theme` directive.
- This step only handles colours + base body styles. **Fonts come in Step 3a**, not here.

---

## Why the Tailwind v4 approach

**Old way (Tailwind v3):** you write JavaScript config in `tailwind.config.ts` and Tailwind reads it at build time.

**New way (Tailwind v4):** you write CSS custom properties inside a `@theme` block in your global stylesheet. Tailwind automatically turns each `--color-*` into a utility class.

Example — if you define:
```css
@theme {
  --color-cream: #FAF6EE;
}
```

Then in any component you can use:
- `bg-cream` for background
- `text-cream` for text colour
- `border-cream` for borders

Same result as v3, cleaner syntax, no separate config file. This is the modern approach and what the site will use throughout.

---

## Prerequisites

- ✅ Step 1 complete: Next.js scaffolded, site loads at `localhost:3000` with default Next.js page.
- ✅ VS Code open, pointed at `ots-website` folder.
- ✅ Claude Code panel accessible.
- ✅ Git working tree is clean (last commit was `chore(step-01):...`).

---

## Files this step modifies

- `app/globals.css` — replaces contents with OTS `@theme` block + base body styles
- `app/page.tsx` — replaces default Next.js welcome page with a small OTS verification test

**Files this step does NOT touch:**
- `app/layout.tsx` (fonts come in Step 3a)
- `.gitignore`, `README.md`, `prompts/`
- Anything else

---

## How to run this step

1. Save this file into `C:\Users\offic\Projects\ots-website\prompts\STEP_02a_Tailwind_Brand_Tokens.md`.
2. Open VS Code, open the Claude Code panel.
3. Start a **new session** (click "+ New session" at the top of the Claude Code panel).
4. Copy the entire prompt block below.
5. Paste it into Claude Code and send.
6. Approve each command as Claude Code proposes it.
7. When Claude Code reports "STEP 2a COMPLETE", do the acceptance checks yourself.

---

## THE PROMPT — paste this into Claude Code

```
You are executing Step 2a of the OTS website build. This step configures Tailwind CSS with the OTS brand colour tokens from the Brand Bible v2. This is a customisation step — no new packages will be installed.

Follow this plan exactly. Do not add extra styles, colours, or configuration beyond what is listed. If anything is unclear or a step fails, pause and report to me — do not attempt fixes without asking.

CONTEXT:
The project uses Tailwind CSS v4, which was installed in Step 1. Tailwind v4 does NOT use a `tailwind.config.ts` file. Instead, configuration lives in `app/globals.css` inside a `@theme` block. Any `--color-*` variable defined there becomes a Tailwind utility class automatically (e.g., `--color-cream` becomes `bg-cream`, `text-cream`, `border-cream`).

TASK 1 — Verify prerequisites.
Run these checks and report the output:
- `pwd` to confirm we're in the `ots-website` directory
- `git status` to confirm the working tree is clean (or only has STEP_02a as untracked)
- `ls app/` to confirm `globals.css` and `page.tsx` exist

Report the output and pause for my approval before proceeding.

TASK 2 — Rewrite app/globals.css with the OTS brand tokens.
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
}

@layer base {
  html {
    background-color: var(--color-cream);
    color: var(--color-ink);
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
}

Confirm the file was written. Do not add any other CSS, comments, or configuration.

TASK 3 — Rewrite app/page.tsx with a verification test.
Replace the entire contents of `app/page.tsx` with this exact content:

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-16">
      <div className="max-w-xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent mb-6">
          Step 2a — Brand tokens verification
        </p>
        <h1 className="text-4xl font-bold text-ink mb-4 leading-tight">
          Ontwikkeling Tech Services
        </h1>
        <p className="text-base text-ink-soft mb-8 leading-relaxed">
          The visual foundation is in place. Cream background, ink text,
          considered accent. Everything else builds on this.
        </p>
        <div className="flex gap-2 justify-center flex-wrap">
          <span className="px-3 py-1 rounded-full text-xs bg-cream-deep text-ink">
            cream-deep
          </span>
          <span className="px-3 py-1 rounded-full text-xs bg-accent text-cream">
            accent
          </span>
          <span className="px-3 py-1 rounded-full text-xs bg-night text-cream">
            night
          </span>
          <span className="px-3 py-1 rounded-full text-xs bg-mist text-ink">
            mist
          </span>
        </div>
        <p className="text-xs text-muted mt-12">
          Behind every smooth business is a better system.
        </p>
      </div>
    </main>
  );
}

Confirm the file was written. Do not add any other components, imports, or metadata.

TASK 4 — Verify the dev server starts and responds.
Start the dev server with `npm run dev` in the background. Wait 15 seconds. Then check whether `http://localhost:3000` responds with a 200 status code. Report:
- Whether the server started
- Whether the response was 200
- Any compilation errors from the terminal output

DO NOT stop the dev server yet — I will visit the page in my browser first. Wait for my instruction to stop it.

TASK 5 — Wait for user verification.
Pause here. I will visit http://localhost:3000 in my browser and confirm the page looks correct. Once I say "verified", proceed to Task 6.

TASK 6 — Stop the dev server.
Stop the dev server that was started in Task 4.

TASK 7 — Prepare Git commit.
Run `git status` and report the changes. Two files should be modified: `app/globals.css` and `app/page.tsx`.

Stage the changes: `git add app/globals.css app/page.tsx`

Also stage the new prompt file if it isn't already committed: `git add prompts/STEP_02a_Tailwind_Brand_Tokens.md`

Commit with this exact message:
`feat(step-02a): configure Tailwind v4 with OTS brand tokens`

Push to GitHub with `git push`.

If Git asks for authentication, prompt me — I will provide my GitHub username `virat-ots` and the Personal Access Token.

TASK 8 — Final report.
Produce a summary in this format:

STEP 2a COMPLETE
- app/globals.css: rewritten with @theme block containing 11 colour tokens
- app/page.tsx: replaced with verification test page
- Dev server: [worked / did not work]
- User verification: [confirmed / not confirmed]
- Git commit: [hash and message]
- Git push: [succeeded / failed]
- Any warnings or unexpected output: [list, or "none"]

END OF PROMPT.
```

---

## Acceptance test — what you verify after Claude Code finishes

### Check 1 — The page looks right in your browser

Visit **http://localhost:3000** (Claude Code will have the dev server running).

**What you should see:**

- **Background:** warm cream (not white, not grey, not black). This is the biggest visual signal that Step 2a worked.
- **Small orange text at the top:** *"STEP 2A — BRAND TOKENS VERIFICATION"* in uppercase with wide letter-spacing.
- **A dark headline:** *"Ontwikkeling Tech Services"* in dark near-black.
- **A body paragraph** below the headline in slightly softer dark grey.
- **Four small pills** in a row: `cream-deep`, `accent` (orange), `night` (dark), `mist` (sage green).
- **A muted footer line:** *"Behind every smooth business is a better system."*

**What it should NOT look like:**
- If the background is still black → the `@theme` block isn't loading. Tell me.
- If the whole thing looks like plain HTML (unstyled) → Tailwind isn't compiling. Tell me.
- If you see errors overlaid on the page → screenshot the exact errors and paste to me.

**Screenshot the page and paste it here** as verification.

### Check 2 — Tell Claude Code to stop the dev server

Reply in the Claude Code session:

```
Verified — the page loaded correctly with cream background and all four colour pills visible. Please stop the dev server and continue to Task 6.
```

Claude Code will stop the server and continue with the commit and push.

### Check 3 — GitHub shows the new commit

Once Claude Code reports STEP 2a COMPLETE, open **https://github.com/ots-nl/website** and refresh.

**Latest commit message should read:** `feat(step-02a): configure Tailwind v4 with OTS brand tokens`

Click into the commit — you should see two files changed:
- `app/globals.css`
- `app/page.tsx`

Plus `prompts/STEP_02a_Tailwind_Brand_Tokens.md` if it wasn't already committed.

---

## If something goes wrong

**The page background is still black or white, not cream.**
The `@theme` block isn't being processed. Ask Claude Code to run `npm run dev` again with fresh terminal output — look for any errors mentioning `@theme`, `@import`, or `tailwindcss`. Screenshot and paste to me.

**The four colour pills are visible but the colours look wrong.**
Copy the exact CSS content of `app/globals.css` and paste it to me. Something got corrupted during the write.

**The page shows "Module not found" or "Cannot find" errors.**
Tell Claude Code to run `npm install` again with the slow settings from Step 1, then restart the dev server. This is Reason Cybersecurity again.

**Tailwind classes don't apply at all — page looks like plain unstyled HTML.**
The `@import "tailwindcss";` line is either missing or the wrong version. Ask Claude Code to show the current contents of `app/globals.css`. Paste to me.

**Anything else.**
Paste to me: the exact error, what Claude Code was doing, and the contents of `app/globals.css` and `app/page.tsx`.

---

## What comes next

Once all three acceptance checks pass:

- ✅ Cream background visible at localhost:3000
- ✅ All four colour pills render in correct colours
- ✅ Commit visible on GitHub

Come back to Claude and say:

> **"Step 2a done. Give me Step 2b."**

Step 2b is a small step — it adds a few helper CSS custom properties for spacing and radii (from PRD §2.4) and cleans up any leftover create-next-app CSS. Then Step 3a sets up the fonts (Anton, Cormorant Garamond, Inter). By Step 3b, the site will have full brand-correct type on cream, which is a real milestone.

---

**Step 02a · Tailwind Brand Tokens · v1.0 (Claude Code-driven)**
*Behind every smooth business is a better system.*
