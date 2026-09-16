/**
 * Formats a post date for display.
 *
 * `publishedAt` is free text in the CMS, so anything the editor typed that is
 * not a date is shown back unchanged rather than rendered as "Invalid Date".
 * The locale is fixed to en-GB so the server and the browser cannot disagree
 * and trigger a hydration mismatch.
 */
export function formatPostDate(value: string): string {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC"
  }).format(date);
}

/** RFC 822, which is what RSS readers expect. Empty input yields empty output. */
export function toRssDate(value: string): string {
  if (!value) return "";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "" : date.toUTCString();
}

/** Escapes text for inclusion in an XML text node or attribute. */
export function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
