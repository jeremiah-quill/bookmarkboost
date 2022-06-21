import { useState } from "react";
import Link from "next/link";
import { mutate } from "swr";

import { useToast } from "../utils/useToast";
import { useAuth } from "../lib/useAuth";
import { removeBookmark } from "../lib/dbAdmin";

import { AiTwotoneDelete } from "react-icons/ai";
import { IoIosArrowForward } from "react-icons/io";
import { TbCopy } from "react-icons/tb";
import { IoIosOptions } from "react-icons/io";

const BmCard = ({ bookmark }) => {
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [move, setMove] = useState(false);
  const { session } = useAuth();
  const { showToast } = useToast();

  const handleRemove = async (tempId) => {
    // * 1. Optimistic UI update with no revalidate
    mutate(
      ["/api/usersBookmarks", session.access_token],
      (bookmarks) => bookmarks.filter((bm) => bm.temp_id !== tempId),
      false
    );
    // * 2. Update DB
    await removeBookmark(tempId);
    // * 3. Revalidate
    mutate(["/api/usersBookmarks", session.access_token]);
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
    <div
      onMouseOver={() => setMove(true)}
      onMouseOut={() => setMove(false)}
      className="border border-slate-200 dark:border-[#282828] rounded-md overflow-hidden h-[108px] transition-all cursor-pointer p-4  bg-white dark:bg-[#232323] dark:hover:bg-[#404040] relative">
      <a
        target="_blank"
        href={`https://www.${bookmark.url}.com`}
        className="absolute left-0 right-0 top-0 bottom-0"
      />
      <li className={`flex flex-col h-full`}>
        <div className="flex justify-between items-center">
          <h2 className="text-2xl text-black dark:text-[#e5e5e5]">{bookmark.title}</h2>
          <IoIosArrowForward
            size="1rem"
            className={`transition-all text-black dark:text-[#e5e5e5] relative z-50 ${
              move && "translate-x-[5px]"
            }`}
          />
        </div>
        <div className="flex gap-2 items-middle mt-auto">
          <button onClick={(e) => showDeleteConfirm(e)}>
            <AiTwotoneDelete
              className="transition-all hover:scale-[110%] z-50 relative"
              color="red"
              size={"1.25rem"}
              style={{ verticalAlign: "middle" }}
            />
          </button>
          <Link onClick={(e) => e.preventDefault()} href={`/bookmark/${bookmark.temp_id}`}>
            <a className="block">
              <IoIosOptions
                className="transition-all z-50 relative hover:scale-[110%] text-black dark:text-[#ededed]"
                size="1.25rem"
                style={{ verticalAlign: "middle" }}
              />
            </a>
          </Link>{" "}
          <button onClick={(e) => copyURL(e)}>
            <TbCopy
              className="transition-all relative z-50 hover:scale-[110%] text-black dark:text-[#ededed]"
              size="1.25rem"
              style={{ verticalAlign: "middle" }}
            />
          </button>
        </div>
      </li>
      {/* </a> */}
    </div>
  ) : (
    <div className="border border-slate-200 dark:border-[#282828] rounded-md overflow-hidden h-[108px] transition-all cursor-pointer bg-white relative hover:bg-gray-300">
      <li
        className={`h-full transition-all cursor-pointer rounded-md relative flex overflow-hidden`}>
        <button className="bg-gray-300 flex-1" onClick={() => setDeleteConfirm(false)}>
          Cancel
        </button>
        <button className="bg-red-300 flex-1" onClick={() => handleRemove(bookmark.temp_id)}>
          Confirm
        </button>
      </li>
    </div>
  );
};

export default BmCard;
