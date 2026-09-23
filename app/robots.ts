import type { MetadataRoute } from 'next';
import { headers } from 'next/headers';
import { SITE_URL } from '@/lib/metadata';

// Blocks the Vercel preview URL from being indexed (avoids duplicate-content
// penalties against the real domain once DNS switches) and allows crawling
// only on the real production host. See Step 22 spec.
export default async function robots(): Promise<MetadataRoute.Robots> {
  const headersList = await headers();
  const host = headersList.get('host') ?? '';

  if (host.includes('vercel.app')) {
    return { rules: [{ userAgent: '*', disallow: '/' }] };
  }

  if (host === 'ontwikkelingtechservices.nl' || host === 'www.ontwikkelingtechservices.nl') {
    return {
      rules: [{ userAgent: '*', allow: '/' }],
      sitemap: `${SITE_URL}/sitemap.xml`,
    };
  }

  // Unknown host (localhost, staging, etc.) — default to blocking, safer.
  return { rules: [{ userAgent: '*', disallow: '/' }] };
}
