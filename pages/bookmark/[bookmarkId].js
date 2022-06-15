import { getAllBookmarks, getBookmarkByTemp_id } from "../../lib/dbAdmin";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../../lib/useAuth";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { withProtected } from "../../utils/routeProtection";
import Navbar from "../../components/Navbar";

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
    <>
      <Navbar />
      <div className="relative">
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
        {/* <div className="z-20 m-5">
          <form className="flex flex-col gap-10 max-w-6xl m-auto">
            <div className="flex flex-col">
              <label className="mb-2 font-bold">URL</label>
              <input
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                className="bg-transparent p-2 rounded-md"
                placeholder="URL..."
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-2 font-bold">Title</label>
              <input
                value={titleInput}
                onChange={(e) => setTitleInput(e.target.value)}
                className="bg-transparent p-2 rounded-md"
                placeholder="Title..."
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-2 font-bold">Notes</label>
              <textarea
                value={notesInput}
                onChange={(e) => setNotesInput(e.target.value)}
                className="bg-transparent p-2 rounded-md"
                placeholder="Notes..."
              />
            </div>
          </form>
        </div> */}
      </div>
    </>
  );
};

export default withProtected(BookmarkPage);
