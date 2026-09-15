import axios from "axios";
import type { Project } from "./projects";
import type { Member } from "./team";

// In production the website is served from the same origin as /api (via Next.js
// rewrites), so an empty baseURL keeps requests relative. In local dev, fall
// back to the standalone backend port.
const API_URL =
  process.env.NEXT_PUBLIC_API_URL ??
  (process.env.NODE_ENV === "production" ? "" : "http://localhost:7002");

/**
 * Base URL for requests issued during server rendering.
 *
 * In the browser an empty baseURL is exactly right: the page is served from the
 * same origin as /api, so a relative request hits the Next rewrite. On the
 * server there is no origin to be relative to — axios on Node cannot resolve
 * "/api/v1/..." and throws, which every caller catches and turns into fallback
 * content. That silently undoes server-side rendering of CMS data, and it only
 * shows up in production, where NEXT_PUBLIC_API_URL is unset.
 *
 * API_PROXY_ORIGIN is the backend the rewrites already point at, so reuse it
 * and skip the round trip back through our own edge.
 */
const SERVER_API_URL =
  process.env.API_PROXY_ORIGIN ??
  process.env.NEXT_PUBLIC_API_URL ??
  (process.env.NODE_ENV === "production" ? "" : "http://localhost:7002");

const isServer = typeof window === "undefined";

export function resolveApiBaseUrl(): string {
  return isServer ? SERVER_API_URL : API_URL;
}

export function resolveImageUrl(path: string | undefined | null): string {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  // Deliberately the browser base, not the server one: this string ends up in
  // an <img src> that the visitor resolves, so it must stay same-origin.
  return `${API_URL}${path}`;
}

export const apiClient = axios.create({ baseURL: resolveApiBaseUrl(), timeout: 10000 });

// ── Types matching server responses ──────────────────────────────────────────

export type RoiItem = { value: string; label: string; description: string; icon: string };
export type Screen = { label: string; caption: string; description: string; image: string };
export type WorkflowStep = { step: string; title: string; description: string };

export type ApiProject = {
  _id: string;
  slug: string;
  title: string;
  category: string;
  metric: string;
  year: string;
  image: string;
  client: string;
  timeframe: string;
  role: string;
  stack: string[];
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
  problem: string;
  solution: string;
  features: { title: string; description: string }[];
  gallery: { src: string; caption: string }[];
  roi: RoiItem[];
  roiSectionDescription: string;
  screens: Screen[];
  workflowSteps: WorkflowStep[];
  stackSectionDescription: string;
  codeSnippet?: { language: string; label: string; code: string };
  architecture?: string;
  isActive: boolean;
  order: number;
};

export type ApiTechStack = { _id: string; name: string; image: string; description: string; isActive: boolean; order: number };

export type ApiMember = Member & { _id: string };

export type PortfolioSettings = {
  hero: {
    tagline: string;
    description: string;
    ctaPrimary: { label: string; href: string };
    ctaSecondary: { label: string; href: string };
    featuredProjects: { title: string; description: string; href: string; image: string; eyebrow: string }[];
  };
  navbar: { brandName: string; links: { label: string; href: string }[] };
  footer: { description: string; email: string; version: string; links: { label: string; href: string }[] };
  techMarquee: string[];
  services: string[];
  callSlots: string[];
  about: {
    vision: string;
    mission: string;
    values: { icon: string; title: string; desc: string }[];
    stats: { label: string; value: string }[];
  };
  process: {
    phases: { id: string; n: string; title: string; description: string; accent: string; dot: string }[];
    perks: { title: string; description: string; icon: string; gradient: string; border: string }[];
  };
  teamPlaybook: { phase: string; name: string; body: string }[];
  contactInfo: { email: string; phone: string };
};

export type ContactFormData = {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service?: string;
  budgetBand?: string;
  timeline?: string;
  callSlot?: string;
  message: string;
  /** Verbatim wording the visitor agreed to; stored server-side as evidence. */
  consentText?: string;
  /**
   * Honeypot. Always submitted empty by a real browser — the field is hidden
   * and out of the tab order — so the server treats a filled value as a bot.
   */
  website?: string;
};

// ── API functions ─────────────────────────────────────────────────────────────

export type ProjectListParams = {
  page?: number;
  limit?: number;
  category?: string;
  year?: string;
  client?: string;
  stack?: string[];
  search?: string;
};

export type ProjectListResult = {
  items: ApiProject[];
  page: number;
  limit: number;
  total: number;
};

export async function getPublicProjects(): Promise<ApiProject[]> {
  const { data } = await apiClient.get<{ items: ApiProject[] }>("/api/v1/public/portfolio/projects");
  return data.items ?? [];
}

export async function getPublicProjectsByParams(params: ProjectListParams = {}): Promise<ProjectListResult> {
  const { data } = await apiClient.get<ProjectListResult>("/api/v1/public/portfolio/projects/listbyparams", {
    params: {
      ...params,
      stack: params.stack?.join(",") || undefined
    }
  });
  return data;
}

export async function getPublicTechStacks(): Promise<ApiTechStack[]> {
  try {
    const { data } = await apiClient.get<{ items: ApiTechStack[] }>("/api/v1/public/portfolio/tech-stacks");
    return data.items ?? [];
  } catch {
    return [];
  }
}

export async function getPublicCategories(): Promise<string[]> {
  try {
    const { data } = await apiClient.get<{ items: { name: string }[] }>("/api/v1/public/portfolio/categories");
    return data.items.map((c) => c.name);
  } catch {
    return [];
  }
}

export async function getPublicProjectBySlug(slug: string): Promise<ApiProject | null> {
  try {
    const { data } = await apiClient.get<ApiProject>(`/api/v1/public/portfolio/projects/${slug}`);
    return data;
  } catch {
    return null;
  }
}

export async function getPublicTeam(): Promise<ApiMember[]> {
  const { data } = await apiClient.get<{ items: ApiMember[] }>("/api/v1/public/portfolio/team");
  return data.items ?? [];
}

export async function getPublicMemberBySlug(slug: string): Promise<ApiMember | null> {
  try {
    const { data } = await apiClient.get<ApiMember>(`/api/v1/public/portfolio/team/${slug}`);
    return data;
  } catch {
    return null;
  }
}

export async function getPublicSettings(): Promise<PortfolioSettings | null> {
  try {
    const { data } = await apiClient.get<PortfolioSettings>("/api/v1/public/portfolio/settings");
    return data && Object.keys(data).length > 0 ? data : null;
  } catch {
    return null;
  }
}

export async function submitContact(formData: ContactFormData): Promise<{ message: string; id: string }> {
  const { data } = await apiClient.post<{ message: string; id: string }>("/api/v1/public/portfolio/contact", formData);
  return data;
}
