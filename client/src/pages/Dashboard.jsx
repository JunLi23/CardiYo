import styles from "../styles/Dashboard.module.css";
import Navbar from "../components/Navbar";
import BioMarker from "../components/dashboardComponents/BioMarker";
import AchievementDisplay from "../components/dashboardComponents/AchievementDisplay";
import ProgressDisplay from "../components/dashboardComponents/ProgressDisplay";

const Dashboard = ()=> {
    return (
        <>

        <Navbar />
            <div className={styles.dashboard}>
                dashboard
                <div className={styles.bioMarkerContainer}>
                    <BioMarker label="Heart Rate" value={57} unit="BPM"/>
                    <BioMarker label="Steps" value={8432} unit="steps" />
                    <BioMarker label="Calories" value={1640} unit="kcal" />
                </div>
                <div className={styles.achievementContainer}>
                    <AchievementDisplay />
                </div>
                <div className={styles.progressContainer}>
                    <ProgressDisplay />
                </div>
            </div>
        </>
    );
}
export default Dashboard;