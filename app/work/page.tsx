"use client";

import { useState } from "react";
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import { PROJECTS } from "@/lib/projects";
import { SmoothScroll } from "@/components/ui/smooth-scroll";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { ContactCTA } from "@/components/ui/contact-cta";
import Link from "next/link";

import { useCmsContent } from "@/lib/hooks/use-cms-content";
import { useProjects } from "@/lib/hooks/use-projects";

const FILTERS = ["All", "Native Mobile", "Web Apps", "Backend/Cloud"] as const;

export default function WorkPage() {
  const { getSection } = useCmsContent("work");
  const { projects, isLoading: projectsLoading } = useProjects();
  
  const headerData = getSection("header");
  const [filter, setFilter] = useState<typeof FILTERS[number]>("All");
  
  const filtered = filter === "All" ? projects : projects.filter((p: any) => p.category === filter);

  return (
    <SmoothScroll>
      <main className="min-h-screen bg-black text-white">
        <Navbar />
        
        <div className="pt-36 pb-20 px-6 max-w-7xl mx-auto">
          <ScrollReveal direction="up">
            <div className="font-mono text-xs uppercase tracking-widest text-emerald-500 mb-6">
              {headerData?.label || "/work — Selected Engagements"}
            </div>
            <h1 
              className="text-5xl md:text-8xl font-bold tracking-tighter mb-12 max-w-4xl leading-[0.9]"
              dangerouslySetInnerHTML={{ __html: headerData?.title || "Engineering that solves <span class='text-zinc-600 italic'>business</span> problems." }}
            />
          </ScrollReveal>

          {/* Filters */}
          <ScrollReveal direction="up" delay={0.1}>
            <div className="flex flex-wrap gap-2 mb-16 p-1.5 border border-white/5 bg-zinc-950 rounded-full w-fit">
              {FILTERS.map((f) => (
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

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5 border border-white/5 overflow-hidden rounded-3xl">
            {filtered.map((p: any, idx: number) => (
              <ScrollReveal key={p.slug} delay={idx * 0.05} direction="up">
                <Link
                  href={`/projects/${p.slug}`}
                  className="group relative block aspect-[4/3] overflow-hidden bg-zinc-950"
                >
                  {/* Image with grayscale to color on hover */}
                  <img 
                    src={p.image} 
                    alt={p.title} 
                    loading="lazy" 
                    className="absolute inset-0 w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-80 transition-all duration-700 scale-105 group-hover:scale-100" 
                  />
                  
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-700" />
                  
                  {/* Content */}
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

                  {/* Hover Accent */}
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-emerald-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
        
        <ContactCTA />
        <Footer />
      </main>
    </SmoothScroll>
  );
}
