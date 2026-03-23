// don't change imports, unless adding new ones, thank you!
import styles from "./AchievementDisplay.module.css";
import goldBadge from "../../assets/gBadge.png";
import greyBadge from "../../assets/greyBadge.png";
import trophy from "../../assets/trophy.svg";

/*Temperary to just find spacing and things*/
const achievements = [
        { id: 1, label: "Everest", earned: true},
        { id: 2, label: "Fuji", earned: true},
        { id: 3, label: "Denali", earned: true},
        { id: 4, label: "Ben Nevis", earned: false},
        { id: 5, label: "Blanc", earned: false},
    ];

/*Helper function that displays a gold medal if earned or a silver if not */
function MedalIcon({ earned, label }) {
  return (
    <div className={styles.medal}>
      <img
        src={earned ? goldBadge : greyBadge}
        alt={label}
        className={styles.badge}
      />
      <p className={styles.medalLabel}>{label}</p>
    </div>
  )
}

export default function AchievementDisplay () {
    return (
        <div className={styles.display}>
            <img src={trophy} alt="trophy" style={{width: "60px"}}/>
            <div className={styles.achievementWrapper}>
            {achievements.map((achievement) => (
                <div key={achievement.id} className={styles.medal}>
                    <MedalIcon earned={achievement.earned} label = {achievement.label} />
                </div>
            ))}
            </div>
        </div>
    );
}