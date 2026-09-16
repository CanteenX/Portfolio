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
import { MetricsStrip, ClientLogoWall, Testimonials } from "@/components/ui/social-proof";
import { usePublicSettings } from "@/lib/usePublicAPI";
import {
  getPublicSettings,
  type ApiClientLogo,
  type ApiMetric,
  type ApiService,
  type ApiTestimonial,
  type PortfolioSettings
} from "@/lib/api";

/**
 * Featured work shipped with the page, used when the CMS has none.
 *
 * Every entry here must point at a route that exists. The list previously led
 * with "We Converse App" linking to /projects/we-converse, which existed only
 * in the invented fallback dataset — so the homepage's first card was a 404 the
 * moment the CMS was empty.
 */
const FALLBACK_PROJECTS = [
  {
    title: "AI Call Agent",
    description:
      "Ultra-low latency voice AI for hospital appointment booking, patient database lookup, and intelligent scheduling.",
    href: "/projects/ai-call-bot-hospital",
    image: "/projects/ai-call-bot-hospital/card.jpg",
    eyebrow: "Deployment 01 // Voice AI",
  },
  {
    title: "AI Attendance App",
    description:
      "AI-powered attendance management for Vadodara Municipal Corporation — 8,000+ employees marking daily attendance with AI verification and geo-fencing.",
    href: "/projects/ai-attendance",
    // Only ai-call-bot-hospital has bespoke art under public/projects; these
    // two reuse the hero image their own case study renders.
    image: "https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?auto=format&fit=crop&w=1600&q=80",
    eyebrow: "Deployment 02 // GovTech",
  },
  {
    title: "Business Meet App",
    description:
      "AI-powered networking platform connecting professionals with intelligent recommendations for profiles, connections, meetings, and MoMs.",
    href: "/projects/business-meet",
    image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=1600&q=80",
    eyebrow: "Deployment 03 // AI Networking",
  },
];

export default function HomeView({
  initialSettings,
  initialServices = [],
  initialTestimonials = [],
  initialClientLogos = [],
  initialMetrics = [],
}: {
  initialSettings: PortfolioSettings | null;
  initialServices?: ApiService[];
  initialTestimonials?: ApiTestimonial[];
  initialClientLogos?: ApiClientLogo[];
  initialMetrics?: ApiMetric[];
}) {
  // Seeded from the server render, so the first HTML a crawler sees already
  // carries CMS copy instead of the shipped constants.
  const { settings } = usePublicSettings(getPublicSettings, initialSettings);

  const featuredProjects = settings?.hero?.featuredProjects?.length
    ? settings.hero.featuredProjects
    : FALLBACK_PROJECTS;

  return (
    <SmoothScroll>
    <main className="min-h-screen w-full overflow-x-hidden bg-black text-white selection:bg-mint/30">
      <ScrollProgress />
      <Navbar initialSettings={initialSettings} />

      {/* Hero Section */}
      <section id="hero" className="w-full">
        <SplineSceneBasic hero={settings?.hero} />
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
              <ProjectCard key={project.href ?? index} project={project} index={index} />
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
            <FeatureCarousel services={initialServices} />
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
          <StackFeatureSection techMarquee={settings?.techMarquee} />
        </ScrollReveal>
      </section>

      {/* Each of these renders nothing until real content is published, so
          they add no empty scaffolding to the page in the meantime. */}
      <MetricsStrip metrics={initialMetrics} />
      <ClientLogoWall logos={initialClientLogos} />
      <Testimonials testimonials={initialTestimonials} />

      <ContactCTA />
      <Footer initialSettings={initialSettings} />
    </main>
    </SmoothScroll>
  );
}
