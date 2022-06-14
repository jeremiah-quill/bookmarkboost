import { useState } from "react";
import { supabase } from "../lib/supabase";
import Link from "next/link";
import useSWR from "swr";
import { useAuth } from "../lib/useAuth";
import { BsFillGearFill } from "react-icons/bs";
import { TiArrowBack } from "react-icons/ti";
import { AiTwotoneDelete } from "react-icons/ai";
import { GrConfigure } from "react-icons/gr";

const BmCard = ({ bookmark }) => {
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const { session } = useAuth();

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

  const showDeleteConfirm = (e) => {
    e.preventDefault();
    setDeleteConfirm(true);
  };
  const copyURL = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(bookmark.url);
  };

  // TODO: figure out how to use anchor inside of anchor (outside anchor to bookmark URL, inside anchor to bookmarkId page)
  return !deleteConfirm ? (
    <a target="_blank" href={`https://www.${bookmark.url}.com`}>
      <li
        className={`h-[108px] transition-all cursor-pointer p-10 rounded-md bg-white hover:border-green-400 relative flex justify-center items-center border-2 border-transparent`}>
        <div className="flex justify-between w-full p-2 absolute top-0">
          <div className="flex items-center gap-2">
            <button onClick={(e) => showDeleteConfirm(e)}>
              <AiTwotoneDelete color="red" size={"1.5rem"} />
            </button>
            <Link onClick={(e) => e.preventDefault()} href={`/bookmark/${bookmark.temp_id}`}>
              <a className="block">
                <BsFillGearFill size="1.25rem" />
              </a>
            </Link>
          </div>
          <button onClick={(e) => copyURL(e)}>
            <img src="./copy.svg" />
          </button>
        </div>
        <h2>{bookmark.title}</h2>
      </li>
    </a>
  ) : (
    <li
      className={`h-[108px] transition-all cursor-pointer rounded-md relative flex overflow-hidden`}>
      <button className="bg-gray-300 flex-1" onClick={() => setDeleteConfirm(false)}>
        Cancel
      </button>
      <button className="bg-red-300 flex-1" onClick={() => handleRemove(bookmark.temp_id)}>
        Confirm
      </button>
    </li>
  );
};

export default BmCard;
