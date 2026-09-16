"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { ContactCTA } from "@/components/ui/contact-cta";
import { usePublicAPI, usePublicSettings } from "@/lib/usePublicAPI";
import { getPublicFaqs, getPublicSettings, type ApiFaq, type PortfolioSettings } from "@/lib/api";
import { resolvePageCopy } from "@/lib/page-copy";

/**
 * Groups questions by category, preserving the order the CMS returned.
 *
 * Ungrouped questions come first under no heading, which is what a short FAQ
 * looks like before anyone bothers to categorise it — and a short FAQ is the
 * normal state of this page.
 */
function groupByCategory(faqs: ApiFaq[]): { category: string; items: ApiFaq[] }[] {
  const groups = new Map<string, ApiFaq[]>();
  for (const faq of faqs) {
    const key = faq.category?.trim() ?? "";
    const existing = groups.get(key);
    if (existing) existing.push(faq);
    else groups.set(key, [faq]);
  }
  return [...groups.entries()]
    .sort(([a], [b]) => (a === "" ? -1 : b === "" ? 1 : 0))
    .map(([category, items]) => ({ category, items }));
}

export default function FaqView({
  initialFaqs,
  initialSettings
}: {
  initialFaqs: ApiFaq[];
  initialSettings: PortfolioSettings | null;
}) {
  const { data: faqs } = usePublicAPI(getPublicFaqs, [], initialFaqs);
  const { settings } = usePublicSettings(getPublicSettings, initialSettings);
  const [open, setOpen] = useState<string | null>(initialFaqs[0]?._id ?? null);

  const copy = resolvePageCopy(settings, "faq", {
    eyebrow: "/faq — Questions",
    title: "Answers before you ask.",
    lead: "How engagements start, how delivery runs, and what happens when something goes wrong."
  });

  const groups = groupByCategory(faqs);

  return (
    <main className="min-h-screen bg-black text-white selection:bg-mint/30">
      <Navbar initialSettings={initialSettings} />

      <div className="pt-36 pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal direction="up">
            <div className="text-mono-tag text-mint mb-4">{copy.eyebrow}</div>
            <h1 className="mb-6">{copy.title}</h1>
            {copy.lead && <p className="text-lg text-zinc-400 leading-relaxed">{copy.lead}</p>}
          </ScrollReveal>

          {faqs.length === 0 ? (
            // No invented questions. An FAQ page that answers questions nobody
            // asked reads as filler and is worse than an honest empty state.
            <div className="mt-16 border-t hairline pt-10">
              <p className="text-zinc-400">
                We have not published any questions yet.{" "}
                <Link href="/contact" className="text-mint underline underline-offset-4">
                  Ask us directly
                </Link>{" "}
                — the answer will probably end up here.
              </p>
            </div>
          ) : (
            <div className="mt-16 space-y-12">
              {groups.map((group) => (
                <section key={group.category || "general"}>
                  {group.category && (
                    <h2 className="font-mono text-xs uppercase tracking-widest text-zinc-500 mb-4">
                      {group.category}
                    </h2>
                  )}
                  <div className="border-t hairline">
                    {group.items.map((faq) => {
                      const isOpen = open === faq._id;
                      return (
                        <div key={faq._id} className="border-b hairline">
                          <h3>
                            <button
                              type="button"
                              onClick={() => setOpen(isOpen ? null : faq._id)}
                              aria-expanded={isOpen}
                              aria-controls={`faq-answer-${faq._id}`}
                              className="w-full flex items-start justify-between gap-6 py-6 text-left group"
                            >
                              <span className="text-lg md:text-xl tracking-tight text-white group-hover:text-mint transition-colors">
                                {faq.question}
                              </span>
                              <Plus
                                size={20}
                                aria-hidden="true"
                                className={`mt-1 shrink-0 text-zinc-500 transition-transform duration-300 ${
                                  isOpen ? "rotate-45 text-mint" : ""
                                }`}
                              />
                            </button>
                          </h3>
                          {/*
                            Kept mounted and hidden rather than unmounted, so the
                            answer text is in the HTML the FAQPage markup claims
                            is on the page even before anyone clicks.
                          */}
                          <div
                            id={`faq-answer-${faq._id}`}
                            hidden={!isOpen}
                            className="pb-6 -mt-1 text-zinc-400 leading-relaxed whitespace-pre-line max-w-2xl"
                          >
                            {faq.answer}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </section>
              ))}
            </div>
          )}
        </div>
      </div>

      <ContactCTA initialSettings={initialSettings} />
      <Footer initialSettings={initialSettings} />
    </main>
  );
}
