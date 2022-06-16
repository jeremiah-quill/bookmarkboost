import { useState } from "react";

import { useAuth } from "../lib/useAuth";
import { newFolder } from "../lib/dbAdmin";

const NewFolderForm = ({ mutate, currentFolders }) => {
  const [inputValue, setInputValue] = useState("");

  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setInputValue("");

    const folder = {
      name: inputValue,
      user_id: user.id,
      // temp_id: uuidv4(),
    };

    await mutate(newFolder(folder), {
      optimisticData: [...currentFolders, folder],
      rollbackOnError: true,
      populateCache: false,
      revalidate: true,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="add folder..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
    </form>
  );
};

export default NewFolderForm;
