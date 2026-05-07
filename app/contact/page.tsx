"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  Send,
  Mail,
  Phone,
  Loader2,
  CheckCircle2,
  MessageSquare,
  Clock,
  Calendar,
  Video,
  ArrowRight,
} from "lucide-react";
import { GlobePulse } from "@/components/ui/cobe-globe-pulse";
import { CustomSelect } from "@/components/ui/custom-select";
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { usePublicSettings } from "@/lib/usePublicAPI";
import { getPublicSettings, submitContact } from "@/lib/api";

function useLocalTime() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const update = () =>
      setTime(
        new Intl.DateTimeFormat("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: "Asia/Kolkata",
          hour12: false,
        }).format(new Date())
      );
    update();
    const id = setInterval(update, 30_000);
    return () => clearInterval(id);
  }, []);
  return time;
}

const FALLBACK_EMAIL = "deepmenta081@gmail.com";
const FALLBACK_PHONE = "9173694508";
const FALLBACK_SERVICES = [
  "App Development",
  "Website Building",
  "CRM Panel",
  "SEO",
  "Google & Meta Ads",
  "Tech Consultancy",
  "UI/UX Design",
  "AI Solutions",
];
const FALLBACK_CALL_SLOTS = [
  "Mon 09 · 3pm",
  "Tue 10 · 11am",
  "Wed 11 · 4pm",
  "Thu 12 · 2pm",
  "Thu 12 · 5pm",
  "Fri 13 · 10am",
];

export default function ContactPage() {
  const { settings } = usePublicSettings(getPublicSettings);

  const email = settings?.contactInfo?.email || FALLBACK_EMAIL;
  const phone = settings?.contactInfo?.phone || FALLBACK_PHONE;
  const services = settings?.services?.length ? settings.services : FALLBACK_SERVICES;
  const callSlots = settings?.callSlots?.length ? settings.callSlots : FALLBACK_CALL_SLOTS;

  const infoCards = [
    { icon: Mail, label: "Email", value: email, href: `mailto:${email}` },
    { icon: Phone, label: "Phone", value: phone, href: `tel:${phone.replace(/\s/g, "")}` },
  ];

  const [tab, setTab] = useState<"message" | "call">("call");
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    service: "",
    message: "",
  });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const time = useLocalTime();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setSubmitError("");
    try {
      await submitContact(formState);
      setSent(true);
      setFormState({ name: "", email: "", service: "", message: "" });
    } catch {
      setSubmitError("Failed to send. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <main className="min-h-screen w-full bg-black text-white selection:bg-mint/30 overflow-x-hidden">
      <Navbar />

      {/* ============ HERO SECTION ============ */}
      <section className="relative pt-36 pb-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="text-center lg:text-left">
            <ScrollReveal direction="up">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full border border-mint/20 bg-mint/5 text-xs font-medium text-mint">
                <MessageSquare size={14} />
                Initialize // Let's Talk
              </div>

              <h1 className="mb-6">
                Let's build <span className="text-zinc-500">together.</span>
              </h1>

              <p className="text-lg text-zinc-400 max-w-md mx-auto lg:mx-0 leading-relaxed mb-10">
                Pick your preferred route. Whether it's a quick message or a deep-dive discovery call, we respond in under 12 hours.
              </p>

              <div className="space-y-6 max-w-md mx-auto lg:mx-0">
                {/* Local Time Card */}
                <div className="p-6 rounded-2xl border border-white/5 bg-zinc-950/50 backdrop-blur-sm flex items-center justify-between">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-1">Local Time // IST</p>
                    <div className="flex items-center gap-3">
                      <span className="size-2 bg-mint rounded-full animate-pulse" />
                      <span className="text-2xl font-mono tabular-nums">{time || "--:--"}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-1">Status</p>
                    <span className="text-xs text-zinc-300 font-medium">Engineers Online</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {infoCards.map((card) => (
                    <a
                      key={card.label}
                      href={card.href}
                      className="group p-5 rounded-2xl border border-white/5 bg-zinc-950/50 hover:border-mint/30 transition-all duration-300 flex items-start gap-4"
                    >
                      <div className="p-2 rounded-lg bg-white/5 border border-white/10 shrink-0">
                        <card.icon size={18} className="text-mint" />
                      </div>
                      <div className="text-left overflow-hidden min-w-0">
                        <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-1">
                          {card.label}
                        </p>
                        <p className="text-sm text-zinc-300 font-medium truncate">
                          {card.value}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>

          <div className="flex items-center justify-center">
            <ScrollReveal direction="right" delay={0.2}>
              <div className="w-full max-w-[500px] aspect-square relative group">
                <div className="absolute inset-0 bg-mint/5 blur-[100px] rounded-full" />
                <GlobePulse speed={0.003} />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ============ INTERACTIVE SECTION ============ */}
      <section className="px-6 pb-32">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal direction="up" delay={0.3}>
            <div className="mb-10 flex border border-white/5 bg-zinc-950/50 p-1.5 rounded-2xl w-fit mx-auto md:mx-0">
              <button
                onClick={() => setTab("call")}
                className={`flex items-center gap-2 px-8 py-3 text-xs font-bold uppercase tracking-widest transition-all rounded-xl ${
                  tab === "call" ? "bg-mint text-black" : "text-zinc-500 hover:text-white"
                }`}
              >
                <Calendar size={14} />
                Book a Call
              </button>
              <button
                onClick={() => setTab("message")}
                className={`flex items-center gap-2 px-8 py-3 text-xs font-bold uppercase tracking-widest transition-all rounded-xl ${
                  tab === "message" ? "bg-mint text-black" : "text-zinc-500 hover:text-white"
                }`}
              >
                <MessageSquare size={14} />
                Send a Message
              </button>
            </div>

            <div className="rounded-[2.5rem] border border-white/5 bg-zinc-950/50 backdrop-blur-sm p-8 md:p-16 relative overflow-hidden min-h-[600px]">
              <div className="absolute top-0 right-0 w-64 h-64 bg-mint/5 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2" />

              {tab === "call" ? (
                <div className="relative z-10 flex flex-col items-center md:items-start">
                   <div className="mb-12 text-center md:text-left">
                    <h2 className="tracking-tight mb-3">Discovery Call.</h2>
                    <p className="text-zinc-500 max-w-sm">
                      Pick a 30-minute slot that works for you. We&apos;ll send a calendar invite with a video link — no interrogations, just engineering talk.
                    </p>
                  </div>

                  <div className="w-full grid grid-cols-2 md:grid-cols-3 gap-3 mb-10">
                    {callSlots.map((slot) => (
                      <button
                        key={slot}
                        className="text-[11px] font-mono py-4 border border-white/5 bg-zinc-900/50 rounded-xl hover:border-mint hover:text-mint transition-all text-zinc-400 capitalize"
                      >
                        {slot}
                      </button>
                    ))}
                  </div>

                  <a
                    href="https://cal.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-3 px-12 py-5 rounded-full bg-white text-black font-bold hover:scale-105 active:scale-95 transition-all shadow-xl"
                  >
                    View All Availability
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </a>

                  <div className="mt-12 flex items-center gap-4 text-xs text-zinc-500 font-mono">
                    <div className="flex items-center gap-2">
                      <Video size={14} className="text-mint" />
                      Google Meet
                    </div>
                    <span>•</span>
                    <div className="flex items-center gap-2">
                      <Clock size={14} className="text-mint" />
                      30 Minutes
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  {sent ? (
                    <div className="flex flex-col items-center justify-center py-20 text-center relative z-10 h-full">
                      <div className="w-20 h-20 rounded-full bg-mint/10 border border-mint/20 flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(0,255,163,0.1)]">
                        <CheckCircle2 size={40} className="text-mint" />
                      </div>
                      <h2 className="mb-4">Transmission Successful.</h2>
                      <p className="text-zinc-500 text-base max-w-sm mb-10">
                        Your message has been encrypted and sent to our team. Expect a response in under 12 hours.
                      </p>
                      <button
                        onClick={() => setSent(false)}
                        className="text-mono-tag text-mint hover:text-white transition-colors underline underline-offset-8"
                      >
                        Resend Connection Request
                      </button>
                    </div>
                  ) : (
                    <form ref={formRef} onSubmit={handleSubmit} className="space-y-8 relative z-10">
                      <div className="mb-10 text-center md:text-left">
                        <h2 className="tracking-tight mb-3">Direct Protocol.</h2>
                        <p className="text-zinc-500">
                          Brief us on your objectives and we'll engineer the path forward.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-1">
                            Full Name
                          </label>
                          <input
                            type="text"
                            name="name"
                            required
                            value={formState.name}
                            onChange={handleChange}
                            placeholder="John Doe"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-sm text-white placeholder:text-zinc-700 focus:outline-none focus:border-mint/30 focus:ring-1 focus:ring-mint/10 transition-all"
                          />
                        </div>
                        <div className="space-y-3">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-1">
                            Email Address
                          </label>
                          <input
                            type="email"
                            name="email"
                            required
                            value={formState.email}
                            onChange={handleChange}
                            placeholder="john@company.com"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-sm text-white placeholder:text-zinc-700 focus:outline-none focus:border-mint/30 focus:ring-1 focus:ring-mint/10 transition-all"
                          />
                        </div>
                      </div>

                      <CustomSelect
                        label="Objective // Service"
                        value={formState.service}
                        onChange={(val) =>
                          setFormState((prev) => ({ ...prev, service: val }))
                        }
                        options={services}
                        placeholder="Select a category"
                      />

                      <div className="space-y-3">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-1">
                          Project Details
                        </label>
                        <textarea
                          name="message"
                          required
                          rows={6}
                          value={formState.message}
                          onChange={handleChange}
                          placeholder="Objectives, timeframe, and technical requirements..."
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-sm text-white placeholder:text-zinc-700 focus:outline-none focus:border-mint/30 focus:ring-1 focus:ring-mint/10 transition-all resize-none"
                        />
                      </div>

                      {submitError && (
                        <p className="text-red-400 text-sm font-mono">{submitError}</p>
                      )}

                      <button
                        type="submit"
                        disabled={sending}
                        className="w-full md:w-auto flex items-center justify-center gap-3 px-10 py-5 rounded-full bg-mint text-black text-sm font-bold shadow-[0_0_20px_rgba(0,255,163,0.2)] hover:shadow-[0_0_30px_rgba(0,255,163,0.4)] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                      >
                        {sending ? (
                          <>
                            <Loader2 size={18} className="animate-spin" />
                            Transmitting...
                          </>
                        ) : (
                          <>
                            <Send size={18} />
                            Send Request
                          </>
                        )}
                      </button>
                    </form>
                  )}
                </>
              )}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}
