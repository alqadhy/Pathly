import { Outlet } from "react-router-dom";

// Layout Components

import Footer from "../components/layout/Footer";

function MainLayout() {
  return (
    <>
      
      <Outlet />
      <Footer />
    </>
  );
}

export default MainLayout;
