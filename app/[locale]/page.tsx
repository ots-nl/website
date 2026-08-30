import {getTranslations, setRequestLocale} from 'next-intl/server';
import {Link} from '../../i18n/navigation';

export default async function Home({
  params,
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  setRequestLocale(locale);

  const t = await getTranslations('home');
  const otherLocale = locale === 'nl' ? 'en' : 'nl';
  const otherLocaleLabel = locale === 'nl' ? 'English' : 'Nederlands';

  return (
    <main>
      <section className="section-ots">
        <div className="container-ots text-center">
          {/* Language toggle — proof that next-intl routing works */}
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

          <h1 className="type-hero text-ink mb-10 max-w-4xl mx-auto">
            {t('tagline_part1')}{' '}
            <span className="type-accent-word">{t('tagline_accent')}</span>{' '}
            {t('tagline_part2')}
          </h1>

          <p className="type-body-lg text-ink-soft max-w-2xl mx-auto">
            {t('subhead')}
          </p>
        </div>
      </section>
    </main>
  );
}
