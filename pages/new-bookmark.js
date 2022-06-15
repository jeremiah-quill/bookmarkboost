import { useState } from "react";

import { useAuth } from "../lib/useAuth";
import { newBookmark } from "../lib/dbAdmin";
import { withProtected } from "../utils/routeProtection";

import DashboardLoader from "../components/DashboardLoader";
import DashboardShell from "../components/DashboardShell";

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
      <DashboardShell>
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
            <button
              type="submit"
              className="border border-slate-400 w-16 m-auto rounded-md text-slate-600">
              Save
            </button>
          </form>
        </div>
      </DashboardShell>
      {/* <Header />
      <div className="h-full grid grid-cols-12 bg-[rgb(250 250 250)]">
        <div className="lg:col-span-2 md:col-span-3 col-span-4 border-r border-slate-200 p-2">
          <FolderList />
        </div>
        <div className="lg:col-span-10 md:col-span-9 col-span-8">
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
              <button
                type="submit"
                className="border border-slate-400 w-16 m-auto rounded-md text-slate-600">
                Save
              </button>
            </form>
          </div>
        </div>
      </div> */}
      {/* <Navbar /> */}
    </>
  );
};

export default withProtected(NewBookmark, DashboardLoader);
