import React from 'react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';

interface RevealProps {
  children: React.ReactNode;
  /** Stagger delay slot — pass an index and it multiplies by ~0.08s. */
  index?: number;
  delay?: number;
  y?: number;
  className?: string;
  style?: React.CSSProperties;
  as?: 'div' | 'section';
}

/**
 * Fades + lifts content into place the first time it crosses into view.
 * Runs once (viewport.once) so re-scrolling past a section never re-triggers
 * it, and collapses to a no-op (instant, fully visible) for anyone with
 * prefers-reduced-motion set.
 */
export const Reveal: React.FC<RevealProps> = ({
  children,
  index = 0,
  delay = 0,
  y = 20,
  className,
  style,
  as = 'div',
}) => {
  const shouldReduceMotion = useReducedMotion();

  const variants: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : y },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.55,
        delay: shouldReduceMotion ? 0 : delay + index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const MotionTag = as === 'section' ? motion.section : motion.div;

  return (
    <MotionTag
      className={className}
      style={style}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
      variants={variants}
    >
      {children}
    </MotionTag>
  );
};
