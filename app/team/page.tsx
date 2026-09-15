import type { Metadata } from "next";
import { getPublicSettings, getPublicTeam } from "@/lib/api";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import TeamView from "./view";

const TITLE = "Team";
const DESCRIPTION =
  "The engineers behind Nventra — their backgrounds, specialisms and the work they have shipped.";
const PATH = "/team";

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

/** CMS-backed content, so re-fetch hourly rather than freezing at build time. */
export const revalidate = 3600;

export default async function Page() {
  const [team, settings] = await Promise.all([
    getPublicTeam().catch(() => null),
    getPublicSettings().catch(() => null),
  ]);
  return <TeamView initialTeam={team} initialSettings={settings} />;
}
