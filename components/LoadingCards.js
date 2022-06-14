import Link from "next/link";
import BmQuickAdd from "./BmQuickAdd";

const LoadingCards = () => {
  let cards = [];
  for (let i = 0; i < 24; i++) {
    cards.push(
      <li
        key={i}
        className={`animate-pulse cursor-pointer p-10 rounded-md border-2 border-gray-400 shadow-md relative flex justify-center items-center
          }`}>
        <div className="flex justify-between w-full p-2 absolute top-0"></div>
        <div className="bg-gray-300 h-[24px] w-full rounded-md" />
      </li>
    );
  }
  return (
    <>
      <nav className="bg-white flex fixed top-0 w-full px-5 py-2 items-center z-10">
        <img src="/bb_svg.svg" alt="logo" />
        <div className="mx-5 bg-gray-300 animate-pulse rounded-md h-[24px] w-[80px]" />
        <div className="bg-gray-300 animate-pulse h-[30px] w-[215px] rounded-md" />
        <div className="ml-auto">
          <div className="flex gap-2 items-center">
            <h2 className="text-xs h-[16px] w-[150px] bg-gray-300 animate-pulse rounded-md" />
            <button className="bg-slate-800 rounded-md py-1 px-2 text-white">Logout</button>
          </div>
        </div>
      </nav>
      <ul className="grid sm:grid-cols-4 xl:grid-cols-6 gap-2 p-2">{cards}</ul>
    </>
  );
};

export default LoadingCards;
