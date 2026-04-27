"use client";

import { Navbar } from "@/components/ui/navbar";
import { AiModelsList } from "@/components/ui/ai-models-preview";
import FeatureSection from "@/components/ui/stack-feature-section";
import { SplineSceneBasic } from "@/components/ui/spline-scene-basic";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import FeatureCarousel from "@/components/ui/feature-carousel";
import { SmoothScroll } from "@/components/ui/smooth-scroll";
import { Languages, ShoppingCart, HeartPulse, Landmark, ArrowRight } from "lucide-react";
import Link from "next/link";
import { ContactCTA } from "@/components/ui/contact-cta";
import { Footer } from "@/components/ui/footer";

import { useCmsContent } from "@/lib/hooks/use-cms-content";
import { useProjects } from "@/lib/hooks/use-projects";

const DEFAULT_TECH = [
  "AWS", "REACT_NATIVE", "NODE.JS", "GRAPHQL", "POSTGRESQL",
  "TYPESCRIPT", "KUBERNETES", "NEXT.JS", "SWIFT", "KOTLIN",
  "TERRAFORM", "REDIS",
];


export default function Home() {
  const { getSection, isLoading: cmsLoading } = useCmsContent("home");
  const { projects: allProjects, isLoading: projectsLoading } = useProjects();

  const heroData = getSection("hero");
  const stackData = getSection("stack");
  const servicesIntro = getSection("services-intro");
  const aiIntro = getSection("ai-intro");

  const techStack = stackData?.technologies || DEFAULT_TECH;
  const projects = allProjects.slice(0, 4);

  return (
    <SmoothScroll>
    <main className="min-h-screen w-full overflow-x-hidden bg-black text-white selection:bg-mint/30">
      <Navbar />

      {/* Hero Section */}
      <section id="hero" className="w-full">
        <SplineSceneBasic data={heroData} />
      </section>

      {/* Validated Stack Banner */}
      <section className="border-y border-white/5 bg-zinc-950/40 relative overflow-hidden">
        <div className="max-w-7xl mx-auto py-8 px-6 flex flex-col md:flex-row items-center gap-8">
          <div className="shrink-0 text-mono-tag text-zinc-500">{stackData?.label || "Validated_Stack //"}</div>
          <div className="flex-1 overflow-hidden relative w-full">
            <div className="flex gap-12 items-center whitespace-nowrap animate-marquee">
              {[...techStack, ...techStack].map((t, i) => (
                <span key={i} className="text-zinc-500 font-mono text-xs tracking-tighter flex items-center gap-2">
                  <span className="size-1 bg-mint inline-block" />
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
        
        {/* Marquee Animation */}
        <style jsx global>{`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            animation: marquee 30s linear infinite;
          }
        `}</style>
      </section>

      {/* Projects Section - Recent Deployments Design */}
      <section id="projects" className="py-16 px-6 bg-black">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal direction="up">
            <div className="flex items-end justify-between mb-12">
              <div>
                <div className="text-mono-tag text-mint mb-3">Our_Projects //</div>
                <h2 className="tracking-tight lowercase">Recent deployments.</h2>
              </div>
              <Link href="/work" className="hidden md:inline-block text-mono-tag text-zinc-500 hover:text-mint transition-colors">
                View all deployments →
              </Link>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-px bg-white/5 border border-white/10 overflow-hidden rounded-3xl">
            {projects.map((project, index) => (
              <ScrollReveal key={index} delay={index * 0.1} direction="up">
                <Link
                  href={project.href}
                  className="group relative block aspect-[16/10] overflow-hidden bg-zinc-900"
                >
                  {/* Related background image */}
                  <img
                    src={project.image}
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover transition-all duration-700 opacity-40 group-hover:opacity-60 group-hover:scale-105"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                  
                  {/* Content Overlay */}
                  <div className="absolute inset-0 p-8 flex flex-col justify-between">
                    <div>
                      {/* Project Title in Green on Top */}
                      <div className="text-mono-tag text-mint font-bold tracking-widest drop-shadow-sm mb-4">
                        {project.eyebrow}
                      </div>
                      <h3 className="text-3xl font-bold tracking-tighter mb-2 text-mint">
                        {project.title}
                      </h3>
                      <p className="text-zinc-400 text-sm max-w-sm font-light leading-relaxed">
                        {project.description}
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-2 text-mono-tag text-mint opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                      View Project <ArrowRight className="w-3 h-3" />
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 px-4 bg-zinc-950/20 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal direction="up">
            <div className="text-center mb-16">
              <h2 className="mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 lowercase">
                {servicesIntro?.title || "Services We Offer."}
              </h2>
              <p className="text-zinc-500 max-w-2xl mx-auto">
                {servicesIntro?.subtitle || "Comprehensive tech solutions tailored to elevate your business to new heights"}
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
              <h2 className="mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 lowercase">
                {aiIntro?.title || "AI & LLM Services."}
              </h2>
              <p className="text-zinc-500 max-w-2xl mx-auto">
                {aiIntro?.subtitle || "Custom AI solutions powered by large language models to automate, engage, and scale your business"}
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2} direction="up">
            <AiModelsList />
          </ScrollReveal>
        </div>
      </section>

      <ContactCTA />
      {/* Footer */}
      <Footer />
    </main>
    </SmoothScroll>
  );
}
