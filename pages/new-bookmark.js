import Navbar from "../components/Navbar";
import { useState } from "react";
import { withProtected } from "../utils/routeProtection";
import { useAuth } from "../lib/useAuth";
import { newBookmark } from "../lib/dbAdmin";

const NewBookmark = () => {
  const { user } = useAuth();

  const [urlInput, setUrlInput] = useState("");
  const [titleInput, setTitleInput] = useState("");
  const [notesInput, setNotesInput] = useState("");

  const resetInputs = () => {
    setUrlInput("");
    setTitleInput("");
    setNotesInput("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    resetInputs();

    const bookmark = { url: urlInput, title: titleInput, notes: notesInput, user_id: user.id };
    // TODO: add error handling
    // TODO: refactor to use mutations
    const response = await newBookmark(bookmark);
  };

  return (
    <>
      <Navbar />
      <div className="z-20 m-5">
        <form onSubmit={handleSubmit} className="flex flex-col gap-10 max-w-6xl m-auto">
          <div className="flex flex-col">
            <label className="mb-2 font-bold">URL</label>
            <input
              type="text"
              onChange={(e) => setUrlInput(e.target.value)}
              value={urlInput}
              className="p-2 rounded-md"
              placeholder="URL..."
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-2 font-bold">Title</label>
            <input
              type="text"
              onChange={(e) => setTitleInput(e.target.value)}
              value={titleInput}
              className=" p-2 rounded-md"
              placeholder="Title..."
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-2 font-bold">Notes</label>
            <textarea
              className="p-2 rounded-md"
              onChange={(e) => setNotesInput(e.target.value)}
              value={notesInput}
              placeholder="Notes..."
            />
          </div>
          <button type="submit">Save</button>
        </form>
      </div>
    </>
  );
};

export default withProtected(NewBookmark);
