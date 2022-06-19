import { useState } from "react";
import { mutate } from "swr";

import { useAuth } from "../lib/useAuth";
import { newFolder } from "../lib/dbAdmin";

const NewFolderForm = () => {
  const [inputValue, setInputValue] = useState("");
  const { user, session } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setInputValue("");

    const folder = {
      name: inputValue,
      user_id: user.id,
    };

    // * 1. Optimistic UI update with no revalidate
    mutate(["/api/usersFolders", session.access_token], (folders) => [...folders, folder], false);
    setInputValue("");
    // * 2. Update DB
    await newFolder(folder);
    // * 3. Revalidate
    mutate(["/api/usersFolders", session.access_token]);
  };

  return (
    <form className="flex bg-white border-b border-slate-200" onSubmit={handleSubmit}>
      <input
        className="w-full px-2 py-1 border-r border-slate-200"
        type="text"
        placeholder="add folder..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button type="submit" className="px-2 py-1 hover:bg-gray-300">
        Save
      </button>
    </form>
  );
};

export default NewFolderForm;
