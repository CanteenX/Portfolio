import { buildPageMetadata } from "@/lib/seo";
import BusinessMeetView from "./view";

const TITLE = "Business Meet — AI-ranked professional networking";
const DESCRIPTION =
  "AI-ranked professional recommendations with destination and date aware connections, turning travel calendars into qualified meetings.";

/**
 * Metadata composed from the SEO Manager row for this route, falling back to
 * the constants above. Never throws — the shipped copy is the floor.
 */
export function generateMetadata() {
  return buildPageMetadata({
    slug: "/projects/business-meet",
    defaultTitle: TITLE,
    defaultDescription: DESCRIPTION,
    ogType: "article"
  });
}

export default function Page() {
  return <BusinessMeetView />;
}
