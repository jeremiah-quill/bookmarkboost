import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import useSWR, { mutate } from "swr";

import { fetcher } from "../utils/fetcher";
import { useAuth } from "../lib/useAuth";
import { newBookmark } from "../lib/dbAdmin";
import { useFolder } from "../utils/useFolder";

const BmQuickAdd = () => {
  const [inputValue, setInputValue] = useState("");
  const [folderInput, setFolderInput] = useState("");
  const { session, user } = useAuth();
  const { currentFolder } = useFolder();
  const { data: folders } = useSWR(["/api/usersFolders", session.access_token], fetcher);

  // TODO: handle loading
  if (!folders) return "loading...";

  useEffect(() => {
    if (!currentFolder) {
      setFolderInput("");
    } else {
      setFolderInput(currentFolder);
    }
  }, [currentFolder]);

  const onSubmit = async (e) => {
    e.preventDefault();
    const bookmark = {
      folder_id: folderInput === "" ? null : folderInput,
      url: inputValue,
      title: inputValue,
      user_id: user.id,
      temp_id: uuidv4(),
    };

    // * 1. Optimistic UI update with no revalidate
    mutate(
      ["/api/usersBookmarks", session.access_token],
      (bookmarks) => [...bookmarks, bookmark],
      false
    );
    setInputValue("");
    // * 2. Update DB
    const responseBookmark = await newBookmark(bookmark);
    // * 3. Revalidate
    mutate(["/api/usersBookmarks", session.access_token]);
  };

  return (
    <div className="border border-slate-200 rounded-md pl-2 overflow-hidden">
      <form className="flex items-center" onSubmit={onSubmit}>
        <input
          placeholder="Quick add URL..."
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
        />
        <select value={folderInput} name="" onChange={(e) => setFolderInput(e.target.value)}>
          <option value="">No Folder</option>
          {!!folders &&
            folders.map((folder) => (
              <option key={folder.id} value={folder.id}>
                {folder.name}
              </option>
            ))}
        </select>
        <button
          type="submit"
          className="text-md border-l border-slate-200 text-gray-900 px-2 bg-white hover:bg-gray-300">
          Save
        </button>
      </form>
    </div>
  );
};

export default BmQuickAdd;
