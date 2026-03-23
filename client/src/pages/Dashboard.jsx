// don't change imports, unless adding new ones, thank you!
import styles from "../styles/Dashboard.module.css";
import BioMarker from "../components/dashboardComponents/BioMarker";
import AchievementDisplay from "../components/dashboardComponents/AchievementDisplay";
import ProgressDisplay from "../components/dashboardComponents/ProgressDisplay";
import MountainImg from "../assets/Everest_cropped.svg";
import ClimbOverlay from '../components/dashboardComponents/ClimbingOverlay';
import Footer from "../components/Footer";
import BioClouds from "../components/BioClouds";
import { mountains } from "../Data/Mountains";
import { useState, useEffect } from "react";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5050";
const USER_ID = "user123";
const DISTANCE_BASED_TYPES = ["Walk", "Run", "Cycling", "Swimming"];
const defaultMountain = mountains[0];

const Dashboard = () => {
  const [activeMountain, setActiveMountain] = useState(defaultMountain);
  const [totalDistance, setTotalDistance] = useState(0);

  // Restore selected mountain from session
  useEffect(() => {
    const stored = sessionStorage.getItem("activeMountainId");
    const found = mountains.find((m) => m.id === Number(stored));
    if (found) setActiveMountain(found);
  }, []);

  // Fetch workouts and sum distance-based ones
  useEffect(() => {
    async function loadWorkouts() {
      try {
        const res = await fetch(`${API_BASE}/workouts/${USER_ID}`);
        if (!res.ok) return;
        const text = await res.text();
        const data = text ? JSON.parse(text) : [];

        // In your loadWorkouts useEffect, change this line:
        const total = data
          .filter((w) => DISTANCE_BASED_TYPES.includes(w.type))
          .reduce((sum, w) => sum + (parseFloat(w.distance) || 0), 0);

        setTotalDistance(Math.round(total));

        setTotalDistance(Math.round(total));
      } catch (err) {
        console.error("Failed to fetch workouts for dashboard:", err);
      }
    }

    loadWorkouts();
  }, []);

  // Compute live progress from real workout data
  const liveProgress = activeMountain.distance > 0
    ? Math.min(100, Math.round((totalDistance / activeMountain.distance) * 100))
    : 0;

  return (
    <div className={styles.dashboard}>
      <div className={styles.mountainSection}>
        <img src={activeMountain.img} alt="Mountain" className={styles.mountainImg} />
        <BioClouds />
        <ClimbOverlay
          key={activeMountain.id}
          progress={liveProgress}
          id={activeMountain.id}
          className={styles.svgOverlay}
        />
      </div>
      <div className={styles.middleSection}>
        <ProgressDisplay
          label={activeMountain.name}
          distance={totalDistance}
          progress={liveProgress}
          medal={activeMountain.medal}
        />
        <AchievementDisplay />
      </div>
    </div>
  );
};

export default Dashboard;