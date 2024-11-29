import React from "react";

const Note = ({ note, deleteNote }) => {
  return (
    <div className="flex justify-between items-center relative">
      <p className="text-left break-words w-full text-2xl font-['Reenie_Beanie']">
        {note.content}
      </p>
      <button
        onClick={() => deleteNote(note.id)}
        className="text-red-500 font-bold text-sm absolute top-[-15px] right-[-15px]"
      >
        ✖
      </button>
    </div>
  );
};

export default Note;
