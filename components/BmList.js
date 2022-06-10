import { useContext } from "react";
import { supabase } from "../lib/supabase";
import { BookmarkContext } from "../utils/store";
import BmCard from "./BMCard";

const BmList = ({ bookmarks }) => {
  if (bookmarks.length < 1)
    return (
      <div className="flex flex-col border border-dashed border-black text-center w-44 aspect-square rounded-md p-4 m-auto">
        <div className="font-bold">No Bookmarks</div>
        <div className="mt-auto">
          <div className="text-xs ">Get started by creating a new bookmark...</div>
          <button className="hover:bg-black hover:text-white transition-all border border-black p-1 px-2 rounded-md mt-2 text-sm">
            + Create
          </button>
        </div>
      </div>
    );
  return (
    <ul className="grid sm:grid-cols-4 xl:grid-cols-6">
      {bookmarks
        .sort((a, b) => (a.title < b.title ? -1 : 1))
        .map((bookmark) => (
          <BmCard key={bookmark.temp_id} bookmark={bookmark} />
        ))}
    </ul>
  );
};

export default BmList;
