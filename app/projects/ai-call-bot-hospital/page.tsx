import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import AiCallBotView from "./view";

const TITLE = "AI Call Agent — voice triage for hospital front desks";
const DESCRIPTION =
  "A low-latency AI call agent that answers, triages and routes hospital enquiries around the clock without adding front-desk headcount.";
const PATH = "/projects/ai-call-bot-hospital";

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
  return <AiCallBotView />;
}
