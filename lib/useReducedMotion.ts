"use client";

import { useEffect, useState } from "react";

/**
 * Whether this visitor has asked their OS for reduced motion.
 *
 * The site runs Lenis scroll-hijacking sitewide, GSAP reveals on every section,
 * a Spline 3D scene and a WebGL globe, and honoured none of it. WCAG 2.3.3 and
 * 2.2.2 aside, the concrete cost is that users with vestibular disorders get
 * motion sickness rather than a bad impression — and scroll hijacking also
 * breaks find-in-page, keyboard paging and back-button scroll restoration for
 * everyone.
 *
 * Starts false so the server render and the first client render agree; a
 * visitor who wants reduced motion gets it on the effect, one frame later,
 * rather than a hydration mismatch.
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(query.matches);

    // The setting can change while the page is open — an OS accessibility
    // toggle should take effect without a reload.
    const onChange = (event: MediaQueryListEvent) => setReduced(event.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  return reduced;
}
