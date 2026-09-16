import { cache } from "react";
import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { LegalDocument } from "@/components/ui/legal-document";
import { getPublicLegalDocument, getPublicLegalDocuments, getPublicSettings} from "@/lib/api";
import { buildPageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

/**
 * Documents that already own a top-level route.
 *
 * Both were live URLs before the CMS existed and are linked from the footer and
 * the sitemap, so they keep their short paths. Requests to the `/legal/` form
 * redirect there rather than serving the same policy at two addresses.
 */
const FIXED_ROUTES: Record<string, string> = {
  privacy: "/privacy",
  terms: "/terms"
};

const resolveDocument = cache((slug: string) => getPublicLegalDocument(slug));

/**
 * Pre-renders the documents that exist at build time. Anything published later
 * is rendered on first request and then cached, because `dynamicParams` is left
 * at its default.
 */
export async function generateStaticParams() {
  const documents = await getPublicLegalDocuments();
  return documents
    .filter((document) => !FIXED_ROUTES[document.slug])
    .map((document) => ({ slug: document.slug }));
}

export const revalidate = 3600;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const document = await resolveDocument(slug);

  if (!document) return { title: "Not found" };

  return buildPageMetadata({
    slug: `/legal/${slug}`,
    defaultTitle: document.title,
    defaultDescription: document.intro.slice(0, 200),
    ogType: "website"
  });
}

export default async function Page({ params }: Props) {
  const { slug } = await params;

  const fixed = FIXED_ROUTES[slug];
  if (fixed) redirect(fixed);

  const [document, settings] = await Promise.all([
    resolveDocument(slug),
    getPublicSettings().catch(() => null)
  ]);
  if (!document) notFound();

  return <LegalDocument document={document} initialSettings={settings} />;
}
