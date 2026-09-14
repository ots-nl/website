import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { Essay, EssayFrontmatter } from '@/lib/essay';

export type { Essay, EssayFrontmatter } from '@/lib/essay';
export { formatEssayDate } from '@/lib/essay';

const ESSAYS_DIR = path.join(process.cwd(), 'content/essays');

function readEssayFile(filename: string): Essay {
  const raw = fs.readFileSync(path.join(ESSAYS_DIR, filename), 'utf8');
  const { data, content } = matter(raw);
  return { ...(data as EssayFrontmatter), content };
}

/** All essays in content/essays/, newest first. Server-only (reads the filesystem). */
export function getAllEssays(): Essay[] {
  if (!fs.existsSync(ESSAYS_DIR)) return [];

  return fs
    .readdirSync(ESSAYS_DIR)
    .filter((filename) => filename.endsWith('.mdx'))
    .map(readEssayFile)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getEssayBySlug(slug: string): Essay | null {
  const filePath = path.join(ESSAYS_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  return readEssayFile(`${slug}.mdx`);
}

/** Other essays in the same category, most recent first, excluding the current one. */
export function getRelatedEssays(current: Essay, limit = 2): Essay[] {
  return getAllEssays()
    .filter((essay) => essay.slug !== current.slug && essay.category === current.category)
    .slice(0, limit);
}
