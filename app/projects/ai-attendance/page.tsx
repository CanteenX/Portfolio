import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import AiAttendanceView from "./view";

const TITLE = "AI Attendance — geo-fenced, proxy-free workforce attendance";
const DESCRIPTION =
  "AI-verified, proxy-free attendance with geo-fenced validation across a city-scale public-sector workforce of 8,000+ employees.";
const PATH = "/projects/ai-attendance";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}${PATH}`,
    type: "article",
    siteName: SITE_NAME
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION }
};

export default function Page() {
  return <AiAttendanceView />;
}
