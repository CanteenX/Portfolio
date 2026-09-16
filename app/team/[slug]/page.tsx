import { cache } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPublicMemberBySlug, resolveImageUrl, getPublicSettings} from "@/lib/api";
import { getMember } from "@/lib/team";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import MemberDetail from "./member-detail";

type Props = { params: Promise<{ slug: string }> };

/** Shared by the metadata pass and the page body; axios is not deduped by Next. */
const resolveMember = cache(
  async (slug: string) =>
    (await getPublicMemberBySlug(slug).catch(() => null)) ?? getMember(slug) ?? null
);

/**
 * Server shell around the client view — see the sibling projects/[slug]/page.tsx
 * for why the split exists.
 */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const member = await resolveMember(slug);

  if (!member) {
    return { title: "Team member not found" };
  }

  // The root layout's title template appends the site name, so adding it here
  // rendered "… — Nventra — Nventra" in the tab and in link previews.
  const title = `${member.name}, ${member.role}`;
  // Open Graph titles are used verbatim — the layout template does not reach
  // them — so the brand has to be spelled out for shares and previews.
  const socialTitle = `${title} — ${SITE_NAME}`;
  const description = (member.bio || member.power || "").slice(0, 200);
  const image = resolveImageUrl(member.avatar);
  const url = `${SITE_URL}/team/${slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: socialTitle,
      description,
      url,
      type: "profile",
      siteName: SITE_NAME,
      ...(image ? { images: [{ url: image, alt: member.name }] } : {})
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      ...(image ? { images: [image] } : {})
    }
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;

  // A profile URL for someone who is not on the team must 404 rather than
  // render a styled "Member Not Found" behind a 200 — a soft 404 gets indexed
  // and stays indexed after the person leaves.
  const [member, settings] = await Promise.all([
    resolveMember(slug),
    getPublicSettings().catch(() => null)
  ]);

  if (!member) notFound();

  return <MemberDetail initialSettings={settings} />;
}
