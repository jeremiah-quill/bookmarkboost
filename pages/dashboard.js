import useSWR from "swr";
import { useState, useEffect } from "react";

import { useAuth } from "../lib/useAuth";
import { withProtected } from "../utils/routeProtection";

import BmList from "../components/BmList";
import DashboardLoader from "../components/DashboardLoader";
import DashboardShell from "../components/DashboardShell";
import LoaderShell from "../components/LoaderShell";
import { fetcher } from "../utils/fetcher";
import { useFolder } from "../utils/useFolder";

const DashboardPage = () => {
  const { session } = useAuth();
  const { currentFolder } = useFolder();
  const [filteredBookmarks, setFilteredBookmarks] = useState(null);
  const { data: bookmarks } = useSWR(["/api/usersBookmarks", session.access_token], fetcher);
  const { data: folders } = useSWR(["/api/usersFolders", session.access_token], fetcher);

  useEffect(() => {
    if (currentFolder) {
      setFilteredBookmarks(bookmarks.filter((bm) => bm.folder_id === currentFolder));
    } else {
      setFilteredBookmarks(bookmarks);
    }
  }, [currentFolder, bookmarks]);

  if (!filteredBookmarks || !folders) {
    return (
      <LoaderShell>
        <DashboardLoader />
      </LoaderShell>
    );
  }

  return (
    <div className="h-full">
      <DashboardShell>
        <BmList bookmarks={filteredBookmarks} />
      </DashboardShell>
    </div>
  );
};

export default withProtected(DashboardPage, DashboardLoader);
