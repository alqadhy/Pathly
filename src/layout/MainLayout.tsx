import { Outlet } from "react-router-dom";

// Layout Components
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

function MainLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default MainLayout;
