import { createBrowserRouter, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";

// Layouts
import AuthLayout from "../layout/AuthLayout";
import DashboardLayout from "../layout/DashboardLayout";

// Constants
import { APP_ROUTES } from "../constants";

// Loaders
import PageLoader from "../components/layout/PageLoader";
import Loader from "../components/layout/Loader";

// Pages
const Home = lazy(() => import("../pages/Home"));
const Login = lazy(() => import("../pages/auth/Login"));
const Dashboard = lazy(() => import("../pages/student/Dashboard"));
const Analytics = lazy(() => import("../pages/student/AnalyticsDashboard"));
const Community = lazy(() => import("../components/custom/Community/Community"));
const Profiles = lazy(() => import("../components/custom/Community/Profiles"));
const Companies = lazy(() => import("../components/custom/Community/Companies"));

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
    element: <DashboardLayout />,

    children: [
      {
        path: "/student/dashboard",
        element: (
          <Suspense fallback={<Loader />}>
            <Dashboard />
          </Suspense>
        ),
      },
      {
        path: "/student/analytics",
        element: (
          <Suspense fallback={<Loader />}>
            <Analytics />
          </Suspense>
        ),
      },
      {
        path: APP_ROUTES.community.root,
        element: (
          <Suspense fallback={<PageLoader />}>
            <Community />
          </Suspense>
        ),
        children: [
          {
            index: true,
            element: <Navigate to={APP_ROUTES.community.profile} replace />,
          },
          {
            path: "profile",
            element: (
              <Suspense fallback={<PageLoader />}>
                <Profiles />
              </Suspense>
            ),
          },
          {
            path: "companies",
            element: (
              <Suspense fallback={<PageLoader />}>
                <Companies />
              </Suspense>
            ),
          },
        ],
      },
    ],
  },

  // Auth Routes
  {
    element: <AuthLayout />,

    children: [
      {
        path: "/auth/login",
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
