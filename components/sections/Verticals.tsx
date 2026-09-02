'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';

const icons = {
  hospitality: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M8 3h8l-1 6a3 3 0 0 1-6 0L8 3z" />
      <line x1="12" y1="15" x2="12" y2="21" />
      <line x1="8" y1="21" x2="16" y2="21" />
    </svg>
  ),
  health: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 3v6a5 5 0 0 0 10 0V3" />
      <path d="M11 14v3a4 4 0 0 0 8 0v-1" />
      <circle cx="19" cy="14" r="2" />
    </svg>
  ),
  professional: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 4h9l3 3v13a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z" />
      <path d="M15 4v3h3" />
    </svg>
  ),
};

export function Verticals() {
  const t = useTranslations('verticals');
  const shouldReduce = useReducedMotion();

  const cards = [
    {
      id: 'hospitality',
      icon: icons.hospitality,
      title: t('cards.hospitality.title'),
      body: t('cards.hospitality.body'),
      systems: t.raw('cards.hospitality.systems') as string[],
    },
    {
      id: 'health',
      icon: icons.health,
      title: t('cards.health.title'),
      body: t('cards.health.body'),
      systems: t.raw('cards.health.systems') as string[],
    },
    {
      id: 'professional',
      icon: icons.professional,
      title: t('cards.professional.title'),
      body: t('cards.professional.body'),
      systems: t.raw('cards.professional.systems') as string[],
    },
  ];

  return (
    <Section background="cream">
      <Container>
        {/* Centred header */}
        <div className="text-center">
          <Eyebrow>{t('header.eyebrow')}</Eyebrow>
          <h2 className="type-h2 text-ink mt-6">{t('header.h2')}</h2>
          <p className="text-ink-soft text-lg leading-relaxed mt-6 max-w-[640px] mx-auto">
            {t('header.subhead')}
          </p>
        </div>

        {/* Cards row */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, i) => (
            <motion.article
              key={card.id}
              className="flex flex-col bg-cream-deep rounded-[20px] p-10 min-h-[420px]"
              initial={shouldReduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: shouldReduce ? 0 : 0.6,
                delay: shouldReduce ? 0 : i * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <div className="w-8 h-8 text-accent">{card.icon}</div>
              <h3 className="font-display text-[28px] leading-tight text-ink mt-8">
                {card.title}
              </h3>
              <p className="text-ink-soft text-[15px] leading-relaxed mt-4">{card.body}</p>
              <ul className="mt-auto pt-8 list-none space-y-1.5">
                {card.systems.map((system) => (
                  <li key={system} className="text-muted text-[13px]">
                    {system}
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </Container>
    </Section>
  );
}
