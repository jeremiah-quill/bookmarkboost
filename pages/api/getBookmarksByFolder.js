import { getBookmarksByFolder } from "../../lib/dbAdmin";

export default async function handler(req, res) {
  const { bookmarks } = await getBookmarksByFolder(req.headers.id);

  res.status(200).json(bookmarks);
}
