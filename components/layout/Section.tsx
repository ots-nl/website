import { ReactNode, HTMLAttributes } from 'react';

type SectionBackground = 'cream' | 'cream-deep' | 'night' | 'mist';

interface SectionProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  background?: SectionBackground;
  spacing?: 'default' | 'large';
}

/**
 * Background-to-classes map.
 * Each background pairs with the correct default text colour.
 *
 * From Brand Bible v2 §4.1:
 * - cream (#FAF6EE) is the canvas — default background, ink text
 * - cream-deep (#F2EBDA) is the secondary — for alternating rhythm
 * - night (#0E0B08) is the dark section — used sparingly, 2-3 max per page
 * - mist (#DDE6DA) is the sage — used once per page maximum (currently reserved for Contact)
 */
const backgroundClasses: Record<SectionBackground, string> = {
  'cream': 'bg-cream text-ink',
  'cream-deep': 'bg-cream-deep text-ink',
  'night': 'bg-night text-cream',
  'mist': 'bg-mist text-ink',
};

/**
 * Section — the standard OTS page section wrapper.
 *
 * From Brand Bible v2 §4.3: uses .section-ots CSS class for vertical rhythm
 * (128px desktop, 80px mobile). Longer sections (Hero, Final CTA) can pass
 * spacing="large" to add extra vertical padding on desktop.
 *
 * Usage:
 *   <Section background="night">
 *     <Container>...</Container>
 *   </Section>
 */
export function Section({
  children,
  background = 'cream',
  spacing = 'default',
  className = '',
  ...rest
}: SectionProps) {
  const classes = [
    'section-ots',
    backgroundClasses[background],
    spacing === 'large' ? 'lg:py-40' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <section className={classes} {...rest}>
      {children}
    </section>
  );
}
