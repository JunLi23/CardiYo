// don't change imports, unless adding new ones, thank you!
import styles from "../styles/Dashboard.module.css";
import Navbar from "../components/Navbar";
import BioMarker from "../components/dashboardComponents/BioMarker";
import AchievementDisplay from "../components/dashboardComponents/AchievementDisplay";
import ProgressDisplay from "../components/dashboardComponents/ProgressDisplay";
import NotifacationDisplay from "../components/dashboardComponents/NotificationCentre";
import MountainImg from "../assets/Everest.svg"
import MountainPath from "../components/dashboardComponents/MountainPath";
import Footer from "../components/Footer";

const Dashboard = ()=> {
    
    return (
        <>
            <Navbar />
                <div className={styles.dashboard}>
                    <div className={styles.mountainSection}>
                        <img src={MountainImg} alt="Mountain" className={styles.mountainImg} />
                        <div className={styles.cloudLeft}>
                            <BioMarker index={0} />                    
                        </div>
                        <div className={styles.cloudCenter}>
                            <BioMarker index={1} />                    
                        </div>
                        <div className={styles.cloudRight}>
                            <BioMarker index={2} />
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
            <Footer />
            </>
    );
}
export default Dashboard;