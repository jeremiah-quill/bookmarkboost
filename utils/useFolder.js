import { createContext, useContext, useState, useEffect } from "react";

const FolderContext = createContext();

export function FolderProvider({ children }) {
  const value = useCurrentFolder();
  return <FolderContext.Provider value={value}>{children}</FolderContext.Provider>;
}

export const useFolder = () => {
  return useContext(FolderContext);
};

function useCurrentFolder() {
  const [currentFolder, setCurrentFolder] = useState(null);

  const viewFolder = (folderId) => {
    setCurrentFolder(folderId);
  };

  return {
    currentFolder,
    viewFolder,
  };
}
