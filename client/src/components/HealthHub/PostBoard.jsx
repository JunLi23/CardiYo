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
        <div
          key={index}
          className="p-2 sm:p-3 md:p-4 rounded-lg shadow-sm w-full flex flex-col gap-2 bg-white"
        >
          <p className="text-black text-sm sm:text-base md:text-lg lg:text-xl break-words">
            {item}
          </p>
          <button
            onClick={() => onAddGoal(item)}
            className="mt-1 px-3 py-1 bg-green-700 text-white text-sm rounded hover:bg-green-800 transition-colors"
          >
            Add Goal
          </button>
        </div>
      ))}
    </div>
  );
};

export default PostBoard;