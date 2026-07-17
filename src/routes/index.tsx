import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";

// Layouts
import AuthLayout from "../layout/AuthLayout";
import DashboardLayout from "../layout/DashboardLayout";

// Constants
import { APP_ROUTES } from "../constants";

// Loaders
import PageLoader from "../components/layout/PageLoader";
import Loader from "../components/layout/Loader";
import CareerChat from "../pages/student/CareerChat";
import PublicProfile from "../pages/student/PublicProfile";

// Pages
const Home = lazy(() => import("../pages/Home"));
const Dashboard = lazy(() => import("../pages/student/Dashboard"));
const Analytics = lazy(() => import("../pages/student/AnalyticsDashboard"));
const JobsInternshipsDashboard = lazy(
  () => import("../pages/student/Jobs-Internships"),
);

const JobDetails = lazy(() => import("../pages/student/JobDetails"));
const ApplyJobPage = lazy(() => import("../pages/student/ApplyJobPage"));
const SavedItems = lazy(() => import("../pages/student/SavedItems"));
const AuthFlow = lazy(() => import("../pages/Auth/AuthFlow"));
const Community = lazy(() => import("../pages/student/Community"));
const Profile = lazy(() => import("../pages/student/Profile"));
const Messages = lazy(() => import("../pages/student/Messages"));
const CVBuilderAI = lazy(() => import("../pages/student/cv/CVBuilderAI"));
const CVBuilderManual = lazy(
  () => import("../pages/student/cv/CVBuilderManual"),
);
const TemplateSelection = lazy(
  () => import("../pages/student/cv/TempleteSelection"),
);
const CVDashboard = lazy(() => import("../pages/student/cv/CVDashboard"));

const router = createBrowserRouter([
  // Landing Page
  {
    path: APP_ROUTES.home,
    element: (
      <Suspense fallback={<PageLoader />}>
        <Home />
      </Suspense>
    ),
  },

  // Student Dashboard Routes
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
        path: APP_ROUTES.student.analytics,
        element: (
          <Suspense fallback={<Loader />}>
            <Analytics />
          </Suspense>
        ),
      },
      {
        path: APP_ROUTES.student.saved,
        element: (
          <Suspense fallback={<Loader />}>
            <SavedItems />
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
        path: APP_ROUTES.student.applyJob(":id"),
        element: (
          <Suspense fallback={<Loader />}>
            <ApplyJobPage />
          </Suspense>
        ),
      },
      {
        path: APP_ROUTES.student.community,
        element: (
          <Suspense fallback={<Loader />}>
            <Community />
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
        path: APP_ROUTES.student.publicProfile(":id"),
        element: (
          <Suspense fallback={<Loader />}>
            <PublicProfile />
          </Suspense>
        ),
      },
      {
        path: APP_ROUTES.student.aiAssistant,
        element: (
          <Suspense fallback={<Loader />}>
            <CareerChat />
          </Suspense>
        ),
      },
      {
        path: APP_ROUTES.student.messages,
        element: (
          <Suspense fallback={<Loader />}>
            <Messages  />
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
    ],
  },

  // Auth Routes
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

  // Auth Routes
  {
    element: <AuthLayout />,

    children: [
      {
        path: APP_ROUTES.auth.login,
        element: (
          <Suspense fallback={<Loader />}>
            <AuthFlow initialStep="login" />
          </Suspense>
        ),
      },
      {
        path: APP_ROUTES.auth.signup,

        element: (
          <Suspense fallback={<Loader />}>
            <AuthFlow initialStep="signup" />
          </Suspense>
        ),
      },
    ],
  },
]);

export default router;