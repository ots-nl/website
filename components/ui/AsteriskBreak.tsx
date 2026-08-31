interface AsteriskBreakProps {
  className?: string;
}

/**
 * AsteriskBreak — the ✱ OTS section signature.
 *
 * Brand Bible v2 §6.2: "The asterisk is the OTS section signature. A single
 * character between sections, at the end of essays, and as a footer mark.
 * Never decorative — always semantically 'here's a pause.'"
 *
 * Renders as a centered accent-orange asterisk with generous vertical padding.
 * The padding creates the breath around it — the pause is the point.
 *
 * Sits BETWEEN sections in the JSX tree, not inside them:
 *   <Section>...</Section>
 *   <AsteriskBreak />
 *   <Section>...</Section>
 *
 * The asterisk is marked aria-hidden — it's a visual mark, not information.
 */
export function AsteriskBreak({ className = '' }: AsteriskBreakProps) {
  const classes = [
    'flex justify-center',
    'py-16 lg:py-24',
    'bg-cream',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes} aria-hidden="true">
      <span className="text-5xl text-accent leading-none">✱</span>
    </div>
  );
}
