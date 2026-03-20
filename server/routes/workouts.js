import express from "express";
import db from "../db/connection.js";
import { ObjectId } from "mongodb";

const router = express.Router();

router.post("/record-workout", async (req, res) => {
  try {
    const workoutsCollection = db.collection("workouts");
    const usersCollection = db.collection("users");

    const { userId, date, title, type, duration, stepsAdded, caloriesBurned } = req.body;

    const workout = {
      userId,
      date,
      title,
      type,
      duration,
      stepsAdded,
      caloriesBurned,
      createdAt: new Date(),
    };

    const result = await workoutsCollection.insertOne(workout);

    try {
      await usersCollection.updateOne(
        { _id: userId },
        {
          $inc: {
            "dashboardStats.steps": stepsAdded || 0,
            "dashboardStats.calories": caloriesBurned || 0,
          },
          $addToSet: {
            workoutDates: date,
          },
        }
      );
    } catch (userUpdateError) {
      console.error("User update failed:", userUpdateError);
    }

    res.status(200).json({
      message: "Workout recorded successfully",
      workout: {
        ...workout,
        _id: result.insertedId,
      },
    });
  } catch (error) {
    console.error("POST /record-workout failed:", error);
    res.status(500).json({ message: "Failed to record workout" });
  }
});

router.get("/:userId", async (req, res) => {
  try {
    const workoutsCollection = db.collection("workouts");
    const { userId } = req.params;

    const workouts = await workoutsCollection.find({ userId }).toArray();
    res.status(200).json(workouts);
  } catch (error) {
    console.error("GET /:userId failed:", error);
    res.status(500).json({ message: "Failed to fetch workouts" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const workoutsCollection = db.collection("workouts");
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid workout id" });
    }

    const result = await workoutsCollection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Workout not found" });
    }

    res.status(200).json({ message: "Workout deleted successfully" });
  } catch (error) {
    console.error("DELETE /:id failed:", error);
    res.status(500).json({ message: "Failed to delete workout" });
  }
});

export default router;