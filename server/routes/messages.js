import express from "express";
import Message from "../models/Message.js"; // import the model

const router = express.Router();

// GET all messages
router.get("/", async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST a new message
router.post("/", async (req, res) => {
  try {
    const { text, isGoal } = req.body;
    const newMessage = new Message({ text, isGoal });
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;