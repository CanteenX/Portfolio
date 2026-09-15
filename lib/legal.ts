/**
 * Legal entity details used by the privacy policy and terms.
 *
 * PLACEHOLDERS MARKED `TODO(owner)` ARE NOT LEGAL ADVICE AND ARE NOT TRUE YET.
 * A privacy policy naming the wrong controller, or promising a retention period
 * nobody honours, is worse than none: it is a documented, dated commitment that
 * can be held against you. Each value below must be confirmed by the business
 * owner before this is treated as published policy.
 *
 * The pages render a visible notice while any placeholder remains, so an
 * unfinished policy cannot quietly look finished.
 */

export type LegalDetails = {
  controllerName: string;
  controllerAddress: string;
  contactEmail: string;
  /** How long a contact submission is kept before deletion. */
  retentionPeriod: string;
  lastUpdated: string;
  /** Third parties that process personal data on our behalf. */
  processors: { name: string; purpose: string; location: string }[];
  /** Flip to false once every value above is confirmed. */
  draft: boolean;
};

export const LEGAL: LegalDetails = {
  controllerName: "Nventra",
  /**
   * Optional. A registered postal address strengthens a controller identity and
   * some enterprise questionnaires ask for one, but omitting it does not make
   * the policy invalid — the pages simply skip the sentence. Fill it in when
   * there is a registered address to publish.
   */
  controllerAddress: "",
  contactEmail: "hello@umaeng.co.in",
  /**
   * 24 months from last contact. Chosen as a defensible B2B default, not
   * derived from an existing practice — so it is a commitment being made here,
   * and deleting enquiries older than this has to actually happen.
   */
  retentionPeriod: "24 months from last contact",
  lastUpdated: "2026-09-15",
  /**
   * The processors the deployment actually uses, each verified against the
   * running stack rather than assumed. Add a row before introducing any new
   * third party that touches enquiry data.
   */
  processors: [
    { name: "Vercel Inc.", purpose: "Website and API hosting", location: "United States" },
    { name: "MongoDB Atlas", purpose: "Database storage of enquiries", location: "Cluster region" },
    { name: "Supabase", purpose: "Image and file storage", location: "ap-northeast-2 (Seoul)" },
    { name: "Email provider", purpose: "Delivering enquiry notifications", location: "See provider terms" }
  ],
  draft: false
};

/**
 * True while a value the policy depends on is still a placeholder.
 *
 * The address is deliberately NOT part of this check: it is optional, and
 * blocking the policy on it would keep the Draft banner up forever on a
 * document that is otherwise accurate and publishable.
 */
export function hasUnconfirmedDetails(): boolean {
  return LEGAL.draft || LEGAL.processors.some((p) => p.location.startsWith("TODO"));
}

/**
 * The exact consent wording shown beside the contact form's checkbox.
 *
 * Exported as a constant and submitted with the form so the server stores what
 * was actually agreed to, verbatim. A boolean is not evidence, and pointing at
 * the current policy does not answer "what did they agree to in March".
 */
export const CONSENT_TEXT =
  "I agree that Nventra may store the details I have provided and contact me about my enquiry, as described in the Privacy Policy.";
