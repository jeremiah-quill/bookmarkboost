import Link from "next/link";

const NewBmCard = () => {
  return (
    <Link href="new-bookmark">
      <a className="transition-all hover:bg-green-300 flex justify-center border-2 border-dashed border-slate-400 text-center rounded-md p-5 items-center min-h-[108px]">
        <button className="font-bold text-3xl">NEW</button>
      </a>
    </Link>
  );
};

export default NewBmCard;
