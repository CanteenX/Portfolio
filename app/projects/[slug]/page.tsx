"use client";

import { useParams, useRouter } from "next/navigation";
import { PROJECTS, getProject } from "@/lib/projects";
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import { SmoothScroll } from "@/components/ui/smooth-scroll";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { ArrowLeft, CheckCircle2, Code2, Cpu, Globe, Layers, Zap } from "lucide-react";
import { motion } from "framer-motion";

export default function ProjectDetailsPage() {
  const { slug } = useParams();
  const project = getProject(slug as string);

  if (!project) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
        <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
        <a href="/work" className="text-emerald-500 hover:underline">Back to Work</a>
      </div>
    );
  }

  return (
    <SmoothScroll>
      <main className="min-h-screen bg-black text-white selection:bg-emerald-500 selection:text-black">
        <Navbar />

        {/* Hero Section */}
        <section className="relative pt-32 pb-20 px-4 overflow-hidden border-b border-white/5">
          <div className="max-w-7xl mx-auto relative z-10">
            <ScrollReveal direction="up">
              <button 
                onClick={() => window.history.back()}
                className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors mb-8 group font-mono text-xs uppercase tracking-widest"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Back to Work
              </button>
              
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
                <div className="max-w-3xl">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="px-3 py-1 bg-emerald-500 text-black text-[10px] font-bold uppercase tracking-widest rounded-full">
                      {project.category}
                    </span>
                    <span className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest">
                      {project.year}
                    </span>
                  </div>
                  <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-[0.9] mb-6">
                    {project.title}
                  </h1>
                </div>
                <div className="lg:mb-4">
                  <div className="text-emerald-500 font-mono text-xl md:text-3xl font-bold tracking-tight">
                    {project.metric}
                  </div>
                  <div className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest mt-1">
                    Key Performance Metric
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.2}>
              <div className="relative aspect-[21/9] w-full rounded-3xl overflow-hidden border border-white/10">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Overview Grid */}
        <section className="py-20 px-4 bg-zinc-950/50 border-b border-white/5">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
              {[
                { label: "Client", value: project.client, icon: Globe },
                { label: "Timeframe", value: project.timeframe, icon: Layers },
                { label: "Role", value: project.role, icon: Cpu },
                { label: "Stack", value: project.stack.join(", "), icon: Code2 },
              ].map((item, idx) => (
                <ScrollReveal key={idx} delay={idx * 0.1} direction="up">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-zinc-500">
                      <item.icon className="w-4 h-4" />
                      <span className="font-mono text-[10px] uppercase tracking-widest">{item.label}</span>
                    </div>
                    <p className="text-white text-lg font-medium leading-tight">{item.value}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Narrative Section */}
        <section className="py-24 px-4">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24">
            <div className="space-y-16">
              <ScrollReveal direction="left">
                <div className="space-y-6">
                  <h2 className="text-3xl font-bold tracking-tight">The Problem</h2>
                  <p className="text-zinc-400 text-xl leading-relaxed font-light">
                    {project.problem}
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="left" delay={0.2}>
                <div className="space-y-6">
                  <h2 className="text-3xl font-bold tracking-tight">The Solution</h2>
                  <p className="text-zinc-400 text-xl leading-relaxed font-light">
                    {project.solution}
                  </p>
                </div>
              </ScrollReveal>
            </div>

            <div className="space-y-12">
              <ScrollReveal direction="right">
                <div className="p-10 rounded-3xl bg-zinc-950 border border-white/5 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Zap className="w-24 h-24 text-emerald-500" />
                  </div>
                  <h2 className="text-2xl font-bold mb-8">Key Impact & ROI</h2>
                  <ul className="space-y-6">
                    {project.roi.map((item, i) => (
                      <li key={i} className="flex items-start gap-4">
                        <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0 mt-0.5" />
                        <span className="text-zinc-300 text-lg">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>

              {project.architecture && (
                <ScrollReveal direction="right" delay={0.2}>
                  <div className="p-10 rounded-3xl border border-white/5 bg-black">
                    <h2 className="text-xl font-bold mb-6 font-mono uppercase tracking-widest text-zinc-500">Architecture</h2>
                    <div className="font-mono text-sm text-emerald-400 leading-relaxed bg-zinc-900/50 p-6 rounded-xl border border-emerald-500/10">
                      {project.architecture}
                    </div>
                  </div>
                </ScrollReveal>
              )}
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-24 px-4 bg-zinc-950/30">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal direction="up">
              <h2 className="text-4xl font-bold tracking-tight mb-16">Technical Features</h2>
            </ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5 border border-white/5 rounded-3xl overflow-hidden">
              {project.features.map((feature, i) => (
                <ScrollReveal key={i} delay={i * 0.1} direction="up">
                  <div className="p-12 bg-black hover:bg-zinc-900 transition-colors group">
                    <h3 className="text-xl font-bold mb-4 group-hover:text-emerald-500 transition-colors">{feature.title}</h3>
                    <p className="text-zinc-400 leading-relaxed">{feature.description}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Code Snippet */}
        {project.codeSnippet && (
          <section className="py-24 px-4">
            <div className="max-w-7xl mx-auto">
              <ScrollReveal direction="up">
                <div className="rounded-3xl overflow-hidden border border-white/10 bg-[#0d1117] shadow-2xl">
                  <div className="flex items-center justify-between px-6 py-4 bg-zinc-900 border-b border-white/5">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500/20" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500/20" />
                      <div className="w-3 h-3 rounded-full bg-green-500/20" />
                      <span className="ml-4 font-mono text-xs text-zinc-500 uppercase tracking-widest">
                        {project.codeSnippet.label}
                      </span>
                    </div>
                    <span className="font-mono text-[10px] text-emerald-500/50 uppercase">
                      {project.codeSnippet.language}
                    </span>
                  </div>
                  <div className="p-8 overflow-x-auto">
                    <pre className="font-mono text-sm text-zinc-300 leading-relaxed">
                      <code>{project.codeSnippet.code}</code>
                    </pre>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </section>
        )}

        {/* Gallery */}
        <section className="py-24 px-4 overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal direction="up">
              <h2 className="text-4xl font-bold tracking-tight mb-16">Visual Process</h2>
            </ScrollReveal>
            <div className="flex flex-col gap-12">
              {project.gallery.map((item, i) => (
                <ScrollReveal key={i} direction="up" delay={i * 0.1}>
                  <div className="group space-y-4">
                    <div className="relative aspect-video rounded-3xl overflow-hidden border border-white/5">
                      <img 
                        src={item.src} 
                        alt={item.caption} 
                        className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 scale-105 hover:scale-100"
                      />
                    </div>
                    <p className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest text-center">
                      — {item.caption}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-32 px-4 border-t border-white/5">
          <div className="max-w-4xl mx-auto text-center">
            <ScrollReveal direction="up">
              <h2 className="text-5xl md:text-7xl font-bold mb-12 tracking-tight">Need engineering like this?</h2>
              <a 
                href="/contact" 
                className="inline-flex items-center gap-4 px-12 py-6 bg-emerald-500 text-black rounded-full font-bold text-xl hover:scale-105 active:scale-95 transition-all shadow-[0_0_30px_rgba(16,185,129,0.3)]"
              >
                Let's Talk
                <ArrowLeft className="w-6 h-6 rotate-180" />
              </a>
            </ScrollReveal>
          </div>
        </section>

        <Footer />
      </main>
    </SmoothScroll>
  );
}
