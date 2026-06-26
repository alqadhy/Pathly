import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";

// Layouts
import MainLayout from "../layout/MainLayout";
import AuthLayout from "../layout/AuthLayout";
import StudentDashboardLayout from "../layout/StudentDashboardLayout";

// Page Loader
import PageLoader from "../components/layout/PageLoader";

// Pages
const Home = lazy(() => import("../pages/Home"));
const Login = lazy(() => import("../pages/auth/Login"));
const Dashboard = lazy(() => import("../pages/student/Dashboard"));

const router = createBrowserRouter([
  // Home + Dashboard Routes
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<PageLoader />}>
            <Home />
          </Suspense>
        ),
      },
      {
        element: <StudentDashboardLayout />,
        children: [
          {
            path: "/student/dashboard",
            element: (
              <Suspense fallback={<PageLoader />}>
                <Dashboard />
              </Suspense>
            ),
          },
          {
            path: "/student/courses",
            element: (
              <Suspense fallback={<PageLoader />}>{/* <Courses /> */}</Suspense>
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
          <Suspense fallback={<PageLoader />}>
            <Login />
          </Suspense>
        ),
      },
    ],
  },
]);

export default router;
