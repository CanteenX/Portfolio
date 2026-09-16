import type { ApiProject } from "./api";

export type Project = {
  slug: string;
  title: string;
  category: "Native Mobile" | "Web Apps" | "Backend/Cloud";
  metric: string;
  year: string;
  image: string;
  client: string;
  timeframe: string;
  role: string;
  stack: string[];
  problem: string;
  solution: string;
  roi: string[];
  features: { title: string; description: string }[];
  gallery: { src: string; caption: string }[];
  codeSnippet?: { language: string; label: string; code: string };
  architecture?: string;
};

/**
 * Intentionally empty.
 *
 * This held four invented case studies, among them one billed as
 * "Confidential — EU Fintech" with a fabricated daily volume and a fabricated
 * SOC 2 result. Real projects come from the CMS, so the fiction surfaced only
 * when the API failed — exactly when a visitor is least able to tell.
 *
 * An empty list degrades honestly: the grid collapses to an explicit empty
 * state. Add real work in the admin panel under Portfolio CMS -> Projects.
 */
export const PROJECTS: Project[] = [];

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

/**
 * Widens a bundled project into the shape the CMS serves, so the case study
 * renderer has one type to handle rather than two.
 *
 * Fields the bundled shape never had (screens, workflow steps, section
 * headings) come back empty, and the renderer already skips empty sections.
 */
export function toApiProject(p: Project): ApiProject {
  return {
    _id: p.slug,
    slug: p.slug,
    title: p.title,
    category: p.category,
    metric: p.metric,
    year: p.year,
    image: p.image,
    client: p.client,
    timeframe: p.timeframe,
    role: p.role,
    stack: p.stack,
    techStack: p.stack,
    liveUrl: undefined,
    githubUrl: undefined,
    problem: p.problem,
    solution: p.solution,
    features: p.features,
    gallery: p.gallery,
    roi: p.roi.map((text) => ({ value: text, label: "", description: "", icon: "" })),
    roiSectionDescription: "",
    screens: [],
    workflowSteps: [],
    stackSectionDescription: "",
    codeSnippet: p.codeSnippet,
    architecture: p.architecture,
    isActive: true,
    order: 0
  };
}
