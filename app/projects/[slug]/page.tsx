import { cache } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPublicProjectBySlug, resolveImageUrl, type ApiProject, getPublicSettings } from "@/lib/api";
import { getProject, toApiProject } from "@/lib/projects";
import { buildPageMetadata } from "@/lib/seo";
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
const resolveProject = cache(async (slug: string): Promise<ApiProject | null> => {
  // Deliberately NOT caught: getPublicProjectBySlug returns null for a real
  // 404 and throws for anything else, and swallowing that here would put
  // back the bug where a transient failure caches a 404 over a live page.
  const fromCms = await getPublicProjectBySlug(slug);
  if (fromCms) return fromCms;
  const bundled = getProject(slug);
  return bundled ? toApiProject(bundled) : null;
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
 *
 * Metadata resolves SEO Manager row → project content → site defaults. The row
 * matters because the three bespoke case studies this route replaced in B-4 had
 * hand-written titles registered under `/projects/<slug>`; going through
 * `buildPageMetadata` means those rows keep applying to the same URLs instead
 * of being silently replaced by generated copy on the site's best-ranking
 * pages.
 */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await resolveProject(slug);

  if (!project) {
    // The root layout's title template appends the site name already.
    return { title: "Project not found" };
  }

  return buildPageMetadata({
    slug: `/projects/${slug}`,
    // Absolute-ready: the layout template appends the site name, so this is the
    // bare project title. `buildPageMetadata` handles the suffix.
    defaultTitle: project.title,
    // `intro` is the case study's opening paragraph and reads as a search
    // snippet; `problem` is the next best thing on projects that predate it.
    defaultDescription: (project.intro || project.problem || project.solution || "").slice(
      0,
      200
    ),
    defaultImage: resolveImageUrl(project.image) || undefined,
    ogType: "article"
  });
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
  // Settings ride along so the nav and footer render CMS copy in the server
  // HTML. These are the site's highest-value URLs; a crawler must not read the
  // shipped fallback nav here.
  const [project, settings] = await Promise.all([
    resolveProject(slug),
    getPublicSettings().catch(() => null)
  ]);

  // A slug with no case study behind it used to render the view's own "Project
  // Not Found" screen with a 200, which is a soft 404: crawlers index the dead
  // URL and it competes with the real pages. This returns a real 404 and the
  // site's not-found page.
  if (!project) notFound();

  const graph = buildProjectGraph({
    slug,
    title: project.title,
    problem: project.problem,
    solution: project.solution,
    image: resolveImageUrl(project.image),
    year: project.year
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serialiseJsonLd(graph) }}
      />
      <ProjectDetail initialProject={project} initialSettings={settings} />
    </>
  );
}
