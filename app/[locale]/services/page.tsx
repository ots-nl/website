import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ServicesPageContent } from '@/components/sections/services/ServicesPageContent';
import { buildPageMetadata } from '@/lib/metadata';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations({ locale: 'en', namespace: 'metadata.services' });

  return buildPageMetadata({
    title: t('title'),
    description: t('description'),
    path: '/en/services',
    locale: 'en',
  });
}

// The English-slug route. Dutch visitors live at /diensten instead —
// same locale-specific-slug pattern as /about vs /over-ons.
export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (locale !== 'en') {
    notFound();
  }

  setRequestLocale(locale);

  return <ServicesPageContent />;
}
