import type { PageCopy, PortfolioSettings } from "./api";

/**
 * Resolves one page's heading block: the CMS value when an editor has written
 * one, the copy this page ships with otherwise.
 *
 * Per field, never per object. A settings row with a new lead paragraph and an
 * untouched title must keep the shipped title rather than render an empty <h1>,
 * because a half-finished edit is the normal state of an editor's afternoon and
 * it must not be able to blank the top of a page.
 *
 * The fallbacks live with the pages, not here: the shipped copy is the floor,
 * and keeping it next to the markup is what stops it drifting out of sync with
 * the layout that surrounds it.
 */
export function resolvePageCopy(
  settings: PortfolioSettings | null | undefined,
  key: keyof NonNullable<PortfolioSettings["pageCopy"]>,
  fallback: { eyebrow: string; title: string; lead?: string }
): { eyebrow: string; title: string; lead: string } {
  const copy: PageCopy | undefined = settings?.pageCopy?.[key];
  return {
    eyebrow: copy?.eyebrow?.trim() || fallback.eyebrow,
    title: copy?.title?.trim() || fallback.title,
    lead: copy?.lead?.trim() || fallback.lead || ""
  };
}
