import mongoose from "mongoose";

const mongoose = require("mongoose");
 
const adminSchema = new mongoose.Schema({
  adminID: {
    type: String,
    required: true,
    match: [/^.{12}$/, "adminID must be exactly 12 characters"],
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
});
 
module.exports = mongoose.model("Admin", adminSchema);