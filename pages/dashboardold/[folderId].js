import { useRouter } from "next/router";
import useSWR from "swr";

import DashboardShell from "../../components/DashboardShell";
import LoaderShell from "../../components/LoaderShell";
import BmList from "../../components/BmList";
import { withProtected } from "../../utils/routeProtection";
import DashboardLoader from "../../components/DashboardLoader";
import { useAuth } from "../../lib/useAuth";

const FolderPage = () => {
  const router = useRouter();
  const { session } = useAuth();

  const fetcher = async (url, token, id) => {
    const res = await fetch(url, {
      method: "GET",
      headers: new Headers({ "Content-Type": "application/json", token, id }),
      credentials: "same-origin",
    });

    return res.json();
  };

  const folderId = router.query.folderId;
  const { data: bookmarks } = useSWR(
    ["/api/getBookmarksByFolder", session.access_token, folderId],
    fetcher
  );

  // const updateBmUi = (folderId, newBm) => {
  //   if (folderId === currentFolder.id) {
  //     setSyncedBmList((curr) => [...curr, newBm]);
  //   }
  // };

  // const removeFromUi = (folderId, tempId) => {
  //   if (folderId === currentFolder.id) {
  //     setSyncedBmList((curr) => curr.filter((el) => el.temp_id !== tempId));
  //   }
  // };

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
        <BmList bookmarks={bookmarks} />
      </DashboardShell>
    </div>
  );
};

export default withProtected(FolderPage, DashboardLoader);
