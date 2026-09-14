# STEP 19 — Privacy Policy + Terms Pages

**Project:** Ontwikkeling Tech Services — Marketing Website
**Type:** Draft legal content + Claude Code prompt
**Estimated time:** 60–90 minutes
**Prerequisites:** Step 18 complete (Contact). No new dependencies.

---

## ⚠ Before anything else: this is not legal advice

I'm not a lawyer, and neither is Claude Code. The PRD doesn't spec detailed content for these two pages — only that they need to exist and cover GDPR and terms of service. What follows is a **factually-grounded draft** based on what's actually true about your tech stack and business terms (the real data processors you use, the real payment terms from the Services Bible) — not boilerplate copied from somewhere, and not invented claims. But a privacy policy and terms of service carry real legal exposure if they're wrong, in a way that's categorically different from a typo in marketing copy.

**Treat this the same as the KVK/BTW numbers, but higher stakes:** don't publish this without a Dutch lawyer (or a service like Firmwork or a template from a Dutch legal-tech provider, reviewed by someone qualified) actually looking at it first. I've marked the draft clearly so it's obvious this gate exists — same pattern as every other "real data required before launch" item on this build.

---

## Files to Create or Modify

- `app/[locale]/privacybeleid/page.tsx`
- `app/[locale]/algemene-voorwaarden/page.tsx`
- `components/sections/legal/LegalDocument.tsx` — one reusable layout component for both pages, since they're structurally identical (header + single-column body)
- `messages/nl.json` / `messages/en.json` — `legal` namespace

---

## Layout Specification

The PRD doesn't define a dedicated spec for these pages, so this reuses the site's existing editorial reading pattern rather than inventing a new one — same approach as the essay detail page, since both are "long single-column text the visitor reads," not marketing surfaces.

- Background `--cream`.
- Single-column container, 720px max-width, centred (same measure as essay body).
- Header: eyebrow (*"// Privacybeleid"* / *"// Algemene voorwaarden"*), H1 Anton `clamp(40px, 6vw, 72px)`, then a "last updated" date line in Inter 400 13px `--muted`.
- Body: Inter 400 17px `--ink-soft`, line-height 1.7 — reuse the same H2/H3/list typography treatment already built for essay bodies in Step 17's `mdxComponents.tsx` rather than rebuilding it.
- No sidebar, no table of contents, no decorative elements — these pages exist to be read carefully, not to sell.

---

## Draft Content — Privacy Policy (`/privacybeleid`)

```markdown
# Privacybeleid

Laatst bijgewerkt: [DATUM VOOR PUBLICATIE INVULLEN]

## Wie we zijn

Ontwikkeling Tech Services (OTS), ingeschreven bij de KVK onder nummer
42027611, BTW-nummer NL005440779B20, gevestigd in Amsterdam, is
verantwoordelijk voor de verwerking van persoonsgegevens zoals beschreven in
dit privacybeleid.

## Welke gegevens we verzamelen

Wanneer je het contactformulier op deze website invult, verzamelen we: je
naam, bedrijfsnaam, e-mailadres, telefoonnummer (optioneel), sector, en de
inhoud van je bericht.

We gebruiken Plausible Analytics voor websitestatistieken. Plausible plaatst
geen cookies en verzamelt geen persoonlijk identificeerbare gegevens.

## Waarom we deze gegevens verzamelen

We gebruiken deze gegevens uitsluitend om contact met je op te nemen naar
aanleiding van je aanvraag, en om te beoordelen of we een geschikte partner
voor je zijn. We gebruiken je gegevens niet voor marketingdoeleinden zonder
je uitdrukkelijke toestemming.

## Hoe lang we gegevens bewaren

[TE BEVESTIGEN MET JURIDISCH ADVIES — voorstel: contactformulier-inzendingen
worden 24 maanden bewaard vanaf het laatste contactmoment, tenzij een
klantrelatie ontstaat, in welk geval de gegevens worden bewaard zolang de
relatie actief is plus de wettelijke bewaartermijn voor administratie.]

## Met wie we gegevens delen

We delen gegevens met de volgende verwerkers, uitsluitend voor het
functioneren van deze website:

- **Supabase** (database-opslag, gehost in Frankfurt, EU) — voor het
  opslaan van contactformulier-inzendingen.
- **Resend** (e-mailverzending) — voor het versturen van
  meldingen naar ons team wanneer een formulier wordt ingediend.
- **Vercel** (hosting) — voor het draaien van de website zelf.
- **Plausible** (analytics) — cookievrij, geen persoonlijk identificeerbare
  gegevens.

We verkopen nooit gegevens aan derden.

## Jouw rechten

Onder de AVG heb je het recht op inzage, rectificatie, verwijdering,
beperking van verwerking, en dataportabiliteit met betrekking tot je
persoonsgegevens. Neem contact op via admin@ontwikkelingtechservices.nl om
een van deze rechten uit te oefenen.

## Klachten

Als je een klacht hebt over hoe we met je gegevens omgaan, kun je contact
met ons opnemen, of een klacht indienen bij de Autoriteit Persoonsgegevens
(autoriteitpersoonsgegevens.nl).

## Contact

Vragen over dit privacybeleid? Mail naar
admin@ontwikkelingtechservices.nl.
```

---

## Draft Content — Terms and Conditions (`/algemene-voorwaarden`)

```markdown
# Algemene voorwaarden

Laatst bijgewerkt: [DATUM VOOR PUBLICATIE INVULLEN]

## Toepasselijkheid

Deze algemene voorwaarden zijn van toepassing op alle offertes,
overeenkomsten en diensten van Ontwikkeling Tech Services (OTS), KVK
42027611, BTW NL005440779B20.

## Onze diensten

OTS levert drie soorten dienstverlening: een Audit (vaste prijs, vaste
scope diagnostisch traject), een Build (vaste prijs, vaste scope
systeemontwikkeling), en een Retainer (doorlopende maandelijkse
samenwerking). Exacte scope en prijs worden per opdracht schriftelijk
vastgelegd vóór aanvang van de werkzaamheden.

## Prijzen en betaling

Alle prijzen zijn exclusief BTW, tenzij anders vermeld. Voor Build-trajecten
geldt: 50% bij aanvang, 50% bij oplevering. Voor Retainer-overeenkomsten
geldt maandelijkse facturering vooraf. [TE BEVESTIGEN MET JURIDISCH ADVIES —
betalingstermijn, gevolgen bij te late betaling, en incassobeleid.]

## Scopewijzigingen

Wijzigingen in de overeengekomen scope van een Build-traject vereisen een
schriftelijke wijzigingsopdracht (change order) en kunnen leiden tot een
aanpassing van prijs en/of levertijd.

## Aansprakelijkheid

[TE BEVESTIGEN MET JURIDISCH ADVIES — dit is het onderdeel met de hoogste
juridische impact. Een aansprakelijkheidsbeperking moet zorgvuldig worden
geformuleerd door een gekwalificeerde jurist; onjuiste of ontbrekende
aansprakelijkheidsbepalingen kunnen OTS blootstellen aan onbeperkte
claims.]

## Intellectueel eigendom

[TE BEVESTIGEN MET JURIDISCH ADVIES — wie is eigenaar van de gebouwde
systemen na oplevering? Standaardpraktijk in de branche varieert; dit moet
bewust worden vastgelegd, niet impliciet worden aangenomen.]

## Beëindiging

Retainer-overeenkomsten zijn maandelijks opzegbaar met [TE BEVESTIGEN —
voorstel: 30 dagen] opzegtermijn.

## Toepasselijk recht

Op deze voorwaarden is Nederlands recht van toepassing. Geschillen worden
voorgelegd aan de bevoegde rechter in [TE BEVESTIGEN — vestigingsplaats].

## Contact

Vragen over deze voorwaarden? Mail naar
admin@ontwikkelingtechservices.nl.
```

---

## Ready-to-Paste Prompt for Claude Code

```
This prompt is self-contained. Both pages use the same layout — build one
reusable component, not two separate page layouts.

1. Create components/sections/legal/LegalDocument.tsx: single-column
   container (720px max-width, centred), --cream background, header (eyebrow
   + Anton H1 + "last updated" meta line), then a body area that accepts
   markdown-like content and renders it with the SAME typographic treatment
   already built for essay bodies in Step 17 (H2, H3, lists, paragraphs) —
   reuse that component/styling rather than rebuilding it.

2. Create app/[locale]/privacybeleid/page.tsx and
   app/[locale]/algemene-voorwaarden/page.tsx using LegalDocument, with the
   exact Dutch content given in this prompt file's "Draft Content" sections.
   Preserve every [TE BEVESTIGEN MET JURIDISCH ADVIES] and [DATUM VOOR
   PUBLICATIE INVULLEN] placeholder exactly as bracketed text — do not
   invent values for these, do not remove the brackets, do not silently
   "clean them up." They're intentional flags for legal review before
   launch, not draft sloppiness to fix.

3. Add a "legal" namespace to messages/nl.json and messages/en.json for the
   page chrome (eyebrow, "last updated" label). The body content itself can
   stay Dutch-only for now — translating a legal document accurately is a
   task for the same lawyer who reviews the Dutch version, not something to
   machine-translate. English versions of these two pages should be a later
   step blocked on legal review, same dependency as the Dutch content.

4. Confirm both /privacybeleid and /algemene-voorwaarden render correctly,
   the bracketed placeholders are visibly present (not stripped), and every
   existing link to these pages across the site (Footer, Contact page's
   privacy note) now resolves instead of 404ing.

5. Run tsc --noEmit, confirm no console errors.
```

---

## Acceptance Test

Verify:

1. Both pages render with the shared `LegalDocument` layout — confirm it's genuinely one reusable component, not two near-duplicates.
2. All bracketed `[TE BEVESTIGEN MET JURIDISCH ADVIES]` and `[DATUM VOOR PUBLICATIE INVULLEN]` placeholders are visible in the rendered page, exactly as written — not silently filled in with guessed values.
3. Every existing link to `/privacybeleid` and `/algemene-voorwaarden` across the site (Footer Column 4, Contact page's privacy note) now resolves instead of 404ing.
4. `tsc --noEmit` clean, no console errors.

---

## Before this can be called done

This step produces a **reviewable draft**, not launch-ready legal content. Before these pages go live:

- A qualified Dutch lawyer needs to review both documents in full, especially the Liability and Intellectual Property sections — flagged in the draft as the highest-impact gaps.
- Every bracketed placeholder needs a real, confirmed value.
- Physical address (still open from Step 15/18) needs to land here too, once you have one — it affects the "competent court" jurisdiction clause in the Terms.

This is worth treating as seriously as the founder-photography gate, not as a formality — an incorrect liability clause is a business risk in a way a placeholder avatar never was.

---

*Behind every smooth business is a better system.*
