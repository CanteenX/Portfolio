import { buildPageMetadata } from "@/lib/seo";
import { LegalPage } from "@/components/ui/legal-page";
import { LegalDocument } from "@/components/ui/legal-document";
import { getPublicLegalDocument, getPublicSettings} from "@/lib/api";
import { LEGAL } from "@/lib/legal";

const TITLE = "Terms of Use";
const DESCRIPTION =
  "The terms on which Nventra provides this website, and what the material published on it does and does not commit us to.";

/**
 * Metadata composed from the SEO Manager row for this route, falling back to
 * the constants above. Never throws — the shipped copy is the floor.
 */
export function generateMetadata() {
  return buildPageMetadata({
    slug: "/terms",
    defaultTitle: TITLE,
    defaultDescription: DESCRIPTION,
    ogType: "website"
  });
}

/** See app/privacy/page.tsx — same override-with-fallback contract. */
export const revalidate = 3600;

export default async function Page() {
  const [published, settings] = await Promise.all([
    getPublicLegalDocument("terms"),
    getPublicSettings().catch(() => null)
  ]);
  if (published) return <LegalDocument document={published} initialSettings={settings} />;

  return (
    <LegalPage title={TITLE} lastUpdated={LEGAL.lastUpdated} initialSettings={settings}>
      <section>
        <h2>These terms cover this website only</h2>
        <p>
          They govern your use of this website. They are not the terms of any engagement: work we
          carry out for a client is governed by a separate signed agreement, and nothing here
          overrides it.
        </p>
      </section>

      <section>
        <h2>Case studies and figures</h2>
        <p>
          The projects described on this site are real work. Metrics shown are the outcomes measured
          in those specific engagements and are illustrative — they are not a prediction or a
          guarantee of what a different project would achieve. Client names and logos appear with
          permission; where a client asked not to be identified, the work is described without
          naming them.
        </p>
      </section>

      <section>
        <h2>Nothing here is an offer or advice</h2>
        <p>
          Descriptions of services, indicative timelines and any pricing guidance are information,
          not a binding offer. A commitment exists only in a written agreement signed by both
          parties. Nothing on this site is legal, financial or professional advice.
        </p>
      </section>

      <section>
        <h2>Intellectual property</h2>
        <p>
          The content, design, code and branding of this site belong to {LEGAL.controllerName},
          except third-party marks shown to identify their owners. You may read, link to and quote
          this site with attribution. You may not republish it wholesale or present it as your own.
        </p>
      </section>

      <section>
        <h2>Availability</h2>
        <p>
          We aim to keep this site available and accurate, but we provide it as-is. We may change or
          remove material at any time, and we are not liable for loss arising from reliance on it or
          from the site being unavailable.
        </p>
      </section>

      <section>
        <h2>External links</h2>
        <p>
          Where we link to other websites, we do not control them and are not responsible for their
          content or their handling of your data.
        </p>
      </section>

      <section>
        <h2>Questions</h2>
        <p>
          Email <a href={`mailto:${LEGAL.contactEmail}`}>{LEGAL.contactEmail}</a>. See also our{" "}
          <a href="/privacy">Privacy Policy</a>.
        </p>
      </section>
    </LegalPage>
  );
}
