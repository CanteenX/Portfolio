import { getPublicPosts } from "@/lib/api";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";
import { escapeXml, toRssDate } from "@/lib/posts";

/**
 * RSS 2.0 for /insights.
 *
 * A route handler rather than a generated file: posts are CMS rows, so a feed
 * written at build time would be stale the moment anything is published. It is
 * revalidated on the same schedule as the index and invalidated immediately
 * when a post is saved.
 *
 * Only summaries are included, not full bodies — the feed is a notification
 * channel that sends readers to the site, and mirroring the whole article into
 * an aggregator gives it a duplicate copy to rank.
 */
export const revalidate = 3600;

export async function GET(): Promise<Response> {
  const posts = await getPublicPosts().catch(() => []);

  const items = posts
    .map((post) => {
      const url = `${SITE_URL}/insights/${post.slug}`;
      const pubDate = toRssDate(post.publishedAt);
      return [
        "    <item>",
        `      <title>${escapeXml(post.title)}</title>`,
        `      <link>${escapeXml(url)}</link>`,
        `      <guid isPermaLink="true">${escapeXml(url)}</guid>`,
        post.excerpt ? `      <description>${escapeXml(post.excerpt)}</description>` : "",
        pubDate ? `      <pubDate>${pubDate}</pubDate>` : "",
        post.category ? `      <category>${escapeXml(post.category)}</category>` : "",
        "    </item>"
      ]
        .filter(Boolean)
        .join("\n");
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(`${SITE_NAME} — Insights`)}</title>
    <link>${SITE_URL}/insights</link>
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
    <language>en-IN</language>
    <atom:link href="${SITE_URL}/insights/rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: {
      "content-type": "application/rss+xml; charset=utf-8",
      "cache-control": "public, max-age=0, s-maxage=3600"
    }
  });
}
