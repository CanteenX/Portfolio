import type { MetadataRoute } from "next";
import { SITE_DESCRIPTION, SITE_NAME } from "@/lib/site";

/**
 * Web app manifest.
 *
 * Not because this should be an installable app — it is a marketing site — but
 * because without one, a phone that bookmarks the site to the home screen gets
 * the URL as a label and a screenshot as an icon. It also silences the
 * corresponding Lighthouse warning, which a prospect running an audit on us
 * will see.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE_NAME} — High-Performance Web & Mobile Engineering`,
    short_name: SITE_NAME,
    description: SITE_DESCRIPTION,
    start_url: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#000000",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/favicon.ico", sizes: "48x48", type: "image/x-icon" }
    ]
  };
}
