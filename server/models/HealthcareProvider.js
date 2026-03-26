import mongoose from "mongoose";

const mongoose = require("mongoose");

const healthcareProviderSchema = new mongoose.Schema({
  healthID: {
    type: String,
    required: true,
    match: [/^.{11}$/, "healthID must be exactly 11 characters"],
    unique: true,
    trim: true,
  },
  name: {
    type: String,
    required: true,
    maxlength: 255,
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
  tele: {
    type: String,
    required: true,
    match: [/^.{11}$/, "tele must be exactly 11 characters"],
  },
  gp: {
    type: String,
    required: true,
    maxlength: 100,
    trim: true,
  },
  address: {
    type: String,
    required: true,
    maxlength: 255,
    trim: true,
  },
  certificates: {
    type: String,
    required: true,
    maxlength: 100,
    trim: true,
  },
});

module.exports = mongoose.model("HealthcareProvider", healthcareProviderSchema);