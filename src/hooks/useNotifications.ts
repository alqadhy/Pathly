import { useContext } from "react";

import {
  NotificationContext,
  type NotificationContextType,
} from "../Context/NotificationContext";

export const useNotifications =
  (): NotificationContextType => {
    const context =
      useContext(NotificationContext);

    if (!context) {
      throw new Error(
        "useNotifications must be used inside NotificationProvider"
      );
    }

    return context;
  };