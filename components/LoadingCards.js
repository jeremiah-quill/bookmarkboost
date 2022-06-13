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
      <nav className="bg-white flex fixed top-0 w-full p-5 items-center z-10">
        {/* <Link href="/">
          <a> */}
        <img src="/bb_svg.svg" alt="logo" />
        {/* </a>
        </Link> */}
        <Link className="" href="/dashboard">
          <a className="mx-5">Dashboard</a>
        </Link>
        <BmQuickAdd />
        <div className="ml-auto">
          <div className="flex gap-2 items-center">
            {/* <h2 className="text-xs h-[16px]">{user.email}</h2> */}
            <h2 className="text-xs h-[16px] w-[150px] bg-gray-300 animate-pulse rounded-md" />
            <button
              className="bg-slate-800 rounded-md py-1 px-2 text-white"
              // onClick={handleSignOut}
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
      <ul className="grid sm:grid-cols-4 xl:grid-cols-6 gap-2 p-2">{cards}</ul>
    </>
  );
};

export default LoadingCards;
