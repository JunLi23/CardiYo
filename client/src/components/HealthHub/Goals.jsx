// don't change imports, unless adding new ones, thank you!
import React from "react";

function Goal({ goal, onToggle }) {
  return (
    <div className="flex items-center justify-between w-full px-6 py-4 bg-[#3C5246] rounded-full shadow-md">
      <div>
        <p className={`text-white ${goal.completed ? "line-through opacity-60" : ""}`}>
          {goal.text}
        </p>
        <p className="text-sm text-gray-200">
          {new Date(goal.createdAt).toLocaleDateString("en-GB")}
        </p>
      </div>

      <input
        type="checkbox"
        checked={goal.completed || false}
        onChange={onToggle}
        className="w-5 h-5 accent-green-400"
      />
    </div>
  );
}

function GoalsBox({ goals, onToggleGoal }) {
  return (
    <div
      className="w-full flex flex-col gap-4 p-6 border-4 rounded-2xl"
      style={{ backgroundColor: "#5E806D", borderColor: "#3C5246" }}
    >
      {goals.length === 0 ? (
        <p className="text-white">No goals yet</p>
      ) : (
        goals.map((goal) => (
          <Goal key={goal._id} goal={goal} onToggle={() => onToggleGoal(goal._id)} />
        ))
      )}
    </div>
  );
}

export default GoalsBox;



