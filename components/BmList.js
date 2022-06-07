import BmCard from "./BMCard";

const BmList = ({ bookmarks }) => {
  return (
    <ul className="flex flex-wrap gap-2">
      {bookmarks.map((bookmark) => (
        <BmCard key={bookmark.id} bookmark={bookmark} />
      ))}
    </ul>
  );
};

export default BmList;
