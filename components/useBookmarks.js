import useSWR from "swr";

export function useBookmarks() {
  const { data, error, mutate } = useSWR("/api/bookmarks");

  return {
    data,
    error,
    mutate,
  };
}
