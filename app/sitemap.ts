import type { MetadataRoute } from "next";
import { getPublicProjects, getPublicTeam } from "@/lib/api";
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
  const [projects, team] = await Promise.all([
    getPublicProjects().catch(() => []),
    getPublicTeam().catch(() => [])
  ]);

  for (const project of projects) {
    entries.push({
      url: `${SITE_URL}/projects/${project.slug}`,
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

  return entries;
}
