import Link from "next/link";

const NewBmCard = () => {
  return (
    <div
      key="add-card"
      className="flex justify-center border border-dashed border-black text-center rounded-md p-5 items-center">
      <Link href="new-bookmark">
        <a>
          <button className="hover:bg-black hover:text-white transition-all border border-black p-1 px-2 rounded-md text-sm">
            + Create
          </button>
        </a>
      </Link>
    </div>
  );
};

export default NewBmCard;
