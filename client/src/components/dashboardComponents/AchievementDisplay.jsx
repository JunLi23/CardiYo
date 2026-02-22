import styles from "./AchievementDisplay.module.css";

/*Temperary to just find spacing and things*/
const achievements = [
        { id: 1, label: "Everest", earned: true},
        { id: 2, label: "Fuji", earned: true},
        { id: 3, label: "K2", earned: true},
        { id: 4, label: "Kilimanjaro", earned: false},
        { id: 5, label: "Blanc", earned: false},
    ];

/*Helper function that displays a gold medal if earned or a silver if not */
function MedalIcon({ earned, label}) {
  return (
    <div>
      {earned ? "🥇" : "🥈"}
      {label}
    </div>
  )
}

export default function AchievementDisplay () {
    return (
        <div className={styles.display}>
            🏆
            <div className={styles.achievementWrapper}>
            {achievements.map((achievement) => (
                <div key={achievement.id}>
                    <div className={styles.medal}>
                        <MedalIcon earned={achievement.earned} label = {achievement.label} />
                    </div>
                </div>
            ))}
            </div>
        </div>
    );
}