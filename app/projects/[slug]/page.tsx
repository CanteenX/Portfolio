import { cache } from "react";
import type { Metadata } from "next";
import { getPublicProjectBySlug, resolveImageUrl } from "@/lib/api";
import { getProject } from "@/lib/projects";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { buildProjectGraph, serialiseJsonLd } from "@/lib/structured-data";
import ProjectDetail from "./project-detail";

type Props = { params: Promise<{ slug: string }> };

/**
 * Resolves a case study, preferring the CMS and falling back to the copy
 * bundled in the repo.
 *
 * Wrapped in `cache` because both `generateMetadata` and the page body need
 * the same project, and the API client is axios rather than `fetch` — so Next
 * does not dedupe it for us. Without this the shell would issue two identical
 * upstream requests for every case study render.
 */
const resolveProject = cache(async (slug: string) => {
  return (await getPublicProjectBySlug(slug).catch(() => null)) ?? getProject(slug) ?? null;
});

/**
 * Server shell around the client view.
 *
 * The view itself is heavily animated and fetches in an effect, so it has to
 * stay a Client Component — and a Client Component cannot export metadata. That
 * left every case study sharing the root layout's generic title and serving an
 * empty shell to crawlers and link-preview bots. Fetching here, on the server,
 * gives each project a real title, description and OG image without touching
 * the view's rendering.
 */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await resolveProject(slug);

  if (!project) {
    return { title: `Project not found — ${SITE_NAME}` };
  }

  const title = `${project.title} — ${SITE_NAME}`;
  // `problem` is the case study's opening paragraph; it reads better as a
  // search snippet than the one-line metric does.
  const description = (project.problem || project.solution || "").slice(0, 200);
  const image = resolveImageUrl(project.image);
  const url = `${SITE_URL}/projects/${slug}`;

  return {
    // Absolute: the title already ends in the site name, and the layout's
    // `%s — Nventra` template would otherwise append it a second time — the
    // live page was serving "Data Setu — Nventra — Nventra".
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "article",
      siteName: SITE_NAME,
      ...(image ? { images: [{ url: image, alt: project.title }] } : {})
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(image ? { images: [image] } : {})
    }
  };
}

/**
 * Emits the case study's CreativeWork graph next to the client view.
 *
 * The layout already describes the organisation; this links each case study
 * back to it so the work is attributed rather than floating free. It is
 * rendered server-side deliberately — the view fetches in an effect, so
 * anything it rendered would be invisible to crawlers that do not execute JS.
 */
export default async function Page({ params }: Props) {
  const { slug } = await params;
  const project = await resolveProject(slug);

  const graph = project
    ? buildProjectGraph({
        slug,
        title: project.title,
        problem: project.problem,
        solution: project.solution,
        image: resolveImageUrl(project.image),
        year: project.year
      })
    : null;

  return (
    <>
      {graph ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serialiseJsonLd(graph) }}
        />
      ) : null}
      <ProjectDetail />
    </>
  );
}
