import { ReactNode, HTMLAttributes } from 'react';

type EyebrowColor = 'accent' | 'muted';

interface EyebrowProps extends HTMLAttributes<HTMLParagraphElement> {
  children: ReactNode;
  color?: EyebrowColor;
}

const colorClasses: Record<EyebrowColor, string> = {
  accent: 'text-accent',
  muted: 'text-muted',
};

/**
 * Eyebrow — the small uppercase label that appears above section titles.
 *
 * Brand Bible v2 §4.2: uses the type-label style (Inter 600, 11px, 0.14em
 * letter-spacing, uppercase). Default colour is accent — the standard
 * "section eyebrow" pattern. Use color="muted" for design-system reference
 * labels (e.g., labels-on-labels in a type showcase).
 *
 * Usage:
 *   <Eyebrow>Step 5c — Small utilities</Eyebrow>
 *   <Eyebrow color="muted" className="mb-4">type-hero</Eyebrow>
 */
export function Eyebrow({
  children,
  color = 'accent',
  className = '',
  ...rest
}: EyebrowProps) {
  const classes = ['type-label', colorClasses[color], className]
    .filter(Boolean)
    .join(' ');

  return (
    <p className={classes} {...rest}>
      {children}
    </p>
  );
}
