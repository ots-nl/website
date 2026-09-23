import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { LegalDocument } from '@/components/sections/legal/LegalDocument';
import { buildPageMetadata } from '@/lib/metadata';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations({ locale: 'nl', namespace: 'metadata.terms' });

  return buildPageMetadata({
    title: t('title'),
    description: t('description'),
    path: '/algemene-voorwaarden',
    locale: 'nl',
  });
}

// Draft content — Step 19. Not legal advice; bracketed placeholders are
// intentional flags for review by a qualified Dutch lawyer before launch.
// Do not fill them in or strip the brackets.
const content = `
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
`;

export default async function AlgemeneVoorwaardenPage({
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
      eyebrow={t('terms.eyebrow')}
      title={t('terms.title')}
      lastUpdatedLabel={t('lastUpdatedLabel')}
      lastUpdatedValue="[DATUM VOOR PUBLICATIE INVULLEN]"
      content={content}
    />
  );
}
