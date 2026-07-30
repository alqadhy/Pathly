import type { Notification } from "../types/notification.types";

export const groupNotifications = (
  notifications: Notification[]
) => {
  const today: Notification[] = [];
  const yesterday: Notification[] = [];
  const earlier: Notification[] = [];

  const now = new Date();

  notifications.forEach((item) => {
    const date = new Date(item.createdAt);

    const diff = Math.floor(
      (now.getTime() - date.getTime()) /
        (1000 * 60 * 60 * 24)
    );

    if (diff === 0) {
      today.push(item);
    } else if (diff === 1) {
      yesterday.push(item);
    } else {
      earlier.push(item);
    }
  });

  return {
    today,
    yesterday,
    earlier,
  };
};