import type { NextConfig } from "next";

const ADMIN_ORIGIN = process.env.ADMIN_PROXY_ORIGIN;
const API_ORIGIN = process.env.API_PROXY_ORIGIN;

const nextConfig: NextConfig = {
  images: {
    /**
     * next/image refuses remote hosts it has not been told about. Without this
     * the CMS images — which now live on the Supabase CDN — could not be
     * optimised at all, so every one of them stayed a raw <img>.
     */
    remotePatterns: [
      { protocol: "https", hostname: "zqcltxlpfnwklxtdefok.supabase.co", pathname: "/storage/v1/object/public/**" },
      // Legacy seed content still references Unsplash.
      { protocol: "https", hostname: "images.unsplash.com" }
    ]
  },

  async rewrites() {
    const rules: Awaited<ReturnType<NonNullable<NextConfig["rewrites"]>>> = [];

    if (ADMIN_ORIGIN) {
      rules.push(
        { source: "/admin", destination: `${ADMIN_ORIGIN}/admin` },
        { source: "/admin/:path*", destination: `${ADMIN_ORIGIN}/admin/:path*` }
      );
    }

    if (API_ORIGIN) {
      rules.push(
        { source: "/api/:path*", destination: `${API_ORIGIN}/api/:path*` },
        { source: "/uploads/:path*", destination: `${API_ORIGIN}/uploads/:path*` }
      );
    }

    return rules;
  },

  /**
   * /projects and /work were duplicate indexes of the same CMS data, splitting
   * link equity between two near-identical pages. A 308 keeps every existing
   * link — including ones in old proposal decks — working, and tells crawlers
   * which is canonical. A canonical tag alone would leave both crawlable.
   *
   * Exact source, so /projects/<slug> detail routes are untouched.
   */
  async redirects() {
    return [
      { source: "/projects", destination: "/work", permanent: true },
      // Deep Mehta's profile was created by editing a placeholder member, so it
      // shipped at the placeholder's slug. Kept so links already shared or
      // indexed under the old address still reach the right person.
      { source: "/team/priya-raman", destination: "/team/deep-mehta", permanent: true }
    ];
  },

  /**
   * Security headers.
   *
   * There were none. For a marketing site that is untidy; for an engineering
   * vendor it is a line item on the enterprise questionnaires you get sent, and
   * the kind of thing a technical buyer checks precisely because you sell
   * engineering.
   *
   * No Content-Security-Policy yet, deliberately. This site loads Spline, a
   * WebGL globe, GSAP and Google Fonts, several of which need `unsafe-eval` or
   * inline styles — a CSP written without measuring what actually loads would
   * either be so permissive it means nothing, or would silently break the hero
   * in production. It wants its own change with report-only mode first.
   */
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          // Stops a response being re-interpreted as a different type, which is
          // the basis of several upload-driven XSS tricks.
          { key: "X-Content-Type-Options", value: "nosniff" },
          // Tells browsers to stay on HTTPS for two years. Safe here: the site
          // is HTTPS-only behind Vercel and has no plain-HTTP surface.
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload"
          },
          // Send the full URL within our own origin, only the origin
          // cross-site: keeps referral attribution working without leaking
          // paths to third parties.
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // Nothing here uses these; denying them stops an embedded third party
          // asking on our behalf.
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()"
          },
          // Clickjacking. The site is never framed by design.
          { key: "X-Frame-Options", value: "DENY" }
        ]
      }
    ];
  },
};

export default nextConfig;
