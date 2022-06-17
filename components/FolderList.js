import useSWR from "swr";
import Link from "next/link";

import { useAuth } from "../lib/useAuth";
import FolderListLoader from "./FolderListLoader";

import NewFolderForm from "./NewFolderForm";

const FolderList = ({ viewFolder }) => {
  const { user, session } = useAuth();

  const fetcher = async (url, token) => {
    const res = await fetch(url, {
      method: "GET",
      headers: new Headers({ "Content-Type": "application/json", token }),
      credentials: "same-origin",
    });
    return res.json();
  };

  const { data: folders, mutate } = useSWR(["/api/usersFolders", session.access_token], fetcher);

  if (!folders) {
    return <FolderListLoader />;
  }

  // TODO: refactor so that it doesn't send to a different dashboard page, but instead just renders a new view in the dashboard
  return (
    <nav className="h-full">
      <NewFolderForm mutate={mutate} currentFolders={folders} />
      <ul className="flex flex-col gap-2 h-full overflow-y-scroll">
        <li key="" className="hover:bg-red-300 transition-all px-2 py-1">
          <button onClick={() => viewFolder(null)}>View all</button>
        </li>

        {!!folders &&
          folders.map((folder) => (
            <li key={folder.id} className="hover:bg-red-300 transition-all px-2 py-1">
              <button onClick={() => viewFolder(folder.id)}>{folder.name}</button>
            </li>
          ))}
      </ul>
    </nav>
  );
};

export default FolderList;
