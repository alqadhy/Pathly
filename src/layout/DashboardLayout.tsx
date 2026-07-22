import { useEffect } from "react";
import { Outlet, useLocation, ScrollRestoration } from "react-router-dom";

// Layout Components
import DashboardHeader from "../components/layout/DashboardHeader";
import Sidebar from "../components/layout/Sidebar";
import Footer from "../components/layout/Footer";
import ScrollToTop from "../components/layout/ScrollToTop";

function DashboardLayout() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <ScrollRestoration />
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
