import type { Metadata } from "next";
import { apiClient } from "./api";
import { SITE_NAME, SITE_URL } from "./site";

/**
 * SEO composition for the public site.
 *
 * ── WHERE PAGE METADATA COMES FROM ──────────────────────────────────────────
 *
 * Two sources, most specific first:
 *
 *   1. `SeoMeta` — the page-wise SEO Manager at /admin/website/seo-manager.
 *   2. The constants shipped in each page file.
 *
 * Each field falls back on its own. A SeoMeta row saved with a description and
 * no title must not blank the title the page shipped with: a half-filled row is
 * an unfinished admin task, and the shipped copy is the floor in every case.
 *
 * ── THE `undefined` TRAP ────────────────────────────────────────────────────
 *
 * Never write `title: undefined` into a returned Metadata object. An explicit
 * undefined still counts as the segment DECLARING the field, which blanks the
 * root layout's default instead of inheriting it — that is how a page ships
 * with no <title> at all. Every optional key below is spread in conditionally,
 * so an absent value means "absent", not "set to nothing".
 */

export type SeoMetaRow = {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  canonicalUrl: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  ogType: string;
  noIndex: boolean;
};

/** Absolute URL for a route path. `"/"` yields the bare origin with a slash. */
export function absoluteUrl(path: string): string {
  if (!path || path === "/") return `${SITE_URL}/`;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

function clean(value: string | undefined): string | undefined {
  const trimmed = value?.trim();
  return trimmed && trimmed.length > 0 ? trimmed : undefined;
}

/**
 * An admin-supplied canonical, or null if unusable.
 *
 * Validated rather than trusted: a canonical pointing at a typo'd domain tells
 * Google this page is a duplicate of something that does not exist, which
 * de-indexes it. A relative path is accepted and resolved against our origin;
 * anything that is not an absolute http(s) URL is discarded and the caller
 * falls back to the route's own URL.
 */
function validCanonical(value: string | undefined): string | null {
  const raw = clean(value);
  if (!raw) return null;
  if (raw.startsWith("//")) return null;
  if (raw.startsWith("/")) return absoluteUrl(raw);

  try {
    const url = new URL(raw);
    if (url.protocol !== "http:" && url.protocol !== "https:") return null;
    if (!url.hostname.includes(".")) return null;
    return url.toString();
  } catch {
    return null;
  }
}

/**
 * Fetches the row for a route, or null.
 *
 * Never throws. A page must still render — with its shipped copy — when the API
 * is down, so an SEO lookup failure can never be the thing that 500s a page.
 * The endpoint answers 200 with `{ item: null }` when no row exists, because
 * "no row" is a normal state rather than an error.
 */
export async function getSeoMeta(slug: string): Promise<SeoMetaRow | null> {
  try {
    const { data } = await apiClient.get<{ item: SeoMetaRow | null }>("/api/v1/public/seo", {
      params: { slug },
      // Shorter than the client default: metadata is on the critical path for
      // every page render, and a slow lookup should degrade to shipped copy
      // rather than hold the response.
      timeout: 4000
    });
    return data.item ?? null;
  } catch {
    return null;
  }
}

export type PageMetadataInput = {
  /** The route this page serves, and the SeoMeta slug. */
  slug: string;
  defaultTitle: string;
  defaultDescription: string;
  /** Overrides the site-wide OG image for this route. */
  defaultImage?: string;
  ogType?: "website" | "article" | "profile";
};

/**
 * Builds one page's Metadata.
 *
 * Never throws and never returns an empty object: with the API down and no rows
 * at all, the result is still the shipped copy plus a correct canonical, so a
 * route added without an SEO row can never ship untitled.
 */
export async function buildPageMetadata({
  slug,
  defaultTitle,
  defaultDescription,
  defaultImage,
  ogType = "website"
}: PageMetadataInput): Promise<Metadata> {
  const seo = await getSeoMeta(slug);

  const seoTitle = clean(seo?.metaTitle);
  const title = seoTitle ?? defaultTitle;
  const description = clean(seo?.metaDescription) ?? defaultDescription;

  /**
   * A SeoMeta title is ABSOLUTE; a shipped default goes through the layout's
   * `%s — Nventra` template.
   *
   * The editor counts metaTitle against 60 characters and previews it as the
   * whole Google result. Appending the site suffix afterwards would ship a
   * title longer than the one the editor was told it was writing, and silently
   * push it past the truncation point it was warned about.
   */
  const resolvedTitle: Metadata["title"] = seoTitle ? { absolute: seoTitle } : title;

  const canonical = validCanonical(seo?.canonicalUrl) ?? absoluteUrl(slug);
  const ogTitle = clean(seo?.ogTitle) ?? title;
  const ogDescription = clean(seo?.ogDescription) ?? description;
  const ogImage = clean(seo?.ogImage) ?? defaultImage;

  return {
    title: resolvedTitle,
    description,
    ...(seo && seo.keywords?.length > 0 ? { keywords: seo.keywords } : {}),
    alternates: { canonical },
    /**
     * noIndex is honoured but kept crawlable: `follow` stays true so the page's
     * outbound links still pass through to the rest of the site. Omitted
     * entirely when absent, so the indexable default is inherited rather than
     * restated.
     */
    ...(seo?.noIndex
      ? { robots: { index: false, follow: true, googleBot: { index: false, follow: true } } }
      : {}),
    openGraph: {
      type: (clean(seo?.ogType) as "website") ?? ogType,
      url: canonical,
      siteName: SITE_NAME,
      title: ogTitle,
      description: ogDescription,
      ...(ogImage ? { images: [{ url: ogImage }] } : {})
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: ogDescription,
      ...(ogImage ? { images: [ogImage] } : {})
    }
  };
}
