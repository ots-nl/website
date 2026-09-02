'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';

export function HowWeWork() {
  const t = useTranslations('howWeWork');
  const shouldReduce = useReducedMotion();

  const steps = [
    {
      number: t('steps.step1.number'),
      title: t('steps.step1.title'),
      body: t('steps.step1.body'),
    },
    {
      number: t('steps.step2.number'),
      title: t('steps.step2.title'),
      body: t('steps.step2.body'),
    },
    {
      number: t('steps.step3.number'),
      title: t('steps.step3.title'),
      body: t('steps.step3.body'),
    },
    {
      number: t('steps.step4.number'),
      title: t('steps.step4.title'),
      body: t('steps.step4.body'),
    },
  ];

  return (
    <Section background="night">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-[45%_55%] gap-6">
          {/* Left column — header with the oversized 04 numeral behind the H2 */}
          <div className="relative">
            <Eyebrow>{t('header.eyebrow')}</Eyebrow>
            <h2 className="type-h2 text-cream mt-6 relative z-10">
              {t('header.h2Part1')}
              <br />
              {t('header.h2Part2')}
            </h2>
            <span
              aria-hidden="true"
              className="absolute top-8 -left-4 font-display text-[200px] leading-none text-night-soft select-none pointer-events-none"
            >
              {t('header.numeral')}
            </span>
          </div>

          {/* Right column — four steps with dashed connecting line */}
          <div className="relative">
            {/* Dashed connecting line — desktop only, positioned behind circles */}
            <div
              aria-hidden="true"
              className="hidden lg:block absolute left-6 top-6 bottom-6 border-l border-dashed border-muted/30"
            />
            <div className="flex flex-col space-y-16 relative">
              {steps.map((step, i) => (
                <motion.div
                  key={step.number}
                  className="flex flex-row items-start gap-6"
                  initial={shouldReduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    duration: shouldReduce ? 0 : 0.6,
                    delay: shouldReduce ? 0 : i * 0.12,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <div className="w-12 h-12 rounded-full border border-muted flex items-center justify-center flex-shrink-0 bg-night relative z-10">
                    <span className="text-cream font-semibold text-sm">{step.number}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-cream font-semibold text-xl leading-snug">{step.title}</h3>
                    <p className="text-muted text-[15px] leading-relaxed mt-2">{step.body}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
