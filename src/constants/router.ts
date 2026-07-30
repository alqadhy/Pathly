import { ROLES } from "../roles";
export const APP_ROUTES = {
  // Landing Page
  home: "/",

  // Auth Routes
  auth: {
    login: "/auth/",
    signup: "/auth/sign-up",
  },
  onBoarding: {
    student: "/on-boarding/student",
    company: "/on-boarding/company",
  },
  // Auth Rotues
  Learning: {
    courseDetails: `/${ROLES.USER}/learning/:id`,
    continueCourse: `/${ROLES.USER}/learning/:id/player`,
  },

  // Student Routes
  student: {
    dashboard: `/${ROLES.USER}/dashboard`,
    analytics: `/${ROLES.USER}/analytics`,
    cv: `/${ROLES.USER}/cv`,

    jobs: `/${ROLES.USER}/jobs`,
    jobDetails: (id: number | string) => `/${ROLES.USER}/jobs/${id}`,
    applyJob: (id: number | string) => `/${ROLES.USER}/apply/${id}`,
    learning: `/${ROLES.USER}/learning`,
    mylearning: `/${ROLES.USER}/learning/MyLearning`,
    profile: `/${ROLES.USER}/profile`,

    messages: `/${ROLES.USER}/messages`,
    search: `/${ROLES.USER}/search`,

    careerChat: `/${ROLES.USER}/career-chat`,

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
  public: {
    community: "/community",
    saved: "/saved",
    aiAssistant: "/ai-assistant",
    publicProfile: (id: string) => `/${ROLES.USER}/profile/${id}`,
    companyProfile: (id: string) => `/${ROLES.COMPANY}/profile/${id}`,
    notification: `/notification`,
    settings: `/settings`,
  },
  // Company Routes
  company: {
    dashboard: `/${ROLES.COMPANY}/dashboard`,
    profile: `/${ROLES.COMPANY}/profile`,
    jobs: `/${ROLES.COMPANY}/jobs`,
    jobDetails: (id: number | string) => `/${ROLES.COMPANY}/jobs/${id}`,
    analytics: `/${ROLES.COMPANY}/analytics`,
    postJob: `/${ROLES.COMPANY}/jobs/new`,
    editJob: (id: number | string) => `/${ROLES.COMPANY}/jobs/${id}/edit`,
    applicants: `/${ROLES.COMPANY}/applicants`,
    jobApplicants: (id: number | string) =>
      `/${ROLES.COMPANY}/jobs/${id}/applicants`,
  },

  // Admin Routes
  admin: {
    dashboard: `/${ROLES.ADMIN}/dashboard`,
    companies: `/${ROLES.ADMIN}/companies`,
    companyDetails: (id: number | string) => `/${ROLES.ADMIN}/companies/${id}`,
    instructors: `/${ROLES.ADMIN}/instructors`,
    instructorDetails: (id: number | string) =>
      `/${ROLES.ADMIN}/instructors/${id}`,
  },

  // instractor
instructor: {
  dashboard: `/${ROLES.INSTRUCTOR}/dashboard`,
  myCourses: `/${ROLES.INSTRUCTOR}/my-courses`,
  addCourse: `/${ROLES.INSTRUCTOR}/add-course`,
  studentManagement: `/${ROLES.INSTRUCTOR}/student-management`,
  earnings: `/${ROLES.INSTRUCTOR}/earnings`,
  profile: `/${ROLES.INSTRUCTOR}/profile`,
  courseDetails: (id: number | string) =>
    `/${ROLES.INSTRUCTOR}/my-courses/${id}`,
  editCourse: (id: number | string) =>
    `/${ROLES.INSTRUCTOR}/my-courses/${id}/edit`,
},
};

