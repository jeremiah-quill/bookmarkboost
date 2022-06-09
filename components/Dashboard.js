import { useContext } from "react";
import { BookmarkContext } from "../utils/store";
import BmCard from "./BmCard";

const Dashboard = () => {
  const bookmarks = useContext(BookmarkContext);

  const BmList = () => {
    return (
      <ul className="flex flex-wrap gap-2 justify-start">
        {bookmarks.map((bookmark) => (
          <BmCard key={bookmark.id} bookmark={bookmark} />
        ))}
      </ul>
    );
  };

  const SkeletonBm = () => {
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
  };

  return (
    <div className="pt-[83px] relative h-full">
      <div className="absolute top-[83px] pl-10 py-5 w-full bg-slate-300 font-bold z-10">
        Jeremiah / ALL
      </div>
      <div className="p-20 bg-slate-200 h-full overflow-y-scroll">
        {bookmarks ? <BmList /> : <SkeletonBm />}
      </div>
    </div>
  );
};

export default Dashboard;
