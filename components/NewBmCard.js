import Link from "next/link";

const NewBmCard = () => {
  return (
    <Link href="new-bookmark">
      <a className="transition-all hover:bg-green-500 flex justify-center border border-slate-200 text-center rounded-md p-5 items-center min-h-[108px]">
        <button className="font-bold text-3xl text-zinc-800">add</button>
      </a>
    </Link>
  );
};

export default NewBmCard;
