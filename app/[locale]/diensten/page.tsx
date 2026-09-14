import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { ServicesPageContent } from '@/components/sections/services/ServicesPageContent';

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
