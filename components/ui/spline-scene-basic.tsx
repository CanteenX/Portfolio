'use client'

import { SplineScene } from "@/components/ui/splite";
import { Card } from "@/components/ui/card"
import { Spotlight as SpotlightAceternity } from "@/components/ui/spotlight-aceternity"

export function SplineSceneBasic() {
  return (
    <Card className="w-full h-[500px] bg-black/[0.96] relative overflow-hidden border-white/10">
      <SpotlightAceternity
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />

      <div className="flex h-full flex-col md:flex-row">
        {/* Left content */}
        <div className="flex-1 p-8 relative z-10 flex flex-col justify-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 leading-tight">
            We Engineer <span className="text-emerald-500 italic">High-Performance</span> Web & Mobile Products
          </h1>
          <p className="mt-6 text-neutral-400 text-lg max-w-lg leading-relaxed">
            Bring your UI to life with beautiful 3D scenes. Create immersive experiences
            that capture attention and enhance your design.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a 
              href="/work" 
              className="px-10 py-5 bg-[#00ffa3] text-black font-bold hover:brightness-110 transition-all flex items-center gap-2 uppercase tracking-wider text-sm"
            >
              View our work
            </a>
            <a 
              href="/contact" 
              className="px-10 py-5 bg-[#1a1a1a] text-white font-bold hover:bg-[#252525] transition-all uppercase tracking-wider text-sm"
            >
              Book a Discovery Call
            </a>
          </div>
        </div>

        {/* Right content */}
        <div className="flex-1 relative">
          <SplineScene
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="w-full h-full"
          />
        </div>
      </div>
    </Card>
  )
}
