"use client";

import { useEffect, useState } from "react";
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { ContactCTA } from "@/components/ui/contact-cta";
import { useCmsContent } from "@/lib/hooks/use-cms-content";

const PHASES: any[] = [];

const perks = [
  {
    title: "Lightning Fast Delivery",
    description: "Agile sprints with rapid iteration. We ship MVPs in weeks, not months.",
    icon: "⚡",
    gradient: "from-amber-500/10 via-transparent to-transparent",
    border: "hover:border-amber-500/30",
  },
  {
    title: "Unbreakable Commitment",
    description: "Your deadlines are our deadlines. Transparent updates, no ghosting.",
    icon: "🤝",
    gradient: "from-emerald-500/10 via-transparent to-transparent",
    border: "hover:border-emerald-500/30",
  },
  {
    title: "Built to Scale",
    description: "Architectures designed for 10x growth from day one.",
    icon: "🚀",
    gradient: "from-violet-500/10 via-transparent to-transparent",
    border: "hover:border-violet-500/30",
  },
];
export default function HowWeWork() {
  const { getSection } = useCmsContent("methodology");
  const heroData = getSection("hero");
  const protocolData = getSection("protocol");
  
  const displayPhases = protocolData?.phases || PHASES;
  
  const [activeSegment, setActiveSegment] = useState(displayPhases[0]?.id || "");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSegment(entry.target.id);
          }
        });
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );

    displayPhases.forEach((p: any) => {
      const el = document.getElementById(p.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [displayPhases]);

  return (
    <main className="min-h-screen bg-black text-white selection:bg-mint/30">
      <Navbar />
      
      <div className="pt-32 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <ScrollReveal direction="up">
            <div className="text-mono-tag text-mint mb-4">{heroData?.label || "/methodology — Protocol"}</div>
            <h1 
              className="mb-16"
              dangerouslySetInnerHTML={{ __html: heroData?.title || "Our engineering <span class='text-zinc-500'>methodology.</span>" }}
            />
          </ScrollReveal>

          <div className="grid lg:grid-cols-[280px_1fr] gap-12">
            {/* Left sticky tracker */}
            <aside className="hidden lg:block">
              <div className="sticky top-40 border-l border-white/10 space-y-1">
                {displayPhases.map((p: any) => (
                  <a
                    key={p.id}
                    href={`#${p.id}`}
                    className={`block py-3 px-6 border-l-2 -ml-px text-xs tracking-tight transition-all duration-300 ${
                      activeSegment === p.id 
                        ? "border-mint text-mint font-bold translate-x-1" 
                        : "border-transparent text-zinc-500 hover:text-zinc-300"
                    }`}
                  >
                    <span className="font-mono text-[10px] mr-3 opacity-50">{p.n}</span>
                    {p.title.toUpperCase()}
                  </a>
                ))}
              </div>
            </aside>

            {/* Right content flow */}
            <div className="space-y-32 mb-32">
              <div className="relative">
                {/* Vertical Line */}
                <div className="absolute left-6 md:left-[2.75rem] top-0 bottom-0 w-px bg-gradient-to-b from-white/20 via-white/10 to-transparent" />
                
                <div className="space-y-24">
                  {displayPhases.filter((p: any) => !p.isHeader).map((item: any, index: number) => (
                    <section 
                      key={item.id} 
                      id={item.id} 
                      className="relative pl-16 md:pl-24 scroll-mt-40"
                    >
                      {/* Active Indicator on line */}
                      <div className="absolute left-6 md:left-[2.75rem] -translate-x-1/2 z-10 transition-transform duration-500">
                        <div className={`w-4 h-4 rounded-full ${item.dot} ring-4 ring-black shadow-[0_0_15px_rgba(255,255,255,0.1)]`} />
                      </div>

                      <ScrollReveal direction={index % 2 === 0 ? "left" : "right"}>
                        <div className="relative group p-8 md:p-12 rounded-[2rem] border border-white/5 bg-zinc-950 hover:border-white/10 transition-all duration-700 overflow-hidden">
                          <div className={`absolute inset-0 bg-gradient-to-br ${item.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
                          
                          <div className="relative">
                            <span className="text-xs font-bold text-zinc-600 tracking-widest uppercase mb-4 block">Step {item.n} // Status: Operational</span>
                            <h2 className="text-3xl md:text-4xl font-bold mb-6">{item.title}</h2>
                            <p className="text-lg text-zinc-400 leading-relaxed max-w-2xl">{item.description}</p>
                          </div>
                        </div>
                      </ScrollReveal>
                    </section>
                  ))}
                </div>
              </div>

              {/* Why build with us content */}
              <section id="why-us" className="scroll-mt-40">
                <ScrollReveal direction="up">
                  <div className="text-center mb-16">
                    <h2 className="lowercase">Why Build With Us</h2>
                    <p className="text-zinc-500">Battle-tested commitment to excellence.</p>
                  </div>
                  
                  <div className="grid md:grid-cols-3 gap-5">
                    {perks.map((perk, i) => (
                      <div key={i} className="p-8 bg-zinc-900/40 border border-white/5 rounded-3xl group hover:border-mint/30 transition-all duration-500">
                        <div className="text-4xl mb-6">{perk.icon}</div>
                        <h3 className="text-xl font-bold mb-3">{perk.title}</h3>
                        <p className="text-sm text-zinc-500 leading-relaxed">{perk.description}</p>
                      </div>
                    ))}
                  </div>
                </ScrollReveal>
              </section>
            </div>
          </div>
        </div>
      </div>
      
      <ContactCTA />
      <Footer />
    </main>
  );
}
