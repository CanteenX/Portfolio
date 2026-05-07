"use client";

import Link from "next/link";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { usePublicSettings } from "@/lib/usePublicAPI";
import { getPublicSettings } from "@/lib/api";

const FALLBACK = {
  brandName: "NVENTRA",
  description: "An elite engineering collective building high-performance web and mobile products for global brands.",
  email: "deepmenta081@gmail.com",
  version: "v4.2 — STABLE_BUILD",
  links: [
    { label: "Work", href: "/work" },
    { label: "Services", href: "/services" },
    { label: "Team", href: "/team" },
    { label: "Projects", href: "/projects" },
    { label: "Contact", href: "/contact" },
  ],
};

export function Footer() {
  const { settings } = usePublicSettings(getPublicSettings);

  const brandName = settings?.navbar?.brandName || FALLBACK.brandName;
  const description = settings?.footer?.description || FALLBACK.description;
  const email = settings?.footer?.email || FALLBACK.email;
  const version = settings?.footer?.version || FALLBACK.version;
  const links = settings?.footer?.links?.length ? settings.footer.links : FALLBACK.links;

  return (
    <footer className="border-t hairline mt-16 bg-black">
      <ScrollReveal direction="up">
        <div className="max-w-7xl mx-auto px-6 py-12 grid gap-10 md:grid-cols-4 text-left">
          <div className="md:col-span-2">
            <div className="font-mono text-base font-medium flex items-center gap-2 text-white mb-4">
              <span className="size-2.5 bg-mint inline-block" />
              {brandName}
            </div>
            <p className="text-zinc-500 text-base max-w-sm leading-relaxed font-light">
              {description}
            </p>
          </div>
          <div>
            <div className="font-mono text-sm font-semibold text-zinc-500 tracking-widest uppercase mb-6">/sitemap</div>
            <ul className="space-y-4">
              {links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-base font-medium text-zinc-300 hover:text-mint transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="font-mono text-sm font-semibold text-zinc-500 tracking-widest uppercase mb-6">/contact</div>
            <a href={`mailto:${email}`} className="text-base font-medium text-zinc-300 hover:text-mint block mb-4 transition-colors break-all">
              {email}
            </a>
            <div className="font-mono text-sm text-zinc-500 uppercase tracking-[0.2em] leading-relaxed">
              {version}
            </div>
          </div>
        </div>
      </ScrollReveal>

      <div className="border-t hairline">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between gap-4 font-mono text-sm text-zinc-500 tracking-widest uppercase">
          <span>© {new Date().getFullYear()} {brandName}. All rights reserved.</span>
          <span className="flex items-center gap-2">
            <span className="size-1.5 bg-mint animate-pulse" />
            All systems operational
          </span>
        </div>
      </div>
    </footer>
  );
}
