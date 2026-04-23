"use client";

import {
  FaReact, FaAws, FaDocker, FaNodeJs, FaGithub,
  FaTwitter, FaLinkedin, FaPython
} from "react-icons/fa";
import {
  SiNextdotjs, SiVercel, SiRedux, SiTypescript,
  SiTailwindcss, SiMongodb, SiFirebase, SiGraphql, SiPostgresql
} from "react-icons/si";

const iconConfigs = [
  { Icon: FaReact, color: "#61DAFB", name: "React" },
  { Icon: FaAws, color: "#FF9900", name: "AWS" },
  { Icon: FaDocker, color: "#2496ED", name: "Docker" },
  { Icon: FaNodeJs, color: "#339933", name: "Node.js" },
  { Icon: SiNextdotjs, color: "#FFFFFF", name: "Next.js" },
  { Icon: SiVercel, color: "#FFFFFF", name: "Vercel" },
  { Icon: SiRedux, color: "#764ABC", name: "Redux" },
  { Icon: SiTypescript, color: "#3178C6", name: "TypeScript" },
  { Icon: FaGithub, color: "#E6EDF3", name: "GitHub" },
  { Icon: FaTwitter, color: "#1DA1F2", name: "Twitter" },
  { Icon: FaLinkedin, color: "#0077B5", name: "LinkedIn" },
  { Icon: SiTailwindcss, color: "#06B6D4", name: "Tailwind" },
  { Icon: SiMongodb, color: "#47A248", name: "MongoDB" },
  { Icon: FaPython, color: "#3776AB", name: "Python" },
  { Icon: SiFirebase, color: "#FFCA28", name: "Firebase" },
  { Icon: SiGraphql, color: "#E10098", name: "GraphQL" },
  { Icon: SiPostgresql, color: "#4169E1", name: "PostgreSQL" },
];

const techBadges = [
  "React", "Next.js", "TypeScript", "Node.js", "Python",
  "Tailwind CSS", "MongoDB", "PostgreSQL", "Docker", "AWS",
  "GraphQL", "Firebase",
];

const ORBIT_STYLES = `
  @keyframes orbit-spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  @keyframes orbit-counter-spin {
    from { transform: translate(-50%, -50%) rotate(0deg); }
    to { transform: translate(-50%, -50%) rotate(-360deg); }
  }
`;

export default function FeatureSection() {
  const orbitCount = 3;
  const orbitGap = 8;
  const iconsPerOrbit = Math.ceil(iconConfigs.length / orbitCount);

  return (
    <section className="relative max-w-6xl mx-auto my-32 pl-10 flex items-center justify-between h-[30rem] border border-white/10 bg-zinc-950 overflow-hidden rounded-3xl">
      <style dangerouslySetInnerHTML={{ __html: ORBIT_STYLES }} />

      {/* Left side: Heading and Text */}
      <div className="w-1/2 z-10 text-left">
        <h1 className="mb-4 text-white">
          Build your idea
        </h1>
        <p className="text-gray-300 mb-6 max-w-lg">
          Modern tech stack for AI and full-stack development with cutting-edge tools and frameworks.
        </p>
        <div className="flex flex-wrap items-center gap-2">
          {techBadges.map((name) => (
            <span
              key={name}
              className="px-3 py-1.5 text-xs font-medium text-gray-200 bg-white/5 border border-white/10 rounded-full backdrop-blur-sm hover:bg-white/10 hover:border-white/20 transition-colors cursor-default"
            >
              {name}
            </span>
          ))}
        </div>
      </div>

      {/* Right side: Orbit animation */}
      <div className="relative w-1/2 h-full flex items-center justify-start overflow-hidden">
        <div className="relative w-[50rem] h-[50rem] translate-x-[50%] flex items-center justify-center">
          {/* Center Circle */}
          <div className="w-24 h-24 rounded-full bg-zinc-900 border border-white/10 shadow-lg flex items-center justify-center">
            <FaReact className="w-12 h-12 text-blue-400" />
          </div>

          {/* Generate Orbits */}
          {[...Array(orbitCount)].map((_, orbitIdx) => {
            const size = `${12 + orbitGap * (orbitIdx + 1)}rem`;
            const duration = 12 + orbitIdx * 6;
            const angleStep = (2 * Math.PI) / iconsPerOrbit;

            return (
              <div
                key={orbitIdx}
                className="absolute rounded-full border-2 border-dotted border-white/20"
                style={{
                  width: size,
                  height: size,
                  animation: `orbit-spin ${duration}s linear infinite`,
                }}
              >
                {iconConfigs
                  .slice(orbitIdx * iconsPerOrbit, orbitIdx * iconsPerOrbit + iconsPerOrbit)
                  .map((cfg, iconIdx) => {
                    const angle = iconIdx * angleStep;
                    const x = Math.round((50 + 50 * Math.cos(angle)) * 100) / 100;
                    const y = Math.round((50 + 50 * Math.sin(angle)) * 100) / 100;

                    return (
                      <div
                        key={iconIdx}
                        className="absolute bg-zinc-900 border border-white/10 rounded-full p-1.5 shadow-md"
                        suppressHydrationWarning
                        style={{
                          left: `${x}%`,
                          top: `${y}%`,
                          animation: `orbit-counter-spin ${duration}s linear infinite`,
                        }}
                      >
                        <cfg.Icon className="w-8 h-8" style={{ color: cfg.color }} />
                      </div>
                    );
                  })}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
