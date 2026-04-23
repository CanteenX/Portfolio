"use client";

import { Navbar } from "@/components/ui/navbar";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { SmoothScroll } from "@/components/ui/smooth-scroll";
import { motion } from "framer-motion";
import { Eye, Target, Users, Zap, Shield, Globe, ArrowRight } from "lucide-react";
import { GlobePulse } from "@/components/ui/cobe-globe-pulse";

export default function AboutPage() {
  return (
    <SmoothScroll>
      <main className="min-h-screen w-full bg-black text-white selection:bg-white selection:text-black">
        <Navbar />

        {/* Hero Section */}
        <section className="relative pt-32 pb-20 px-4 overflow-hidden">
          <div className="max-w-7xl mx-auto relative z-10">
            <ScrollReveal direction="up" duration={1}>
              <div className="text-center mb-16">
                <h1 className="text-7xl md:text-9xl font-bold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-500">
                  OUR STORY
                </h1>
                <p className="text-xl md:text-2xl text-zinc-400 max-w-3xl mx-auto font-light leading-relaxed">
                  We are a collective of visionaries, engineers, and designers dedicated to pushing the boundaries of what's possible in the digital realm.
                </p>
              </div>
            </ScrollReveal>

            {/* Hero Image Gap */}
            <ScrollReveal direction="up" delay={0.2}>
              <div className="w-full aspect-[21/9] bg-zinc-900 border border-white/5 rounded-3xl flex items-center justify-center group overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-zinc-900 via-transparent to-zinc-800 opacity-50" />
                <span className="text-zinc-700 font-mono tracking-widest text-sm uppercase group-hover:text-zinc-500 transition-colors">
                  [ Main Visual Placeholder ]
                </span>
                <div className="absolute bottom-6 right-6 w-12 h-12 border-r border-b border-white/20" />
                <div className="absolute top-6 left-6 w-12 h-12 border-l border-t border-white/20" />
              </div>
            </ScrollReveal>
          </div>
          
          {/* Background Ambient Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0,transparent_70%)] pointer-events-none" />
        </section>

        {/* Vision & Mission */}
        <section className="py-24 px-4 border-t border-white/5">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
            <ScrollReveal direction="left">
              <div className="p-10 rounded-3xl bg-zinc-950 border border-white/5 hover:border-white/10 transition-colors h-full flex flex-col">
                <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center mb-8">
                  <Eye className="text-black w-7 h-7" />
                </div>
                <h2 className="text-4xl font-bold mb-6">Our Vision</h2>
                <p className="text-zinc-400 text-lg leading-relaxed flex-grow">
                  To be the catalyst for the next generation of digital experiences, where AI and human creativity merge to solve the world's most complex challenges. We see a future where technology is invisible, intuitive, and immensely powerful.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={0.1}>
              <div className="p-10 rounded-3xl bg-zinc-950 border border-white/5 hover:border-white/10 transition-colors h-full flex flex-col">
                <div className="w-14 h-14 rounded-2xl bg-zinc-800 flex items-center justify-center mb-8 border border-white/10">
                  <Target className="text-white w-7 h-7" />
                </div>
                <h2 className="text-4xl font-bold mb-6">Our Mission</h2>
                <p className="text-zinc-400 text-lg leading-relaxed flex-grow">
                  Our mission is to empower businesses with cutting-edge full-stack solutions and intelligent AI systems. We transform ideas into robust, scalable, and beautiful realities that drive growth and deliver exceptional value.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-24 px-4 bg-zinc-950/50">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal direction="up">
              <div className="mb-16">
                <h2 className="text-5xl font-bold tracking-tight mb-4">Core Values</h2>
                <div className="w-20 h-1 bg-white" />
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { icon: Zap, title: "Innovation", desc: "Constant exploration of emerging technologies to stay ahead of the curve." },
                { icon: Shield, title: "Integrity", desc: "Unwavering commitment to security, privacy, and ethical development." },
                { icon: Users, title: "Collaboration", desc: "Working as an extension of your team to ensure mutual success." },
                { icon: Globe, title: "Impact", desc: "Building solutions that make a meaningful difference on a global scale." },
                { icon: motion.div, title: "Excellence", desc: "Meticulous attention to detail in every line of code and every pixel." },
                { icon: ArrowRight, title: "Agility", desc: "Rapid adaptation to evolving requirements and market dynamics." },
              ].map((value, idx) => (
                <ScrollReveal key={idx} delay={idx * 0.1} direction="up">
                  <div className="p-8 rounded-2xl border border-white/5 bg-black hover:bg-zinc-900 transition-all duration-300 group">
                    <div className="mb-6 group-hover:scale-110 transition-transform duration-300 inline-block">
                      {typeof value.icon === 'function' ? <value.icon className="w-8 h-8 text-zinc-400" /> : <value.icon className="w-8 h-8 text-zinc-400" />}
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                    <p className="text-zinc-500 leading-relaxed">{value.desc}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Team Gap Section */}
        <section className="py-24 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <ScrollReveal direction="up">
              <h2 className="text-4xl md:text-6xl font-bold mb-12">The Team Behind the Tech</h2>
            </ScrollReveal>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {[
                { name: "Alex Rivera", role: "Founder & CEO", linkedIn: "#" },
                { name: "Sarah Chen", role: "CTO & Co-Founder", linkedIn: "#" },
                { name: "Marcus Thorne", role: "Lead Designer", linkedIn: "#" },
              ].map((member, i) => (
                <ScrollReveal key={i} delay={i * 0.1} direction="up">
                  <div className="group relative aspect-[4/5] bg-zinc-900 rounded-3xl border border-white/5 overflow-hidden transition-all duration-500 hover:border-emerald-500/30 hover:shadow-[0_0_50px_-12px_rgba(16,185,129,0.2)]">
                    {/* Placeholder for Photo */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-zinc-800 font-mono text-[10px] uppercase tracking-widest">[ Photo Gap ]</span>
                    </div>

                    {/* Hover Overlay - Gradient as in image */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out flex flex-col justify-end p-8 bg-gradient-to-t from-emerald-600/90 via-emerald-900/40 to-transparent translate-y-4 group-hover:translate-y-0">
                      <div className="flex justify-between items-end">
                        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                          <h3 className="text-2xl font-bold text-white mb-1">{member.name}</h3>
                          <p className="text-emerald-100/80 text-sm font-medium">{member.role}</p>
                        </div>
                        <a 
                          href={member.linkedIn}
                          className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-emerald-700 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-150"
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                          </svg>
                        </a>
                      </div>
                    </div>
                    
                    {/* Subtle corner accent */}
                    <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-zinc-800 group-hover:bg-emerald-400 transition-colors duration-500" />
                  </div>
                </ScrollReveal>
              ))}
            </div>

            
            {/* Interactive Stats Section (Replaces Group Photo) */}
            <div className="mt-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <ScrollReveal direction="left">
                <div className="text-left">
                  <h2 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight">Our Global Impact</h2>
                  <p className="text-zinc-400 text-lg mb-12 max-w-xl">
                    We've built solutions for visionary companies across 4 continents. Our code powers businesses from Silicon Valley to Singapore, maintaining a 99.9% uptime and processing millions of requests daily.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-10">
                    <div className="space-y-2">
                      <h4 className="text-5xl font-bold text-white">50+</h4>
                      <p className="text-emerald-500 font-mono text-xs uppercase tracking-widest">Projects Delivered</p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-5xl font-bold text-white">12+</h4>
                      <p className="text-emerald-500 font-mono text-xs uppercase tracking-widest">Global Partners</p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-5xl font-bold text-white">98%</h4>
                      <p className="text-emerald-500 font-mono text-xs uppercase tracking-widest">Client Satisfaction</p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-5xl font-bold text-white">24/7</h4>
                      <p className="text-emerald-500 font-mono text-xs uppercase tracking-widest">Expert Support</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="right" delay={0.2}>
                <div className="relative aspect-square max-w-lg mx-auto bg-zinc-950 rounded-full border border-white/5 p-4 overflow-hidden group">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.1)_0,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                  <GlobePulse className="w-full h-full" />
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 px-4 border-t border-white/5">
          <div className="max-w-4xl mx-auto text-center">
            <ScrollReveal direction="up">
              <h2 className="text-5xl md:text-7xl font-bold mb-8">Let's create something extraordinary.</h2>
              <p className="text-zinc-400 text-lg mb-12 max-w-2xl mx-auto">
                Ready to transform your vision into reality? Our team is standing by to help you navigate the future of technology.
              </p>
              <a 
                href="/contact" 
                className="inline-flex items-center gap-3 px-10 py-5 bg-white text-black rounded-full font-bold text-lg hover:scale-105 active:scale-95 transition-all"
              >
                Get in Touch
                <ArrowRight className="w-5 h-5" />
              </a>
            </ScrollReveal>
          </div>
        </section>

        {/* Footer Link consistency */}
        <footer className="py-16 px-4 border-t border-white/10 bg-black">
          <div className="max-w-7xl mx-auto text-center">
            <p className="text-zinc-500 mb-8 text-sm">
              © 2024 TechCo. All rights reserved. Monochromatic Excellence.
            </p>
          </div>
        </footer>
      </main>
    </SmoothScroll>
  );
}
