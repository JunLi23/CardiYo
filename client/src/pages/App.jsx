// don't change imports, unless adding new ones, thank you!
import React, { useState, useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Notification } from "../context/Notification";

const App = () => {
  const [notification, setNotification] = useState("");
  const seenGoalIds = useRef(new Set());

  useEffect(() => {
    const fetchMessages = () => {
      fetch(`${import.meta.env.VITE_API_URL}/api/messages`)
        .then((res) => res.json())
        .then((data) => {
          data.forEach((msg) => {
            if (msg.isGoal && !seenGoalIds.current.has(msg._id)) {
              seenGoalIds.current.add(msg._id);
              setNotification("You have a new goal in Health Hub!");
            }
          });
        })
        .catch((err) => console.log(err));
    };

    fetchMessages();
    const interval = setInterval(fetchMessages, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  return (
    <Notification.Provider value={{ notification, setNotification }}>
      <Navbar />
      <div className="w-full">
        <Outlet />
      </div>
      <Footer />

      {notification && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg animate-slide-in">
          {notification}
        </div>
      )}
    </Notification.Provider>
  );
};

export default App;
