// don't change imports, unless adding new ones, thank you!
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { useContext, useEffect } from "react";
import { Notification } from "../context/Notification";
import "../styles/HealthHub/HealthHub.css";
import Navbar from "../components/Navbar";
import ProfileCard from "../components/HealthHub/ProfileCard";
import PostBoard from "../components/HealthHub/PostBoard";
import GoalsBox from "../components/HealthHub/Goals";
import Footer from "../components/Footer";

const HealthHub = () => {
  const [goals, setGoals] = useState([]);
  const { setNotification } = useContext(Notification);

  useEffect(() => {
  setNotification("You have a message in Health Hub!");
}, []);

  const handleAddGoal = (msg) => {
    const newGoal = {
      _id: msg._id, // keep backend id
      text: msg.text,
      createdAt: msg.createdAt,
      completed: false,
    };

    if (!goals.find((goal) => goal._id === msg._id)) {
      setGoals((prev) => [...prev, newGoal]);
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
      <Navbar />

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
      <Footer />
      <Outlet />
    </>
  );
};

export default HealthHub;