// don't change imports, unless adding new ones, thank you!
import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useContext } from "react";
import { Notification } from "../context/Notification";
import "../styles/HealthHub/HealthHub.css";
import ProfileCard from "../components/HealthHub/ProfileCard";
import PostBoard from "../components/HealthHub/PostBoard";
import GoalsBox from "../components/HealthHub/Goals";
import Footer from "../components/Footer";

const HealthHub = () => {
  const [goals, setGoals] = useState([]);
  const { setNotification } = useContext(Notification);

  const handleAddGoal = (msg) => {
    const newGoal = {
      _id: msg._id,
      text: msg.text,
      createdAt: msg.createdAt,
      completed: false,
    };

    if (!goals.find((goal) => goal._id === msg._id)) {
      setGoals((prev) => [...prev, newGoal]);
      setNotification("You have a new goal in Health Hub!");
    }
  };

  const toggleGoal = (id) => {
    setGoals((prev) =>
      prev.map((goal) =>
        goal._id === id ? { ...goal, completed: !goal.completed } : goal
      )
    );
  };

  return (
    <>
      <div className="w-full px-6 md:px-10 lg:px-16 py-8">
        <div className="mt-6 w-full">
          <ProfileCard />
        </div>

        <div className="mt-6 w-full">
          <GoalsBox goals={goals} onToggleGoal={toggleGoal} />
        </div>

        <div className="mt-6 w-full">
          <PostBoard onAddGoal={handleAddGoal} />
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default HealthHub;