import { getUsersBookmarks } from "../../lib/dbAdmin";
import { supabase } from "../../lib/supabase";

export default async function handler(req, res) {
  const token = req.headers.token;

  const { data: user } = await supabase.auth.api.getUser(token);

  const { bookmarks } = await getUsersBookmarks(user.id);

  res.status(200).json(bookmarks);
}
