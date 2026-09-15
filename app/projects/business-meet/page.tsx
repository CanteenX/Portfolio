import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import BusinessMeetView from "./view";

const TITLE = "Business Meet — AI-ranked professional networking";
const DESCRIPTION =
  "AI-ranked professional recommendations with destination and date aware connections, turning travel calendars into qualified meetings.";
const PATH = "/projects/business-meet";

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
  return <BusinessMeetView />;
}
