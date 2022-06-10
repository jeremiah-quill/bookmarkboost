import { getAllBookmarks, getBookmarkByTemp_id } from "../../lib/dbAdmin";
import { supabase } from "../../lib/supabase";

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
  const bookmarks = await getAllBookmarks();

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
  console.log(bookmark);
  return <div>{bookmark.title}</div>;
}
