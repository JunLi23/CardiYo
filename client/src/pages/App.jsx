// don't change imports, unless adding new ones, thank you!
import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Notification } from "../context/Notification";

const App = () => {
  const [notification, setNotification] = useState("");

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  return (
    <Notification.Provider value={{ notification, setNotification }}>
      <Navbar />
      <div className="w-full p-6">
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

