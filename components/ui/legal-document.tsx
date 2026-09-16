import { LegalPage } from "@/components/ui/legal-page";
import { type PortfolioSettings } from "@/lib/api";
import type { ApiLegalDocument } from "@/lib/api";

/**
 * Splits a section body into paragraphs on blank lines.
 *
 * The editor writes plain text, so a double newline is the only structural
 * signal available — and the only one worth supporting. Anything richer would
 * mean either a markup parser or `dangerouslySetInnerHTML` on the one page type
 * where injected markup would be least visible and most damaging.
 */
function paragraphs(body: string): string[] {
  return body
    .split(/\n\s*\n/)
    .map((part) => part.trim())
    .filter(Boolean);
}

/**
 * Renders a CMS-published legal document.
 *
 * Section headings become <h2> so the document is navigable by heading rather
 * than being one undifferentiated wall of text, which is how these pages are
 * actually read: by someone looking for one clause.
 */
export function LegalDocument({
  document,
  initialSettings = null
}: {
  document: ApiLegalDocument;
  initialSettings?: PortfolioSettings | null;
}) {
  return (
    <LegalPage
      initialSettings={initialSettings}
      title={document.title}
      lastUpdated={document.lastUpdated}
      showDraftNotice={false}
    >
      {paragraphs(document.intro).map((text, index) => (
        <p key={`intro-${index}`}>{text}</p>
      ))}

      {document.sections.map((section, index) => (
        <section key={`${section.heading}-${index}`} className="space-y-3">
          {section.heading ? <h2>{section.heading}</h2> : null}
          {paragraphs(section.body).map((text, paragraphIndex) => (
            <p key={paragraphIndex}>{text}</p>
          ))}
        </section>
      ))}
    </LegalPage>
  );
}
