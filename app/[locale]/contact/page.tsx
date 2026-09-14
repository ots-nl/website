import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { ContactForm } from '@/components/sections/contact/ContactForm';

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('contact');

  return (
    <main>
      <Section background="mist">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-[45%_55%] gap-12 lg:gap-16">
            {/* Left column — intro + contact info */}
            <div>
              <Eyebrow>{t('eyebrow')}</Eyebrow>
              <h1 className="type-h2 text-ink mt-6">
                {t('h1Pre')}
                <span className="type-accent-word">{t('h1Accent')}</span>
                {t('h1Suffix')}
              </h1>
              <p className="font-normal text-[17px] leading-[1.6] text-ink-soft max-w-[400px] mt-6">
                {t('body')}
              </p>

              <div className="mt-64">
                <a
                  href={`mailto:${t('email')}`}
                  className="font-medium text-[15px] text-ink"
                >
                  {t('email')}
                </a>
                <p className="text-[13px] text-muted mt-3">{t('responsePromise')}</p>
              </div>
            </div>

            {/* Right column — form card */}
            <div className="bg-cream rounded-[24px] p-12">
              <ContactForm />
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
