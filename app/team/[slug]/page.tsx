import type { Metadata } from "next";
import { getPublicMemberBySlug, resolveImageUrl } from "@/lib/api";
import { getMember } from "@/lib/team";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import MemberDetail from "./member-detail";

type Props = { params: Promise<{ slug: string }> };

/**
 * Server shell around the client view — see the sibling projects/[slug]/page.tsx
 * for why the split exists.
 */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const member = (await getPublicMemberBySlug(slug).catch(() => null)) ?? getMember(slug) ?? null;

  if (!member) {
    return { title: `Team member not found — ${SITE_NAME}` };
  }

  const title = `${member.name}, ${member.role} — ${SITE_NAME}`;
  const description = (member.bio || member.power || "").slice(0, 200);
  const image = resolveImageUrl(member.avatar);
  const url = `${SITE_URL}/team/${slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "profile",
      siteName: SITE_NAME,
      ...(image ? { images: [{ url: image, alt: member.name }] } : {})
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
  return <MemberDetail />;
}
