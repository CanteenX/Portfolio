import type { Metadata } from "next";
import { getPublicSettings } from "@/lib/api";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import AboutView from "./view";

const TITLE = "About";
const DESCRIPTION =
  "Who Nventra is: our vision, mission and the values behind how we build software for global brands.";
const PATH = "/about";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: {
    title: `${TITLE} — ${SITE_NAME}`,
    description: DESCRIPTION,
    url: `${SITE_URL}${PATH}`,
    type: "website",
    siteName: SITE_NAME,
  },
  twitter: { card: "summary_large_image", title: `${TITLE} — ${SITE_NAME}`, description: DESCRIPTION },
};

/**
 * Re-fetched hourly: the copy on this page is CMS-editable, so a build-time
 * snapshot would go stale until the next deploy.
 */
export const revalidate = 3600;

export default async function Page() {
  // Failure here must not 500 the page — the view still has its own fallback.
  const settings = await getPublicSettings().catch(() => null);
  return <AboutView initialSettings={settings} />;
}
