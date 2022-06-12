import BmList from "../components/BmList";
import LoadingCards from "../components/LoadingCards";
import { useAuth } from "../lib/useAuth";
import useSWR from "swr";

const DashboardPage = () => {
  // const { session } = useAuth();
  // const {session} = supabase.auth.

  const fetcher = async (url, token) => {
    const res = await fetch(url, {
      method: "GET",
      headers: new Headers({ "Content-Type": "application/json", token }),
      credentials: "same-origin",
    });

    return res.json();
  };

  const { data: bookmarks } = useSWR(
    !session ? null : ["/api/usersBookmarks", session.access_token],
    fetcher
  );

  if (!bookmarks) {
    return <LoadingCards />;
  }

  return (
    <>
      <div className="h-full">
        <BmList bookmarks={bookmarks} />
      </div>
    </>
  );
};

export default DashboardPage;
