import mongoose from "mongoose";

const mongoose = require("mongoose");

const achievementsSchema = new mongoose.Schema({
  achievementID: {
    type: String,
    required: true,
    match: [/^.{6}$/, "achievementID must be exactly 6 characters"],
    unique: true,
    trim: true,
  },
  name: {
    type: String,
    required: true,
    maxlength: 255,
    trim: true,
  },
  isCompleted: {
    type: Boolean,
    required: true,
    default: false,
  },
  username: {
    type: String,
    required: true,
    maxlength: 32,
    ref: "User",
  },
});

module.exports = mongoose.model("Achievements", achievementsSchema);