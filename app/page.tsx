import { buildPageMetadata } from "@/lib/seo";
import {
  getPublicClientLogos,
  getPublicMetrics,
  getPublicServices,
  getPublicSettings,
  getPublicTestimonials
} from "@/lib/api";
import HomeView from "./home-view";

// Goes through the root layout's `%s — Nventra` template, so it must not
// repeat the brand. Only a SeoMeta override is treated as an absolute title.
const TITLE = "High-Performance Web & Mobile Engineering";
const DESCRIPTION =
  "Nventra is an engineering collective building high-performance web, mobile and AI products. Explore recent deployments, services and how we work.";

/**
 * The homepage was `"use client"` with no metadata export at all, so the most
 * valuable URL on the site shipped only the root layout defaults and put zero
 * CMS content into first paint. This shell fixes both: metadata composes
 * through the SEO Manager, and settings are fetched server-side and handed to
 * the view as seed data.
 */
export function generateMetadata() {
  return buildPageMetadata({
    slug: "/",
    defaultTitle: TITLE,
    defaultDescription: DESCRIPTION,
    ogType: "website"
  });
}

/** CMS-backed content, so re-fetch hourly rather than freezing at build time. */
export const revalidate = 3600;

export default async function Page() {
  // Fetched in parallel: serially these would add four round trips to the
  // render of the site's most valuable URL. Each already swallows its own
  // failure, so one unreachable collection cannot take down the page.
  const [settings, services, testimonials, clientLogos, metrics] = await Promise.all([
    getPublicSettings().catch(() => null),
    getPublicServices().catch(() => []),
    getPublicTestimonials().catch(() => []),
    getPublicClientLogos().catch(() => []),
    getPublicMetrics().catch(() => [])
  ]);

  return (
    <HomeView
      initialSettings={settings}
      initialServices={services}
      initialTestimonials={testimonials}
      initialClientLogos={clientLogos}
      initialMetrics={metrics}
    />
  );
}
