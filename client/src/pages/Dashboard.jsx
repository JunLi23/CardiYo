// don't change imports, unless adding new ones, thank you!
import styles from "../styles/Dashboard.module.css";
import BioMarker from "../components/dashboardComponents/BioMarker";
import AchievementDisplay from "../components/dashboardComponents/AchievementDisplay";
import ProgressDisplay from "../components/dashboardComponents/ProgressDisplay";
import NotifacationDisplay from "../components/dashboardComponents/NotificationCentre";
import MountainImg from "../assets/Everest.svg"
import MountainPath from "../components/dashboardComponents/MountainPath";
import BioClouds from "../components/BioClouds";

const Dashboard = ()=> {
    
    return (
        <>
            <div className={styles.dashboard}>
                <div className={styles.mountainSection}>
                    <img src={MountainImg} alt="Mountain" className={styles.mountainImg} />
                    <BioClouds />
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