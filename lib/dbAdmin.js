import { supabase } from "./supabase";
import { v4 as uuidv4 } from "uuid";

export const getAllBookmarks = async () => {
  // TODO: add error handling
  const { data: bookmarks, error } = await supabase.from("bookmarks").select("*");
  return { bookmarks, error };
};

export const getUsersBookmarks = async (userId) => {
  // TODO: add error handling
  const { data: bookmarks } = await supabase.from("bookmarks").select("*").eq("user_id", userId);
  return { bookmarks };
};

export const getBookmarkByTemp_id = async (id) => {
  // TODO: add error handling
  const { data: bookmark } = await supabase
    .from("bookmarks")
    .select("*")
    .eq("temp_id", id)
    .single();
  return bookmark;
};

export const newBookmark = async (bookmark) => {
  const bookmarkWithId = {
    ...bookmark,
    temp_id: bookmark?.temp_id || uuidv4(),
  };
  // TODO: add error handling
  const { data, error } = await supabase.from("bookmarks").insert([bookmarkWithId]).single();
  return data;
};

export const updateTitle = async (updatedTitle, id) => {
  // TODO: add error handling
  const { data: bookmark, error } = await supabase
    .from("bookmarks")
    .update({ title: updatedTitle })
    .eq("id", id)
    .single();
  return bookmark;
};
