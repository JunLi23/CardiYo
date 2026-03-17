import { useState } from "react";
import { useGoals } from "../context/UseGoals";

import Navbar from "../components/Navbar";

const AddStuff = () => {
  const { addGoal } = useGoals();

  const [message, setMessage] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = () => {
    if (!message || !date) return;

    addGoal({ message, date });
    setMessage("");
    setDate("");
  };

  return (
    <>
      <Navbar />

      <div className="p-8 max-w-xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Add a Goal</h1>

        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Goal..."
          className="border p-2 mb-3 w-full rounded"
        />

        <input
          value={date}
          onChange={(e) => setDate(e.target.value)}
          placeholder="Date..."
          className="border p-2 mb-3 w-full rounded"
        />

        <button
          onClick={handleSubmit}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Add Goal
        </button>
      </div>
    </>
  );
};

export default AddStuff;