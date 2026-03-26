import mongoose from "mongoose";

const mongoose = require("mongoose");
 
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    maxlength: 32,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    maxlength: 255,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    maxlength: 64,
  },
  name: {
    type: String,
    required: true,
    maxlength: 255,
    trim: true,
  },
  about: {
    type: String,
    required: false,
    maxlength: 200,
    default: "",
  },
  healthID: {
    type: String,
    required: false,
    length: 11,
    match: [/^.{11}$/, "healthID must be exactly 11 characters"],
    ref: "HealthcareProvider",
  },
  bioID: {
    type: String,
    required: false,
    match: [/^.{8}$/, "bioID must be exactly 8 characters"],
    ref: "Biometrics",
  },
  mountainID: {
    type: String,
    required: false,
    match: [/^.{8}$/, "mountainID must be exactly 8 characters"],
    ref: "Mountains",
  },
  createdAt: { 
    type: Date, 
    default: Date.now },
});
 
module.exports = mongoose.model("User", userSchema);