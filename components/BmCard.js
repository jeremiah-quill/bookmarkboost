import { useState, useContext } from "react";
import { supabase } from "../lib/supabase";
import { updateTitle } from "../lib/dbAdmin";
import Link from "next/link";

const BmCard = ({ bookmark }) => {
  const [titleInput, setTitleInput] = useState(bookmark.title);
  const [flash, setFlash] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();

    setFlash("success");
    setTimeout(() => {
      setFlash(false);
    }, 200);

    updateTitle(titleInput, bookmark.id);
  };

  return (
    <Link href={`/bookmark/${bookmark.temp_id}`}>
      <a className="">
        <li
          className={` hover:bg-orange-200 hover:scale-[102%] transition-all cursor-pointer p-10 rounded-md bg-white shadow-md relative flex justify-center items-center border-2 border-transparent ${
            flash ? "bg-green-300" : ""
          }`}>
          <div className="flex justify-between w-full p-2 absolute top-0">
            <img src="./dots.svg" className="w-5" />
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
      </a>
    </Link>
  );
};

export default BmCard;
