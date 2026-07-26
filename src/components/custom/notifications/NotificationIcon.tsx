import { BriefcaseBusiness, BookOpen, UserRound, Bookmark, Award, Users,} from "lucide-react";

type Props = {
  type:
    | "job"
    | "course"
    | "saved"
    | "profile"
    | "community"
    | "certificate";
};

const NotificationIcon = ({
  type,
}: Props) => {
  const className =
    "h-5 w-5 text-primary";

  switch (type) {
    case "job":
      return (
        <BriefcaseBusiness
          className={className}
        />
      );

    case "course":
      return (
        <BookOpen
          className={className}
        />
      );

    case "profile":
      return (
        <UserRound
          className={className}
        />
      );

    case "saved":
      return (
        <Bookmark
          className={className}
        />
      );

    case "certificate":
      return (
        <Award
          className={className}
        />
      );

    case "community":
      return (
        <Users
          className={className}
        />
      );

    default:
      return (
        <BookOpen
          className={className}
        />
      );
  }
};

export default NotificationIcon;