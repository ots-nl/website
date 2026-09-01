import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { ScrollIndicator } from '@/components/ui/ScrollIndicator';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Button } from '@/components/ui/Button';

/**
 * Hero — the full-viewport-height opening section.
 *
 * Structural skeleton from Step 7a; Step 7b fills in the left-column copy
 * and CTAs; Step 7c fills in the right-column photograph.
 */
export async function Hero() {
  const t = await getTranslations('hero');

  return (
    <Section
      background="cream"
      className="relative min-h-screen min-h-[720px] flex items-center"
    >
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-6 lg:gap-6 items-center min-h-[inherit]">
          {/* Left column — copy stack */}
          <div className="flex flex-col gap-4">
            <Eyebrow variant="pill">{t('eyebrow')}</Eyebrow>

            <h1 className="type-hero text-ink">
              {t('headlineLine1')}
              <br />
              {t('headlineLine2Pre')}
              <span className="type-accent-word">
                {t('headlineLine2Accent')}
              </span>
              {t('headlineLine2Post')}
            </h1>

            <p className="type-body-lg text-ink-soft max-w-[520px]">
              {t('subheadline')}
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button variant="primary" href="/#audit">
                {t('ctaPrimary')}
              </Button>
              <Button variant="secondary" href="/#contact">
                {t('ctaSecondary')}
              </Button>
            </div>

            <p className="type-caption text-muted">{t('footnote')}</p>
          </div>

          {/* Right column — photograph */}
          <div className="relative min-h-[280px] lg:min-h-[560px]">
            <div className="absolute inset-0 lg:right-[-48px] overflow-hidden rounded-card">
              <Image
                src="/images/hero-restaurant-interior.jpg"
                alt={t('photoAlt')}
                fill
                priority
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover [filter:sepia(0.12)_saturate(1.15)]"
              />
            </div>
          </div>
        </div>
      </Container>

      <ScrollIndicator />
    </Section>
  );
}
