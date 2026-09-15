import { buildPageMetadata } from "@/lib/seo";
import { getPublicSettings } from "@/lib/api";
import ContactView from "./view";

const TITLE = "Contact";
const DESCRIPTION =
  "Start a project with Nventra. Book a 30-minute discovery call or send us the details of what you are building.";

/**
 * Metadata composed from the SEO Manager row for this route, falling back to
 * the constants above. Never throws — the shipped copy is the floor.
 */
export function generateMetadata() {
  return buildPageMetadata({
    slug: "/contact",
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
  return <ContactView initialSettings={settings} />;
}
