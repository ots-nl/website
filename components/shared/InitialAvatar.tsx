type InitialAvatarVariant = 'cream-deep' | 'night-soft' | 'accent-tint';

interface InitialAvatarProps {
  initial: string;
  variant: InitialAvatarVariant;
  ariaLabel: string;
  className?: string;
}

const variantClasses: Record<InitialAvatarVariant, string> = {
  'cream-deep': 'bg-cream-deep text-ink',
  'night-soft': 'bg-night-soft text-cream',
  'accent-tint': 'bg-accent-tint text-ink',
};

/**
 * InitialAvatar — placeholder for a person's portrait until real photography
 * exists. A colour-and-type mark (initial letter), not a silhouette or icon.
 *
 * Font-size uses container query width units (50cqw) rather than a fixed px
 * value: since the box is a fixed 4:5 ratio, 50% of its width always equals
 * 40% of its height, so the letter holds proportion across breakpoints.
 */
export function InitialAvatar({ initial, variant, ariaLabel, className = '' }: InitialAvatarProps) {
  const classes = [
    'relative aspect-[4/5] w-full rounded-card-sm flex items-center justify-center [container-type:inline-size] overflow-hidden',
    variantClasses[variant],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes} role="img" aria-label={ariaLabel}>
      <span className="font-display leading-none select-none" style={{ fontSize: '50cqw' }} aria-hidden="true">
        {initial}
      </span>
    </div>
  );
}
