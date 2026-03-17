// don't change imports, unless adding new ones, thank you!
import styles from "./ProgressDisplay.module.css";

/* temp data for finding spacing  */
const progressData = [
    { id: 1, label: "Everest", distance: 5426, progress: 42, medal: "🥇"}
];

export default function ProgressDisplay(){
    return (
        <div className={styles.display}>
            <p className={styles.heading}> {progressData[0].label} </p>
            <p className={styles.ProgressDisplayP}> {progressData[0].distance}m </p>
            <div className={styles.progressSection}>
                <p>{progressData[0].progress}%</p>
                <div className={styles.progressBar}>
                    <div className={styles.progressBarFill}>
                </div>
                </div>
            </div>
        </div>
    );
}
