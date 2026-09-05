import React, { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

/**
 * A soft light that follows the cursor across the page — subtle, and only
 * on desktop/no-reduced-motion, so it reads as ambient depth rather than a
 * distraction. Pure DOM transform updates (no React state) to stay cheap.
 */
export const CursorGlow: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) return;
    if (window.matchMedia('(hover: none)').matches) return; // skip touch devices

    let raf = 0;
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let x = targetX;
    let y = targetY;

    const onMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const loop = () => {
      x += (targetX - x) * 0.08;
      y += (targetY - y) * 0.08;
      if (ref.current) {
        ref.current.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', onMove);
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, [shouldReduceMotion]);

  if (shouldReduceMotion) return null;

  return <div ref={ref} className="cursor-glow" aria-hidden />;
};
