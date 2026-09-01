import { ReactNode, HTMLAttributes } from 'react';

type EyebrowColor = 'accent' | 'muted';
type EyebrowVariant = 'plain' | 'pill';

interface EyebrowProps extends HTMLAttributes<HTMLParagraphElement> {
  children: ReactNode;
  color?: EyebrowColor;
  variant?: EyebrowVariant;
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
 * variant="pill" is reserved for the Hero eyebrow only (PRD §4.2 exception —
 * every other section eyebrow stays plain text per §4.2, §4.4, §4.5).
 *
 * Usage:
 *   <Eyebrow>Step 5c — Small utilities</Eyebrow>
 *   <Eyebrow color="muted" className="mb-4">type-hero</Eyebrow>
 *   <Eyebrow variant="pill">For Dutch service businesses</Eyebrow>
 */
export function Eyebrow({
  children,
  color = 'accent',
  variant = 'plain',
  className = '',
  ...rest
}: EyebrowProps) {
  const classes = [
    'type-label',
    variant === 'pill'
      ? 'inline-block w-fit bg-accent-tint text-accent-deep rounded-full px-3 py-1'
      : colorClasses[color],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <p className={classes} {...rest}>
      {children}
    </p>
  );
}
