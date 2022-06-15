import useSWR from "swr";

import { useAuth } from "../lib/useAuth";
import { withProtected } from "../utils/routeProtection";

import BmList from "../components/BmList";
import DashboardLoader from "../components/DashboardLoader";
import Header from "../components/Header";
import FolderList from "../components/FolderList";
import DashboardShell from "../components/DashboardShell";

const DashboardPage = () => {
  const { session } = useAuth();

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
    return <DashboardLoader />;
  }

  return (
    <div className="h-full">
      <DashboardShell>
        <BmList bookmarks={bookmarks} />
      </DashboardShell>
    </div>
  );
};

export default withProtected(DashboardPage, DashboardLoader);
