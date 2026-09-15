import type { Metadata } from "next";
import { getPublicProjectBySlug, resolveImageUrl } from "@/lib/api";
import { getProject } from "@/lib/projects";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import ProjectDetail from "./project-detail";

type Props = { params: Promise<{ slug: string }> };

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

  const project =
    (await getPublicProjectBySlug(slug).catch(() => null)) ?? getProject(slug) ?? null;

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
    title,
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

export default function Page() {
  return <ProjectDetail />;
}
