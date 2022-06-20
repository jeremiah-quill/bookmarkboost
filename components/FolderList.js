import useSWR from "swr";

import { useFolder } from "../utils/useFolder";
import { useAuth } from "../lib/useAuth";
import { fetcher } from "../utils/fetcher";
import NewFolderForm from "./NewFolderForm";

const FolderList = () => {
  const { currentFolder, viewFolder } = useFolder();
  const { session } = useAuth();

  const { data: folders } = useSWR(["/api/usersFolders", session.access_token], fetcher);

  // TODO: handle loading
  if (!folders) return "...loading";

  // TODO: refactor so that it doesn't send to a different dashboard page, but instead just renders a new view in the dashboard
  return (
    <nav className="h-full">
      <NewFolderForm currentFolders={folders} />
      <ul className="flex flex-col gap-2 h-full overflow-y-scroll dark:border-[#282828]">
        <li key="" className="hover:bg-gray-300 dark:hover:bg-[#404040] transition-all flex">
          <button
            className={`${
              !currentFolder && "ml-3"
            } w-full text-left px-2 py-1 transition-all text-black dark:text-[#a0a0a0]`}
            onClick={() => viewFolder(null)}>
            View all
          </button>
        </li>

        {!!folders &&
          folders.map((folder) => (
            <li
              key={folder.temp_id}
              className="hover:bg-gray-300 dark:hover:bg-[#404040]  transition-all flex">
              <button
                className={`transition-all px-2 py-1 w-full text-left text-black dark:text-[#a0a0a0] ${
                  currentFolder === folder.temp_id ? "ml-3" : ""
                }`}
                onClick={() => viewFolder(folder.temp_id)}>
                {folder.name}
              </button>
            </li>
          ))}
      </ul>
    </nav>
  );
};

export default FolderList;
