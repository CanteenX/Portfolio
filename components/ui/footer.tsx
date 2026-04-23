"use client";

import { ScrollReveal } from "@/components/ui/scroll-reveal";

export function Footer() {
  return (
    <footer id="contact" className="py-16 px-4 border-t border-white/10 bg-black">
      <ScrollReveal direction="none">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-500 mb-4 text-sm">
            © 2024 TechCo. Building the future with high-performance engineering.
          </p>
          <div className="flex justify-center gap-6 text-sm text-gray-500">
            <a href="/work" className="hover:text-white transition-colors">Work</a>
            <a href="#services" className="hover:text-white transition-colors">Services</a>
            <a href="/contact" className="hover:text-white transition-colors">Let's Talk</a>
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
          </div>
        </div>
      </ScrollReveal>
    </footer>
  );
}
