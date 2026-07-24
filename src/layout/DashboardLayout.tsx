import { useEffect } from "react";
import { Outlet, useLocation, ScrollRestoration } from "react-router-dom";

// Layout Components
import DashboardHeader from "../components/layout/DashboardHeader";
import Sidebar from "../components/layout/Sidebar";

function DashboardLayout() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <ScrollRestoration />
      <DashboardHeader />
      <div className="flex flex-1">
        <Sidebar />
        
        <div className="flex flex-col flex-1 w-full lg:w-(--dashboard-container-width)">
          <div className="p-6 flex-1">
            <Outlet />
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;
