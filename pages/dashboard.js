import BmList from "../components/BmList";
import LoadingCards from "../components/LoadingCards";
import { useAuth } from "../lib/useAuth";
import useSWR from "swr";
import { withProtected } from "../utils/routeProtection";
import Navbar from "../components/Navbar";

const DashboardPage = () => {
  const { user, session, loading } = useAuth();

  const fetcher = async (url, token) => {
    const res = await fetch(url, {
      method: "GET",
      headers: new Headers({ "Content-Type": "application/json", token }),
      credentials: "same-origin",
    });

    return res.json();
  };

  const { data: bookmarks } = useSWR(["/api/usersBookmarks", session.access_token], fetcher);

  if (!bookmarks) {
    return <LoadingCards />;
  }

  return (
    <>
      <div className="h-full">
        <Navbar />
        <BmList bookmarks={bookmarks} />
      </div>
    </>
  );
};

export default withProtected(DashboardPage);
