import useSWR from "swr";
import { fetcher } from "../api";

export interface CmsSection {
  id: string;
  title: string;
  data: any;
}

export function useCmsContent(pageSlug: string) {
  const { data, error, isLoading, mutate } = useSWR(`/website-cms/items?limit=100`, fetcher);

  const sections = data?.items
    ? data.items.filter((item: any) => item.data?.page === pageSlug)
    : [];

  const getSection = (sectionId: string) => {
    return sections.find((s: any) => s.data?.sectionId === sectionId)?.data;
  };

  return {
    sections,
    getSection,
    isLoading,
    isError: error,
    refresh: mutate
  };
}
export function useSiteSettings() {
  const { data, error, isLoading } = useSWR(`/site-settings/items?limit=1`, fetcher);
  
  const settings = data?.items?.[0]?.data || null;

  return {
    settings,
    isLoading,
    isError: error
  };
}
