import React, { useMemo, useEffect, useState, useContext, useReducer } from "react";
import { supabase } from "../lib/supabase";
import bookmarkReducer from "./bookmarkReducer";
import { useAuth } from "../lib/useAuth";

export const BookmarkContext = React.createContext();
export const DispatchBookmarkContext = React.createContext();

export function useBookmarkContext() {
  return useContext(BookmarkContext);
}

export const BookmarkProvider = ({ children }) => {
  const [bookmarks, dispatchBookmarks] = useReducer(bookmarkReducer, null);

  return (
    <BookmarkContext.Provider value={bookmarks}>
      <DispatchBookmarkContext.Provider value={dispatchBookmarks}>
        {children}
      </DispatchBookmarkContext.Provider>
    </BookmarkContext.Provider>
  );
};
