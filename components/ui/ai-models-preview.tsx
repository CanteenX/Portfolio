"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  AiChat02Icon,
  Target02Icon,
  AiPhone01Icon,
  WorkflowCircle02Icon,
  AiContentGenerator01Icon,
  Analytics02Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

type AiService = {
  id: string;
  icon: typeof AiChat02Icon;
  title: string;
  tagline: string;
  description: string;
  features: string[];
  useCases: string[];
  tech: string[];
  projectHref?: string;
};

const AI_SERVICES: AiService[] = [
  {
    id: "ai-chatbot",
    icon: AiChat02Icon,
    title: "AI Chatbot",
    tagline: "Smart conversations, real results",
    description:
      "Custom AI chatbots powered by LLMs that understand your business context, handle customer queries 24/7, and escalate when needed.",
    features: [
      "Natural language understanding",
      "Multi-language support",
      "Context-aware responses",
      "Seamless human handoff",
    ],
    useCases: ["Customer support", "Lead generation", "FAQ automation", "Onboarding"],
    tech: ["GPT-4o", "Claude", "RAG", "Fine-tuning"],
  },
  {
    id: "ai-recommendation",
    icon: Target02Icon,
    title: "AI Recommendation",
    tagline: "Personalized experiences at scale",
    description:
      "Intelligent recommendation engines that learn user preferences and serve hyper-relevant content, products, and suggestions in real time.",
    features: [
      "Collaborative filtering",
      "Real-time personalization",
      "Behavioral analytics",
      "A/B testing built-in",
    ],
    useCases: ["E-commerce products", "Content feeds", "Music & media", "Job matching"],
    tech: ["Embeddings", "Vector DB", "ML pipelines", "LLM ranking"],
  },
  {
    id: "ai-call-bot",
    icon: AiPhone01Icon,
    title: "AI Call Bot",
    tagline: "Human-like voice, zero wait times",
    description:
      "Voice-enabled AI agents that handle inbound and outbound calls with natural conversation flow, appointment scheduling, and CRM integration.",
    features: [
      "Natural voice synthesis",
      "Real-time transcription",
      "Sentiment detection",
      "Call routing & escalation",
    ],
    useCases: ["Appointment booking", "Order tracking", "Surveys & feedback", "Cold outreach"],
    tech: ["LiveKit", "Gemini", "GoTo", "EHR API", "RingCentral"],
    projectHref: "/projects/ai-call-bot-hospital",
  },
  {
    id: "ai-automation",
    icon: WorkflowCircle02Icon,
    title: "AI Automation",
    tagline: "Workflows that think for themselves",
    description:
      "End-to-end AI-powered automation that connects your tools, processes data intelligently, and executes complex multi-step workflows autonomously.",
    features: [
      "Multi-step orchestration",
      "Document processing",
      "Smart data extraction",
      "Error handling & retries",
    ],
    useCases: ["Invoice processing", "Email triage", "Data entry", "Report generation"],
    tech: ["LangChain", "Agents", "API integration", "Zapier/n8n"],
  },
  {
    id: "ai-content",
    icon: AiContentGenerator01Icon,
    title: "AI Content Engine",
    tagline: "Create at the speed of thought",
    description:
      "AI-powered content generation pipelines that produce on-brand copy, blog posts, social media content, and marketing materials at scale.",
    features: [
      "Brand voice training",
      "SEO-optimized output",
      "Multi-format generation",
      "Human-in-the-loop review",
    ],
    useCases: ["Blog writing", "Ad copy", "Product descriptions", "Social media"],
    tech: ["GPT-4o", "Claude", "Prompt engineering", "RAG"],
  },
  {
    id: "ai-analytics",
    icon: Analytics02Icon,
    title: "AI Analytics",
    tagline: "Ask your data anything",
    description:
      "Conversational analytics dashboards where you query data in plain English. Get instant insights, charts, and reports without writing SQL.",
    features: [
      "Natural language queries",
      "Auto-generated charts",
      "Anomaly detection",
      "Scheduled reports",
    ],
    useCases: ["Sales dashboards", "Marketing ROI", "Ops monitoring", "Financial reporting"],
    tech: ["Text-to-SQL", "LLM agents", "Plotly", "Data pipelines"],
  },
];

export function AiModelsList({ className = "" }: { models?: unknown; className?: string }) {
  const [selected, setSelected] = useState<AiService | null>(null);

  return (
    <div className={`w-full max-w-6xl mx-auto ${className}`}>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {AI_SERVICES.map((service) => (
          <motion.li
            key={service.id}
            whileHover={{ scale: 1.02, y: -4 }}
            whileTap={{ scale: 0.98 }}
            className="cursor-pointer rounded-2xl border border-white/8 bg-white/3 p-6 md:p-8 hover:border-white/15 transition-colors duration-300"
            onClick={() => setSelected(service)}
          >
            <div className="w-12 h-12 rounded-2xl bg-white/6 border border-white/8 flex items-center justify-center mb-5">
              <HugeiconsIcon
                icon={service.icon}
                size={24}
                strokeWidth={1.8}
                className="text-white/90"
              />
            </div>
            <h3 className="text-white text-xl font-semibold tracking-tight mb-1.5">
              {service.title}
            </h3>
            <p className="text-white/30 text-xs uppercase tracking-widest mb-4">
              {service.tagline}
            </p>
            <p className="text-white/45 text-sm leading-relaxed mb-5">
              {service.description}
            </p>

            {/* Tech tags */}
            <div className="flex flex-wrap gap-1.5">
              {service.tech.map((t) => (
                <span
                  key={t}
                  className="text-white/40 text-[11px] px-2.5 py-1 rounded-full border border-white/8 bg-white/3"
                >
                  {t}
                </span>
              ))}
            </div>
          </motion.li>
        ))}
      </ul>

      {/* Detail Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 40 }}
              transition={{ type: "spring", damping: 22, stiffness: 280 }}
              className="relative w-full max-w-2xl rounded-3xl border border-white/10 bg-zinc-950 p-8 md:p-10 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute right-5 top-5 text-white/30 hover:text-white/60 transition-colors text-sm"
                onClick={() => setSelected(null)}
              >
                Close
              </button>

              {/* Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-white/6 border border-white/8 flex items-center justify-center">
                  <HugeiconsIcon
                    icon={selected.icon}
                    size={28}
                    strokeWidth={1.8}
                    className="text-white/90"
                  />
                </div>
                <div>
                  <h3 className="text-white text-2xl font-semibold tracking-tight">
                    {selected.title}
                  </h3>
                  <p className="text-white/30 text-xs uppercase tracking-widest mt-0.5">
                    {selected.tagline}
                  </p>
                </div>
              </div>

              <p className="text-white/50 text-base leading-relaxed mb-8">
                {selected.description}
              </p>

              {/* Features & Use Cases */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h4 className="text-white/60 text-xs uppercase tracking-widest mb-3">
                    Key Features
                  </h4>
                  <div className="space-y-2">
                    {selected.features.map((f) => (
                      <div key={f} className="flex items-center gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-white/25 shrink-0" />
                        <span className="text-white/45 text-sm">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-white/60 text-xs uppercase tracking-widest mb-3">
                    Use Cases
                  </h4>
                  <div className="space-y-2">
                    {selected.useCases.map((u) => (
                      <div key={u} className="flex items-center gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-white/25 shrink-0" />
                        <span className="text-white/45 text-sm">{u}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Tech */}
              <div className={selected.projectHref ? "mb-8" : ""}>
                <h4 className="text-white/60 text-xs uppercase tracking-widest mb-3">
                  Tech Stack
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selected.tech.map((t) => (
                    <span
                      key={t}
                      className="text-white/50 text-xs px-3 py-1.5 rounded-full border border-white/10 bg-white/5"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {selected.projectHref && (
                <Link
                  href={selected.projectHref}
                  className="inline-flex items-center gap-2 text-sm font-medium text-white/80 hover:text-white transition-colors"
                  onClick={() => setSelected(null)}
                >
                  View case study →
                </Link>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
