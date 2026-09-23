import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Hero } from '@/components/sections/Hero';
import { Problem } from '@/components/sections/Problem';
import { WhatWeDo } from '@/components/sections/WhatWeDo';
import { HowWeWork } from '@/components/sections/HowWeWork';
import { Verticals } from '@/components/sections/Verticals';
import { RecentEssays } from '@/components/sections/RecentEssays';
import { Team } from '@/components/sections/home/Team';
import { FinalCta } from '@/components/sections/home/FinalCta';
import { buildPageMetadata } from '@/lib/metadata';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata.homepage' });

  return buildPageMetadata({
    title: t('title'),
    description: t('description'),
    path: locale === 'en' ? '/en' : '/',
    locale,
  });
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main>
      <Hero />
      <Problem />
      <WhatWeDo />
      <HowWeWork />
      <Verticals />
      <RecentEssays />
      <Team />
      <FinalCta />
    </main>
  );
}
