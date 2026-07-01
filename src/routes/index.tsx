import {
  createBrowserRouter,
} from "react-router-dom";

import {
  lazy,
  Suspense,
} from "react";

// Layouts
import AuthLayout from "../layout/AuthLayout";
import DashboardLayout from "../layout/DashboardLayout";

// Loaders
import PageLoader from "../components/layout/PageLoader";
import Loader from "../components/layout/Loader";

// Pages
const Home = lazy(
  () => import("../pages/Home")
);

const AuthFlow = lazy(
  () =>
    import(
      "../pages/Auth/AuthFlow"
    )
);

const Dashboard = lazy(
  () =>
    import(
      "../pages/student/Dashboard"
    )
);

const Analytics = lazy(
  () =>
    import(
      "../pages/student/AnalyticsDashboard"
    )
);

const router =
  createBrowserRouter([
    // HOME
    {
      path: "/",

      element: (
        <Suspense
          fallback={
            <PageLoader />
          }
        >
          <Home />
        </Suspense>
      ),
    },

    // DASHBOARD
    {
      element:
        <DashboardLayout />,

      children: [
        {
          path:
            "/student/dashboard",

          element: (
            <Suspense
              fallback={
                <Loader />
              }
            >
              <Dashboard />
            </Suspense>
          ),
        },

        {
          path:
            "/student/analytics",

          element: (
            <Suspense
              fallback={
                <Loader />
              }
            >
              <Analytics />
            </Suspense>
          ),
        },
      ],
    },

    // AUTH
    {
      path: "/auth",

      element: <AuthLayout />,

      children: [
        {
          index: true,

          element: (
            <Suspense
              fallback={
                <PageLoader />
              }
            >
              <AuthFlow
                initialStep="login"
              />
            </Suspense>
          ),
        },

        {
          path: "sign-up",

          element: (
            <Suspense
              fallback={
                <PageLoader />
              }
            >
              <AuthFlow
                initialStep="signup"
              />
            </Suspense>
          ),
        },
      ],
    },
  ]);

export default router;