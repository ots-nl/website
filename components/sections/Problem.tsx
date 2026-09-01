'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Problem — the section below the Hero that lays out the operational pain
 * points OTS solves. Introduces the scroll-triggered reveal pattern used by
 * every below-the-fold section from here on.
 */
export function Problem() {
  const t = useTranslations('problem');
  const shouldReduce = useReducedMotion();

  const blocks = [
    {
      numeral: t('block1Numeral'),
      title: t('block1Title'),
      body: t('block1Body'),
    },
    {
      numeral: t('block2Numeral'),
      title: t('block2Title'),
      body: t('block2Body'),
    },
    {
      numeral: t('block3Numeral'),
      title: t('block3Title'),
      body: t('block3Body'),
    },
  ];

  return (
    <Section background="cream-deep">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] gap-6 lg:gap-6">
          {/* Left column — header (static, no animation) */}
          <div>
            <Eyebrow>{t('eyebrow')}</Eyebrow>
            <h2 className="type-h2 text-ink mt-6">
              {t('h2Part1')}
              <br />
              {t('h2Part2')}
            </h2>
          </div>

          {/* Right column — three blocks with 80px vertical rhythm */}
          <div className="space-y-20">
            {blocks.map((block, i) => (
              <motion.div
                key={i}
                initial={shouldReduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: shouldReduce ? 0 : 0.6,
                  delay: shouldReduce ? 0 : i * 0.15,
                  ease: EASE,
                }}
                className="relative"
              >
                <motion.span
                  aria-hidden="true"
                  className="absolute -left-6 -top-2 font-display text-[120px] leading-none text-accent-tint select-none pointer-events-none"
                  initial={shouldReduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    duration: shouldReduce ? 0 : 0.6,
                    delay: shouldReduce ? 0 : i * 0.15 + 0.08,
                    ease: EASE,
                  }}
                >
                  {block.numeral}
                </motion.span>
                <h3 className="relative z-10 text-ink font-medium text-xl leading-snug">
                  {block.title}
                </h3>
                <p className="text-ink-soft text-base leading-relaxed mt-4 max-w-[440px]">
                  {block.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
