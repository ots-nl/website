import { setRequestLocale } from 'next-intl/server';
import { Hero } from '@/components/sections/Hero';
import { Problem } from '@/components/sections/Problem';
import { WhatWeDo } from '@/components/sections/WhatWeDo';
import { HowWeWork } from '@/components/sections/HowWeWork';
import { Verticals } from '@/components/sections/Verticals';
import { RecentEssays } from '@/components/sections/RecentEssays';

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
    </main>
  );
}
