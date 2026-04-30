"use client";

import { useEffect, useState } from "react";
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import { PROJECTS } from "@/lib/projects";
import { SmoothScroll } from "@/components/ui/smooth-scroll";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { ContactCTA } from "@/components/ui/contact-cta";
import Link from "next/link";
import { getPublicProjectsByParams, getPublicCategories, resolveImageUrl } from "@/lib/api";
import type { ApiProject } from "@/lib/api";

export default function WorkPage() {
  const [filter, setFilter] = useState("All");
  const [categories, setCategories] = useState<string[]>([]);
  const [projects, setProjects] = useState<ApiProject[]>(PROJECTS as unknown as ApiProject[]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getPublicCategories().then((cats) => {
      if (cats.length > 0) setCategories(cats);
    });
  }, []);

  useEffect(() => {
    setLoading(true);
    getPublicProjectsByParams({
      category: filter === "All" ? undefined : filter,
      limit: 100
    })
      .then((result) => {
        if (result.items.length > 0) setProjects(result.items);
      })
      .catch(() => {
        if (filter === "All") {
          setProjects(PROJECTS as unknown as ApiProject[]);
        } else {
          setProjects((PROJECTS as unknown as ApiProject[]).filter((p) => p.category === filter));
        }
      })
      .finally(() => setLoading(false));
  }, [filter]);

  const allFilters = ["All", ...categories];

  return (
    <SmoothScroll>
      <main className="min-h-screen bg-black text-white">
        <Navbar />

        <div className="pt-36 pb-20 px-6 max-w-7xl mx-auto">
          <ScrollReveal direction="up">
            <div className="font-mono text-xs uppercase tracking-widest text-emerald-500 mb-6">
              /work — Selected Engagements
            </div>
            <h1 className="text-5xl md:text-8xl font-bold tracking-tighter mb-12 max-w-4xl leading-[0.9]">
              Engineering that solves <span className="text-zinc-600 italic">business</span> problems.
            </h1>
          </ScrollReveal>

          {/* Filters */}
          <ScrollReveal direction="up" delay={0.1}>
            <div className="flex flex-wrap gap-2 mb-16 p-1.5 border border-white/5 bg-zinc-950 rounded-full w-fit">
              {allFilters.map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-6 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all ${
                    filter === f
                      ? "bg-emerald-500 text-black font-bold shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                      : "text-zinc-500 hover:text-white"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </ScrollReveal>

          {loading && (
            <div className="flex justify-center py-20">
              <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
            </div>
          )}

          {/* Projects Grid */}
          {!loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5 border border-white/5 overflow-hidden rounded-3xl">
              {projects.map((p, idx) => (
                <ScrollReveal key={p.slug} delay={idx * 0.05} direction="up">
                  <Link
                    href={`/projects/${p.slug}`}
                    className="group relative block aspect-[4/3] overflow-hidden bg-zinc-950"
                  >
                    <img
                      src={resolveImageUrl(p.image)}
                      alt={p.title}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-80 transition-all duration-700 scale-105 group-hover:scale-100"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-700" />

                    <div className="absolute inset-0 p-8 flex flex-col justify-between z-10">
                      <div className="flex justify-between items-start">
                        <span className="font-mono text-[10px] uppercase tracking-widest px-3 py-1 bg-emerald-500 text-black font-bold rounded-full">
                          {p.category}
                        </span>
                        <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">{p.year}</span>
                      </div>

                      <div>
                        <h3 className="text-3xl md:text-4xl font-bold tracking-tight mb-2 group-hover:text-emerald-400 transition-colors">
                          {p.title}
                        </h3>
                        <div className="font-mono text-xs text-emerald-500/80 font-medium tracking-widest">
                          {p.metric}
                        </div>
                      </div>
                    </div>

                    <div className="absolute bottom-0 left-0 w-full h-1 bg-emerald-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>

        <ContactCTA />
        <Footer />
      </main>
    </SmoothScroll>
  );
}
