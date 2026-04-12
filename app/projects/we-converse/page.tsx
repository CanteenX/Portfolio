"use client";

import Link from "next/link";
import { ArrowLeft, Globe, Mic, FileText, BrainCircuit, Languages, Smartphone } from "lucide-react";
import InteractiveSelector from "@/components/ui/interactive-selector";

const highlights = [
  { label: "100+ Languages", icon: Globe },
  { label: "Real-time Translation", icon: Languages },
  { label: "Auto Minutes", icon: FileText },
  { label: "Voice Recognition", icon: Mic },
  { label: "AI Summaries", icon: BrainCircuit },
  { label: "Cross-platform", icon: Smartphone },
];

const screens = [
  { id: 1, label: "Home Screen", caption: "Dashboard with upcoming & past meetings" },
  { id: 2, label: "Live Call", caption: "Real-time translated subtitles during a call" },
  { id: 3, label: "Minutes", caption: "Auto-generated meeting minutes with action items" },
];

export default function WeConversePage() {
  return (
    <main className="min-h-screen w-full bg-black text-white overflow-x-hidden">
      {/* Nav */}
      <nav className="fixed top-0 inset-x-0 z-50 border-b border-white/5 bg-black/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Home
          </Link>
          <span className="text-sm font-semibold tracking-tight text-white">
            We Converse
          </span>
        </div>
      </nav>

      {/* ============ HERO ============ */}
      <section className="relative pt-32 pb-20 md:pt-44 md:pb-32 px-6">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full border border-white/10 bg-white/5 text-xs font-medium text-zinc-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Meeting App
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.05] mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-500">
              We Converse
            </span>
          </h1>

          <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed mb-12">
            Go live with real-time translation in any language. Every meeting is automatically transcribed, summarized, and turned into actionable minutes — so nothing gets lost.
          </p>

          {/* Highlights row */}
          <div className="flex flex-wrap justify-center gap-3">
            {highlights.map(({ label, icon: Icon }) => (
              <div
                key={label}
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/8 bg-white/3 text-sm text-zinc-300"
              >
                <Icon size={15} className="text-zinc-500" />
                {label}
              </div>
            ))}
          </div>
        </div>

        {/* Radial glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-blue-500/8 via-transparent to-transparent rounded-full blur-3xl pointer-events-none" />
      </section>

      {/* ============ PHONE MOCKUPS ============ */}
      <section className="py-20 md:py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
              App Screens
            </h2>
            <p className="text-zinc-400 text-base md:text-lg max-w-xl mx-auto">
              Drop your screenshots into these phone frames to preview the experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 justify-items-center">
            {screens.map((screen) => (
              <div key={screen.id} className="flex flex-col items-center gap-5 w-full max-w-[280px]">
                {/* iPhone Frame */}
                <div className="relative w-[260px] h-[540px] rounded-[3rem] bg-zinc-900 border-[6px] border-zinc-800 shadow-[0_40px_80px_-15px_rgba(0,0,0,0.9),inset_0_0_0_2px_rgba(255,255,255,0.05)] overflow-hidden">
                  {/* Dynamic Island */}
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[90px] h-[26px] bg-black rounded-full z-20" />

                  {/* Screen — placeholder for screenshot */}
                  <div className="absolute inset-[6px] rounded-[2.3rem] bg-zinc-950 overflow-hidden flex flex-col items-center justify-center">
                    {/* Placeholder content */}
                    <div className="flex flex-col items-center gap-3 text-center px-6">
                      <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                        <Smartphone size={22} className="text-zinc-600" />
                      </div>
                      <span className="text-xs text-zinc-600 font-medium">
                        Place screenshot here
                      </span>
                      <span className="text-[10px] text-zinc-700">
                        Replace this div with an {"<img>"} tag
                      </span>
                    </div>
                  </div>

                  {/* Home indicator */}
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[100px] h-[4px] bg-white/15 rounded-full z-20" />
                </div>

                {/* Caption */}
                <div className="text-center">
                  <p className="text-sm font-semibold text-white">{screen.label}</p>
                  <p className="text-xs text-zinc-500 mt-1">{screen.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FEATURES — INTERACTIVE SELECTOR ============ */}
      <section className="py-20 md:py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
              Core Features
            </h2>
            <p className="text-zinc-400 text-base md:text-lg max-w-xl mx-auto">
              Everything you need for seamless multilingual meetings, powered by AI.
            </p>
          </div>

          <InteractiveSelector />
        </div>
      </section>

      {/* ============ HOW IT WORKS ============ */}
      <section className="py-20 md:py-32 px-6 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
              How It Works
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                step: "01",
                title: "Start a Meeting",
                desc: "Create or join a meeting with a single tap. Invite participants via link — no downloads required for guests.",
              },
              {
                step: "02",
                title: "Speak Freely",
                desc: "Speak in your language. Every participant hears and reads the conversation in their preferred language, live.",
              },
              {
                step: "03",
                title: "Get Minutes Instantly",
                desc: "When the call ends, AI generates structured minutes with summaries, action items, and key decisions.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="relative p-8 rounded-2xl border border-white/5 bg-zinc-950 group hover:border-white/10 transition-colors"
              >
                <span className="text-5xl font-black text-white/5 absolute top-6 right-8">
                  {item.step}
                </span>
                <h3 className="text-lg font-bold text-white mb-3 mt-4">
                  {item.title}
                </h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ TECH STACK ============ */}
      <section className="py-20 md:py-32 px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
              Built With
            </h2>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {[
              "React Native", "TypeScript", "WebRTC", "Whisper AI",
              "GPT-4", "Node.js", "WebSocket", "PostgreSQL",
              "Redis", "AWS", "Docker", "Kubernetes",
            ].map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 text-sm font-medium text-zinc-300 rounded-full border border-white/8 bg-white/3 hover:bg-white/6 transition-colors cursor-default"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs text-zinc-600">
          <span>We Converse - A TechCo Project</span>
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
        </div>
      </footer>
    </main>
  );
}
