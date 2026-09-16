import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "./site";

/**
 * JSON-LD for the site, as one `@graph`.
 *
 * There was none at all, so nothing tied the domain to an organisation, and
 * there was no `sameAs` linking it to the GitHub or LinkedIn presence that
 * search engines use to corroborate that a company is real.
 *
 * DELIBERATELY NOT LocalBusiness — read this before "improving" it. Gym's
 * equivalent emits LocalBusiness per branch because those are physical gyms
 * with addresses and opening hours. Nventra has no public premises. A
 * LocalBusiness node claiming a place that cannot be verified is a structured
 * data violation, and the penalty is losing rich results entirely, which is
 * strictly worse than the plain listing you get with no markup at all.
 * `ProfessionalService` describes a service business without asserting a
 * storefront, which is the honest shape.
 */

/** Public profiles that corroborate the organisation. Empty entries are dropped. */
const SAME_AS: string[] = [
  // TODO(owner): add the LinkedIn company page and GitHub org URLs. They are the
  // strongest corroborating signals available and cost nothing.
].filter(Boolean);

export function buildOrganisationGraph(): Record<string, unknown> {
  const organisationId = `${SITE_URL}/#organization`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "ProfessionalService"],
        "@id": organisationId,
        name: SITE_NAME,
        url: `${SITE_URL}/`,
        description: SITE_DESCRIPTION,
        // Omitted rather than emitted empty: an empty knowsAbout or sameAs is a
        // worse claim than no claim.
        ...(SAME_AS.length > 0 ? { sameAs: SAME_AS } : {}),
        knowsAbout: [
          "Web application development",
          "Mobile application development",
          "Backend and cloud engineering",
          "AI integration"
        ],
        areaServed: { "@type": "Country", name: "India" }
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        name: SITE_NAME,
        url: `${SITE_URL}/`,
        inLanguage: "en-IN",
        publisher: { "@id": organisationId }
      }
    ]
  };
}

/**
 * A `CreativeWork` for one case study, linked back to the organisation.
 *
 * Used on project detail pages, where the page IS the artefact being described.
 */
export function buildProjectGraph(project: {
  slug: string;
  title: string;
  problem?: string;
  solution?: string;
  image?: string;
  year?: string;
}): Record<string, unknown> {
  const url = `${SITE_URL}/projects/${project.slug}`;

  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": `${url}#work`,
    name: project.title,
    url,
    ...(project.problem ? { abstract: project.problem.slice(0, 300) } : {}),
    ...(project.image?.startsWith("http") ? { image: project.image } : {}),
    ...(project.year ? { dateCreated: project.year } : {}),
    creator: { "@id": `${SITE_URL}/#organization` }
  };
}

/**
 * `Article` for one post.
 *
 * `author` is a Person when the post names one and the organisation otherwise —
 * an Article with no author at all is the shape that gets ignored, and
 * attributing a named person who did not write it would be worse.
 */
export function buildPostGraph(post: {
  slug: string;
  title: string;
  excerpt?: string;
  image?: string;
  publishedAt?: string;
  authorName?: string;
}): Record<string, unknown> {
  const url = `${SITE_URL}/insights/${post.slug}`;

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${url}#article`,
    headline: post.title.slice(0, 110),
    url,
    mainEntityOfPage: url,
    ...(post.excerpt ? { description: post.excerpt } : {}),
    ...(post.image?.startsWith("http") ? { image: post.image } : {}),
    ...(post.publishedAt ? { datePublished: post.publishedAt } : {}),
    author: post.authorName
      ? { "@type": "Person", name: post.authorName }
      : { "@id": `${SITE_URL}/#organization` },
    publisher: { "@id": `${SITE_URL}/#organization` }
  };
}

/**
 * `FAQPage` for the published questions.
 *
 * Google shows FAQ rich results only when the marked-up questions and answers
 * are visible on the page, so this is built from exactly the rows the page
 * renders — never from a superset. Answers are plain text; anything else would
 * be an HTML claim the page does not honour.
 */
export function buildFaqGraph(
  faqs: { question: string; answer: string }[]
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${SITE_URL}/faq#faq`,
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer }
    }))
  };
}

/**
 * Serialises a graph for a `<script type="application/ld+json">`.
 *
 * `<` is escaped so a stray "</script>" inside CMS copy cannot close the tag
 * early and turn editable content into executable markup.
 */
export function serialiseJsonLd(graph: Record<string, unknown>): string {
  return JSON.stringify(graph).replace(/</g, "\\u003c");
}
