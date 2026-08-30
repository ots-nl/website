import type {Metadata} from 'next';
import {Anton, Cormorant_Garamond, Inter} from 'next/font/google';
import {hasLocale, NextIntlClientProvider} from 'next-intl';
import {getTranslations, setRequestLocale} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {routing} from '../../i18n/routing';
import '../globals.css';

const anton = Anton({
  weight: '400',
  subsets: ['latin'],
  display: 'block',
  variable: '--font-anton',
});

const cormorant = Cormorant_Garamond({
  weight: '500',
  style: 'italic',
  subsets: ['latin'],
  display: 'block',
  variable: '--font-cormorant',
});

const inter = Inter({
  weight: ['300', '400', '500', '600'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

// Pre-render static pages for each locale.
export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

// Locale-aware metadata — reads title and description from the right message file.
export async function generateMetadata({
  params,
}: {
  params: Promise<{locale: string}>;
}): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'meta'});

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;

  // 404 if someone requests a locale we don't support.
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Required for static rendering with dynamic locale segment.
  setRequestLocale(locale);

  return (
    <html
      lang={locale}
      className={`${anton.variable} ${cormorant.variable} ${inter.variable}`}
    >
      <body>
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
