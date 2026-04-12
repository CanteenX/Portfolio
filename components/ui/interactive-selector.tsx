"use client";

import React, { useState, useEffect } from "react";
import {
  Languages,
  FileText,
  Globe,
  BrainCircuit,
  Mic,
} from "lucide-react";

export interface SelectorOption {
  title: string;
  description: string;
  details: string[];
  icon: React.ReactNode;
}

const defaultOptions: SelectorOption[] = [
  {
    title: "Live Translation",
    description: "Real-time translation during meetings",
    details: [
      "Supports 100+ languages in real time",
      "Speaker-aware translation streams",
      "Zero-latency subtitle overlay on call",
      "Dialect and accent adaptation",
    ],
    icon: <Languages size={24} className="text-white" />,
  },
  {
    title: "Auto Minutes",
    description: "Automatic meeting minutes generation",
    details: [
      "AI-generated structured summaries",
      "Action items auto-extracted",
      "Key decisions highlighted",
      "Shareable PDF & Notion export",
    ],
    icon: <FileText size={24} className="text-white" />,
  },
  {
    title: "Multi-Language",
    description: "Speak in any language, everyone understands",
    details: [
      "Each participant hears their own language",
      "Language auto-detection per speaker",
      "Custom glossary for domain terms",
      "Seamless mid-conversation switching",
    ],
    icon: <Globe size={24} className="text-white" />,
  },
  {
    title: "Smart Summaries",
    description: "AI-powered insights after every meeting",
    details: [
      "Sentiment and tone analysis",
      "Topic clustering and tagging",
      "Follow-up task suggestions",
      "Searchable meeting archive",
    ],
    icon: <BrainCircuit size={24} className="text-white" />,
  },
  {
    title: "Voice Recognition",
    description: "Advanced speech-to-text engine",
    details: [
      "Speaker diarization — who said what",
      "Noise cancellation preprocessing",
      "Punctuation and formatting aware",
      "Custom vocabulary training",
    ],
    icon: <Mic size={24} className="text-white" />,
  },
];

interface InteractiveSelectorProps {
  options?: SelectorOption[];
}

const ANIMATION_STYLES = `
  @keyframes selectorFadeInTop {
    0% { opacity: 0; transform: translateY(-20px); }
    100% { opacity: 1; transform: translateY(0); }
  }
  .animate-selectorFadeInTop {
    opacity: 0;
    transform: translateY(-20px);
    animation: selectorFadeInTop 0.8s ease-in-out forwards;
  }
  .selector-delay-300 { animation-delay: 0.3s; }
  .selector-delay-600 { animation-delay: 0.6s; }
`;

export default function InteractiveSelector({
  options = defaultOptions,
}: InteractiveSelectorProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animatedOptions, setAnimatedOptions] = useState<number[]>([]);
  const [isPaused, setIsPaused] = useState(false);

  // Entrance stagger animation
  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    options.forEach((_, i) => {
      const timer = setTimeout(() => {
        setAnimatedOptions((prev) => [...prev, i]);
      }, 180 * i);
      timers.push(timer);
    });
    return () => timers.forEach((t) => clearTimeout(t));
  }, [options]);

  // Auto-play
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % options.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [isPaused, options.length]);

  return (
    <div className="relative flex flex-col items-center justify-center font-sans text-white">
      <style dangerouslySetInnerHTML={{ __html: ANIMATION_STYLES }} />

      {/* Options row */}
      <div className="flex w-full max-w-[900px] h-[420px] items-stretch overflow-hidden">
        {options.map((option, index) => {
          const isActive = activeIndex === index;

          return (
            <div
              key={index}
              onClick={() => setActiveIndex(index)}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              className="relative flex flex-col justify-end overflow-hidden cursor-pointer transition-all duration-700 ease-in-out border-2"
              style={{
                flex: isActive ? "7 1 0%" : "1 1 0%",
                minWidth: "60px",
                borderColor: isActive
                  ? "rgba(255,255,255,0.2)"
                  : "rgba(255,255,255,0.05)",
                backgroundColor: "#09090b",
                opacity: animatedOptions.includes(index) ? 1 : 0,
                transform: animatedOptions.includes(index)
                  ? "translateX(0)"
                  : "translateX(-60px)",
                boxShadow: isActive
                  ? "0 20px 60px rgba(0,0,0,0.5)"
                  : "0 10px 30px rgba(0,0,0,0.3)",
                zIndex: isActive ? 10 : 1,
              }}
            >
              {/* Content card area — visible only when active */}
              <div
                className="absolute inset-0 flex flex-col justify-center px-8 py-6 transition-all duration-700"
                style={{
                  opacity: isActive ? 1 : 0,
                  transform: isActive
                    ? "translateY(0)"
                    : "translateY(20px)",
                }}
              >
                <h3 className="text-2xl font-bold tracking-tight text-white mb-2">
                  {option.title}
                </h3>
                <p className="text-sm text-zinc-400 mb-5 max-w-sm">
                  {option.description}
                </p>
                <ul className="space-y-2.5">
                  {option.details.map((detail, di) => (
                    <li
                      key={di}
                      className="flex items-start gap-2.5 text-sm text-zinc-300"
                    >
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-white/30 shrink-0" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom label — always visible */}
              <div className="relative z-10 flex items-center gap-3 px-4 pb-5 pt-2 pointer-events-none">
                <div className="min-w-[44px] max-w-[44px] h-[44px] flex items-center justify-center rounded-full bg-zinc-800/90 backdrop-blur-sm border-2 border-zinc-700 shrink-0">
                  {option.icon}
                </div>
                <div
                  className="whitespace-pre transition-all duration-700 ease-in-out"
                  style={{
                    opacity: isActive ? 1 : 0,
                    transform: isActive
                      ? "translateX(0)"
                      : "translateX(25px)",
                  }}
                >
                  <div className="font-bold text-base text-white">
                    {option.title}
                  </div>
                  <div className="text-sm text-zinc-400">
                    {option.description}
                  </div>
                </div>
              </div>

              {/* Inset shadow at bottom */}
              <div
                className="absolute left-0 right-0 bottom-0 h-32 pointer-events-none transition-all duration-700"
                style={{
                  boxShadow: isActive
                    ? "inset 0 -120px 120px -80px rgba(0,0,0,0.9)"
                    : "none",
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
