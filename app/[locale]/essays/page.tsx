import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { getAllEssays } from '@/lib/mdx';
import { EssaysPageContent } from '@/components/sections/essays/EssaysPageContent';
import { buildPageMetadata } from '@/lib/metadata';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata.essaysIndex' });

  return buildPageMetadata({
    title: t('title'),
    description: t('description'),
    path: locale === 'en' ? '/en/essays' : '/essays',
    locale,
  });
}

export default async function EssaysPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const essays = getAllEssays();

  return <EssaysPageContent essays={essays} />;
}
