import { ROLES } from "../roles";

export const APP_ROUTES = {
  // Landing Page
  home: "/",

  // Auth Rotues
  auth: {
    login: "/auth/",
    signup: "/auth/sign-up",
  },

  // Student Routes
  student: {
    dashboard: "/student/dashboard",
    aiAssistant: "/student/ai-assistant",
    analytics: "/student/analytics",
    cv: "/student/cv",
    jobs: "/student/jobs",
    jobDetails: (id: number | string) => `/student/jobs/${id}`,
    applyJob: (id: number | string) => `/student/apply/${id}`,
    saved: "/student/saved",
    learning: "/student/learning",
    community: "/student/community",
    profile: "/student/profile",
    publicProfile: (id: string) => `/student/profile/${id}`,
    settings: "/student/settings",
    messages: "/student/messages",
    cvBuilder: {
      dashboard: `/${ROLES.USER}/cv`,
      templateSelection: (mode: "ai" | "manual" | ":mode") =>
        `/${ROLES.USER}/cv/templates/${mode}`,
      manualBuilder: (templateId: string) =>
        `/${ROLES.USER}/cv/builder/manual/${templateId}`,
      aiBuilder: (templateId: string) => `/${ROLES.USER}/cv/builder/ai/${templateId}`,
    },
  },

  // Public Routes
  public: {
    community: "/community",
    saved: "/saved",
    aiAssistant: "/ai-assistant",
  },
  // Company Routes
  company: {
    dashboard: `/${ROLES.COMPANY}/dashboard`,
    profile: `/${ROLES.COMPANY}/profile`,
    publicProfile: (id: string) => `/${ROLES.COMPANY}/profile/${id}`,
  },
};
