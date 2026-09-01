import { setRequestLocale } from 'next-intl/server';
import { Hero } from '@/components/sections/Hero';
import { Problem } from '@/components/sections/Problem';
import { WhatWeDo } from '@/components/sections/WhatWeDo';

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
    </main>
  );
}
