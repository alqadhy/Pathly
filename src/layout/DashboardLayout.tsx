import { Outlet } from "react-router-dom";

// Layout Components
import DashboardHeader from "../components/layout/DashboardHeader";
import Sidebar from "../components/layout/Sidebar";
import Footer from "../components/layout/Footer";

function DashboardLayout() {
  return (
    <>
      <DashboardHeader />
      <div className="flex">
        <Sidebar />
        <div className="w-full lg:w-(--dashboard-container-width) p-6">
          <Outlet />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default DashboardLayout;
