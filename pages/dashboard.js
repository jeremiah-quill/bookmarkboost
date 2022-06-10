import BmList from "../components/BmList";
import LoadingCards from "../components/LoadingCards";
import { useAuth } from "../lib/useAuth";
import useSWR from "swr";

export default function DashboardPage() {
  const { user, session } = useAuth();

  const fetcher = async (url, token) => {
    const res = await fetch(url, {
      method: "GET",
      headers: new Headers({ "Content-Type": "application/json", token }),
      credentials: "same-origin",
    });

    return res.json();
  };

  const {
    data: bookmarks,
    error,
    mutate,
  } = useSWR(session ? ["/api/bookmarks", session.access_token] : null, fetcher);

  // if(error) return <ErrorScreen />
  if (!user) return "no user...";
  if (!bookmarks) return <LoadingCards />;

  return (
    <div className="h-full">
      <BmList bookmarks={bookmarks} />
    </div>
  );
}
