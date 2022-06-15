import { useState } from "react";
import Link from "next/link";
import useSWR from "swr";

import { useToast } from "../utils/useToast";
import { supabase } from "../lib/supabase";
import { useAuth } from "../lib/useAuth";

import { AiTwotoneDelete } from "react-icons/ai";
import { IoIosArrowForward } from "react-icons/io";
import { TbCopy } from "react-icons/tb";
import { IoIosOptions } from "react-icons/io";

const BmCard = ({ bookmark }) => {
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [move, setMove] = useState(false);

  const { session } = useAuth();

  const { showToast } = useToast();

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
    showToast("success", 3000, "Copied to clipboard");
    navigator.clipboard.writeText(bookmark.url);
  };

  // TODO: figure out how to use anchor inside of anchor (outside anchor to bookmark URL, inside anchor to bookmarkId page)
  return !deleteConfirm ? (
    <a
      target="_blank"
      className=" relative border border-slate-200 rounded-md overflow-hidden"
      href={`https://www.${bookmark.url}.com`}>
      <li
        onMouseOver={() => setMove(true)}
        onMouseOut={() => setMove(false)}
        className={`h-[108px] transition-all cursor-pointer p-4 flex flex-col bg-white relative hover:bg-gray-300`}>
        <div className="flex justify-between items-center">
          <h2 className="text-2xl">{bookmark.title}</h2>
          <IoIosArrowForward
            size="1rem"
            className={`transition-all relative ${move && "translate-x-[5px]"}`}
          />
        </div>
        <div className="flex gap-2 items-middle mt-auto">
          <button onClick={(e) => showDeleteConfirm(e)}>
            <AiTwotoneDelete
              className="transition-all hover:scale-[110%]"
              color="red"
              size={"1.25rem"}
              style={{ verticalAlign: "middle" }}
            />
          </button>
          <Link onClick={(e) => e.preventDefault()} href={`/bookmark/${bookmark.temp_id}`}>
            <a className="block">
              <IoIosOptions
                className="transition-all hover:scale-[110%]"
                size="1.25rem"
                style={{ verticalAlign: "middle" }}
              />
            </a>
          </Link>{" "}
          <button onClick={(e) => copyURL(e)}>
            <TbCopy
              className="transition-all hover:scale-[110%]"
              size="1.25rem"
              style={{ verticalAlign: "middle" }}
            />
          </button>
        </div>
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
