import { useState } from "react";
import { supabase } from "../lib/supabase";
import { useAuth } from "../lib/useAuth";
import { useBookmarks } from "./useBookmarks";
import { v4 as uuidv4 } from "uuid";

const BmQuickAdd = () => {
  const [inputValue, setInputValue] = useState("");

  const { data, error, mutate } = useBookmarks();

  const auth = useAuth();

  const onSubmit = async (e) => {
    e.preventDefault();

    // * add in temp_id to use for when we loop over bookmarks in BmList since we will be mutating them locally before response comes back from DB
    const newBookmark = {
      url: inputValue,
      title: inputValue,
      user_id: auth.user.id,
      temp_id: uuidv4(),
    };

    const addBookmark = async (bookmark) => {
      const { data, error } = await supabase.from("bookmarks").insert([bookmark]).single();
      if (error) {
        // TODO: add toast error handling
        return error;
      }
      return data;
    };

    // attempt the mutation (addBookmark).  If it fails we will roll back the UI.
    await mutate(addBookmark(newBookmark), {
      optimisticData: [...data, newBookmark],
      rollbackOnError: true,
      populateCache: false,
      revalidate: true,
    });

    setInputValue("");
  };

  return (
    <div className="border border-black rounded-md px-2 flex items-center">
      <form onSubmit={onSubmit}>
        <input
          placeholder="Enter URL here..."
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
        />
        <button type="submit" className="text-2xl">
          +
        </button>
      </form>
    </div>
  );
};

export default BmQuickAdd;
