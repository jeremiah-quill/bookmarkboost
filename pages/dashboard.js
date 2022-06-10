import { supabase } from "../lib/supabase";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuth } from "../lib/useAuth";
import useSWR from "swr";
import BmList from "../components/BmList";

export default function DashboardPage() {
  // const auth = useAuth();

  const fetcher = async (...args) => {
    const res = await fetch(...args);
    return res.json();
  };

  const { data: bookmarks, error } = useSWR("/api/bookmarks", fetcher);

  if (!bookmarks) return "Loading...";

  // if (!auth.user) {
  //   return "Loading...";
  // }

  return (
    <div className="bg-blue-500 h-full">
      <BmList bookmarks={bookmarks} />
    </div>
  );
}
