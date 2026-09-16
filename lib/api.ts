import axios from "axios";
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
  // Anything outside /uploads is a file this site ships in `public/` — the
  // migrated case studies reference `/projects/<slug>/hero.jpg` — so it is
  // already a correct URL. Prefixing the API origin would send the browser
  // looking for it on the backend, which does not have it.
  if (!path.startsWith("/uploads")) return path;
  // Deliberately the browser base, not the server one: this string ends up in
  // an <img src> that the visitor resolves, so it must stay same-origin.
  return `${API_URL}${path}`;
}

export const apiClient = axios.create({ baseURL: resolveApiBaseUrl(), timeout: 10000 });

// ── Types matching server responses ──────────────────────────────────────────

export type RoiItem = { value: string; label: string; description: string; icon: string };
export type Screen = { label: string; caption: string; description: string; image: string };
export type WorkflowStep = { step: string; title: string; description: string };

/** Per-project section copy. Empty fields fall back to the renderer's defaults. */
export type SectionHeading = { eyebrow?: string; title?: string; lead?: string };

export type SectionHeadings = {
  stack?: SectionHeading;
  roi?: SectionHeading;
  problem?: SectionHeading;
  solution?: SectionHeading;
  screens?: SectionHeading;
  features?: SectionHeading;
  workflow?: SectionHeading;
};

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
  intro?: string;
  heroMeta?: { label: string; value: string }[];
  sectionHeadings?: SectionHeadings;
  screenLabelPrefix?: string;
  stack: string[];
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
  problem: string;
  solution: string;
  features: { title: string; description: string; icon?: string; accent?: string }[];
  gallery: { src: string; caption: string; label?: string }[];
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

export type ApiTechStack = {
  _id: string;
  name: string;
  image: string;
  description: string;
  icon?: string;
  color?: string;
  isActive: boolean;
  order: number;
};

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
  /** Per-page headings. Missing or blank fields fall back to shipped copy. */
  pageCopy?: {
    work?: PageCopy;
    services?: PageCopy;
    team?: PageCopy;
    about?: PageCopy;
    process?: PageCopy;
    contact?: PageCopy;
    insights?: PageCopy;
    faq?: PageCopy;
  };
  contactCta?: {
    eyebrow?: string;
    title?: string;
    lead?: string;
    primary?: { label?: string; href?: string };
    secondary?: { label?: string; href?: string };
  };
  contactForm?: { budgetBands?: string[]; timelines?: string[] };
  engagement?: {
    eyebrow?: string;
    title?: string;
    lead?: string;
    bands?: { name: string; range: string; duration: string; description: string }[];
    footnote?: string;
  };
};

/** An eyebrow, a heading and a lead paragraph, any of which may be blank. */
export type PageCopy = { eyebrow?: string; title?: string; lead?: string };

/**
 * One service, structured.
 *
 * `PortfolioSettings.services` was a `string[]`, so the website had to rejoin
 * each name to a hardcoded description by exact title match — making the title
 * a lookup key that an editor could break just by renaming it. `slug` is now
 * the identity and the copy travels with the record.
 */
export type ApiService = {
  _id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  icon: string;
  pointers: string[];
  highlights: string[];
  showInContactForm: boolean;
  isActive: boolean;
  order: number;
};

export type ApiTestimonial = {
  _id: string;
  quote: string;
  authorName: string;
  authorRole: string;
  authorCompany: string;
  avatar: string;
  rating?: number;
  isActive: boolean;
  order: number;
};

export type ApiClientLogo = {
  _id: string;
  name: string;
  logo: string;
  websiteUrl: string;
  isActive: boolean;
  order: number;
};

/** `value` is free text — "40+", "99.9%" and "8,000+" are all valid. */
export type ApiMetric = {
  _id: string;
  value: string;
  label: string;
  description: string;
  isActive: boolean;
  order: number;
};

/**
 * A legal document as published from the CMS.
 *
 * `sections` are headed blocks, never HTML — the renderer prints text nodes and
 * splits paragraphs on blank lines, so nothing from this collection reaches
 * `dangerouslySetInnerHTML`.
 */
export type ApiLegalDocument = {
  _id: string;
  slug: string;
  title: string;
  lastUpdated: string;
  intro: string;
  sections: { heading: string; body: string }[];
  isPublished: boolean;
  order: number;
};

/**
 * One block of a post's body.
 *
 * `label` carries the heading text for a `heading` block and the language for a
 * `code` block; it is unused by the rest. A `list` block's `text` is one item
 * per line.
 */
export type ApiPostBlock = {
  type: "paragraph" | "heading" | "quote" | "code" | "list";
  label: string;
  text: string;
};

/** What the index and the feed need. The detail route returns this plus `blocks`. */
export type ApiPostSummary = {
  _id: string;
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  category: string;
  tags: string[];
  authorName: string;
  authorRole: string;
  publishedAt: string;
  readingMinutes: number;
  isFeatured: boolean;
  order: number;
};

export type ApiPost = ApiPostSummary & {
  blocks: ApiPostBlock[];
};

/** `category` is free text and groups questions on the page; "" means ungrouped. */
export type ApiFaq = {
  _id: string;
  question: string;
  answer: string;
  category: string;
  isActive: boolean;
  order: number;
};

export type ApiLegalSummary = {
  _id: string;
  slug: string;
  title: string;
  lastUpdated: string;
  order: number;
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

/**
 * Returns null ONLY when the API says the slug does not exist.
 *
 * Swallowing every error here caused a live outage of the case studies: a
 * timeout or a 5xx looked identical to a genuine 404, the page called
 * notFound(), and Next cached that 404 for the whole revalidate window. A
 * two-second backend blip could take the site's best-ranking URL offline for
 * an hour, and it self-healed just slowly enough to look like a cache quirk.
 *
 * Anything that is not a 404 now propagates, so the render fails loudly and is
 * retried instead of being cached as a permanent absence.
 */
export async function getPublicProjectBySlug(slug: string): Promise<ApiProject | null> {
  try {
    const { data } = await apiClient.get<ApiProject>(`/api/v1/public/portfolio/projects/${slug}`);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) return null;
    throw error;
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

/**
 * The service catalogue behind /services, the homepage carousel and the
 * contact form's dropdown. Returns `[]` rather than throwing so each surface
 * can fall back to its shipped copy instead of rendering an error.
 */
export async function getPublicServices(): Promise<ApiService[]> {
  try {
    const { data } = await apiClient.get<{ items: ApiService[] }>("/api/v1/public/portfolio/services");
    return data.items ?? [];
  } catch {
    return [];
  }
}

/**
 * Social proof, all three shapes.
 *
 * Each returns `[]` on failure AND ships empty, which the renderers treat
 * identically: the section is not rendered. There is deliberately no fallback
 * content — a fabricated testimonial with a person's name on it is a false
 * claim, not a placeholder, and an empty section is the honest state until real
 * content is published.
 */
export async function getPublicTestimonials(): Promise<ApiTestimonial[]> {
  try {
    const { data } = await apiClient.get<{ items: ApiTestimonial[] }>("/api/v1/public/portfolio/testimonials");
    return data.items ?? [];
  } catch {
    return [];
  }
}

export async function getPublicClientLogos(): Promise<ApiClientLogo[]> {
  try {
    const { data } = await apiClient.get<{ items: ApiClientLogo[] }>("/api/v1/public/portfolio/client-logos");
    return data.items ?? [];
  } catch {
    return [];
  }
}

export async function getPublicMetrics(): Promise<ApiMetric[]> {
  try {
    const { data } = await apiClient.get<{ items: ApiMetric[] }>("/api/v1/public/portfolio/metrics");
    return data.items ?? [];
  } catch {
    return [];
  }
}

/** Published posts, newest first. Empty on failure — the index says so. */
export async function getPublicPosts(): Promise<ApiPostSummary[]> {
  try {
    const { data } = await apiClient.get<{ items: ApiPostSummary[] }>(
      "/api/v1/public/portfolio/posts"
    );
    return data.items ?? [];
  } catch {
    return [];
  }
}

/** One published post, or `null` — which the detail route turns into a 404. */
export async function getPublicPostBySlug(slug: string): Promise<ApiPost | null> {
  try {
    const { data } = await apiClient.get<ApiPost>(
      `/api/v1/public/portfolio/posts/${encodeURIComponent(slug)}`
    );
    return data ?? null;
  } catch {
    return null;
  }
}

/**
 * Published questions, ordered.
 *
 * Empty on failure and empty when nothing is published — the page treats both
 * the same way and says so, rather than inventing questions nobody asked.
 */
export async function getPublicFaqs(): Promise<ApiFaq[]> {
  try {
    const { data } = await apiClient.get<{ items: ApiFaq[] }>("/api/v1/public/portfolio/faqs");
    return data.items ?? [];
  } catch {
    return [];
  }
}

/**
 * A published legal document, or `null`.
 *
 * `null` means "no published override" and is what makes the fallback safe:
 * the page renders the copy bundled in the repo instead. A legal page is the
 * one surface on the site that must never render empty because a fetch failed,
 * so the distinction is kept rather than collapsed into an empty object.
 */
export async function getPublicLegalDocument(slug: string): Promise<ApiLegalDocument | null> {
  try {
    const { data } = await apiClient.get<ApiLegalDocument>(
      `/api/v1/public/portfolio/legal/${encodeURIComponent(slug)}`
    );
    return data ?? null;
  } catch {
    return null;
  }
}

/** Published legal documents, for the footer and the sitemap. */
export async function getPublicLegalDocuments(): Promise<ApiLegalSummary[]> {
  try {
    const { data } = await apiClient.get<{ items: ApiLegalSummary[] }>(
      "/api/v1/public/portfolio/legal"
    );
    return data.items ?? [];
  } catch {
    return [];
  }
}

export async function submitContact(formData: ContactFormData): Promise<{ message: string; id: string }> {
  const { data } = await apiClient.post<{ message: string; id: string }>("/api/v1/public/portfolio/contact", formData);
  return data;
}
