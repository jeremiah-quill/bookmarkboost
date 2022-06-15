import { IoIosArrowForward } from "react-icons/io";

const DashboardLoader = () => {
  let cards = [];
  for (let i = 0; i < 24; i++) {
    cards.push(
      <li
        key={i}
        className={`h-[108px] transition-all cursor-pointer p-4 rounded-md flex flex-col bg-white relative border border-slate-200 `}>
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
      <ul className="p-2 grid lg:grid-cols-3 xl:grid-cols-4 gap-2 flex-1 auto-rows-min	">{cards}</ul>
    </>
  );
};

export default DashboardLoader;
