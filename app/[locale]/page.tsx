import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { AsteriskBreak } from '@/components/ui/AsteriskBreak';

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
          {/* Language toggle */}
          <div className="mb-16 flex items-center justify-center gap-4 flex-wrap">
            <span className="type-caption text-muted">
              {t('current_language_label')}: {t('language_name')}
            </span>
            <Button variant="ghost" href="/" locale={otherLocale}>
              {t('switch_to')} {otherLocaleLabel}
            </Button>
          </div>

          <Eyebrow className="mb-8">{t('eyebrow')}</Eyebrow>

          <h1 className="type-hero mb-10 max-w-4xl mx-auto">
            {t('tagline_part1')}{' '}
            <span className="type-accent-word">{t('tagline_accent')}</span>{' '}
            {t('tagline_part2')}
          </h1>

          <p className="type-body-lg text-ink-soft max-w-2xl mx-auto mb-12">
            {t('subhead')}
          </p>

          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Button variant="primary">Request an Audit</Button>
            <Button variant="secondary">Book a Discovery call</Button>
          </div>
        </Container>
      </Section>

      {/* OTS section signature — sits between sections as a visual pause */}
      <AsteriskBreak />

      {/* Button variants showcase — cream-deep */}
      <Section background="cream-deep">
        <Container>
          <Eyebrow className="mb-6">Step 5b — Button variants</Eyebrow>
          <h2 className="type-h2 mb-10 max-w-3xl">
            Four buttons.{' '}
            <span className="type-accent-word">One</span> component.
          </h2>

          <div className="space-y-10">
            <div className="flex items-center gap-8 flex-wrap">
              <Eyebrow color="muted" className="min-w-32">Primary</Eyebrow>
              <Button variant="primary">Request an Audit</Button>
            </div>

            <div className="flex items-center gap-8 flex-wrap">
              <Eyebrow color="muted" className="min-w-32">Secondary</Eyebrow>
              <Button variant="secondary">Book a Discovery call</Button>
            </div>

            <div className="flex items-center gap-8 flex-wrap">
              <Eyebrow color="muted" className="min-w-32">Ghost</Eyebrow>
              <Button variant="ghost">Read more</Button>
            </div>

            <div className="flex items-center gap-8 flex-wrap">
              <Eyebrow color="muted" className="min-w-32">Nav</Eyebrow>
              <Button variant="nav">Request an Audit</Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* Buttons on dark — night */}
      <Section background="night">
        <Container>
          <Eyebrow className="mb-6">Buttons on night background</Eyebrow>
          <h2 className="type-h2 mb-10 max-w-3xl">
            The same component adapts.
          </h2>

          <div className="flex items-center gap-4 flex-wrap">
            <Button variant="primary">Request an Audit</Button>
            <Button variant="secondary">Book a Discovery call</Button>
            <Button variant="ghost">Read more</Button>
          </div>
        </Container>
      </Section>

      {/* Step 5c demo — mist */}
      <Section background="mist">
        <Container>
          <Eyebrow className="mb-6">Step 5c — Eyebrow &amp; AsteriskBreak</Eyebrow>
          <h2 className="type-h2 mb-6 max-w-3xl">
            Two small utilities.
          </h2>
          <p className="type-body-lg max-w-2xl">
            Every eyebrow on this page — including the small &quot;PRIMARY&quot;,
            &quot;SECONDARY&quot; labels above — is now the same{' '}
            <code className="type-body-sm">Eyebrow</code> component, with a
            color variant for the muted labels. And the accent-orange asterisk
            between the hero and the Button section is <code className="type-body-sm">AsteriskBreak</code> —
            the OTS section signature per Brand Bible §6.2.
          </p>
        </Container>
      </Section>
    </main>
  );
}
