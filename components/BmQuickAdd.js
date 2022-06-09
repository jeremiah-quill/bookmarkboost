import { useState, useContext } from "react";
import { supabase } from "../lib/supabase";

import { DispatchBookmarkContext } from "../utils/store";

const BmQuickAdd = () => {
  const [inputValue, setInputValue] = useState("");

  const dispatchBookmarks = useContext(DispatchBookmarkContext);

  const onSubmit = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from("bookmarks")
      .insert([{ url: inputValue, title: inputValue, user_id: supabase.auth.user().id }])
      .single();

    if (error) {
      console.log(error);
      return;
    }

    if (!data) {
      console.log("loading");
    }
    // * if there is data coming back from our insert, add it to the UI
    if (data) {
      dispatchBookmarks({ type: "ADD_BOOKMARK", newBookmark: data });
    }

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
