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
    // aiAssistant: "/student/ai-assistant",
    analytics: "/student/analytics",
    cv: "/student/cv",
    jobs: "/student/jobs",
    jobDetails: (id: number | string) => `/student/jobs/${id}`,
    // saved: "/student/saved",
    learning: "/student/learning",
    // community: "/student/community",
    profile: "/student/profile",
    publicProfile: (id: string) => `/student/profile/${id}`,
    settings: "/student/settings",
    messages: "/student/messages",
    cvBuilder: {
      dashboard: "/student/cv",
      templateSelection: (mode: "ai" | "manual" | ":mode") =>
        `/student/cv/templates/${mode}`,
      manualBuilder: (templateId: string) =>
        `/student/cv/builder/manual/${templateId}`,
      aiBuilder: (templateId: string) => `/student/cv/builder/ai/${templateId}`,
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
    dashboard: "/company/dashboard",
    profile: "/company/profile",
    publicProfile: (id: string) => `/company/profile/${id}`,
  },
};
