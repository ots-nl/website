import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { ScrollIndicator } from '@/components/ui/ScrollIndicator';

/**
 * Placeholder treatment shared by every block in this skeleton.
 * Replaced with real content in Step 7b (copy/CTAs) and Step 7c (photograph).
 */
const placeholder =
  'bg-cream-deep border border-dashed border-rule flex items-center justify-center text-center text-muted text-[12px] leading-snug px-3';

/**
 * Hero — the full-viewport-height opening section.
 *
 * Structural skeleton only (Step 7a): the asymmetric two-column grid and
 * placeholder blocks that Step 7b (copy) and Step 7c (photograph) fill in.
 */
export function Hero() {
  return (
    <Section
      background="cream"
      className="relative min-h-screen min-h-[720px] flex items-center"
    >
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-6 lg:gap-6 items-center min-h-[inherit]">
          {/* Left column — copy stack */}
          <div className="flex flex-col gap-4">
            <div className={`${placeholder} rounded-chip h-9 w-40`}>
              Eyebrow — Step 7b
            </div>
            <div className={`${placeholder} rounded-card-sm h-48`}>
              Headline (2 lines) — Step 7b
            </div>
            <div className={`${placeholder} rounded-card-sm h-24`}>
              Subheadline — Step 7b
            </div>
            <div className={`${placeholder} rounded-chip h-14`}>
              CTA buttons — Step 7b
            </div>
            <div className={`${placeholder} rounded-chip h-8 w-56`}>
              Foot note — Step 7b
            </div>
          </div>

          {/* Right column — photograph */}
          <div
            className={`${placeholder} rounded-card min-h-[280px] lg:min-h-[560px]`}
          >
            Photograph — Step 7c
          </div>
        </div>
      </Container>

      <ScrollIndicator />
    </Section>
  );
}
