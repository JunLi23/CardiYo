import "dotenv/config"
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import messages from "./routes/messages.js";
import records from "./routes/record.js";
import dashboard from "./routes/dashboard.js";
import workouts from "./routes/workouts.js";
import auth from "./routes/auth.js";

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());

dotenv.config();

mongoose.connect(process.env.ATLAS_URI);

app.use("/record", records);
app.use("/dashboard", dashboard);
app.use("/api/messages", messages);
app.use("/workouts", workouts);
app.use("/api/auth", auth);

// start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
