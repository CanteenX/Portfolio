"use client";

import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import Link from "next/link";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { ContactCTA } from "@/components/ui/contact-cta";
const PLAYBOOK: any[] = [];
const TEAM: any[] = [];

import { useCmsContent } from "@/lib/hooks/use-cms-content";

export default function TeamPage() {
  const { getSection } = useCmsContent("team");
  const headerData = getSection("header");
  const membersData = getSection("members");
  
  const displayTeam = membersData?.list || TEAM;

  return (
    <main className="min-h-screen bg-black text-white selection:bg-mint/30">
      <Navbar />
      
      <div className="pt-28 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal direction="up">
            <div className="text-mono-tag text-mint mb-4">{headerData?.label || "/team — The Collective"}</div>
            <h1 
              className="mb-12 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400"
              dangerouslySetInnerHTML={{ __html: headerData?.title || "The architects of the future." }}
            />
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5 border hairline mb-20 overflow-hidden rounded-3xl">
            {displayTeam.map((p: any, index: number) => (
              <ScrollReveal key={p.slug} delay={index * 0.1} direction="up">
                <Link
                  href={`/team/${p.slug}`}
                  className="bg-zinc-900/50 backdrop-blur-sm border-r border-b border-white/5 group block hover:bg-zinc-800/80 transition-all duration-500 h-full"
                >
                  <div className="aspect-[4/5] overflow-hidden bg-zinc-950 relative">
                    <img
                      src={p.avatar}
                      alt={p.name}
                      loading="lazy"
                      className="w-full h-full object-cover grayscale contrast-110 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <div className="absolute top-4 left-4 text-mono-tag text-gray-500">{p.id}</div>
                  </div>
                  <div className="p-8">
                    <div className="text-mono-tag text-mint mb-3">{p.role}</div>
                    <h3 className="text-2xl font-bold mb-3 group-hover:text-mint transition-colors">{p.name}</h3>
                    <p className="text-sm text-gray-400 leading-relaxed mb-6 line-clamp-2">{p.power}</p>
                    <div className="text-mono-tag text-mint flex items-center gap-2">
                       Open Dossier <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>

          <div>
            <ScrollReveal direction="up">
              <div className="text-mono-tag text-mint mb-4">Our_Playbook //</div>
              <h2 className="mb-10">How we work.</h2>
            </ScrollReveal>
            
            <div className="grid md:grid-cols-4 gap-px bg-white/5 border hairline rounded-3xl overflow-hidden">
              {PLAYBOOK.map((p, index) => (
                <ScrollReveal key={p.phase} delay={index * 0.1} direction="up">
                  <div className="bg-zinc-900/50 backdrop-blur-sm p-8 h-full border-r border-white/5">
                    <div className="font-mono text-4xl text-mint/50 mb-4 tabular-nums">{p.phase}</div>
                    <h3 className="text-xl font-bold mb-3">{p.name}</h3>
                    <p className="text-sm text-gray-400 leading-relaxed">{p.body}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <ContactCTA />
      
      <Footer />
    </main>
  );
}
