"use client";

import Link from "next/link";
import { ScrollReveal } from "./scroll-reveal";
import { ArrowRight } from "lucide-react";
import { usePublicSettings } from "@/lib/usePublicAPI";
import { getPublicSettings, type PortfolioSettings } from "@/lib/api";

const FALLBACK = {
  eyebrow: "Initialize // Connection",
  title: "Have a high-stakes product to ship?",
  lead: "Tell us what you're building. We'll come back within 12 hours with a clear plan and technical roadmap.",
  primaryLabel: "Start a Conversation",
  primaryHref: "/contact"
};

/**
 * The closing call to action, on nine routes.
 *
 * `initialSettings` is what the page's server component already fetched, same
 * contract as Navbar and Footer: pass it and the CMS copy is in the server HTML,
 * omit it and this fills in on the client. The fallbacks above are the floor, so
 * an unreachable API still renders a working CTA rather than an empty panel —
 * this is the last thing a visitor reads before deciding to get in touch.
 */
export function ContactCTA({
  initialSettings
}: {
  initialSettings?: PortfolioSettings | null;
} = {}) {
  const { settings } = usePublicSettings(getPublicSettings, initialSettings);
  const cta = settings?.contactCta;

  const eyebrow = cta?.eyebrow?.trim() || FALLBACK.eyebrow;
  const title = cta?.title?.trim() || FALLBACK.title;
  const lead = cta?.lead?.trim() || FALLBACK.lead;
  const primaryLabel = cta?.primary?.label?.trim() || FALLBACK.primaryLabel;
  const primaryHref = cta?.primary?.href?.trim() || FALLBACK.primaryHref;
  const secondaryLabel = cta?.secondary?.label?.trim();
  const secondaryHref = cta?.secondary?.href?.trim();

  return (
    <section className="py-20 px-6 border-t border-white/5 bg-zinc-950/20">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal direction="up">
          <div className="bg-blueprint/10 border border-mint/30 p-10 md:p-16 rounded-[2.5rem] relative overflow-hidden group">
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-mint/5 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2" />
            
            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
              <div>
                <div className="text-mono-tag text-mint mb-4">{eyebrow}</div>
                <h2 className="text-4xl md:text-5xl font-medium tracking-tighter mb-4 max-w-xl capitalize leading-none">
                  {title}
                </h2>
                <p className="text-zinc-500 max-w-lg">{lead}</p>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href={primaryHref}
                  className="group/btn relative px-8 py-4 bg-mint text-black font-bold flex items-center gap-2 hover:brightness-110 transition-all overflow-hidden"
                >
                  <span>{primaryLabel}</span>
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
                {/* Optional second action — absent unless an editor adds both a
                    label and a destination, so a half-filled row cannot ship a
                    button that goes nowhere. */}
                {secondaryLabel && secondaryHref && (
                  <Link
                    href={secondaryHref}
                    className="px-8 py-4 border border-white/15 text-white font-medium hover:border-mint/40 transition-colors"
                  >
                    {secondaryLabel}
                  </Link>
                )}
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
