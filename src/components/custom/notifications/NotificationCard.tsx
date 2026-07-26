import { Circle } from "lucide-react";
import { useNavigate } from "react-router-dom";

import NotificationIcon from "./NotificationIcon";

import { markAsRead } from "../../../utils/notificationStorage";

import type { Notification } from "../../../types/notification.types";

type Props = {
  notification: Notification;
};

const NotificationCard = ({
  notification,
}: Props) => {
  const navigate = useNavigate();

  const handleClick = () => {
    markAsRead(notification.id);

    if (
      notification.targetRoute &&
      notification.targetId
    ) {
      navigate(
        `${notification.targetRoute}/${notification.targetId}`
      );
    }
  };

  return (
    <button
      onClick={handleClick}
      className="flex w-full items-start gap-lg rounded-2xl p-lg text-left transition hover:bg-light-hover"
    >
      {/* Image / Icon */}
      <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary/10">
        {notification.image ? (
          <img
            src={notification.image}
            alt={notification.title}
            className="!h-14 !w-14 rounded-full object-cover"
          />
        ) : (
          <NotificationIcon
            type={notification.type}
          />
        )}
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1">
        <h3 className="text-body-lg font-semibold text-text-primary">
          {notification.title}
        </h3>

        <p className="mt-xs line-clamp-2 text-body-sm text-text-secondary">
          {notification.description}
        </p>

        <span className="mt-sm block text-caption text-text-muted">
          {new Date(
            notification.createdAt
          ).toLocaleString()}
        </span>
      </div>

      {/* unread dot */}
      {!notification.isRead && (
        <Circle
          size={10}
          fill="currentColor"
          className="mt-2 shrink-0 text-primary"
        />
      )}
    </button>
  );
};

export default NotificationCard;