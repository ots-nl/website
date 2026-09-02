'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Link } from '@/i18n/navigation';

export function RecentEssays() {
  const t = useTranslations('recentEssays');
  const shouldReduce = useReducedMotion();

  const essays = [
    {
      id: 'e1',
      meta: t('essays.e1.meta'),
      title: t('essays.e1.title'),
      excerpt: t('essays.e1.excerpt'),
      href: t('essays.e1.href'),
    },
    {
      id: 'e2',
      meta: t('essays.e2.meta'),
      title: t('essays.e2.title'),
      excerpt: t('essays.e2.excerpt'),
      href: t('essays.e2.href'),
    },
    {
      id: 'e3',
      meta: t('essays.e3.meta'),
      title: t('essays.e3.title'),
      excerpt: t('essays.e3.excerpt'),
      href: t('essays.e3.href'),
    },
  ];

  return (
    <Section background="cream-deep">
      <Container>
        {/* Header — left cluster + right ghost link */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6">
          <div>
            <Eyebrow>{t('header.eyebrow')}</Eyebrow>
            <h2 className="type-h2 text-ink mt-6">{t('header.h2')}</h2>
          </div>
          <Link
            href={t('header.viewAllHref')}
            className="group relative inline-block text-ink text-[15px] font-medium after:content-[''] after:absolute after:left-0 after:right-0 after:-bottom-0.5 after:h-[1px] after:bg-current after:scale-x-0 hover:after:scale-x-100 after:origin-left after:transition-transform after:duration-[350ms] after:ease-[cubic-bezier(0.4,0,0.2,1)]"
          >
            {t('header.viewAllLinkText')}
          </Link>
        </div>

        {/* Cards row */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {essays.map((essay, i) => (
            <motion.div
              key={essay.id}
              initial={shouldReduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: shouldReduce ? 0 : 0.6,
                delay: shouldReduce ? 0 : i * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <Link href={essay.href} className="group flex flex-col">
                {/* Photo placeholder — will be replaced with next/image in Step 12b */}
                <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden bg-cream border border-dashed border-rule flex items-center justify-center">
                  <span className="text-muted text-xs">Photograph — Step 12b</span>
                </div>

                {/* Content */}
                <div className="mt-6">
                  <div className="text-muted text-xs">{essay.meta}</div>
                  <h3 className="font-display text-2xl leading-tight text-ink mt-2 transition-colors duration-500 group-hover:text-accent">
                    {essay.title}
                  </h3>
                  <p className="text-ink-soft text-sm leading-relaxed mt-3 line-clamp-2">
                    {essay.excerpt}
                  </p>
                  <div className="mt-4 text-ink text-[13px] font-medium">
                    {t('readLinkText')}
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
