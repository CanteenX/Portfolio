import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // The admin panel is proxied through this origin by next.config.ts. It is
      // behind a login, but there is nothing for a crawler to index there and
      // no reason to advertise it.
      disallow: ["/admin", "/admin/"]
    },
    sitemap: `${SITE_URL}/sitemap.xml`
  };
}
