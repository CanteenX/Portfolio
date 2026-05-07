"use client";
import { useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

interface Project {
  title: string;
  description: string;
  href: string;
  image: string;
  eyebrow: string;
}

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    setSpotlight({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
      opacity: 0.15,
    });
  };

  return (
    <ScrollReveal key={index} delay={index * 0.1} direction="up">
      <Link
        ref={cardRef}
        href={project.href}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setSpotlight((s) => ({ ...s, opacity: 0 }))}
        className="group relative block aspect-[16/10] overflow-hidden bg-zinc-900"
      >
        <img
          src={project.image}
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover transition-all duration-700 opacity-40 group-hover:opacity-60 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
        {/* Cursor spotlight */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle 200px at ${spotlight.x}% ${spotlight.y}%, rgba(110,231,183,${spotlight.opacity}), transparent)`,
          }}
        />
        <div className="absolute inset-0 p-8 flex flex-col justify-between">
          <div>
            <div className="text-mono-tag text-mint font-bold tracking-widest drop-shadow-sm mb-4">
              {project.eyebrow}
            </div>
            <h3 className="text-3xl font-bold tracking-tighter mb-2 text-mint">
              {project.title}
            </h3>
            <p className="text-zinc-400 text-base max-w-sm font-light leading-relaxed">
              {project.description}
            </p>
          </div>
          <div className="flex items-center gap-2 text-mono-tag text-mint opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
            View Project <ArrowRight className="w-3 h-3" />
          </div>
        </div>
      </Link>
    </ScrollReveal>
  );
}
