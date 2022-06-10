import { supabase } from "./supabase";

export const getAllBookmarks = async () => {
  const { data: bookmarks, error } = await supabase.from("bookmarks").select("*");

  return bookmarks;
};

export const getBookmarkByTemp_id = async (id) => {
  const { data: bookmark } = await supabase
    .from("bookmarks")
    .select("*")
    .eq("temp_id", id)
    .single();

  return bookmark;
};
