import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import { getPublicSettings } from "@/lib/api";

/**
 * A 404 that keeps the visitor on the site.
 *
 * Next's built-in 404 is a bare monochrome page with no navigation — a stale
 * link from an old proposal deck dead-ends there with no route back. For an
 * agency site most 404s arrive from exactly that: a URL someone was sent months
 * ago. Giving them the three places worth going is the whole job.
 */
export const metadata: Metadata = {
  title: "Page not found",
  // Explicitly unindexed: a 404 that ranks is worse than no result at all.
  robots: { index: false, follow: true }
};

const DESTINATIONS = [
  { href: "/work", label: "Our work", detail: "Case studies and what they measured" },
  { href: "/services", label: "Services", detail: "What we build and how we engage" },
  { href: "/contact", label: "Contact", detail: "Start a conversation" }
];

export default async function NotFound() {
  // A 404 is often a visitor's first impression from a stale link in an old
  // proposal deck. The nav they land on should carry the real brand, not the
  // shipped fallback, so the settings lookup rides along here too.
  const settings = await getPublicSettings().catch(() => null);

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar initialSettings={settings} />
      <div className="mx-auto w-full max-w-3xl px-6 py-32">
        <p className="font-mono text-sm uppercase tracking-[0.2em] text-zinc-500">Error 404</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
          That page isn&apos;t here.
        </h1>
        <p className="mt-5 max-w-xl text-zinc-400">
          The link may be out of date, or the page may have moved. Nothing is broken on your side.
        </p>

        <div className="mt-12 grid gap-3">
          {DESTINATIONS.map((destination) => (
            <Link
              key={destination.href}
              href={destination.href}
              className="group flex items-baseline justify-between rounded-xl border border-white/10 bg-white/5 px-6 py-5 transition-colors hover:border-mint/40"
            >
              <span className="font-medium">{destination.label}</span>
              <span className="text-sm text-zinc-500 group-hover:text-zinc-300">
                {destination.detail}
              </span>
            </Link>
          ))}
        </div>
      </div>
      <Footer initialSettings={settings} />
    </main>
  );
}
