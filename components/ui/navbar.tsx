"use client";

import Link from "next/link";
import { useState } from "react";
import { usePublicSettings } from "@/lib/usePublicAPI";
import { getPublicSettings } from "@/lib/api";

const FALLBACK_BRAND = "FORGE_COLLECTIVE";
const FALLBACK_LINKS = [
  { label: "Work", href: "/projects" },
  { label: "Process", href: "/how-we-work" },
  { label: "Team", href: "/team" },
];
const FALLBACK_CTA = { label: "Let's Talk", href: "/contact" };

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { settings } = usePublicSettings(getPublicSettings);

  const brandName = settings?.navbar?.brandName || FALLBACK_BRAND;
  const navLinks = settings?.navbar?.links?.length ? settings.navbar.links.slice(0, -1) : FALLBACK_LINKS;
  const ctaLink = settings?.navbar?.links?.length
    ? settings.navbar.links[settings.navbar.links.length - 1]
    : FALLBACK_CTA;

  return (
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-[95%] max-w-4xl">
      {/* Glassmorphism Container */}
      <div className="relative bg-zinc-800/60 backdrop-blur-2xl rounded-full border border-white/10 shadow-2xl px-6 py-3">
        <div className="flex items-center justify-between">

          {/* Logo */}
          <a href="/" className="font-mono font-medium tracking-tighter text-sm flex items-center gap-2 text-white">
            <div className="size-2.5 bg-mint inline-block" aria-hidden />
            <span>{brandName}</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8 text-mono-tag">
            {navLinks.map((link) => (
              <NavLink key={link.href} href={link.href} label={link.label} />
            ))}
            <Link
              href={ctaLink.href}
              className="bg-white text-black px-4 py-2 hover:bg-mint transition-colors"
            >
              {ctaLink.label}
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-gray-300 hover:text-white transition-colors p-2"
            aria-label="Toggle menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 mt-2 bg-zinc-800/95 backdrop-blur-2xl rounded-3xl border border-white/10 shadow-2xl overflow-hidden">
            <div className="flex flex-col py-4 px-6 space-y-2">
              {[...navLinks, ctaLink].map((link) => (
                <MobileNavLink key={link.href} href={link.href} label={link.label} onClick={() => setMobileMenuOpen(false)} />
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <a href={href} className="text-zinc-500 hover:text-white transition-colors">
      {label}
    </a>
  );
}

function MobileNavLink({ href, label, onClick }: { href: string; label: string; onClick: () => void }) {
  return (
    <a
      href={href}
      onClick={onClick}
      className="flex items-center justify-between px-4 py-3 text-sm font-medium text-gray-200 hover:text-white hover:bg-white/5 transition-all duration-200 rounded-xl"
    >
      <span>{label}</span>
    </a>
  );
}
