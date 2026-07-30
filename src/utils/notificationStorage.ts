import type { Notification } from "../types/notification.types";


const getStorageKey = () => {
  const currentUser = JSON.parse(
    localStorage.getItem("currentUser") || "{}"
  );
  console.log("Notification User:", currentUser.email);

  return `notifications_${currentUser.email}`;
};


export const getNotifications = (): Notification[] => {
  const key = getStorageKey();

  const data = localStorage.getItem(key);

  if (!data) return [];

  return JSON.parse(data);
};


export const saveNotifications = (
  notifications: Notification[]
) => {
  const key = getStorageKey();

  localStorage.setItem(
    key,
    JSON.stringify(notifications)
  );
};


export const addNotification = (
  notification: Notification
) => {
  const notifications = getNotifications();


  const exists = notifications.some(
    (item) =>
      item.title === notification.title &&
      item.description === notification.description &&
      item.targetId === notification.targetId &&
      item.type === notification.type
  );


  if (exists) return;


  notifications.unshift(notification);


  saveNotifications(notifications);
};



export const markAsRead = (
  id: string
) => {

  const notifications = getNotifications();


  const updated = notifications.map(
    (item) =>
      item.id === id
        ? {
            ...item,
            isRead: true,
          }
        : item
  );


  saveNotifications(updated);
};



export const markAllAsRead = () => {

  const notifications = getNotifications();


  saveNotifications(
    notifications.map((item) => ({
      ...item,
      isRead: true,
    }))
  );
};



export const removeNotification = (
  id: string
) => {

  const notifications = getNotifications();


  saveNotifications(
    notifications.filter(
      (item) => item.id !== id
    )
  );
};



export const clearNotifications = () => {

  const key = getStorageKey();

  localStorage.removeItem(key);

};



export const unreadNotificationsCount =
  () => {

    return getNotifications().filter(
      (item) => !item.isRead
    ).length;

  };