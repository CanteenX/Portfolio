import type { Metadata } from "next";
import { getPublicCategories, getPublicProjects } from "@/lib/api";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import WorkView from "./view";

const TITLE = "Work";
const DESCRIPTION =
  "Selected engineering work by Nventra, filterable by category — web, mobile and backend projects delivered for global brands.";
const PATH = "/work";

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
  const [projects, categories] = await Promise.all([
    getPublicProjects().catch(() => null),
    getPublicCategories().catch(() => null),
  ]);
  return <WorkView initialProjects={projects} initialCategories={categories} />;
}
