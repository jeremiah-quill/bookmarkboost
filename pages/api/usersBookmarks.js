import { getUsersBookmarks } from "../../lib/dbAdmin";
import { supabase } from "../../lib/supabase";

export default async function handler(req, res) {
  const id = req.headers.id;

  // const { data: user } = await supabase.auth.api.getUser(token);

  const { bookmarks } = await getUsersBookmarks(id);

  res.status(200).json(bookmarks);
}
