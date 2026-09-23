import type { MetadataRoute } from 'next';
import { getAllEssays } from '@/lib/mdx';
import { absoluteUrl } from '@/lib/metadata';

// Always indexed against the real production domain (absoluteUrl), even
// while the site is served from the Vercel preview URL. Essay slugs are
// read from content/essays/ so future essays appear automatically.
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticEntries: MetadataRoute.Sitemap = [
    { url: absoluteUrl('/'), lastModified, changeFrequency: 'monthly', priority: 1.0 },
    { url: absoluteUrl('/en'), lastModified, changeFrequency: 'monthly', priority: 1.0 },
    { url: absoluteUrl('/diensten'), lastModified, changeFrequency: 'monthly', priority: 0.9 },
    { url: absoluteUrl('/en/services'), lastModified, changeFrequency: 'monthly', priority: 0.9 },
    { url: absoluteUrl('/essays'), lastModified, changeFrequency: 'weekly', priority: 0.8 },
    { url: absoluteUrl('/en/essays'), lastModified, changeFrequency: 'weekly', priority: 0.8 },
    { url: absoluteUrl('/contact'), lastModified, changeFrequency: 'yearly', priority: 0.5 },
    { url: absoluteUrl('/en/contact'), lastModified, changeFrequency: 'yearly', priority: 0.5 },
    { url: absoluteUrl('/privacybeleid'), lastModified, changeFrequency: 'yearly', priority: 0.5 },
    { url: absoluteUrl('/algemene-voorwaarden'), lastModified, changeFrequency: 'yearly', priority: 0.5 },
  ];

  const essayEntries: MetadataRoute.Sitemap = getAllEssays().flatMap((essay) => {
    const essayLastModified = new Date(essay.date);
    return [
      {
        url: absoluteUrl(`/essays/${essay.slug}`),
        lastModified: essayLastModified,
        changeFrequency: 'monthly',
        priority: 0.7,
      },
      {
        url: absoluteUrl(`/en/essays/${essay.slug}`),
        lastModified: essayLastModified,
        changeFrequency: 'monthly',
        priority: 0.7,
      },
    ];
  });

  return [...staticEntries, ...essayEntries];
}
