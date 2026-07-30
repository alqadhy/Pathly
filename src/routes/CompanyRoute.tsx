// routes/CompanyRoute.tsx
import { Navigate, Outlet } from "react-router-dom";
import { APP_ROUTES } from "../constants";
import { ROLES } from "../roles";

const CompanyRoute = () => {
  const currentUser = JSON.parse(
    localStorage.getItem("currentUser") || "null"
  );

  if (!currentUser) {
    return <Navigate to={APP_ROUTES.auth.login} replace />;
  }

  if (currentUser.role !== ROLES.COMPANY) {
    if (currentUser.role === ROLES.ADMIN) {
      return <Navigate to={APP_ROUTES.admin.dashboard} replace />;
    }
    if (currentUser.role === ROLES.USER) {
      return <Navigate to={APP_ROUTES.student.dashboard} replace />;
    }
    if (currentUser.role === ROLES.INSTRUCTOR) {
      return <Navigate to={APP_ROUTES.instructor.dashboard} replace />;
    }
    return <Navigate to={APP_ROUTES.auth.login} replace />;
  }

  return <Outlet />;
};
export default CompanyRoute;
