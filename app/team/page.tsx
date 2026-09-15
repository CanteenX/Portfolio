import { buildPageMetadata } from "@/lib/seo";
import { getPublicSettings, getPublicTeam } from "@/lib/api";
import TeamView from "./view";

const TITLE = "Team";
const DESCRIPTION =
  "The engineers behind Nventra — their backgrounds, specialisms and the work they have shipped.";

/**
 * Metadata composed from the SEO Manager row for this route, falling back to
 * the constants above. Never throws — the shipped copy is the floor.
 */
export function generateMetadata() {
  return buildPageMetadata({
    slug: "/team",
    defaultTitle: TITLE,
    defaultDescription: DESCRIPTION,
    ogType: "website"
  });
}

/** CMS-backed content, so re-fetch hourly rather than freezing at build time. */
export const revalidate = 3600;

export default async function Page() {
  const [team, settings] = await Promise.all([
    getPublicTeam().catch(() => null),
    getPublicSettings().catch(() => null),
  ]);
  return <TeamView initialTeam={team} initialSettings={settings} />;
}
