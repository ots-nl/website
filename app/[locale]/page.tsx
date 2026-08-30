import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '../../i18n/navigation';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('home');
  const otherLocale = locale === 'nl' ? 'en' : 'nl';
  const otherLocaleLabel = locale === 'nl' ? 'English' : 'Nederlands';

  return (
    <main>
      {/* Hero — default cream background */}
      <Section>
        <Container className="text-center">
          {/* Language toggle */}
          <div className="mb-16 flex items-center justify-center gap-4 flex-wrap">
            <span className="type-caption text-muted">
              {t('current_language_label')}: {t('language_name')}
            </span>
            <Link
              href="/"
              locale={otherLocale}
              className="type-button rounded-pill bg-ink text-cream px-5 py-2 hover:bg-accent transition-colors"
            >
              {t('switch_to')} {otherLocaleLabel} →
            </Link>
          </div>

          <p className="type-label text-accent mb-8">{t('eyebrow')}</p>

          <h1 className="type-hero mb-10 max-w-4xl mx-auto">
            {t('tagline_part1')}{' '}
            <span className="type-accent-word">{t('tagline_accent')}</span>{' '}
            {t('tagline_part2')}
          </h1>

          <p className="type-body-lg text-ink-soft max-w-2xl mx-auto">
            {t('subhead')}
          </p>
        </Container>
      </Section>

      {/* Demo — cream-deep background */}
      <Section background="cream-deep">
        <Container>
          <p className="type-label text-accent mb-6">Section — cream-deep</p>
          <p className="type-body-lg max-w-2xl">
            This section uses <code className="type-body-sm">background=&quot;cream-deep&quot;</code>.
            The Section component automatically applies both the background colour
            and the correct default text colour. Alternating cream tones create
            rhythm between sections without loud contrast.
          </p>
        </Container>
      </Section>

      {/* Demo — night background */}
      <Section background="night">
        <Container>
          <p className="type-label text-accent mb-6">Section — night</p>
          <p className="type-body-lg max-w-2xl">
            This section uses <code className="type-body-sm">background=&quot;night&quot;</code>.
            Text automatically flips to cream. Per Brand Bible §4.1: reserved for
            high-contrast moments — no more than 2-3 night sections per page.
            Used for &quot;How We Work&quot;, the Service Ladder, and the Final CTA.
          </p>
        </Container>
      </Section>

      {/* Demo — mist background */}
      <Section background="mist">
        <Container>
          <p className="type-label text-accent mb-6">Section — mist</p>
          <p className="type-body-lg max-w-2xl">
            This section uses <code className="type-body-sm">background=&quot;mist&quot;</code>.
            Per Brand Bible §4.1: the mist sage appears once per page maximum.
            Currently reserved for the Contact page — this demo is temporary.
          </p>
        </Container>
      </Section>
    </main>
  );
}
