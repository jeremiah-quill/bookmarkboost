import { getUsersBookmarks } from "../../lib/dbAdmin";
import { supabase } from "../../lib/supabase";

export default async function handler(req, res) {
  const token = req.headers.token;

  const { data: user, error: userError } = await supabase.auth.api.getUser(token);

  const { bookmarks, error } = await getUsersBookmarks(user.id);

  res.status(200).json(bookmarks);
}
