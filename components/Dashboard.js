import { useState, useEffect } from "react";

const Dashboard = ({ bookmarks }) => {
  console.log(bookmarks);
  return (
    <div>
      {bookmarks.length < 1 ? (
        <div className="border border-dashed border-black text-center w-44 aspect-square rounded-md">
          <div>No Bookmarks</div>
          <div>Get started by creating a new bookmark...</div>
          <button>+ New</button>
        </div>
      ) : (
        <ul className="flex flex-wrap gap-2">
          {bookmarks.map((bookmark) => (
            <li className="p-3 w-44 aspect-square rounded-md bg-white shadow-md" key={bookmark.url}>
              <a href={bookmark.url} target="_blank">
                {bookmark.title}
              </a>
              <p>{bookmark.notes}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dashboard;
