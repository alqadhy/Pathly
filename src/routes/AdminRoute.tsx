import { Navigate, Outlet } from "react-router-dom";
import { APP_ROUTES } from "../constants";
import { ROLES } from "../roles";

const AdminRoute = () => {
  const currentUser = JSON.parse(
    localStorage.getItem("currentUser") || "null"
  );

  if (!currentUser) {
    return <Navigate to={APP_ROUTES.auth.login} replace />;
  }

  if (currentUser.role !== ROLES.ADMIN) {
    return (
      <Navigate
        to={APP_ROUTES.admin.dashboard}
        replace
      />
    );
  }

  return <Outlet/>;
};

export default AdminRoute;
