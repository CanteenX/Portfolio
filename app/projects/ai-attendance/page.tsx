"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ScanFace,
  MapPin,
  Users,
  Activity,
  LayoutDashboard,
  ShieldCheck,
  Building2,
  Smartphone,
} from "lucide-react";
import {
  SiReact, SiTypescript, SiTensorflow, SiNodedotjs,
  SiMongodb, SiRedis, SiDocker, SiSocketdotio, SiGooglemaps
} from "react-icons/si";
import { FaAws } from "react-icons/fa";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { Navbar } from "@/components/ui/navbar";
import { ContactCTA } from "@/components/ui/contact-cta";
import { Footer } from "@/components/ui/footer";

const screens = [
  {
    id: 1,
    label: "AI-Verified Check-in",
    caption: "Face-verified attendance in seconds",
    description: "Employees mark attendance from the mobile app with on-device AI face verification, eliminating proxy entries entirely.",
    image: "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&w=1600&q=80",
    color: "from-blue-500/20 to-transparent"
  },
  {
    id: 2,
    label: "Geo-Fenced Zones",
    caption: "Attendance only where it should happen",
    description: "Geo-fencing validates every punch against assigned work locations — wards, offices, and field sites across the city.",
    image: "https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1600&q=80",
    color: "from-white/20 to-transparent"
  },
  {
    id: 3,
    label: "Central Dashboard",
    caption: "Real-time visibility across every location",
    description: "Supervisors and HQ monitor live attendance, group captures, and analytics from one centralized dashboard.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80",
    color: "from-purple-500/20 to-transparent"
  },
];

const techStack = [
  { name: "React Native", icon: SiReact, color: "#61DAFB", desc: "Cross-platform mobile app" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6", desc: "Type-safe engineering" },
  { name: "TensorFlow", icon: SiTensorflow, color: "#FF6F00", desc: "AI face verification" },
  { name: "Google Maps", icon: SiGooglemaps, color: "#4285F4", desc: "Geo-fencing engine" },
  { name: "Node.js", icon: SiNodedotjs, color: "#339933", desc: "Scalable backend" },
  { name: "Socket.IO", icon: SiSocketdotio, color: "#ffffff", desc: "Real-time monitoring" },
  { name: "MongoDB", icon: SiMongodb, color: "#47A248", desc: "Attendance records" },
  { name: "Redis", icon: SiRedis, color: "#FF4438", desc: "Live sync & queues" },
  { name: "AWS", icon: FaAws, color: "#FF9900", desc: "Cloud infrastructure" },
  { name: "Docker", icon: SiDocker, color: "#2496ED", desc: "Containerization" },
];

const roiPoints = [
  {
    title: "8,000+",
    label: "Daily Active Employees",
    desc: "VMC staff across the city mark attendance through the app every working day.",
    icon: Users
  },
  {
    title: "0",
    label: "Proxy Entries",
    desc: "AI face verification combined with geo-fencing eliminates buddy punching.",
    icon: ShieldCheck
  },
  {
    title: "Live",
    label: "Multi-location Visibility",
    desc: "Real-time attendance status across wards, offices, and field sites.",
    icon: Activity
  },
  {
    title: "#1",
    label: "Municipal-scale Deployment",
    desc: "One of the largest attendance rollouts in the municipal sector.",
    icon: Building2
  },
];

export default function AiAttendancePage() {
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
              /ai-attendance — Digital Governance
            </div>
            <h1 className="mb-10 max-w-5xl leading-[0.85]">
              AI Attendance
            </h1>
            <p className="text-zinc-400 max-w-3xl mb-12 text-lg">
              An AI-powered attendance management system transforming workforce management at
              Vadodara Municipal Corporation (VMC). 8,000+ employees mark attendance daily through
              the mobile app — verified by AI, validated by geo-fencing, and monitored in real time.
            </p>

            <div className="grid md:grid-cols-4 gap-px bg-white/5 border border-white/10 mb-16 overflow-hidden rounded-2xl">
              {[
                { label: "Client", value: "Vadodara Municipal Corporation" },
                { label: "Scale", value: "8,000+ daily users" },
                { label: "Role", value: "Development, Deployment & Support" },
                { label: "Outcome", value: "Proxy-free, real-time attendance" },
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
                src="https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?auto=format&fit=crop&w=2000&q=80"
                alt="AI Attendance Hero"
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
              <h2 className="mb-6">Engineered for accountability.</h2>
              <p className="text-zinc-500 max-w-2xl mx-auto">
                AI verification and geo-fencing on the edge, backed by a real-time cloud
                pipeline that serves thousands of users every day without breaking a sweat.
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
              <div className="text-mono-tag text-neutral-200 mb-4 font-bold">/the_impact</div>
              <h2 className="mb-6">Municipal scale, measurable results.</h2>
              <p className="text-zinc-500 max-w-2xl mx-auto">
                One of the largest attendance deployments in the municipal sector —
                accurate, proxy-free, and visible in real time across the entire city.
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
                <h2 className="mb-6">Attendance you can't trust.</h2>
                <p className="text-zinc-400 max-w-xl">
                  Manual registers and legacy biometric machines couldn't keep up with a
                  workforce spread across hundreds of municipal locations. Proxy entries,
                  delayed reporting, and zero real-time visibility made accurate workforce
                  management nearly impossible.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="left" delay={0.2}>
              <div>
                <div className="text-mono-tag text-neutral-200 mb-4 font-bold">/the_solution</div>
                <h2 className="mb-6">Verified, located, live.</h2>
                <p className="text-zinc-400 max-w-xl">
                  We combined AI face verification with geo-fencing based validation so every
                  punch is both genuinely the employee and genuinely on site. Group attendance
                  capture handles field teams, while real-time monitoring and a centralized
                  dashboard give VMC live visibility across every location.
                </p>
              </div>
            </ScrollReveal>
          </div>

          <div className="space-y-4">
             <ScrollReveal direction="right">
                <div className="group relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-950">
                  <img
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80"
                    alt="Workforce"
                    className="w-full h-full object-cover grayscale opacity-50 transition-all duration-700 group-hover:grayscale-0 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                  <div className="absolute bottom-10 left-10">
                    <div className="text-mono-tag text-zinc-500 mb-2">01 — Verification</div>
                    <h3 className="font-bold">AI-verified, proxy-free attendance</h3>
                  </div>
                </div>
             </ScrollReveal>
             <ScrollReveal direction="right" delay={0.2}>
                <div className="group relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-950">
                  <img
                    src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1200&q=80"
                    alt="Geo-fencing"
                    className="w-full h-full object-cover grayscale opacity-50 transition-all duration-700 group-hover:grayscale-0 group-hover:opacity-100"
                  />
                   <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                  <div className="absolute bottom-10 left-10">
                    <div className="text-mono-tag text-zinc-500 mb-2">02 — Location</div>
                    <h3 className="font-bold">Geo-fenced validation across the city</h3>
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
                Simple for field employees, powerful for administrators.
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
              <div className="text-mono-tag text-neutral-200 mb-4 font-bold">/key_highlights</div>
              <h2 className="mb-4">Key highlights.</h2>
              <p className="text-zinc-400 max-w-xl mx-auto">
                Every layer of the system is built to guarantee attendance accuracy at scale.
              </p>
            </div>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
             {[
               { title: "AI-Verified Attendance", icon: ScanFace, desc: "Face verification on every punch ensures the right person marks attendance — no proxies.", color: "text-blue-400" },
               { title: "Geo-Fencing Validation", icon: MapPin, desc: "Attendance is accepted only within assigned geo-fenced work zones across the city.", color: "text-neutral-200" },
               { title: "Group Attendance Capture", icon: Users, desc: "Supervisors capture entire field teams in one shot — ideal for on-site municipal crews.", color: "text-purple-400" },
               { title: "Real-Time Monitoring", icon: Activity, desc: "Live attendance status streams to administrators the moment employees check in.", color: "text-amber-400" },
               { title: "Central Dashboard & Analytics", icon: LayoutDashboard, desc: "Centralized reporting, trends, and analytics across all departments and locations.", color: "text-rose-400" },
               { title: "Built for Mobile", icon: Smartphone, desc: "A fast, reliable mobile app that thousands of employees use every single day.", color: "text-indigo-400" },
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
              title: "AI on the Edge",
              desc: "On-device face verification models validate identity instantly, even in low-connectivity field conditions.",
            },
            {
              step: "02",
              title: "Geo-Fencing Engine",
              desc: "Location services validate every punch against assigned geo-fenced zones — wards, offices, and field sites.",
            },
            {
              step: "03",
              title: "Real-Time Backbone",
              desc: "Node.js microservices with Redis and Socket.IO stream attendance events live to the centralized dashboard.",
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
