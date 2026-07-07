"use client";

import { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import { PROJECTS } from "@/lib/projects";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { ContactCTA } from "@/components/ui/contact-cta";
import { usePublicAPI } from "@/lib/usePublicAPI";
import { getPublicProjects, resolveImageUrl, type ApiProject } from "@/lib/api";

const FILTERS = ["All", "Native Mobile", "Web Apps", "Backend/Cloud"] as const;

export default function WorkPage() {
  const [filter, setFilter] = useState<typeof FILTERS[number]>("All");
  const { data: projects } = usePublicAPI(getPublicProjects, PROJECTS as unknown as ApiProject[]);
  const filtered = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <main className="min-h-screen bg-black text-white selection:bg-mint/30">
      <Navbar />

      {/* Hero */}
      <div className="pt-40 pb-16 px-6 border-b border-white/5 relative overflow-hidden">
        {/* Subtle background grid */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
        <div className="max-w-7xl mx-auto relative">
          <ScrollReveal direction="up">
            <div className="flex flex-col lg:flex-row lg:items-end gap-10 lg:gap-16">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-8 h-px bg-white/40" />
                  <span className="text-mono-tag text-zinc-400">/work — Selected Engagements</span>
                </div>
                <h1 className="max-w-3xl bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-500">
                  Engineering that solves business problems.
                </h1>
              </div>

              <div className="lg:max-w-sm shrink-0 lg:pb-2">
                <p className="text-zinc-400 text-base leading-relaxed mb-8">
                  A curated archive of shipped products — mobile, web, and cloud systems
                  built for scale and measured by outcomes.
                </p>
                <div className="grid grid-cols-3 gap-px bg-white/10 border border-white/10 rounded-xl overflow-hidden">
                  {[
                    { value: `${projects.length}+`, label: "Projects" },
                    { value: "3", label: "Platforms" },
                    { value: "100%", label: "Shipped" },
                  ].map((s) => (
                    <div key={s.label} className="bg-zinc-950 px-4 py-4 text-center">
                      <div className="text-2xl font-medium tracking-tight text-white">{s.value}</div>
                      <div className="text-mono-tag text-zinc-500 mt-1">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>

      <div className="pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal direction="up" delay={0.1}>
            <div className="flex flex-wrap items-center justify-between gap-4 py-8">
              <div className="flex flex-wrap gap-1 border border-white/10 p-1 w-fit bg-zinc-900/30 backdrop-blur-sm rounded-full">
                {FILTERS.map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`text-mono-tag px-6 py-2.5 transition-all duration-300 rounded-full ${
                      filter === f
                        ? "bg-white text-black font-bold"
                        : "text-zinc-500 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
              <div className="text-mono-tag text-zinc-600">
                {filtered.length} {filtered.length === 1 ? "result" : "results"}
              </div>
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
