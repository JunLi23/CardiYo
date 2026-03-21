// don't change imports, unless adding new ones, thank you!
import styles from "./ProgressDisplay.module.css";

export default function ProgressDisplay({ label, distance, progress, medal }) {
    return (
        <div className={styles.display}>
            <p className={styles.heading}>{label}</p>
            <p className={styles.ProgressDisplayP}>{distance}m</p>
            <div className={styles.progressSection}>
                <p>{progress}%</p>
                <div className={styles.progressBar}>
                    <div
                        className={styles.progressBarFill}
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>
        </div>
    );
}
