import { useState } from "react";
import { useRouter } from "next/router";

import { getAllBookmarks, getBookmarkByTemp_id, updateTitle, updateUrl } from "../../lib/dbAdmin";
import { useAuth } from "../../lib/useAuth";
import { withProtected } from "../../utils/routeProtection";

import DashboardShell from "../../components/DashboardShell";
import EditableField from "../../components/EditableField";
import BookmarkPageLoader from "../../components/BookmarkPageLoader";

export async function getStaticProps(context) {
  const temp_id = context.params.bookmarkId;

  const bookmark = await getBookmarkByTemp_id(temp_id);

  return {
    props: {
      bookmark: bookmark,
    },
    revalidate: 1,
  };
}

export async function getStaticPaths() {
  const { bookmarks } = await getAllBookmarks();

  const paths = bookmarks.map((bookmark) => ({
    params: {
      bookmarkId: bookmark.temp_id,
    },
  }));

  return {
    paths: paths,
    fallback: "blocking",
  };
}

const BookmarkPage = ({ bookmark }) => {
  const { user, session } = useAuth();
  const router = useRouter();

  const [syncedBm, setSyncedBm] = useState(bookmark);

  const [urlInput, setUrlInput] = useState(syncedBm.url);
  const [titleInput, setTitleInput] = useState(syncedBm.title);
  const [notesInput, setNotesInput] = useState(syncedBm.notes || "");

  if (user.id !== bookmark.user_id) {
    return "NOT ALLOWED TO SEE THIS BOOKMARK!";
  }

  const updateBmTitle = async (title, id) => {
    const updated = await updateTitle(title, id);
    setSyncedBm(updated);
  };

  const updateBmUrl = async (url, id) => {
    const updated = await updateUrl(url, id);
    setSyncedBm(updated);
  };

  return (
    <DashboardShell>
      <div className="relative pt-5">
        <EditableField
          value={syncedBm.title}
          editableId={syncedBm.id}
          onSubmit={updateBmTitle}
          textSize={"text-2xl"}>
          <h1 className="text-2xl font-bold text-center">{syncedBm.title}</h1>
        </EditableField>
        <EditableField
          value={syncedBm.url}
          editableId={syncedBm.id}
          onSubmit={updateBmUrl}
          textSize={"text-lg"}>
          <h2 className="text-lg font-bold text-center">{syncedBm.url}</h2>
        </EditableField>
        <div className="p-2 rounded-md w-full my-2 m-auto max-w-5xl flex">
          <textarea
            value={notesInput}
            onChange={(e) => setNotesInput(e.target.value)}
            className="w-full p-3 rounded-md"
            placeholder="Notes..."
          />
        </div>
      </div>
    </DashboardShell>
  );
};

// TODO: replace dashboard loader with bookmark page specific loader
export default withProtected(BookmarkPage, BookmarkPageLoader);
