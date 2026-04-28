"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import { getMember, splitName, personnelRef, TEAM } from "@/lib/team";
import { getPublicMemberBySlug, getPublicTeam } from "@/lib/api";
import type { ApiMember } from "@/lib/api";
import type { Member } from "@/lib/team";
import Link from "next/link";
import {
  ArrowLeft,
  Mail,
  Globe,
  MapPin,
  Languages,
  ExternalLink
} from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { ContactCTA } from "@/components/ui/contact-cta";

export default function MemberPage() {
  const { slug } = useParams();
  const [member, setMember] = useState<Member | ApiMember | null | undefined>(undefined);
  const [allMembers, setAllMembers] = useState<(Member | ApiMember)[]>(TEAM);

  useEffect(() => {
    Promise.all([
      getPublicMemberBySlug(slug as string),
      getPublicTeam(),
    ])
      .then(([memberData, teamData]) => {
        setMember(memberData ?? getMember(slug as string) ?? null);
        setAllMembers(teamData.length > 0 ? teamData : TEAM);
      })
      .catch(() => {
        setMember(getMember(slug as string) ?? null);
        setAllMembers(TEAM);
      });
  }, [slug]);

  if (member === undefined) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-mint border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!member) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
        <h1 className="text-4xl font-bold mb-4">Member Not Found</h1>
        <a href="/team" className="text-mint hover:underline">Back to Team</a>
      </div>
    );
  }

  const { first, last } = splitName(member.name);
  const idx = allMembers.findIndex((m) => m.slug === member.slug);
  const nextMember = allMembers[(idx + 1) % allMembers.length];

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden selection:bg-mint/30">
      <Navbar />

      {/* Ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 right-0 h-[800px] w-[800px] rounded-full opacity-20 blur-[120px]"
        style={{ background: member.glow }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full opacity-10 blur-[140px]"
        style={{ background: member.glow }}
      />

      <main className="relative pt-24 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Top dossier bar */}
          <ScrollReveal direction="down">
            <div className="flex items-center justify-between mb-12 pb-6 border-b border-white/10">
              <Link
                href="/team"
                className="group inline-flex items-center gap-2 text-mono-tag text-gray-500 hover:text-mint transition-colors"
              >
                <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
                Close Dossier
              </Link>
              <div className="text-mono-tag text-gray-500 tabular-nums">
                {personnelRef(member.id)}
              </div>
            </div>
          </ScrollReveal>

          {/* 12-col grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* LEFT: 4/12 */}
            <aside className="lg:col-span-4 space-y-12">
              {/* Avatar */}
              <ScrollReveal direction="left">
                <div className="relative group">
                  <div
                    aria-hidden
                    className={`absolute -inset-2 rounded-[44px] bg-gradient-to-br ${member.accent} opacity-20 blur-2xl group-hover:opacity-40 transition-opacity duration-700`}
                  />
                  <div className="relative aspect-square overflow-hidden rounded-[40px] border border-white/10 bg-zinc-900">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="h-full w-full object-cover grayscale contrast-110 group-hover:grayscale-0 transition-all duration-700"
                    />
                  </div>
                </div>
              </ScrollReveal>

              {/* Personal */}
              <ScrollReveal direction="left" delay={0.1}>
                <section>
                  <div className="text-mono-tag text-mint mb-4">/personal_details</div>
                  <ul className="space-y-4 text-sm">
                    <li className="flex items-start gap-4">
                      <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                        <MapPin className="h-4 w-4 text-mint" />
                      </div>
                      <span className="text-gray-300 self-center">{member.personal.location}</span>
                    </li>
                    <li className="flex items-start gap-4">
                      <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                        <Mail className="h-4 w-4 text-mint" />
                      </div>
                      <a href={`mailto:${member.personal.email}`} className="text-gray-300 hover:text-mint transition-colors break-all self-center">
                        {member.personal.email}
                      </a>
                    </li>
                    <li className="flex items-start gap-4">
                      <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                        <Languages className="h-4 w-4 text-mint" />
                      </div>
                      <span className="text-gray-400 self-center">{member.personal.languages.join(" · ")}</span>
                    </li>
                  </ul>
                </section>
              </ScrollReveal>

              {/* Skill matrix */}
              <ScrollReveal direction="left" delay={0.2}>
                <section>
                  <div className="text-mono-tag text-mint mb-4">/skill_matrix</div>
                  <ul className="space-y-5">
                    {member.skills.map((s) => (
                      <li key={s.name}>
                        <div className="flex justify-between text-[11px] font-mono mb-2 uppercase tracking-widest text-gray-400">
                          <span>{s.name}</span>
                          <span className="text-mint tabular-nums">{s.level}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                          <div
                            className={`h-full bg-gradient-to-r ${member.accent} transition-[width] duration-1000 ease-out`}
                            style={{ width: `${s.level}%` }}
                          />
                        </div>
                      </li>
                    ))}
                  </ul>
                </section>
              </ScrollReveal>
            </aside>

            {/* RIGHT: 8/12 */}
            <div className="lg:col-span-8 space-y-20">
              {/* Header / Identity */}
              <header>
                <ScrollReveal direction="up">
                  <div className={`text-mono-tag bg-gradient-to-r ${member.accent} bg-clip-text text-transparent mb-6 font-bold`}>
                    {member.role}
                  </div>
                  <h1 className="tracking-tighter leading-[0.85]">
                    <span className="block">{first}</span>
                    <span className="block text-gray-600">{last}</span>
                  </h1>

                  <div className="mt-10 flex flex-wrap gap-4">
                    {[
                      { icon: <Mail className="h-4 w-4" />, label: "Email", href: `mailto:${member.personal.email}` },
                      { icon: <FaGithub className="h-4 w-4" />, label: "GitHub", href: member.socials?.github ?? "#" },
                      { icon: <Globe className="h-4 w-4" />, label: "Portfolio", href: member.socials?.portfolio ?? "#" },
                    ].map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        className="inline-flex items-center gap-3 bg-zinc-900/50 backdrop-blur-sm border border-white/5 px-6 py-3 text-mono-tag hover:border-mint/50 hover:text-mint transition-all duration-300 rounded-full"
                      >
                        {link.icon} {link.label}
                      </a>
                    ))}
                  </div>
                </ScrollReveal>
              </header>

              {/* Bio */}
              <ScrollReveal direction="right">
                <section>
                  <div className="text-mono-tag text-mint mb-6">/bio</div>
                  <p className="text-3xl md:text-4xl font-medium italic leading-tight tracking-tight text-white/90">
                    &ldquo;{member.bio}&rdquo;
                  </p>
                </section>
              </ScrollReveal>

              {/* Experience */}
              <ScrollReveal direction="up">
                <section>
                  <div className="text-mono-tag text-mint mb-8">/experience_ledger</div>
                  <ol className="relative space-y-12 border-l border-white/10 pl-10 ml-4">
                    {member.experience.map((e, i) => (
                      <li key={i} className="group relative">
                        <span
                          aria-hidden
                          className={`absolute -left-[49px] top-1.5 h-4 w-4 rounded-full border-4 border-black bg-gradient-to-br ${member.accent} group-hover:scale-125 transition-transform`}
                        />
                        <div className="font-mono text-xs text-gray-500 tracking-widest uppercase mb-3">
                          {e.period}
                        </div>
                        <div className="text-2xl font-bold mb-2">{e.role}</div>
                        <div className="text-sm font-mono uppercase tracking-widest text-mint/80 mb-4">
                          @ {e.company}
                        </div>
                        <p className="text-gray-400 leading-relaxed max-w-2xl">
                          {e.desc}
                        </p>
                      </li>
                    ))}
                  </ol>
                </section>
              </ScrollReveal>

              {/* Projects */}
              <section>
                <ScrollReveal direction="up">
                  <div className="text-mono-tag text-mint mb-8">/projects_grid</div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {member.projects.map((p, index) => (
                      <article
                        key={p.title}
                        className="group bg-zinc-900/50 backdrop-blur-sm border border-white/5 p-8 hover:border-white/20 transition-all duration-500 rounded-3xl"
                      >
                        <div className="flex items-start justify-between mb-8">
                          <span className={`text-mono-tag bg-gradient-to-r ${member.accent} bg-clip-text text-transparent font-bold`}>
                            {p.type}
                          </span>
                          <ExternalLink className="h-4 w-4 text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <h3 className="text-2xl font-bold mb-6">{p.title}</h3>
                        <div className="flex flex-wrap gap-2">
                          {p.tags.map((t) => (
                            <span key={t} className="text-[10px] font-mono uppercase tracking-widest text-gray-500 bg-white/5 border border-white/5 px-3 py-1.5 rounded-md">
                              {t}
                            </span>
                          ))}
                        </div>
                      </article>
                    ))}
                  </div>
                </ScrollReveal>
              </section>

              {/* Next dossier */}
              {nextMember && (
                <ScrollReveal direction="up">
                  <section className="pt-16 border-t border-white/10">
                    <Link
                      href={`/team/${nextMember.slug}`}
                      className="group block bg-zinc-900/30 p-10 rounded-[40px] border border-white/5 hover:border-mint/30 transition-all duration-500"
                    >
                      <div className="text-mono-tag text-gray-500 mb-4">Next dossier →</div>
                      <div className="text-4xl md:text-6xl font-bold tracking-tighter group-hover:text-mint transition-all duration-500">
                        {nextMember.name}
                      </div>
                      <div className="text-lg text-gray-400 mt-2">{nextMember.role}</div>
                    </Link>
                  </section>
                </ScrollReveal>
              )}
            </div>
          </div>
        </div>
      </main>

      <ContactCTA />
      <Footer />
    </div>
  );
}
