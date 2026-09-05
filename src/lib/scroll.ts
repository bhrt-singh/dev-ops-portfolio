import { getLenis } from './lenis';

/** Height of the sticky navbar, so anchored sections aren't tucked under it. */
export const NAV_OFFSET = 72;

/**
 * Smooth-scrolls to a section by id, using Lenis if it's active (buttery
 * inertia easing) and falling back to native smooth scroll otherwise
 * (also what kicks in automatically for prefers-reduced-motion users,
 * since Lenis never initializes for them).
 */
export function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;

  const lenis = getLenis();
  if (lenis) {
    lenis.scrollTo(el, { offset: -NAV_OFFSET, duration: 1.2 });
    return;
  }

  const top = el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
  window.scrollTo({ top, behavior: 'smooth' });
}

export function scrollToTop() {
  const lenis = getLenis();
  if (lenis) {
    lenis.scrollTo(0, { duration: 1 });
    return;
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
