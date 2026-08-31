'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';

/**
 * ScrollIndicator — the rotating badge in the Hero's bottom-right corner.
 *
 * Brand Bible v2 §4.5: a small circular indicator with curved text
 * ("SCROLL · DOWN · SCROLL · DOWN ·") rotating slowly around a
 * downward arrow. Fades out on scroll — its job ends once the user
 * has scrolled past the hero.
 *
 * Brand Bible v2 §4.7: motion is considered, not decorative. Slow
 * continuous rotation (20s per revolution) signals "alive system",
 * not "toy". Respects prefers-reduced-motion.
 */
export function ScrollIndicator() {
  const { scrollY } = useScroll();
  // Fade from opacity 1 to 0 as scroll goes from 0 to 400px.
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  // Check for reduced motion preference on mount.
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return (
    <motion.div
      style={{ opacity }}
      className="absolute bottom-8 right-8 z-10 pointer-events-none"
      aria-hidden="true"
    >
      <div className="relative w-24 h-24 flex items-center justify-center">
        {/* Rotating curved text — SVG with textPath */}
        <svg
          viewBox="0 0 100 100"
          className="absolute inset-0 w-full h-full"
          style={{
            animation: prefersReducedMotion
              ? 'none'
              : 'rotate-slow 20s linear infinite',
          }}
        >
          <defs>
            <path
              id="scroll-indicator-circle"
              d="M 50, 50 m -38, 0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0"
              fill="none"
            />
          </defs>
          <text
            className="type-label"
            style={{
              fontSize: '9px',
              letterSpacing: '0.28em',
              fill: 'var(--color-ink)',
            }}
          >
            <textPath href="#scroll-indicator-circle" startOffset="0%">
              SCROLL · DOWN · SCROLL · DOWN ·
            </textPath>
          </text>
        </svg>

        {/* Central downward arrow */}
        <span
          className="text-accent text-lg leading-none"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          ↓
        </span>
      </div>
    </motion.div>
  );
}
