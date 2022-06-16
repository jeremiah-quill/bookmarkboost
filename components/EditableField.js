import { useState } from "react";
import { FiEdit } from "react-icons/fi";

const EditableField = ({ value, onSubmit, editableId, textSize, children }) => {
  const [isEditable, setIsEditable] = useState(false);
  const [inputValue, setInputValue] = useState(value);

  const handleSave = async (e) => {
    e.preventDefault();
    await onSubmit(inputValue, editableId);
    setIsEditable(false);
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setIsEditable(false);
  };

  if (isEditable) {
    return (
      <form onSubmit={handleSave} className="flex gap-1 justify-center">
        <input
          className={textSize}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit">Save</button>
        <button onClick={handleCancel}>Cancel</button>
      </form>
    );
  }

  return (
    <div className="flex justify-center items-center gap-2">
      {children}
      <button onClick={() => setIsEditable(true)}>
        <FiEdit color="gray" />
      </button>
    </div>
  );
};

export default EditableField;
