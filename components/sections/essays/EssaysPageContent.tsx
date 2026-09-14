'use client';

import { useMemo, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { EssayFilterBar } from '@/components/sections/essays/EssayFilterBar';
import { EssayCard } from '@/components/sections/essays/EssayCard';
import { formatEssayDate, type Essay } from '@/lib/essay';

// Maps a filter-pill key (translation key) to the literal category value
// stored in an essay's frontmatter.
const CATEGORY_BY_KEY: Record<string, string> = {
  hospitality: 'Hospitality',
  health: 'Health',
  professional: 'Professional',
  systemsThinking: 'Systems thinking',
};

const CATEGORY_KEY_BY_VALUE: Record<string, string> = {
  Hospitality: 'hospitality',
  Health: 'health',
  Professional: 'professional',
  'Systems thinking': 'systemsThinking',
};

interface EssaysPageContentProps {
  essays: Essay[];
}

export function EssaysPageContent({ essays }: EssaysPageContentProps) {
  const t = useTranslations('essays.index');
  const locale = useLocale();
  const [activeFilter, setActiveFilter] = useState('all');

  const filterOptions = [
    { key: 'all', label: t('filters.all') },
    { key: 'hospitality', label: t('filters.hospitality') },
    { key: 'health', label: t('filters.health') },
    { key: 'professional', label: t('filters.professional') },
    { key: 'systemsThinking', label: t('filters.systemsThinking') },
  ];

  const filteredEssays = useMemo(() => {
    if (activeFilter === 'all') return essays;
    const category = CATEGORY_BY_KEY[activeFilter];
    return essays.filter((essay) => essay.category === category);
  }, [essays, activeFilter]);

  return (
    <main>
      <Section background="cream">
        <Container>
          <Eyebrow>{t('eyebrow')}</Eyebrow>
          <h1 className="font-display text-[clamp(48px,7vw,112px)] leading-[0.98] tracking-[-0.02em] text-ink mt-6">
            {t('h1')}
          </h1>
          <p className="type-body-lg text-ink-soft max-w-[640px] mt-6">{t('subhead')}</p>

          <div className="mt-16">
            <EssayFilterBar options={filterOptions} active={activeFilter} onChange={setActiveFilter} />
          </div>

          {filteredEssays.length === 0 ? (
            <p className="type-body text-ink-soft mt-24">{t('emptyState')}</p>
          ) : (
            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-16">
              {filteredEssays.map((essay, i) => {
                const categoryKey = CATEGORY_KEY_BY_VALUE[essay.category];
                const categoryLabel = categoryKey ? t(`filters.${categoryKey}`) : essay.category;

                return (
                  <EssayCard
                    key={essay.slug}
                    index={i}
                    priority={i === 0}
                    size="large"
                    href={`/essays/${essay.slug}`}
                    photoSrc={`/images/${essay.heroImage}`}
                    photoAlt={essay.title}
                    meta={`${essay.readTime} · ${categoryLabel} · ${formatEssayDate(essay.date, locale)}`}
                    title={essay.title}
                    excerpt={essay.deck}
                    readLinkText={t('readLinkText')}
                  />
                );
              })}
            </div>
          )}
        </Container>
      </Section>
    </main>
  );
}
