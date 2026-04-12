"use client";

import { useEffect, useRef, ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  duration?: number;
}

export function ScrollReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
  duration = 1,
}: ScrollRevealProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Initial state based on direction
    const initialState: any = {
      opacity: 0,
    };

    switch (direction) {
      case "up":
        initialState.y = 60;
        break;
      case "down":
        initialState.y = -60;
        break;
      case "left":
        initialState.x = 60;
        break;
      case "right":
        initialState.x = -60;
        break;
      case "none":
        // Only opacity animation
        break;
    }

    gsap.set(element, initialState);

    const animation = gsap.to(element, {
      scrollTrigger: {
        trigger: element,
        start: "top 85%",
        end: "top 20%",
        toggleActions: "play none none reverse",
      },
      opacity: 1,
      x: 0,
      y: 0,
      duration,
      delay,
      ease: "power3.out",
    });

    return () => {
      animation.kill();
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === element) {
          trigger.kill();
        }
      });
    };
  }, [delay, direction, duration]);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
}
