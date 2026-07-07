"use client";

import { Navbar } from "@/components/ui/navbar";
import { AiModelsList } from "@/components/ui/ai-models-preview";
import { SplineSceneBasic } from "@/components/ui/spline-scene-basic";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import FeatureCarousel from "@/components/ui/feature-carousel";
import StackFeatureSection from "@/components/ui/stack-feature-section";
import { SmoothScroll } from "@/components/ui/smooth-scroll";
import Link from "next/link";
import { ContactCTA } from "@/components/ui/contact-cta";
import { ProjectCard } from "@/components/ui/project-card";
import { Footer } from "@/components/ui/footer";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { usePublicSettings } from "@/lib/usePublicAPI";
import { getPublicSettings } from "@/lib/api";

const FALLBACK_PROJECTS = [
  {
    title: "We Converse App",
    description: "Meeting app with live translation in any language and automatic minutes of meeting generation.",
    href: "/projects/we-converse",
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=1200&q=80",
    eyebrow: "Deployment 01 // Mobile",
  },
  {
    title: "E-Commerce Solution",
    description: "Full-stack e-commerce platform with AI-driven personalization and recommendations.",
    href: "#",
    image: "https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&w=1200&q=80",
    eyebrow: "Deployment 02 // Web",
  },
  {
    title: "Healthcare Dashboard",
    description: "HIPAA-compliant patient management system with intelligent workflow automation.",
    href: "#",
    image: "https://images.unsplash.com/photo-1576091160550-2173dad99978?auto=format&fit=crop&w=1200&q=80",
    eyebrow: "Deployment 03 // Dashboard",
  },
  {
    title: "FinTech App",
    description: "Secure financial application with AI fraud detection and blockchain integration.",
    href: "#",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    eyebrow: "Deployment 04 // Fintech",
  },
];

export default function Home() {
  const { settings } = usePublicSettings(getPublicSettings);

  const featuredProjects = settings?.hero?.featuredProjects?.length
    ? settings.hero.featuredProjects
    : FALLBACK_PROJECTS;

  return (
    <SmoothScroll>
    <main className="min-h-screen w-full overflow-x-hidden bg-black text-white selection:bg-mint/30">
      <ScrollProgress />
      <Navbar />

      {/* Hero Section */}
      <section id="hero" className="w-full">
        <SplineSceneBasic />
      </section>

      {/* Projects Section - Recent Deployments Design */}
      <section id="projects" className="py-16 px-6 bg-black">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal direction="up">
            <div className="flex items-end justify-between mb-12">
              <div>
                <div className="text-xs font-mono tracking-[0.2em] uppercase text-mint mb-3 font-semibold">Our_Projects //</div>
                <h2 className="tracking-tight">Recent deployments.</h2>
              </div>
              <Link href="/work" className="hidden md:inline-block text-mono-tag text-zinc-500 hover:text-mint transition-colors">
                View all deployments →
              </Link>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-px bg-white/5 border border-white/10 overflow-hidden rounded-3xl">
            {featuredProjects.map((project, index) => (
              <ProjectCard key={index} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 px-4 bg-zinc-950/20 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal direction="up">
            <div className="text-center mb-16">
              <h2 className="mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                Services We Offer.
              </h2>
              <p className="text-zinc-500 max-w-2xl mx-auto">
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
      <section id="ai-solutions" className="py-16 px-4 bg-zinc-950/20 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal direction="up">
            <div className="text-center mb-16">
              <h2 className="mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                AI &amp; LLM Services.
              </h2>
              <p className="text-zinc-500 max-w-2xl mx-auto">
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
      <section id="tech-stack" className="px-4 bg-black border-t border-white/5">
        <ScrollReveal direction="up">
          <StackFeatureSection />
        </ScrollReveal>
      </section>

      <ContactCTA />
      <Footer />
    </main>
    </SmoothScroll>
  );
}
