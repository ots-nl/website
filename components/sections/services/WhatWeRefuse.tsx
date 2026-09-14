'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';

const EASE = [0.16, 1, 0.3, 1] as const;

const CrossIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    className="w-4 h-4 flex-shrink-0 mt-1"
  >
    <path d="M18 6 6 18" />
    <path d="M6 6l12 12" />
  </svg>
);

/**
 * WhatWeRefuse — cream section listing what OTS won't sell. Cross-mark
 * icons instead of bullets, per Brand Bible convention for negative lists.
 */
export function WhatWeRefuse() {
  const t = useTranslations('services.refuse');
  const shouldReduce = useReducedMotion();
  const items = t.raw('items') as string[];

  return (
    <Section background="cream">
      <Container>
        <div className="max-w-[720px]">
          <h2 className="type-h2 text-ink">{t('h2')}</h2>
          <p className="type-body-lg text-ink-soft mt-6">{t('intro')}</p>

          <ul className="mt-12 space-y-4">
            {items.map((item, i) => (
              <motion.li
                key={item}
                className="flex items-start gap-3 text-ink text-[16px] leading-relaxed"
                initial={shouldReduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: shouldReduce ? 0 : 0.5,
                  delay: shouldReduce ? 0 : i * 0.06,
                  ease: EASE,
                }}
              >
                <span className="text-accent">
                  <CrossIcon />
                </span>
                <span>{item}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
