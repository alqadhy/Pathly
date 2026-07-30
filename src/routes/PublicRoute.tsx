import { Navigate, Outlet } from "react-router-dom";
import { APP_ROUTES } from "../constants";
import { ROLES } from "../roles";

const PublicRoute = () => {
  const currentUser = JSON.parse(
    localStorage.getItem("currentUser") || "null"
  );

  if (!currentUser) {
    return <Navigate to={APP_ROUTES.auth.login} replace />;
  }

  // Allow access for admin, company, and student roles
  if (
    currentUser.role !== ROLES.ADMIN &&
    currentUser.role !== ROLES.COMPANY &&
    currentUser.role !== ROLES.USER
  ) {
    return <Navigate to={APP_ROUTES.auth.login} replace />;
  }

  return <Outlet />;
};

export default PublicRoute;