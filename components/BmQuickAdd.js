import { useState } from "react";

const BmQuickAdd = () => {
  const [inputValue, setInputValue] = useState("");

  return (
    <div className="border border-black rounded-md px-2 flex items-center">
      <input
        placeholder="Enter URL here..."
        onChange={(e) => setInputValue(e.target.value)}
        value={inputValue}
      />
      <button className="text-2xl">+</button>
    </div>
  );
};

export default BmQuickAdd;
