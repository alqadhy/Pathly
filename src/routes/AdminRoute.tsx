import { Navigate, Outlet } from "react-router-dom";
import { APP_ROUTES } from "../constants";

const AdminRoute = () => {
  const currentUser = JSON.parse(
    localStorage.getItem("currentUser") || "null"
  );

  console.log("Current User:", currentUser);
  console.log("Role:", currentUser?.role);

  if (!currentUser) {
    return <Navigate to={APP_ROUTES.auth.login} replace />;
  }

  if (currentUser.role !== "admin") {
    console.log("Not Admin");
    return (
      <Navigate
        to={APP_ROUTES.student.dashboard}
        replace
      />
    );
  }

  console.log("Admin");
  return <Outlet/>;
};


export default AdminRoute;