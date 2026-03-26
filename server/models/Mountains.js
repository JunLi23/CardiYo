import mongoose from "mongoose";

const mongoose = require("mongoose");
 
const mountainsSchema = new mongoose.Schema({
  mountainID: {
    type: String,
    required: true,
    match: [/^.{10}$/, "mountainID must be exactly 10 characters"],
    unique: true,
    trim: true,
  },
  name: {
    type: String,
    required: true,
    maxlength: 255,
    trim: true,
  },
  // Stored as string to allow formatting e.g. "8849m" or "8849"
  totalDistance: {
    type: String,
    required: true,
    maxlength: 10,
  },
  // Percentage complete (0–100)
  progress: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
    default: 0,
  },
});
 
module.exports = mongoose.model("Mountains", mountainsSchema);