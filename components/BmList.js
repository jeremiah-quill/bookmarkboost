import BmCard from "./BmCard";
import NewBmCard from "./NewBmCard";

const BmList = ({ bookmarks }) => {
  if (bookmarks.length < 1)
    return (
      <ul className="grid sm:grid-cols-4 xl:grid-cols-6 gap-2 p-2">
        <div className="flex flex-col border border-dashed border-black text-center rounded-md p-5">
          <div className="font-bold">No Bookmarks</div>
          <div className="mt-auto">
            <div className="text-xs ">Get started by creating a new bookmark...</div>
            <button className="hover:bg-black hover:text-white transition-all border border-black p-1 px-2 rounded-md mt-2 text-sm">
              + Create
            </button>
          </div>
        </div>
      </ul>
    );
  return (
    <ul className="grid sm:grid-cols-4 xl:grid-cols-6 gap-2 p-2">
      <NewBmCard />
      {bookmarks
        .sort((a, b) => (a.title < b.title ? -1 : 1))
        .map((bookmark) => (
          <BmCard key={bookmark.temp_id} bookmark={bookmark} />
        ))}
    </ul>
  );
};

export default BmList;
