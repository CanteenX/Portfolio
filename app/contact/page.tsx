"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Send,
  Mail,
  MapPin,
  Phone,
  Loader2,
  CheckCircle2,
  MessageSquare,
  Clock,
  ArrowUpRight,
} from "lucide-react";
import { GlobePulse } from "@/components/ui/cobe-globe-pulse";
import { CustomSelect } from "@/components/ui/custom-select";

const INFO_CARDS = [
  {
    icon: Mail,
    label: "Email",
    value: "hello@techco.dev",
    href: "mailto:hello@techco.dev",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+1 (555) 000-1234",
    href: "tel:+15550001234",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "San Francisco, CA",
  },
  {
    icon: Clock,
    label: "Response Time",
    value: "Within 24 hours",
  },
];

const SERVICES = [
  "App Development",
  "Website Building",
  "CRM Panel",
  "SEO",
  "Google & Meta Ads",
  "Tech Consultancy",
  "UI/UX Design",
  "AI Solutions",
];

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    service: "",
    message: "",
  });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    // Simulate send — replace with your API call
    await new Promise((r) => setTimeout(r, 1500));
    setSending(false);
    setSent(true);
    setFormState({ name: "", email: "", service: "", message: "" });
  };

  return (
    <main className="min-h-screen w-full bg-black text-white overflow-x-hidden">
      {/* Nav */}
      <nav className="fixed top-0 inset-x-0 z-50 border-b border-white/5 bg-black/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Home
          </Link>
          <span className="text-sm font-semibold tracking-tight text-white">
            TechCo
          </span>
        </div>
      </nav>

      {/* ============ HERO WITH GLOBE ============ */}
      <section className="relative pt-28 pb-10 md:pt-36 md:pb-16 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left — text */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full border border-white/10 bg-white/5 text-xs font-medium text-zinc-300">
              <MessageSquare size={14} />
              Let&apos;s Talk
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] mb-5">
              <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-500">
                Get in Touch
              </span>
            </h1>

            <p className="text-lg text-zinc-400 max-w-md mx-auto lg:mx-0 leading-relaxed mb-8">
              Have a project in mind? Send us your inquiry and we&apos;ll get back to you within 24 hours.
            </p>

            {/* Info mini-cards inline */}
            <div className="grid grid-cols-2 gap-3 max-w-md mx-auto lg:mx-0">
              {INFO_CARDS.map((card) => {
                const content = (
                  <div className="flex items-start gap-3">
                    <card.icon size={16} className="text-zinc-500 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-zinc-600 font-semibold">
                        {card.label}
                      </p>
                      <p className="text-xs text-zinc-300 font-medium mt-0.5">
                        {card.value}
                      </p>
                    </div>
                  </div>
                );

                return card.href ? (
                  <a
                    key={card.label}
                    href={card.href}
                    className="group p-3.5 rounded-xl border border-white/5 bg-zinc-950 hover:border-white/10 transition-colors"
                  >
                    {content}
                  </a>
                ) : (
                  <div
                    key={card.label}
                    className="p-3.5 rounded-xl border border-white/5 bg-zinc-950"
                  >
                    {content}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right — globe */}
          <div className="order-1 lg:order-2 flex items-center justify-center">
            <div className="w-full max-w-[400px] lg:max-w-[480px]">
              <GlobePulse speed={0.004} />
            </div>
          </div>
        </div>

        {/* Radial glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-b from-cyan-500/5 via-transparent to-transparent rounded-full blur-3xl pointer-events-none" />
      </section>

      {/* ============ FORM ============ */}
      <section className="px-6 pb-24 md:pb-32">
        <div className="max-w-3xl mx-auto">
          <div className="rounded-3xl border border-white/5 bg-zinc-950 p-8 md:p-12">
            {sent ? (
              /* Success state */
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-6">
                  <CheckCircle2 size={32} className="text-emerald-400" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Message Sent</h3>
                <p className="text-zinc-400 text-sm max-w-sm mb-8">
                  Thank you for reaching out. We&apos;ll review your inquiry and get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="text-sm font-medium text-zinc-400 hover:text-white transition-colors underline underline-offset-4"
                >
                  Send another message
                </button>
              </div>
            ) : (
              /* Form */
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-7">
                <div className="mb-2">
                  <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">
                    Send us a message
                  </h2>
                  <p className="text-sm text-zinc-500">
                    Fill out the form below and we&apos;ll be in touch.
                  </p>
                </div>

                {/* Name + Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formState.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className="w-full bg-white/3 border border-white/8 rounded-xl px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-white/20 focus:ring-1 focus:ring-white/10 transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formState.email}
                      onChange={handleChange}
                      placeholder="you@company.com"
                      className="w-full bg-white/3 border border-white/8 rounded-xl px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-white/20 focus:ring-1 focus:ring-white/10 transition-colors"
                    />
                  </div>
                </div>

                {/* Service — custom select */}
                <CustomSelect
                  label="Service Interested In"
                  value={formState.service}
                  onChange={(val) =>
                    setFormState((prev) => ({ ...prev, service: val }))
                  }
                  options={SERVICES}
                  placeholder="Select a service"
                />

                {/* Message */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
                    Message
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    value={formState.message}
                    onChange={handleChange}
                    placeholder="Tell us about your project, goals, and timeline..."
                    className="w-full bg-white/3 border border-white/8 rounded-xl px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-white/20 focus:ring-1 focus:ring-white/10 transition-colors resize-none"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={sending}
                  className="w-full md:w-auto flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-white text-black text-sm font-semibold hover:bg-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {sending ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs text-zinc-600">
          <span>TechCo</span>
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
        </div>
      </footer>
    </main>
  );
}
