'use client'

import { SplineScene } from "@/components/ui/splite";
import { Spotlight as SpotlightAceternity } from "@/components/ui/spotlight-aceternity"

export function SplineSceneBasic() {
  return (
    <div className="w-full h-screen bg-black relative overflow-hidden">
      <SpotlightAceternity
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />

      <div className="flex h-full flex-col md:flex-row">
        {/* Left content — starts below the fixed navbar */}
        <div className="flex-1 px-12 md:px-24 pt-40 md:pt-48 relative z-10 flex flex-col justify-start pb-16">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tighter leading-[0.88] bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
            We Engineer <span className="text-emerald-500 italic">High-Performance</span> <br/>Web &amp; Mobile Products
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

        {/* Right content - The Robot */}
        <div className="hidden lg:flex flex-1 relative w-full h-full items-center justify-center">
          <SplineScene
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="w-full h-full"
          />
        </div>

        {/* Mobile image fallback — shown below lg */}
        <div className="lg:hidden flex-1 w-full h-[40vh] relative overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80"
            alt="Engineering"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
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
