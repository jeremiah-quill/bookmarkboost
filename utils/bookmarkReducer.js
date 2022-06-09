export default function bookmarkReducer(state, action) {
  switch (action.type) {
    case "SET_BOOKMARKS":
      return [...action.bookmarks];
    case "ADD_BOOKMARK":
      return [...state, { ...action.newBookmark }];
    // case "UPDATE_TITLE":
    //   return state
    //     .map((bookmark) =>
    //       bookmark.id !== action.id ? bookmark : { ...bookmark, title: action.bookmark }
    //     )
    //     .sort((a, b) => b.title > a.title);
    default:
      return state;
  }
}
