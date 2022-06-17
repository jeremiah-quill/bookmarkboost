import Header from "./Header";
import FolderList from "./FolderList";

const DashboardShell = ({ updateBmUi = null, viewFolder, children }) => {
  return (
    <>
      <Header updateBmUi={updateBmUi} />
      <div className="h-full grid grid-cols-12 bg-[rgb(250 250 250)]">
        <div className="lg:col-span-2 md:col-span-3 col-span-4 border-r border-slate-200 h-full overflow-y-scroll">
          <FolderList viewFolder={viewFolder} />
        </div>
        <div className="lg:col-span-10 md:col-span-9 col-span-8 h-full overflow-y-scroll">
          {children}
        </div>
      </div>
    </>
  );
};

export default DashboardShell;
