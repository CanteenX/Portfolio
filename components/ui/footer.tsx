"use client";

import Link from "next/link";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export function Footer() {
  return (
    <footer className="border-t hairline mt-16 bg-black">
      <ScrollReveal direction="up">
        <div className="max-w-7xl mx-auto px-6 py-12 grid gap-10 md:grid-cols-4 text-left">
          <div className="md:col-span-2">
            <div className="font-mono text-sm font-medium flex items-center gap-2 text-white mb-4">
              <span className="size-2.5 bg-mint inline-block" />
              FORGE_COLLECTIVE
            </div>
            <p className="text-zinc-500 text-sm max-w-sm leading-relaxed font-light">
              An elite collective engineering high-performance web and mobile products for global brands.
            </p>
          </div>
          <div>
            <div className="text-mono-tag text-zinc-500 mb-6">/sitemap</div>
            <ul className="space-y-4 text-mono-tag">
              <li><Link href="/work" className="text-zinc-400 hover:text-mint transition-colors">Work</Link></li>
              <li><Link href="/#services" className="text-zinc-400 hover:text-mint transition-colors">Services</Link></li>
              <li><Link href="/team" className="text-zinc-400 hover:text-mint transition-colors">Team</Link></li>
              <li><Link href="/projects" className="text-zinc-400 hover:text-mint transition-colors">Projects</Link></li>
              <li><Link href="/contact" className="text-zinc-400 hover:text-mint transition-colors">Contact</Link></li>
            </ul>
          </div>
          <div>
            <div className="text-mono-tag text-zinc-500 mb-6">/contact</div>
            <a href="mailto:hello@forge.dev" className="text-mono-tag text-zinc-400 hover:text-mint block mb-4 transition-colors">hello@forge.dev</a>
            <div className="font-mono text-[10px] text-zinc-500 uppercase tracking-[0.2em] leading-relaxed">
              v4.2 — STABLE_BUILD
            </div>
          </div>
        </div>
      </ScrollReveal>

      <div className="border-t hairline">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between gap-4 font-mono text-[10px] text-zinc-600 tracking-[0.2em] uppercase">
          <span>© {new Date().getFullYear()} Forge Collective. All rights reserved.</span>
          <span className="flex items-center gap-2">
            <span className="size-1 bg-mint animate-pulse" />
            All systems operational
          </span>
        </div>
      </div>
    </footer>
  );
}
