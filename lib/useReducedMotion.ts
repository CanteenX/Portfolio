"use client";

import { useSyncExternalStore } from "react";

/**
 * Subscribes to a media query the way React wants external state read.
 *
 * `useState` + `useEffect` also works, but it renders once with the wrong
 * answer and then again with the right one, which for reduced motion means one
 * frame of the animation the visitor asked not to see.
 */
export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const list = window.matchMedia(query);
      // The setting can change while the page is open — an OS accessibility
      // toggle should take effect without a reload.
      list.addEventListener("change", onChange);
      return () => list.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    // Server snapshot: no media queries exist, and false is the value the
    // client also starts from, so the markup matches.
    () => false
  );
}

/**
 * Whether this visitor has asked their OS for reduced motion.
 *
 * The site runs Lenis scroll-hijacking sitewide, reveal animations on every
 * section, an auto-advancing carousel, a Spline 3D scene and a WebGL globe, and
 * honoured none of it. WCAG 2.3.3 and 2.2.2 aside, the concrete cost is that
 * users with vestibular disorders get motion sickness rather than a bad
 * impression — and scroll hijacking also breaks find-in-page, keyboard paging
 * and back-button scroll restoration for everyone.
 */
export function useReducedMotion(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}
