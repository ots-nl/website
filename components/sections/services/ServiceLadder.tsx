'use client';

import { Fragment } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';

const EASE = [0.16, 1, 0.3, 1] as const;

interface Node {
  number: string;
  name: string;
  meta: string;
}

/**
 * ServiceLadder — night-background section showing the three-node
 * Audit → Build → Retainer progression, with a centred explainer paragraph
 * below. On mobile the nodes stack vertically with a down-arrow connector.
 */
export function ServiceLadder() {
  const t = useTranslations('services.ladder');
  const shouldReduce = useReducedMotion();
  const nodes = t.raw('nodes') as Node[];

  return (
    <Section background="night">
      <Container>
        <div className="flex flex-col md:flex-row items-center md:items-start justify-center gap-8 md:gap-0">
          {nodes.map((node, i) => (
            <Fragment key={node.name}>
              <motion.div
                className="flex flex-col items-center text-center md:w-[180px]"
                initial={shouldReduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: shouldReduce ? 0 : 0.6,
                  delay: shouldReduce ? 0 : i * 0.15,
                  ease: EASE,
                }}
              >
                <div className="font-display text-[15px] text-accent mb-2">{node.number}</div>
                <div className="font-display text-[36px] leading-none text-cream">{node.name}</div>
                <div className="type-body-sm text-muted mt-3">{node.meta}</div>
              </motion.div>

              {i < nodes.length - 1 && (
                <>
                  <div
                    aria-hidden="true"
                    className="hidden md:flex items-center flex-1 px-3 mt-7 gap-1"
                  >
                    <div className="flex-1 h-px bg-muted/30" />
                    <span className="text-muted text-[15px] leading-none">→</span>
                  </div>
                  <div aria-hidden="true" className="md:hidden text-muted text-lg">
                    ↓
                  </div>
                </>
              )}
            </Fragment>
          ))}
        </div>

        <p className="type-body-lg text-cream/80 max-w-[720px] mx-auto text-center mt-20">
          {t('explainer')}
        </p>
      </Container>
    </Section>
  );
}
