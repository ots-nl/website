import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('home');
  const otherLocale: 'nl' | 'en' = locale === 'nl' ? 'en' : 'nl';
  const otherLocaleLabel = locale === 'nl' ? 'English' : 'Nederlands';

  return (
    <main>
      {/* Hero — cream */}
      <Section>
        <Container className="text-center">
          {/* Language toggle — ghost variant */}
          <div className="mb-16 flex items-center justify-center gap-4 flex-wrap">
            <span className="type-caption text-muted">
              {t('current_language_label')}: {t('language_name')}
            </span>
            <Button variant="ghost" href="/" locale={otherLocale}>
              {t('switch_to')} {otherLocaleLabel}
            </Button>
          </div>

          <p className="type-label text-accent mb-8">{t('eyebrow')}</p>

          <h1 className="type-hero mb-10 max-w-4xl mx-auto">
            {t('tagline_part1')}{' '}
            <span className="type-accent-word">{t('tagline_accent')}</span>{' '}
            {t('tagline_part2')}
          </h1>

          <p className="type-body-lg text-ink-soft max-w-2xl mx-auto mb-12">
            {t('subhead')}
          </p>

          {/* Real CTAs — will link to /contact once we build that page */}
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Button variant="primary">Request an Audit</Button>
            <Button variant="secondary">Book a Discovery call</Button>
          </div>
        </Container>
      </Section>

      {/* Button variants showcase — cream-deep */}
      <Section background="cream-deep">
        <Container>
          <p className="type-label text-accent mb-6">
            Step 5b — Button variants
          </p>
          <h2 className="type-h2 mb-10 max-w-3xl">
            Four buttons.{' '}
            <span className="type-accent-word">One</span> component.
          </h2>

          <div className="space-y-10">
            <div className="flex items-center gap-8 flex-wrap">
              <p className="type-label text-muted min-w-32">Primary</p>
              <Button variant="primary">Request an Audit</Button>
            </div>

            <div className="flex items-center gap-8 flex-wrap">
              <p className="type-label text-muted min-w-32">Secondary</p>
              <Button variant="secondary">Book a Discovery call</Button>
            </div>

            <div className="flex items-center gap-8 flex-wrap">
              <p className="type-label text-muted min-w-32">Ghost</p>
              <Button variant="ghost">Read more</Button>
            </div>

            <div className="flex items-center gap-8 flex-wrap">
              <p className="type-label text-muted min-w-32">Nav</p>
              <Button variant="nav">Request an Audit</Button>
            </div>
          </div>

          <p className="type-body-sm text-muted mt-12 max-w-xl">
            Hover each button to see the transitions: primary shifts to
            accent-deep and lifts by 1px, secondary lifts, ghost draws an
            underline from left to right, nav shifts colour.
          </p>
        </Container>
      </Section>

      {/* Buttons on dark — night */}
      <Section background="night">
        <Container>
          <p className="type-label text-accent mb-6">
            Buttons on night background
          </p>
          <h2 className="type-h2 mb-10 max-w-3xl">
            The same component adapts.
          </h2>

          <div className="flex items-center gap-4 flex-wrap">
            <Button variant="primary">Request an Audit</Button>
            <Button variant="secondary">Book a Discovery call</Button>
            <Button variant="ghost">Read more</Button>
          </div>

          <p className="type-body-sm text-muted mt-12 max-w-xl">
            The secondary and ghost variants use border-current and text-current
            respectively — so on night sections they inherit cream automatically.
            No conditional colour logic required.
          </p>
        </Container>
      </Section>
    </main>
  );
}
