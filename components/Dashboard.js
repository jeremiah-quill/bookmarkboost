import { useState, useEffect } from "react";
import BmList from "./BmList";

const Dashboard = ({ bookmarks }) => {
  return (
    <div className="pt-[83px] relative h-full">
      <div className="absolute top-[90px] left-10">Jeremiah / ALL</div>
      <div className="p-20 bg-slate-200 h-full">
        {bookmarks.length < 1 ? (
          <div className="flex flex-col border border-dashed border-black text-center w-44 aspect-square rounded-md p-4">
            <div className="font-bold">No Bookmarks</div>
            <div className="mt-auto">
              <div className="text-xs ">Get started by creating a new bookmark...</div>
              <button className="hover:bg-black hover:text-white transition-all border border-black p-1 px-2 rounded-md mt-2 text-sm">
                + Create
              </button>
            </div>
          </div>
        ) : (
          <BmList bookmarks={bookmarks} />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
