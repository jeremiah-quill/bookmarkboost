import { IoIosArrowForward } from "react-icons/io";

const DashboardLoader = () => {
  let cards = [];
  for (let i = 0; i < 24; i++) {
    cards.push(
      <div
        key={i}
        className="border border-slate-200 rounded-md overflow-hidden h-[108px] transition-all cursor-pointer p-4  bg-white relative dark:bg-[#232323] dark:border-[#282828]">
        <li className={`flex flex-col h-full`}>
          <div className="flex justify-between items-center">
            <h2 className="h-[20px] w-[50px] bg-gray-300 rounded-md animate-pulse" />
            <IoIosArrowForward
              size="1rem"
              className={`transition-all relative dark:text-[#ededed]`}
            />
          </div>
          <div className="flex gap-2 items-middle mt-auto">
            <div className="h-[20px] w-[80px] bg-gray-300 rounded-md animate-pulse" />
          </div>
        </li>
      </div>
    );
  }
  return (
    <>
      <ul className="p-2 grid lg:grid-cols-3 xl:grid-cols-4 gap-2 flex-1 auto-rows-min">{cards}</ul>
    </>
  );
};

export default DashboardLoader;
