import styles from "./AchievementDisplay.module.css";

/*Temperary to just find spacing and things*/
const achievements = [
        { id: 1, label: "Everest", earned: true},
        { id: 2, label: "fuji", earned: true},
        { id: 3, label: "K2", earned: true},
        { id: 4, label: "Kilimanjaro", earned: false},
        { id: 5, label: "Blanc", earned: false},
    ];

export default function AchievementDisplay () {
    return (
        <div className={styles.display}>
            
        </div>
    );
}