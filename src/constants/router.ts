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
    dashboard: `/${ROLES.USER}/dashboard`,
    // aiAssistant: "/student/ai-assistant",
    analytics: `/${ROLES.USER}/analytics`,
    cv: `/${ROLES.USER}/cv`,
    jobs: `/${ROLES.USER}/jobs`,
    jobDetails: (id: number | string) => `/${ROLES.USER}/jobs/${id}`,
    // saved: "/student/saved",
    learning: `/${ROLES.USER}/learning`,
    // community: "/student/community",
    profile: `/${ROLES.USER}/profile`,
    publicProfile: (id: string) => `/${ROLES.USER}/profile/${id}`,
    settings: `/${ROLES.USER}/settings`,
    messages: `/${ROLES.USER}/messages`,
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

  // Admin Routes
  admin: {
    dashboard: `/${ROLES.ADMIN}/dashboard`,
    companies: `/${ROLES.ADMIN}/companies`,
    companyDetails: (id: number | string) => `/${ROLES.ADMIN}/companies/${id}`,
  },
};
