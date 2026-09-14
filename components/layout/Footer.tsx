'use client';

import { useTranslations } from 'next-intl';
import { Container } from '@/components/layout/Container';
import { Link } from '@/i18n/navigation';

const footerLinkClasses = [
  'group relative inline-block w-fit',
  'type-body-sm text-cream/80',
  'transition-colors duration-300 hover:text-cream',
  "after:content-[''] after:absolute after:left-0 after:right-0 after:-bottom-0.5",
  'after:h-px after:bg-current after:origin-left after:scale-x-0',
  'after:transition-transform after:duration-300 after:ease-out hover:after:scale-x-100',
].join(' ');

/**
 * Footer — the site-wide footer.
 *
 * Rendered once in the locale layout so it appears on every page.
 * Background is the literal --night-adjacent #0A0806 from the Brand Bible
 * footer spec, deliberately darker than the --night section colour.
 */
export function Footer() {
  const t = useTranslations('footer');

  const servicesLinks = [
    { key: 'audit', href: t('services.links.audit.href'), label: t('services.links.audit.label') },
    { key: 'build', href: t('services.links.build.href'), label: t('services.links.build.label') },
    { key: 'retainer', href: t('services.links.retainer.href'), label: t('services.links.retainer.label') },
    { key: 'all', href: t('services.links.all.href'), label: t('services.links.all.label') },
  ];

  const companyLinks = [
    { key: 'essays', href: t('company.links.essays.href'), label: t('company.links.essays.label') },
    { key: 'about', href: t('company.links.about.href'), label: t('company.links.about.label') },
    { key: 'contact', href: t('company.links.contact.href'), label: t('company.links.contact.label') },
  ];

  return (
    <footer className="bg-[#0A0806] pt-24 pb-12">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Column 1 — Brand */}
          <div>
            <div className="font-display text-[32px] text-cream tracking-[-0.02em]">
              {t('brand.wordmark')}
            </div>
            <p className="type-body-sm text-cream/60 mt-16">{t('brand.tagline')}</p>
            <p className="type-caption text-cream/40 mt-32">{t('brand.trust')}</p>
          </div>

          {/* Column 2 — Services */}
          <div>
            <h3 className="type-label text-cream/50">{t('services.header')}</h3>
            <nav className="flex flex-col gap-3 mt-6">
              {servicesLinks.map((link) => (
                <Link key={link.key} href={link.href} className={footerLinkClasses}>
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Column 3 — Company */}
          <div>
            <h3 className="type-label text-cream/50">{t('company.header')}</h3>
            <nav className="flex flex-col gap-3 mt-6">
              {companyLinks.map((link) => (
                <Link key={link.key} href={link.href} className={footerLinkClasses}>
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Column 4 — Contact */}
          <div>
            <h3 className="type-label text-cream/50">{t('contact.header')}</h3>
            <nav className="flex flex-col gap-3 mt-6">
              <a href={`mailto:${t('contact.email')}`} className={footerLinkClasses}>
                {t('contact.email')}
              </a>
              <Link href={t('contact.links.privacy.href')} className={footerLinkClasses}>
                {t('contact.links.privacy.label')}
              </Link>
              <Link href={t('contact.links.terms.href')} className={footerLinkClasses}>
                {t('contact.links.terms.label')}
              </Link>
            </nav>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-64 pt-24 border-t border-rule flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="type-caption text-cream/40">{t('bottom.copyright')}</p>
          <span aria-hidden="true" className="text-accent text-[20px] leading-none">
            ✱
          </span>
        </div>
      </Container>
    </footer>
  );
}
