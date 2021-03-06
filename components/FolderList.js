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
      <ul className="flex flex-col gap-1 p-2 h-full overflow-y-scroll dark:border-[#282828]">
        <li
          key=""
          className={`${
            !currentFolder && "bg-[#404040]"
          } px-2 rounded-md dark:text-[#e5e5e5] dark:hover:bg-[#404040] text-2xl transition-all flex`}>
          <button
            className={`w-full text-left transition-all text-black dark:text-[#e5e5e5] text-2xl`}
            onClick={() => viewFolder(null)}>
            View all
          </button>
        </li>

        {!!folders &&
          folders.map((folder) => (
            <li
              key={folder.temp_id}
              className={`${
                currentFolder === folder.temp_id && "bg-[#404040]"
              } px-2  rounded-md dark:text-[#e5e5e5] dark:hover:bg-[#404040] text-2xl transition-all flex`}>
              <button
                className={`w-full text-left transition-all text-black dark:text-[#e5e5e5] text-2xl`}
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
