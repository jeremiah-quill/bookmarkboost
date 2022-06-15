import { IoIosArrowForward } from "react-icons/io";

import Header from "./Header";
import FolderList from "./FolderList";

const DashboardLoader = () => {
  let cards = [];
  for (let i = 0; i < 24; i++) {
    cards.push(
      <li
        key={i}
        className={`h-[108px] transition-all cursor-pointer p-4 rounded-md flex flex-col bg-white relative border border-transparent border-slate-200 hover:bg-gray-300`}>
        <div className="flex justify-between items-center">
          <h2 className="h-[32px] w-[50px] bg-gray-300 rounded-md animate-pulse" />
          <IoIosArrowForward size="1rem" className={`transition-all relative`} />
        </div>
        <div className="flex gap-2 items-middle mt-auto">
          <div className="h-[20px] w-[80px] bg-gray-300 rounded-md animate-pulse" />
        </div>
      </li>
    );
  }
  return (
    <>
      <div className="h-full">
        <Header />
        <div className="h-full grid grid-cols-12 bg-[rgb(250 250 250)]">
          <div className="lg:col-span-2 md:col-span-3 col-span-4 border-r border-slate-200 p-2">
            <FolderList />
          </div>
          <div className="lg:col-span-10 md:col-span-9 col-span-8">
            <ul className="p-2 grid lg:grid-cols-3 xl:grid-cols-4 gap-2 flex-1 auto-rows-min	">
              {cards}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardLoader;
