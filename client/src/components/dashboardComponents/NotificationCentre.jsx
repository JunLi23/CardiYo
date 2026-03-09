import styles from "./NotificationCentre.module.css";
import { useState } from "react";

/*Temp notifications*/
const Tempnotifications = [
    {id: 1, sender: "BOB", message: "Lorem ipsum dolor sit amet consectetur adipiscing elit. Dolor sit amet consectetur adipiscing elit quisque faucibus.", date: "20/1/2026", read: false},
    {id: 2, sender: "DAVE", message: "Lorem ipsum dolor sit amet consectetur adipiscing elit.", date: "10/1/2026", read: false},
    {id: 3, sender: "BOB", message: "HI", date: "8/1/2026", read: true},
    {id: 4, sender: "JILL", message: "Lorem ipsum dolor sit amet consectetur adipiscing elit. Sit amet consectetur adipiscing elit quisque faucibus ex. Adipiscing elit quisque faucibus ex sapien vitae pellentesque.", date: "7/1/2026", read: true},
    {id: 5, sender: "SAM", message: "Lorem ipsum dolor sit amet consectetur adipiscing elit. Sit amet consectetur adipiscing elit quisque faucibus ex. Adipiscing elit quisque faucibus ex sapien vitae pellentesque.", date: "7/1/2026", read: false},
]

export default function NotificationCentre(){
    const [notifications, setNotifications] = useState(Tempnotifications);

    function handleClick(id) {
        setNotifications(prev =>
            prev.map(n => n.id === id ? { ...n, read: true } : n)
        );
    }

    return (
        <div className={styles.display}>
            <div className={styles.header}> 
                NOTIFICATION CENTER 
            </div>
            <div className={styles.notificationsWrapper}>
                {notifications.map((notification) => (
                    <div key={notification.id} onClick={() => handleClick(notification.id)} className={`${styles.notification} ${notification.read ? styles.read : styles.unread}`}>
                        <div className={styles.notificationHeader}>
                            <p>{notification.sender}</p>
                            <p>{notification.date}</p>
                        </div>   
                        <p>{notification.message}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

