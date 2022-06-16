import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import useSWR from "swr";

import { useAuth } from "../lib/useAuth";
import { newBookmark } from "../lib/dbAdmin";

const BmQuickAdd = ({ folderId, updateBmUi }) => {
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
      folder_id: folderId,
      url: inputValue,
      title: inputValue,
      user_id: user.id,
      temp_id: uuidv4(),
    };

    updateBmUi(bookmark);

    await mutate(newBookmark(bookmark), {
      optimisticData: [...data, bookmark],
      rollbackOnError: true,
      populateCache: false,
      revalidate: true,
    });
  };

  return (
    <div className="border border-slate-200 rounded-md pl-2 overflow-hidden">
      <form className="flex items-center" onSubmit={onSubmit}>
        <input
          placeholder="Quick add URL..."
          className=""
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
        />
        <button
          type="submit"
          className="text-md border-l border-slate-200 text-gray-900 px-2 bg-white hover:bg-gray-300">
          Save
        </button>
      </form>
    </div>
  );
};

export default BmQuickAdd;
