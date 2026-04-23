"use client";

import Link from "next/link";
import { ScrollReveal } from "./scroll-reveal";
import { ArrowRight } from "lucide-react";

export function ContactCTA() {
  return (
    <section className="py-20 px-6 border-t border-white/5 bg-zinc-950/20">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal direction="up">
          <div className="bg-blueprint/10 border border-mint/30 p-10 md:p-16 rounded-[2.5rem] relative overflow-hidden group">
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-mint/5 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2" />
            
            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
              <div>
                <div className="text-mono-tag text-mint mb-4">Initialize // Connection</div>
                <h2 className="text-4xl md:text-5xl font-medium tracking-tighter mb-4 max-w-xl lowercase leading-none">
                  Have a high-stakes product to ship?
                </h2>
                <p className="text-zinc-500 max-w-lg">
                  Tell us what you're building. We'll come back within 12 hours with a clear plan and technical roadmap.
                </p>
              </div>
              
              <Link 
                href="/contact" 
                className="group/btn relative px-8 py-4 bg-mint text-black font-bold flex items-center gap-2 hover:brightness-110 transition-all overflow-hidden"
              >
                <span>Start a Conversation</span>
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
