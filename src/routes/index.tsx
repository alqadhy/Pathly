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
import Global from "../pages/student/message";

// Pages
const Home = lazy(() => import("../pages/Home"));
const Login = lazy(() => import("../pages/auth/Login"));
const Dashboard = lazy(() => import("../pages/student/Dashboard"));
const Analytics = lazy(() => import("../pages/student/AnalyticsDashboard"));
const Community = lazy(() => import("../pages/student/Community"));
const Profile = lazy(() => import("../pages/student/Profile"));


const router = createBrowserRouter([
  // Landing Page
  {
    path: "/",
    element: (
      <Suspense fallback={<PageLoader />}>
        <Home />
      </Suspense>
    ),
  },

  // Student Dashboard Routes
  {
    path: APP_ROUTES.student.base,
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
        path: APP_ROUTES.student.analytics,
        element: (
          <Suspense fallback={<Loader />}>
            <Analytics />
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
            <Global />
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
            <Login />
          </Suspense>
        ),
      },
    ],
  },
]);

export default router;
