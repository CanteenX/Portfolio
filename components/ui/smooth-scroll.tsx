"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { useReducedMotion } from "@/lib/useReducedMotion";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    // Native scrolling when reduced motion is requested. Lenis is never
    // constructed, so find-in-page, keyboard paging and scroll restoration all
    // behave normally rather than being hijacked and then partly released.
    if (reducedMotion) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2
    });

    // Lenis used to be driven by gsap.ticker, which only existed here to keep
    // ScrollTrigger in sync. Nothing uses ScrollTrigger now, and the teardown
    // was unsound anyway: it removed `lenis.raf`, never the closure that had
    // been added, so every unmount left a ticker callback running against a
    // destroyed instance.
    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, [reducedMotion]);

  return <>{children}</>;
}
