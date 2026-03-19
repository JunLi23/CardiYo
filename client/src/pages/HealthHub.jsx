// don't change imports, unless adding new ones, thank you!
import { Outlet } from "react-router-dom";
import React, { useState, useEffect } from "react"; 
import "../styles/HealthHub/HealthHub.css"
import Navbar from "../components/Navbar";
import ProfileCard from "../components/HealthHub/ProfileCard";
import Goals from "../components/HealthHub/Goals";
import PostBoard from "../components/HealthHub/PostBoard";
import Footer from "../components/Footer";
import PopUp from "../components/HealthHub/PopUp";

const HealthHub = () => {
  const [messages, setMessages] = useState([]);

  const [goals, setGoals] = useState([]);

  useEffect(() => {
  fetch(`${import.meta.env.VITE_API_URL}/api/messages`)
    .then(res => res.json())
    .then(data => setMessages(data))
    .catch(err => console.log(err));
}, []);

  const handleAddGoal = (goalText) => {
    if (!goals.includes(goalText)) {
      setGoals(prev => [...prev, goalText]);
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
          <Goals goals={goals} />
        </div>
        <div className="mt-6 w-full">
          <PostBoard items={messages} onAddGoal={handleAddGoal}/>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default HealthHub;