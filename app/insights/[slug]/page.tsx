import { cache } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import { ContactCTA } from "@/components/ui/contact-cta";
import { PostBody } from "@/components/ui/post-body";
import { getPublicPostBySlug, getPublicPosts, getPublicSettings, resolveImageUrl } from "@/lib/api";
import { buildPageMetadata } from "@/lib/seo";
import { buildPostGraph, serialiseJsonLd } from "@/lib/structured-data";
import { formatPostDate } from "@/lib/posts";

type Props = { params: Promise<{ slug: string }> };

const resolvePost = cache((slug: string) => getPublicPostBySlug(slug));

export async function generateStaticParams() {
  const posts = await getPublicPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export const revalidate = 3600;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await resolvePost(slug);

  if (!post) return { title: "Not found" };

  return buildPageMetadata({
    slug: `/insights/${slug}`,
    defaultTitle: post.title,
    defaultDescription: post.excerpt,
    defaultImage: resolveImageUrl(post.coverImage) || undefined,
    ogType: "article"
  });
}

/**
 * A post renders entirely on the server.
 *
 * Unlike the case studies, there is no animation here worth a client bundle —
 * and an article whose text arrives only after JavaScript runs is an article
 * search engines and readers-mode both see as empty.
 */
export default async function Page({ params }: Props) {
  const { slug } = await params;
  // Settings are fetched alongside the post so the nav and footer render CMS
  // copy in the server HTML. Without it this route paints FALLBACK_BRAND and
  // swaps after hydration, and a crawler reads the fallback nav.
  const [post, settings] = await Promise.all([
    resolvePost(slug),
    getPublicSettings().catch(() => null)
  ]);

  if (!post) notFound();

  const graph = buildPostGraph({
    slug,
    title: post.title,
    excerpt: post.excerpt,
    image: resolveImageUrl(post.coverImage),
    publishedAt: post.publishedAt,
    authorName: post.authorName
  });

  return (
    <main className="min-h-screen bg-black text-white selection:bg-mint/30">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serialiseJsonLd(graph) }}
      />
      <Navbar initialSettings={settings} />

      <article className="pt-36 pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/insights"
            className="font-mono text-xs uppercase tracking-widest text-zinc-500 hover:text-mint transition-colors"
          >
            ← All insights
          </Link>

          <div className="flex flex-wrap items-center gap-3 font-mono text-xs uppercase tracking-widest text-zinc-500 mt-8 mb-5">
            {post.category && <span className="text-mint">{post.category}</span>}
            {post.publishedAt && (
              <time dateTime={post.publishedAt}>{formatPostDate(post.publishedAt)}</time>
            )}
            {post.readingMinutes > 0 && <span>{post.readingMinutes} min read</span>}
          </div>

          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight leading-[1.05]">
            {post.title}
          </h1>

          {post.excerpt && (
            <p className="mt-6 text-xl text-zinc-400 leading-relaxed">{post.excerpt}</p>
          )}

          {post.authorName && (
            <p className="mt-8 text-sm text-zinc-500">
              {post.authorName}
              {post.authorRole ? <span className="text-zinc-600">, {post.authorRole}</span> : null}
            </p>
          )}

          {post.coverImage && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={resolveImageUrl(post.coverImage)}
              alt=""
              className="mt-12 w-full aspect-[16/9] object-cover rounded-2xl border border-white/5"
            />
          )}

          <PostBody blocks={post.blocks} />

          {post.tags.length > 0 && (
            <ul className="mt-16 flex flex-wrap gap-2 border-t hairline pt-8">
              {post.tags.map((tag) => (
                <li key={tag} className="font-mono text-xs uppercase tracking-widest text-zinc-500">
                  #{tag}
                </li>
              ))}
            </ul>
          )}
        </div>
      </article>

      <ContactCTA />
      <Footer initialSettings={settings} />
    </main>
  );
}
