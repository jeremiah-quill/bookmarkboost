import { getUsersFolders } from "../../lib/dbAdmin";
import { supabase } from "../../lib/supabase";

export default async function handler(req, res) {
  const token = req.headers.token;

  const { data: user } = await supabase.auth.api.getUser(token);

  const { folders } = await getUsersFolders(user.id);

  res.status(200).json(folders);
}
