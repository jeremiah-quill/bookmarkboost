import { useState } from "react";

const BmCard = ({ bookmark }) => {
  const [titleInput, setTitleInput] = useState(bookmark.title);

  return (
    <li
      className="hover:bg-orange-200 hover:scale-[102%] transition-all cursor-pointer p-3 w-44 aspect-square rounded-md bg-white shadow-md relative flex justify-center items-center"
      key={bookmark.url}>
      <div className="flex justify-between w-full p-2 absolute top-0">
        <img src="./dots.svg" className="w-5" />
        <img src="./copy.svg" />
      </div>
      {/* <a href={bookmark.url} target="_blank"> */}
      <input
        onChange={(e) => setTitleInput(e.target.value)}
        value={titleInput}
        className="text-center bg-transparent"
      />
      {/* </a> */}
    </li>
  );
};

export default BmCard;
