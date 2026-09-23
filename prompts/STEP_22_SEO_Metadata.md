# STEP 22 — SEO Metadata + robots.txt + sitemap.xml

**Project:** Ontwikkeling Tech Services — Marketing Website
**Type:** Claude Code prompt + Deepak review gate on copy
**Estimated time:** 60–90 minutes build + 15 minutes copy review
**Prerequisites:** Step 21 complete (Vercel deploy live and verified end-to-end)
**Version:** 1.0

---

## Goal

Every page gets real per-page metadata — title, description, OpenGraph tags, Twitter Cards — so search engines can distinguish them from each other and social platforms render proper previews. Plus two utility files: `robots.txt` (protecting the Vercel preview URL from being indexed) and `sitemap.xml` (feeding Google the site's structure).

---

## Context

- Design spec: PRD §13 (SEO and performance requirements).
- Every page currently shares the site's default title tag — confirmed in Step 21's production verification report. That's a real SEO gap, but it's not a regression; it's just unbuilt work.
- Two integrations already exist that this step touches:
  - **next-intl** for locale routing — every metadata function needs to receive `locale` as a parameter and return locale-appropriate copy.
  - **Vercel** for hosting — introduces the `robots.txt` question below.

## One decision worth naming up front: the Vercel preview URL

The current live URL is `https://website-beta-three-30.vercel.app`. Two things could happen if we do nothing:

1. **Search engines could find and index it.** Vercel URLs are technically discoverable — a link from anywhere else on the web is enough to get Googlebot in.
2. **Once the real domain (`ontwikkelingtechservices.nl`) goes live**, if the Vercel URL is already indexed, Google sees two versions of the same site and treats one as duplicate content — hurting the real domain's ranking.

The fix is a conditional `robots.txt` that tells all crawlers to skip the site whenever it's being served from a `*.vercel.app` domain, and permits indexing whenever it's being served from the real production domain. This isn't paranoid — it's standard practice, and it costs nothing to add correctly on day one.

---

## Files to Create or Modify

- Every page file — inject a `generateMetadata` function per page: `app/[locale]/page.tsx` (homepage), `app/[locale]/diensten/page.tsx`, `app/[locale]/essays/page.tsx`, `app/[locale]/essays/[slug]/page.tsx`, `app/[locale]/contact/page.tsx`, `app/[locale]/privacybeleid/page.tsx`, `app/[locale]/algemene-voorwaarden/page.tsx`, `app/[locale]/not-found.tsx`
- `app/[locale]/layout.tsx` — set site-wide metadata defaults (OpenGraph image, site name, Twitter Card config)
- `app/robots.ts` — Next.js's programmatic robots.txt (dynamic based on host)
- `app/sitemap.ts` — Next.js's programmatic sitemap
- `public/og-default.png` — the default OpenGraph image (1200×630) used when a page doesn't specify one; described below
- `messages/nl.json` / `messages/en.json` — add a `metadata` namespace for all title/description strings

## The OpenGraph image

A dedicated `og-default.png` (1200×630, per Open Graph spec) is the image LinkedIn, WhatsApp, iMessage, and Twitter show when someone shares an OTS link. Right now there isn't one, so social platforms fall back to whatever they can find — usually a broken preview.

**For this step, use a text-only OG image** — no photograph, no faces, no logos we don't own the rights to. Design: `--cream` background, the wordmark *"ontwikkeling."* centred in Anton around 96px, the tagline *"Behind every smooth business is a better system."* below in Inter, subtle asterisk *✱* mark bottom-right in `--accent`. This is deliberately minimal — matches the Brand Bible's editorial tone and doesn't try to look like a marketing ad, which is what most OG images fail at.

**Ask Claude Code to generate this via HTML → PNG.** Next.js has a native `ImageResponse` API from `next/og` that renders JSX to PNG at request time — clean, fast, and doesn't require an actual image file to exist in `public/`. Alternative: create it as a static PNG in Figma/Canva and drop into `public/`. Either works; `ImageResponse` is more elegant and version-controlled.

---

## Detailed Specification — the Copy

Each entry below has the URL, the intended `<title>`, and the intended `<meta description>`. The title is what appears in browser tabs and search results; description is the ~155-character summary underneath. Titles should include the site name (`| OTS` suffix) except on the homepage which is the site name itself.

**Reviewer note for Deepak:** all NL strings below are drafts and should be reviewed alongside the other unreviewed Dutch copy. This is not launch-final wording.

### Homepage (`/`, `/en`)

- NL title: *"Ontwikkeling Tech Services — Business operating systems voor dienstverleners"*
- NL description: *"OTS bouwt operating systems die het handwerk uit dienstverlenende bedrijven halen. Een Audit, een Build, een Retainer. Geen uurwerk. Geen losse automatiseringen."*
- EN title: *"Ontwikkeling Tech Services — Business operating systems for service businesses"*
- EN description: *"OTS builds operating systems that remove manual work from service businesses. An Audit, a Build, a Retainer. No hourly work. No standalone automations."*

### Services (`/diensten`, `/en/services`)

- NL title: *"Diensten — Audit, Build, Retainer | OTS"*
- NL description: *"Drie diensten. Eén weg. Een Audit van twee weken (€2.500), een vaste-prijs Build, en een maandelijkse Retainer. Bekijk wat elk kost en wat je krijgt."*
- EN title: *"Services — Audit, Build, Retainer | OTS"*
- EN description: *"Three services. One progression. A two-week Audit (€2,500), a fixed-price Build, and a monthly Retainer. See what each costs and what you get."*

### Essays index (`/essays`)

- NL title: *"Essays over systemen en dienstverlening | OTS"*
- NL description: *"Denken over systemen, bedrijfsprocessen, en waarom losse tools zelden echte problemen oplossen. Geschreven voor eigenaren van dienstverlenende bedrijven."*
- EN title: *"Essays on systems and service businesses | OTS"*
- EN description: *"Thinking about systems, business processes, and why standalone tools rarely solve real problems. Written for owners of service businesses."*

### Essay detail (`/essays/[slug]`)

Per-essay from the MDX frontmatter: `title` becomes the meta title, `deck` becomes the description. Already authored — no new copy needed for existing essays; new essays inherit this pattern automatically.

### Contact (`/contact`, `/en/contact`)

- NL title: *"Contact — Vraag een Discovery-gesprek aan | OTS"*
- NL description: *"Een Discovery-gesprek van 45 minuten. Geen slide deck, geen verkooppraatje. Wij stellen vragen; jij vertelt wat je nodig hebt."*
- EN title: *"Contact — Request a Discovery call | OTS"*
- EN description: *"A 45-minute Discovery call. No slide deck, no sales pitch. We ask questions; you tell us what you need."*

### Privacy (`/privacybeleid`)

- NL title: *"Privacybeleid | OTS"*
- NL description: *"Hoe OTS omgaat met persoonsgegevens die via deze website worden verzameld — inclusief welke verwerkers we gebruiken en jouw rechten onder de AVG."*

### Terms (`/algemene-voorwaarden`)

- NL title: *"Algemene voorwaarden | OTS"*
- NL description: *"De algemene voorwaarden voor OTS's dienstverlening: Audit, Build, en Retainer. Toepasselijkheid, prijzen, aansprakelijkheid, en toepasselijk recht."*

### 404

- NL title: *"Pagina niet gevonden | OTS"*
- NL description: *"Deze pagina bestaat niet. Ga terug naar de startpagina of bekijk onze diensten."*
- EN title: *"Page not found | OTS"*
- EN description: *"This page doesn't exist. Go back to the homepage or see our services."*

---

## Detailed Specification — robots.txt behaviour

Two behaviours in one file, keyed off request host:

- Host contains `vercel.app` → serve `User-agent: *\nDisallow: /` (block all crawling)
- Host is `ontwikkelingtechservices.nl` → serve `User-agent: *\nAllow: /\nSitemap: https://ontwikkelingtechservices.nl/sitemap.xml` (allow all, point to sitemap)
- Any other host (localhost, staging, unknown) → default to block, safer than permit

## Detailed Specification — sitemap.xml behaviour

- Auto-generated from the site's actual page list
- Each URL listed with `lastModified`, `changeFrequency`, and `priority`
- Homepage priority 1.0, Services 0.9, Essays index 0.8, individual essays 0.7, everything else 0.5
- Include both locales for each page (`/` and `/en`, `/diensten` and `/en/services`)
- Skip 404 page (obviously)
- Base URL should be `https://ontwikkelingtechservices.nl` — this is what search engines will use once DNS switches, even though we're not there yet

---

## Ready-to-Paste Prompt for Claude Code

```
Build the SEO metadata layer per Step 22 spec. This affects every page but
adds no visual changes — pure metadata work.

1. Add a `metadata` namespace to messages/nl.json and messages/en.json
   containing the exact title/description strings from the Step 22 file,
   organised by page (homepage, services, essaysIndex, contact, privacy,
   terms, notFound).

2. In app/[locale]/layout.tsx, set site-wide metadata defaults:
   - metadataBase: new URL('https://ontwikkelingtechservices.nl')
   - openGraph: siteName "Ontwikkeling Tech Services", locale (dynamic
     from params), type "website", images pointing at a single default
     '/og-default.png' (see step 5)
   - twitter: card "summary_large_image", images matching the OG image

3. Add generateMetadata functions to every page listed in the spec's Files
   section. Each function:
   - Accepts { params: { locale } } (and slug for essay detail)
   - Reads the title and description from the locale's translations
   - Returns a Metadata object with title, description, openGraph
     (inheriting layout defaults but overriding title/description), and
     alternates.canonical set to the full absolute URL of the current page
   - For essay detail, read title and deck from the MDX frontmatter, not
     from the translations file

4. Create app/robots.ts as a Next.js dynamic robots handler:
   - Read the incoming request's host header
   - If host contains 'vercel.app' → return { rules: [{ userAgent: '*',
     disallow: '/' }] }
   - If host is 'ontwikkelingtechservices.nl' (or a www variant) → return
     { rules: [{ userAgent: '*', allow: '/' }], sitemap: 'https://
     ontwikkelingtechservices.nl/sitemap.xml' }
   - Any other host → default to full disallow (safer default)

5. Create app/sitemap.ts as a Next.js dynamic sitemap:
   - Include every real page listed in the spec, both locales
   - Read essay slugs from the actual content/essays/ directory rather
     than hardcoding — so future essays auto-appear
   - Set priorities per the spec (homepage 1.0, services 0.9, etc.)
   - Use https://ontwikkelingtechservices.nl as the base URL regardless of
     where the site is currently hosted — this is what will be indexed

6. Create the default OpenGraph image. Two options — pick whichever you
   judge cleaner for this codebase:
   a) Static PNG at /public/og-default.png, 1200x630, --cream background,
      "ontwikkelingtechservices." wordmark in Anton ~96px centered, tagline
      "Behind every smooth business is a better system." in Inter below,
      subtle accent-colored asterisk bottom-right.
   b) app/opengraph-image.tsx using next/og's ImageResponse API to render
      the same design as JSX/PNG at request time. Cleaner and doesn't
      require binary files in the repo, but requires @vercel/og.

   Whichever you choose, verify it renders correctly at
   /og-default.png (option a) or /opengraph-image (option b) before
   moving on. If it looks broken, don't ship broken.

7. Verify with Playwright against the deployed Vercel URL (after committing
   and pushing):
   - Check the <head> of each of the 12 real pages listed in Step 21's
     verification. Confirm each has a UNIQUE <title> and <meta
     name="description"> — no two pages sharing either.
   - Fetch /robots.txt on the Vercel URL. Confirm it returns
     "User-agent: *\nDisallow: /"
   - Fetch /sitemap.xml on the Vercel URL. Confirm it renders as valid XML
     containing every real page URL (using the ontwikkelingtechservices.nl
     base, not the Vercel URL).
   - Fetch the OG image URL and confirm it returns a 200 with a reasonable
     PNG (roughly 1200x630, actual visual content — not a 4KB blank).

8. Report every check individually, do not fix anything on failure, and
   commit + push when everything passes.
```

---

## Acceptance Test

Verify:

1. Every page has a unique, locale-appropriate `<title>` and `<meta description>` — no two pages share either.
2. `/robots.txt` on the Vercel URL returns a full disallow.
3. `/sitemap.xml` renders valid XML with the correct base URL (`ontwikkelingtechservices.nl`, not `website-beta-three-30.vercel.app`).
4. The default OG image renders correctly (open it directly in a browser to check).
5. Linkedin/WhatsApp preview test (manual): paste the Vercel URL into WhatsApp or LinkedIn's post composer — it should show a preview with the OG image, site title, and description. If the preview looks blank or wrong, the metadata isn't threading correctly.
6. `tsc --noEmit` clean, zero console errors after redeploy.

---

## Before this can be called done

Two review items, both in Deepak's territory:

- **NL copy review** for all title and description strings above — this is the metadata that will show in Google search results and social previews, so it carries real commercial weight. Not urgent-urgent (Vercel URL is disallowed anyway) but worth having in his queue before DNS switches.
- **Confirm the default OG image design is on-brand** once it renders — it's a small piece of surface but it's the first impression any share of the site makes.

---

## After this ships

Next: **Step 23 — Analytics + monitoring** (Plausible for privacy-preserving analytics, Sentry for error tracking, both flagged in the PRD's §13). That closes out the "know what's happening on the site once real traffic hits" gap before the domain switch.

---

*Behind every smooth business is a better system.*
