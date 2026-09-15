import { buildPageMetadata } from "@/lib/seo";
import { getPublicCategories, getPublicProjects } from "@/lib/api";
import WorkView from "./view";

const TITLE = "Work";
const DESCRIPTION =
  "Selected engineering work by Nventra, filterable by category — web, mobile and backend projects delivered for global brands.";

/**
 * Metadata composed from the SEO Manager row for this route, falling back to
 * the constants above. Never throws — the shipped copy is the floor.
 */
export function generateMetadata() {
  return buildPageMetadata({
    slug: "/work",
    defaultTitle: TITLE,
    defaultDescription: DESCRIPTION,
    ogType: "website"
  });
}

/** CMS-backed content, so re-fetch hourly rather than freezing at build time. */
export const revalidate = 3600;

export default async function Page() {
  const [projects, categories] = await Promise.all([
    getPublicProjects().catch(() => null),
    getPublicCategories().catch(() => null),
  ]);
  return <WorkView initialProjects={projects} initialCategories={categories} />;
}
