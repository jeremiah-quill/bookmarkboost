const HeaderLoader = () => {
  return (
    <header className="grid grid-cols-12 auto-cols-min fixed top-0 w-full border-b border-slate-200 z-50 bg-[rgb(250 250 250)] dark:bg-[#1c1c1c] dark:border-[#282828]">
      <div className="lg:col-span-2 md:col-span-3 col-span-4">
        <h1 className="p-2 font-bold text-2xl border-r border-slate-200 dark:border-[#282828] dark:text-[#ededed]">
          {" "}
          Bookmark Boost
        </h1>
      </div>
      <div className="lg:col-span-10 md:col-span-9 col-span-8 p-2 flex">
        <div className="flex items-center w-full justify-between">
          <div className="h-[20px] w-[250px] bg-gray-300 animate-pulse rounded-md" />
          <div className="relative">
            <img className="rounded-full bg-gray-400 animate-pulse w-7 h-7" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderLoader;
