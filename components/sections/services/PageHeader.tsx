'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * PageHeader — the Services page opener. Cream background, eyebrow + H1 +
 * subhead stacked left-aligned (no photograph, unlike the homepage Hero).
 */
export function PageHeader() {
  const t = useTranslations('services.pageHeader');
  const shouldReduce = useReducedMotion();

  return (
    <Section background="cream">
      <Container>
        <motion.div
          initial={shouldReduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: shouldReduce ? 0 : 0.6, ease: EASE }}
        >
          <Eyebrow>{t('eyebrow')}</Eyebrow>
          <h1 className="font-display text-[clamp(48px,7vw,112px)] leading-[0.98] tracking-[-0.02em] text-ink mt-6">
            {t('h1')}
          </h1>
          <p className="type-body-lg text-ink-soft max-w-[640px] mt-6">{t('subhead')}</p>
        </motion.div>
      </Container>
    </Section>
  );
}
