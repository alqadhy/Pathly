import { Outlet } from "react-router-dom";

// Layout Components
import Sidebar from "../components/layout/Sidebar";

function StudentDashboardLayout() {
  return (
    <>
      <Sidebar />
      <Outlet />
    </>
  );
}

export default StudentDashboardLayout;
