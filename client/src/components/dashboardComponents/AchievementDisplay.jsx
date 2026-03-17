// don't change imports, unless adding new ones, thank you!
import styles from "./AchievementDisplay.module.css";
import goldBadge from "../../assets/gBadge.png";
import greyBadge from "../../assets/greyBadge.png";
import trophy from "../../assets/trophy.svg";

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
      {earned ? <img src={goldBadge} alt="gBadge" className={styles.badge} /> : <img src={greyBadge} alt="greyBadge" className={styles.badge}/>}
      {label}
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