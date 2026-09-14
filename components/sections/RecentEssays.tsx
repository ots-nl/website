'use client';

import { useTranslations } from 'next-intl';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Link } from '@/i18n/navigation';
import { EssayCard } from '@/components/sections/essays/EssayCard';

export function RecentEssays() {
  const t = useTranslations('recentEssays');

  const essays = [
    {
      id: 'e1',
      meta: t('essays.e1.meta'),
      title: t('essays.e1.title'),
      excerpt: t('essays.e1.excerpt'),
      href: t('essays.e1.href'),
      photoSrc: '/images/essay-chatbots.jpg',
      photoAlt: t('essays.e1.photoAlt'),
    },
    {
      id: 'e2',
      meta: t('essays.e2.meta'),
      title: t('essays.e2.title'),
      excerpt: t('essays.e2.excerpt'),
      href: t('essays.e2.href'),
      photoSrc: '/images/essay-reservations.jpg',
      photoAlt: t('essays.e2.photoAlt'),
    },
    {
      id: 'e3',
      meta: t('essays.e3.meta'),
      title: t('essays.e3.title'),
      excerpt: t('essays.e3.excerpt'),
      href: t('essays.e3.href'),
      photoSrc: '/images/essay-audit.jpg',
      photoAlt: t('essays.e3.photoAlt'),
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
            <EssayCard
              key={essay.id}
              index={i}
              href={essay.href}
              photoSrc={essay.photoSrc}
              photoAlt={essay.photoAlt}
              meta={essay.meta}
              title={essay.title}
              excerpt={essay.excerpt}
              readLinkText={t('readLinkText')}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}
