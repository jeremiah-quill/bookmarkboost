import BmCard from "./BmCard";
import NewBmCard from "./NewBmCard";

const BmList = ({ bookmarks, removeFromUi = null }) => {
  return (
    <ul className="grid lg:grid-cols-3 xl:grid-cols-4 gap-2 p-2 auto-rows-min">
      <NewBmCard />
      {bookmarks
        .sort((a, b) => (a.title < b.title ? -1 : 1))
        .map((bookmark) => (
          <BmCard key={bookmark.temp_id} bookmark={bookmark} removeFromUi={removeFromUi} />
        ))}
    </ul>
  );
};

export default BmList;
