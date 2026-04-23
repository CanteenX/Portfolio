"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  ArrowLeft, 
  Globe, 
  Mic, 
  FileText, 
  BrainCircuit, 
  Languages, 
  Smartphone,
  CheckCircle2,
  Zap,
  Shield,
  MessageSquare,
  Sparkles,
  TrendingUp,
  Clock,
  Star,
  Building2
} from "lucide-react";
import { 
  SiReact, SiTypescript, SiWebrtc, SiOpenai, SiNodedotjs, 
  SiPostgresql, SiRedis, SiDocker, SiKubernetes 
} from "react-icons/si";
import { FaAws } from "react-icons/fa";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { Navbar } from "@/components/ui/navbar";
import { ContactCTA } from "@/components/ui/contact-cta";
import { Footer } from "@/components/ui/footer";

const highlights = [
  { label: "100+ Languages", icon: Globe },
  { label: "Real-time Translation", icon: Languages },
  { label: "Auto Minutes", icon: FileText },
  { label: "Voice Recognition", icon: Mic },
  { label: "AI Summaries", icon: BrainCircuit },
  { label: "Cross-platform", icon: Smartphone },
];

const screens = [
  { 
    id: 1, 
    label: "Home Screen", 
    caption: "Dashboard for seamless meeting management",
    description: "Access all your upcoming and past meetings in one place. Intelligent sorting and quick-join features ensure you're never late.",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1600&q=80",
    color: "from-blue-500/20 to-transparent"
  },
  { 
    id: 2, 
    label: "Live Translation", 
    caption: "Speak freely, understand globally",
    description: "Experience zero-latency translation streams. Real-time subtitles and audio dubbing in 100+ languages directly during the call.",
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=1600&q=80",
    color: "from-emerald-500/20 to-transparent"
  },
  { 
    id: 3, 
    label: "Smart Minutes", 
    caption: "AI-generated summaries and action items",
    description: "Never miss a detail again. Our AI listens, transcribes, and extracts key action items and decisions automatically after each call.",
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=1600&q=80",
    color: "from-purple-500/20 to-transparent"
  },
];

const techStack = [
  { name: "React Native", icon: SiReact, color: "#61DAFB", desc: "Cross-platform mobile core" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6", desc: "Type-safe engineering" },
  { name: "WebRTC", icon: SiWebrtc, color: "#333333", desc: "Low-latency audio/video" },
  { name: "Whisper", icon: SiOpenai, color: "#412991", desc: "State-of-the-art STT" },
  { name: "GPT-4", icon: SiOpenai, color: "#10a37f", desc: "Real-time translation" },
  { name: "Node.js", icon: SiNodedotjs, color: "#339933", desc: "Scalable backend" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1", desc: "Data persistence" },
  { name: "Redis", icon: SiRedis, color: "#FF4438", desc: "High-speed sync" },
  { name: "AWS", icon: FaAws, color: "#FF9900", desc: "Cloud infrastructure" },
  { name: "Docker", icon: SiDocker, color: "#2496ED", desc: "Containerization" },
];

const roiPoints = [
  { 
    title: "15 min", 
    label: "Saved per meeting", 
    desc: "AI-driven automatic minutes and summaries eliminate manual follow-up work.",
    icon: Clock 
  },
  { 
    title: "<200ms", 
    label: "Translation Latency", 
    desc: "Near-instant speech-to-speech translation for natural global dialogue.",
    icon: TrendingUp 
  },
  { 
    title: "4.8/5", 
    label: "User Rating", 
    desc: "Voted #1 translation app for corporate teams across iOS and Android.",
    icon: Star 
  },
  { 
    title: "15+", 
    label: "Enterprise Clients", 
    desc: "Actively deployed within Fortune 500 internal communication channels.",
    icon: Building2 
  },
];

export default function WeConversePage() {
  const [activeScreen, setActiveScreen] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveScreen((prev) => (prev + 1) % screens.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <main className="min-h-screen w-full bg-black text-white selection:bg-white/20">
      <Navbar />

      {/* ============ HERO SECTION ============ */}
      <section className="pt-28 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal direction="up">
            <Link 
              href="/" 
              className="text-mono-tag text-zinc-500 hover:text-white transition-colors inline-block mb-8"
            >
              ← /projects
            </Link>
            <div className="text-mono-tag text-emerald-400 mb-4 font-semibold">
              /we-converse — Native Mobile
            </div>
            <h1 className="mb-10 max-w-5xl leading-[0.85]">
              We Converse
            </h1>

            <div className="grid md:grid-cols-4 gap-px bg-white/5 border border-white/10 mb-16 overflow-hidden rounded-2xl">
              {[
                { label: "Client", value: "We Converse (Internal)" },
                { label: "Timeframe", value: "16 weeks · 2024" },
                { label: "Role", value: "Lead Architecture" },
                { label: "Outcome", value: "Native performance translation" },
              ].map((m) => (
                <div key={m.label} className="bg-zinc-950 p-6">
                  <div className="text-mono-tag text-zinc-500 mb-2">{m.label}</div>
                  <div className="text-sm font-medium">{m.value}</div>
                </div>
              ))}
            </div>
          </ScrollReveal>
          
          <ScrollReveal direction="up" delay={0.2}>
            <div className="aspect-[21/9] w-full overflow-hidden rounded-[2rem] border border-white/10 relative group">
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=2000&q=80" 
                alt="We Converse Hero" 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500" />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ============ TECH STACK DESIGN (Moved here: exactly below header image) ============ */}
      <section className="py-20 px-6 bg-zinc-950/50 border-y border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-500/5 blur-[120px] rounded-full pointer-none" />
        
        <div className="max-w-7xl mx-auto">
          <ScrollReveal direction="up">
            <div className="text-center mb-16">
              <div className="text-mono-tag text-emerald-400 mb-4 font-bold">/the_stack</div>
              <h2 className="mb-6">Engineered for accuracy.</h2>
              <p className="text-zinc-500 max-w-2xl mx-auto">
                A robust pipeline of proprietary models and open-source infrastructure ensuring 
                99.9% uptime and conversational precision across all platforms.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {techStack.map((tech, i) => (
              <ScrollReveal key={tech.name} delay={i * 0.05} direction="up">
                <div className="group p-6 bg-zinc-900/30 border border-white/5 rounded-3xl hover:border-emerald-500/30 transition-all duration-500 h-full flex flex-col items-center text-center">
                  <div className="w-14 h-14 rounded-2xl bg-zinc-950 border border-white/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500">
                    <tech.icon size={28} style={{ color: tech.color }} />
                  </div>
                  <div className="font-bold text-base mb-1">{tech.name}</div>
                  <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 leading-tight">
                    {tech.desc}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ ROI SECTION (New) ============ */}
      <section className="py-20 px-6 border-b border-white/5 bg-black">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal direction="up">
            <div className="text-center mb-16">
              <div className="text-mono-tag text-emerald-400 mb-4 font-bold">/the_roi</div>
              <h2 className="mb-6">Tangible impact.</h2>
              <p className="text-zinc-500 max-w-2xl mx-auto">
                We don't just ship code; we ship results. Here is how We Converse transformed 
                the collaborative workflow for our global partners.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {roiPoints.map((point, i) => (
              <ScrollReveal key={point.label} delay={i * 0.1} direction="up">
                <div className="p-8 bg-zinc-900/40 border border-white/5 rounded-3xl h-full flex flex-col items-center text-center">
                  <div className="p-3 rounded-xl bg-emerald-500/10 mb-6">
                    <point.icon className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div className="text-4xl font-bold mb-2 tabular-nums">{point.title}</div>
                  <div className="text-mono-tag text-emerald-400 mb-4">{point.label}</div>
                  <p className="text-sm text-zinc-500 leading-relaxed">
                    {point.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ PROBLEM & SOLUTION (Sticky Narrative) ============ */}
      <section className="py-24 px-6 border-b border-white/5">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16">
          <div className="lg:sticky lg:top-32 self-start space-y-12">
            <ScrollReveal direction="left">
              <div>
                <div className="text-mono-tag text-emerald-400 mb-4 font-bold">/the_problem</div>
                <h2 className="mb-6 lowercase">Language barriers in real-time.</h2>
                <p className="text-zinc-400 max-w-xl">
                  Global teams struggle with synchronous communication when language barriers exist. 
                  Traditional translation tools are cumbersome, causing conversational friction and 
                  making it nearly impossible to maintain a natural flow during meetings.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="left" delay={0.2}>
              <div>
                <div className="text-mono-tag text-emerald-400 mb-4 font-bold">/the_solution</div>
                <h2 className="mb-6 lowercase">Frictionless understanding.</h2>
                <p className="text-zinc-400 max-w-xl">
                  We engineered a native experience that leverages low-latency WebRTC streams and 
                  cutting-edge AI models. By integrating Whisper for transcription and GPT-4 for 
                  context-aware translation, we achieved sub-200ms processing times, enabling 
                  truly seamless global dialogue.
                </p>
              </div>
            </ScrollReveal>
          </div>

          <div className="space-y-4">
             <ScrollReveal direction="right">
                <div className="group relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-950">
                  <img 
                    src="https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=1200&q=80" 
                    alt="Process" 
                    className="w-full h-full object-cover grayscale opacity-50 transition-all duration-700 group-hover:grayscale-0 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                  <div className="absolute bottom-10 left-10">
                    <div className="text-mono-tag text-zinc-500 mb-2">01 — Process</div>
                    <h3 className="font-bold">Real-time processing chain</h3>
                  </div>
                </div>
             </ScrollReveal>
             <ScrollReveal direction="right" delay={0.2}>
                <div className="group relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-950">
                  <img 
                    src="https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=1200&q=80" 
                    alt="Workflow" 
                    className="w-full h-full object-cover grayscale opacity-50 transition-all duration-700 group-hover:grayscale-0 group-hover:opacity-100"
                  />
                   <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                  <div className="absolute bottom-10 left-10">
                    <div className="text-mono-tag text-zinc-500 mb-2">02 — Workflow</div>
                    <h3 className="font-bold">Automated post-meeting analysis</h3>
                  </div>
                </div>
             </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ============ REDESIGNED APP SCREENS ============ */}
      <section className="py-24 px-6 border-b border-white/5">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal direction="up">
            <div className="text-center mb-16">
              <div className="text-mono-tag text-emerald-400 mb-4 font-bold">/interface</div>
              <h2 className="mb-6">Product in action.</h2>
              <p className="text-zinc-500 max-w-xl mx-auto">
                Clean, distraction-free interfaces designed for the modern remote work era.
              </p>
            </div>
          </ScrollReveal>

          <div className="flex flex-col lg:flex-row h-[600px] w-full gap-4 overflow-hidden rounded-[2.5rem] border border-white/10 p-4 bg-zinc-950">
            {screens.map((screen, index) => {
              const isActive = activeScreen === index;
              return (
                <div
                  key={screen.id}
                  onMouseEnter={() => {
                    setIsPaused(true);
                    setActiveScreen(index);
                  }}
                  onMouseLeave={() => setIsPaused(false)}
                  onClick={() => setActiveScreen(index)}
                  className={`relative flex flex-col justify-end overflow-hidden cursor-pointer transition-all duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)] rounded-[2rem] border border-white/5 ${
                    isActive ? "lg:flex-[4] flex-[6]" : "lg:flex-1 flex-1 opacity-40 hover:opacity-100"
                  }`}
                >
                  <img 
                    src={screen.image} 
                    alt={screen.label} 
                    className={`absolute inset-0 w-full h-full object-cover transition-transform duration-[2000ms] ${
                      isActive ? "scale-105" : "scale-100 grayscale"
                    }`}
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t via-black/20 transition-all duration-700 ${
                    isActive ? "from-black/90 opacity-100" : "from-black/60 opacity-0"
                  }`} />
                  
                  <div 
                    className={`relative z-10 p-10 transition-all duration-700 transform-gpu ${
                      isActive ? "translate-y-0 opacity-100 delay-300" : "translate-y-20 opacity-0"
                    }`}
                  >
                    <div className="text-mono-tag text-emerald-400 mb-4">Screen 0{screen.id}</div>
                    <h3 className="text-3xl md:text-4xl font-bold mb-4 tracking-tighter">{screen.label}</h3>
                    <p className="text-zinc-400 text-base max-w-md mb-6">
                      {screen.description}
                    </p>
                    <div className="flex gap-1">
                       {[0, 1, 2].map(i => (
                         <div key={i} className={`h-0.5 rounded-full bg-emerald-400 transition-all duration-1000 ${isActive && i === index ? 'w-10' : 'w-2 opacity-20'}`} />
                       ))}
                    </div>
                  </div>

                  {!isActive && (
                    <div className="absolute inset-0 flex items-center justify-center lg:rotate-[-90deg] pointer-events-none">
                      <div className="text-mono-tag text-white whitespace-nowrap opacity-60">
                        {screen.label}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ CORE FEATURES — INTELLIGENCE LAYERS ============ */}
      <section className="py-24 px-6 border-b border-white/5">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal direction="up">
            <div className="text-center mb-16">
              <div className="text-mono-tag text-emerald-400 mb-4 font-bold">/intelligence</div>
              <h2 className="mb-4">Intelligence layers.</h2>
              <p className="text-zinc-400 max-w-xl mx-auto">
                Behind the simple interface lies a complex network of AI agents working in concert.
              </p>
            </div>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
             {[
               { title: "Privacy First", icon: Shield, desc: "On-device processing for sensitive conversations, ensuring zero data leakage.", color: "text-blue-400" },
               { title: "Context Aware", icon: Sparkles, desc: "AI learns your industry terminology to provide precise translations.", color: "text-emerald-400" },
               { title: "Direct Connect", icon: MessageSquare, desc: "Peer-to-peer WebRTC channels for maximum privacy and minimum lag.", color: "text-purple-400" },
               { title: "Diarization", icon: Zap, desc: "Advanced speaker identity models to correctly attribute quotes in minutes.", color: "text-amber-400" },
               { title: "Reliability", icon: CheckCircle2, desc: "99.9% availability through distributed AWS/Kubernetes architecture.", color: "text-rose-400" },
               { title: "Action Items", icon: FileText, desc: "Smart extraction of tasks and deadlines during the conversation.", color: "text-indigo-400" },
             ].map((f, i) => (
                <ScrollReveal key={f.title} delay={i * 0.1} direction="up">
                  <div className="p-8 rounded-3xl border border-white/5 bg-zinc-900/30 hover:border-emerald-500/20 transition-all duration-500">
                    <f.icon className={`w-8 h-8 ${f.color} mb-6`} />
                    <h3 className="text-xl font-bold mb-3">{f.title}</h3>
                    <p className="text-zinc-500 text-sm leading-relaxed">{f.desc}</p>
                  </div>
                </ScrollReveal>
             ))}
          </div>
        </div>
      </section>

      {/* ============ HOW IT WORKS ============ */}
      <section className="py-24 px-6 border-b border-white/5 bg-zinc-950/20">
        <div className="max-w-5xl mx-auto text-center mb-16">
          <div className="text-mono-tag text-emerald-400 mb-4 font-bold">/the_workflow</div>
          <h2 className="mb-4 lowercase">How we built it.</h2>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              step: "01",
              title: "The Mobile Edge",
              desc: "React Native with custom C++ modules for audio bridge, maximizing JSI performance for live audio streams.",
            },
            {
              step: "02",
              title: "AI Pipeline",
              desc: "Serverless Node.js orchestrators passing audio chunks to Whisper and context windows to GPT-4 via high-speed streams.",
            },
            {
              step: "03",
              title: "Scale & Reliability",
              desc: "Dockerized deployment on Kubernetes with Redis for real-time signaling and PostgreSQL for persistent storage.",
            },
          ].map((item, i) => (
            <ScrollReveal key={item.step} delay={i * 0.1} direction="up">
              <div className="relative p-10 rounded-[2rem] border border-white/5 bg-zinc-950 group hover:border-emerald-500/10 transition-all duration-500 overflow-hidden">
                <div className="absolute -top-10 -right-10 text-[8rem] font-black text-white/[0.02] leading-none group-hover:text-emerald-500/[0.02] transition-colors">
                  {item.step}
                </div>
                <div className="text-mono-tag text-emerald-400 mb-6 font-bold">STEP_{item.step}</div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <ContactCTA />
      <Footer />
    </main>
  );
}
