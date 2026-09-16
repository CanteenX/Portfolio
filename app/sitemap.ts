import type { MetadataRoute } from "next";
import {
  getPublicLegalDocuments,
  getPublicPosts,
  getPublicProjects,
  getPublicTeam
} from "@/lib/api";
import { SITE_URL } from "@/lib/site";

/**
 * Regenerated hourly rather than at build time: projects and team members are
 * CMS rows, so a sitemap frozen at deploy would omit everything published
 * afterwards until the next deploy.
 */
export const revalidate = 3600;

const STATIC_ROUTES: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "", priority: 1, changeFrequency: "weekly" },
  { path: "/work", priority: 0.9, changeFrequency: "weekly" },
  { path: "/services", priority: 0.8, changeFrequency: "monthly" },
  { path: "/how-we-work", priority: 0.7, changeFrequency: "monthly" },
  { path: "/team", priority: 0.7, changeFrequency: "monthly" },
  { path: "/about", priority: 0.6, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.6, changeFrequency: "monthly" },
  { path: "/faq", priority: 0.5, changeFrequency: "monthly" },
  { path: "/insights", priority: 0.6, changeFrequency: "weekly" },
  // The three case studies are CMS rows since B-4, so they normally arrive with
  // the projects below and these entries are redundant — deduplicated by URL.
  // They stay listed because the projects lookup degrades to an empty array
  // when the backend is unreachable, and a sitemap that quietly drops the
  // strongest work on the site during an outage is worse than three duplicate
  // lines of code.
  { path: "/projects/ai-attendance", priority: 0.8, changeFrequency: "monthly" },
  { path: "/projects/ai-call-bot-hospital", priority: 0.8, changeFrequency: "monthly" },
  { path: "/projects/business-meet", priority: 0.8, changeFrequency: "monthly" },
  // Low priority but present: a crawlable privacy policy is a requirement for
  // Google Ads and Meta, and procurement reviewers look for it directly.
  { path: "/privacy", priority: 0.2, changeFrequency: "yearly" },
  { path: "/terms", priority: 0.2, changeFrequency: "yearly" }
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const entries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority
  }));

  // A sitemap that throws produces a 500 where crawlers expect XML, so a
  // backend outage degrades to the static routes rather than to nothing.
  const [projects, team, legal, posts] = await Promise.all([
    getPublicProjects().catch(() => []),
    getPublicTeam().catch(() => []),
    getPublicLegalDocuments().catch(() => []),
    getPublicPosts().catch(() => [])
  ]);

  const seen = new Set(entries.map((entry) => entry.url));

  for (const project of projects) {
    const url = `${SITE_URL}/projects/${project.slug}`;
    if (seen.has(url)) continue;
    seen.add(url);
    entries.push({
      url,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8
    });
  }

  for (const member of team) {
    entries.push({
      url: `${SITE_URL}/team/${member.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5
    });
  }

  for (const post of posts) {
    const url = `${SITE_URL}/insights/${post.slug}`;
    if (seen.has(url)) continue;
    seen.add(url);
    entries.push({
      url,
      // `publishedAt` is free text, so a value that is not a date falls back to
      // now rather than emitting "Invalid Date" into the XML.
      lastModified: Number.isNaN(new Date(post.publishedAt).getTime())
        ? now
        : new Date(post.publishedAt),
      changeFrequency: "yearly",
      priority: 0.6
    });
  }

  // Privacy and terms are already listed above under their own routes; the
  // `/legal/` form of those two redirects, so listing it would advertise a URL
  // that never serves a document.
  for (const document of legal) {
    const url = `${SITE_URL}/legal/${document.slug}`;
    if (document.slug === "privacy" || document.slug === "terms" || seen.has(url)) continue;
    seen.add(url);
    entries.push({
      url,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.2
    });
  }

  return entries;
}
