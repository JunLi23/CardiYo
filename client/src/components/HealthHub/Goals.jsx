// don't change imports, unless adding new ones, thank you!
import React, { useState } from "react";

function Goal({ goal, onToggle }) {
  return (
    <div className="flex items-center justify-between w-full px-6 py-4 bg-[#3C5246] rounded-full shadow-md">
      <div>
        <p className={`text-white ${goal.completed ? "line-through opacity-60" : ""}`}>
          {goal.message}
        </p>
        <p className="text-sm text-gray-200">{goal.date}</p>
      </div>

      <input
        type="checkbox"
        checked={goal.completed}
        onChange={onToggle}
        className="w-5 h-5 accent-green-400"
      />
    </div>
  );
}

function GoalsBox() {
  const [goals, setGoals] = useState([
    { id: 1, message: "Complete 3 mountains", date: "20/1/2026", completed: true },
    { id: 2, message: "Run, Walk or Jog 42km", date: "10/1/2026", completed: false },
  ]);

  const toggleGoal = (id) => {
    setGoals(
      goals.map((goal) =>
        goal.id === id ? { ...goal, completed: !goal.completed } : goal
      )
    );
  };

  return (
    <div
      className="w-full flex flex-col gap-4 p-6 border-4 rounded-2xl"
      style={{ backgroundColor: "#5E806D", borderColor: "#3C5246" }}
    >
      {goals.map((goal) => (
        <Goal key={goal.id} goal={goal} onToggle={() => toggleGoal(goal.id)} />
      ))}
    </div>
  );
}

export default GoalsBox;




