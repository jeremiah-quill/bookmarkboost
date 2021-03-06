import HeaderLoader from "./HeaderLoader";
import FolderListLoader from "./FolderListLoader";

const LoaderShell = ({ children }) => {
  return (
    <>
      <HeaderLoader />
      <div className="h-full grid grid-cols-12 bg-[rgb(250 250 250)] dark:bg-[#1c1c1c] dark:border-[#282828]">
        <div className="lg:col-span-2 md:col-span-3 col-span-4 border-r border-slate-200 h-full overflow-y-scroll dark:bg-[#1c1c1c] dark:border-[#282828]">
          <FolderListLoader />
        </div>
        <div className="lg:col-span-10 md:col-span-9 col-span-8 h-full overflow-y-scroll">
          {children}
        </div>
      </div>
    </>
  );
};

export default LoaderShell;
