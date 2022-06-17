import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useAuth } from "../lib/useAuth";
import useSWR, { mutate } from "swr";
import { newBookmark } from "../lib/dbAdmin";

const BmQuickAdd = ({ folders, updateBmUi }) => {
  const [inputValue, setInputValue] = useState("");
  const [folderInput, setFolderInput] = useState("");
  const { session, user } = useAuth();

  const onSubmit = async (e) => {
    e.preventDefault();
    const bookmark = {
      folder_id: folderInput === "" ? null : folderInput,
      url: inputValue,
      title: inputValue,
      user_id: user.id,
      temp_id: uuidv4(),
    };

    setInputValue("");
    // * 1. Optimistic UI update with no revalidate
    mutate(
      ["/api/usersBookmarks", session.access_token],
      (bookmarks) => [...bookmarks, bookmark],
      false
    );
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
          className=""
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
        />
        <select value={folderInput} name="" onChange={(e) => setFolderInput(e.target.value)}>
          <option value={""}>/all</option>
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
