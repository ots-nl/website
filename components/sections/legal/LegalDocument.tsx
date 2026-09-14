import { MDXRemote } from 'next-mdx-remote/rsc';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { essayMdxComponents } from '@/components/sections/essays/mdxComponents';

interface LegalDocumentProps {
  eyebrow: string;
  title: string;
  lastUpdatedLabel: string;
  lastUpdatedValue: string;
  content: string;
}

/**
 * LegalDocument — shared layout for /privacybeleid and /algemene-voorwaarden.
 * Same single-column reading pattern as the essay detail page (Step 17):
 * cream background, 720px measure, essayMdxComponents typography for the
 * body so legal copy and essay copy stay visually consistent.
 */
export function LegalDocument({
  eyebrow,
  title,
  lastUpdatedLabel,
  lastUpdatedValue,
  content,
}: LegalDocumentProps) {
  return (
    <main>
      <Section background="cream">
        <Container>
          <article className="max-w-[720px] mx-auto">
            <Eyebrow>{eyebrow}</Eyebrow>
            <h1 className="font-display text-[clamp(40px,6vw,72px)] leading-[0.98] tracking-[-0.02em] text-ink mt-6">
              {title}
            </h1>
            <p className="font-normal text-[13px] text-muted mt-4">
              {lastUpdatedLabel}: {lastUpdatedValue}
            </p>

            <div className="mt-16">
              <MDXRemote source={content} components={essayMdxComponents} />
            </div>
          </article>
        </Container>
      </Section>
    </main>
  );
}
