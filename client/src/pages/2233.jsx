import React, { useState } from "react";

const NewMessage = () => {
  const [text, setText] = useState("");
  const [isGoal, setIsGoal] = useState(false);
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, isGoal }),
    });  

      if (res.ok) {
        const newMsg = await res.json();
        setStatus("Message added successfully!");
        setText("");
        setIsGoal(false);
        console.log("New message added:", newMsg);
      } else {
        setStatus("Failed to add message");
      }
    } catch (err) {
      console.error(err);
      setStatus("Error sending message");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Add New Message</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Message text"
          className="p-2 border rounded"
          required
        />
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={isGoal}
            onChange={() => setIsGoal(!isGoal)}
          />
          This message is a goal
        </label>
        <button
          type="submit"
          className="bg-[#3C5246] text-white px-4 py-2 rounded hover:opacity-90 transition"
        >
          Add Message
        </button>
      </form>
      {status && <p className="mt-2">{status}</p>}
    </div>
  );
};

export default NewMessage;