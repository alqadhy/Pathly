// routes/StudentRoute.tsx
import { Navigate, Outlet } from "react-router-dom";
import { APP_ROUTES } from "../constants";
import { ROLES } from "../roles";

const StudentRoute = () => {
  const currentUser = JSON.parse(
    localStorage.getItem("currentUser") || "null"
  );

  if (!currentUser) {
    return <Navigate to={APP_ROUTES.auth.login} replace />;
  }
  if (currentUser.role !== ROLES.USER) {
    if (currentUser.role === ROLES.ADMIN) {
      return <Navigate to={APP_ROUTES.admin.dashboard} replace />;
    }
    if (currentUser.role === ROLES.COMPANY) {
      return <Navigate to={APP_ROUTES.company.profile} replace />;
    }
    if (currentUser.role === ROLES.INSTRUCTOR) {
      return <Navigate to={APP_ROUTES.instructor.myCourses} replace />;
    }
    return <Navigate to={APP_ROUTES.auth.login} replace />;
  }

  return <Outlet />;
};

export default StudentRoute;
