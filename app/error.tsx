"use client";

import { useEffect } from "react";
import Link from "next/link";

/**
 * Route-level error boundary.
 *
 * Must be a Client Component — that is the contract for error.tsx, which React
 * mounts after a render throws. Deliberately plain: no Navbar or Footer, since
 * either could be the thing that threw, and an error page that crashes is worse
 * than the error it was catching.
 */
export default function Error({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Server-side digest only; the message is withheld from the browser in
    // production by Next. Logging here is what makes a client-side failure
    // visible at all.
    console.error("Unhandled page error", error.digest ?? error.message);
  }, [error]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-6 text-white">
      <div className="w-full max-w-lg">
        <p className="font-mono text-sm uppercase tracking-[0.2em] text-zinc-500">
          Something went wrong
        </p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight">
          This page failed to load.
        </h1>
        <p className="mt-4 text-zinc-400">
          It is being looked at. You can retry, or head back to the homepage.
        </p>

        {error.digest ? (
          <p className="mt-4 font-mono text-xs text-zinc-600">Reference: {error.digest}</p>
        ) : null}

        <div className="mt-10 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={reset}
            className="rounded-full bg-mint px-8 py-3 text-sm font-bold text-black transition-opacity hover:opacity-90"
          >
            Try again
          </button>
          <Link
            href="/"
            className="rounded-full border border-white/15 px-8 py-3 text-sm font-medium transition-colors hover:border-white/40"
          >
            Go home
          </Link>
        </div>
      </div>
    </main>
  );
}
