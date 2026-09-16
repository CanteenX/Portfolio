export type Member = {
  id: string;
  slug: string;
  name: string;
  role: string;
  avatar: string;
  glow: string;
  accent: string; // tailwind gradient classes
  power: string;
  bio: string;
  personal: {
    location: string;
    email: string;
    languages: string[];
  };
  skills: { name: string; level: number }[];
  education: { year: string; degree: string; school: string }[];
  experience: { period: string; role: string; company: string; desc: string }[];
  projects: { type: string; title: string; tags: string[] }[];
  certificates: { title: string }[];
  socials?: { github?: string; linkedin?: string; portfolio?: string };
};

/**
 * Intentionally empty.
 *
 * This array used to hold six invented engineers with `@forge.collective`
 * addresses, fabricated employers and fabricated degrees. Real team data
 * renders from the CMS, so nobody noticed — until the API failed, at which
 * point the site presented a fake team to whoever was reading it.
 *
 * An empty roster degrades honestly: the section collapses and says so. Do not
 * repopulate this with sample people. Add real members in the admin panel under
 * Portfolio CMS -> Team.
 */
export const TEAM: Member[] = [];

export function getMember(slug: string): Member | undefined {
  return TEAM.find((m) => m.slug === slug);
}

export function splitName(full: string): { first: string; last: string } {
  const parts = full.trim().split(/\s+/);
  if (parts.length === 1) return { first: parts[0], last: "" };
  return { first: parts[0], last: parts.slice(1).join(" ") };
}

export function personnelRef(id: string): string {
  return `// PERSONNEL_REF :: ${id.toUpperCase()}`;
}
