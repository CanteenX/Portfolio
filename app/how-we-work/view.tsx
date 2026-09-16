"use client";

import { useEffect, useState } from "react";
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { ContactCTA } from "@/components/ui/contact-cta";
import { usePublicSettings } from "@/lib/usePublicAPI";
import { getPublicSettings, type PortfolioSettings } from "@/lib/api";
import { resolvePageCopy } from "@/lib/page-copy";
import { EmphasisedHeadline } from "@/components/ui/emphasised-headline";

const FALLBACK_PHASES = [
  {
    id: "discovery",
    n: "01",
    title: "Discovery & Planning",
    description:
      "We dive deep into your vision, map out user flows, define the tech stack, and build a detailed roadmap — so there are zero surprises down the line.",
    accent: "from-blue-500/20 to-blue-500/0",
    dot: "bg-blue-500",
  },
  {
    id: "design",
    n: "02",
    title: "UI / UX Design",
    description:
      "Pixel-perfect interfaces designed for conversion. Prototypes you can click through before a single line of code is written.",
    accent: "from-violet-500/20 to-violet-500/0",
    dot: "bg-violet-500",
  },
  {
    id: "development",
    n: "03",
    title: "Development",
    description:
      "Clean, modular code built with modern frameworks. Weekly demos keep you in the loop with full transparency.",
    accent: "from-white/20 to-white/0",
    dot: "bg-white",
  },
  {
    id: "qa",
    n: "04",
    title: "Testing & QA",
    description:
      "Rigorous automated and manual testing across devices. We break it so your users never have to.",
    accent: "from-amber-500/20 to-amber-500/0",
    dot: "bg-amber-500",
  },
  {
    id: "launch",
    n: "05",
    title: "Launch & Deploy",
    description:
      "Zero-downtime deployments with CI/CD pipelines, monitoring, and rollback strategies baked in from day one.",
    accent: "from-rose-500/20 to-rose-500/0",
    dot: "bg-rose-500",
  },
  {
    id: "scale",
    n: "06",
    title: "Support & Scale",
    description:
      "Post-launch isn't the end — it's the beginning. Ongoing support, performance tuning, and feature iterations.",
    accent: "from-cyan-500/20 to-cyan-500/0",
    dot: "bg-cyan-500",
  },
];

const FALLBACK_PERKS = [
  {
    title: "Lightning Fast Delivery",
    description: "Agile sprints with rapid iteration. We ship MVPs in weeks, not months.",
    icon: "⚡",
    gradient: "from-amber-500/10 via-transparent to-transparent",
    border: "hover:border-amber-500/30",
  },
  {
    title: "Unbreakable Commitment",
    description: "Your deadlines are our deadlines. Transparent updates, no ghosting.",
    icon: "🤝",
    gradient: "from-white/10 via-transparent to-transparent",
    border: "hover:border-white/30",
  },
  {
    title: "Built to Scale",
    description: "Architectures designed for 10x growth from day one.",
    icon: "🚀",
    gradient: "from-violet-500/10 via-transparent to-transparent",
    border: "hover:border-violet-500/30",
  },
];

export default function HowWeWorkView({ initialSettings }: { initialSettings: PortfolioSettings | null }) {
  const { settings } = usePublicSettings(getPublicSettings, initialSettings);

  const phases = settings?.process?.phases?.length ? settings.process.phases : FALLBACK_PHASES;
  const perks = settings?.process?.perks?.length ? settings.process.perks : FALLBACK_PERKS;
  const copy = resolvePageCopy(settings, "process", {
    eyebrow: "/methodology — Protocol",
    title: "Our engineering methodology."
  });
  // Bands only, with their own headings falling back: the section is hidden
  // entirely when nothing is published, so the fallbacks never render alone.
  const engagement = {
    eyebrow: settings?.engagement?.eyebrow?.trim() || "Engagement // Indicative",
    title: settings?.engagement?.title?.trim() || "How engagements are usually shaped.",
    lead: settings?.engagement?.lead?.trim() || "",
    bands: settings?.engagement?.bands ?? [],
    footnote: settings?.engagement?.footnote?.trim() || ""
  };

  // Only what the reader has scrolled to is state. Until then the first phase
  // is highlighted, which keeps working when the phases arrive from the CMS a
  // moment after the first render.
  const [scrolledSegment, setScrolledSegment] = useState<string | null>(null);
  const activeSegment = scrolledSegment ?? phases[0]?.id ?? "";

  useEffect(() => {
    // Observing an id that is not on the page is a no-op, so the engagement
    // section is listed unconditionally rather than threading another dep here.
    const allIds = [...phases.map((p) => p.id), "why-us", "engagement"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setScrolledSegment(entry.target.id);
        });
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );

    allIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [phases]);

  const navItems = [
    ...phases,
    { id: "why-us", n: String(phases.length + 1).padStart(2, "0"), title: "Why Build With Us" },
    ...(engagement.bands.length > 0
      ? [{ id: "engagement", n: String(phases.length + 2).padStart(2, "0"), title: "Engagement" }]
      : [])
  ];

  return (
    <main className="min-h-screen bg-black text-white selection:bg-mint/30">
      <Navbar initialSettings={initialSettings} />

      <div className="pt-32 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <ScrollReveal direction="up">
            <div className="text-mono-tag text-mint mb-4">{copy.eyebrow}</div>
            <h1 className={copy.lead ? "mb-6" : "mb-16"}>
              <EmphasisedHeadline
                text={copy.title}
                word="methodology."
                className="text-zinc-500"
              />
            </h1>
            {copy.lead && (
              <p className="text-zinc-400 text-lg max-w-2xl mb-16">{copy.lead}</p>
            )}
          </ScrollReveal>

          <div className="grid lg:grid-cols-[280px_1fr] gap-12">
            {/* Left sticky tracker */}
            <aside className="hidden lg:block">
              <div className="sticky top-40 border-l border-white/10 space-y-1">
                {navItems.map((p) => (
                  <a
                    key={p.id}
                    href={`#${p.id}`}
                    className={`block py-3 px-6 border-l-2 -ml-px text-base tracking-tight transition-all duration-300 ${
                      activeSegment === p.id
                        ? "border-mint text-mint font-bold translate-x-1"
                        : "border-transparent text-zinc-500 hover:text-zinc-300"
                    }`}
                  >
                    <span className="font-mono text-sm mr-3 opacity-50">{p.n}</span>
                    {p.title.toUpperCase()}
                  </a>
                ))}
              </div>
            </aside>

            {/* Right content flow */}
            <div className="space-y-32 mb-32">
              <div className="relative">
                {/* Vertical Line */}
                <div className="absolute left-6 md:left-[2.75rem] top-0 bottom-0 w-px bg-gradient-to-b from-white/20 via-white/10 to-transparent" />

                <div className="space-y-24">
                  {phases.map((item, index) => (
                    <section
                      key={item.id}
                      id={item.id}
                      className="relative pl-16 md:pl-24 scroll-mt-40"
                    >
                      {/* Active Indicator on line */}
                      <div className="absolute left-6 md:left-[2.75rem] -translate-x-1/2 z-10 transition-transform duration-500">
                        <div className={`w-4 h-4 rounded-full ${item.dot} ring-4 ring-black shadow-[0_0_15px_rgba(255,255,255,0.1)]`} />
                      </div>

                      <ScrollReveal direction={index % 2 === 0 ? "left" : "right"}>
                        <div className="relative group p-8 md:p-12 rounded-[2rem] border border-white/5 bg-zinc-950 hover:border-white/10 transition-all duration-700 overflow-hidden">
                          <div className={`absolute inset-0 bg-gradient-to-br ${item.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />

                          <div className="relative">
                            <span className="text-sm font-bold text-zinc-600 tracking-widest uppercase mb-4 block">{`Step ${item.n} // Status: Operational`}</span>
                            <h2 className="text-3xl md:text-4xl font-bold mb-6">{item.title}</h2>
                            <p className="text-lg text-zinc-400 leading-relaxed max-w-2xl">{item.description}</p>
                          </div>
                        </div>
                      </ScrollReveal>
                    </section>
                  ))}
                </div>
              </div>

              {/* Why build with us content */}
              <section id="why-us" className="scroll-mt-40">
                <ScrollReveal direction="up">
                  <div className="text-center mb-16">
                    <h2>Why Build With Us</h2>
                    <p className="text-zinc-500">Battle-tested commitment to excellence.</p>
                  </div>

                  <div className="grid md:grid-cols-3 gap-5">
                    {perks.map((perk, i) => (
                      <div key={i} className={`p-8 bg-zinc-900/40 border border-white/5 rounded-3xl group transition-all duration-500 ${perk.border}`}>
                        <h3 className="text-xl font-bold mb-3">{perk.title}</h3>
                        <p className="text-base text-zinc-500 leading-relaxed">{perk.description}</p>
                      </div>
                    ))}
                  </div>
                </ScrollReveal>
              </section>

              {/*
                Indicative commercials. Rendered only when the owner has
                published bands — an engagement section with no numbers in it
                would answer the one question it exists to answer with nothing.
              */}
              {engagement.bands.length > 0 && (
                <section id="engagement" className="scroll-mt-40">
                  <ScrollReveal direction="up">
                    <div className="mb-10">
                      <div className="text-mono-tag text-mint mb-4">{engagement.eyebrow}</div>
                      <h2 className="mb-4">{engagement.title}</h2>
                      {engagement.lead && (
                        <p className="text-zinc-400 text-lg max-w-2xl leading-relaxed">
                          {engagement.lead}
                        </p>
                      )}
                    </div>

                    <dl className="border-t hairline">
                      {engagement.bands.map((band, i) => (
                        <div
                          key={`${band.name}-${i}`}
                          className="grid md:grid-cols-[1fr_auto] gap-2 md:gap-10 items-baseline py-6 border-b hairline"
                        >
                          <div>
                            <dt className="text-xl tracking-tight text-white">{band.name}</dt>
                            {band.description && (
                              <dd className="text-zinc-500 mt-1 max-w-xl leading-relaxed">
                                {band.description}
                              </dd>
                            )}
                          </div>
                          <dd className="font-mono text-sm text-zinc-300 md:text-right whitespace-nowrap">
                            {band.range}
                            {band.range && band.duration ? (
                              <span className="text-zinc-600"> · </span>
                            ) : null}
                            <span className="text-zinc-500">{band.duration}</span>
                          </dd>
                        </div>
                      ))}
                    </dl>

                    {engagement.footnote && (
                      <p className="text-sm text-zinc-500 mt-6 max-w-2xl">{engagement.footnote}</p>
                    )}
                  </ScrollReveal>
                </section>
              )}
            </div>
          </div>
        </div>
      </div>

      <ContactCTA initialSettings={initialSettings} />
      <Footer initialSettings={initialSettings} />
    </main>
  );
}
