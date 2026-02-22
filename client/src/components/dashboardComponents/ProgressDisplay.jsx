import styles from "./ProgressDisplay.module.css";

/* temp data for finding spacing  */
const progressData = [
    { id: 1, label: "Everest", distance: 5426, progress: 42, medal: "🥇"}
];

export default function ProgressDisplay(){
    return (
        <div className={styles.display}>
            <h2>
                {progressData[0].label}
            </h2>
            <p>
                {progressData[0].distance}m
            </p>
            <p>
                {progressData[0].progress}%
            </p>
            <div className={styles.progressBar}>
                <div className={styles.progressBarFill}>
                </div>
            </div>
        </div>
    );
}
