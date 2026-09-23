import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ServicesPageContent } from '@/components/sections/services/ServicesPageContent';
import { buildPageMetadata } from '@/lib/metadata';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations({ locale: 'nl', namespace: 'metadata.services' });

  return buildPageMetadata({
    title: t('title'),
    description: t('description'),
    path: '/diensten',
    locale: 'nl',
  });
}

// The Dutch-slug route. English visitors live at /en/services instead —
// same locale-specific-slug pattern as /over-ons vs /about.
export default async function DienstenPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (locale !== 'nl') {
    notFound();
  }

  setRequestLocale(locale);

  return <ServicesPageContent />;
}
