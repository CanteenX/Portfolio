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

      <div className="flex h-full flex-col md:flex-row items-center">
        {/* Left content */}
        <div className="flex-1 px-12 md:px-24 relative z-10 flex flex-col justify-center">
          <h1 className="bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
            We Engineer <span className="text-emerald-500 italic">High-Performance</span> Web & Mobile Products
          </h1>
          <p className="mt-8 text-neutral-400 text-lg md:text-xl max-w-2xl leading-relaxed font-light">
            An elite engineering collective transforming complex problems into elegant production-grade software. 
            We build for scale, performance, and the future.
          </p>
          <div className="mt-12 flex flex-wrap gap-6">
            <a 
              href="/work" 
              className="px-12 py-6 bg-mint text-black font-bold hover:brightness-110 transition-all flex items-center gap-2 uppercase tracking-widest text-xs"
            >
              Explore our artifacts
            </a>
            <a 
              href="/contact" 
              className="px-12 py-6 bg-[#111] text-white border border-white/5 font-bold hover:bg-[#1a1a1a] transition-all uppercase tracking-widest text-xs"
            >
              Initiate Discovery
            </a>
          </div>
        </div>

        {/* Right content - The Robot - Responsive behavior */}
        <div className="hidden lg:flex flex-1 relative w-full h-[70vh] items-center justify-center">
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
