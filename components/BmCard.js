import { useState, useContext } from "react";
import { supabase } from "../lib/supabase";
import { BookmarkContext, DispatchBookmarkContext } from "../utils/store";

const BmCard = ({ bookmark }) => {
  const [titleInput, setTitleInput] = useState(bookmark.title);
  const [flash, setFlash] = useState(false);

  const dispatchBookmarks = useContext(DispatchBookmarkContext);

  const onSubmit = async (e) => {
    e.preventDefault();

    setFlash("success");
    setTimeout(() => {
      setFlash(false);
    }, 200);

    const { data, error } = await supabase
      .from("bookmarks")
      .update({ title: titleInput })
      .eq("id", bookmark.id)
      .single();

    if (error) {
      console.log(error.message);
      return error;
    }

    // dispatchBookmarks({ type: "UPDATE_TITLE", id: data.id, updatedTitle: data.title });
  };

  return (
    <li
      className={`hover:bg-orange-200 hover:scale-[102%] transition-all cursor-pointer p-3 w-44 aspect-square rounded-md bg-white shadow-md relative flex justify-center items-center ${
        flash ? "bg-green-300" : ""
      }`}
      key={bookmark.url}>
      <div className="flex justify-between w-full p-2 absolute top-0">
        <img src="./dots.svg" className="w-5" />
        <img src="./copy.svg" />
      </div>
      {/* <a href={bookmark.url} target="_blank"> */}
      <form onSubmit={onSubmit}>
        <input
          onChange={(e) => setTitleInput(e.target.value)}
          value={titleInput}
          className="text-center bg-transparent"
        />
      </form>
      {/* </a> */}
    </li>
  );
};

export default BmCard;
