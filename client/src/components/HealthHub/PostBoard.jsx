// don't change imports, unless adding new ones, thank you!
import React from "react";
import { Link } from "react-router-dom";

const PostBoard = ({ items = [], onAddGoal }) => {
  return (
    <div
      className="w-full flex flex-col gap-4 p-6 border-4 rounded-2xl flex-col gap-3 overflow-y-auto"
      style={{
        backgroundColor: "#5E806D",
        borderColor: "#3C5246",
        height: "60vh",
      }}
    >
      {items.map((item, index) => (
    <div key={index} className="mb-2 p-2 border rounded">
      <p>{item.text}</p>   {/* ✅ render the text only */}
      {item.isGoal && (
        <button
          onClick={() => onAddGoal(item.text)}
          className="mt-1 px-2 py-1 bg-green-600 text-white rounded"
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