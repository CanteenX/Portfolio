"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Calendar,
  Database,
  Zap,
  Shield,
  Clock,
  TrendingUp,
  Building2,
  HeartPulse,
  Users,
  Phone,
} from "lucide-react";
import {
  SiLivekit,
  SiGooglegemini,
  SiGotomeeting,
  SiNodedotjs,
  SiMongodb,
} from "react-icons/si";
import { FaAws } from "react-icons/fa";
import type { IconType } from "react-icons";
import type { LucideIcon, LucideProps } from "lucide-react";

const IMG = {
  hero: "/projects/ai-call-bot-hospital/hero.jpg",
  inbound: "/projects/ai-call-bot-hospital/inbound.jpg",
  scheduling: "/projects/ai-call-bot-hospital/scheduling.jpg",
  records: "/projects/ai-call-bot-hospital/records.jpg",
  voicePipeline: "/projects/ai-call-bot-hospital/voice-pipeline.jpg",
  ehrIntegration: "/projects/ai-call-bot-hospital/ehr-integration.jpg",
} as const;
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { Navbar } from "@/components/ui/navbar";
import { ContactCTA } from "@/components/ui/contact-cta";
import { Footer } from "@/components/ui/footer";

const RingCentralIcon = (props: LucideProps) => (
  <Phone {...props} strokeWidth={2.2} />
);

const EhrApiIcon = (props: LucideProps) => (
  <HeartPulse {...props} strokeWidth={2.2} />
);

const screens = [
  {
    id: 1,
    label: "Inbound Intake",
    caption: "Natural voice greeting and triage",
    description:
      "Patients call the hospital line and speak naturally. The AI agent identifies intent, verifies identity, and routes to the right department — no IVR maze.",
    image: IMG.inbound,
    color: "from-emerald-500/20 to-transparent",
  },
  {
    id: 2,
    label: "Live Scheduling",
    caption: "Real-time appointment booking",
    description:
      "The agent queries live doctor availability, suggests optimal slots, confirms insurance, and books directly into the hospital scheduling system.",
    image: IMG.scheduling,
    color: "from-white/20 to-transparent",
  },
  {
    id: 3,
    label: "Patient Records",
    caption: "Secure EHR database integration",
    description:
      "HIPAA-compliant lookup of patient history, prior visits, prescriptions, and allergies — surfaced contextually during the call for personalized care.",
    image: IMG.records,
    color: "from-blue-500/20 to-transparent",
  },
];

const techStack: {
  name: string;
  icon: IconType | LucideIcon | ((props: LucideProps) => React.JSX.Element);
  color: string;
  desc: string;
}[] = [
  { name: "LiveKit", icon: SiLivekit, color: "#FF5630", desc: "Real-time voice & WebRTC" },
  { name: "Gemini", icon: SiGooglegemini, color: "#8E75B2", desc: "Conversational reasoning" },
  { name: "GoTo", icon: SiGotomeeting, color: "#F68D2E", desc: "Telephony & call routing" },
  { name: "Node.js", icon: SiNodedotjs, color: "#339933", desc: "Orchestration layer" },
  { name: "MongoDB", icon: SiMongodb, color: "#47A248", desc: "Patient records store" },
  { name: "EHR API", icon: EhrApiIcon, color: "#3B82F6", desc: "US patient database API" },
  { name: "AWS", icon: FaAws, color: "#FF9900", desc: "HIPAA-ready cloud" },
  { name: "RingCentral", icon: RingCentralIcon, color: "#FF8800", desc: "Enterprise phone system" },
];

const roiPoints = [
  {
    title: "<150ms",
    label: "Response latency",
    desc: "Ultra-low latency voice pipeline keeps conversations natural — patients never wait for the AI to think.",
    icon: Zap,
  },
  {
    title: "85%",
    label: "Calls self-resolved",
    desc: "Most appointment bookings, reschedules, and reminders handled end-to-end without human transfer.",
    icon: TrendingUp,
  },
  {
    title: "24/7",
    label: "Always available",
    desc: "Round-the-clock scheduling coverage eliminates missed calls and after-hours voicemail backlogs.",
    icon: Clock,
  },
  {
    title: "12+",
    label: "Departments integrated",
    desc: "Cardiology, orthopedics, pediatrics, and more — unified scheduling across the hospital network.",
    icon: Building2,
  },
];

export default function AiCallBotHospitalPage() {
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
              /ai-call-bot-hospital — Voice AI
            </div>
            <h1 className="mb-10 max-w-5xl leading-[0.85]">AI Call Agent</h1>

            <div className="grid md:grid-cols-4 gap-px bg-white/5 border border-white/10 mb-16 overflow-hidden rounded-2xl">
              {[
                { label: "Client", value: "Regional Hospital Network" },
                { label: "Timeframe", value: "12 weeks · 2025" },
                { label: "Role", value: "Full-stack AI Engineering" },
                { label: "Outcome", value: "85% call automation rate" },
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
                src={IMG.hero}
                alt="AI Call Agent for Hospital Appointments"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-500" />
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
              <h2 className="mb-6">Built for voice at scale.</h2>
              <p className="text-zinc-500 max-w-2xl mx-auto">
                A real-time voice pipeline connecting GoTo and RingCentral telephony, LiveKit
                streams, Gemini reasoning, and US EHR APIs — engineered for sub-150ms round-trip
                latency.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
              <h2 className="mb-6">Measurable impact.</h2>
              <p className="text-zinc-500 max-w-2xl mx-auto">
                The hospital network reduced front-desk call volume, eliminated scheduling
                backlogs, and improved patient satisfaction — all while maintaining HIPAA
                compliance.
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
                  <p className="text-sm text-zinc-500 leading-relaxed">{point.desc}</p>
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
                <h2 className="mb-6">Overwhelmed scheduling lines.</h2>
                <p className="text-zinc-400 max-w-xl">
                  Hospital front desks field hundreds of appointment calls daily. Hold times
                  stretch past 20 minutes, staff burn out on repetitive booking tasks, and
                  after-hours callers hit voicemail with no way to schedule until morning.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="left" delay={0.2}>
              <div>
                <div className="text-mono-tag text-neutral-200 mb-4 font-bold">/the_solution</div>
                <h2 className="mb-6">Intelligent voice automation.</h2>
                <p className="text-zinc-400 max-w-xl">
                  We built an AI call agent that answers every line instantly, looks up patient
                  records in real time, checks doctor availability across departments, and books
                  appointments — all through natural conversation with sub-150ms response times.
                </p>
              </div>
            </ScrollReveal>
          </div>

          <div className="space-y-4">
            <ScrollReveal direction="right">
              <div className="group relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-950">
                <img
                  src={IMG.voicePipeline}
                  alt="AI voice call processing"
                  className="w-full h-full object-cover grayscale opacity-50 transition-all duration-700 group-hover:grayscale-0 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                <div className="absolute bottom-10 left-10">
                  <div className="text-mono-tag text-zinc-500 mb-2">01 — Voice Pipeline</div>
                  <h3 className="font-bold">Real-time speech processing</h3>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="right" delay={0.2}>
              <div className="group relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-950">
                <img
                  src={IMG.ehrIntegration}
                  alt="EHR patient database integration"
                  className="w-full h-full object-cover grayscale opacity-50 transition-all duration-700 group-hover:grayscale-0 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                <div className="absolute bottom-10 left-10">
                  <div className="text-mono-tag text-zinc-500 mb-2">02 — Integration</div>
                  <h3 className="font-bold">Live patient database sync</h3>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ============ INTERFACE SCREENS ============ */}
      <section className="py-24 px-6 border-b border-white/5">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal direction="up">
            <div className="text-center mb-16">
              <div className="text-mono-tag text-neutral-200 mb-4 font-bold">/interface</div>
              <h2 className="mb-6">Call flows in action.</h2>
              <p className="text-zinc-500 max-w-xl mx-auto">
                From inbound intake to confirmed appointment — every step handled by voice AI
                with full hospital system integration.
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
                  <div
                    className={`absolute inset-0 bg-gradient-to-t via-black/20 transition-all duration-700 ${
                      isActive ? "from-black/90 opacity-100" : "from-black/60 opacity-0"
                    }`}
                  />

                  <div
                    className={`relative z-10 p-10 transition-all duration-700 transform-gpu ${
                      isActive ? "translate-y-0 opacity-100 delay-300" : "translate-y-20 opacity-0"
                    }`}
                  >
                    <div className="text-mono-tag text-neutral-200 mb-4">Flow 0{screen.id}</div>
                    <h3 className="text-3xl md:text-4xl font-bold mb-4 tracking-tighter">
                      {screen.label}
                    </h3>
                    <p className="text-zinc-400 text-base max-w-md mb-6">{screen.description}</p>
                    <div className="flex gap-1">
                      {[0, 1, 2].map((i) => (
                        <div
                          key={i}
                          className={`h-0.5 rounded-full bg-neutral-200 transition-all duration-1000 ${
                            isActive && i === index ? "w-10" : "w-2 opacity-20"
                          }`}
                        />
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

      {/* ============ INTELLIGENCE LAYERS ============ */}
      <section className="py-24 px-6 border-b border-white/5">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal direction="up">
            <div className="text-center mb-16">
              <div className="text-mono-tag text-neutral-200 mb-4 font-bold">/intelligence</div>
              <h2 className="mb-4">Core capabilities.</h2>
              <p className="text-zinc-400 max-w-xl mx-auto">
                A multi-layered AI system designed for healthcare-grade reliability, security,
                and conversational accuracy.
              </p>
            </div>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Patient DB Lookup",
                icon: Database,
                desc: "Real-time access to patient history, allergies, and prior visits during every call.",
                color: "text-blue-400",
              },
              {
                title: "Smart Scheduling",
                icon: Calendar,
                desc: "Cross-department availability checks with insurance validation and conflict detection.",
                color: "text-emerald-400",
              },
              {
                title: "Ultra-low Latency",
                icon: Zap,
                desc: "Sub-150ms voice round-trip via streaming STT, cached context, and edge inference.",
                color: "text-amber-400",
              },
              {
                title: "HIPAA Compliant",
                icon: Shield,
                desc: "End-to-end encryption, audit logging, and PHI handling aligned with healthcare standards.",
                color: "text-rose-400",
              },
              {
                title: "Sentiment Detection",
                icon: HeartPulse,
                desc: "Detects patient distress or urgency and escalates to a live nurse or doctor instantly.",
                color: "text-purple-400",
              },
              {
                title: "Multi-language",
                icon: Users,
                desc: "Supports 20+ languages for diverse patient populations with accent-adaptive STT.",
                color: "text-indigo-400",
              },
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
              title: "Voice Ingress",
              desc: "GoTo and RingCentral SIP trunks stream audio through LiveKit for real-time transcription with speaker diarization and noise cancellation.",
            },
            {
              step: "02",
              title: "AI Orchestration",
              desc: "Node.js agents query US EHR APIs and MongoDB patient records, check scheduling systems, and generate natural responses via Gemini.",
            },
            {
              step: "03",
              title: "Deploy & Scale",
              desc: "RingCentral-integrated voice services on AWS with auto-scaling, HIPAA-compliant logging, and failover routing for 99.9% uptime.",
            },
          ].map((item, i) => (
            <ScrollReveal key={item.step} delay={i * 0.1} direction="up">
              <div className="relative p-10 rounded-[2rem] border border-white/5 bg-zinc-950 group hover:border-white/10 transition-all duration-500 overflow-hidden">
                <div className="absolute -top-10 -right-10 text-[8rem] font-black text-white/[0.02] leading-none group-hover:text-white/[0.02] transition-colors">
                  {item.step}
                </div>
                <div className="text-mono-tag text-neutral-200 mb-6 font-bold">
                  STEP_{item.step}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">{item.desc}</p>
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
