"use client";

import { Navbar } from "@/components/ui/navbar";
import GlassCard from "@/components/ui/glass-card";
import { AiModelsList } from "@/components/ui/ai-models-preview";
import FeatureSection from "@/components/ui/stack-feature-section";
import { SplineSceneBasic } from "@/components/ui/spline-scene-basic";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import FeatureCarousel from "@/components/ui/feature-carousel";
import { SmoothScroll } from "@/components/ui/smooth-scroll";
import { Languages, ShoppingCart, HeartPulse, Landmark } from "lucide-react";

import { Footer } from "@/components/ui/footer";

export default function Home() {
  // Sample project data
  const projects = [
    {
      title: "We Converse App",
      description: "Meeting app with live translation in any language and automatic minutes of meeting generation.",
      href: "/projects/we-converse",
      icon: <Languages className="w-5 h-5 text-black" />,
    },
    {
      title: "E-Commerce Solution",
      description: "Full-stack e-commerce platform with AI-driven personalization and recommendations.",
      icon: <ShoppingCart className="w-5 h-5 text-black" />,
    },
    {
      title: "Healthcare Dashboard",
      description: "HIPAA-compliant patient management system with intelligent workflow automation.",
      icon: <HeartPulse className="w-5 h-5 text-black" />,
    },
    {
      title: "FinTech App",
      description: "Secure financial application with AI fraud detection and blockchain integration.",
      icon: <Landmark className="w-5 h-5 text-black" />,
    },
  ];

  return (
    <SmoothScroll>
    <main className="min-h-screen w-full overflow-x-hidden bg-black">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section with 3D Robot */}
      <section id="hero" className="min-h-screen pt-16 px-4 bg-black flex items-center justify-center">
        <ScrollReveal direction="up" duration={1.2}>
          <div className="max-w-7xl mx-auto">
            <SplineSceneBasic />
          </div>
        </ScrollReveal>
      </section>

      {/* Projects Section with Glass Cards */}
      <section id="projects" className="py-32 px-4 bg-gradient-to-b from-black via-zinc-950 to-black">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal direction="up">
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                Our Projects
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Transforming ideas into reality with cutting-edge technology and innovative solutions
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
            {projects.map((project, index) => (
              <ScrollReveal key={index} delay={index * 0.1} direction="up">
                <GlassCard
                  title={project.title}
                  description={project.description}
                  href={project.href}
                  icon={project.icon}
                />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Services We Offer Section */}
      <section id="services" className="py-32 px-4 bg-linear-to-b from-black via-zinc-900 to-black">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal direction="up">
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-linear-to-r from-white to-gray-400">
                Services We Offer
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Comprehensive tech solutions tailored to elevate your business to new heights
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2} direction="up">
            <FeatureCarousel />
          </ScrollReveal>
        </div>
      </section>

      {/* AI LLM Services Section */}
      <section id="ai-solutions" className="py-32 px-4 bg-gradient-to-b from-black via-zinc-900 to-black">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal direction="up">
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                AI &amp; LLM Services
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Custom AI solutions powered by large language models to automate, engage, and scale your business
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2} direction="up">
            <AiModelsList />
          </ScrollReveal>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section id="tech-stack" className="py-32 px-4 bg-gradient-to-b from-black via-zinc-950 to-black">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal direction="up">
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                Technology Stack
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Building with modern frameworks and tools for scalable, performant applications
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2} direction="up">
            <FeatureSection />
          </ScrollReveal>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
    </SmoothScroll>
  );
}
