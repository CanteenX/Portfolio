'use client'

import { SplineScene } from "@/components/ui/splite";
import { Spotlight as SpotlightAceternity } from "@/components/ui/spotlight-aceternity"

/**
 * The copy this component ships with, and the floor every CMS override falls
 * back to.
 *
 * Exported so the homepage can resolve each field against it independently. The
 * fallback is applied PER FIELD, never per object: an editor who fills in the
 * tagline and leaves the description blank must not blank the description —
 * a half-filled record is an unfinished task, not an instruction to publish
 * nothing.
 */
export const HERO_FALLBACK = {
  description:
    "An elite engineering collective transforming complex problems into elegant production-grade software. We build for scale, performance, and the future.",
  ctaPrimary: { label: "Explore our artifacts", href: "/work" },
  ctaSecondary: { label: "Initiate Discovery", href: "/contact" },
};

export type HeroContent = {
  tagline?: string;
  description?: string;
  ctaPrimary?: { label?: string; href?: string };
  ctaSecondary?: { label?: string; href?: string };
};

function clean(value: string | undefined | null): string {
  return typeof value === "string" ? value.trim() : "";
}

/**
 * `hero` comes from PortfolioSettings. Until now these fields existed in the
 * admin form and in the database and were read by nothing at all, so editing
 * the homepage headline appeared to succeed and changed nothing.
 */
export function SplineSceneBasic({ hero }: { hero?: HeroContent | null }) {
  const tagline = clean(hero?.tagline);
  const description = clean(hero?.description) || HERO_FALLBACK.description;

  const primaryLabel = clean(hero?.ctaPrimary?.label) || HERO_FALLBACK.ctaPrimary.label;
  const primaryHref = clean(hero?.ctaPrimary?.href) || HERO_FALLBACK.ctaPrimary.href;
  const secondaryLabel = clean(hero?.ctaSecondary?.label) || HERO_FALLBACK.ctaSecondary.label;
  const secondaryHref = clean(hero?.ctaSecondary?.href) || HERO_FALLBACK.ctaSecondary.href;

  return (
    <div className="w-full min-h-screen lg:h-screen bg-black relative overflow-hidden">
      <SpotlightAceternity
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />

      <div className="flex min-h-screen lg:min-h-0 lg:h-full flex-col lg:flex-row">
        {/* Left content — starts below the fixed navbar */}
        <div className="flex-1 px-6 md:px-24 pt-32 md:pt-48 relative z-10 flex flex-col justify-start pb-10 lg:pb-16">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tighter leading-[0.88] bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
            {tagline ? (
              tagline
            ) : (
              // The shipped headline keeps its typographic treatment; a CMS
              // override is plain text, because an editor cannot express the
              // emphasis span through a single input.
              <>
                We Engineer <span className="text-white italic">High-Performance</span> <br />Web &amp; Mobile Products
              </>
            )}
          </h1>
          <p className="mt-8 text-neutral-400 text-base md:text-lg max-w-xl leading-relaxed font-light">
            {description}
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href={primaryHref}
              className="px-8 py-4 bg-mint text-black font-bold hover:brightness-110 transition-all flex items-center gap-2 uppercase tracking-widest text-xs"
            >
              {primaryLabel}
            </a>
            <a
              href={secondaryHref}
              className="px-8 py-4 bg-[#111] text-white border border-white/10 font-bold hover:bg-[#1a1a1a] transition-all uppercase tracking-widest text-xs"
            >
              {secondaryLabel}
            </a>
          </div>
        </div>

        {/* Right content - The Robot (visible on all screen sizes) */}
        <div className="flex flex-1 relative w-full h-[55vh] min-h-[360px] lg:h-auto lg:min-h-0 items-center justify-center">
          <SplineScene
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="w-full h-full"
          />
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-30 animate-pulse">
        <div className="text-mono-tag">Scroll to Explore</div>
        <div className="w-px h-12 bg-gradient-to-b from-white to-transparent" />
      </div>
    </div>
  )
}
