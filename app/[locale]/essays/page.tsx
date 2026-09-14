import { setRequestLocale } from 'next-intl/server';
import { getAllEssays } from '@/lib/mdx';
import { EssaysPageContent } from '@/components/sections/essays/EssaysPageContent';

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
