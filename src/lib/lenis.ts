import Lenis from 'lenis';

let lenisInstance: Lenis | null = null;
let rafId: number | null = null;

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Boots a single shared Lenis instance for the whole app. Safe to call
 * multiple times (e.g. React StrictMode double-invoke) — it only sets up once.
 * Returns a cleanup function.
 */
export function initLenis(): () => void {
  if (lenisInstance || prefersReducedMotion()) {
    return () => {};
  }

  lenisInstance = new Lenis({
    duration: 1.1,
    easing: (t: number) => 1 - Math.pow(1 - t, 3), // easeOutCubic
    smoothWheel: true,
    touchMultiplier: 1.4,
  });

  const raf = (time: number) => {
    lenisInstance?.raf(time);
    rafId = requestAnimationFrame(raf);
  };
  rafId = requestAnimationFrame(raf);

  return () => {
    if (rafId) cancelAnimationFrame(rafId);
    lenisInstance?.destroy();
    lenisInstance = null;
    rafId = null;
  };
}

export function getLenis(): Lenis | null {
  return lenisInstance;
}
