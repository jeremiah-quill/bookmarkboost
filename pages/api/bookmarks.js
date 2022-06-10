import { supabase } from "../../lib/supabase";
import { getAllBookmarks } from "../../lib/dbAdmin";

export default async function handler(req, res) {
  const bookmarks = await getAllBookmarks();

  res.status(200).json(bookmarks);
}
