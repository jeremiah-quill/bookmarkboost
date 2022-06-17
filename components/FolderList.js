import NewFolderForm from "./NewFolderForm";

const FolderList = ({ viewFolder, currentFolder, folders }) => {
  // TODO: refactor so that it doesn't send to a different dashboard page, but instead just renders a new view in the dashboard
  return (
    <nav className="h-full">
      <NewFolderForm currentFolders={folders} />
      <ul className="flex flex-col gap-2 h-full overflow-y-scroll">
        <li key="" className="hover:bg-gray-300 transition-all flex">
          <button
            className={`${!currentFolder && "ml-3"} w-full text-left px-2 py-1 transition-all`}
            onClick={() => viewFolder(null)}>
            View all
          </button>
        </li>

        {!!folders &&
          folders.map((folder) => (
            <li key={folder.id} className="hover:bg-gray-300 transition-all flex">
              <button
                className={`transition-all px-2 py-1 w-full text-left ${
                  currentFolder === folder.id ? "ml-3" : ""
                }`}
                onClick={() => viewFolder(folder.id)}>
                {folder.name}
              </button>
            </li>
          ))}
      </ul>
    </nav>
  );
};

export default FolderList;
