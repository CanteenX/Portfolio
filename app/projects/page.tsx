"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, Languages, ShoppingCart, HeartPulse, Landmark } from "lucide-react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { Navbar } from "@/components/ui/navbar";

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

const process = [
  {
    step: "01",
    title: "Discovery & Planning",
    description:
      "We dive deep into your vision, map out user flows, define the tech stack, and build a detailed roadmap — so there are zero surprises down the line.",
    accent: "from-blue-500/20 to-blue-500/0",
    dot: "bg-blue-500",
  },
  {
    step: "02",
    title: "UI / UX Design",
    description:
      "Pixel-perfect interfaces designed for conversion. Prototypes you can click through before a single line of code is written.",
    accent: "from-violet-500/20 to-violet-500/0",
    dot: "bg-violet-500",
  },
  {
    step: "03",
    title: "Development",
    description:
      "Clean, modular code built with modern frameworks. Weekly demos keep you in the loop with full transparency.",
    accent: "from-emerald-500/20 to-emerald-500/0",
    dot: "bg-emerald-500",
  },
  {
    step: "04",
    title: "Testing & QA",
    description:
      "Rigorous automated and manual testing across devices. We break it so your users never have to.",
    accent: "from-amber-500/20 to-amber-500/0",
    dot: "bg-amber-500",
  },
  {
    step: "05",
    title: "Launch & Deploy",
    description:
      "Zero-downtime deployments with CI/CD pipelines, monitoring, and rollback strategies baked in from day one.",
    accent: "from-rose-500/20 to-rose-500/0",
    dot: "bg-rose-500",
  },
  {
    step: "06",
    title: "Support & Scale",
    description:
      "Post-launch isn't the end — it's the beginning. Ongoing support, performance tuning, and feature iterations.",
    accent: "from-cyan-500/20 to-cyan-500/0",
    dot: "bg-cyan-500",
  },
];

const perks = [
  {
    title: "Lightning Fast Delivery",
    description:
      "Agile sprints with rapid iteration. We ship MVPs in weeks, not months — without cutting corners.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    gradient: "from-amber-500/10 via-transparent to-transparent",
    border: "hover:border-amber-500/30",
  },
  {
    title: "Unbreakable Commitment",
    description:
      "Your deadlines are our deadlines. We treat every milestone as a promise — transparent updates, no ghosting.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    gradient: "from-emerald-500/10 via-transparent to-transparent",
    border: "hover:border-emerald-500/30",
  },
  {
    title: "Enterprise-Grade Security",
    description:
      "OWASP best practices, encrypted data at rest and in transit, role-based access, and regular security audits.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
      </svg>
    ),
    gradient: "from-blue-500/10 via-transparent to-transparent",
    border: "hover:border-blue-500/30",
  },
  {
    title: "Built to Scale",
    description:
      "Architectures designed for 10x growth. Microservices, edge caching, and auto-scaling — ready before you need it.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
      </svg>
    ),
    gradient: "from-violet-500/10 via-transparent to-transparent",
    border: "hover:border-violet-500/30",
  },
  {
    title: "24/7 Customer Service",
    description:
      "Dedicated project manager, Slack/Discord channels, and priority support. We're always one message away.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
      </svg>
    ),
    gradient: "from-rose-500/10 via-transparent to-transparent",
    border: "hover:border-rose-500/30",
  },
  {
    title: "Transparent Pricing",
    description:
      "No hidden fees, no scope-creep surprises. Detailed estimates upfront with milestone-based billing.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
      </svg>
    ),
    gradient: "from-cyan-500/10 via-transparent to-transparent",
    border: "hover:border-cyan-500/30",
  },
];

const projects = [
  {
    title: "We Converse App",
    description: "Meeting app with live translation in any language and automatic minutes of meeting generation.",
    href: "/projects/we-converse",
    icon: <Languages className="w-5 h-5" />,
    tags: ["React Native", "WebRTC", "AI"],
  },
  {
    title: "E-Commerce Solution",
    description: "Full-stack e-commerce platform with AI-driven personalization and recommendations.",
    href: "#",
    icon: <ShoppingCart className="w-5 h-5" />,
    tags: ["Next.js", "Stripe", "PostgreSQL"],
  },
  {
    title: "Healthcare Dashboard",
    description: "HIPAA-compliant patient management system with intelligent workflow automation.",
    href: "#",
    icon: <HeartPulse className="w-5 h-5" />,
    tags: ["React", "Node.js", "FHIR"],
  },
  {
    title: "FinTech App",
    description: "Secure financial application with AI fraud detection and blockchain integration.",
    href: "#",
    icon: <Landmark className="w-5 h-5" />,
    tags: ["Flutter", "Python", "AWS"],
  },
];

/* ------------------------------------------------------------------ */
/*  PAGE                                                               */
/* ------------------------------------------------------------------ */

export default function ProjectsPage() {
  return (
    <main className="min-h-screen w-full bg-black text-white overflow-x-hidden">
      <Navbar />

      {/* ============ HERO ============ */}
      <section className="relative pt-32 pb-20 md:pt-44 md:pb-28 px-6">
        <ScrollReveal direction="up" duration={1}>
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full border border-white/10 bg-white/5 text-xs font-medium text-zinc-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Our Work
            </div>

            <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.08] mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-500">
                Projects & Process
              </span>
            </h1>

            <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
              From first idea to global scale — here is how we turn your vision into production-grade software, and the projects that prove it.
            </p>
          </div>
        </ScrollReveal>

        {/* Radial glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-violet-500/8 via-transparent to-transparent rounded-full blur-3xl pointer-events-none" />
      </section>

      {/* ============ PROCESS TIMELINE ============ */}
      <section className="py-20 md:py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal direction="up">
            <div className="text-center mb-20">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
                Our Development Flow
              </h2>
              <p className="text-zinc-400 text-base md:text-lg max-w-xl mx-auto">
                A battle-tested process that delivers results every single time.
              </p>
            </div>
          </ScrollReveal>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-px bg-gradient-to-b from-white/20 via-white/10 to-transparent" />

            <div className="space-y-16 md:space-y-24">
              {process.map((item, index) => {
                const isLeft = index % 2 === 0;

                return (
                  <ScrollReveal
                    key={item.step}
                    direction={isLeft ? "left" : "right"}
                    delay={index * 0.08}
                  >
                    <div className="relative flex items-start md:items-center">
                      {/* Dot on the line */}
                      <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-10">
                        <div className={`w-3.5 h-3.5 rounded-full ${item.dot} ring-4 ring-black shadow-lg`} />
                      </div>

                      {/* Card */}
                      <div
                        className={`
                          ml-16 md:ml-0 md:w-[calc(50%-40px)]
                          ${isLeft ? "md:mr-auto md:pr-0" : "md:ml-auto md:pl-0"}
                        `}
                      >
                        <div className={`relative group p-6 md:p-8 rounded-2xl border border-white/5 bg-zinc-950 hover:border-white/10 transition-all duration-500 overflow-hidden`}>
                          {/* Gradient accent */}
                          <div className={`absolute inset-0 bg-gradient-to-br ${item.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                          <div className="relative">
                            <span className="text-xs font-bold text-zinc-600 tracking-widest uppercase mb-3 block">
                              Step {item.step}
                            </span>
                            <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
                              {item.title}
                            </h3>
                            <p className="text-sm md:text-base text-zinc-400 leading-relaxed">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ============ WHY CHOOSE US / PERKS ============ */}
      <section className="py-20 md:py-32 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal direction="up">
            <div className="text-center mb-20">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
                Why Build With Us
              </h2>
              <p className="text-zinc-400 text-base md:text-lg max-w-xl mx-auto">
                We don't just write code — we build partnerships that last.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {perks.map((perk, index) => (
              <ScrollReveal key={perk.title} delay={index * 0.06} direction="up">
                <div
                  className={`group relative p-7 rounded-2xl border border-white/5 bg-zinc-950 ${perk.border} transition-all duration-500 h-full`}
                >
                  {/* Hover gradient */}
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${perk.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                  <div className="relative">
                    <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-zinc-300 mb-5 group-hover:text-white group-hover:border-white/20 transition-colors duration-300">
                      {perk.icon}
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">
                      {perk.title}
                    </h3>
                    <p className="text-sm text-zinc-400 leading-relaxed">
                      {perk.description}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FEATURED PROJECTS ============ */}
      <section className="py-20 md:py-32 px-6 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal direction="up">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
                Featured Projects
              </h2>
              <p className="text-zinc-400 text-base md:text-lg max-w-xl mx-auto">
                A glimpse at the products we've brought to life.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {projects.map((project, index) => (
              <ScrollReveal key={project.title} delay={index * 0.08} direction="up">
                <Link
                  href={project.href}
                  className="group relative flex flex-col p-7 rounded-2xl border border-white/5 bg-zinc-950 hover:border-white/15 transition-all duration-500 h-full"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 group-hover:text-white group-hover:bg-white/10 transition-all duration-300">
                      {project.icon}
                    </div>
                    <h3 className="text-lg font-bold text-white">
                      {project.title}
                    </h3>
                  </div>

                  <p className="text-sm text-zinc-400 leading-relaxed mb-5 flex-1">
                    {project.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 text-[11px] font-medium text-zinc-500 rounded-full border border-white/5 bg-white/3"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <ArrowRight
                      size={16}
                      className="text-zinc-600 group-hover:text-white group-hover:translate-x-1 transition-all duration-300"
                    />
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="py-20 md:py-32 px-6 border-t border-white/5">
        <ScrollReveal direction="up">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
              Ready to Build Something Great?
            </h2>
            <p className="text-zinc-400 text-base md:text-lg mb-10 max-w-xl mx-auto">
              Let's talk about your next project. We'll scope it, plan it, and ship it — together.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-white text-black font-semibold text-sm hover:bg-zinc-200 transition-colors duration-300"
            >
              Get in Touch
              <ArrowRight size={16} />
            </Link>
          </div>
        </ScrollReveal>
      </section>

      {/* Footer */}
      <footer className="py-10 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs text-zinc-600">
          <span>TechCo - Building the future</span>
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
        </div>
      </footer>
    </main>
  );
}
