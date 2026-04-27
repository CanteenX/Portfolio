import useSWR from "swr";
import { fetcher } from "../api";

export function useProjects() {
  const { data, error, isLoading, mutate } = useSWR(`/portfolio-projects/items?limit=100`, fetcher);

  const projects = data?.items?.map((item: any) => ({
    id: item.id,
    ...item.data
  })) || [];

  return {
    projects,
    isLoading,
    isError: error,
    refresh: mutate
  };
}
