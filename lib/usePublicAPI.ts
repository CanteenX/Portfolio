"use client";

import { useEffect, useState } from "react";

export function usePublicAPI<T>(
  fetchFn: () => Promise<T[]>,
  fallback: T[] = []
): { data: T[]; loading: boolean; error: string | null } {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetchFn()
      .then((result) => {
        if (!cancelled) {
          setData(result && result.length > 0 ? result : fallback);
          setError(null);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setData(fallback);
          setError("Failed to fetch data");
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, []);

  return { data, loading, error };
}

export function usePublicSettings<T>(
  fetchFn: () => Promise<T | null>
): { settings: T | null; loading: boolean } {
  const [settings, setSettings] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetchFn()
      .then((result) => { if (!cancelled) setSettings(result); })
      .catch(() => { if (!cancelled) setSettings(null); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);

  return { settings, loading };
}
