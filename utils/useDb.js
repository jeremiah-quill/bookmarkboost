import { useEffect, useReducer } from "react";
import bookmarkReducer from "./bookmarkReducer";
import { supabase } from "../lib/supabase";

const useDb = async (defaultState) => {
  // * Gets current todos, either from local storage or from whatever we pass in as default state (we pass in an empty array in TodoContext)

  const getBookmarks = async () => {
    const { data } = await supabase.from("bookmarks").select("*");
    return { data };
  };

  const currentBookmarks = (await getBookmarks()) || defaultState;

  // * Rather than use useState to create a piece of state and a setter, we instead call useReducer and get back todos state and the function to modify todos state
  const [bookmarks, dispatchBookmarks] = useReducer(bookmarkReducer, []);

  // useEffect(() => {
  //   window.localStorage.setItem(key, JSON.stringify(todos));
  // }, [todos, key]);

  return [bookmarks, dispatchBookmarks];
};

export default useDb;
