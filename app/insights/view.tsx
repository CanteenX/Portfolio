"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { ContactCTA } from "@/components/ui/contact-cta";
import { usePublicAPI, usePublicSettings } from "@/lib/usePublicAPI";
import {
  getPublicPosts,
  getPublicSettings,
  resolveImageUrl,
  type ApiPostSummary,
  type PortfolioSettings
} from "@/lib/api";
import { resolvePageCopy } from "@/lib/page-copy";
import { formatPostDate } from "@/lib/posts";

export default function InsightsView({
  initialPosts,
  initialSettings
}: {
  initialPosts: ApiPostSummary[];
  initialSettings: PortfolioSettings | null;
}) {
  const { data: posts } = usePublicAPI(getPublicPosts, [], initialPosts);
  const { settings } = usePublicSettings(getPublicSettings, initialSettings);

  const copy = resolvePageCopy(settings, "insights", {
    eyebrow: "/insights — Field Notes",
    title: "What we've learned shipping software.",
    lead: "Written by the people who did the work, about the parts that were hard."
  });

  return (
    <main className="min-h-screen bg-black text-white selection:bg-mint/30">
      <Navbar initialSettings={initialSettings} />

      <div className="pt-36 pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal direction="up">
            <div className="text-mono-tag text-mint mb-4">{copy.eyebrow}</div>
            <h1 className="mb-6 max-w-3xl">{copy.title}</h1>
            {copy.lead && <p className="text-lg text-zinc-400 max-w-2xl">{copy.lead}</p>}
          </ScrollReveal>

          {posts.length === 0 ? (
            // Honest empty state rather than sample posts. A blog seeded with
            // filler tells a visitor the company does not write, at more length.
            <div className="mt-16 border-t hairline pt-10">
              <p className="text-zinc-400">
                Nothing published yet. Our writing tends to start as an answer to a client question —{" "}
                <Link href="/contact" className="text-mint underline underline-offset-4">
                  ask us one
                </Link>
                .
              </p>
            </div>
          ) : (
            <div className="mt-16 border-t hairline">
              {posts.map((post, index) => (
                <ScrollReveal key={post._id} direction="up" delay={Math.min(index, 6) * 0.05}>
                  <article className="border-b hairline">
                    <Link
                      href={`/insights/${post.slug}`}
                      className="group grid md:grid-cols-[1fr_200px] gap-6 md:gap-10 items-start py-10"
                    >
                      <div>
                        <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-zinc-500 mb-4">
                          {post.category && <span className="text-mint">{post.category}</span>}
                          {post.publishedAt && <time dateTime={post.publishedAt}>{formatPostDate(post.publishedAt)}</time>}
                          {post.readingMinutes > 0 && <span>{post.readingMinutes} min read</span>}
                        </div>
                        <h2 className="text-2xl md:text-3xl tracking-tight text-white group-hover:text-mint transition-colors flex items-start gap-2">
                          {post.title}
                          <ArrowUpRight
                            size={20}
                            aria-hidden="true"
                            className="mt-2 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                          />
                        </h2>
                        {post.excerpt && (
                          <p className="mt-3 text-zinc-400 leading-relaxed max-w-2xl">{post.excerpt}</p>
                        )}
                        {post.authorName && (
                          <p className="mt-4 text-sm text-zinc-600">
                            {post.authorName}
                            {post.authorRole ? `, ${post.authorRole}` : ""}
                          </p>
                        )}
                      </div>

                      {post.coverImage && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={resolveImageUrl(post.coverImage)}
                          alt=""
                          loading="lazy"
                          className="w-full aspect-[4/3] object-cover rounded-xl border border-white/5 grayscale group-hover:grayscale-0 transition-all duration-500"
                        />
                      )}
                    </Link>
                  </article>
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>
      </div>

      <ContactCTA initialSettings={initialSettings} />
      <Footer initialSettings={initialSettings} />
    </main>
  );
}
