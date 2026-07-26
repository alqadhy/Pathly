import {
  BookOpen,
  BriefcaseBusiness,
  Bookmark,
  UserRound,
  Users,
  Award,
  Bell,
  Dot,
} from "lucide-react";

import type { Notification } from "../../../types/notification.types";

type Props = {
  notification: Notification;
  onClick: () => void;
};

const NotificationItem = ({
  notification,
  onClick,
}: Props) => {


  const getNotificationIcon = () => {
    switch (notification.type) {
      case "course":
        return <BookOpen />;

      case "job":
        return <BriefcaseBusiness />;

      case "saved":
        return <Bookmark />;

      case "profile":
        return <UserRound />;

      case "community":
        return <Users />;

      case "certificate":
        return <Award />;

      default:
        return <Bell />;
    }
  };


  const renderImage = () => {

    if (notification.image) {
      return (
        <img
          src={notification.image}
          alt={notification.title}
          className={` !h-12 !w-12 shrink-0 object-cover

            ${
              notification.type === "job"
                ? "rounded-lg"
                : notification.type === "course"
                ? "rounded-xl"
                : "rounded-full"
            }
          `}
        />
      );
    }


    return (
      <div
        className="
          flex
          h-12
          w-12
          shrink-0
          items-center
          justify-center
          rounded-full
          bg-primary/10
          text-primary

          [&>svg]:h-6
          [&>svg]:w-6
        "
      >
        {getNotificationIcon()}
      </div>
    );
  };


  return (
    <button
      onClick={onClick}
      className={`
        group
        flex
        w-full
        items-start
        gap-md
        rounded-2xl
        p-md
        text-left
        transition-all
        hover:bg-light-hover

        ${
          !notification.isRead
            ? "bg-primary/5"
            : ""
        }
      `}
    >

      {/* Image / Avatar / Logo */}
      {renderImage()}


      {/* Content */}
      <div className="min-w-0 flex-1">

        <div
          className="
            flex
            items-start
            justify-between
            gap-sm
          "
        >

          <h4
            className="
              line-clamp-1
              text-body-md
              font-semibold
              text-text-primary
            "
          >
            {notification.title}
          </h4>


          {!notification.isRead && (
            <Dot
              size={28}
              className="
                shrink-0
                text-primary
              "
            />
          )}

        </div>


        <p
          className="
            mt-xs
            line-clamp-2
            text-body-sm
            text-text-secondary
          "
        >
          {notification.description}
        </p>


        <p
          className="
            mt-sm
            text-xs
            text-text-secondary
          "
        >
          {new Date(
            notification.createdAt
          ).toLocaleDateString()}
        </p>


      </div>


      {/* Type Icon */}
      <span
        className="
          mt-1
          shrink-0
          text-text-secondary

          [&>svg]:h-5
          [&>svg]:w-5
        "
      >
        {getNotificationIcon()}
      </span>


    </button>
  );
};

export default NotificationItem;