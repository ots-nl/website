import type { Metadata } from 'next';

/**
 * Always the real production domain, regardless of where the site is
 * currently hosted (Vercel preview URL) — this is what gets indexed once
 * DNS switches. See Step 22 spec.
 */
export const SITE_URL = 'https://ontwikkelingtechservices.nl';

export function absoluteUrl(path: string): string {
  return new URL(path, SITE_URL).toString();
}

type PageMetadataInput = {
  title: string;
  description: string;
  /** Site-relative path of the canonical URL, e.g. '/en/services'. */
  path: string;
  locale: string;
};

/** Per-page metadata that carries the site-wide OG/Twitter defaults forward
 * while overriding title, description, and the canonical URL. Page-level
 * `openGraph`/`twitter` objects replace the layout's rather than merging
 * with it, so every field that should survive has to be repeated here. */
export function buildPageMetadata({
  title,
  description,
  path,
  locale,
}: PageMetadataInput): Metadata {
  return {
    title,
    description,
    alternates: {
      canonical: absoluteUrl(path),
    },
    openGraph: {
      title,
      description,
      url: absoluteUrl(path),
      siteName: 'Ontwikkeling Tech Services',
      locale: locale === 'nl' ? 'nl_NL' : 'en_US',
      type: 'website',
      images: ['/og-default.png'],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/og-default.png'],
    },
  };
}
