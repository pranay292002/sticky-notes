import { useState, useRef, useEffect } from "react";
import Note from "./components/note";
import "./App.css";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem("stickyNotes");
    return savedNotes ? JSON.parse(savedNotes) : [];
  });
  const [newNote, setNewNote] = useState("");
  const constraintsRef = useRef(null);

  useEffect(() => {
    localStorage.setItem("stickyNotes", JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    if (newNote.trim() !== "") {
      setNotes((prev) => [
        ...prev,
        {
          id: Date.now(),
          content: newNote.trim(),
          rotation: Math.random() * 10 - 5,
        },
      ]);
      setNewNote("");
      toast.success("Note added successfully", { theme: "dark" });
    } else {
      toast.error("Error ! please add valid note", { theme: "dark" });
    }
  };

  const handleChange = (e) => {
    setNewNote(e.target.value);
  };

  const deleteNote = (id) => {
    if (confirm("Are you sure you want to delete the note?")) {
      setNotes((prev) => prev.filter((note) => note.id !== id));
      toast.success("Note deleted successfully", { theme: "dark" });
    }
  };

  return (
    <>
      <ToastContainer />
      <h2 className="text-center m-5 text-3xl font-bold text-yellow-300">
        Sticky Notes
      </h2>
      <div className="flex justify-center space-x-5">
        <input
          id="newNote"
          type="text"
          value={newNote}
          onChange={handleChange}
          placeholder="Type your note..."
          className="w-80 p-2 rounded-lg"
          maxLength="140"
        />
        <button
          onClick={addNote}
          className="bg-black text-white px-3 rounded-lg border-solid border-2 border-sky-500"
        >
          Add Note
        </button>
      </div>

      <motion.div
        ref={constraintsRef}
        className="grid grid-cols sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      >
        {notes.map((note) => (
          <motion.div
            key={note.id}
            className="bg-[#ffc] w-60 h-52 text-center m-5 p-5 text-lg drop-shadow-lg cursor-grab"
            style={{ transform: `rotate(${note.rotation}deg)` }}
            drag
            dragConstraints={constraintsRef}
            dragMomentum={false}
          >
            <Note note={note} deleteNote={deleteNote} />
          </motion.div>
        ))}
      </motion.div>
    </>
  );
}

export default App;
