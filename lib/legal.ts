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
  // TODO(owner): the registered legal entity name, not the brand.
  controllerName: "Nventra",
  // TODO(owner): registered business address, required for a controller identity.
  controllerAddress: "",
  contactEmail: "hello@umaeng.co.in",
  // TODO(owner): confirm. 24 months is a common default for B2B enquiry data,
  // but it must match what actually happens, not what sounds reasonable.
  retentionPeriod: "24 months from last contact",
  lastUpdated: "2026-09-15",
  // These are the processors the stack actually uses today, verified against
  // the deployment: hosting, object storage, database and outbound mail.
  processors: [
    { name: "Vercel Inc.", purpose: "Website and API hosting", location: "United States" },
    { name: "MongoDB Atlas", purpose: "Database storage of enquiries", location: "See cluster region" },
    { name: "Supabase", purpose: "Image and file storage", location: "ap-northeast-2 (Seoul)" },
    { name: "SMTP provider", purpose: "Delivering enquiry notifications", location: "TODO(owner)" }
  ],
  draft: true
};

/** True while any required value is still a placeholder. */
export function hasUnconfirmedDetails(): boolean {
  return (
    LEGAL.draft ||
    LEGAL.controllerAddress.trim() === "" ||
    LEGAL.processors.some((p) => p.location.startsWith("TODO"))
  );
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
