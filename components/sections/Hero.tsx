'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { ScrollIndicator } from '@/components/ui/ScrollIndicator';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Button } from '@/components/ui/Button';

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Hero — the full-viewport-height opening section.
 *
 * Structural skeleton from Step 7a; Step 7b fills in the left-column copy
 * and CTAs; Step 7c fills in the right-column photograph; Step 7d adds the
 * choreographed page-load reveal sequence.
 */
export function Hero() {
  const t = useTranslations('hero');

  // Check for reduced motion preference on mount.
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const reveal = (
    initial: Record<string, number>,
    animate: Record<string, number>,
    delay: number,
    duration: number
  ) =>
    prefersReducedMotion
      ? { initial: animate, animate, transition: { duration: 0 } }
      : { initial, animate, transition: { delay, duration, ease: EASE } };

  return (
    <Section
      background="cream"
      className="relative min-h-screen min-h-[720px] flex items-center"
    >
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-6 lg:gap-6 items-center min-h-[inherit]">
          {/* Left column — copy stack */}
          <div className="flex flex-col gap-4">
            <motion.div {...reveal({ opacity: 0, y: 12 }, { opacity: 1, y: 0 }, 0.2, 0.5)}>
              <Eyebrow variant="pill">{t('eyebrow')}</Eyebrow>
            </motion.div>

            <h1 className="type-hero text-ink">
              <motion.span
                className="block"
                {...reveal({ opacity: 0, y: 12 }, { opacity: 1, y: 0 }, 0.4, 0.8)}
              >
                {t('headlineLine1')}
              </motion.span>
              <motion.span
                className="block"
                {...reveal({ opacity: 0, y: 12 }, { opacity: 1, y: 0 }, 0.55, 0.8)}
              >
                {t('headlineLine2Pre')}
                <span className="type-accent-word">
                  {t('headlineLine2Accent')}
                </span>
                {t('headlineLine2Post')}
              </motion.span>
            </h1>

            <motion.p
              className="type-body-lg text-ink-soft max-w-[520px]"
              {...reveal({ opacity: 0, y: 16 }, { opacity: 1, y: 0 }, 0.8, 0.6)}
            >
              {t('subheadline')}
            </motion.p>

            <motion.div
              className="flex flex-col gap-4"
              {...reveal({ opacity: 0, y: 12 }, { opacity: 1, y: 0 }, 1.1, 0.5)}
            >
              <div className="flex flex-col sm:flex-row gap-3">
                <Button variant="primary" href="/#audit">
                  {t('ctaPrimary')}
                </Button>
                <Button variant="secondary" href="/#contact">
                  {t('ctaSecondary')}
                </Button>
              </div>

              <p className="type-caption text-muted">{t('footnote')}</p>
            </motion.div>
          </div>

          {/* Right column — photograph */}
          <div className="relative min-h-[280px] lg:min-h-[560px]">
            <motion.div
              className="absolute inset-0 lg:right-[-48px] overflow-hidden rounded-card"
              {...reveal({ opacity: 0, scale: 0.98 }, { opacity: 1, scale: 1 }, 1.4, 0.9)}
            >
              <Image
                src="/images/hero-restaurant-interior.jpg"
                alt={t('photoAlt')}
                fill
                priority
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover [filter:sepia(0.12)_saturate(1.15)]"
              />
            </motion.div>
          </div>
        </div>
      </Container>

      <motion.div {...reveal({ opacity: 0 }, { opacity: 1 }, 1.8, 0.6)}>
        <ScrollIndicator />
      </motion.div>
    </Section>
  );
}
