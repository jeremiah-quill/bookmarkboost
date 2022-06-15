import { useState } from "react";
import { supabase } from "../lib/supabase";
import Link from "next/link";
import useSWR from "swr";
import { useAuth } from "../lib/useAuth";
import { BsFillGearFill } from "react-icons/bs";
import { TiArrowBack } from "react-icons/ti";
import { AiTwotoneDelete } from "react-icons/ai";
import { GrConfigure } from "react-icons/gr";
import Toast from "./Toast";
import { useToast } from "../utils/useToast";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

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
    <a target="_blank" href={`https://www.${bookmark.url}.com`}>
      <li
        onMouseOver={() => setMove(true)}
        onMouseOut={() => setMove(false)}
        className={`h-[108px] transition-all cursor-pointer p-4 rounded-md flex flex-col bg-white relative border border-transparent border-slate-200 hover:bg-gray-300`}>
        <div className="flex justify-between">
          <h2 className="">{bookmark.title}</h2>
          <MdOutlineKeyboardArrowRight
            size="1.5rem"
            className={`transition-all relative ${move && "translate-x-[5px]"}`}
          />
        </div>
        <div className="flex gap-2 items-start mt-auto">
          <button onClick={(e) => showDeleteConfirm(e)}>
            <AiTwotoneDelete
              className="transition-all hover:scale-[110%]"
              color="red"
              size={"1.2rem"}
              style={{ verticalAlign: "middle" }}
            />
          </button>
          <Link onClick={(e) => e.preventDefault()} href={`/bookmark/${bookmark.temp_id}`}>
            <a className="block">
              <BsFillGearFill
                className="transition-all hover:scale-[110%] relative top-[1px]"
                size="1.08rem"
                style={{ verticalAlign: "middle" }}
              />
            </a>
          </Link>{" "}
          <button onClick={(e) => copyURL(e)}>
            <img
              src="./copy.svg"
              className="transition-all hover:scale-[110%] relative top-[2px] w-[13px]"
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
