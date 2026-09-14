'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Link } from '@/i18n/navigation';
import { InitialAvatar } from '@/components/shared/InitialAvatar';

export function Team() {
  const t = useTranslations('team');
  const shouldReduce = useReducedMotion();

  const founders = [
    {
      id: 'deepak',
      initial: 'D',
      variant: 'cream-deep' as const,
      name: t('founders.deepak.name'),
      role: t('founders.deepak.role'),
      description: t('founders.deepak.description'),
    },
    {
      id: 'ankur',
      initial: 'A',
      variant: 'night-soft' as const,
      name: t('founders.ankur.name'),
      role: t('founders.ankur.role'),
      description: t('founders.ankur.description'),
    },
    {
      id: 'virat',
      initial: 'V',
      variant: 'accent-tint' as const,
      name: t('founders.virat.name'),
      role: t('founders.virat.role'),
      description: t('founders.virat.description'),
    },
  ];

  return (
    <Section background="cream">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] gap-16">
          {/* Left column — intro + CTA */}
          <div>
            <Eyebrow>{t('header.eyebrow')}</Eyebrow>
            <h2 className="type-h2 text-ink mt-6">{t('header.h2')}</h2>
            <p className="text-ink-soft text-[17px] leading-relaxed mt-24 max-w-[400px]">
              {t('header.subhead')}
            </p>
            <Link
              href={t('header.ctaHref')}
              className="group relative inline-block w-fit mt-32 text-ink text-[15px] font-medium after:content-[''] after:absolute after:left-0 after:right-0 after:-bottom-0.5 after:h-[1px] after:bg-current after:scale-x-0 hover:after:scale-x-100 after:origin-left after:transition-transform after:duration-[350ms] after:ease-[cubic-bezier(0.4,0,0.2,1)]"
            >
              {t('header.ctaLabel')}
            </Link>
          </div>

          {/* Right column — founder grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {founders.map((founder, i) => (
              <motion.div
                key={founder.id}
                initial={shouldReduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: shouldReduce ? 0 : 0.6,
                  delay: shouldReduce ? 0 : i * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <InitialAvatar initial={founder.initial} variant={founder.variant} ariaLabel={founder.name} />
                <h3 className="font-display text-[22px] leading-tight text-ink mt-20">{founder.name}</h3>
                <div className="text-accent text-[13px] font-medium mt-4">{founder.role}</div>
                <p className="text-ink-soft text-sm leading-relaxed mt-12 line-clamp-2">{founder.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
