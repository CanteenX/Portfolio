"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "motion/react";
import {
  SmartPhone01Icon,
  Globe02Icon,
  DashboardSquare01Icon,
  Settings02Icon,
  GoogleIcon,
  SeoIcon,
  UserIcon,
  PencilEdit02Icon,
} from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";
import { HugeiconsIcon } from "@hugeicons/react";

// Services We Offer
const FEATURES = [
  {
    id: "app-building",
    label: "App Building",
    subtitle: "Mobile solutions that scale",
    icon: SmartPhone01Icon,
    description: "Custom mobile applications tailored to your business needs with cutting-edge technology.",
    highlights: ["iOS & Android", "Cross-platform", "Scalable architecture"],
    pointers: [
      "Native & hybrid app development",
      "App Store & Play Store deployment",
      "Push notifications & real-time sync",
      "Ongoing maintenance & updates",
    ],
  },
  {
    id: "website-building",
    label: "Website Building",
    subtitle: "Digital presence that converts",
    icon: Globe02Icon,
    description: "Stunning, responsive websites that captivate your audience and drive conversions.",
    highlights: ["Responsive design", "SEO optimized", "Fast performance"],
    pointers: [
      "Custom design & development",
      "CMS integration & management",
      "Performance & speed optimization",
      "SSL, hosting & domain setup",
    ],
  },
  {
    id: "crm-panel",
    label: "CRM Panel",
    subtitle: "Customer relationships simplified",
    icon: DashboardSquare01Icon,
    description: "Powerful CRM solutions to manage customer relationships and boost your sales pipeline.",
    highlights: ["Lead tracking", "Analytics dashboard", "Automated workflows"],
    pointers: [
      "Custom CRM tailored to your workflow",
      "Lead scoring & pipeline management",
      "Automated email & follow-up sequences",
      "Reports, analytics & data export",
    ],
  },
  {
    id: "maintenance",
    label: "Maintenance",
    subtitle: "Always online, always optimized",
    icon: Settings02Icon,
    description: "24/7 technical support and maintenance to keep your systems running smoothly.",
    highlights: ["24/7 monitoring", "Regular updates", "Performance tuning"],
    pointers: [
      "Server monitoring & uptime alerts",
      "Security patches & vulnerability fixes",
      "Database optimization & backups",
      "Bug fixes & feature enhancements",
    ],
  },
  {
    id: "google-meta-ads",
    label: "Google Meta Ads",
    subtitle: "Strategic campaigns that deliver",
    icon: GoogleIcon,
    description: "Strategic ad campaigns across Google and Meta platforms for maximum ROI.",
    highlights: ["Campaign strategy", "A/B testing", "ROI optimization"],
    pointers: [
      "Google Search & Display campaigns",
      "Meta (Facebook & Instagram) ads",
      "Audience targeting & retargeting",
      "Monthly reporting & budget optimization",
    ],
  },
  {
    id: "seo",
    label: "SEO",
    subtitle: "Rank higher, grow faster",
    icon: SeoIcon,
    description: "Expert SEO strategies to rank higher and drive organic traffic to your business.",
    highlights: ["Keyword research", "On-page SEO", "Link building"],
    pointers: [
      "Technical SEO & site audit",
      "Content strategy & blog optimization",
      "Backlink building & outreach",
      "Monthly ranking & traffic reports",
    ],
  },
  {
    id: "tech-consultancy",
    label: "Tech Consultancy",
    subtitle: "Strategic guidance for growth",
    icon: UserIcon,
    description: "Strategic technology consulting to guide your digital transformation journey.",
    highlights: ["Tech audits", "Architecture planning", "Growth strategy"],
    pointers: [
      "Technology stack evaluation",
      "System architecture & scalability review",
      "Digital transformation roadmap",
      "Vendor selection & team augmentation",
    ],
  },
  {
    id: "designing",
    label: "Designing",
    subtitle: "Beauty meets functionality",
    icon: PencilEdit02Icon,
    description: "Creative design solutions that blend aesthetics with functionality and user experience.",
    highlights: ["UI/UX design", "Brand identity", "Prototyping"],
    pointers: [
      "Wireframing & interactive prototypes",
      "Visual design & design systems",
      "User research & usability testing",
      "Brand guidelines & asset creation",
    ],
  },
];

const AUTO_PLAY_INTERVAL = 3000;
const ITEM_HEIGHT_SM = 68;
const ITEM_HEIGHT_LG = 80;

const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

export function FeatureCarousel() {
  const [step, setStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isLg, setIsLg] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(min-width: 1024px)");
    setIsLg(mql.matches);
    const handler = (e: MediaQueryListEvent) => setIsLg(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  const itemHeight = isLg ? ITEM_HEIGHT_LG : ITEM_HEIGHT_SM;

  const currentIndex =
    ((step % FEATURES.length) + FEATURES.length) % FEATURES.length;

  const nextStep = useCallback(() => {
    setStep((prev) => prev + 1);
  }, []);

  const handleChipClick = (index: number) => {
    const diff = (index - currentIndex + FEATURES.length) % FEATURES.length;
    if (diff > 0) setStep((s) => s + diff);
  };

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextStep, AUTO_PLAY_INTERVAL);
    return () => clearInterval(interval);
  }, [nextStep, isPaused]);

  const getCardStatus = (index: number) => {
    const diff = index - currentIndex;
    const len = FEATURES.length;

    let normalizedDiff = diff;
    if (diff > len / 2) normalizedDiff -= len;
    if (diff < -len / 2) normalizedDiff += len;

    if (normalizedDiff === 0) return "active";
    if (normalizedDiff === -1) return "prev";
    if (normalizedDiff === 1) return "next";
    return "hidden";
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:p-8">
      <div className="relative rounded-2xl md:rounded-[2.5rem] lg:rounded-[4rem] flex flex-col lg:flex-row lg:aspect-video border border-white/10 overflow-hidden">
        {/* Left Sidebar - Optimized Glassmorphism */}
        <div className="w-full lg:w-[40%] min-h-[22rem] md:min-h-[26rem] lg:h-full relative z-30 flex flex-col items-start justify-center overflow-hidden px-4 md:px-16 lg:pl-16 bg-zinc-900/60 backdrop-blur-xl">
          {/* Gradient Overlays */}
          <div className="absolute inset-x-0 top-0 h-12 md:h-20 lg:h-16 bg-linear-to-b from-zinc-900/80 via-zinc-900/50 to-transparent z-40" />
          <div className="absolute inset-x-0 bottom-0 h-12 md:h-20 lg:h-16 bg-linear-to-t from-zinc-900/80 via-zinc-900/50 to-transparent z-40" />

          {/* Animated Grid Background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]"></div>

          <div className="relative w-full h-full flex items-center justify-center lg:justify-start z-20">
            {FEATURES.map((feature, index) => {
              const isActive = index === currentIndex;
              const distance = index - currentIndex;
              const wrappedDistance = wrap(
                -(FEATURES.length / 2),
                FEATURES.length / 2,
                distance
              );

              return (
                <motion.div
                  key={feature.id}
                  style={{
                    height: itemHeight,
                    width: "fit-content",
                    willChange: "transform, opacity",
                  }}
                  animate={{
                    y: wrappedDistance * itemHeight,
                    opacity: 1 - Math.min(Math.abs(wrappedDistance) * 0.35, 0.8),
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 90,
                    damping: 22,
                    mass: 1,
                  }}
                  className="absolute flex items-center justify-start"
                >
                  <button
                    onClick={() => handleChipClick(index)}
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                    className={cn(
                      "relative flex items-start gap-3 lg:gap-4 px-4 md:px-10 lg:px-8 py-3 md:py-5 lg:py-4 rounded-xl md:rounded-2xl transition-all duration-700 text-left group border",
                      isActive
                        ? "bg-white/10 backdrop-blur-xl text-white border-white/30 z-10 shadow-xl"
                        : "bg-transparent text-white/40 border-white/10 hover:border-white/20 hover:text-white/60 hover:bg-white/5"
                    )}
                  >
                    <div
                      className={cn(
                        "flex items-center justify-center transition-colors duration-500 mt-1",
                        isActive ? "text-white" : "text-white/30"
                      )}
                    >
                      <HugeiconsIcon
                        icon={feature.icon}
                        size={18}
                        strokeWidth={2}
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <span className="font-semibold text-sm md:text-[15px] tracking-tight whitespace-nowrap uppercase">
                        {feature.label}
                      </span>
                      <span
                        className={cn(
                          "text-[11px] md:text-xs font-normal tracking-tight whitespace-nowrap transition-opacity duration-500",
                          isActive ? "text-gray-300" : "text-white/30"
                        )}
                      >
                        {feature.subtitle}
                      </span>
                    </div>
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Right Side - Service Cards */}
        <div className="lg:flex-1 h-[28rem] md:h-[36rem] lg:h-full relative bg-black flex items-center justify-center overflow-hidden border-t lg:border-t-0 lg:border-l border-white/10">
          <div className="absolute inset-0">
            {FEATURES.map((feature, index) => {
              const status = getCardStatus(index);
              const isActive = status === "active";
              const isPrev = status === "prev";
              const isNext = status === "next";

              return (
                <motion.div
                  key={feature.id}
                  initial={false}
                  style={{ willChange: "transform, opacity" }}
                  animate={{
                    x: isActive ? 0 : isPrev ? -100 : isNext ? 100 : 0,
                    scale: isActive ? 1 : isPrev || isNext ? 0.85 : 0.7,
                    opacity: isActive ? 1 : isPrev || isNext ? 0.4 : 0,
                    rotate: isPrev ? -3 : isNext ? 3 : 0,
                    zIndex: isActive ? 20 : isPrev || isNext ? 10 : 0,
                    pointerEvents: isActive ? "auto" : "none",
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 25,
                    mass: 0.8,
                  }}
                  className="absolute inset-0 overflow-hidden bg-black origin-center"
                >
                  <div className="w-full h-full flex flex-col justify-between p-6 md:p-12 lg:p-20">
                    {/* Top: Icon + Number */}
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-white/6 border border-white/8 flex items-center justify-center">
                        <HugeiconsIcon
                          icon={feature.icon}
                          size={isLg ? 26 : 20}
                          strokeWidth={1.8}
                          className="text-white/90"
                        />
                      </div>
                      <span className="text-white/20 text-xs md:text-sm font-mono tracking-widest">
                        0{index + 1}
                      </span>
                    </div>

                    {/* Middle: Content */}
                    <div className="flex-1 flex flex-col justify-center space-y-3 md:space-y-5">
                      <div className="space-y-2 md:space-y-3">
                        <h3 className="text-white text-2xl md:text-4xl lg:text-5xl font-semibold tracking-tight leading-tight">
                          {feature.label}
                        </h3>
                        <p className="text-white/40 text-sm md:text-lg leading-relaxed max-w-md">
                          {feature.description}
                        </p>
                      </div>

                      {/* Highlights */}
                      <div className="flex flex-wrap gap-1.5 md:gap-2.5">
                        {feature.highlights.map((item) => (
                          <span
                            key={item}
                            className="text-white/50 text-[11px] md:text-sm px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-white/8 bg-white/3 tracking-wide"
                          >
                            {item}
                          </span>
                        ))}
                      </div>

                      {/* Pointers */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-1.5 md:gap-y-2.5 pt-1 md:pt-2">
                        {feature.pointers.map((point) => (
                          <div key={point} className="flex items-start gap-2 md:gap-3">
                            <span className="mt-1.5 md:mt-2 w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-white/20 shrink-0" />
                            <span className="text-white/35 text-xs md:text-sm leading-relaxed">
                              {point}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Bottom: Subtle line */}
                    <div className="flex items-center gap-4">
                      <div className="h-px flex-1 bg-white/6" />
                      <span className="text-white/20 text-[10px] md:text-[11px] uppercase tracking-[0.25em]">
                        {feature.subtitle}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeatureCarousel;
