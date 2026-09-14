'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link, usePathname } from '@/i18n/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { Button } from '@/components/ui/Button';

const links = [
  { key: 'linkDiensten', href: '/#diensten' },
  { key: 'linkEssays', href: '/#essays' },
  { key: 'linkOverOns', href: '/#team' },
] as const;

const locales = ['nl', 'en'] as const;

/**
 * Nav — persistent site navigation.
 *
 * Fixed header that starts transparent over the hero and picks up a frosted
 * cream background once the page scrolls past 80px. Collapses to a hamburger
 * + full-screen overlay below the md breakpoint.
 */
export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();

  // Check for reduced motion preference on mount.
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const closeMenu = () => setMobileMenuOpen(false);

  const localePill = (onLinkClick?: () => void) => (
    <div className="flex items-center gap-0.5 rounded-pill border border-rule p-0.5">
      {locales.map((loc) => (
        <Link
          key={loc}
          href={pathname}
          locale={loc}
          onClick={onLinkClick}
          aria-current={loc === locale ? 'page' : undefined}
          className={[
            'type-button uppercase rounded-pill px-3 py-1 transition-colors duration-300',
            loc === locale
              ? 'bg-accent text-cream'
              : 'text-ink-soft hover:text-ink',
          ].join(' ')}
        >
          {loc}
        </Link>
      ))}
    </div>
  );

  const headerClasses = [
    'fixed top-0 left-0 right-0 z-[200]',
    'h-[60px] md:h-[72px]',
    'transition-[background-color,backdrop-filter,border-color,box-shadow] duration-[400ms] ease-out',
    scrolled
      ? 'bg-cream/80 backdrop-blur-md border-b border-rule shadow-[0_1px_20px_rgb(20_18_16_/_0.06)]'
      : 'bg-transparent border-b border-transparent shadow-none',
  ].join(' ');

  return (
    <>
      <header className={headerClasses}>
        <div className="container-ots h-full flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="font-display text-[22px] text-ink tracking-[-0.02em]"
          >
            <span className="hidden md:inline">{t('logo')}</span>
            <span className="md:hidden">{t('logoMobile')}</span>
          </Link>

          {/* Desktop center links */}
          <nav className="hidden md:flex items-center gap-10">
            {links.map((link) => (
              <Link
                key={link.key}
                href={link.href}
                className="type-body-sm relative py-1 text-ink-soft transition-colors duration-300 hover:text-ink after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 after:ease-out hover:after:scale-x-100"
              >
                {t(link.key)}
              </Link>
            ))}
          </nav>

          {/* Desktop right controls */}
          <div className="hidden md:flex items-center gap-6">
            {localePill()}
            <Button variant="nav">{t('cta')}</Button>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            aria-label={mobileMenuOpen ? t('closeMenu') : t('openMenu')}
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((open) => !open)}
            className="md:hidden relative w-8 h-8 flex flex-col items-center justify-center gap-[6px]"
          >
            <span
              className={[
                'block h-px w-6 bg-ink transition-transform duration-300 ease-out',
                mobileMenuOpen ? 'translate-y-[7px] rotate-45' : '',
              ].join(' ')}
            />
            <span
              className={[
                'block h-px w-6 bg-ink transition-opacity duration-300 ease-out',
                mobileMenuOpen ? 'opacity-0' : 'opacity-100',
              ].join(' ')}
            />
            <span
              className={[
                'block h-px w-6 bg-ink transition-transform duration-300 ease-out',
                mobileMenuOpen ? '-translate-y-[7px] -rotate-45' : '',
              ].join(' ')}
            />
          </button>
        </div>
      </header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={
              prefersReducedMotion
                ? { opacity: 1 }
                : { opacity: 0, x: '4%', y: '-4%' }
            }
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={
              prefersReducedMotion
                ? { opacity: 0 }
                : { opacity: 0, x: '4%', y: '-4%' }
            }
            transition={{
              duration: prefersReducedMotion ? 0 : 0.4,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="fixed inset-0 z-[199] bg-cream flex flex-col items-center justify-center gap-10"
          >
            <nav className="flex flex-col items-center gap-8">
              {links.map((link) => (
                <Link
                  key={link.key}
                  href={link.href}
                  onClick={closeMenu}
                  className="text-[32px] font-medium text-ink text-center"
                >
                  {t(link.key)}
                </Link>
              ))}
            </nav>

            {localePill(closeMenu)}

            <Button variant="nav" onClick={closeMenu}>
              {t('cta')}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
