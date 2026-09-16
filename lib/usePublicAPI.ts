"use client";

import { useEffect, useState } from "react";

/**
 * Client-side fetch with a static fallback.
 *
 * `initialData` is what the server already fetched for this page. Seeding with
 * it matters for more than a spinner: without it the first render — the one a
 * crawler or link-preview bot sees, since effects never run during server
 * rendering — contains the hardcoded fallback rather than live CMS content.
 *
 * NOTE: `fetchFn` must be referentially stable (a module-level function). The
 * effect deliberately does not depend on it, because every current caller
 * passes a module-level import and re-running on identity change would refetch
 * on every render. A page needing a parameterised fetch should write its own
 * effect rather than reach for this.
 */
export function usePublicAPI<T>(
  fetchFn: () => Promise<T[]>,
  fallback: T[] = [],
  initialData?: T[] | null
): { data: T[]; loading: boolean; error: string | null } {
  const seeded = initialData && initialData.length > 0 ? initialData : null;
  const [data, setData] = useState<T[]>(seeded ?? []);
  const [loading, setLoading] = useState(!seeded);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    // `loading` is already initialised from `seeded`, so there is nothing to
    // set here: server-seeded data never flashes a spinner over itself.
    fetchFn()
      .then((result) => {
        if (!cancelled) {
          setData(result && result.length > 0 ? result : seeded ?? fallback);
          setError(null);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setData(seeded ?? fallback);
          setError("Failed to fetch data");
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { data, loading, error };
}

export function usePublicSettings<T>(
  fetchFn: () => Promise<T | null>,
  initialSettings?: T | null
): { settings: T | null; loading: boolean } {
  const [settings, setSettings] = useState<T | null>(initialSettings ?? null);
  const [loading, setLoading] = useState(!initialSettings);

  useEffect(() => {
    let cancelled = false;
    fetchFn()
      .then((result) => {
        // Keep the server's copy if the client fetch comes back empty, rather
        // than blanking a page that was rendering fine.
        if (!cancelled && result) setSettings(result);
      })
      .catch(() => {
        /* server-seeded value stands */
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { settings, loading };
}
