// don't change imports, unless adding new ones, thank you!
import styles from "../styles/Dashboard.module.css";
import BioMarker from "../components/dashboardComponents/BioMarker";
import AchievementDisplay from "../components/dashboardComponents/AchievementDisplay";
import ProgressDisplay from "../components/dashboardComponents/ProgressDisplay";
import MountainImg from "../assets/Everest_cropped.svg";
import ClimbOverlay from '../components/dashboardComponents/ClimbingOverlay';
import Footer from "../components/Footer";
import BioClouds from "../components/BioClouds";
import { mountains } from "../data/mountains";
import { useState, useEffect } from "react";

const defaultMountain = mountains[0]; // Everest as fallback

const Dashboard = ()=> {

    const [activeMountain, setActiveMountain] = useState(defaultMountain);

    useEffect(() => {
    const stored = localStorage.getItem("activeMountainId");
    const found = mountains.find(m => m.id === Number(stored));
    if (found) setActiveMountain(found);
  }, []);
    
    return (
        <div className={styles.dashboard}>
            <div className={styles.mountainSection}>
                <img src={activeMountain.img} alt="Mountain" className={styles.mountainImg} />
                <BioClouds />
                <ClimbOverlay progress = {activeMountain.progress} className={styles.svgOverlay}/>
            </div>
            <div className={styles.middleSection}>
                <ProgressDisplay
                    label={activeMountain.name}
                    distance={activeMountain.distance}
                    progress={activeMountain.progress}
                    medal={activeMountain.medal}
                />
                <AchievementDisplay />
            </div>
        </div>
    );
}
export default Dashboard;