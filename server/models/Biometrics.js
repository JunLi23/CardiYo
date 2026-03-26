import mongoose from "mongoose";

const mongoose = require("mongoose");

const biometricsSchema = new mongoose.Schema({
  bioID: {
    type: String,
    required: true,
    match: [/^.{8}$/, "bioID must be exactly 8 characters"],
    unique: true,
    trim: true,
  },
  // Calories can include decimals (e.g. 2045.5 kcal)
  calories: {
    type: Number,
    required: true,
  },
  // Heart rate in BPM — can be decimal for averages (e.g. 72.4)
  heartRate: {
    type: Number,
    required: true,
  },
  // Step count — whole integer values only
  steps: {
    type: Number,
    required: true,
    min: 0,
  },
  // Stored as a string ratio e.g. "120/80" (systolic/diastolic)
  bloodPressure: {
    type: String,
    required: true,
    match: [/^\d{2,3}\/\d{2,3}$/, 'bloodPressure must be in format "120/80"'],
  },
  // Distance in metres — whole integer values only
  distance: {
    type: Number,
    required: true,
    min: 0,
  },
  // Cholesterol in mg/dL — can include decimals
  cholesterol: {
    type: Number,
    required: true,
  },
  // Blood sugar in mmol/L or mg/dL — can include decimals
  bloodSugar: {
    type: Number,
    required: true,
  },
  // Oxygen saturation as a percentage (e.g. 98.5)
  o2Levels: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
});

module.exports = mongoose.model("Biometrics", biometricsSchema);