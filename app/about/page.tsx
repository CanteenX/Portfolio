"use client";

import { Navbar } from "@/components/ui/navbar";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { SmoothScroll } from "@/components/ui/smooth-scroll";
import { Eye, Target, Zap, Shield, Users, Globe, ArrowRight } from "lucide-react";
import { GlobePulse } from "@/components/ui/cobe-globe-pulse";
import { ContactCTA } from "@/components/ui/contact-cta";
import { Footer } from "@/components/ui/footer";

import { useCmsContent } from "@/lib/hooks/use-cms-content";

const DEFAULT_VALUES: any[] = [];

const ICON_MAP: Record<string, any> = {
  Innovation: Zap,
  Integrity: Shield,
  Collaboration: Users,
  Impact: Globe,
  Excellence: Target,
  Agility: ArrowRight,
};

export default function AboutPage() {
  const { getSection } = useCmsContent("about");

  const heroData = getSection("hero");
  const visionMission = getSection("vision-mission");
  const valuesData = getSection("values");
  const reachData = getSection("reach");

  return (
    <SmoothScroll>
      <main className="min-h-screen w-full bg-black text-white selection:bg-mint/30">
        <Navbar />

        {/* Hero Section */}
        <section className="relative pt-36 pb-20 px-6 overflow-hidden">
          <div className="max-w-7xl mx-auto relative z-10">
            <ScrollReveal direction="up" duration={1}>
              <div className="mb-20">
                <div className="text-mono-tag text-mint mb-4">{heroData?.label || "/story — Founders"}</div>
                <h1 
                  className="mb-8 leading-[0.85] lowercase"
                  dangerouslySetInnerHTML={{ __html: heroData?.title || "Engineering the <span class='text-zinc-600 italic'>next</span> digital frontier." }}
                />
                <p className="text-xl text-zinc-400 max-w-3xl font-light leading-relaxed">
                  {heroData?.description || "We are an elite collective of visionaries, engineers, and designers dedicated to pushing the boundaries of what's possible in the digital realm."}
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.2}>
              <div className="w-full aspect-[21/9] bg-zinc-900 border border-white/10 rounded-[3rem] flex items-center justify-center group overflow-hidden relative shadow-2xl">
                <img 
                  src={heroData?.imageUrl || "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=2000&q=80"} 
                  alt="Our Team" 
                  className="absolute inset-0 w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-80 transition-all duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                <div className="absolute bottom-10 left-10 p-2 border border-white/20 rounded-full backdrop-blur-md">
                   <div className="size-3 bg-mint rounded-full animate-pulse" />
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Vision & Mission */}
        <section className="py-24 px-6 border-t border-white/5">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5 border border-white/10 rounded-[3rem] overflow-hidden">
            <ScrollReveal direction="left">
              <div className="p-16 bg-zinc-950 flex flex-col h-full group hover:bg-zinc-900 transition-colors">
                <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center mb-10 group-hover:scale-110 transition-transform">
                  <Eye className="text-black w-7 h-7" />
                </div>
                <h2 className="text-4xl font-bold mb-6 tracking-tight">
                  {visionMission?.vision?.title || "Our Vision"}
                </h2>
                <p className="text-zinc-400 text-lg leading-relaxed flex-grow">
                  {visionMission?.vision?.description || "To be the catalyst for the next generation of digital experiences, where AI and human creativity merge to solve the world's most complex challenges."}
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={0.1}>
              <div className="p-16 bg-zinc-950 flex flex-col h-full border-l border-white/5 group hover:bg-zinc-900 transition-colors">
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-10 group-hover:scale-110 transition-transform">
                  <Target className="text-mint w-7 h-7" />
                </div>
                <h2 className="text-4xl font-bold mb-6 tracking-tight text-mint">
                  {visionMission?.mission?.title || "Our Mission"}
                </h2>
                <p className="text-zinc-400 text-lg leading-relaxed flex-grow">
                  {visionMission?.mission?.description || "Empowering businesses with cutting-edge full-stack solutions and intelligent AI systems. We transform ideas into robust, scalable, and beautiful realities."}
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal direction="up">
              <div className="mb-16">
                <div className="text-mono-tag text-mint mb-3">{valuesData?.label || "Protocol // Core Values"}</div>
                <h2 className="tracking-tight lowercase">{valuesData?.title || "Principles that drive us."}</h2>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {(valuesData?.items || DEFAULT_VALUES).map((value: any, idx: number) => {
                const Icon = ICON_MAP[value.title] || Zap;
                return (
                  <ScrollReveal key={idx} delay={idx * 0.05} direction="up">
                    <div className="p-10 rounded-3xl border border-white/5 bg-zinc-900/30 hover:border-mint/30 transition-all duration-500 group">
                      <div className="p-3 rounded-xl bg-white/5 border border-white/10 w-fit mb-8 group-hover:scale-110 transition-transform">
                        <Icon className="w-6 h-6 text-mint" />
                      </div>
                      <h3 className="text-xl font-bold mb-4">{value.title}</h3>
                      <p className="text-zinc-500 leading-relaxed text-sm">{value.desc}</p>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* Global Impact with Globe */}
        <section className="py-24 px-6 bg-zinc-950/30 border-y border-white/5 overflow-hidden">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal direction="left">
              <div className="text-left">
                <div className="text-mono-tag text-mint mb-4">{reachData?.label || "/reach — Statistics"}</div>
                <h2 className="mb-8 tracking-tight">{reachData?.title || "Our global impact."}</h2>
                <p className="text-zinc-400 text-lg mb-12 max-w-xl leading-relaxed font-light">
                  {reachData?.description || "We've built solutions for visionary companies across 4 continents. Our code powers businesses from Silicon Valley to Singapore."}
                </p>
                
                <div className="grid grid-cols-2 gap-10">
                  {(reachData?.stats || [{ label: "Projects Delivered", value: "50+" }, { label: "Success Rate", value: "98%" }]).map((stat: any, idx: number) => (
                    <div key={idx} className="space-y-1">
                      <h4 className="text-4xl font-bold text-white tabular-nums">{stat.value}</h4>
                      <p className="text-mint font-mono text-[10px] uppercase tracking-[0.25em]">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={0.2}>
              <div className="relative aspect-square max-w-lg mx-auto rounded-full border border-white/5 p-4 overflow-hidden group shadow-2xl">
                <div className="absolute inset-0 bg-mint/5 blur-[100px]" />
                <GlobePulse className="w-full h-full" speed={reachData?.globeSpeed || 0.002} />
              </div>
            </ScrollReveal>
          </div>
        </section>

        <ContactCTA />
        <Footer />
      </main>
    </SmoothScroll>
  );
}
