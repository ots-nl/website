'use client';

import { ReactNode } from 'react';
import { Link } from '../../i18n/navigation';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'nav';
type SupportedLocale = 'nl' | 'en';

interface ButtonBaseProps {
  children: ReactNode;
  variant?: ButtonVariant;
  hideArrow?: boolean;
  className?: string;
}

// Link mode — when href is provided, renders as next-intl Link (internal) or <a> (external).
interface ButtonAsLinkProps extends ButtonBaseProps {
  href: string;
  external?: boolean;
  locale?: SupportedLocale;
  type?: never;
  onClick?: never;
  disabled?: never;
}

// Button mode — no href, renders as <button>.
interface ButtonAsButtonProps extends ButtonBaseProps {
  href?: never;
  external?: never;
  locale?: never;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  disabled?: boolean;
}

type ButtonProps = ButtonAsLinkProps | ButtonAsButtonProps;

/**
 * variantClasses — Brand Bible v2 §4.5.
 *
 * primary: accent orange pill, cream text, translateY(-1px) on hover.
 * secondary: transparent with 1px ink border, ink text, inverts on hover.
 * ghost: no background, underline draws in left-to-right via scaleX pseudo-element.
 * nav: accent pill, compact padding (for navigation only).
 */
const variantClasses: Record<ButtonVariant, string> = {
  primary: [
    'type-button',
    'inline-flex items-center gap-2',
    'rounded-pill',
    'bg-accent text-cream',
    'px-7 py-3.5',
    'transition-all duration-300 ease-out',
    'hover:bg-accent-deep hover:-translate-y-px',
    'active:translate-y-0',
    'disabled:opacity-50 disabled:pointer-events-none',
  ].join(' '),

  secondary: [
    'type-button',
    'inline-flex items-center gap-2',
    'rounded-pill',
    'bg-transparent border border-current',
    'px-7 py-3.5',
    'transition-all duration-300 ease-out',
    'hover:-translate-y-px',
    'active:translate-y-0',
    'disabled:opacity-50 disabled:pointer-events-none',
  ].join(' '),

  ghost: [
    'type-button',
    'inline-flex items-center gap-1',
    'text-current',
    'relative py-1',
    'after:content-[""]',
    'after:absolute after:bottom-0 after:left-0',
    'after:h-px after:w-full',
    'after:origin-left after:scale-x-0',
    'after:bg-current',
    'after:transition-transform after:duration-300 after:ease-out',
    'hover:after:scale-x-100',
  ].join(' '),

  nav: [
    'type-button',
    'inline-flex items-center gap-2',
    'rounded-pill',
    'bg-accent text-cream',
    'px-6 py-2.5',
    'transition-colors duration-300 ease-out',
    'hover:bg-accent-deep',
  ].join(' '),
};

export function Button(props: ButtonProps) {
  const {
    children,
    variant = 'primary',
    hideArrow = false,
    className = '',
  } = props;

  const showArrow =
    !hideArrow &&
    (variant === 'primary' || variant === 'secondary' || variant === 'ghost');
  const arrowSymbol = variant === 'ghost' ? '→' : '↗';

  const classes = [variantClasses[variant], className]
    .filter(Boolean)
    .join(' ');

  const content = (
    <>
      <span>{children}</span>
      {showArrow && (
        <span aria-hidden="true" className="text-[14px]">
          {arrowSymbol}
        </span>
      )}
    </>
  );

  // Link mode — external URL
  if ('href' in props && props.href && props.external) {
    return (
      <a
        href={props.href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
      >
        {content}
      </a>
    );
  }

  // Link mode — internal (locale-aware)
  if ('href' in props && props.href) {
    return (
      <Link
        href={props.href}
        locale={props.locale}
        className={classes}
      >
        {content}
      </Link>
    );
  }

  // Button mode
  return (
    <button
      type={props.type ?? 'button'}
      onClick={props.onClick}
      disabled={props.disabled}
      className={classes}
    >
      {content}
    </button>
  );
}
