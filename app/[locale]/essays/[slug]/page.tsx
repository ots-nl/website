import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';
import { AsteriskBreak } from '@/components/ui/AsteriskBreak';
import { EssayCard } from '@/components/sections/essays/EssayCard';
import { essayMdxComponents } from '@/components/sections/essays/mdxComponents';
import { formatEssayDate, getAllEssays, getEssayBySlug, getRelatedEssays } from '@/lib/mdx';
import { buildPageMetadata } from '@/lib/metadata';

// Per-essay metadata comes from the MDX frontmatter (title/deck), not the
// translations file — the same copy for every locale until essays get
// localized content of their own.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const essay = getEssayBySlug(slug);

  if (!essay) {
    notFound();
  }

  return buildPageMetadata({
    title: essay.title,
    description: essay.deck,
    path: locale === 'en' ? `/en/essays/${slug}` : `/essays/${slug}`,
    locale,
  });
}

// Maps an essay's frontmatter category to the essays.index.filters translation key.
const CATEGORY_KEY_BY_VALUE: Record<string, string> = {
  Hospitality: 'hospitality',
  Health: 'health',
  Professional: 'professional',
  'Systems thinking': 'systemsThinking',
};

export function generateStaticParams() {
  return getAllEssays().map((essay) => ({ slug: essay.slug }));
}

export default async function EssayDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const essay = getEssayBySlug(slug);
  if (!essay) {
    notFound();
  }

  const t = await getTranslations('essays');
  const categoryKey = CATEGORY_KEY_BY_VALUE[essay.category];
  const categoryLabel = categoryKey ? t(`index.filters.${categoryKey}`) : essay.category;
  const meta = `${essay.readTime} · ${categoryLabel} · ${formatEssayDate(essay.date, locale)}`;

  const relatedEssays = getRelatedEssays(essay);

  return (
    <main>
      <Section background="cream">
        <Container>
          <article className="max-w-[720px] mx-auto">
            <div className="text-muted text-xs">{meta}</div>
            <h1 className="font-display text-[clamp(40px,6vw,88px)] leading-[0.98] tracking-[-0.02em] text-ink mt-6">
              {essay.title}
            </h1>
            <p className="font-light text-[22px] leading-relaxed text-ink-soft mt-6">{essay.deck}</p>

            <div className="relative w-full aspect-[3/2] rounded-card overflow-hidden mt-64 mb-64">
              <Image
                src={`/images/${essay.heroImage}`}
                alt={essay.title}
                fill
                priority
                sizes="720px"
                className="object-cover"
              />
            </div>

            <MDXRemote source={essay.content} components={essayMdxComponents} />
          </article>
        </Container>
      </Section>

      <AsteriskBreak />

      <Section background="cream">
        <Container>
          <div className="max-w-[720px] mx-auto">
            <p className="text-center italic [font-family:var(--font-italic)] text-ink-soft text-[18px]">
              {t('detail.signature')}
            </p>

            <div className="bg-cream-deep rounded-card p-12 mt-16 flex flex-col sm:flex-row items-center justify-between gap-8 text-center sm:text-left">
              <h2 className="font-display text-[28px] leading-tight text-ink">
                {t('detail.cta.heading')}
              </h2>
              <Button variant="primary" href={t('detail.cta.href')} className="shrink-0">
                {t('detail.cta.buttonLabel')}
              </Button>
            </div>
          </div>

          {relatedEssays.length >= 2 && (
            <div className="max-w-[960px] mx-auto mt-64">
              <h2 className="type-h3 text-ink mb-16">{t('detail.relatedHeading')}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                {relatedEssays.map((related, i) => {
                  const relatedCategoryKey = CATEGORY_KEY_BY_VALUE[related.category];
                  const relatedCategoryLabel = relatedCategoryKey
                    ? t(`index.filters.${relatedCategoryKey}`)
                    : related.category;

                  return (
                    <EssayCard
                      key={related.slug}
                      index={i}
                      href={`/essays/${related.slug}`}
                      photoSrc={`/images/${related.heroImage}`}
                      photoAlt={related.title}
                      meta={`${related.readTime} · ${relatedCategoryLabel} · ${formatEssayDate(related.date, locale)}`}
                      title={related.title}
                      excerpt={related.deck}
                      readLinkText={t('index.readLinkText')}
                    />
                  );
                })}
              </div>
            </div>
          )}
        </Container>
      </Section>
    </main>
  );
}
