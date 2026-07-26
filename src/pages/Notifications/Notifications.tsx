import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import NotificationHeader from "../../components/custom/notifications/NotificationHeader";
import NotificationTabs from "../../components/custom/notifications/NotificationTabs";
import NotificationItem from "../../components/custom/notifications/NotificationItem";
import EmptyNotifications from "../../components/custom/notifications/EmptyNotifications";

import { useNotifications } from "../../hooks/useNotifications";

import type { Notification } from "../../types/notification.types";

const Notifications = () => {
    const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<
    "all" | "unread"
  >("all");

  const {
    notifications,
    unreadCount,
    read,
    readAll,
  } = useNotifications();

  const filteredNotifications =
    activeTab === "all"
      ? notifications
      : notifications.filter(
          (item) => !item.isRead
        );

  const groupedNotifications =
    useMemo(() => {
      const today: Notification[] = [];
      const yesterday: Notification[] = [];
      const earlier: Notification[] = [];

      const now = new Date();

      filteredNotifications.forEach(
        (notification) => {
          const createdAt =
            new Date(
              notification.createdAt
            );

          const diff =
            now.getTime() -
            createdAt.getTime();

          const days = Math.floor(
            diff /
              (1000 *
                60 *
                60 *
                24)
          );

          if (days === 0) {
            today.push(notification);
          } else if (days === 1) {
            yesterday.push(notification);
          } else {
            earlier.push(notification);
          }
        }
      );

      return {
        today,
        yesterday,
        earlier,
      };
    }, [filteredNotifications]);

const renderSection = (
  title: string,
  data: Notification[]
) => {
  if (!data.length) return null;

  return (
    <div className="space-y-md">
      <h3 className="text-body-lg font-semibold text-text-primary">
        {title}
      </h3>

      <div className="space-y-sm">
        {data.map((notification) => (
          <NotificationItem
            key={notification.id}
            notification={notification}
            onClick={() =>
              handleClick(notification)
            }
          />
        ))}
      </div>
    </div>
  );
};

const handleClick = (
    notification: Notification
    ) => {
    read(notification.id);

    if (!notification.targetRoute) return;

    const path =
        notification.targetId &&
        !notification.targetRoute.endsWith(
        `/${notification.targetId}`
        )
        ? `${notification.targetRoute}/${notification.targetId}`
        : notification.targetRoute;

    navigate(path);
    };

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-xl p-lg lg:p-2xl">
      <NotificationHeader
        unreadCount={unreadCount}
        onMarkAllRead={readAll}
      />

      <NotificationTabs
        active={activeTab}
        onChange={setActiveTab}
      />

      {!filteredNotifications.length ? (
        <EmptyNotifications />
      ) : (
        <div className="space-y-2xl">
          {renderSection(
            "Today",
            groupedNotifications.today
          )}

          {renderSection(
            "Yesterday",
            groupedNotifications.yesterday
          )}

          {renderSection(
            "Earlier",
            groupedNotifications.earlier
          )}
        </div>
      )}
    </div>
  );
};

export default Notifications;