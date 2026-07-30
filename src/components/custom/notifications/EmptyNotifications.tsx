import { Bell } from "lucide-react";

const NotificationEmpty = () => {
  return (
    <div className="flex flex-col items-center justify-center py-md">
      <Bell
        className="h-30 w-30  md:h-50 md:w-50   text-normal"
      />

      <h4 className="mt-lg !text-h3 font-bold text-text-primary">
        No Notification yet
      </h4>

      <p className="mt-md text-center text-body-lg font-semibold text-normal  w-[300px] xl:w-[500px]">
        Get notified about friend requests, new job postings, newly published courses, and more. Manage what you receive in your notification settings
      </p>
    </div>
  );
};

export default NotificationEmpty;