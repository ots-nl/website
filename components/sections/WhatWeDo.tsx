'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Link } from '@/i18n/navigation';

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * WhatWeDo — the Service Ladder section below Problem. Three service cards
 * (Audit, Build, Retainer), each a single Link wrapping the whole card.
 * Photograph zones are placeholders in this step; real photos land in 9b.
 */
export function WhatWeDo() {
  const t = useTranslations('whatWeDo');
  const shouldReduce = useReducedMotion();

  const cards = [
    {
      id: 'audit',
      eyebrow: t('cards.audit.eyebrow'),
      title: t('cards.audit.title'),
      body: t('cards.audit.body'),
      price: t('cards.audit.price'),
      meta: t('cards.audit.meta'),
      linkText: t('cards.audit.linkText'),
      href: t('cards.audit.href'),
    },
    {
      id: 'build',
      eyebrow: t('cards.build.eyebrow'),
      title: t('cards.build.title'),
      body: t('cards.build.body'),
      price: t('cards.build.price'),
      meta: t('cards.build.meta'),
      linkText: t('cards.build.linkText'),
      href: t('cards.build.href'),
    },
    {
      id: 'retainer',
      eyebrow: t('cards.retainer.eyebrow'),
      title: t('cards.retainer.title'),
      body: t('cards.retainer.body'),
      price: t('cards.retainer.price'),
      meta: t('cards.retainer.meta'),
      linkText: t('cards.retainer.linkText'),
      href: t('cards.retainer.href'),
    },
  ];

  return (
    <Section background="cream">
      <Container>
        {/* Header — full width */}
        <div className="grid grid-cols-1 lg:grid-cols-[60%_40%] gap-6 items-end">
          <div>
            <Eyebrow>{t('header.eyebrow')}</Eyebrow>
            <h2 className="type-h2 text-ink mt-6">
              {t('header.h2Part1')}
              <br />
              {t('header.h2Part2')}
            </h2>
          </div>
          <p className="text-ink-soft text-lg leading-relaxed">
            {t('header.subhead')}
          </p>
        </div>

        {/* 80px gap between header and cards */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, i) => (
            <motion.div
              key={card.id}
              initial={shouldReduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: shouldReduce ? 0 : 0.6,
                delay: shouldReduce ? 0 : i * 0.1,
                ease: EASE,
              }}
            >
              <Link
                href={card.href}
                className="group relative flex flex-col min-h-[480px] rounded-[20px] border border-rule bg-cream overflow-hidden transition-[border-color,transform] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:border-accent hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-4"
              >
                {/* Zone 1 — photograph placeholder */}
                <div className="h-[240px] bg-cream-deep border-b border-dashed border-rule flex items-center justify-center">
                  <span className="text-muted text-xs">Photograph — Step 9b</span>
                </div>

                {/* Zone 2 — middle content */}
                <div className="p-8 flex-1 flex flex-col">
                  <Eyebrow color="muted">{card.eyebrow}</Eyebrow>
                  <h3 className="type-h3 text-ink mt-4">{card.title}</h3>
                  <p className="text-ink-soft text-[15px] leading-relaxed mt-4">{card.body}</p>

                  {/* Zone 3 — bottom pricing, pushed to bottom */}
                  <div className="mt-auto pt-8">
                    <div className="type-price text-ink">{card.price}</div>
                    <div className="text-muted text-xs mt-2">{card.meta}</div>
                    <div className="mt-8 text-ink text-[13px] font-medium relative inline-block after:content-[''] after:absolute after:left-0 after:right-0 after:-bottom-0.5 after:h-[1px] after:bg-current after:scale-x-0 group-hover:after:scale-x-100 after:origin-left after:transition-transform after:duration-[350ms] after:ease-[cubic-bezier(0.4,0,0.2,1)]">
                      {card.linkText}
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
