import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";

/* Layouts */
import AuthLayout from "../layout/AuthLayout";
import DashboardLayout from "../layout/DashboardLayout";

/* Constants */
import { APP_ROUTES } from "../constants";

/* Loaders */
import Loader from "../components/layout/Loader";
import PageLoader from "../components/layout/PageLoader";

/* Direct Pages */
import CareerChat from "../pages/student/CareerChat";
import PublicProfile from "../pages/student/PublicProfile";
import PublicCompanyProfile from "../pages/company/PublicCompanyProfile";
import AdminCompanies from "../pages/admin/Companies";
import AdminCompanyDetails from "../components/custom/admin/companies/CompanyDetails";
import AdminInstructors from "../pages/admin/Instructors";
import AdminInstructorDetails from "../pages/admin/InstructorDetails";
import NotFound from "../pages/NotFound";
import DashboardHome from "../pages/DasshboardHome";

/* Lazy Pages */
const Home = lazy(() => import("../pages/Home"));

const Dashboard = lazy(() => import("../pages/student/Dashboard"));
const SettingsPage = lazy(() => import("../pages/Settings/SettingsPage"));
const Analytics = lazy(() => import("../pages/student/AnalyticsDashboard"));
const JobsInternshipsDashboard = lazy(
  () => import("../pages/student/Jobs-Internships"),
);

const JobDetails = lazy(() => import("../pages/student/JobDetails"));
const Company = lazy(() => import("../components/custom/onBoarding/company"));

const Student = lazy(() => import("../components/custom/onBoarding/student"));
const ApplyJobPage = lazy(() => import("../pages/student/ApplyJobPage"));
const SavedItems = lazy(() => import("../pages/student/SavedItems"));
const Community = lazy(() => import("../pages/student/Community"));
const Profile = lazy(() => import("../pages/student/Profile"));
const CompanyProfile = lazy(() => import("../pages/company/CompanyProfile"));
const ApplicantsPage = lazy(() => import("../pages/company/ApplicantsPage"));
const PostJob = lazy(() => import("../pages/company/PostJob"));
const Messages = lazy(() => import("../pages/student/Messages"));
const Notifications = lazy(
  () => import("../pages/Notifications/Notifications"),
);
const Searchbar = lazy(() => import("../components/custom/search/Searchbar"));
const AdminRoute = lazy(() => import("./AdminRoute"));
const StudentRoute = lazy(() => import("./StudentRoute"));
const CompanyRoute = lazy(() => import("./CompanyRoute"));
const PublicRoute = lazy(() => import("./PublicRoute"));

const Learning = lazy(() => import("../pages/Lessons/Learning"));

const MyLearning = lazy(() => import("../pages/Lessons/MyLearning"));

const LearningDetails = lazy(() => import("../pages/Lessons/LearningDetails"));

const LearningLesson = lazy(() => import("../pages/Lessons/LearningLesson"));

const CVDashboard = lazy(() => import("../pages/student/cv/CVDashboard"));

const TemplateSelection = lazy(
  () => import("../pages/student/cv/TempleteSelection"),
);

const CVBuilderManual = lazy(
  () => import("../pages/student/cv/CVBuilderManual"),
);

const CVBuilderAI = lazy(() => import("../pages/student/cv/CVBuilderAI"));

const AuthFlow = lazy(() => import("../pages/Auth/AuthFlow"));
const OnBoarding = lazy(() => import("../pages/OnBoarding"));
const CompanyHome = lazy(() => import("../pages/company/CompanyHome"));
const router = createBrowserRouter([
  /* HOME */
  {
    path: APP_ROUTES.home,
    element: (
      <Suspense fallback={<PageLoader />}>
        <Home />
      </Suspense>
    ),
  },
  {
    path: APP_ROUTES.onBoarding.student,
    element: (
      <Suspense fallback={<PageLoader />}>
        <Student />
      </Suspense>
    ),
  },
  {
    path: APP_ROUTES.onBoarding.company,
    element: (
      <Suspense fallback={<PageLoader />}>
        <Company />
      </Suspense>
    ),
  },
  /* Admin Routes */
  {
    element: (
      <Suspense fallback={<PageLoader />}>
        <AdminRoute />
      </Suspense>
    ),
    children: [
      {
        element: <DashboardLayout />,
        children: [
          {
            path: APP_ROUTES.admin.dashboard,
            element: (
              <Suspense fallback={<Loader />}>
                <h1>Hello</h1>
              </Suspense>
            ),
          },
          {
            path: APP_ROUTES.admin.companies,
            element: (
              <Suspense fallback={<Loader />}>
                <AdminCompanies />
              </Suspense>
            ),
          },
          {
            path: APP_ROUTES.admin.companyDetails(":id"),
            element: (
              <Suspense fallback={<Loader />}>
                <AdminCompanyDetails />
              </Suspense>
            ),
          },
          {
            path: APP_ROUTES.admin.instructors,
            element: (
              <Suspense fallback={<Loader />}>
                <AdminInstructors />
              </Suspense>
            ),
          },
          {
            path: APP_ROUTES.admin.instructorDetails(":id"),
            element: (
              <Suspense fallback={<Loader />}>
                <AdminInstructorDetails />
              </Suspense>
            ),
          },
        ],
      },
    ],
  },
  /* Student Routes */
  {
    element: (
      <Suspense fallback={<PageLoader />}>
        <StudentRoute />
      </Suspense>
    ),
    children: [
      {
        element: <DashboardLayout />,
        children: [
          {
            path: APP_ROUTES.student.dashboard,
            element: (
              <Suspense fallback={<Loader />}>
                <Dashboard />
              </Suspense>
            ),
          },
          {
            path: APP_ROUTES.student.jobs,
            element: (
              <Suspense fallback={<Loader />}>
                <JobsInternshipsDashboard />
              </Suspense>
            ),
          },
          {
            path: APP_ROUTES.student.jobDetails(":id"),
            element: (
              <Suspense fallback={<Loader />}>
                <JobDetails />
              </Suspense>
            ),
          },
          {
            path: APP_ROUTES.student.analytics,
            element: (
              <Suspense fallback={<Loader />}>
                <Analytics />
              </Suspense>
            ),
          },
          {
            path: APP_ROUTES.student.applyJob(":id"),
            element: (
              <Suspense fallback={<Loader />}>
                <ApplyJobPage />
              </Suspense>
            ),
          },
          {
            path: APP_ROUTES.student.profile,
            element: (
              <Suspense fallback={<Loader />}>
                <Profile />
              </Suspense>
            ),
          },
          {
            path: APP_ROUTES.student.messages,
            element: (
              <Suspense fallback={<Loader />}>
                <Messages />
              </Suspense>
            ),
          },

          {
            path: APP_ROUTES.student.search,
            element: (
              <Suspense fallback={<Loader />}>
                <Searchbar />
              </Suspense>
            ),
          },

          {
            path: APP_ROUTES.student.careerChat,
            element: (
              <Suspense fallback={<Loader />}>
                <CareerChat />
              </Suspense>
            ),
          },
          {
            path: APP_ROUTES.student.cvBuilder.dashboard,
            element: (
              <Suspense fallback={<Loader />}>
                <CVDashboard />
              </Suspense>
            ),
          },
          {
            path: APP_ROUTES.student.cvBuilder.templateSelection(":mode"),
            element: (
              <Suspense fallback={<Loader />}>
                <TemplateSelection />
              </Suspense>
            ),
          },
          {
            path: APP_ROUTES.student.cvBuilder.manualBuilder(":templateId"),
            element: (
              <Suspense fallback={<Loader />}>
                <CVBuilderManual />
              </Suspense>
            ),
          },
          {
            path: APP_ROUTES.student.cvBuilder.aiBuilder(":templateId"),
            element: (
              <Suspense fallback={<Loader />}>
                <CVBuilderAI />
              </Suspense>
            ),
          },

          /* Learning */
          {
            path: APP_ROUTES.student.learning,
            element: (
              <Suspense fallback={<Loader />}>
                <Learning />
              </Suspense>
            ),
          },
          {
            path: APP_ROUTES.student.mylearning,
            element: (
              <Suspense fallback={<Loader />}>
                <MyLearning />
              </Suspense>
            ),
          },
          {
            path: APP_ROUTES.Learning.courseDetails,
            element: (
              <Suspense fallback={<Loader />}>
                <LearningDetails />
              </Suspense>
            ),
          },
          {
            path: APP_ROUTES.Learning.continueCourse,
            element: (
              <Suspense fallback={<Loader />}>
                <LearningLesson />
              </Suspense>
            ),
          },
        ],
      },
    ],
  },

  {
    element: <AuthLayout />,
    children: [
      {
        path: APP_ROUTES.auth.login,
        element: (
          <Suspense fallback={<PageLoader />}>
            <AuthFlow initialStep="login" />
          </Suspense>
        ),
      },
      {
        path: APP_ROUTES.auth.signup,
        element: (
          <Suspense fallback={<PageLoader />}>
            <AuthFlow initialStep="signup" />
          </Suspense>
        ),
      },
    ],
  },

  /* Company Routes */
  {
    element: (
      <Suspense fallback={<PageLoader />}>
        <CompanyRoute />
      </Suspense>
    ),
    children: [
      {
        element: <DashboardLayout />,
        children: [
          {
            path: APP_ROUTES.company.dashboard,
            element: (
              <Suspense fallback={<Loader />}>
                <DashboardHome />
              </Suspense>
            ),
          },
          {
            path: APP_ROUTES.company.profile,
            element: (
              <Suspense fallback={<Loader />}>
                <CompanyProfile />
              </Suspense>
            ),
          },
          {
            path: APP_ROUTES.company.postJob,
            element: (
              <Suspense fallback={<Loader />}>
                <PostJob />
              </Suspense>
            ),
          },
          {
            path: APP_ROUTES.company.jobs,
            element: (
              <Suspense fallback={<Loader />}>
                <PostJob />
              </Suspense>
            ),
          },
          {
            path: APP_ROUTES.company.applicants,
            element: (
              <Suspense fallback={<Loader />}>
                <ApplicantsPage />
              </Suspense>
            ),
          },
          {
            path: APP_ROUTES.company.jobApplicants(":id"),
            element: (
              <Suspense fallback={<Loader />}>
                <ApplicantsPage />
              </Suspense>
            ),
          },
        ],
      },
    ],
  },

  /* Public Routes - Accessible to all authenticated users */
  {
    element: (
      <Suspense fallback={<PageLoader />}>
        <PublicRoute />
      </Suspense>
    ),
    children: [
      {
        element: <DashboardLayout />,
        children: [
          {
            path: APP_ROUTES.public.community,
            element: (
              <Suspense fallback={<Loader />}>
                <Community />
              </Suspense>
            ),
          },
          {
            path: APP_ROUTES.public.saved,
            element: (
              <Suspense fallback={<Loader />}>
                <SavedItems />
              </Suspense>
            ),
          },
          {
            path: APP_ROUTES.public.aiAssistant,
            element: (
              <Suspense fallback={<Loader />}>
                <CareerChat />
              </Suspense>
            ),
          },
          {
            path: APP_ROUTES.public.publicProfile(":id"),
            element: (
              <Suspense fallback={<Loader />}>
                <PublicProfile />
              </Suspense>
            ),
          },
          {
            path: APP_ROUTES.public.companyProfile(":id"),
            element: (
              <Suspense fallback={<Loader />}>
                <PublicCompanyProfile />
              </Suspense>
            ),
          },
          {
            path: APP_ROUTES.public.notification,
            element: (
              <Suspense fallback={<Loader />}>
                <Notifications />
              </Suspense>
            ),
          },
          /* Settings */
          {
            path: APP_ROUTES.public.settings,
            element: (
              <Suspense fallback={<Loader />}>
                <SettingsPage />
              </Suspense>
            ),
          },
        ],
      },
    ],
  },

  /* 404 Not Found - Catch all unmatched routes */
  {
    path: "*",
    element: (
      <Suspense fallback={<PageLoader />}>
        <NotFound />
      </Suspense>
    ),
  },
]);

export default router;
