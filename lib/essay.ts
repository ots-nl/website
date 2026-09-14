export interface EssayFrontmatter {
  title: string;
  slug: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  deck: string;
  heroImage: string;
}

export interface Essay extends EssayFrontmatter {
  content: string;
}

export function formatEssayDate(date: string, locale: string): string {
  return new Date(date).toLocaleDateString(locale === 'nl' ? 'nl-NL' : 'en-US', {
    month: 'long',
    year: 'numeric',
  });
}
