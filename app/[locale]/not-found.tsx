import type { Metadata } from 'next';
import { getLocale, getTranslations } from 'next-intl/server';
import { Container } from '@/components/layout/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Button } from '@/components/ui/Button';

// not-found.tsx receives no props (App Router convention), so locale comes
// from next-intl's request context (set via setRequestLocale higher up)
// rather than from a params argument.
export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: 'metadata.notFound' });

  return {
    title: t('title'),
    description: t('description'),
  };
}

/**
 * not-found.tsx — App Router convention: catches both URL-based 404s and
 * notFound() calls from within pages (e.g. the EN-gated legal pages from
 * Step 19). Sits inside the locale layout, so Nav and Footer render as usual.
 */
export default async function NotFound() {
  const t = await getTranslations('notFound');

  return (
    <main className="bg-cream min-h-screen flex items-center">
      <Container>
        <div className="max-w-[720px] mx-auto">
          <Eyebrow>{t('eyebrow')}</Eyebrow>
          <h1 className="font-display text-[clamp(56px,7vw,96px)] leading-[0.98] tracking-[-0.02em] text-ink mt-6">
            {t('title')}
          </h1>
          <p className="font-normal text-[17px] text-ink-soft max-w-[480px] mt-24">
            {t('body')}
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center gap-6 mt-48">
            <Button href="/" variant="primary">
              {t('homeLabel')}
            </Button>
            <Button href={t('servicesHref')} variant="ghost">
              {t('servicesLabel')}
            </Button>
          </div>
        </div>
      </Container>
    </main>
  );
}
