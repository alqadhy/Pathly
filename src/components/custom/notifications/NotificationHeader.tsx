type Props = {
  unreadCount: number;
  onMarkAllRead: () => void;
};

const NotificationHeader = ({
  unreadCount,
  onMarkAllRead,
}: Props) => {
  return (
    <div className="flex items-center justify-between pb-sm">
      <div>
        <p className="text-body-sm text-text-secondary">
          {unreadCount} unread notifications
        </p>
      </div>

      <button
        onClick={onMarkAllRead}
        className="text-body-sm font-semibold text-primary hover:text-primary-hover"
      >
        Mark all as read
      </button>
    </div>
  );
};

export default NotificationHeader;