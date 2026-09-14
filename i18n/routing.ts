import {defineRouting} from 'next-intl/routing';

export const routing = defineRouting({
  // Locales this site supports.
  locales: ['nl', 'en'],

  // Dutch is the default (Company Brain: Netherlands is our primary market).
  defaultLocale: 'nl',

  // Prefix strategy: default locale has no prefix (/), non-default gets a prefix (/en).
  // Matches PRD v1.1 §3.3.
  localePrefix: 'as-needed',

  // Disable Accept-Language/cookie-based auto-redirects. Required once locale-specific
  // slugs exist (e.g. /diensten vs /services) — otherwise an English-preferring browser
  // hitting the NL-only /diensten gets redirected to /en/diensten, which 404s, since the
  // two locales don't share a single slug. The locale pill in Nav is the only way to
  // switch locale; unprefixed paths always resolve to defaultLocale.
  localeDetection: false
});
