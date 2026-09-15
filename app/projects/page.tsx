import type { Metadata } from "next";
import { getPublicProjects } from "@/lib/api";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import ProjectsView from "./view";

const TITLE = "Projects";
const DESCRIPTION =
  "Case studies from Nventra — the problem, the build and the measured outcome for each project we have shipped.";
const PATH = "/projects";

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
  const projects = await getPublicProjects().catch(() => null);
  return <ProjectsView initialProjects={projects} />;
}
