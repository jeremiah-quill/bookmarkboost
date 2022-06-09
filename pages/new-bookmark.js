const NewBookmark = () => {
  return (
    <div className="z-20 m-5">
      <form className="flex flex-col gap-10 max-w-6xl m-auto">
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
      </form>
    </div>
  );
};

export default NewBookmark;
