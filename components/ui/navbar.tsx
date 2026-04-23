"use client";

import { useState } from "react";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-[95%] max-w-4xl">
      {/* Glassmorphism Container */}
      <div className="relative bg-zinc-800/60 backdrop-blur-2xl rounded-full border border-white/10 shadow-2xl px-6 py-3">
        <div className="flex items-center justify-between">

          {/* Logo */}
          <a href="/" className="text-lg font-bold text-white tracking-tight hover:text-gray-300 transition-colors">
            TechCo
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            <NavLink href="/work" label="Work" />
            <NavLink href="/projects" label="Projects" />
            <NavLink href="#services" label="Services" />
            <NavLink href="/contact" label="Let's Talk" />
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
              <MobileNavLink href="/work" label="Work" onClick={() => setMobileMenuOpen(false)} />
              <MobileNavLink href="/projects" label="Projects" onClick={() => setMobileMenuOpen(false)} />
              <MobileNavLink href="#services" label="Services" onClick={() => setMobileMenuOpen(false)} />
              <MobileNavLink href="/contact" label="Let's Talk" onClick={() => setMobileMenuOpen(false)} />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      className="group relative px-4 py-2 text-sm font-medium text-gray-200 hover:text-white transition-all duration-200 rounded-full hover:bg-white/5"
    >
      <span className="flex items-center gap-1.5">
        {label}
      </span>
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
