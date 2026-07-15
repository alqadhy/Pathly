// Icons
import {
  House,
  WandSparkles,
  ChartColumn,
  FileText,
  BriefcaseBusiness,
  Bookmark,
  BookOpen,
  UsersRound,
  UserRound,
  Settings,
} from "lucide-react";

// Constants
import { APP_ROUTES } from "./router";

export const SIDEBAR_LINKS = {
  student: [
    {
      id: 1,
      title: "MAIN",
      links: [
        { icon: <House />, text: "Home", to: APP_ROUTES.student.dashboard },
        {
          icon: <WandSparkles />,
          text: "AI Assistant",
          to: APP_ROUTES.student.aiAssistant,
        },
        {
          icon: <ChartColumn />,
          text: "Analytics",
          to: APP_ROUTES.student.analytics,
        },
      ],
    },
    {
      id: 2,
      title: "CAREER",
      links: [
        { icon: <FileText />, text: "CV", to: APP_ROUTES.student.cv },
        {
          icon: <BriefcaseBusiness />,
          text: "Jobs & Internships",
          to: APP_ROUTES.student.jobs,
        },
        {
          icon: <Bookmark />,
          text: "Saved Items",
          to: APP_ROUTES.student.saved,
        },
      ],
    },
    {
      id: 3,
      title: "GROWTH",
      links: [
        {
          icon: <BookOpen />,
          text: "Learning",
          to: APP_ROUTES.student.learning,
        },
        {
          icon: <BookOpen />,
          text: "My Learning",
          to: APP_ROUTES.student.mylearning,
        },
        {
          icon: <UsersRound />,
          text: "Community",
          to: APP_ROUTES.student.community,
        },
      ],
    },
    {
      id: 4,
      title: "ACCOUNT",
      links: [
        {
          icon: <UserRound />,
          text: "Profile",
          to: APP_ROUTES.student.profile,
        },
        {
          icon: <Settings />,
          text: "Settings",
          to: APP_ROUTES.student.settings,
        },
      ],
    },
  ],
};
