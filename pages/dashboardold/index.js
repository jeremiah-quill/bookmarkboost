import useSWR from "swr";
import { useState } from "react";

import { useAuth } from "../../lib/useAuth";
import { withProtected } from "../../utils/routeProtection";

import BmList from "../../components/BmList";
import DashboardLoader from "../../components/DashboardLoader";
import DashboardShell from "../../components/DashboardShell";
import LoaderShell from "../../components/LoaderShell";

const DashboardPage = () => {
  const { session } = useAuth();
  const [currentFolder, setCurrentFolder] = useState(null);

  const viewFolder = (folderId) => {
    setCurrentFolder(folderId);
  };

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
      <DashboardShell viewFolder={viewFolder}>
        <BmList bookmarks={bookmarks} currentFolder={currentFolder} />
      </DashboardShell>
    </div>
  );
};

export default withProtected(DashboardPage, DashboardLoader);
