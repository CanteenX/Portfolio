/**
 * The canonical public origin.
 *
 * Metadata, sitemap and canonical URLs must all be absolute and must all agree,
 * so they read this one value rather than each hardcoding a host. Override with
 * NEXT_PUBLIC_SITE_URL for a preview deployment that should describe itself.
 */
/**
 * The live site is the `nventra.` SUBDOMAIN, not the apex.
 *
 * `umaeng.co.in` is registered and aliased in Vercel but its nameservers still
 * point at a parking service, so it does not resolve — every public resolver
 * returns a different unreachable address. A canonical, sitemap entry or OG URL
 * built on the apex therefore names a host that does not exist, which tells
 * Google the real page is a duplicate of nothing and de-indexes it.
 *
 * If the apex is ever pointed at Vercel properly, moving to it is one env var
 * plus a 308 from the subdomain — not a change here.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://nventra.umaeng.co.in"
).replace(/\/+$/, "");

export const SITE_NAME = "Nventra";

export const SITE_DESCRIPTION =
  "Nventra is an elite engineering collective building scalable web and mobile products for global brands.";
