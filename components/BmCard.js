import { useState, useContext } from "react";
import { supabase } from "../lib/supabase";
import { updateTitle } from "../lib/dbAdmin";
import Link from "next/link";
import useSWR from "swr";
import { mutate } from "swr";
import { useAuth } from "../lib/useAuth";
import { makePublicRouterInstance } from "next/router";

const BmCard = ({ bookmark }) => {
  const [titleInput, setTitleInput] = useState(bookmark.title);
  const { session } = useAuth();

  // const [flash, setFlash] = useState(false);

  const fetcher = async (url, token) => {
    const res = await fetch(url, {
      method: "GET",
      headers: new Headers({ "Content-Type": "application/json", token }),
      credentials: "same-origin",
    });

    return res.json();
  };

  const {
    data: bookmarks,
    error,
    mutate,
  } = useSWR(["/api/usersBookmarks", session.access_token], fetcher);

  const onSubmit = async (e) => {
    e.preventDefault();

    // setFlash("success");
    // setTimeout(() => {
    //   setFlash(false);
    // }, 100);

    updateTitle(titleInput, bookmark.id);
  };

  const handleRemove = async (id) => {
    const removeBookmark = async (id) => {
      const { data, error } = await supabase.from("bookmarks").delete().eq("temp_id", id);
      return data;
    };

    const optimistic = bookmarks.filter((el) => el.temp_id !== bookmark.temp_id);

    await mutate(removeBookmark(bookmark.temp_id), {
      optimisticData: optimistic,
      rollbackOnError: true,
      populateCache: false,
      revalidate: true,
    });
  };

  return (
    // <Link href={`/bookmark/${bookmark.temp_id}`}>
    //   <a>
    <li
      className={`hover:scale-[102%] hover:shadow-md transition-all cursor-pointer p-10 rounded-md bg-white relative flex justify-center items-center border-2 border-transparent`}>
      <div className="flex justify-between w-full p-2 absolute top-0">
        <button onClick={() => handleRemove(bookmark.temp_id)}>
          <img src="./dots.svg" className="w-5" />
        </button>
        <img src="./copy.svg" />
      </div>
      <form onSubmit={onSubmit}>
        <input
          onChange={(e) => setTitleInput(e.target.value)}
          value={titleInput}
          className="text-center bg-transparent"
        />
      </form>
    </li>
    //   </a>
    // </Link>
  );
};

export default BmCard;
