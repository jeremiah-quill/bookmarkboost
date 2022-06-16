import { useState } from "react";
import { getFolderByName, getBookmarksByFolder, getAllFolders } from "../../lib/dbAdmin";

import DashboardShell from "../../components/DashboardShell";
import BmList from "../../components/BmList";
import NewBmCard from "../../components/NewBmCard";
import { withProtected } from "../../utils/routeProtection";
import DashboardLoader from "../../components/DashboardLoader";

export async function getStaticProps(context) {
  const folderName = context.params.folderName;
  const folder = await getFolderByName(folderName);

  if (!folder) {
    return {
      redirect: {
        destination: "/dashboard",
      },
    };
  }

  const bookmarks = await getBookmarksByFolder(folder.id);

  return {
    props: {
      bookmarks: bookmarks,
      folder: folder,
    },
    revalidate: 1,
  };
}

export async function getStaticPaths() {
  const { folders } = await getAllFolders();

  const paths = folders.map((folder) => ({
    params: {
      folderName: folder.name,
    },
  }));

  return {
    paths: paths,
    fallback: "blocking",
  };
}

const FolderPage = ({ bookmarks, folder }) => {
  // * I use this piece of state to sync UI when quick adding in a specific folder...need to find a better way to do this
  const [syncedBmList, setSyncedBmList] = useState(bookmarks.bookmarks);

  // TODO: refactor so I don't have to pass this function down whole tree
  const updateBmUi = (newBm) => {
    setSyncedBmList((curr) => [...curr, newBm]);
  };

  // TODO: refactor so I don't have to pass folder.id down whole tree
  return (
    <div className="h-full">
      <DashboardShell folderId={folder.id} updateBmUi={updateBmUi}>
        <BmList bookmarks={syncedBmList} />
      </DashboardShell>
    </div>
  );
};

export default withProtected(FolderPage, DashboardLoader);
