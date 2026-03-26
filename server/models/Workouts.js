import mongoose from "mongoose";

const mongoose = require("mongoose");

const workoutsSchema = new mongoose.Schema({
  workoutID: {
    type: String,
    required: true,
    match: [/^.{6}$/, "workoutID must be exactly 6 characters"],
    unique: true,
    trim: true,
  },
  date: {
    type: Date,
    required: true,
  },
  title: {
    type: String,
    required: true,
    maxlength: 50,
    trim: true,
  },
  // Enum restricts values to the 6 allowed workout types
  type: {
    type: String,
    required: true,
    enum: {
      values: ["Walk", "Run", "Cycling", "Gym", "Swimming", "Hiking"],
      message: "{VALUE} is not a supported workout type",
    },
  },
  // Duration stored in minutes — Number allows decimals e.g. 45.5 mins
  duration: {
    type: Number,
    required: true,
    min: [0, "Duration cannot be negative"],
  },
  // Stored as string to allow formatting e.g. "5000m" or "5000"
  distance: {
    type: String,
    required: true,
    maxlength: 10,
  },
});

module.exports = mongoose.model("Workouts", workoutsSchema);