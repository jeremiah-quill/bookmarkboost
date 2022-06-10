import { supabase } from "./supabase";

export const getAllBookmarks = async () => {
  const { data: bookmarks, error } = await supabase.from("bookmarks").select("*");

  return { bookmarks, error };
};

export const getUsersBookmarks = async (userId) => {
  const { data: bookmarks, error } = await supabase
    .from("bookmarks")
    .select("*")
    .eq("user_id", userId);

  return { bookmarks, error };
};

export const getBookmarkByTemp_id = async (id) => {
  const { data: bookmark } = await supabase
    .from("bookmarks")
    .select("*")
    .eq("temp_id", id)
    .single();

  return bookmark;
};

export const updateTitle = async (updatedTitle, id) => {
  const { data: bookmark, error } = await supabase
    .from("bookmarks")
    .update({ title: updatedTitle })
    .eq("id", id)
    .single();

  return bookmark;
};