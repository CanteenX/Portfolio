import axios from "axios";
import type { Project } from "./projects";
import type { Member } from "./team";

// In production the website is served from the same origin as /api (via Next.js
// rewrites), so an empty baseURL keeps requests relative. In local dev, fall
// back to the standalone backend port.
const API_URL =
  process.env.NEXT_PUBLIC_API_URL ??
  (process.env.NODE_ENV === "production" ? "" : "http://localhost:7002");

export function resolveImageUrl(path: string | undefined | null): string {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  return `${API_URL}${path}`;
}

export const apiClient = axios.create({ baseURL: API_URL, timeout: 10000 });

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
  service?: string;
  callSlot?: string;
  message: string;
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
