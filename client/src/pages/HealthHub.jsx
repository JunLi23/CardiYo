// don't change imports, unless adding new ones, thank you!
import { Outlet } from "react-router-dom";
import React, { useState } from "react";
import "../styles/HealthHub/HealthHub.css"
import Navbar from "../components/Navbar";
import ProfileCard from "../components/HealthHub/ProfileCard";
import Goals from "../components/HealthHub/Goals";
import PostBoard from "../components/HealthHub/PostBoard";
import Footer from "../components/Footer";
import PopUp from "../components/HealthHub/PopUp";

const HealthHub = () => {
  const messages = [
    "I see you have already completed 3 mountains! Only 2 more to go for a trophy, well done! I have assigned you a goal to reach by next week."
  ];

  const [goals, setGoals] = useState([]);

  const handleAddGoal = (goalText) => {
    if (!goals.includes(goalText)) {
      setGoals((prev) => [...prev, goalText]);
    }
  };
  return (
    <>
      <Navbar />
      <div className="p-8 w-full">
        <div className="mt-6 w-full">
          <ProfileCard />
        </div>
        <div className="mt-6 w-full">
          <Goals goals={goals} onAddGoal={handleAddGoal} />
        </div>
        <div className="mt-6 w-full">
          <PostBoard items={messages} />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default HealthHub;