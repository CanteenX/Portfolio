"use client";

import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { SmoothScroll } from "@/components/ui/smooth-scroll";
import { ContactCTA } from "@/components/ui/contact-cta";
import Link from "next/link";
import { usePublicSettings } from "@/lib/usePublicAPI";
import { getPublicSettings } from "@/lib/api";

const FALLBACK_SERVICES = [
  {
    id: "01",
    title: "App Development",
    description:
      "Native and cross-platform mobile apps built with React Native, Swift, and Kotlin. From MVP to production-grade apps with real-world scale.",
    tags: ["React Native", "Swift", "Kotlin", "Expo"],
  },
  {
    id: "02",
    title: "Website Building",
    description:
      "Blazing-fast, SEO-optimised websites and web apps. Built on Next.js and React with pixel-perfect design and performance scores above 95.",
    tags: ["Next.js", "React", "TypeScript", "TailwindCSS"],
  },
  {
    id: "03",
    title: "CRM & Admin Panels",
    description:
      "Custom CRM dashboards and internal tools with role-based access, analytics, and full backend integration tailored to your workflow.",
    tags: ["React", "Node.js", "PostgreSQL", "RBAC"],
  },
  {
    id: "04",
    title: "SEO",
    description:
      "Technical SEO audits, structured data, Core Web Vitals optimisation, and content strategy to move your pages to the top of search results.",
    tags: ["Technical SEO", "Core Web Vitals", "Schema Markup"],
  },
  {
    id: "05",
    title: "Google & Meta Ads",
    description:
      "Performance marketing campaigns built on data. Audience segmentation, A/B testing, retargeting funnels, and ROAS-focused optimisation.",
    tags: ["Google Ads", "Meta Ads", "Analytics", "A/B Testing"],
  },
  {
    id: "06",
    title: "Tech Consultancy",
    description:
      "Architecture reviews, stack selection, team augmentation, and roadmap planning. Senior engineers available for advisory engagements.",
    tags: ["Architecture", "Cloud", "Strategy", "Roadmap"],
  },
  {
    id: "07",
    title: "UI/UX Design",
    description:
      "End-to-end product design — user research, wireframes, high-fidelity Figma prototypes, and design systems for development handoff.",
    tags: ["Figma", "Design Systems", "Prototyping", "User Research"],
  },
  {
    id: "08",
    title: "AI Solutions",
    description:
      "Custom AI integrations using GPT, Claude, and open-source LLMs. Chatbots, automation pipelines, document processing, and RAG systems.",
    tags: ["LLMs", "RAG", "Claude API", "Automation"],
  },
];

export default function ServicesPage() {
  const { settings } = usePublicSettings(getPublicSettings);

  const services =
    settings?.services?.length
      ? settings.services.map((s: string, i: number) => ({
          id: String(i + 1).padStart(2, "0"),
          title: s,
          description: FALLBACK_SERVICES.find((f) => f.title === s)?.description ?? "",
          tags: FALLBACK_SERVICES.find((f) => f.title === s)?.tags ?? [],
        }))
      : FALLBACK_SERVICES;

  return (
    <SmoothScroll>
      <main className="min-h-screen w-full overflow-x-hidden bg-black text-white selection:bg-mint/30">
        <Navbar />

        {/* Hero */}
        <section className="pt-40 pb-20 px-6">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal direction="up">
              <div className="text-mono-tag text-mint mb-4">Our_Services //</div>
              <h1 className="mb-6">
                What we{" "}
                <span className="text-white italic">build.</span>
              </h1>
              <p className="text-zinc-400 max-w-2xl text-lg md:text-xl leading-relaxed font-light">
                From zero to production. We cover the full stack — design,
                engineering, cloud, and growth — so you don't have to stitch
                together multiple agencies.
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* Services Grid */}
        <section className="px-6 pb-24">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-px bg-white/5 border border-white/10 rounded-3xl overflow-hidden">
              {services.map((service, index) => (
                <ScrollReveal key={service.id} delay={index * 0.05} direction="up">
                  <div className="group bg-black p-10 flex flex-col gap-6 hover:bg-zinc-950 transition-colors duration-300 h-full">
                    <div className="flex items-start justify-between">
                      <span className="font-mono text-4xl font-light text-zinc-700 group-hover:text-zinc-500 transition-colors">
                        {service.id}
                      </span>
                      <span className="size-2 bg-mint opacity-0 group-hover:opacity-100 transition-opacity mt-2" />
                    </div>

                    <div>
                      <h3 className="text-2xl font-semibold tracking-tight mb-3 group-hover:text-mint transition-colors">
                        {service.title}
                      </h3>
                      {service.description && (
                        <p className="text-zinc-400 text-base leading-relaxed font-light">
                          {service.description}
                        </p>
                      )}
                    </div>

                    {service.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-auto pt-4">
                        {service.tags.map((tag) => (
                          <span
                            key={tag}
                            className="font-mono text-[10px] tracking-widest uppercase text-zinc-500 border border-white/10 px-3 py-1 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>



        <ContactCTA />
        <Footer />
      </main>
    </SmoothScroll>
  );
}
