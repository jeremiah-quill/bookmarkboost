import useSWR from "swr";

export function useBookmarks() {
  const fetcher = async (...args) => {
    const res = await fetch(...args);
    return res.json();
  };
  const { data, error, mutate } = useSWR("/api/bookmarks", fetcher);

  return {
    data,
    error,
    mutate,
  };
}
