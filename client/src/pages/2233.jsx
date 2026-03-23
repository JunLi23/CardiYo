import React, { useState, useEffect } from "react";

const NewMessage = () => {
  const [text, setText] = useState("");
  const [isGoal, setIsGoal] = useState(false);
  const [status, setStatus] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/messages`)
      .then((res) => res.json())
      .then((data) => setMessages(data))
      .catch((err) => console.error(err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, isGoal }),
      });

      if (res.ok) {
        setStatus("Message added successfully!");
        setText("");
        setIsGoal(false);
        fetch(`${import.meta.env.VITE_API_URL}/api/messages`)
          .then((res) => res.json())
          .then((data) => setMessages(data))
          .catch((err) => console.error(err));
      } else {
        setStatus("Failed to add message");
      }
    } catch (err) {
      console.error(err);
      setStatus("Error sending message");
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/messages/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setMessages((prev) => prev.filter((msg) => msg._id !== id));
        setStatus("Message deleted");
      } else {
        setStatus("Failed to delete message");
      }
    } catch (err) {
      console.error(err);
      setStatus("Error deleting message");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto text-black">
      <h2 className="text-xl font-bold mb-4">Add New Message</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Message text"
          className="p-2 border rounded"
          required
        />
        <label className="flex items-center gap-2 text-black">
          <input
            type="checkbox"
            checked={isGoal}
            onChange={() => setIsGoal(!isGoal)}
          />
          This message is a goal
        </label>
        <button
          type="submit"
          className="bg-[#3C5246] text-black px-4 py-2 rounded hover:opacity-90 transition"
        >
          Add Message
        </button>
      </form>
      {status && <p className="mt-2">{status}</p>}

      <h2 className="text-xl font-bold mt-8 mb-4">Existing Messages</h2>
      <div className="flex flex-col gap-3">
        {messages.length === 0 ? (
          <p className="text-gray-500">No messages yet</p>
        ) : (
          messages.map((msg) => (
            <div
              key={msg._id}
              className="flex items-center justify-between p-3 border rounded bg-gray-50"
            >
              <div>
                <p className="text-sm">{msg.text}</p>
                {msg.isGoal && (
                  <span className="text-xs text-green-600 font-semibold">Goal</span>
                )}
              </div>
              <button
                onClick={() => handleDelete(msg._id)}
                className="ml-4 bg-red-500 text-white px-3 py-1 rounded hover:opacity-90 transition text-sm"
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NewMessage;