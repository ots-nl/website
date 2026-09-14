# STEP 18 — Contact Page

**Project:** Ontwikkeling Tech Services — Marketing Website
**Type:** Claude Code prompt
**Estimated time:** 90–120 minutes
**Prerequisites:** Step 17 complete (Essays). Supabase `inquiries` table and Resend domain both already provisioned and verified back in Step 0 — confirm both still show as active before starting, since this is the first step that actually writes to them.

---

## Goal

Build `/contact` (NL) / `/en/contact` (EN) — the page carrying the site's actual lead-generation mechanism. Everything before this step was informational; this is the first page where a real visitor action produces a real business outcome (a row in Supabase, an email in your inbox).

---

## Context

- Design spec: PRD §7.2 — reproduced in full below.
- Security requirements: PRD §14.1 (form security) and §14.2 (Supabase security) — reproduced below, not optional.
- Table schema: already created in Step 0 — `inquiries` with columns `id`, `naam`, `bedrijf`, `email`, `telefoon`, `sector`, `bericht`, `taal`, `bron`, `aangemaakt_op`. This step's API route writes to that exact schema — don't alter it without a reason called out explicitly (see the rate-limiting note below, where one comes up).
- Contact details: same real values as the Footer (Step 15) — `admin@ontwikkelingtechservices.nl`, no WhatsApp or physical address yet (same open item, not re-asking here).

---

## One thing to decide before this ships: rate limiting

PRD §14.1 requires "5 submissions per IP per hour," but the `inquiries` table as provisioned has **no column to key that off** — no `ip_address` field. Two ways to handle it, and this is worth a real decision rather than Claude Code guessing:

- **Option A — add an `ip_address` column to `inquiries`.** Simple, robust, works across serverless cold starts. Downside: you're now storing IP addresses (personal data under GDPR) permanently alongside every inquiry, for a rate-limiting purpose that doesn't need permanent storage.
- **Option B — in-memory rate limiting at the edge, no IP stored anywhere.** More privacy-preserving (nothing persisted), consistent with "choose the most privacy-preserving option" as a general default. Downside: less robust — a serverless cold start resets the in-memory counter, so a determined abuser could work around it. For a B2B lead form that isn't a high-value spam target, this is a reasonable trade-off to start with.

**This build uses Option B.** If the contact form ever gets actually abused, that's the signal to revisit and move to a real rate-limiting service (Upstash Redis is the standard pairing with Vercel) rather than storing IPs preemptively for a problem that may never happen.

---

## Files to Create or Modify

- `app/[locale]/contact/page.tsx`
- `components/sections/contact/ContactForm.tsx`
- `app/api/inquiry/route.ts` — the actual submission handler
- `lib/supabase.ts` — Supabase client (server-side, service role key)
- `lib/rate-limit.ts` — simple in-memory rate limiter (Option B above)
- `messages/nl.json` / `messages/en.json` — `contact` namespace

---

## Detailed Specification

### Page layout

- Background `--mist` (sage) — **the one page where this is the primary background**, per Brand Bible's palette rule. Don't reuse `--mist` as a primary background anywhere else on the site without checking that rule first.
- Two-column asymmetric: **left 45% intro + info, right 55% form.** Section padding 128px vertical.

### Left column

- Eyebrow: *"// Contact"*.
- H1: Anton. NL: *"Laten we een **echt** gesprek voeren."* / EN: *"Let's have a **real** conversation."* — with *"echt"*/*"real"* in Cormorant Garamond Italic 500, `--accent`. **This is this page's one italic accent word** — every major page gets exactly one, not one for the whole site (Hero already used "better" for the homepage; this is a separate, page-scoped instance and that's correct, not a violation).
- Body: Inter 400 17px `--ink-soft`, max-width 400px. NL: *"Een Discovery-gesprek duurt 45 minuten. Geen slide deck. Geen verkooppraatje. Wij stellen vragen over je bedrijf; jij vertelt wat je daadwerkelijk nodig hebt. Zijn we de juiste partner? Dan zeggen we dat. Zijn we het niet? Dan zeggen we dat ook — en vertellen we je wie dat mogelijk wel is."*
- Contact info, mt-64:
  - `admin@ontwikkelingtechservices.nl`, mailto link, Inter 500 15px `--ink`.
  - No WhatsApp/phone or physical address line — omit entirely, same as the Footer.
  - Response promise: *"We reageren binnen 24 uur op werkdagen."* / *"We reply within 24 hours on business days."* — Inter 400 13px `--muted`.

### Right column — the form

- Container: `--cream` background (deliberate contrast against the mist page background), `border-radius: 24px`, padding 48px.
- Field pattern: label above field (Inter 500 12px uppercase, 0.14em tracking, `--muted`), input itself Inter 400 16px `--ink`, transparent background, 1px `--rule` bottom border only (not a full box). Focus state: bottom border becomes `--accent`, 300ms transition.
- Fields, in order:
  1. Naam / Name (required, text)
  2. Bedrijf / Company (required, text)
  3. E-mail / Email (required, email format validated)
  4. Telefoon / Phone (optional, text)
  5. Sector / Industry (required, dropdown: horeca/hospitality · kliniek/clinic · professioneel/professional services · anders/other)
  6. Wat wil je bespreken? / What would you like to discuss? (required, textarea, 4 rows)
- Submit button: primary variant, *"Verstuur"* / *"Send"*, full-width on mobile.
- Below the form: small privacy note, Inter 400 12px `--muted`, linking to the (not-yet-built) `/privacybeleid` page — same expected-404 pattern as other legal links already on the site.
- **Add a GDPR consent checkbox above the submit button, even though the PRD spec doesn't explicitly call for one.** The PRD's own reasons for putting the Supabase project in Frankfurt and calling out RLS are GDPR reasons — an unchecked consent step is a real gap given that intent, not a stylistic addition. Text: *"Ik ga akkoord dat OTS deze gegevens gebruikt om contact met mij op te nemen."* / *"I agree that OTS may use this information to contact me."* Required to submit.

### Form submission flow

1. Client-side: basic validation (required fields, email format) before submit, for immediate feedback — this is UX, not the security boundary.
2. `POST /api/inquiry` with form data.
3. Server-side (the real security boundary, per PRD §14.1): re-validate every field regardless of client-side checks, strip HTML from all text inputs, trim whitespace, validate email format again.
4. Check the in-memory rate limiter (`lib/rate-limit.ts`) — reject with a 429 if the requesting IP has made 5+ submissions in the past hour. IP is read from the request only to check against the in-memory counter — **never write it to Supabase.**
5. Insert into `inquiries` via the Supabase server client (service role key, server-side only, never exposed to the client): `naam`, `bedrijf`, `email`, `telefoon`, `sector`, `bericht`, `taal` (locale of submission), `bron` (e.g. `"/contact"` or referring page if available).
6. Send a notification email via Resend to `admin@ontwikkelingtechservices.nl` with the submission details.
7. Return a success response; on the client, show a confirmation state in place of the form (don't just alert() — replace the form with a calm confirmation message matching the site's tone).
8. On any failure, show an honest error state, not a silent failure — and don't leave the user's typed content lost if something goes wrong.

---

## Ready-to-Paste Prompt for Claude Code

```
This prompt is self-contained — full spec above, no need to look for a PRD
file in the repo.

Before starting, confirm the Supabase inquiries table and Resend domain
verification are both still active (check the environment variables already
set in Step 0: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY,
RESEND_API_KEY). If any are missing, stop and tell me rather than proceeding
with a broken integration.

1. Create lib/supabase.ts — a server-only Supabase client using the service
   role key (never expose this key to the client bundle; if any file that
   imports lib/supabase.ts is also imported by a Client Component, that's a
   bug — server-only Supabase access, same pattern as the fs-in-lib.mdx
   lesson from Step 17).

2. Create lib/rate-limit.ts — a simple in-memory rate limiter keyed by
   request IP, allowing 5 requests per IP per rolling hour. This is Option B
   from the spec: IP is used transiently in memory only, never persisted to
   Supabase or logged anywhere durable.

3. Create app/api/inquiry/route.ts (Next.js Route Handler, POST):
   - Re-validate every field server-side regardless of what the client sent
     (required fields present, email format valid, all text fields stripped
     of HTML and trimmed).
   - Check the rate limiter; return 429 if exceeded.
   - Insert into the inquiries table via the Supabase server client: naam,
     bedrijf, email, telefoon (nullable), sector, bericht, taal (from the
     request locale), bron.
   - Send a notification email via Resend to admin@ontwikkelingtechservices.nl
     with the submission details, plain and readable, no HTML template needed
     for v1.
   - Return appropriate success/error JSON responses. No console.log left in
     this file when done — Development Bible bans console.log in production
     code; use proper error handling instead.

4. Create components/sections/contact/ContactForm.tsx:
   - All fields per spec, in order, with the label-above/bottom-border-only
     styling described.
   - Client-side validation before submit (required fields, email format) —
     purely for immediate user feedback, not a security boundary.
   - The GDPR consent checkbox above the submit button, required to enable
     the Send button.
   - On submit: POST to /api/inquiry. On success, replace the form with a
     calm confirmation message (not an alert()). On failure, show an honest
     inline error and preserve what the user typed — don't clear the form on
     a failed submission.

5. Create app/[locale]/contact/page.tsx per the layout spec: --mist
   background, two-column asymmetric (45/55), left column content as
   specified, right column containing ContactForm inside the --cream
   card container.

6. Add a "contact" namespace to messages/nl.json and messages/en.json with
   all copy above, including field labels, the consent checkbox text, and
   both success/error confirmation messages.

7. Test the full flow yourself: submit a real test inquiry through the
   rendered form, confirm a row appears in the Supabase inquiries table, and
   confirm a notification email arrives at admin@ontwikkelingtechservices.nl.
   Report the results of this real end-to-end test, not just that the code
   compiles.

8. Run tsc --noEmit, confirm no console errors, confirm no console.log
   statements remain in app/api/inquiry/route.ts specifically.
```

---

## Acceptance Test

Verify:

1. `/contact` and `/en/contact` both render correctly — `--mist` background, correct two-column layout, italic accent word on "echt"/"real" only.
2. All six fields plus the consent checkbox render with correct styling (bottom-border-only, label-above).
3. Submitting with a required field empty shows client-side validation feedback, doesn't hit the API.
4. Submitting a complete, valid test inquiry:
   - Produces a new row in the Supabase `inquiries` table with correct data in every column.
   - Triggers a real email arriving at `admin@ontwikkelingtechservices.nl` via Resend.
   - Replaces the form with a confirmation message on the frontend.
5. Submitting 6 times rapidly from the same session triggers the rate limit on the 6th attempt (429 response, shown as an honest error, not a crash).
6. No IP address appears anywhere in the Supabase `inquiries` table.
7. `tsc --noEmit` clean, zero console errors, zero `console.log` statements in the API route.

---

## If This Doesn't Work

- **Resend email doesn't arrive:** check the domain verification status first (Dashboard → Domains) — if it shows anything other than fully verified, that's the cause, not a code bug.
- **Supabase insert fails silently:** check Row Level Security policies — RLS was enabled in Step 0, which means writes need to go through the service role key specifically, not the anon public key. Confirm `lib/supabase.ts` uses `SUPABASE_SERVICE_ROLE_KEY`, not `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
- **Rate limiter doesn't reset correctly between test runs:** in-memory state resets on every dev-server restart — this is expected in local development and isn't itself a bug, just don't mistake a restart for the limiter "not working."
- **Consent checkbox blocks submission even when checked:** confirm the checked state is actually wired into the submit button's disabled condition, not just visually present.
- **Paste the exact error, the file Claude Code produced, and "Step 18" back to Claude if anything else breaks.**

---

## After this ships

This is the first page where a real mistake has real consequences — a broken form silently loses an actual prospect, not just a cosmetic bug. Worth an actual test submission from your own phone, not just Claude Code's automated check, before you consider this closed.

---

*Behind every smooth business is a better system.*
