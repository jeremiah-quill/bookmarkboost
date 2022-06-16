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
  // We need to add a uuid on front end when quick adding (to optimistically update UI).  Here we check if there already is a temp_id, if not, add one
  const bookmarkWithId = {
    ...bookmark,
    temp_id: bookmark.temp_id ? bookmark.temp_id : uuidv4(),
    title: bookmark.title ? bookmark.title : bookmark.url,
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

export const updateUrl = async (updatedUrl, id) => {
  // TODO: add error handling
  const { data: bookmark, error } = await supabase
    .from("bookmarks")
    .update({ url: updatedUrl })
    .eq("id", id)
    .single();
  return bookmark;
};
