import { notFound } from 'next/navigation';

/**
 * Catch-all for any URL under [locale]/ that doesn't match a real page.
 *
 * In this Next.js version, not-found.tsx only renders when notFound() is
 * explicitly thrown within a route segment — it no longer catches arbitrary
 * unmatched URLs on its own (see node_modules/next/dist/docs/.../not-found.md).
 * This route exists purely to trigger that throw so [locale]/not-found.tsx
 * renders with full locale/translation context, the same way the EN-gated
 * privacybeleid/terms pages already do.
 */
export default function NotFoundCatchAll() {
  notFound();
}
