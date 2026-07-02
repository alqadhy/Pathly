import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";

// Layouts
import AuthLayout from "../layout/AuthLayout";
import DashboardLayout from "../layout/DashboardLayout";

// Loaders
import PageLoader from "../components/layout/PageLoader";
import Loader from "../components/layout/Loader";

// Pages
const Home = lazy(() => import("../pages/Home"));
const Login = lazy(() => import("../pages/auth/Login"));
const Dashboard = lazy(() => import("../pages/student/Dashboard"));
const Analytics = lazy(() => import("../pages/student/AnalyticsDashboard"));
const SavedItems = lazy(() => import("../pages/student/SavedItems"));

// Constants
import { APP_ROUTES } from "../constants";

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
