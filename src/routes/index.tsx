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
const AuthFlow = lazy(() => import("../pages/Auth/AuthFlow"));
const Dashboard = lazy(() => import("../pages/student/Dashboard"));
const Analytics = lazy(() => import("../pages/student/AnalyticsDashboard"));
const SignUp = lazy(() => import("../components/custom/auth/SignUp"));

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
    ],
  },

  // Auth Routes
{
  path: "/auth",
  element: <AuthLayout />,
  children: [
    {
      index: true,
      element: (
        <Suspense fallback={<Loader />}>
          <AuthFlow />
        </Suspense>
      ),
    },
        {
      path: "/auth/sign-up",
      element: (
        <Suspense fallback={<Loader />}>
          <SignUp />
        </Suspense>
      ),
    },
  ],
},

]);

export default router;
