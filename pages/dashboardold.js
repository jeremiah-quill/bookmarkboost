import useSWR from "swr";

import { useAuth } from "../lib/useAuth";
import { withProtected } from "../utils/routeProtection";

import BmList from "../components/BmList";
import DashboardLoader from "../components/DashboardLoader";
import Header from "../components/Header";
import FolderList from "../components/FolderList";
import DashboardShell from "../components/DashboardShell";
import LoaderShell from "../components/LoaderShell";

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
    return (
      <LoaderShell>
        <DashboardLoader />
      </LoaderShell>
    );
  }

  return (
    <div className="h-full">
      <DashboardShell>
        <div className="bg-blue-500">in regular dashboard</div>
        <BmList bookmarks={bookmarks} />
      </DashboardShell>
    </div>
  );
};

export default withProtected(DashboardPage, DashboardLoader);
