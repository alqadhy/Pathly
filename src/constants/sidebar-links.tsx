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
  Building2,
  UserCircle,
} from "lucide-react";

import { APP_ROUTES } from "./router";
import { ROLES } from "../roles";

export const SIDEBAR_LINKS = {
  [ROLES.USER]: [
    {
      id: 1,
      title: "MAIN",
      links: [
        { icon: <House />, text: "Home", to: APP_ROUTES.student.dashboard },
        {
          icon: <WandSparkles />,
          text: "AI Assistant",
          to: APP_ROUTES.public.aiAssistant,
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
          to: APP_ROUTES.public.saved,
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
          to: APP_ROUTES.public.community,
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
          to: APP_ROUTES.public.settings,
        },
      ],
    },
  ],

  [ROLES.COMPANY]: [
    {
      id: 1,
      title: "MAIN",
      links: [
        {
          icon: <House />,
          text: "Home",
          to: APP_ROUTES.company.dashboard,
        },
        {
          icon: <UserRound />,
          text: "Profile",
          to: APP_ROUTES.company.profile,
        },
        {
          icon: <BriefcaseBusiness />,
          text: "Jobs",
          to: APP_ROUTES.company.jobs,
        },
      ],
    },
    {
      id: 2,
      title: "MANAGEMENT",
      links: [
        {
          icon: <UsersRound />,
          text: "Applicants",
          to: APP_ROUTES.company.jobs,
        },
        {
          icon: <UsersRound />,
          text: "Community",
          to: APP_ROUTES.public.community,
        },
        {
          icon: <ChartColumn />,
          text: "Analytics",
          to: APP_ROUTES.student.analytics,
        },
      ],
    },
    {
      id: 3,
      title: "ACCOUNT",
      links: [
        {
          icon: <Settings />,
          text: "Settings",
          to: APP_ROUTES.public.settings,
        },
      ],
    },
  ],

  [ROLES.ADMIN]: [
    {
      id: 1,
      title: "MAIN",
      links: [
        {
          icon: <ChartColumn />,
          text: "Analytics",
          to: APP_ROUTES.admin.dashboard,
        },
        {
          icon: <Building2 />,
          text: "Companies",
          to: APP_ROUTES.admin.companies,
        },
        {
          icon: <UserCircle />,
          text: "Instructors",
          to:  APP_ROUTES.admin.instructors,
        },
      ],
    },
  ],
  [ROLES.INSTRUCTOR]: [
  {
    id: 1,
    title: "MAIN",
    links: [
      {
        icon: <House />,
        text: "Home",
        to: APP_ROUTES.instructor.dashboard,
      },
      {
        icon: <WandSparkles />,
        text: "AI Assistant",
        to: APP_ROUTES.public.aiAssistant,
      },
    ],
  },

  /* {
    id: 2,
    title: "LEARNING",
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
    ],
  }, */

  {
    id: 3,
    title: "TEACHING",
    links: [
      {
        icon: <BookOpen />,
        text: "My Courses",
        to: APP_ROUTES.instructor.myCourses,
      },
      {
        icon: <UsersRound />,
        text: "Students Management",
        to: APP_ROUTES.instructor.studentManagement,
      },
      {
        icon: <ChartColumn />,
        text: "Earnings",
        to: APP_ROUTES.instructor.earnings,
      },
            {
        icon: <Bookmark />,
        text: "Saved Items",
        to: APP_ROUTES.public.saved,
      },
      {
        icon: <UsersRound />,
        text: "Community",
        to: APP_ROUTES.public.community,
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
        to: APP_ROUTES.instructor.profile
      },
      {
        icon: <Settings />,
        text: "Settings",
        to: APP_ROUTES.public.settings,
      },
    ],
  },
],
};