import {defineRouting} from 'next-intl/routing';

export const routing = defineRouting({
  // Locales this site supports.
  locales: ['nl', 'en'],

  // Dutch is the default (Company Brain: Netherlands is our primary market).
  defaultLocale: 'nl',

  // Prefix strategy: default locale has no prefix (/), non-default gets a prefix (/en).
  // Matches PRD v1.1 §3.3.
  localePrefix: 'as-needed'
});
