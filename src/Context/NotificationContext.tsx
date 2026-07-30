import {
  createContext,
  useEffect,
  useState,
} from "react";

import type { ReactNode } from "react";
import type { Notification } from "../types/notification.types";

import {
  getNotifications,
  markAllAsRead,
  markAsRead,
} from "../utils/notificationStorage";

import { generateNotifications } from "../utils/notificationGenerator";

export type NotificationContextType = {
  notifications: Notification[];
  unreadCount: number;
  refresh: () => void;
  read: (id: string) => void;
  readAll: () => void;
};

export const NotificationContext =
  createContext<NotificationContextType | null>(
    null
  );

type Props = {
  children: ReactNode;
};

export const NotificationProvider = ({
  children,
}: Props) => {

  const [
    notifications,
    setNotifications,
  ] = useState<Notification[]>([]);


  const refresh = () => {
    setNotifications(getNotifications());
  };


  useEffect(() => {

    const handleUserChange = () => {

      generateNotifications();

      refresh();

    };


    handleUserChange();


window.addEventListener(
  "userChanged",
  handleUserChange
);

    return () => {
      window.removeEventListener(
        "storage",
        handleUserChange
      );
    };

  }, []);



  const read = (id: string) => {

    markAsRead(id);

    refresh();

  };


  const readAll = () => {

    markAllAsRead();

    refresh();

  };


  return (
    <NotificationContext.Provider
      value={{
        notifications,

        unreadCount:
          notifications.filter(
            (item) => !item.isRead
          ).length,

        refresh,

        read,

        readAll,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};