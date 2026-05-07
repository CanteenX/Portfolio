"use client";

import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import { TEAM } from "@/lib/team";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { ContactCTA } from "@/components/ui/contact-cta";
import { usePublicAPI, usePublicSettings } from "@/lib/usePublicAPI";
import { getPublicTeam, getPublicSettings, resolveImageUrl } from "@/lib/api";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { ArrowUpRight } from "lucide-react";

const FALLBACK_PLAYBOOK = [
  { phase: "01", name: "Discovery", body: "1-week deep dive: scope, success metrics, architecture sketch." },
  { phase: "02", name: "Weekly Sprints", body: "Demoed builds every Friday. Direct Slack channel. Async-first." },
  { phase: "03", name: "QA & Hardening", body: "Automated tests, load testing, security review, observability." },
  { phase: "04", name: "Launch & Handover", body: "Production deploy, runbooks, knowledge transfer, on-call support." },
];

export default function TeamPage() {
  const { data: team } = usePublicAPI(getPublicTeam, TEAM);
  const { settings } = usePublicSettings(getPublicSettings);
  const playbook = settings?.teamPlaybook?.length ? settings.teamPlaybook : FALLBACK_PLAYBOOK;

  return (
    <main className="min-h-screen bg-black text-white selection:bg-mint/30">
      <Navbar />

      <div className="pt-28 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <ScrollReveal direction="up">
            <div className="text-center mb-16">
              <div className="text-mono-tag text-mint mb-4">/team — The Collective</div>
              <h1 className="mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                Meet our team.
              </h1>
              <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                The engineers, designers and strategists behind every line of code and pixel-perfect interface.
              </p>
            </div>
          </ScrollReveal>

          {/* Team Grid — photo cards with glass overlay */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
            {team.map((p, index) => (
              <ScrollReveal key={p.slug} delay={index * 0.08} direction="up">
                <div className="team-card group relative rounded-3xl overflow-hidden aspect-[3/3.5] cursor-default">
                  {/* Full photo background */}
                  <img
                    src={resolveImageUrl(p.avatar)}
                    alt={p.name}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Gradient scrim from bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />

                  {/* Glassmorphism info overlay at bottom */}
                  <div className="absolute bottom-4 left-4 right-4 rounded-2xl p-5 transition-all duration-500 group-hover:bottom-5"
                    style={{
                      background: "rgba(30, 30, 30, 0.45)",
                      backdropFilter: "blur(20px) saturate(1.4)",
                      WebkitBackdropFilter: "blur(20px) saturate(1.4)",
                      border: "1px solid rgba(255, 255, 255, 0.12)",
                      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
                    }}
                  >
                    {/* Top row: name + arrow */}
                    <div className="flex items-start justify-between mb-1">
                      <div>
                        <h3 className="text-lg font-bold text-white leading-tight">{p.name}</h3>
                        <div className="text-xs font-medium text-gray-300/80 mt-0.5">{p.role}</div>
                      </div>
                      <div
                        className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center mt-0.5 transition-colors duration-300 group-hover:bg-white/20"
                        style={{
                          background: "rgba(255, 255, 255, 0.1)",
                          border: "1px solid rgba(255, 255, 255, 0.15)",
                        }}
                      >
                        <ArrowUpRight className="w-3.5 h-3.5 text-white/80" />
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-[13px] text-gray-300/70 leading-relaxed mt-2 mb-4 line-clamp-2">
                      {p.power}
                    </p>

                    {/* Social icons row */}
                    <div className="flex items-center gap-3">
                      {p.socials?.linkedin && (
                        <a
                          href={p.socials.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${p.name} LinkedIn`}
                          className="w-9 h-9 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300"
                          style={{
                            background: "rgba(255, 255, 255, 0.15)",
                            border: "1px solid rgba(255, 255, 255, 0.2)",
                          }}
                        >
                          <FaLinkedin className="w-4 h-4" />
                        </a>
                      )}
                      {p.socials?.github && (
                        <a
                          href={p.socials.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${p.name} GitHub`}
                          className="w-9 h-9 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300"
                          style={{
                            background: "rgba(255, 255, 255, 0.15)",
                            border: "1px solid rgba(255, 255, 255, 0.2)",
                          }}
                        >
                          <FaGithub className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Playbook Section */}
          <div>
            <ScrollReveal direction="up">
              <div className="text-mono-tag text-mint mb-4">Our_Playbook //</div>
              <h2 className="mb-10">How we work.</h2>
            </ScrollReveal>

            <div className="grid md:grid-cols-4 gap-px bg-white/5 border hairline rounded-3xl overflow-hidden">
              {playbook.map((p, index) => (
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
