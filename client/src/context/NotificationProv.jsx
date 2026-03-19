import React, { useState } from "react";
import { Notification } from "./Notification";

const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState("");

  return (
    <Notification.Provider value={{ notification, setNotification }}>
      {children}
    </Notification.Provider>
  );
};

export default NotificationProvider;