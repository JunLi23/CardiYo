// don't change imports, unless adding new ones, thank you!
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const PostBoard = ({ onAddGoal }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/messages`)
      .then((res) => res.json())
      .then((data) => {
        const sorted = data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setMessages(sorted);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="w-full bg-[#5E806D] border-4 border-[#3C5246] rounded-2xl p-6 max-h-[350px] overflow-y-auto">

      {messages.map((msg, index) => (
        <div
          key={index}
          className="bg-white rounded-xl p-4 mb-4 flex flex-col md:flex-row md:items-center md:justify-between"
        >
          <p className="text-black text-sm md:text-base">{msg.text}</p>

          {msg.isGoal && (
            <button
              onClick={() => onAddGoal(msg.text)}
              className="mt-3 md:mt-0 bg-[#3C5246] text-white px-4 py-2 rounded-lg hover:opacity-90 transition"
            >
              Add Goal
            </button>
          )}
        </div>
      ))}

    </div>
  );
};

export default PostBoard;