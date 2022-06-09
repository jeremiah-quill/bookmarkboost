import { supabase } from "../../lib/supabase";

const handler = async (req, res) => {
  return await supabase.auth.api.setAuthCookie(req, res);
};

export default handler;
