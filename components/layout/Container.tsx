import { ReactNode, HTMLAttributes } from 'react';

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

/**
 * Container — the standard OTS content container.
 *
 * From Brand Bible v2 §4.3: 1280px max-width, responsive horizontal padding
 * (96px desktop, 48px tablet, 24px mobile). Always used inside a Section.
 *
 * Usage:
 *   <Section>
 *     <Container>...content...</Container>
 *   </Section>
 */
export function Container({
  children,
  className = '',
  ...rest
}: ContainerProps) {
  const classes = ['container-ots', className].filter(Boolean).join(' ');

  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  );
}
