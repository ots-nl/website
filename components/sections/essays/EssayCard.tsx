'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';

interface EssayCardProps {
  href: string;
  photoSrc: string;
  photoAlt: string;
  meta: string;
  title: string;
  excerpt: string;
  readLinkText: string;
  size?: 'default' | 'large';
  index?: number;
  priority?: boolean;
}

/**
 * EssayCard — the essay preview card used on the homepage Recent Essays
 * section and the /essays index. Same structure in both places; `size="large"`
 * bumps the title and excerpt for the index grid per the Step 17 spec
 * ("same structure... but larger" — a size variant, not a separate component).
 */
export function EssayCard({
  href,
  photoSrc,
  photoAlt,
  meta,
  title,
  excerpt,
  readLinkText,
  size = 'default',
  index = 0,
  priority = false,
}: EssayCardProps) {
  const shouldReduce = useReducedMotion();
  const isLarge = size === 'large';

  return (
    <motion.div
      initial={shouldReduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: shouldReduce ? 0 : 0.6,
        delay: shouldReduce ? 0 : index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <Link href={href} className="group flex flex-col">
        <div className="relative w-full aspect-[4/3] rounded-card overflow-hidden">
          <Image
            src={photoSrc}
            alt={photoAlt}
            fill
            priority={priority}
            sizes={isLarge ? '(max-width: 768px) 100vw, 50vw' : '(max-width: 768px) 100vw, 33vw'}
            className="object-cover [filter:sepia(0.12)_saturate(1.15)] transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-[1.03]"
          />
        </div>

        <div className="mt-6">
          <div className="text-muted text-xs">{meta}</div>
          <h3
            className={[
              'font-display text-ink mt-2 transition-colors duration-500 group-hover:text-accent',
              isLarge ? 'text-[32px] leading-tight' : 'text-2xl leading-tight',
            ].join(' ')}
          >
            {title}
          </h3>
          <p
            className={[
              'text-ink-soft text-sm leading-relaxed mt-3',
              isLarge ? 'line-clamp-3' : 'line-clamp-2',
            ].join(' ')}
          >
            {excerpt}
          </p>
          <div className="mt-4 text-ink text-[13px] font-medium">{readLinkText}</div>
        </div>
      </Link>
    </motion.div>
  );
}
