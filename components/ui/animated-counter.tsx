"use client";
import { useEffect, useRef, useState } from "react";

interface AnimatedCounterProps {
  value: string;
  label: string;
}

export function AnimatedCounter({ value, label }: AnimatedCounterProps) {
  const [displayed, setDisplayed] = useState("0");
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const num = parseFloat(value.replace(/[^0-9.]/g, ""));
          const suffix = value.replace(/[0-9.]/g, "");
          if (isNaN(num)) { setDisplayed(value); return; }
          let start = 0;
          const duration = 1800;
          const step = 16;
          const increment = num / (duration / step);
          const timer = setInterval(() => {
            start += increment;
            if (start >= num) { setDisplayed(`${num}${suffix}`); clearInterval(timer); }
            else { setDisplayed(`${Math.floor(start)}${suffix}`); }
          }, step);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-5xl md:text-6xl font-light text-mint tracking-tighter mb-2">{displayed}</div>
      <div className="text-xs font-mono uppercase tracking-widest text-zinc-500">{label}</div>
    </div>
  );
}
