import { getTranslations } from 'next-intl/server';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { ScrollIndicator } from '@/components/ui/ScrollIndicator';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Button } from '@/components/ui/Button';

/**
 * Placeholder treatment shared by every block in this skeleton.
 * Replaced with real content in Step 7b (copy/CTAs) and Step 7c (photograph).
 */
const placeholder =
  'bg-cream-deep border border-dashed border-rule flex items-center justify-center text-center text-muted text-[12px] leading-snug px-3';

/**
 * Hero — the full-viewport-height opening section.
 *
 * Structural skeleton from Step 7a; Step 7b fills in the left-column copy
 * and CTAs. The photograph placeholder (Step 7c) is untouched.
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
            <Eyebrow>{t('eyebrow')}</Eyebrow>

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
          <div
            className={`${placeholder} rounded-card min-h-[280px] lg:min-h-[560px]`}
          >
            Photograph — Step 7c
          </div>
        </div>
      </Container>

      <ScrollIndicator />
    </Section>
  );
}
