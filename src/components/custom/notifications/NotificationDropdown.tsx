import { useState } from "react";

import NotificationHeader from "./NotificationHeader";
import NotificationTabs from "./NotificationTabs";
import NotificationItem from "./NotificationItem";
import NotificationEmpty from "./EmptyNotifications";

import { useNotifications } from "../../../hooks/useNotifications";

import type { Notification } from "../../../types/notification.types";

type Props = {
  onNavigate: (notification: Notification) => void;
};

const NotificationDropdown = ({
  onNavigate,
}: Props) => {
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

  const handleMarkAll = () => {
    readAll();
  };

  const handleClick = (
    notification: Notification
  ) => {
    read(notification.id);

    onNavigate(notification);
  };

  return (
    <div className="absolute right-0 top-[110%] z-50 flex max-h-[650px] w-[380px] flex-col rounded-3xl border border-border bg-card shadow-card md:w-[420px]">
      {/* Header */}

      <div className="p-xl">
        <NotificationHeader
          unreadCount={unreadCount}
          onMarkAllRead={handleMarkAll}
        />

        <NotificationTabs
          active={activeTab}
          onChange={setActiveTab}
        />
      </div>

      {/* Body */}

      <div className="flex-1 overflow-y-auto px-lg pb-lg">
        {filteredNotifications.length ? (
          <div className="space-y-sm">
            {filteredNotifications.map(
              (notification) => (
                <NotificationItem
                  key={notification.id}
                  notification={notification}
                  onClick={() =>
                    handleClick(notification)
                  }
                />
              )
            )}
          </div>
        ) : (
          <NotificationEmpty />
        )}
      </div>
    </div>
  );
};

export default NotificationDropdown;