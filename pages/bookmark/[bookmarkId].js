import { getAllBookmarks, getBookmarkByTemp_id } from "../../lib/dbAdmin";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../../lib/useAuth";

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

export default function BookmarkPage({ bookmark }) {
  const { user } = useAuth();

  if (!user) return "waiting for user";

  if (user.id !== bookmark.user_id) {
    return "NOT ALLOWED TO SEE THIS BOOKMARK!";
  }

  return <div>{bookmark.title}</div>;
}
