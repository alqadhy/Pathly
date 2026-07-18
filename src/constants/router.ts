import { ROLES } from "../roles";

export const APP_ROUTES = {
  // Landing Page
  home: "/",

  // Auth Routes
  auth: {
    login: "/auth/",
    signup: "/auth/sign-up",
  },

  // Student Routes
  student: {
    dashboard: `/${ROLES.USER}/dashboard`,
    aiAssistant: `/${ROLES.USER}/ai-assistant`,
    analytics: `/${ROLES.USER}/analytics`,
    cv: `/${ROLES.USER}/cv`,
    jobs: `/${ROLES.USER}/jobs`,
    jobDetails: (id: number | string) => `/${ROLES.USER}/jobs/${id}`,
    applyJob: (id: number | string) => `/${ROLES.USER}/apply/${id}`,
    saved: `/${ROLES.USER}/saved`,
    learning: `/${ROLES.USER}/learning`,
    community: `/${ROLES.USER}/community`,
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
      aiBuilder: (templateId: string) =>
        `/${ROLES.USER}/cv/builder/ai/${templateId}`,
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