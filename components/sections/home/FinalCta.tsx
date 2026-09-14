'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Button } from '@/components/ui/Button';

export function FinalCta() {
  const t = useTranslations('finalCta');

  return (
    <Section background="night" spacing="large" className="relative overflow-hidden">
      <Image
        src="/images/final-cta-background.jpg"
        alt={t('backgroundAlt')}
        fill
        priority={false}
        sizes="100vw"
        className="object-cover"
      />
      <div
        className="absolute inset-0"
        style={{ backgroundColor: 'rgba(14, 11, 8, 0.78)' }}
      />

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-12 lg:gap-16 items-center">
          {/* Left column — copy + CTAs */}
          <div>
            <Eyebrow>{t('eyebrow')}</Eyebrow>
            <h2 className="font-display text-[clamp(56px,7vw,96px)] leading-[0.98] tracking-[-0.02em] text-cream mt-6">
              {t('h2Pre')}
              <span className="text-accent">{t('h2Accent')}</span>
              {t('h2Suffix')}
            </h2>
            <p className="font-normal text-[18px] text-cream/80 max-w-[520px] mt-32">
              {t('body')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-48">
              <Button variant="primary" href="/#audit">
                {t('ctaPrimary')}
              </Button>
              <Button variant="secondary" href="/#contact" className="text-cream">
                {t('ctaSecondary')}
              </Button>
            </div>
          </div>

          {/* Right column — rotated photo card */}
          <div className="flex justify-center lg:justify-end">
            <div
              className="relative overflow-hidden rounded-[20px] rotate-[-2deg] shadow-[0_40px_80px_rgba(0,0,0,0.4)]"
              style={{ width: 400, height: 500 }}
            >
              <Image
                src="/images/final-cta-card.jpg"
                alt={t('cardAlt')}
                fill
                sizes="400px"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
