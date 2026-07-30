import NotificationCard from "./NotificationCard";

import type { Notification } from "../../../types/notification.types";

type Props = {
  title: string;
  notifications: Notification[];
};

const NotificationGroup = ({
  title,
  notifications,
}: Props) => {
  if (!notifications.length) return null;

  return (
    <section className="space-y-md">
      <h2 className="px-sm text-h4 font-bold text-text-primary">
        {title}
      </h2>

      <div className="overflow-hidden rounded-3xl border border-border bg-card">
        {notifications.map(
          (notification, index) => (
            <div
              key={notification.id}
              className={
                index !==
                notifications.length - 1
                  ? "border-b border-border"
                  : ""
              }
            >
              <NotificationCard
                notification={notification}
              />
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default NotificationGroup;