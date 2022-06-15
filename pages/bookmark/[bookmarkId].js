import { useState } from "react";
import { useRouter } from "next/router";

import { getAllBookmarks, getBookmarkByTemp_id } from "../../lib/dbAdmin";
import { useAuth } from "../../lib/useAuth";
import { withProtected } from "../../utils/routeProtection";

import DashboardLoader from "../../components/DashboardLoader";
import DashboardShell from "../../components/DashboardShell";

export async function getStaticProps(context) {
  const temp_id = context.params.bookmarkId;

  const bookmark = await getBookmarkByTemp_id(temp_id);

  return {
    props: {
      bookmark: bookmark,
    },
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
    fallback: false,
  };
}

const BookmarkPage = ({ bookmark }) => {
  const { user } = useAuth();
  const router = useRouter();

  const [urlInput, setUrlInput] = useState(bookmark.url);
  const [titleInput, setTitleInput] = useState(bookmark.title);
  const [notesInput, setNotesInput] = useState(bookmark.notes || "");

  if (user.id !== bookmark.user_id) {
    return "NOT ALLOWED TO SEE THIS BOOKMARK!";
  }

  return (
    <DashboardShell>
      <div className="relative pt-5">
        <h1 className="text-2xl font-bold text-center">{bookmark.title}</h1>
        <h2 className="text-lg underline text-center">{bookmark.url}</h2>
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
export default withProtected(BookmarkPage, DashboardLoader);
