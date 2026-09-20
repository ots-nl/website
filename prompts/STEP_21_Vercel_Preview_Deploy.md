# STEP 21 — Vercel Preview Deploy

**Project:** Ontwikkeling Tech Services — Marketing Website
**Type:** Deployment step — mostly you working in a browser, one short Claude Code prompt at the end
**Estimated time:** 45–75 minutes
**Prerequisites:** Steps 0–20 complete, local branch 2 commits ahead of `origin/main`, `.env.local` populated with all real values (Supabase, Resend), Vercel personal account live.
**Version:** 1.0

---

## Goal

Get the site running on Vercel's real infrastructure at a preview URL. This is the first test of whether the site actually works outside `localhost` — with a real production build, real environment variables, real Supabase and Resend calls from a serverless runtime, not from your machine.

**This step does not touch DNS.** The site becomes reachable at a `*.vercel.app` URL, not at `ontwikkelingtechservices.nl`. That's Step 25 territory, gated behind the pre-launch checklist, not this one.

---

## What could go wrong (so you know what to look for)

Local dev hides at least four categories of problems that only surface on a real build:

1. **Missing environment variables** — `.env.local` is on your machine; Vercel has none until you paste them in. Anything read via `process.env` that isn't in the Vercel dashboard will be `undefined` in production, which usually crashes the API route rather than silently misbehaving.
2. **`NEXT_PUBLIC_*` mistakes** — any variable prefixed `NEXT_PUBLIC_` is embedded into the client bundle at build time. If a service role key ends up in a `NEXT_PUBLIC_*` variable, it's exposed to every visitor. This is the single most damaging mistake possible in this step.
3. **`fs` or Node-only APIs in Client Components** — same category as the `lib/mdx.ts` issue Claude Code caught back in Step 17. Dev server tolerates a lot that a production build refuses.
4. **Case-sensitive filenames** — Windows and Mac are case-insensitive on the filesystem; Vercel's Linux build isn't. `import Nav from './nav'` might work locally and fail in production if the file is actually `Nav.tsx`.

If the deploy fails, it's almost always one of these four. Save the build log and I can read it — don't just re-run and hope.

---

## Files touched during this step

Almost none — this is mostly Vercel dashboard work. Claude Code's involvement is a single prompt at the end to verify the deploy from the outside.

Two things you may add to the repo along the way:
- `.gitignore` — add `.mcp.json` and `.playwright-mcp/` explicitly (loose end from the last commit)
- `README.md` — worth stubbing if it doesn't exist, since Vercel's project page reads from it

---

## Part 1 — Prep the repo (5 minutes, in VS Code)

1. Open `.gitignore` and add these two lines at the bottom:
   ```
   .mcp.json
   .playwright-mcp/
   ```
   These are your local Playwright MCP config and its runtime artifacts — they belong on your machine, not in the repo. Making it explicit is safer than leaving them silently untracked.

2. If there's no `README.md` yet, create a minimal one. Just enough that a Vercel project page has something to show:
   ```
   # Ontwikkeling Tech Services
   Marketing website for OTS. Next.js 16, TypeScript, Tailwind CSS v4,
   next-intl (NL default, EN at /en), Supabase (Frankfurt) + Resend for
   the contact form.
   ```
   Nothing more — this isn't public-facing documentation, it's just the repo landing card.

3. Commit these two small changes:
   ```
   git add .gitignore README.md
   git commit -m "Prep for Vercel deploy: gitignore MCP artifacts, add README stub"
   ```

4. Push everything:
   ```
   git push origin main
   ```
   You should end up with `origin/main` fully caught up, no local commits ahead. Confirm with `git status` before continuing.

---

## Part 2 — Import the project into Vercel (10 minutes)

1. Go to `vercel.com/new` in a browser, signed in with your personal account.
2. Under "Import Git Repository," find and select `ots-nl/website` (or whatever your repo's exact name is). If it doesn't show up: click "Adjust GitHub App Permissions" and give Vercel access to that specific repo. Grant access to a single repo, not all of them — smaller blast radius if anything is ever misconfigured on the GitHub side.
3. On the "Configure Project" screen, Vercel should auto-detect Next.js. **Don't override the build settings** — the defaults are correct and match how your project is structured. If it doesn't detect Next.js, stop and paste me a screenshot before touching anything.
4. **Do not click Deploy yet.** Expand the "Environment Variables" section first — see Part 3.

---

## Part 3 — Environment variables (15–20 minutes, the part where mistakes are most costly)

This is the step to slow down on. Vercel supports three environments: Production, Preview, and Development. For each variable, you can control which environment(s) it applies to. This build wants all real values active in **Production and Preview** (not Development — Development refers to a rare local-with-Vercel-CLI mode you're not using).

Open `.env.local` in one VS Code pane. In another browser tab, open your Vercel project's Environment Variables section. Add each variable one at a time. **After each one, verify the "Environments" checkboxes are Production + Preview (not Development).**

The variables, in the order they appear in your `.env.local`:

| Variable | Type | Notes |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Public | Fine — this is meant to be in the client bundle |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public | Fine — anon key is designed to be public, RLS enforces access |
| `SUPABASE_SERVICE_ROLE_KEY` | **Secret** | **Critical: no `NEXT_PUBLIC_` prefix.** If you accidentally type `NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY`, the entire service role key gets shipped to every visitor's browser. Stop and delete the variable if you catch yourself doing this. |
| `RESEND_API_KEY` | **Secret** | Same rule — no `NEXT_PUBLIC_` prefix, ever |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | Public | If set locally; skip if you haven't wired Plausible in yet |
| `SENTRY_DSN` | Secret | Same; skip if not yet configured |

**Sanity check before continuing:** in Vercel's environment variables list, every variable prefixed `NEXT_PUBLIC_*` should be a Supabase URL, anon key, Plausible domain, or similar innocuous string. If anything sensitive-looking is under a `NEXT_PUBLIC_` name, fix it now — this is the one mistake you cannot cleanly recover from later (a leaked service role key needs rotating at Supabase, not just editing at Vercel).

---

## Part 4 — First deploy (5–10 minutes, mostly waiting)

Click Deploy. Vercel will:

- Clone the pushed repo
- Install dependencies
- Run `next build` — this is where the build-time mistakes surface
- Deploy to a preview URL

**If the build fails:** don't just retry. Read the error in the build log. Nine times out of ten it's one of the four categories from the top of this file. Save the exact error text (copy the relevant section, not a screenshot — text is easier for me to read and search than an image), and paste it to me. I'll tell you which category it falls into and what to change.

**If the build succeeds:** you'll get a URL that looks like `https://ots-website-<random>.vercel.app` (or, if Vercel auto-generates a pretty preview name, something like `https://ots-website.vercel.app`). Note this URL — it's the site's real, publicly reachable-but-private-by-obscurity address until DNS gets pointed at it.

---

## Part 5 — Verify the deployed site works (Claude Code + Playwright)

Paste this to Claude Code:

```
The OTS website has just been deployed to Vercel at [PASTE-YOUR-VERCEL-URL-HERE].
Use Playwright to verify the deployed site works correctly — same discipline
as the localhost QA passes but against the real Vercel URL, not localhost:3000.

For every check below, screenshot to qa-screenshots/deploy/ with clear
filenames. Do NOT modify any files; this is verification only.

1. Homepage loads at the Vercel URL, both /nl (or /) and /en, no console
   errors, all fifteen sections plus footer render. Take a full-page
   screenshot of each locale.

2. Navigate to /diensten, /en/services, /essays, /essays/reserveringen-zes-
   kanalen, /essays/hoe-een-audit-eruitziet, /essays/waarom-we-geen-chatbots-
   verkopen, /contact, /en/contact, /privacybeleid, /algemene-voorwaarden.
   Confirm each returns 200 and renders. Screenshot each.

3. Real production contact-form test: submit a form with test data through
   the deployed /contact page (name "Vercel Deploy Test," a real email you
   control, sector "professioneel," a short bericht). Confirm:
   a) The form's confirmation state renders
   b) A row lands in the Supabase inquiries table (verify via Supabase
      Studio and screenshot the row — this proves SUPABASE_SERVICE_ROLE_KEY
      is set correctly in Vercel)
   c) A notification email actually arrives at admin@ontwikkelingtechservices.nl
      (proves RESEND_API_KEY works from a real Vercel serverless function).
   Delete the test row from Supabase afterward.

4. Navigate to a URL that doesn't exist (/deploy-test-not-a-real-page) and
   confirm the site's real 404 page renders — not Vercel's fallback. Same
   at /en/deploy-test-not-a-real-page.

5. Open browser devtools on the deployed site. In the Network tab, filter
   by "supabase" or "resend" and confirm NO requests to those services
   originate from the client — every Supabase/Resend call should be
   server-side only. If you see either service being called from the
   browser, that's a real bug (leaked service key or misconfigured route).

6. Report each check as PASS/FAIL with a note. If anything fails, do NOT
   attempt to fix it — describe what you saw and leave it to me.
```

---

## Acceptance Test

Verify the results of Part 5. Specifically:

1. Every route from the site architecture loads at the Vercel URL in both locales, no console errors.
2. A real contact form submission produces both the Supabase row AND the Resend email — this is the actual proof that Vercel has the environment variables set correctly, not just that the code compiles.
3. The 404 page renders correctly at the deployed URL.
4. No Supabase or Resend calls originate from the client.

---

## If This Doesn't Work

- **Build fails with "Module not found" and a filename that exists locally:** almost always a case-sensitivity issue. Rename the file (e.g. `nav.tsx` → `Nav.tsx`) *and* update every import, on a fresh branch, and commit.
- **Build succeeds but the site 500s when you visit it:** check Vercel's Runtime Logs (project → Logs tab). Nine times out of ten it's a missing environment variable — you'll see something like "Cannot read properties of undefined (reading 'SUPABASE_URL')".
- **Form submits but no email arrives:** check the Resend dashboard's event log for the actual delivery status; the form succeeding client-side doesn't mean the email actually sent (this is what the Step 18 test caught pre-Resend-verification).
- **Form submits but no Supabase row:** almost certainly `SUPABASE_SERVICE_ROLE_KEY` is either missing or accidentally prefixed `NEXT_PUBLIC_`. Fix the variable in the Vercel dashboard, then redeploy (Vercel → project → Deployments → Redeploy latest).
- **Paste the exact error, the full build log or runtime log, and "Step 21" back to Claude if anything else breaks.**

---

## After this ships

The site is running on real infrastructure at a private-by-obscurity Vercel URL. From this point onward:

- Every push to `main` auto-deploys to production preview.
- Every PR (once you use them) gets its own preview URL — useful for reviewing changes before merging.
- The DNS switch to `ontwikkelingtechservices.nl` remains explicitly parked until the pre-launch gates clear.

Step 22 is the SEO / metadata / OpenGraph pass (PRD §13) — the first thing worth doing against the real deployment, since it directly affects how the site appears in search and social previews.

---

*Behind every smooth business is a better system.*
