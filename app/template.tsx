"use client";
import { MotionConfig, motion } from "motion/react";

/**
 * Wraps every route, so it is also where reduced motion is configured.
 *
 * `reducedMotion="user"` makes every `motion` component on the site drop
 * transform and layout animation when the OS asks for it, instead of each
 * component having to remember. The CSS override in globals.css cannot reach
 * these: Framer Motion animates via inline style and requestAnimationFrame,
 * which no media query can shorten.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </MotionConfig>
  );
}
