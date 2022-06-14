import Navbar from "../components/Navbar";

const NewBookmark = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submitted!");
  };

  return (
    <>
      <Navbar />
      <div className="z-20 m-5">
        <form onSubmit={handleSubmit} className="flex flex-col gap-10 max-w-6xl m-auto">
          <div className="flex flex-col">
            <label className="mb-2 font-bold">URL</label>
            <input className="p-2 rounded-md" placeholder="URL..." />
          </div>
          <div className="flex flex-col">
            <label className="mb-2 font-bold">Title</label>
            <input className=" p-2 rounded-md" placeholder="Title..." />
          </div>
          <div className="flex flex-col">
            <label className="mb-2 font-bold">Notes</label>
            <textarea className=" p-2 rounded-md" placeholder="Notes..." />
          </div>
          <button type="submit">Save</button>
        </form>
      </div>
    </>
  );
};

export default NewBookmark;
