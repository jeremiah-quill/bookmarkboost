import { useState } from "react";
import { supabase } from "../lib/supabase";
import { useAuth } from "../lib/useAuth";
import { v4 as uuidv4 } from "uuid";
import useSWR from "swr";

const BmQuickAdd = () => {
  const [inputValue, setInputValue] = useState("");
  const { loading, session, user } = useAuth();

  const fetcher = async (url, token) => {
    const res = await fetch(url, {
      method: "GET",
      headers: new Headers({ "Content-Type": "application/json", token }),
      credentials: "same-origin",
    });

    return res.json();
  };

  const { data, error, mutate } = useSWR(
    loading || !session ? null : ["/api/usersBookmarks", session.access_token],
    fetcher
  );

  const onSubmit = async (e) => {
    e.preventDefault();
    setInputValue("");

    // * add in temp_id to use for when we loop over bookmarks in BmList since we will be mutating them locally before response comes back from DB
    const newBookmark = {
      url: inputValue,
      title: inputValue,
      user_id: user.id,
      temp_id: uuidv4(),
    };

    const addBookmark = async (bookmark) => {
      const { data, error } = await supabase.from("bookmarks").insert([bookmark]).single();
      if (error) {
        // TODO: add toast error handling
        console.log(error);
        return error;
      }
      return data;
    };

    await mutate(addBookmark(newBookmark), {
      optimisticData: [...data, newBookmark],
      rollbackOnError: true,
      populateCache: false,
      revalidate: true,
    });
  };

  return (
    <div className="border border-black rounded-md px-2">
      <form className="flex items-center" onSubmit={onSubmit}>
        <input
          placeholder="Quick add URL..."
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
        />
        <button type="submit" className="text-xl">
          +
        </button>
      </form>
    </div>
  );
};

export default BmQuickAdd;
