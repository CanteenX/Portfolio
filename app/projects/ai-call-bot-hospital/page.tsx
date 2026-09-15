import { buildPageMetadata } from "@/lib/seo";
import AiCallBotView from "./view";

const TITLE = "AI Call Agent — voice triage for hospital front desks";
const DESCRIPTION =
  "A low-latency AI call agent that answers, triages and routes hospital enquiries around the clock without adding front-desk headcount.";

/**
 * Metadata composed from the SEO Manager row for this route, falling back to
 * the constants above. Never throws — the shipped copy is the floor.
 */
export function generateMetadata() {
  return buildPageMetadata({
    slug: "/projects/ai-call-bot-hospital",
    defaultTitle: TITLE,
    defaultDescription: DESCRIPTION,
    ogType: "article"
  });
}

export default function Page() {
  return <AiCallBotView />;
}
