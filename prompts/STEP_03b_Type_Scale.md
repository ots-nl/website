# STEP 03b — Type Scale

**Project:** Ontwikkeling Tech Services — Marketing Website
**Type:** Claude Code prompt
**Estimated time:** 20–30 minutes
**Owner:** Virat
**Version:** 1.0

---

## Goal

Codify the full OTS type scale from Brand Bible v2 §4.2 as reusable utility classes in `app/globals.css`. Each type utility bundles font family, size, line-height, letter-spacing, weight, and (where relevant) text-transform — so brand discipline is enforced at the class level, not left to memory.

By the end of this step, every future section can write `<h1 className="type-hero">` or `<p className="type-body-lg">` and get the correct typography automatically. No more `clamp(56px, 8vw, 128px)` arbitrary values scattered through the codebase.

---

## Context

- References Brand Bible v2 §4.2 (full type scale table).
- References PRD v1.1 §2.3 (type scale table).
- Extends the design token system established in Steps 2a, 2b, 3a.

---

## Why bundle family + size together

The Brand Bible enforces a specific rule: *"Display face is used only at large sizes. Never below 32px. Below 32px, use Inter 600 or Inter 700."*

If we defined only font-size tokens (`text-hero`, `text-h2`, etc.) and left the font family separate, someone could accidentally write `<h1 className="text-hero font-body">` — Inter at hero scale — which violates the Brand Bible. By bundling the family into the type class:

- `type-hero`, `type-h2`, `type-h3`, `type-numeral` → always Anton (display face)
- `type-h4`, `type-body-lg`, `type-body`, `type-body-sm`, `type-label`, `type-button`, `type-caption` → always Inter (body face)

The rule enforces itself. The wrong combination isn't possible.

---

## The 11 type styles

Direct from Brand Bible §4.2 and PRD §2.3:

| Class | Font | Size | Line height | Letter spacing | Other |
|---|---|---|---|---|---|
| `type-hero` | Anton | `clamp(56px, 8vw, 128px)` | 0.92 | -0.02em | — |
| `type-h2` | Anton | `clamp(40px, 5vw, 72px)` | 0.98 | -0.02em | — |
| `type-h3` | Anton | `clamp(28px, 3vw, 36px)` | 1.05 | -0.015em | — |
| `type-h4` | Inter | 20px | 1.3 | -0.01em | weight 600 |
| `type-body-lg` | Inter | 18px | 1.6 | 0 | — |
| `type-body` | Inter | 16px | 1.65 | 0 | — |
| `type-body-sm` | Inter | 14px | 1.55 | 0 | — |
| `type-label` | Inter | 11px | 1.4 | 0.14em | weight 600, uppercase |
| `type-button` | Inter | 13px | 1.0 | 0.02em | weight 500 |
| `type-caption` | Inter | 12px | 1.5 | 0 | — |
| `type-numeral` | Anton | `clamp(120px, 15vw, 200px)` | 0.9 | -0.03em | — |

**One additional utility for the accent word:**

| Class | Font | Style | Colour |
|---|---|---|---|
| `type-accent-word` | Cormorant Garamond | italic | accent orange |

This is the one used in `<span className="type-accent-word">better</span>` for the *"Behind every smooth business is a **better** system"* pattern. It encapsulates the Brand Bible §4.2 signature choice.

---

## Prerequisites

- ✅ Step 3a complete: three fonts render correctly, hero headline shows Anton + Cormorant italic + Inter.
- ✅ Latest commit on GitHub is `feat(step-03a): load Anton, Cormorant Garamond, Inter via next/font`.
- ✅ Git working tree is clean.
- ✅ VS Code open, Claude Code panel accessible.

---

## Files this step modifies

- `app/globals.css` — extends `@layer components` block with the 11 type utilities plus the accent word utility. Colours, radius tokens, font tokens, and existing primitives all preserved.
- `app/page.tsx` — rewritten as a type-scale showcase, displaying every utility with its label. This becomes a design-system reference page temporarily useful for verification and eventually replaced when we build real page sections.

**Files this step does NOT touch:**
- `app/layout.tsx` (fonts stay as configured in Step 3a).
- Anything outside `app/`.

---

## How to run this step

1. Save this file into `C:\Users\offic\Projects\ots-website\prompts\STEP_03b_Type_Scale.md`.
2. Open VS Code, open the Claude Code panel.
3. **Start a new session** ("+ New session").
4. Copy the entire prompt block below.
5. Paste into Claude Code and send.
6. Approve commands as they come.
7. When Task 5 pauses, verify the page in your browser and screenshot it.

---

## THE PROMPT — paste this into Claude Code

```
You are executing Step 3b of the OTS website build. This step codifies the type scale from Brand Bible v2 §4.2 as reusable utility classes.

Follow this plan exactly. Do not add extra utilities, weights, or styles beyond what is listed. If anything is unclear or a step fails, pause and report to me.

CONTEXT:
- The project uses Tailwind CSS v4 with configuration in `app/globals.css`.
- Type utilities will live in `@layer components` and bundle font family, size, line-height, letter-spacing, and weight together. This enforces the Brand Bible rule that display face (Anton) is never used below 32px.
- Naming convention: `type-*` prefix (not `text-*`) to distinguish from Tailwind's built-in text utilities and make the intent explicit.

TASK 1 — Verify prerequisites and clean any zombie processes.
Report the output of these checks:
- `pwd` → confirm `ots-website` directory
- `git status` → confirm clean tree (only STEP_03b as untracked is fine)
- `git log --oneline -3` → confirm last commit is `feat(step-03a): load Anton, Cormorant Garamond, Inter via next/font`
- Port 3000 check — wrap Get-NetTCPConnection in if/else to output PORT_FREE or PORT_OCCUPIED with PID. If OCCUPIED, kill with taskkill /PID <PID> /F.

Pause for my approval before proceeding.

TASK 2 — Extend app/globals.css with the type scale.
The current `@layer components` block contains `.container-ots` and `.section-ots`. Add the 11 type utility classes plus one accent-word utility to the SAME `@layer components` block. Do NOT rewrite the entire file — use targeted edits that preserve everything currently in globals.css.

Insert these 12 new utilities after the .section-ots block, still inside @layer components:

  /* Type scale — from Brand Bible v2 §4.2.
     Each utility bundles font family + size + line-height + tracking + weight
     so type discipline is enforced at the class level. Anton is never used
     below 32px; Inter handles everything smaller. */

  /* Display type — Anton */
  .type-hero {
    font-family: var(--font-display);
    font-size: clamp(56px, 8vw, 128px);
    line-height: 0.92;
    letter-spacing: -0.02em;
  }

  .type-h2 {
    font-family: var(--font-display);
    font-size: clamp(40px, 5vw, 72px);
    line-height: 0.98;
    letter-spacing: -0.02em;
  }

  .type-h3 {
    font-family: var(--font-display);
    font-size: clamp(28px, 3vw, 36px);
    line-height: 1.05;
    letter-spacing: -0.015em;
  }

  .type-numeral {
    font-family: var(--font-display);
    font-size: clamp(120px, 15vw, 200px);
    line-height: 0.9;
    letter-spacing: -0.03em;
  }

  /* Interface type — Inter */
  .type-h4 {
    font-family: var(--font-body);
    font-size: 20px;
    line-height: 1.3;
    letter-spacing: -0.01em;
    font-weight: 600;
  }

  .type-body-lg {
    font-family: var(--font-body);
    font-size: 18px;
    line-height: 1.6;
  }

  .type-body {
    font-family: var(--font-body);
    font-size: 16px;
    line-height: 1.65;
  }

  .type-body-sm {
    font-family: var(--font-body);
    font-size: 14px;
    line-height: 1.55;
  }

  .type-label {
    font-family: var(--font-body);
    font-size: 11px;
    line-height: 1.4;
    letter-spacing: 0.14em;
    font-weight: 600;
    text-transform: uppercase;
  }

  .type-button {
    font-family: var(--font-body);
    font-size: 13px;
    line-height: 1;
    letter-spacing: 0.02em;
    font-weight: 500;
  }

  .type-caption {
    font-family: var(--font-body);
    font-size: 12px;
    line-height: 1.5;
  }

  /* The accent word — Cormorant Garamond italic in accent colour.
     Brand Bible §4.2: "one word per page, at most". Used inside display headings.
     Example: <span class="type-accent-word">better</span> */
  .type-accent-word {
    font-family: var(--font-italic);
    font-style: italic;
    color: var(--color-accent);
  }

Show me the final contents of app/globals.css after the edit so I can verify everything else is preserved.

TASK 3 — Rewrite app/page.tsx as a type-scale showcase.
Replace the entire contents of `app/page.tsx` with this exact content:

export default function Home() {
  return (
    <main>
      <section className="section-ots">
        <div className="container-ots">
          {/* Header — the real OTS tagline using the new utilities */}
          <div className="text-center mb-20">
            <p className="type-label text-accent mb-8">Step 3b — Type scale</p>
            <h1 className="type-hero text-ink mb-10 max-w-4xl mx-auto">
              Behind every smooth business is a{" "}
              <span className="type-accent-word">better</span> system.
            </h1>
            <p className="type-body-lg text-ink-soft max-w-2xl mx-auto">
              The type scale is now codified. Every heading, body size, and UI
              label is a utility class matching Brand Bible §4.2.
            </p>
          </div>

          {/* Full scale showcase — one style per row */}
          <div className="max-w-3xl mx-auto space-y-16">
            <div>
              <p className="type-label text-muted mb-4">type-hero</p>
              <p className="type-hero text-ink">The quick brown fox</p>
            </div>

            <div>
              <p className="type-label text-muted mb-4">type-h2</p>
              <p className="type-h2 text-ink">The quick brown fox jumps</p>
            </div>

            <div>
              <p className="type-label text-muted mb-4">type-h3</p>
              <p className="type-h3 text-ink">
                The quick brown fox jumps over the lazy dog
              </p>
            </div>

            <div>
              <p className="type-label text-muted mb-4">
                type-h4 · Inter 600
              </p>
              <p className="type-h4 text-ink">
                The quick brown fox jumps over the lazy dog
              </p>
            </div>

            <div>
              <p className="type-label text-muted mb-4">type-body-lg</p>
              <p className="type-body-lg text-ink-soft">
                Body large — for section subheads and intro paragraphs. The
                quick brown fox jumps over the lazy dog. The quick brown fox
                jumps over the lazy dog.
              </p>
            </div>

            <div>
              <p className="type-label text-muted mb-4">type-body</p>
              <p className="type-body text-ink-soft">
                Body regular — the default reading size. The quick brown fox
                jumps over the lazy dog. The quick brown fox jumps over the
                lazy dog. The quick brown fox jumps over the lazy dog.
              </p>
            </div>

            <div>
              <p className="type-label text-muted mb-4">type-body-sm</p>
              <p className="type-body-sm text-ink-soft">
                Body small — for meta and secondary information. The quick
                brown fox jumps over the lazy dog.
              </p>
            </div>

            <div>
              <p className="type-label text-muted mb-4">
                type-label · Inter 600 uppercase
              </p>
              <p className="type-label text-ink">The quick brown fox</p>
            </div>

            <div>
              <p className="type-label text-muted mb-4">type-button</p>
              <button className="type-button rounded-pill bg-accent text-cream px-7 py-3.5 hover:bg-accent-deep transition-colors">
                Request an Audit
              </button>
            </div>

            <div>
              <p className="type-label text-muted mb-4">type-caption</p>
              <p className="type-caption text-muted">
                The quick brown fox jumps over the lazy dog
              </p>
            </div>

            <div>
              <p className="type-label text-muted mb-4">
                type-numeral · Anton at oversized scale
              </p>
              <p className="type-numeral" style={{ color: "var(--color-accent-tint)" }}>
                01
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

Confirm the file was written.

TASK 4 — Start dev server and verify.
Run `npm run dev` in the background. Wait 15 seconds. Check whether http://localhost:3000 responds with 200. Report:
- Whether server started on port 3000 (NOT 3001)
- Whether response was 200
- Any compilation errors

If clean, pause for my browser verification.

TASK 5 — Wait for user verification.
Pause here. I will visit http://localhost:3000 in my browser and screenshot the type scale showcase. Once I say "verified", proceed to Task 6.

TASK 6 — Stop the dev server cleanly.
Stop the dev server. Verify port 3000 is free afterwards. Kill any lingering process with taskkill.

TASK 7 — Commit and push.
Run `git status` and report changes. Two files should be modified: `app/globals.css` and `app/page.tsx`. The new prompt file `prompts/STEP_03b_Type_Scale.md` should be untracked.

Stage all: `git add app/globals.css app/page.tsx prompts/STEP_03b_Type_Scale.md`

Commit with this exact message:
`feat(step-03b): codify OTS type scale as reusable utilities`

Push with `git push`.

TASK 8 — Final report.
Produce a summary:

STEP 3b COMPLETE
- app/globals.css: extended with 11 type utilities + 1 accent-word utility inside @layer components
- app/page.tsx: rewritten as full type-scale showcase page
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

### Check 1 — The showcase page renders every type style

Visit **http://localhost:3000**.

**What you should see, from top to bottom:**

- **Header block**: eyebrow label in accent → the OTS tagline in Anton with *better* in italic orange → subhead in Inter body-lg.

- **11 type demo rows**, each with a small label above and a "The quick brown fox..." sample below:
 1. **type-hero** — huge Anton at ~112px
 2. **type-h2** — Anton at ~72px
 3. **type-h3** — Anton at ~36px
 4. **type-h4** — Inter 600 at 20px (visibly smaller and different family than h3 — this is the display/interface boundary)
 5. **type-body-lg** — Inter 400 at 18px, generous line-height
 6. **type-body** — Inter 400 at 16px, standard reading size
 7. **type-body-sm** — Inter 400 at 14px
 8. **type-label** — Inter 600 at 11px, uppercase, wide letter-spacing (should look like all the small orange labels on the site)
 9. **type-button** — a real accent pill button using the utility
 10. **type-caption** — Inter 400 at 12px, quiet
 11. **type-numeral** — Anton at massive size (up to 200px), coloured in `accent-tint` (very pale peach) so it reads as texture rather than content

### Check 2 — Verify the display/interface boundary

Scroll to the **type-h3** and **type-h4** rows. The transition is important:

- **type-h3** (36px) is the smallest size at which Anton appears. Should look bold and condensed.
- **type-h4** (20px) is the largest size at which Inter is used. Should look like clean UI text, definitely NOT bold condensed.

**These two should look visually different** — different font family, not just different size. This is the Brand Bible rule made real: below 32px, Inter takes over.

### Check 3 — Verify the label style

Every small orange "type-hero", "type-h2" etc. label above each demo is itself styled with `type-label`. So the label style is demonstrating itself. Confirm it's uppercase, wide letter-spacing, small.

### Check 4 — Tell Claude Code to proceed

If everything renders correctly, reply in Claude Code:

```
Verified — full type scale renders correctly. type-hero, type-h2, type-h3, type-numeral all use Anton with correct sizes. type-h4, type-body-lg, type-body, type-body-sm, type-label, type-button, type-caption all use Inter. The display/interface boundary between type-h3 and type-h4 is visible. Accent word utility works. Please stop the dev server and continue with Tasks 6, 7, and 8.
```

### Check 5 — GitHub shows the new commit

Refresh https://github.com/ots-nl/website. Latest commit should read `feat(step-03b): codify OTS type scale as reusable utilities`. **6 commits total.**

---

## If something goes wrong

**One of the type utilities doesn't apply — text shows in browser default.**
The class name is wrong in the JSX, or the CSS wasn't written correctly. Ask Claude Code to show the current contents of `app/globals.css` and the relevant part of `app/page.tsx`. Paste to me.

**type-numeral is invisible.**
Expected — it uses `accent-tint` which is a very pale colour on cream background. It should still be visible as a faint texture. If it's genuinely gone, check whether the inline style attribute rendered.

**Everything renders but the h3 → h4 boundary doesn't look different enough.**
Zoom in with browser Ctrl+Plus. The h3 (Anton) has visibly different letterforms — narrower, bolder — than h4 (Inter). If they still look the same family, the font-family CSS isn't applying. Paste the compiled CSS to me.

**The header uses `type-accent-word` on "better" but it doesn't render italic/orange.**
The `.type-accent-word` class isn't being generated. Ask Claude Code to show the final `@layer components` block from `globals.css` and confirm the utility is present. Paste to me.

**Anything else.**
Paste the exact error and the current state of `app/globals.css` and `app/page.tsx`.

---

## What comes next

Once all five acceptance checks pass:

- ✅ All 11 type utilities render correctly
- ✅ Anton vs Inter boundary is visible
- ✅ Accent word utility works
- ✅ Type-numeral is faintly visible
- ✅ Commit visible on GitHub

Come back and say:

> **"Step 3b done. Give me Step 4a."**

**Step 4a** is `next-intl` setup — internationalisation. This changes how routing works (`/` for Dutch, `/en/` for English) and creates `messages/nl.json` and `messages/en.json` files that will hold all site copy. It's architecturally significant — every page from here on lives inside the `[locale]` folder structure — but visually invisible.

---

**Step 03b · Type Scale · v1.0 (Claude Code-driven)**
*Behind every smooth business is a better system.*
