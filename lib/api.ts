import axios from "axios";
import type { Project } from "./projects";
import type { Member } from "./team";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

export const apiClient = axios.create({ baseURL: API_URL, timeout: 10000 });

// ── Types matching server responses ──────────────────────────────────────────

export type ApiProject = Project & { _id: string };
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

export async function getPublicProjects(): Promise<ApiProject[]> {
  const { data } = await apiClient.get<{ items: ApiProject[] }>("/api/v1/public/portfolio/projects");
  return data.items ?? [];
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
