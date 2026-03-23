import React, { useState, useEffect } from "react";

const NewMessage = () => {
  const [text, setText] = useState("");
  const [isGoal, setIsGoal] = useState(false);
  const [status, setStatus] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/messages`)
      .then((res) => res.json())
      .then((data) => setMessages(data))
      .catch((err) => console.error(err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, isGoal }),
      });

      if (res.ok) {
        setStatus("Message added successfully!");
        setText("");
        setIsGoal(false);
        fetch(`${import.meta.env.VITE_API_URL}/api/messages`)
          .then((res) => res.json())
          .then((data) => setMessages(data))
          .catch((err) => console.error(err));
      } else {
        setStatus("Failed to add message");
      }
    } catch (err) {
      console.error(err);
      setStatus("Error sending message");
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/messages/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setMessages((prev) => prev.filter((msg) => msg._id !== id));
        setStatus("Message deleted");
      } else {
        setStatus("Failed to delete message");
      }
    } catch (err) {
      console.error(err);
      setStatus("Error deleting message");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto text-black">
      <h2 className="t