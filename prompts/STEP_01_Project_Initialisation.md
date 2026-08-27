# STEP 01 — Project Initialisation

**Project:** Ontwikkeling Tech Services — Marketing Website
**Type:** Claude Code prompt (fully Claude Code-driven from this step onward)
**Estimated time:** 30–45 minutes (mostly waiting for `npm install`)
**Owner:** Virat
**Version:** 1.1

---

## Read this first — how the workflow changes from here

**Step 0 was manual.** You typed commands in PowerShell, edited files by hand, made your first Git commit yourself. That was the right shape for setup — accounts, DNS, security decisions — because those aren't things you'd want an AI making silently.

**From Step 1 onward, Claude Code drives.** You paste one prompt per step into the Claude Code panel in VS Code. Claude Code proposes every command, edit, and Git action. **Your job is to approve each one.**

**How approval works:**

- Claude Code shows you a proposed command (e.g., `npx create-next-app@latest .`).
- You click **Allow** or **Deny**.
- Read what the command does before approving. `npx create-next-app` is safe. Any command containing `rm -rf`, `sudo`, or paths outside your project folder should make you pause.
- If Claude Code proposes something not in this prompt file, deny it and tell me what it wanted to do.

**You are the safety net.** No AI workflow protects you if you approve destructively. Read every command.

---

## Goal

Scaffold the Next.js 14 project structure with TypeScript, Tailwind CSS, and the App Router. Install all the additional dependencies the OTS Website PRD requires. Verify the development server runs. Commit the result to Git and push to GitHub.

By the end of this step, the site at `http://localhost:3000` will load the default Next.js welcome page — ugly, but proof the foundation works. Every subsequent step builds on this scaffold.

---

## Context

- References PRD v1.1 Section 10 (Tech Stack) and Section 12 (Build Plan).
- This is a scaffolding step — no OTS-specific design or content yet. Design starts in Step 2.
- No environment variables are set in this step. Those come in Step 3.

---

## Prerequisites

- ✅ Step 0 complete: local tools installed, all accounts created, first commit pushed to GitHub.
- ✅ VS Code is open, pointed at the `ots-website` folder (`C:\Users\offic\Projects\ots-website\`).
- ✅ Claude Code extension is installed and signed in.
- ✅ Internet connection is stable — this step downloads ~400 MB of dependencies.

If any of these aren't true, stop and tell Claude before proceeding.

---

## Files this step creates

Claude Code will create these:

- `package.json` — dependency manifest
- `package-lock.json` — locked versions of every dependency
- `tsconfig.json` — TypeScript configuration
- `next.config.mjs` — Next.js configuration
- `tailwind.config.ts` — Tailwind CSS configuration
- `postcss.config.mjs` — PostCSS configuration
- `eslint.config.mjs` (or `.eslintrc.json`) — code quality rules
- `app/layout.tsx` — root layout (Next.js default placeholder)
- `app/page.tsx` — home page (Next.js default placeholder)
- `app/globals.css` — global CSS (Tailwind directives)
- `public/` — folder for static assets
- `node_modules/` — installed dependencies (huge, gitignored)
- `next-env.d.ts` — Next.js TypeScript types

**Untouched (must remain as-is):**
- `.gitignore`
- `README.md`
- `prompts/STEP_00_Environment_Setup.md`
- `prompts/STEP_01_Project_Initialisation.md` (this file, once you save it)

---

## How to run this step

**Step-by-step:**

1. **Save this file** into `C:\Users\offic\Projects\ots-website\prompts\STEP_01_Project_Initialisation.md` so it lives alongside Step 0.

2. **Open VS Code** — it should already be pointed at the `ots-website` folder. If not, open the folder from File → Open Folder.

3. **Open the Claude Code panel** — click the Anthropic icon in the left Activity Bar of VS Code.

4. **Start a new Claude Code session** if one isn't already open.

5. **Copy the entire prompt below** — the whole block between the triple-backtick fences.

6. **Paste it into Claude Code and send.**

7. **Approve each command as Claude Code proposes it.** Read what it says. Approve if it matches the plan below. Deny anything unexpected and paste it back to me.

8. **Once Claude Code reports "STEP 1 COMPLETE"**, verify the acceptance checks at the bottom of this file. Then come back and tell me.

---

## THE PROMPT — paste this into Claude Code

```
You are executing Step 1 of the OTS website build. This is a scaffolding step — you will initialise a Next.js project, install dependencies, verify it works, and commit the result to Git.

Follow this plan exactly. Do not add extra files, dependencies, or configuration beyond what is listed. If any step fails or produces unexpected output, stop and report it to me — do not attempt fixes without asking.

CURRENT WORKING DIRECTORY:
The current directory is already a Git repository containing `.gitignore`, `README.md`, and a `prompts/` folder. Do not delete or modify any of these three items.

TASK 1 — Verify prerequisites.
Before doing anything else, verify the environment:
- Run `pwd` (or `Get-Location` on Windows PowerShell) and confirm the current directory path ends with `ots-website`.
- Run `git status` and confirm the working tree is clean OR only contains the STEP_01 prompt file as untracked. If there are other uncommitted changes, stop and ask me before proceeding.
- Run `ls` (or `dir` on PowerShell) and confirm `.gitignore`, `README.md`, and `prompts/` are present.
- Run `node --version` and confirm it returns v20.x or higher.
- Run `npm --version` and confirm it returns v10.x or higher.

Report the output of these five checks to me before proceeding to Task 2.

TASK 2 — Scaffold the Next.js project.
Run `create-next-app` in the current directory (not in a subfolder) with these exact settings:
- TypeScript: Yes
- ESLint: Yes
- Tailwind CSS: Yes
- Code inside a `src/` directory: NO (files go directly under `app/` at the project root)
- App Router: Yes
- Turbopack for `next dev`: accept the default
- Customize import alias: Yes, use `@/*`

The command should be:
`npx create-next-app@latest . --typescript --tailwind --app --no-src-dir --import-alias "@/*" --use-npm`

Adjust the flag names if the current version of create-next-app uses different ones — but the intent must match the settings above.

If create-next-app asks about Turbopack or any other option interactively, accept the default and tell me what it asked.

If create-next-app warns that the directory is not empty (because of `.gitignore`, `README.md`, `prompts/`), it should still proceed — those files should be preserved. If it refuses to run because the directory isn't empty, stop and ask me.

After scaffolding completes, report back with:
- Whether it succeeded.
- Confirm `.gitignore`, `README.md`, and `prompts/` are still present and unchanged.
- What version of Next.js was installed.

TASK 3 — Install additional dependencies.
Install these production dependencies:
`npm install next-intl @supabase/supabase-js resend framer-motion @sentry/nextjs`

Install these development dependencies:
`npm install -D prettier prettier-plugin-tailwindcss`

Report the output. Confirm no installation errors.

TASK 4 — Verify TypeScript strict mode.
Open `tsconfig.json`. Confirm `"strict": true` is present inside the `compilerOptions` block. If it isn't, add it. Report what the file currently contains for that setting.

TASK 5 — Verify the .gitignore excludes node_modules.
Open `.gitignore` and confirm `node_modules/` is listed. It should already be there from Step 0, but verify. If `create-next-app` added a second `.gitignore` or overwrote the existing one, tell me — do not silently reconcile them.

TASK 6 — Test the development server.
Run `npm run dev` in the background. Wait 15 seconds for it to start. Then check whether it responded on `http://localhost:3000` — either by making an HTTP request to it or by checking the terminal output for a "Ready" message.

Report:
- Whether the server started.
- What port it's listening on (should be 3000).
- Whether an HTTP request to `http://localhost:3000` returns a 200 status code.

Then stop the dev server (Ctrl+C or equivalent).

TASK 7 — Prepare the Git commit.
Run `git status` and report the list of new untracked files.

Verify that `node_modules/` does NOT appear in the untracked list. If it does, the `.gitignore` isn't working — stop and tell me.

Stage all changes: `git add .`
Run `git status` again and report the staged files.

Commit with this exact message:
`chore(step-01): scaffold Next.js 14 project with TypeScript, Tailwind, App Router`

TASK 8 — Push to GitHub.
Run `git push`. If Git asks for authentication, prompt me to enter credentials (I will use my GitHub username `virat-ots` and my Personal Access Token as the password).

Report the output. Confirm the push succeeded.

TASK 9 — Final report.
Produce a summary in this format:

STEP 1 COMPLETE
- Next.js version: [version]
- Dependencies installed: [list]
- TypeScript strict mode: [confirmed / not confirmed]
- Dev server: [worked / did not work]
- Git commit: [hash and message]
- Git push: [succeeded / failed]
- Files/folders in repo: [list from ls]
- Any warnings or unexpected output: [list, or "none"]

END OF PROMPT.
```

---

## Acceptance test — what you verify after Claude Code finishes

Once Claude Code reports "STEP 1 COMPLETE", do these five checks yourself. Do not skip them.

### Check 1 — The site loads in your browser

Even though Claude Code tested this programmatically, look at it with your own eyes.

- Ask Claude Code to run `npm run dev` again (or run it yourself in the VS Code terminal).
- Open **http://localhost:3000** in your browser.
- You should see the default Next.js welcome page — a big "Next.js" logo, some links, "Get started by editing app/page.tsx", etc.
- It will be ugly. That is expected.
- Once you've seen it, ask Claude Code to stop the dev server (or press **Ctrl + C** in the terminal yourself).

### Check 2 — The commit is on GitHub

- Open **https://github.com/ots-nl/website** in your browser.
- Refresh.
- You should see many new files listed (`app/`, `package.json`, `tsconfig.json`, `tailwind.config.ts`, etc.) alongside the existing `.gitignore`, `README.md`, and `prompts/`.
- The latest commit message at the top should read **"chore(step-01): scaffold Next.js 14 project with TypeScript, Tailwind, App Router"**.
- Click the commit to see the file changes.

### Check 3 — node_modules is NOT on GitHub

- On the GitHub repo page, scan the file list.
- **There should be NO `node_modules/` folder listed on GitHub.**
- If you see it — stop. This means the `.gitignore` didn't work correctly and hundreds of megabytes of dependencies got pushed to GitHub. Tell me immediately.

### Check 4 — Both prompt files are still there

- On GitHub, click into the `prompts/` folder.
- You should see **two files**: `STEP_00_Environment_Setup.md` and `STEP_01_Project_Initialisation.md`.
- If either is missing, tell me — something got deleted that shouldn't have.

### Check 5 — Read Claude Code's final report

Look at the "STEP 1 COMPLETE" summary Claude Code produced. Every line should say something reasonable — versions of packages, "confirmed", "succeeded". If any line says "did not work", "not confirmed", or lists a warning you don't understand, paste the whole summary back to me and we'll diagnose.

---

## If something goes wrong

**Claude Code proposed a command that looked scary.**
Deny it. Copy the exact command and paste it to me. I'll tell you if it was safe or not.

**Claude Code did something not in the plan.**
Stop. Do not commit. Ask Claude Code to run `git status` and paste the output to me. We'll figure out what happened and fix it.

**`create-next-app` refused to run because the directory isn't empty.**
Ask Claude Code to move `.gitignore`, `README.md`, and `prompts/` to a temporary location, run create-next-app, and move them back. Do not delete these three files.

**`npm install` fails with permission errors.**
Windows Defender or antivirus is likely interfering. Ask Claude Code to retry once. If it fails again, tell me — you may need to add `C:\Users\offic\Projects\` to Windows Defender's excluded folders.

**Port 3000 is already in use.**
Another process is using it. Ask Claude Code to check what's on port 3000 and either kill it or use port 3001 instead. Tell me either way.

**Git push fails with authentication error.**
You need your Personal Access Token from Step 0. It's in your password manager under "OTS GitHub PAT (local dev)". Paste it as the password when Claude Code (or the terminal) prompts.

**The default Next.js page shows red error messages in the browser.**
Screenshot the errors. Paste to me. Common causes are missing fonts, TypeScript errors, or missing config. All fixable.

**Anything else.**
Paste to me:
1. What Claude Code was doing when it failed.
2. The exact error message.
3. The last few things Claude Code proposed.

Do not attempt three different fixes yourself. Ask.

---

## What comes next

Once all five acceptance checks pass:

- ✅ Site loads locally
- ✅ Commit on GitHub
- ✅ No `node_modules/` on GitHub
- ✅ Both prompt files still in `prompts/`
- ✅ Claude Code's summary is clean

Come back to Claude and say:

> **"Step 1 done. Give me Step 2a."**

Step 2a is the first customisation step — configuring Tailwind with the OTS brand colour tokens from the Brand Bible (cream, ink, accent orange, etc). This is where the site starts looking like OTS instead of a Next.js template.

---

**Step 01 · Project Initialisation · v1.1 (Claude Code-driven)**
*Behind every smooth business is a better system.*
