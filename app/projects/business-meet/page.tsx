"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Users,
  MapPin,
  CalendarCheck,
  FileText,
  Bell,
  Sparkles,
  Zap,
  MessageSquare,
  TrendingUp,
  Clock,
} from "lucide-react";
import {
  SiReact, SiTypescript, SiOpenai, SiNodedotjs,
  SiMongodb, SiRedis, SiDocker, SiSocketdotio, SiWhatsapp
} from "react-icons/si";
import { FaAws } from "react-icons/fa";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { Navbar } from "@/components/ui/navbar";
import { ContactCTA } from "@/components/ui/contact-cta";
import { Footer } from "@/components/ui/footer";

const screens = [
  {
    id: 1,
    label: "Smart Matching",
    caption: "AI-recommended profiles and connections",
    description: "GPT-4o-mini and vector search analyze industry, interests, destination, and travel dates to surface the professionals you should actually meet.",
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=80",
    color: "from-blue-500/20 to-transparent"
  },
  {
    id: 2,
    label: "Live Map & Meetings",
    caption: "Discover people and events around you",
    description: "Interactive maps with real-time presence let travelers and locals find nearby professionals, schedule meetings, and join community events instantly.",
    image: "https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1600&q=80",
    color: "from-white/20 to-transparent"
  },
  {
    id: 3,
    label: "AI Minutes of Meeting",
    caption: "Every meeting captured automatically",
    description: "After each meeting the platform generates structured minutes, action items, and follow-up recommendations — synced live to your dashboard.",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1600&q=80",
    color: "from-purple-500/20 to-transparent"
  },
];

const techStack = [
  { name: "React Native", icon: SiReact, color: "#61DAFB", desc: "Cross-platform mobile app" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6", desc: "Type-safe engineering" },
  { name: "GPT-4o-mini", icon: SiOpenai, color: "#10a37f", desc: "AI matching engine" },
  { name: "Vector Search", icon: SiMongodb, color: "#47A248", desc: "Semantic similarity" },
  { name: "Node.js", icon: SiNodedotjs, color: "#339933", desc: "Microservices core" },
  { name: "Socket.IO", icon: SiSocketdotio, color: "#ffffff", desc: "Real-time sync" },
  { name: "WhatsApp API", icon: SiWhatsapp, color: "#25D366", desc: "Instant notifications" },
  { name: "Redis", icon: SiRedis, color: "#FF4438", desc: "Live presence & queues" },
  { name: "AWS", icon: FaAws, color: "#FF9900", desc: "Cloud infrastructure" },
  { name: "Docker", icon: SiDocker, color: "#2496ED", desc: "Containerization" },
];

const roiPoints = [
  {
    title: "92%",
    label: "Match Relevance",
    desc: "Vector-search powered recommendations users actually accept and act on.",
    icon: TrendingUp
  },
  {
    title: "<1s",
    label: "Page Loads",
    desc: "Modern frontend architecture delivers near-instant, fluid interactions.",
    icon: Zap
  },
  {
    title: "10 min",
    label: "Saved per meeting",
    desc: "Automatic minutes of meeting eliminate manual note-taking and follow-ups.",
    icon: Clock
  },
  {
    title: "2 Channels",
    label: "Notification Reach",
    desc: "Scalable microservices deliver email and WhatsApp updates in real time.",
    icon: Bell
  },
];

export default function BusinessMeetPage() {
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
            <div className="text-mono-tag text-neutral-200 mb-4 font-semibold">
              /business-meet — AI Networking Platform
            </div>
            <h1 className="mb-10 max-w-5xl leading-[0.85]">
              Business Meet
            </h1>
            <p className="text-zinc-400 max-w-3xl mb-12 text-lg">
              An AI-powered networking and travel platform connecting professionals, travelers,
              and local communities through intelligent matching and real-time engagement —
              with AI-based recommendations for profiles, connections, meetings, and minutes of meeting.
            </p>

            <div className="grid md:grid-cols-4 gap-px bg-white/5 border border-white/10 mb-16 overflow-hidden rounded-2xl">
              {[
                { label: "Client", value: "Business Meet (Internal)" },
                { label: "Timeframe", value: "14 weeks · 2025" },
                { label: "Role", value: "Full-stack & AI Engineering" },
                { label: "Outcome", value: "Intelligent professional matching" },
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
                src="https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=2000&q=80"
                alt="Business Meet Hero"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500" />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ============ TECH STACK ============ */}
      <section className="py-20 px-6 bg-zinc-950/50 border-y border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/5 blur-[120px] rounded-full pointer-none" />

        <div className="max-w-7xl mx-auto">
          <ScrollReveal direction="up">
            <div className="text-center mb-16">
              <div className="text-mono-tag text-neutral-200 mb-4 font-bold">/the_stack</div>
              <h2 className="mb-6">Engineered for connection.</h2>
              <p className="text-zinc-500 max-w-2xl mx-auto">
                An AI-driven matching engine on top of a scalable microservice backbone,
                delivering real-time updates, interactive maps, and live dashboard synchronization.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {techStack.map((tech, i) => (
              <ScrollReveal key={tech.name} delay={i * 0.05} direction="up">
                <div className="group p-6 bg-zinc-900/30 border border-white/5 rounded-3xl hover:border-white/30 transition-all duration-500 h-full flex flex-col items-center text-center">
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

      {/* ============ ROI SECTION ============ */}
      <section className="py-20 px-6 border-b border-white/5 bg-black">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal direction="up">
            <div className="text-center mb-16">
              <div className="text-mono-tag text-neutral-200 mb-4 font-bold">/the_roi</div>
              <h2 className="mb-6">Tangible impact.</h2>
              <p className="text-zinc-500 max-w-2xl mx-auto">
                From first recommendation to signed-off minutes, Business Meet compresses
                the entire networking lifecycle into one intelligent flow.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {roiPoints.map((point, i) => (
              <ScrollReveal key={point.label} delay={i * 0.1} direction="up">
                <div className="p-8 bg-zinc-900/40 border border-white/5 rounded-3xl h-full flex flex-col items-center text-center">
                  <div className="p-3 rounded-xl bg-white/10 mb-6">
                    <point.icon className="w-6 h-6 text-neutral-200" />
                  </div>
                  <div className="text-4xl font-bold mb-2 tabular-nums">{point.title}</div>
                  <div className="text-mono-tag text-neutral-200 mb-4">{point.label}</div>
                  <p className="text-sm text-zinc-500 leading-relaxed">
                    {point.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ PROBLEM & SOLUTION ============ */}
      <section className="py-24 px-6 border-b border-white/5">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16">
          <div className="lg:sticky lg:top-32 self-start space-y-12">
            <ScrollReveal direction="left">
              <div>
                <div className="text-mono-tag text-neutral-200 mb-4 font-bold">/the_problem</div>
                <h2 className="mb-6">Networking is random.</h2>
                <p className="text-zinc-400 max-w-xl">
                  Professionals traveling to new cities and events waste hours on cold outreach
                  and irrelevant introductions. Discovering the right people — by field, interest,
                  destination, and timing — is left entirely to chance, and meeting outcomes
                  evaporate without structured follow-up.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="left" delay={0.2}>
              <div>
                <div className="text-mono-tag text-neutral-200 mb-4 font-bold">/the_solution</div>
                <h2 className="mb-6">Intelligence-driven serendipity.</h2>
                <p className="text-zinc-400 max-w-xl">
                  We built an AI traveler-matching engine using GPT-4o-mini and vector search
                  that connects users on destination, interests, and travel dates. Field-aware
                  recommendations surface profiles, connections, and meetings, while AI-generated
                  minutes of meeting and microservice-based email and WhatsApp notifications
                  keep every conversation moving.
                </p>
              </div>
            </ScrollReveal>
          </div>

          <div className="space-y-4">
             <ScrollReveal direction="right">
                <div className="group relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-950">
                  <img
                    src="https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=1200&q=80"
                    alt="Professional networking"
                    className="w-full h-full object-cover grayscale opacity-50 transition-all duration-700 group-hover:grayscale-0 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                  <div className="absolute bottom-10 left-10">
                    <div className="text-mono-tag text-zinc-500 mb-2">01 — Matching</div>
                    <h3 className="font-bold">AI-ranked professional recommendations</h3>
                  </div>
                </div>
             </ScrollReveal>
             <ScrollReveal direction="right" delay={0.2}>
                <div className="group relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-950">
                  <img
                    src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80"
                    alt="Traveler engagement"
                    className="w-full h-full object-cover grayscale opacity-50 transition-all duration-700 group-hover:grayscale-0 group-hover:opacity-100"
                  />
                   <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                  <div className="absolute bottom-10 left-10">
                    <div className="text-mono-tag text-zinc-500 mb-2">02 — Travel</div>
                    <h3 className="font-bold">Destination and date aware connections</h3>
                  </div>
                </div>
             </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ============ APP SCREENS ============ */}
      <section className="py-24 px-6 border-b border-white/5">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal direction="up">
            <div className="text-center mb-16">
              <div className="text-mono-tag text-neutral-200 mb-4 font-bold">/interface</div>
              <h2 className="mb-6">Product in action.</h2>
              <p className="text-zinc-500 max-w-xl mx-auto">
                Fast, fluid interfaces with real-time updates, interactive maps, and live dashboard sync.
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
                    <div className="text-mono-tag text-neutral-200 mb-4">Screen 0{screen.id}</div>
                    <h3 className="text-3xl md:text-4xl font-bold mb-4 tracking-tighter">{screen.label}</h3>
                    <p className="text-zinc-400 text-base max-w-md mb-6">
                      {screen.description}
                    </p>
                    <div className="flex gap-1">
                       {[0, 1, 2].map(i => (
                         <div key={i} className={`h-0.5 rounded-full bg-neutral-200 transition-all duration-1000 ${isActive && i === index ? 'w-10' : 'w-2 opacity-20'}`} />
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

      {/* ============ CORE FEATURES ============ */}
      <section className="py-24 px-6 border-b border-white/5">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal direction="up">
            <div className="text-center mb-16">
              <div className="text-mono-tag text-neutral-200 mb-4 font-bold">/intelligence</div>
              <h2 className="mb-4">Intelligence layers.</h2>
              <p className="text-zinc-400 max-w-xl mx-auto">
                Every surface of the platform is powered by AI recommendations working in concert.
              </p>
            </div>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
             {[
               { title: "Profile Recommendations", icon: Users, desc: "Field-aware AI suggests the most relevant professionals to your goals and industry.", color: "text-blue-400" },
               { title: "Smart Connections", icon: Sparkles, desc: "Vector search matches on destination, interests, and travel dates for high-signal intros.", color: "text-neutral-200" },
               { title: "Meeting Suggestions", icon: CalendarCheck, desc: "AI proposes when, where, and with whom to meet based on shared context and availability.", color: "text-purple-400" },
               { title: "AI Minutes of Meeting", icon: FileText, desc: "Structured MoMs with action items generated automatically after every meeting.", color: "text-amber-400" },
               { title: "Live Maps & Dashboards", icon: MapPin, desc: "Interactive maps and real-time dashboard synchronization keep engagement live.", color: "text-rose-400" },
               { title: "Multi-channel Alerts", icon: MessageSquare, desc: "Scalable microservices push email and WhatsApp notifications the moment things change.", color: "text-indigo-400" },
             ].map((f, i) => (
                <ScrollReveal key={f.title} delay={i * 0.1} direction="up">
                  <div className="p-8 rounded-3xl border border-white/5 bg-zinc-900/30 hover:border-white/20 transition-all duration-500">
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
          <div className="text-mono-tag text-neutral-200 mb-4 font-bold">/the_workflow</div>
          <h2 className="mb-4 lowercase">How we built it.</h2>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              step: "01",
              title: "AI Matching Engine",
              desc: "GPT-4o-mini enriches profiles into embeddings; vector search ranks candidates by destination, interests, and travel dates.",
            },
            {
              step: "02",
              title: "Responsive Frontend",
              desc: "Modern component architecture with optimistic updates and streaming data delivers near-instant page loads and smooth interactions.",
            },
            {
              step: "03",
              title: "Real-time Microservices",
              desc: "Event-driven notification services for email and WhatsApp, with Socket.IO powering live maps and dashboard synchronization.",
            },
          ].map((item, i) => (
            <ScrollReveal key={item.step} delay={i * 0.1} direction="up">
              <div className="relative p-10 rounded-[2rem] border border-white/5 bg-zinc-950 group hover:border-white/10 transition-all duration-500 overflow-hidden">
                <div className="absolute -top-10 -right-10 text-[8rem] font-black text-white/[0.02] leading-none group-hover:text-white/[0.02] transition-colors">
                  {item.step}
                </div>
                <div className="text-mono-tag text-neutral-200 mb-6 font-bold">STEP_{item.step}</div>
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
