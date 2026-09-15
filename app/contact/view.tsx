"use client";

import { CONSENT_TEXT } from "@/lib/legal";
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
import { getPublicSettings, submitContact, type PortfolioSettings } from "@/lib/api";

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

// Company-owned, never a personal address or number. These render publicly on
// any settings-fetch failure, so a personal contact here becomes the brand
// advertised contact during an outage.
const FALLBACK_EMAIL = "hello@umaeng.co.in";
const FALLBACK_PHONE = "";

const FIELD_CLASS =
  "w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-sm text-white placeholder:text-zinc-700 focus:outline-none focus:border-mint/30 focus:ring-1 focus:ring-mint/10 transition-all";

/**
 * Label + control, with the association actually made.
 *
 * Every label on this form previously rendered as a bare styled <label> with no
 * htmlFor and no id on its input — a WCAG 1.3.1 / 4.1.2 failure on the one page
 * that generates revenue. A screen-reader user heard three unnamed fields, and
 * browser autofill had nothing to match on.
 */
function Field({
  id,
  label,
  children
}: {
  id: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-3">
      <label
        htmlFor={id}
        className="block text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-1"
      >
        {label}
      </label>
      {children}
    </div>
  );
}

/** Coarse on purpose: a band is a click, an exact figure is a negotiation. */
const BUDGET_OPTIONS = [
  "Under ₹2L",
  "₹2L – ₹5L",
  "₹5L – ₹15L",
  "₹15L+",
  "Not sure yet"
];

const TIMELINE_OPTIONS = [
  "As soon as possible",
  "1–3 months",
  "3–6 months",
  "Just exploring"
];
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

export default function ContactView({ initialSettings }: { initialSettings: PortfolioSettings | null }) {
  const { settings } = usePublicSettings(getPublicSettings, initialSettings);

  const email = settings?.contactInfo?.email || FALLBACK_EMAIL;
  const phone = settings?.contactInfo?.phone || FALLBACK_PHONE;
  const services = settings?.services?.length ? settings.services : FALLBACK_SERVICES;
  const callSlots = settings?.callSlots?.length ? settings.callSlots : FALLBACK_CALL_SLOTS;

  // The phone card is dropped entirely when no number is configured, rather
  // than rendering an empty card with a dead tel: link.
  const infoCards = [
    { icon: Mail, label: "Email", value: email, href: `mailto:${email}` },
    ...(phone
      ? [{ icon: Phone, label: "Phone", value: phone, href: `tel:${phone.replace(/\s/g, "")}` }]
      : []),
  ];

  const [tab, setTab] = useState<"message" | "call">("call");
  // callSlot was typed on ContactFormData, stored by the server and rendered in
  // the admin detail pane, but was never in form state and the slot buttons had
  // no onClick — so the field was empty end to end.
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    budgetBand: "",
    timeline: "",
    callSlot: "",
    message: "",
    // Honeypot: hidden from people, irresistible to form bots.
    website: "",
  });
  const [consented, setConsented] = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const errorRef = useRef<HTMLParagraphElement>(null);
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
      await submitContact({
        ...formState,
        // Sent only when actually ticked: the server timestamps consent on the
        // presence of this text, so sending it unconditionally would record a
        // consent nobody gave.
        consentText: consented ? CONSENT_TEXT : "",
      });
      setSent(true);
      setFormState({
        name: "",
        email: "",
        phone: "",
        company: "",
        service: "",
        budgetBand: "",
        timeline: "",
        callSlot: "",
        message: "",
        website: "",
      });
      setConsented(false);
    } catch {
      setSubmitError("Failed to send. Please try again.");
      // Move focus to the error so a screen-reader user is told the submit
      // failed, instead of being left on a button that silently did nothing.
      requestAnimationFrame(() => errorRef.current?.focus());
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
                    {callSlots.map((slot) => {
                      const isSelected = formState.callSlot === slot;
                      return (
                        <button
                          key={slot}
                          type="button"
                          aria-pressed={isSelected}
                          onClick={() =>
                            setFormState((prev) => ({
                              ...prev,
                              callSlot: prev.callSlot === slot ? "" : slot,
                            }))
                          }
                          className={
                            isSelected
                              ? "text-[11px] font-mono py-4 border rounded-xl transition-all capitalize border-mint text-mint bg-mint/5"
                              : "text-[11px] font-mono py-4 border rounded-xl transition-all capitalize border-white/5 bg-zinc-900/50 text-zinc-400 hover:border-mint hover:text-mint"
                          }
                        >
                          {slot}
                        </button>
                      );
                    })}
                  </div>

                  {/*
                    This was an <a> to https://cal.com — the vendor's own
                    marketing homepage, not a booking page. The default tab of
                    the only conversion page on the site therefore had no way to
                    convert, and its single CTA sent traffic to a third party.
                    It now carries the chosen slot into the enquiry form, which
                    is a real submission that reaches a real inbox.
                  */}
                  <button
                    type="button"
                    onClick={() => setTab("message")}
                    className="group inline-flex items-center gap-3 px-12 py-5 rounded-full bg-white text-black font-bold hover:scale-105 active:scale-95 transition-all shadow-xl"
                  >
                    {formState.callSlot ? `Request ${formState.callSlot}` : "Request a Call"}
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                  {!formState.callSlot && (
                    <p className="mt-4 text-xs text-zinc-500 font-mono">
                      Pick a slot above, or continue and tell us what suits you.
                    </p>
                  )}

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
                        <Field id="contact-name" label="Full Name">
                          <input
                            id="contact-name"
                            type="text"
                            name="name"
                            required
                            autoComplete="name"
                            value={formState.name}
                            onChange={handleChange}
                            placeholder="John Doe"
                            className={FIELD_CLASS}
                          />
                        </Field>
                        <Field id="contact-email" label="Email Address">
                          <input
                            id="contact-email"
                            type="email"
                            name="email"
                            required
                            autoComplete="email"
                            value={formState.email}
                            onChange={handleChange}
                            placeholder="john@company.com"
                            className={FIELD_CLASS}
                          />
                        </Field>
                      </div>

                      {/*
                        Qualification fields, all optional. Asking for a phone
                        number and a budget band is what separates an enquiry
                        that can be triaged and called back from a name and a
                        paragraph — but making any of them required would cost
                        more leads than the extra detail is worth.
                      */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Field id="contact-phone" label="Phone (optional)">
                          <input
                            id="contact-phone"
                            type="tel"
                            name="phone"
                            autoComplete="tel"
                            value={formState.phone}
                            onChange={handleChange}
                            placeholder="+91 98765 43210"
                            className={FIELD_CLASS}
                          />
                        </Field>
                        <Field id="contact-company" label="Company (optional)">
                          <input
                            id="contact-company"
                            type="text"
                            name="company"
                            autoComplete="organization"
                            value={formState.company}
                            onChange={handleChange}
                            placeholder="Acme Inc."
                            className={FIELD_CLASS}
                          />
                        </Field>
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

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <CustomSelect
                          label="Indicative Budget (optional)"
                          value={formState.budgetBand}
                          onChange={(val) =>
                            setFormState((prev) => ({ ...prev, budgetBand: val }))
                          }
                          options={BUDGET_OPTIONS}
                          placeholder="Select a range"
                        />
                        <CustomSelect
                          label="Timeline (optional)"
                          value={formState.timeline}
                          onChange={(val) =>
                            setFormState((prev) => ({ ...prev, timeline: val }))
                          }
                          options={TIMELINE_OPTIONS}
                          placeholder="When do you want to start?"
                        />
                      </div>

                      <Field id="contact-message" label="Project Details">
                        <textarea
                          id="contact-message"
                          name="message"
                          required
                          rows={6}
                          value={formState.message}
                          onChange={handleChange}
                          placeholder="Objectives, timeframe, and technical requirements..."
                          className={`${FIELD_CLASS} resize-none`}
                        />
                      </Field>

                      {/*
                        Honeypot. Hidden from sighted users, from screen readers
                        (aria-hidden) and from the keyboard (tabIndex -1), so no
                        real visitor can fill it in by accident. Not `display:
                        none`, which many bots skip.
                      */}
                      <div className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
                        <label htmlFor="contact-website">Leave this field empty</label>
                        <input
                          id="contact-website"
                          type="text"
                          name="website"
                          tabIndex={-1}
                          autoComplete="off"
                          value={formState.website}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="flex items-start gap-3">
                        <input
                          id="contact-consent"
                          type="checkbox"
                          required
                          checked={consented}
                          onChange={(e) => setConsented(e.target.checked)}
                          className="mt-1 size-4 shrink-0 accent-mint"
                        />
                        <label htmlFor="contact-consent" className="text-xs leading-relaxed text-zinc-400">
                          {CONSENT_TEXT}{" "}
                          <Link href="/privacy" className="text-mint underline hover:no-underline">
                            Read the Privacy Policy
                          </Link>
                          .
                        </label>
                      </div>

                      {submitError && (
                        <p
                          ref={errorRef}
                          tabIndex={-1}
                          role="alert"
                          className="text-red-400 text-sm font-mono outline-none"
                        >
                          {submitError}
                        </p>
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
