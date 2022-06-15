import { useState } from "react";
import { useAuth } from "../lib/useAuth";
import { v4 as uuidv4 } from "uuid";
import useSWR from "swr";
import { newBookmark } from "../lib/dbAdmin";

const BmQuickAdd = () => {
  const [inputValue, setInputValue] = useState("");
  const { session, user } = useAuth();

  const fetcher = async (url, token) => {
    const res = await fetch(url, {
      method: "GET",
      headers: new Headers({ "Content-Type": "application/json", token }),
      credentials: "same-origin",
    });

    return res.json();
  };

  const { data, mutate } = useSWR(
    !session ? null : ["/api/usersBookmarks", session.access_token],
    fetcher
  );

  const onSubmit = async (e) => {
    e.preventDefault();
    setInputValue("");

    const bookmark = {
      url: inputValue,
      title: inputValue,
      user_id: user.id,
      temp_id: uuidv4(),
    };

    await mutate(newBookmark(bookmark), {
      optimisticData: [...data, bookmark],
      rollbackOnError: true,
      populateCache: false,
      revalidate: true,
    });
  };

  return (
    <div className="border border-slate-400 rounded-md pl-2">
      <form className="flex items-center" onSubmit={onSubmit}>
        <input
          placeholder="Quick add URL..."
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
        />
        <button type="submit" className="text-md border-l border-slate-400 text-slate-600 px-2">
          Save
        </button>
      </form>
    </div>
  );
};

export default BmQuickAdd;
