import { getAllBookmarks } from "../../lib/dbAdmin";
import { supabase } from "../../lib/supabase";

export default async function handler(req, res) {
  const { bookmarks, error } = await getAllBookmarks();

  res.status(200).json(bookmarks);
}
