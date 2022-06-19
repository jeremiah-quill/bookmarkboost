import Header from "./Header";
import FolderList from "./FolderList";

const DashboardShell = ({ children }) => {
  return (
    <>
      <Header />
      <div className="h-full grid grid-cols-12 bg-[#fafafa] dark:bg-[#1c1c1c] dark:border-[#282828]">
        <div className="lg:col-span-2 md:col-span-3 col-span-4 border-r border-slate-200 dark:border-[#282828] h-full overflow-y-scroll">
          <FolderList />
        </div>
        <div className="lg:col-span-10 md:col-span-9 col-span-8 h-full overflow-y-scroll">
          {children}
        </div>
      </div>
    </>
  );
};

export default DashboardShell;
