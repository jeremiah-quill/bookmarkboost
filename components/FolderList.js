import useSWR from "swr";
import Link from "next/link";

import { useAuth } from "../lib/useAuth";
import FolderListLoader from "./FolderListLoader";

import NewFolderForm from "./NewFolderForm";

const FolderList = () => {
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

  return (
    <nav className="h-full">
      <NewFolderForm mutate={mutate} currentFolders={folders} />
      <ul className="flex flex-col gap-2 h-full overflow-y-scroll">
        {!!folders &&
          folders.map((folder) => (
            <Link key={folder.id} href={`/dashboard/${folder.name}`}>
              <a className="hover:bg-gray-300 transition-all px-2 py-1">
                <li>{folder.name}</li>
              </a>
            </Link>
          ))}
      </ul>
    </nav>
  );
};

export default FolderList;
