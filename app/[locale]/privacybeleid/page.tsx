import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { LegalDocument } from '@/components/sections/legal/LegalDocument';

// Draft content — Step 19. Not legal advice; bracketed placeholders are
// intentional flags for review by a qualified Dutch lawyer before launch.
// Do not fill them in or strip the brackets.
const content = `
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
`;

export default async function PrivacybeleidPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Dutch-only for now — an accurate English translation of legal content
  // waits on the same lawyer review as the Dutch draft (Step 19).
  if (locale !== 'nl') {
    notFound();
  }

  setRequestLocale(locale);

  const t = await getTranslations('legal');

  return (
    <LegalDocument
      eyebrow={t('privacy.eyebrow')}
      title={t('privacy.title')}
      lastUpdatedLabel={t('lastUpdatedLabel')}
      lastUpdatedValue="[DATUM VOOR PUBLICATIE INVULLEN]"
      content={content}
    />
  );
}
