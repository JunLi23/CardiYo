import styles from "../styles/Dashboard.module.css";
import Navbar from "../components/Navbar";
import BioMarker from "../components/dashboardComponents/BioMarker";
import AchievementDisplay from "../components/dashboardComponents/AchievementDisplay";
import ProgressDisplay from "../components/dashboardComponents/ProgressDisplay";
import NotifacationDisplay from "../components/dashboardComponents/NotificationCentre";
import MountainImg from "../assets/Everest.svg"

const Dashboard = ()=> {
    return (
        <>

        <Navbar />
            <div className={styles.dashboard}>
                <div className={styles.mountainSection}>
                    <img src={MountainImg} alt="Mountain" className={styles.mountainImg} />
                    <div className={styles.cloudLeft}>
                        <BioMarker label="Calories" value={1640} unit="kcal"/>
                    </div>
                    <div className={styles.cloudCenter}>
                        <BioMarker label="Steps" value={8432} unit="steps"/>
                    </div>
                    <div className={styles.cloudRight}>
                        <BioMarker label="Heart Rate" value={57} unit="BPM"/>
                    </div>
                </div>
                <div className={styles.middleSection}>
                    <ProgressDisplay />
                    <AchievementDisplay />
                </div>
                <div className={styles.bottomSection}>
                    <NotifacationDisplay />
                </div>
            </div>
        </>
    );
}
export default Dashboard;