/**
 * The canonical public origin.
 *
 * Metadata, sitemap and canonical URLs must all be absolute and must all agree,
 * so they read this one value rather than each hardcoding a host. Override with
 * NEXT_PUBLIC_SITE_URL for a preview deployment that should describe itself.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://umaeng.co.in"
).replace(/\/+$/, "");

export const SITE_NAME = "Nventra";

export const SITE_DESCRIPTION =
  "Nventra is an elite engineering collective building scalable web and mobile products for global brands.";
