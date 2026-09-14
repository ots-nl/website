import type { MDXComponents } from 'mdx/types';

/**
 * essayMdxComponents — maps markdown output to the article-body typography
 * spec (Step 17): Inter 18px/1.7 body, Anton 32px H2s, Anton 22px H3s,
 * Cormorant Garamond italic blockquotes with an accent left border. Mapped
 * explicitly per element rather than relying on MDX defaults, since
 * Tailwind's reset strips default browser styling from all of these.
 */
export const essayMdxComponents: MDXComponents = {
  h2: ({ children }) => (
    <h2 className="font-display text-[32px] leading-tight text-ink mt-16 mb-6">{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 className="font-display text-[22px] leading-snug text-ink mt-12 mb-4">{children}</h3>
  ),
  p: ({ children }) => (
    <p className="text-[18px] leading-[1.7] text-ink-soft my-6">{children}</p>
  ),
  blockquote: ({ children }) => (
    <blockquote className="italic [font-family:var(--font-italic)] text-[22px] leading-relaxed text-ink border-l-2 border-accent pl-6 my-12">
      {children}
    </blockquote>
  ),
  ul: ({ children }) => (
    <ul className="list-disc marker:text-accent pl-6 space-y-2 my-6">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal marker:text-accent marker:font-medium pl-6 space-y-2 my-6">
      {children}
    </ol>
  ),
  li: ({ children }) => <li className="text-[18px] leading-[1.7] text-ink-soft">{children}</li>,
  strong: ({ children }) => <strong className="text-ink font-semibold">{children}</strong>,
  em: ({ children }) => <em className="italic">{children}</em>,
  a: ({ children, href }) => (
    <a
      href={href}
      className="text-accent underline underline-offset-2 hover:text-accent-deep transition-colors duration-300"
    >
      {children}
    </a>
  ),
};
