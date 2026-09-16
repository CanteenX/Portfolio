"use client";

import { ReactNode } from "react";
import { motion } from "motion/react";

/**
 * Reveals its children as they scroll into view.
 *
 * Built on Framer Motion rather than GSAP ScrollTrigger so the site ships one
 * animation runtime instead of two. ScrollTrigger also needed a scroll-position
 * feed from Lenis to stay in sync, which is why the smooth-scroll wrapper had to
 * know about GSAP at all; an IntersectionObserver observes the real scroll
 * container and needs no such wiring.
 *
 * Reduced motion is handled by `MotionConfig reducedMotion="user"` in
 * app/template.tsx: the transform is dropped and the opacity fade is kept, so
 * the content still appears instead of staying at opacity 0.
 */
interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  duration?: number;
}

const OFFSET: Record<NonNullable<ScrollRevealProps["direction"]>, { x?: number; y?: number }> = {
  up: { y: 60 },
  down: { y: -60 },
  left: { x: 60 },
  right: { x: -60 },
  none: {}
};

export function ScrollReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
  duration = 1
}: ScrollRevealProps) {
  return (
    <motion.div
      className={className}
      // Server-rendered at opacity 0, so without JS the page would be blank.
      // The noscript rule in app/layout.tsx targets this attribute.
      data-reveal=""
      initial={{ opacity: 0, ...OFFSET[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      // Matches the old "top 85%" trigger: the reveal fires once the element is
      // 15% of the viewport in, not the instant its first pixel crosses.
      viewport={{ once: true, margin: "0px 0px -15% 0px" }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
