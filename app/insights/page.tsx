import { buildPageMetadata } from "@/lib/seo";
import { getPublicPosts, getPublicSettings } from "@/lib/api";
import InsightsView from "./view";

const TITLE = "Insights";
const DESCRIPTION =
  "Field notes from Nventra on shipping web, mobile and AI software — what worked, what did not, and why.";

export function generateMetadata() {
  return buildPageMetadata({
    slug: "/insights",
    defaultTitle: TITLE,
    defaultDescription: DESCRIPTION,
    ogType: "website"
  });
}

export const revalidate = 3600;

export default async function Page() {
  const [posts, settings] = await Promise.all([
    getPublicPosts().catch(() => []),
    getPublicSettings().catch(() => null)
  ]);

  return <InsightsView initialPosts={posts} initialSettings={settings} />;
}
