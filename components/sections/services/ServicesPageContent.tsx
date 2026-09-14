import { getTranslations } from 'next-intl/server';
import { PageHeader } from './PageHeader';
import { ServiceDeepDive } from './ServiceDeepDive';
import { ServiceLadder } from './ServiceLadder';
import { WhatWeRefuse } from './WhatWeRefuse';
import { FinalCta } from '@/components/sections/home/FinalCta';

/**
 * ServicesPageContent — the full Services page body, shared by both the
 * `/diensten` and `/services` routes so the two locale-specific-slug pages
 * can't drift out of sync with each other.
 */
export async function ServicesPageContent() {
  const t = await getTranslations('services');

  return (
    <main>
      <PageHeader />

      <ServiceDeepDive
        id="audit"
        background="cream"
        eyebrow={t('audit.eyebrow')}
        title={t('audit.title')}
        numeral={t('audit.numeral')}
        price={t('audit.price')}
        meta={t('audit.meta')}
        whatItIs={t('audit.whatItIs')}
        whatYouGet={{ variant: 'list', items: t.raw('audit.whatYouGet') }}
        timeline={t.raw('audit.timeline')}
        whatYouDontGet={t('audit.whatYouDontGet')}
        ctaLabel={t('audit.cta')}
        ctaHref={t('audit.ctaHref')}
      />

      <ServiceDeepDive
        id="build"
        background="cream-deep"
        eyebrow={t('build.eyebrow')}
        title={t('build.title')}
        numeral={t('build.numeral')}
        price={t('build.price')}
        meta={t('build.meta')}
        whatItIs={t('build.whatItIs')}
        whatYouGet={{
          variant: 'tiers',
          tiers: t.raw('build.tiers'),
          sharedItems: t.raw('build.sharedItems'),
        }}
        timeline={t.raw('build.timeline')}
        whatYouDontGet={t('build.whatYouDontGet')}
        ctaLabel={t('build.cta')}
        ctaHref={t('build.ctaHref')}
      />

      <ServiceDeepDive
        id="retainer"
        background="cream"
        eyebrow={t('retainer.eyebrow')}
        title={t('retainer.title')}
        numeral={t('retainer.numeral')}
        price={t('retainer.price')}
        meta={t('retainer.meta')}
        whatItIs={t('retainer.whatItIs')}
        whatYouGet={{ variant: 'tiers', tiers: t.raw('retainer.tiers') }}
        timeline={t.raw('retainer.timeline')}
        whatYouDontGet={t('retainer.whatYouDontGet')}
        ctaLabel={t('retainer.cta')}
        ctaHref={t('retainer.ctaHref')}
      />

      <ServiceLadder />
      <WhatWeRefuse />
      <FinalCta />
    </main>
  );
}
