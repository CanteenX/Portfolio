"use client";

import { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import { PROJECTS } from "@/lib/projects";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { ContactCTA } from "@/components/ui/contact-cta";
import { usePublicAPI } from "@/lib/usePublicAPI";
import { getPublicProjects, resolveImageUrl } from "@/lib/api";

const FILTERS = ["All", "Native Mobile", "Web Apps", "Backend/Cloud"] as const;

export default function WorkPage() {
  const [filter, setFilter] = useState<typeof FILTERS[number]>("All");
  const { data: projects } = usePublicAPI(getPublicProjects, PROJECTS);
  const filtered = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <main className="min-h-screen bg-black text-white selection:bg-mint/30">
      <Navbar />

      <div className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal direction="up">
            <div className="text-mono-tag text-mint mb-4">/work — Selected Engagements</div>
            <h1 className="mb-12 max-w-3xl">
              Engineering that solves <span className="text-zinc-500">business problems.</span>
            </h1>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.2}>
            <div className="flex flex-wrap gap-1 mb-10 border border-white/10 p-1 w-fit bg-zinc-900/30 backdrop-blur-sm rounded-lg">
              {FILTERS.map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`text-mono-tag px-6 py-2.5 transition-all duration-300 rounded-md ${
                    filter === f
                      ? "bg-mint text-black font-bold shadow-[0_0_15px_rgba(0,255,163,0.3)]"
                      : "text-zinc-500 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-px bg-white/5 border border-white/10 overflow-hidden rounded-3xl">
            {filtered.map((p, index) => (
              <ScrollReveal key={p.slug} delay={index * 0.1} direction="up">
                <Link
                  href={`/projects/${p.slug}`}
                  className="group relative block aspect-[16/10] overflow-hidden bg-zinc-900 border-r border-b border-white/5 last:border-r-0"
                >
                  <img
                    src={resolveImageUrl(p.image)}
                    alt={p.title}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 transition-all duration-1000 opacity-40 group-hover:opacity-80 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                  <div className="absolute inset-0 p-10 flex flex-col justify-between">
                    <div className="flex justify-between text-mono-tag items-center">
                      <span className="text-mint bg-mint/10 px-2 py-1 rounded border border-mint/20">{p.category}</span>
                      <span className="text-zinc-500">{p.year}</span>
                    </div>

                    <div className="relative">
                      <h3 className="mb-2 group-hover:text-mint transition-colors">
                        {p.title}
                      </h3>
                      <div className="font-mono text-sm text-mint opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                        {p.metric}
                      </div>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>

      <ContactCTA />
      <Footer />
    </main>
  );
}
