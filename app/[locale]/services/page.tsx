import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { ServicesPageContent } from '@/components/sections/services/ServicesPageContent';

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
