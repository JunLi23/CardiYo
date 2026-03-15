import styles from "./NotificationCentre.module.css";
import { useEffect, useState } from 'react';

export default function NotificationCentre(){

    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
    fetch('http://localhost:5050/dashboard/notifications')
      .then(res => res.json())
      .then(data => {
            setNotifications(data)}) 
      .catch(err => console.error(err));
  }, []);

    function handleClick(id) {
        setNotifications(prev =>
            prev.map(n => n._id === id ? { ...n, read: true } : n)
        );

        // Update in database
        fetch(`http://localhost:5050/dashboard/notifications/${id}`, {
            method: 'PATCH',
        })
        .catch(err => console.error(err));
    }

    return (
        <div className={styles.display}>
            <div className={styles.header}> 
                NOTIFICATION CENTER 
            </div>
            <div className={styles.notificationsWrapper}>
                {notifications.map((notification) => (
                    <div key={notification._id} onClick={() => handleClick(notification._id)} className={`${styles.notification} ${notification.read ? styles.read : styles.unread}`}>
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

