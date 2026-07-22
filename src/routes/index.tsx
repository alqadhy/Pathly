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

/* Lazy Pages */
const Home = lazy(() => import("../pages/Home"));

const Dashboard = lazy(() => import("../pages/student/Dashboard"));
const AdminDashboard = lazy(() => import("../components/custom/Admin/AdminDashboard"));
const Analytics = lazy(() => import("../pages/student/AnalyticsDashboard"));
const JobsInternshipsDashboard = lazy(
  () => import("../pages/student/Jobs-Internships")
);
const JobDetails = lazy(() => import("../pages/student/JobDetails"));
const SavedItems = lazy(() => import("../pages/student/SavedItems"));
const Community = lazy(() => import("../pages/student/Community"));
const Profile = lazy(() => import("../pages/student/Profile"));
const Messages = lazy(() => import("../pages/student/Messages"));
const AdminRoute = lazy(() => import("./AdminRoute"));

const Learning = lazy(
  () => import("../pages/Lessons/Learning")
);

const MyLearning = lazy(
  () => import("../pages/Lessons/MyLearning")
);

const LearningDetails = lazy(
  () => import("../pages/Lessons/LearningDetails")
);

const LearningLesson = lazy(
  () => import("../pages/Lessons/LearningLesson")
);

const CVDashboard = lazy(
  () => import("../pages/student/cv/CVDashboard")
);

const TemplateSelection = lazy(
  () => import("../pages/student/cv/TempleteSelection")
);

const CVBuilderManual = lazy(
  () => import("../pages/student/cv/CVBuilderManual")
);

const CVBuilderAI = lazy(
  () => import("../pages/student/cv/CVBuilderAI")
);

const AuthFlow = lazy(
  () => import("../pages/Auth/AuthFlow")
);

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

  /*admin */
{
    element: (
      <Suspense fallback={<PageLoader />}>
        <AdminRoute />
      </Suspense>
    ),
    children: [
      {
        path: APP_ROUTES.Admin.adminDashboard,
        element: (
          <Suspense fallback={<Loader />}>
            <AdminDashboard />
          </Suspense>
        ),
      },
    ],
  },

  /* DASHBOARD */
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
        path: APP_ROUTES.student.saved,
        element: (
          <Suspense fallback={<Loader />}>
            <SavedItems />
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
        path: APP_ROUTES.student.messages,
        element: (
          <Suspense fallback={<Loader />}>
            <Messages />
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
        path: APP_ROUTES.student.publicProfile(":id"),
        element: (
          <Suspense fallback={<Loader />}>
            <PublicProfile />
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

  /* AUTH */
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
]);

export default router;