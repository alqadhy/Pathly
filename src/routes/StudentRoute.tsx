// routes/StudentRoute.tsx
import { Navigate, Outlet } from "react-router-dom";
import { APP_ROUTES } from "../constants";

const StudentRoute = () => {
  const currentUser = JSON.parse(
    localStorage.getItem("currentUser") || "null"
  );

  if (!currentUser) {
    return <Navigate to={APP_ROUTES.auth.login} replace />;
  }

  if (currentUser.role !== "user") {
    if (currentUser.role === "admin") {
      return <Navigate to={APP_ROUTES.Admin.adminDashboard} replace />;
    }
    if (currentUser.role === "company") {
      return <Navigate to={APP_ROUTES.company.profile} replace />;
    }
    return <Navigate to={APP_ROUTES.auth.login} replace />;
  }

  return <Outlet />;
};

export default StudentRoute;