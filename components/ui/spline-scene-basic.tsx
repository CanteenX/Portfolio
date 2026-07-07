'use client'

import { SplineScene } from "@/components/ui/splite";
import { Spotlight as SpotlightAceternity } from "@/components/ui/spotlight-aceternity"

export function SplineSceneBasic() {
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
            We Engineer <span className="text-white italic">High-Performance</span> <br/>Web &amp; Mobile Products
          </h1>
          <p className="mt-8 text-neutral-400 text-base md:text-lg max-w-xl leading-relaxed font-light">
            An elite engineering collective transforming complex problems into elegant production-grade software.
            We build for scale, performance, and the future.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="/work"
              className="px-8 py-4 bg-mint text-black font-bold hover:brightness-110 transition-all flex items-center gap-2 uppercase tracking-widest text-xs"
            >
              Explore our artifacts
            </a>
            <a
              href="/contact"
              className="px-8 py-4 bg-[#111] text-white border border-white/10 font-bold hover:bg-[#1a1a1a] transition-all uppercase tracking-widest text-xs"
            >
              Initiate Discovery
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
