import { useEffect, useState } from "react";
import BmCard from "./BmCard";
import NewBmCard from "./NewBmCard";

const BmList = ({ bookmarks, currentFolder }) => {
  const [filteredBookmarks, setFilteredBookmarks] = useState(bookmarks);

  useEffect(() => {
    if (currentFolder) {
      setFilteredBookmarks(bookmarks.filter((bm) => bm.folder_id === currentFolder));
    } else {
      setFilteredBookmarks(bookmarks);
    }
  }, [currentFolder, bookmarks]);

  return (
    <ul className="grid lg:grid-cols-3 xl:grid-cols-4 gap-2 p-2 auto-rows-min">
      <NewBmCard />
      {filteredBookmarks
        .sort((a, b) => (a.title < b.title ? -1 : 1))
        .map((bookmark) => (
          <BmCard key={bookmark.temp_id} bookmark={bookmark} />
        ))}
    </ul>
  );
};

export default BmList;
