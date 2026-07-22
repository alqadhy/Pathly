import { ROLES } from "../roles";
export const APP_ROUTES = {
  // Landing Page
  home: "/",

  // Auth Routes
  auth: {
    login: "/auth/",
    signup: "/auth/sign-up",
  },
  // Auth Rotues
  Learning: {
    courseDetails:"/student/learning/:id",
    continueCourse:"/student/learning/:id/player"
  },

  // Student Routes
  student: {
    dashboard: "/student/dashboard",
    analytics: "/student/analytics",
    cv: "/student/cv",

    jobs: "/student/jobs",
    jobDetails: (id: number | string) => `/student/jobs/${id}`,
    applyJob: (id: number | string) => `/student/apply/${id}`,
    learning: "/student/learning",
    profile: "/student/profile",  
    publicProfile: (id: string) => `/student/profile/${id}`,

    settings: "/student/settings",

    messages: "/student/messages",

    careerChat: "/student/career-chat",

    cvBuilder: {
      dashboard: "/student/cv",
      templateSelection: (mode: "ai" | "manual" | ":mode") =>
        `/student/cv/templates/${mode}`,
      manualBuilder: (templateId: string) =>
        `/student/cv/builder/manual/${templateId}`,
      aiBuilder: (templateId: string) =>
        `/student/cv/builder/ai/${templateId}`,
    },
  },
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

    jobs: `/${ROLES.COMPANY}/jobs`,
    jobDetails: (id: number | string) => `/${ROLES.COMPANY}/jobs/${id}`,
    postJob: `/${ROLES.COMPANY}/jobs/new`,
    editJob: (id: number | string) => `/${ROLES.COMPANY}/jobs/${id}/edit`,
  },
};