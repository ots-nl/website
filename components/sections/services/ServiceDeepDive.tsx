'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Button } from '@/components/ui/Button';

const EASE = [0.16, 1, 0.3, 1] as const;

const CheckIcon = () => (
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
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

interface Tier {
  name: string;
  price: string;
  description: string;
  footnote: string;
}

interface TimelineItem {
  label: string;
  text: string;
}

type WhatYouGet =
  | { variant: 'list'; items: string[] }
  | { variant: 'tiers'; tiers: Tier[]; sharedItems?: string[] };

interface ServiceDeepDiveProps {
  id: string;
  background: 'cream' | 'cream-deep';
  eyebrow: string;
  title: string;
  numeral: string;
  price: string;
  meta: string;
  whatItIs: string;
  whatYouGet: WhatYouGet;
  timeline: TimelineItem[];
  whatYouDontGet: string;
  ctaLabel: string;
  ctaHref: string;
}

/**
 * ServiceDeepDive — one reusable two-column section, used three times
 * (Audit / Build / Retainer) with different content and background.
 *
 * Left column: eyebrow, title, price, meta — with an oversized numeral
 * behind it as texture. Right column: what it is → what you get (flat list
 * or tiered sub-table) → how it runs (timeline) → what you don't get → CTA.
 */
export function ServiceDeepDive({
  id,
  background,
  eyebrow,
  title,
  numeral,
  price,
  meta,
  whatItIs,
  whatYouGet,
  timeline,
  whatYouDontGet,
  ctaLabel,
  ctaHref,
}: ServiceDeepDiveProps) {
  const t = useTranslations('services.labels');
  const shouldReduce = useReducedMotion();

  return (
    <Section id={id} background={background}>
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] gap-12 lg:gap-16">
          {/* Left column — headline + price, oversized numeral as texture */}
          <div className="relative">
            <span
              aria-hidden="true"
              className="absolute -top-4 -left-2 font-display text-[200px] leading-none text-accent-tint select-none pointer-events-none"
            >
              {numeral}
            </span>
            <div className="relative z-10">
              <Eyebrow>{eyebrow}</Eyebrow>
              <h2 className="type-h2 text-ink mt-6">{title}</h2>
              <div className="font-display text-[56px] leading-none text-ink mt-10">{price}</div>
              <p className="type-body-sm text-muted mt-3">{meta}</p>
            </div>
          </div>

          {/* Right column — content */}
          <motion.div
            initial={shouldReduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: shouldReduce ? 0 : 0.6, ease: EASE }}
          >
            <h3 className="type-label text-muted">{t('whatItIs')}</h3>
            <p className="type-body-lg text-ink-soft mt-4">{whatItIs}</p>

            <h3 className="type-label text-muted mt-12">{t('whatYouGet')}</h3>
            {whatYouGet.variant === 'list' ? (
              <ul className="mt-4 space-y-3">
                {whatYouGet.items.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-ink-soft text-[15px] leading-relaxed">
                    <span className="text-accent">
                      <CheckIcon />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="mt-4">
                <div className="border border-rule rounded-card-sm divide-y divide-rule overflow-hidden">
                  {whatYouGet.tiers.map((tier) => (
                    <div
                      key={tier.name}
                      className="p-6 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2"
                    >
                      <div>
                        <div className="flex items-baseline gap-3">
                          <span className="font-display text-[20px] text-ink">{tier.name}</span>
                          <span className="type-body-sm text-accent font-medium">{tier.price}</span>
                        </div>
                        <p className="text-muted text-[14px] leading-relaxed mt-1.5">{tier.description}</p>
                      </div>
                      <span className="type-caption text-muted whitespace-nowrap">{tier.footnote}</span>
                    </div>
                  ))}
                </div>
                {whatYouGet.sharedItems && whatYouGet.sharedItems.length > 0 && (
                  <ul className="mt-6 space-y-3">
                    {whatYouGet.sharedItems.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-ink-soft text-[15px] leading-relaxed">
                        <span className="text-accent">
                          <CheckIcon />
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            <h3 className="type-label text-muted mt-12">{t('howItGoes')}</h3>
            <div className="relative mt-4">
              <div
                aria-hidden="true"
                className="absolute left-[5px] top-2 bottom-2 border-l border-dashed border-muted/30"
              />
              <div className="flex flex-col space-y-6">
                {timeline.map((step) => (
                  <div key={step.label} className="flex flex-row items-start gap-4">
                    <div className="w-[11px] h-[11px] rounded-full bg-accent flex-shrink-0 mt-1.5 relative z-10" />
                    <div>
                      <div className="text-ink text-[14px] font-medium">{step.label}</div>
                      <p className="text-muted text-[14px] leading-relaxed mt-1">{step.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <h3 className="type-label text-muted mt-12">{t('whatYouDontGet')}</h3>
            <p className="text-muted text-[15px] leading-relaxed mt-4">{whatYouDontGet}</p>

            <div className="mt-10">
              <Button variant="primary" href={ctaHref}>
                {ctaLabel}
              </Button>
            </div>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
