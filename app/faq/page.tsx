import { buildPageMetadata } from "@/lib/seo";
import { getPublicFaqs, getPublicSettings } from "@/lib/api";
import { buildFaqGraph, serialiseJsonLd } from "@/lib/structured-data";
import FaqView from "./view";

const TITLE = "FAQ";
const DESCRIPTION =
  "Straight answers on how Nventra engagements start, how delivery works, and what a project costs.";

export function generateMetadata() {
  return buildPageMetadata({
    slug: "/faq",
    defaultTitle: TITLE,
    defaultDescription: DESCRIPTION,
    ogType: "website"
  });
}

export const revalidate = 3600;

export default async function Page() {
  const [faqs, settings] = await Promise.all([
    getPublicFaqs().catch(() => []),
    getPublicSettings().catch(() => null)
  ]);

  // Emitted server-side and only when there is something to mark up: an empty
  // FAQPage node is a claim about content that is not on the page, which is the
  // kind of mismatch that costs the rich result outright.
  const graph = faqs.length > 0 ? buildFaqGraph(faqs) : null;

  return (
    <>
      {graph ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serialiseJsonLd(graph) }}
        />
      ) : null}
      <FaqView initialFaqs={faqs} initialSettings={settings} />
    </>
  );
}
