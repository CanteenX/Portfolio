"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  getPublicProjectBySlug,
  getPublicTechStacks,
  resolveImageUrl,
  type ApiProject,
  type ApiTechStack,
  type RoiItem,
  type PortfolioSettings
} from "@/lib/api";
import { TECH_ICONS } from "@/lib/tech-icons";
import { getProject, toApiProject } from "@/lib/projects";
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import { SmoothScroll } from "@/components/ui/smooth-scroll";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { ContactCTA } from "@/components/ui/contact-cta";
import {
  ArrowLeft,
  Clock,
  TrendingUp,
  Star,
  Building2,
  Zap,
  CheckCircle2,
  Shield,
  Globe,
  Layers,
  Award,
  Users,
  BarChart,
  DollarSign,
  Timer,
  Target,
  Rocket,
  Code2,
  Cpu,
  ScanFace,
  MapPin,
  Activity,
  LayoutDashboard,
  Smartphone,
  Database,
  Calendar,
  HeartPulse,
  Phone,
  Sparkles,
  Plane,
  MessageSquare,
  Search,
  Bell,
  Lock,
  Gauge,
} from "lucide-react";

const ICON_MAP: Record<string, React.ElementType> = {
  Clock, TrendingUp, Star, Building2, Zap, CheckCircle2, Shield, Globe,
  Layers, Award, Users, BarChart, DollarSign, Timer, Target, Rocket, Code2, Cpu,
  ScanFace, MapPin, Activity, LayoutDashboard, Smartphone, Database, Calendar,
  HeartPulse, Phone, Sparkles, Plane, MessageSquare, Search, Bell, Lock, Gauge,
};

/**
 * Accent colours the CMS may pick from, by name.
 *
 * A fixed map rather than a free-text class, because Tailwind compiles the
 * classes it can see in source — a class assembled from a database string
 * (`text-${accent}-400`) is not in the output CSS and silently renders as no
 * colour at all. Listing them here is also what keeps arbitrary CSS from the
 * database out of the page.
 */
const ACCENT_MAP: Record<string, string> = {
  blue: "text-blue-400",
  emerald: "text-emerald-400",
  rose: "text-rose-400",
  amber: "text-amber-400",
  violet: "text-violet-400",
  purple: "text-purple-400",
  indigo: "text-indigo-400",
  cyan: "text-cyan-400",
  orange: "text-orange-400",
  pink: "text-pink-400",
  lime: "text-lime-400",
  sky: "text-sky-400",
  neutral: "text-neutral-200",
};

const DEFAULT_ACCENT = "text-neutral-200";

/**
 * Per-section copy: the project's own wording when it has one, the generic
 * wording otherwise.
 *
 * The defaults are exactly the strings this page hardcoded before B-4, so a
 * project with no `sectionHeadings` renders byte-identically to how it did.
 */
function heading(
  project: ApiProject,
  key: keyof NonNullable<ApiProject["sectionHeadings"]>,
  fallback: { eyebrow: string; title: string; lead?: string }
): { eyebrow: string; title: string; lead: string } {
  const custom = project.sectionHeadings?.[key];
  return {
    eyebrow: custom?.eyebrow?.trim() || fallback.eyebrow,
    title: custom?.title?.trim() || fallback.title,
    lead: custom?.lead?.trim() || fallback.lead || "",
  };
}

/**
 * A technology's mark: its brand glyph in its brand colour when the master row
 * names one, the uploaded image next, and a neutral code glyph last.
 *
 * The colour is applied inline because it is a per-brand hex, not one of a
 * handful of theme tokens — React's cyan is not a design decision this site
 * gets to make. It is validated as `#rrggbb` on write, so it cannot carry
 * anything but a colour.
 */
function TechGlyph({ tech }: { tech: ApiTechStack }) {
  // Brand marks first, then the generic set — "EHR API" has no brand glyph but
  // a heart-pulse reads correctly, and that is what the hand-built page used.
  const BrandIcon = tech.icon ? (TECH_ICONS[tech.icon] ?? ICON_MAP[tech.icon]) : undefined;

  if (BrandIcon) {
    return <BrandIcon size={28} style={tech.color ? { color: tech.color } : undefined} />;
  }
  if (tech.image) {
    return (
      <img src={resolveImageUrl(tech.image)} alt={tech.name} className="w-8 h-8 object-contain" />
    );
  }
  return <Code2 className="w-7 h-7 text-neutral-200" />;
}

/**
 * `initialProject` is what the server shell already resolved. It is required in
 * practice — the shell 404s when there is no case study — so the page renders
 * fully on the first paint instead of flashing a spinner, and the copy is in
 * the HTML for crawlers that do not run JavaScript.
 */
export default function ProjectDetailsPage({
  initialProject = null,
  initialSettings = null
}: {
  initialProject?: ApiProject | null;
  // Seeded from the server shell so the nav and footer render CMS copy in the
  // server HTML rather than flashing FALLBACK_BRAND after hydration. These are
  // the site's highest-value URLs; a crawler must not read the fallback nav.
  initialSettings?: PortfolioSettings | null;
}) {
  const { slug } = useParams();
  const [project, setProject] = useState<ApiProject | null | undefined>(
    initialProject ?? undefined
  );
  const [techStackMaster, setTechStackMaster] = useState<ApiTechStack[]>([]);
  const [activeScreen, setActiveScreen] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    // Tech stack masters carry the brand glyphs and are not part of the project
    // document, so they are still fetched here. The project itself is re-fetched
    // only when the server did not supply one.
    getPublicTechStacks()
      .then(setTechStackMaster)
      .catch(() => setTechStackMaster([]));

    if (initialProject) return;

    getPublicProjectBySlug(slug as string)
      .then((data) => {
        const bundled = getProject(slug as string);
        setProject(data ?? (bundled ? toApiProject(bundled) : null));
      })
      .catch(() => {
        const bundled = getProject(slug as string);
        setProject(bundled ? toApiProject(bundled) : null);
      });
  }, [slug, initialProject]);

  useEffect(() => {
    if (!project || project.screens.length === 0 || isPaused) return;
    const interval = setInterval(() => {
      setActiveScreen((prev) => (prev + 1) % project.screens.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isPaused, project]);

  if (project === undefined) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
        <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
        <Link href="/work" className="text-white hover:underline">Back to Work</Link>
      </div>
    );
  }

  const matchedTechStacks = project.techStack
    .map((name) => techStackMaster.find((t) => t.name === name))
    .filter(Boolean) as ApiTechStack[];

  const displayTechStacks = matchedTechStacks.length > 0
    ? matchedTechStacks
    : project.techStack.map((name) => ({ _id: name, name, image: "", description: "", isActive: true, order: 0 }));

  // A project may label its own hero cells — "Scale: 8,000+ daily users" reads
  // as nothing a "Timeframe" column could hold. Falls back to the fixed
  // quartet, which is what every existing project renders.
  const heroMeta =
    project.heroMeta && project.heroMeta.length > 0
      ? project.heroMeta.filter((m) => m.label || m.value)
      : [
          { label: "Client", value: project.client || "—" },
          { label: "Timeframe", value: project.timeframe || "—" },
          { label: "Role", value: project.role || "—" },
          { label: "Outcome", value: project.metric || "—" },
        ];

  const screenPrefix = project.screenLabelPrefix?.trim() || "Screen";

  // Four columns when the stack divides evenly into four and not into five, so
  // an eight-technology stack reads as 4+4 rather than 5+3. Only these two
  // literals exist, because Tailwind cannot compile a column count assembled at
  // runtime.
  const stackColumns =
    displayTechStacks.length % 5 !== 0 && displayTechStacks.length % 4 === 0
      ? "md:grid-cols-4"
      : "md:grid-cols-5";

  const stackCopy = heading(project, "stack", {
    eyebrow: "/the_stack",
    title: "Engineered for accuracy.",
  });
  const roiCopy = heading(project, "roi", { eyebrow: "/the_roi", title: "Tangible impact." });
  const problemCopy = heading(project, "problem", {
    eyebrow: "/the_problem",
    title: "The challenge.",
  });
  const solutionCopy = heading(project, "solution", {
    eyebrow: "/the_solution",
    title: "Our approach.",
  });
  const screensCopy = heading(project, "screens", {
    eyebrow: "/interface",
    title: "Product in action.",
  });
  const featuresCopy = heading(project, "features", {
    eyebrow: "/intelligence",
    title: "Intelligence layers.",
    lead: "Behind the simple interface lies a complex network of systems working in concert.",
  });
  const workflowCopy = heading(project, "workflow", {
    eyebrow: "/the_workflow",
    title: "How we built it.",
  });

  return (
    <SmoothScroll>
      <main className="min-h-screen w-full bg-black text-white selection:bg-white/20">
        <Navbar initialSettings={initialSettings} />

        {/*
          There is no banner band above the hero. One used to sit here, repeating
          the category and the title over a dimmed copy of the hero image — which
          put two <h1> elements on every case study and pushed the real hero
          below the fold. The hero below carries all three.
        */}

        {/* ── HERO ── */}
        <section className="pt-28 pb-16 px-6">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal direction="up">
              {/*
                A real link, not `history.back()`: it is the only route out of a
                case study for a visitor who arrived from search, and a crawler
                follows it to the rest of the work. It points at /work because
                /projects answers with a 308 to it.
              */}
              <Link
                href="/work"
                className="text-mono-tag text-zinc-500 hover:text-white transition-colors inline-flex items-center gap-2 mb-8 group font-mono text-xs uppercase tracking-widest"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                /work
              </Link>
              <div className="text-mono-tag text-neutral-200 mb-4 font-semibold">
                /{project.slug} — {project.category}
              </div>
              <h1 className="mb-10 max-w-5xl leading-[0.85]">{project.title}</h1>

              {project.intro && (
                <p className="text-lg text-zinc-400 max-w-3xl mb-12 leading-relaxed">
                  {project.intro}
                </p>
              )}

              <div className="grid md:grid-cols-4 gap-px bg-white/5 border border-white/10 mb-16 overflow-hidden rounded-2xl">
                {heroMeta.map((m, i) => (
                  <div key={`${m.label}-${i}`} className="bg-zinc-950 p-6">
                    <div className="text-mono-tag text-zinc-500 mb-2">{m.label}</div>
                    <div className="text-sm font-medium">{m.value}</div>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.2}>
              <div className="aspect-[21/9] w-full overflow-hidden rounded-[2rem] border border-white/10 relative group">
                <img
                  src={resolveImageUrl(project.image)}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500" />
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ── TECH STACK ── */}
        {displayTechStacks.length > 0 && (
          <section className="py-20 px-6 bg-zinc-950/50 border-y border-white/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/5 blur-[120px] rounded-full pointer-events-none" />
            <div className="max-w-7xl mx-auto">
              <ScrollReveal direction="up">
                <div className="text-center mb-16">
                  <div className="text-mono-tag text-neutral-200 mb-4 font-bold">{stackCopy.eyebrow}</div>
                  <h2 className="mb-6">{stackCopy.title}</h2>
                  {(project.stackSectionDescription || stackCopy.lead) && (
                    <p className="text-zinc-500 max-w-2xl mx-auto">
                      {project.stackSectionDescription || stackCopy.lead}
                    </p>
                  )}
                </div>
              </ScrollReveal>

              <div className={`grid grid-cols-2 gap-4 ${stackColumns}`}>
                {displayTechStacks.map((tech, i) => (
                  <ScrollReveal key={tech._id} delay={i * 0.05} direction="up">
                    <div className="group p-6 bg-zinc-900/30 border border-white/5 rounded-3xl hover:border-white/30 transition-all duration-500 h-full flex flex-col items-center text-center">
                      <div className="w-14 h-14 rounded-2xl bg-zinc-950 border border-white/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500">
                        <TechGlyph tech={tech} />
                      </div>
                      <div className="font-bold text-base mb-1">{tech.name}</div>
                      {tech.description && (
                        <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 leading-tight">
                          {tech.description}
                        </div>
                      )}
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── ROI ── */}
        {project.roi.length > 0 && (
          <section className="py-20 px-6 border-b border-white/5 bg-black">
            <div className="max-w-7xl mx-auto">
              <ScrollReveal direction="up">
                <div className="text-center mb-16">
                  <div className="text-mono-tag text-neutral-200 mb-4 font-bold">{roiCopy.eyebrow}</div>
                  <h2 className="mb-6">{roiCopy.title}</h2>
                  {(project.roiSectionDescription || roiCopy.lead) && (
                    <p className="text-zinc-500 max-w-2xl mx-auto">
                      {project.roiSectionDescription || roiCopy.lead}
                    </p>
                  )}
                </div>
              </ScrollReveal>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {project.roi.map((point: RoiItem, i) => {
                  const IconComponent = ICON_MAP[point.icon] ?? Zap;
                  const hasDetails = point.label || point.description;
                  return (
                    <ScrollReveal key={i} delay={i * 0.1} direction="up">
                      {hasDetails ? (
                        <div className="p-8 bg-zinc-900/40 border border-white/5 rounded-3xl h-full flex flex-col items-center text-center">
                          <div className="p-3 rounded-xl bg-white/10 mb-6">
                            <IconComponent className="w-6 h-6 text-neutral-200" />
                          </div>
                          <div className="text-4xl font-bold mb-2 tabular-nums">{point.value}</div>
                          {point.label && <div className="text-mono-tag text-neutral-200 mb-4">{point.label}</div>}
                          {point.description && <p className="text-sm text-zinc-500 leading-relaxed">{point.description}</p>}
                        </div>
                      ) : (
                        <div className="p-6 bg-zinc-900/40 border border-white/5 rounded-2xl h-full flex items-start gap-4">
                          <CheckCircle2 className="w-5 h-5 text-white shrink-0 mt-0.5" />
                          <span className="text-zinc-300">{point.value}</span>
                        </div>
                      )}
                    </ScrollReveal>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* ── PROBLEM & SOLUTION ── */}
        {(project.problem || project.solution) && (
          <section className="py-24 px-6 border-b border-white/5">
            <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16">
              <div className="lg:sticky lg:top-32 self-start space-y-12">
                {project.problem && (
                  <ScrollReveal direction="left">
                    <div>
                      <div className="text-mono-tag text-neutral-200 mb-4 font-bold">{problemCopy.eyebrow}</div>
                      <h2 className="mb-6 lowercase">{problemCopy.title}</h2>
                      <p className="text-zinc-400 max-w-xl">{project.problem}</p>
                    </div>
                  </ScrollReveal>
                )}
                {project.solution && (
                  <ScrollReveal direction="left" delay={0.2}>
                    <div>
                      <div className="text-mono-tag text-neutral-200 mb-4 font-bold">{solutionCopy.eyebrow}</div>
                      <h2 className="mb-6 lowercase">{solutionCopy.title}</h2>
                      <p className="text-zinc-400 max-w-xl">{project.solution}</p>
                    </div>
                  </ScrollReveal>
                )}
              </div>

              <div className="space-y-4">
                {project.gallery.slice(0, 2).map((item, i) => (
                  <ScrollReveal key={i} direction="right" delay={i * 0.2}>
                    <div className="group relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-950">
                      <img
                        src={resolveImageUrl(item.src)}
                        alt={item.caption}
                        className="w-full h-full object-cover grayscale opacity-50 transition-all duration-700 group-hover:grayscale-0 group-hover:opacity-100"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                      <div className="absolute bottom-10 left-10">
                        <div className="text-mono-tag text-zinc-500 mb-2">
                          0{i + 1} — {item.label?.trim() || "Process"}
                        </div>
                        <h3 className="font-bold">{item.caption}</h3>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── APP SCREENS ── */}
        {project.screens.length > 0 && (
          <section className="py-24 px-6 border-b border-white/5">
            <div className="max-w-7xl mx-auto">
              <ScrollReveal direction="up">
                <div className="text-center mb-16">
                  <div className="text-mono-tag text-neutral-200 mb-4 font-bold">{screensCopy.eyebrow}</div>
                  <h2 className="mb-6">{screensCopy.title}</h2>
                  {screensCopy.lead && (
                    <p className="text-zinc-500 max-w-xl mx-auto">{screensCopy.lead}</p>
                  )}
                </div>
              </ScrollReveal>

              <div className="flex flex-col lg:flex-row h-[600px] w-full gap-4 overflow-hidden rounded-[2.5rem] border border-white/10 p-4 bg-zinc-950">
                {project.screens.map((screen, index) => {
                  const isActive = activeScreen === index;
                  return (
                    <div
                      key={index}
                      onMouseEnter={() => { setIsPaused(true); setActiveScreen(index); }}
                      onMouseLeave={() => setIsPaused(false)}
                      onClick={() => setActiveScreen(index)}
                      className={`relative flex flex-col justify-end overflow-hidden cursor-pointer transition-all duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)] rounded-[2rem] border border-white/5 ${
                        isActive ? "lg:flex-[4] flex-[6]" : "lg:flex-1 flex-1 opacity-40 hover:opacity-100"
                      }`}
                    >
                      {screen.image && (
                        <img
                          src={resolveImageUrl(screen.image)}
                          alt={screen.label}
                          className={`absolute inset-0 w-full h-full object-cover transition-transform duration-[2000ms] ${isActive ? "scale-105" : "scale-100 grayscale"}`}
                        />
                      )}
                      <div className={`absolute inset-0 bg-gradient-to-t via-black/20 transition-all duration-700 ${isActive ? "from-black/90 opacity-100" : "from-black/60 opacity-0"}`} />

                      <div className={`relative z-10 p-10 transition-all duration-700 transform-gpu ${isActive ? "translate-y-0 opacity-100 delay-300" : "translate-y-20 opacity-0"}`}>
                        <div className="text-mono-tag text-neutral-200 mb-4">{screenPrefix} 0{index + 1}</div>
                        <h3 className="text-3xl md:text-4xl font-bold mb-4 tracking-tighter">{screen.label}</h3>
                        {screen.description && (
                          <p className="text-zinc-400 text-base max-w-md mb-6">{screen.description}</p>
                        )}
                        <div className="flex gap-1">
                          {project.screens.map((_, i) => (
                            <div key={i} className={`h-0.5 rounded-full bg-neutral-200 transition-all duration-1000 ${isActive && i === index ? "w-10" : "w-2 opacity-20"}`} />
                          ))}
                        </div>
                      </div>

                      {!isActive && (
                        <div className="absolute inset-0 flex items-center justify-center lg:rotate-[-90deg] pointer-events-none">
                          <div className="text-mono-tag text-white whitespace-nowrap opacity-60">{screen.label}</div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* ── FEATURES (Intelligence layers) ── */}
        {project.features.length > 0 && (
          <section className="py-24 px-6 border-b border-white/5">
            <div className="max-w-5xl mx-auto">
              <ScrollReveal direction="up">
                <div className="text-center mb-16">
                  <div className="text-mono-tag text-neutral-200 mb-4 font-bold">{featuresCopy.eyebrow}</div>
                  <h2 className="mb-4">{featuresCopy.title}</h2>
                  {featuresCopy.lead && (
                    <p className="text-zinc-400 max-w-xl mx-auto">{featuresCopy.lead}</p>
                  )}
                </div>
              </ScrollReveal>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {project.features.map((f, i) => {
                  const FeatureIcon = (f.icon && ICON_MAP[f.icon]) || Zap;
                  const accent = (f.accent && ACCENT_MAP[f.accent]) || DEFAULT_ACCENT;
                  return (
                    <ScrollReveal key={i} delay={i * 0.1} direction="up">
                      <div className="p-8 rounded-3xl border border-white/5 bg-zinc-900/30 hover:border-white/20 transition-all duration-500">
                        <FeatureIcon className={`w-8 h-8 mb-6 ${accent}`} />
                        <h3 className="text-xl font-bold mb-3">{f.title}</h3>
                        <p className="text-zinc-500 text-sm leading-relaxed">{f.description}</p>
                      </div>
                    </ScrollReveal>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* ── WORKFLOW STEPS ── */}
        {project.workflowSteps.length > 0 && (
          <section className="py-24 px-6 border-b border-white/5 bg-zinc-950/20">
            <div className="max-w-5xl mx-auto text-center mb-16">
              <div className="text-mono-tag text-neutral-200 mb-4 font-bold">{workflowCopy.eyebrow}</div>
              <h2 className="mb-4 lowercase">{workflowCopy.title}</h2>
              {workflowCopy.lead && (
                <p className="text-zinc-400 max-w-xl mx-auto">{workflowCopy.lead}</p>
              )}
            </div>
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
              {project.workflowSteps.map((item, i) => (
                <ScrollReveal key={i} delay={i * 0.1} direction="up">
                  <div className="relative p-10 rounded-[2rem] border border-white/5 bg-zinc-950 group hover:border-white/10 transition-all duration-500 overflow-hidden">
                    <div className="absolute -top-10 -right-10 text-[8rem] font-black text-white/[0.02] leading-none group-hover:text-white/[0.02] transition-colors">
                      {item.step}
                    </div>
                    <div className="text-mono-tag text-neutral-200 mb-6 font-bold">STEP_{item.step}</div>
                    <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                    <p className="text-zinc-400 text-sm leading-relaxed">{item.description}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </section>
        )}

        {/* ── GALLERY (remaining images) ── */}
        {project.gallery.length > 2 && (
          <section className="py-24 px-6 overflow-hidden border-b border-white/5">
            <div className="max-w-7xl mx-auto">
              <ScrollReveal direction="up">
                <div className="text-mono-tag text-neutral-200 mb-4 font-bold">/visual_process</div>
                <h2 className="text-4xl font-bold tracking-tight mb-16">Visual Process</h2>
              </ScrollReveal>
              <div className="flex flex-col gap-12">
                {project.gallery.slice(2).map((item, i) => (
                  <ScrollReveal key={i} direction="up" delay={i * 0.1}>
                    <div className="group space-y-4">
                      <div className="relative aspect-video rounded-3xl overflow-hidden border border-white/5">
                        <img
                          src={resolveImageUrl(item.src)}
                          alt={item.caption}
                          className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 scale-105 hover:scale-100"
                        />
                      </div>
                      <p className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest text-center">
                        — {item.caption}
                      </p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── LINKS ── */}
        {(project.liveUrl || project.githubUrl) && (
          <section className="py-16 px-6 border-b border-white/5">
            <div className="max-w-7xl mx-auto flex flex-wrap gap-4">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/30 text-neutral-200 hover:bg-white/10 transition-colors text-sm font-mono"
                >
                  <Globe className="w-4 h-4" />
                  Live Site
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/10 text-zinc-400 hover:bg-white/5 transition-colors text-sm font-mono"
                >
                  <Code2 className="w-4 h-4" />
                  GitHub
                </a>
              )}
            </div>
          </section>
        )}

        <ContactCTA />
        <Footer initialSettings={initialSettings} />
      </main>
    </SmoothScroll>
  );
}
