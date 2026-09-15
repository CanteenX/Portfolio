import { buildPageMetadata } from "@/lib/seo";
import { getPublicSettings } from "@/lib/api";
import ServicesView from "./view";

const TITLE = "Services";
const DESCRIPTION =
  "App development, website building, CRM and admin panels, and SEO — delivered by a senior engineering collective.";

/**
 * Metadata composed from the SEO Manager row for this route, falling back to
 * the constants above. Never throws — the shipped copy is the floor.
 */
export function generateMetadata() {
  return buildPageMetadata({
    slug: "/services",
    defaultTitle: TITLE,
    defaultDescription: DESCRIPTION,
    ogType: "website"
  });
}

/**
 * Re-fetched hourly: the copy on this page is CMS-editable, so a build-time
 * snapshot would go stale until the next deploy.
 */
export const revalidate = 3600;

export default async function Page() {
  // Failure here must not 500 the page — the view still has its own fallback.
  const settings = await getPublicSettings().catch(() => null);
  return <ServicesView initialSettings={settings} />;
}
