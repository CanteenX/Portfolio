import Link from "next/link";
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import { hasUnconfirmedDetails } from "@/lib/legal";

/**
 * Shared chrome for the legal pages.
 *
 * A Server Component with no animation deliberately: these pages are read by
 * people looking for a specific clause and by procurement reviewers checking a
 * box, and scroll-hijacking a privacy policy is actively hostile.
 */
export function LegalPage({
  title,
  lastUpdated,
  children
}: {
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="mx-auto w-full max-w-3xl px-6 py-24">
        <h1 className="text-4xl font-semibold tracking-tight">{title}</h1>
        <p className="mt-3 text-sm text-zinc-500">Last updated: {lastUpdated}</p>

        {hasUnconfirmedDetails() ? (
          <div
            role="note"
            className="mt-8 rounded-xl border border-amber-500/40 bg-amber-500/10 p-4 text-sm text-amber-200"
          >
            <strong className="font-semibold">Draft.</strong> This document still contains
            placeholder details and has not been confirmed by the business owner. It is not yet a
            binding statement of our practices. Contact us for anything you need in writing.
          </div>
        ) : null}

        <div className="mt-10 space-y-8 text-[15px] leading-relaxed text-zinc-300 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-white [&_h2]:tracking-tight [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_a]:text-mint [&_a]:underline">
          {children}
        </div>

        <p className="mt-16 text-sm text-zinc-500">
          <Link href="/contact" className="underline hover:text-white">
            Contact us
          </Link>{" "}
          with any question about this document.
        </p>
      </div>
      <Footer />
    </main>
  );
}
