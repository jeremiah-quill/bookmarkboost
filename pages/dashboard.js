import BmList from "../components/BmList";
import LoadingCards from "../components/LoadingCards";
import { useAuth } from "../lib/useAuth";
import useSWR from "swr";
import { withProtected } from "../utils/routeProtection";
import Navbar from "../components/Navbar";
import Toast from "../components/Toast";

const DashboardPage = () => {
  const { user, session, loading } = useAuth();

  // console.log("user", user);

  // console.log("session", session);

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
        {/* <div className="grid-cols-2">

        </div> */}
        <Navbar />
        <div className="flex h-full">
          <div className="w-[200px] pl-5 bg-[rgb(250 250 250)] border-r border-slate-200">
            sidebar
          </div>
          <BmList bookmarks={bookmarks} />
        </div>
      </div>
    </>
  );
};

export default withProtected(DashboardPage);
