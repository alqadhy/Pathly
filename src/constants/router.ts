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
    saved: "/student/saved",
    learning: "/student/learning",
    community: "/student/community",
    profile: "/student/profile",
    settings: "/student/settings",  
    cvBuilder: {
      dashboard: "/student/cv",  
      templateSelection: (mode: 'ai' | 'manual') => `/student/cv/templates/${mode}`,
      manualBuilder: (templateId: string) => `/student/cv/builder/manual/${templateId}`,
      aiBuilder: (templateId: string) => `/student/cv/builder/ai/${templateId}`,
    }

  },
};
