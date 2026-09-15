import type { Metadata } from "next";
import { LegalPage } from "@/components/ui/legal-page";
import { LEGAL } from "@/lib/legal";
import { SITE_NAME, SITE_URL } from "@/lib/site";

const TITLE = "Privacy Policy";
const DESCRIPTION =
  "How Nventra collects, uses, stores and deletes the personal data you provide through this website.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/privacy" },
  openGraph: {
    title: `${TITLE} — ${SITE_NAME}`,
    description: DESCRIPTION,
    url: `${SITE_URL}/privacy`,
    type: "website",
    siteName: SITE_NAME
  }
};

export default function Page() {
  return (
    <LegalPage title={TITLE} lastUpdated={LEGAL.lastUpdated}>
      <section>
        <h2>Who we are</h2>
        <p>
          {LEGAL.controllerName} is the data controller for personal data collected through this
          website.
          {LEGAL.controllerAddress ? ` Registered at ${LEGAL.controllerAddress}.` : ""} You can
          reach us at <a href={`mailto:${LEGAL.contactEmail}`}>{LEGAL.contactEmail}</a>.
        </p>
      </section>

      <section>
        <h2>What we collect</h2>
        <p>
          We collect only what you type into our enquiry form, plus a small amount of technical
          context about how you arrived:
        </p>
        <ul>
          <li>Your name and email address, which are required to reply to you.</li>
          <li>
            Optionally, your phone number, company, the service you are interested in, an indicative
            budget band and timeline, and any preferred call slot.
          </li>
          <li>The message you write.</li>
          <li>
            The referring web address and any campaign parameters it carries, recorded by our server
            so we know which channels produce enquiries.
          </li>
          <li>The wording of the consent you agreed to, and the time you agreed to it.</li>
        </ul>
        <p>
          We do not use advertising trackers, we do not sell data, and we do not build profiles of
          visitors.
        </p>
      </section>

      <section>
        <h2>Why we may hold it</h2>
        <p>
          We rely on your consent, given when you submit the enquiry form, and on our legitimate
          interest in responding to business enquiries addressed to us. You may withdraw consent at
          any time by emailing us; withdrawal does not affect anything done before you withdrew.
        </p>
      </section>

      <section>
        <h2>How long we keep it</h2>
        <p>
          Enquiries are retained for {LEGAL.retentionPeriod}, after which they are deleted. If you
          ask us to delete your enquiry sooner, we will.
        </p>
      </section>

      <section>
        <h2>Who processes it for us</h2>
        <p>
          We use the following service providers. They process data on our instructions only, and we
          do not give them permission to use it for their own purposes.
        </p>
        <ul>
          {LEGAL.processors.map((processor) => (
            <li key={processor.name}>
              <strong>{processor.name}</strong> — {processor.purpose} ({processor.location})
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Your rights</h2>
        <p>
          You can ask us to show you the data we hold about you, correct it, delete it, restrict what
          we do with it, or provide it in a portable form. You can also object to our processing it.
          Email <a href={`mailto:${LEGAL.contactEmail}`}>{LEGAL.contactEmail}</a> and we will respond
          within 30 days. If you are not satisfied with our response, you may complain to your local
          data protection authority.
        </p>
      </section>

      <section>
        <h2>Cookies and analytics</h2>
        <p>
          This website sets <strong>no cookies</strong> — no advertising cookies, no analytics
          cookies, and no cross-site trackers.
        </p>
        <p>
          We measure aggregate traffic using Vercel Web Analytics and Vercel Speed Insights. These
          are cookieless: they record page views and performance timings without storing an
          identifier on your device and without building a profile of you. That is why this site
          shows no cookie consent banner — there is nothing to consent to. If we ever adopt a
          technology that does need consent, we will ask before enabling it and update this page.
        </p>
      </section>
    </LegalPage>
  );
}
