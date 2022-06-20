const FolderListLoader = () => {
  // return <nav className="bg-gray-300 animate-pulse h-full w-full">

  // </nav>;
  return (
    <nav className="h-full">
      <form className="flex bg-white border-b dark:bg-[#232323] border-slate-200 dark:border-[#282828] dark:text-[#ededed]">
        <input
          className="w-full px-2 py-1 border-r border-slate-200 dark:border-[#282828] dark:text-[#ededed] dark:bg-[#232323]"
          // type="text"
          placeholder="add folder..."
        />
        <button type="submit" className="px-2 py-1">
          Save
        </button>
      </form>
      {/* <input disabled="true" className="h-[32px] w-full bg-white" /> */}
      <ul className="flex flex-col gap-2 h-full overflow-y-scroll dark:border-[#282828]">
        <li className="hover:bg-gray-300 dark:hover:bg-[#404040]  transition-all flex h-[32px] w-2/3 px-2 py-1">
          <div className="transition-all px-2 py-1 w-full text-left dark:text-[#a0a0a0] bg-gray-300 animate-pulse rounded-md"></div>
        </li>
        <li className="hover:bg-gray-300 dark:hover:bg-[#404040]  transition-all flex h-[32px] w-2/3 px-2 py-1">
          <div className="transition-all px-2 py-1 w-full text-left dark:text-[#a0a0a0] bg-gray-300 animate-pulse rounded-md"></div>
        </li>
        <li className="hover:bg-gray-300 dark:hover:bg-[#404040]  transition-all flex h-[32px] w-2/3 px-2 py-1">
          <div className="transition-all px-2 py-1 w-full text-left dark:text-[#a0a0a0] bg-gray-300 animate-pulse rounded-md"></div>
        </li>
        <li className="hover:bg-gray-300 dark:hover:bg-[#404040]  transition-all flex h-[32px] w-2/3 px-2 py-1">
          <div className="transition-all px-2 py-1 w-full text-left dark:text-[#a0a0a0] bg-gray-300 animate-pulse rounded-md"></div>
        </li>
        <li className="hover:bg-gray-300 dark:hover:bg-[#404040]  transition-all flex h-[32px] w-2/3 px-2 py-1">
          <div className="transition-all px-2 py-1 w-full text-left dark:text-[#a0a0a0] bg-gray-300 animate-pulse rounded-md"></div>
        </li>
        <li className="hover:bg-gray-300 dark:hover:bg-[#404040]  transition-all flex h-[32px] w-2/3 px-2 py-1">
          <div className="transition-all px-2 py-1 w-full text-left dark:text-[#a0a0a0] bg-gray-300 animate-pulse rounded-md"></div>
        </li>
        <li className="hover:bg-gray-300 dark:hover:bg-[#404040]  transition-all flex h-[32px] w-2/3 px-2 py-1">
          <div className="transition-all px-2 py-1 w-full text-left dark:text-[#a0a0a0] bg-gray-300 animate-pulse rounded-md"></div>
        </li>
        <li className="hover:bg-gray-300 dark:hover:bg-[#404040]  transition-all flex h-[32px] w-2/3 px-2 py-1">
          <div className="transition-all px-2 py-1 w-full text-left dark:text-[#a0a0a0] bg-gray-300 animate-pulse rounded-md"></div>
        </li>
        <li className="hover:bg-gray-300 dark:hover:bg-[#404040]  transition-all flex h-[32px] w-2/3 px-2 py-1">
          <div className="transition-all px-2 py-1 w-full text-left dark:text-[#a0a0a0] bg-gray-300 animate-pulse rounded-md"></div>
        </li>
        <li className="hover:bg-gray-300 dark:hover:bg-[#404040]  transition-all flex h-[32px] w-2/3 px-2 py-1">
          <div className="transition-all px-2 py-1 w-full text-left dark:text-[#a0a0a0] bg-gray-300 animate-pulse rounded-md"></div>
        </li>
      </ul>
    </nav>
  );
};

export default FolderListLoader;
