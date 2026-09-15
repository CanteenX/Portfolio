import { buildPageMetadata } from "@/lib/seo";
import AiAttendanceView from "./view";

const TITLE = "AI Attendance — geo-fenced, proxy-free workforce attendance";
const DESCRIPTION =
  "AI-verified, proxy-free attendance with geo-fenced validation across a city-scale public-sector workforce of 8,000+ employees.";

/**
 * Metadata composed from the SEO Manager row for this route, falling back to
 * the constants above. Never throws — the shipped copy is the floor.
 */
export function generateMetadata() {
  return buildPageMetadata({
    slug: "/projects/ai-attendance",
    defaultTitle: TITLE,
    defaultDescription: DESCRIPTION,
    ogType: "article"
  });
}

export default function Page() {
  return <AiAttendanceView />;
}
