import { Outlet } from "react-router-dom";
import authBg from "../assets/imgs/auth_bg.png";

function AuthLayout() {
  return (
    <div
      className="  
      min-h-screen
    w-full
    bg-top
    bg-repeat-y
    md:bg-cover
    md:bg-center
    md:bg-no-repeat
    flex
    justify-center
    md:items-center
    sm:px-6
    lg:px-16
    sm:py-8
    lg:py-8
    "
      style={{
        backgroundImage: `url(${authBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Overlay */}
            <div
        className="
          w-full
          bg-overlay/75
          shadow-card
          backdrop-blur-[2px]
          flex
          flex-col
          sm:flex-row
          items-center
          gap-8
          sm:rounded-xl
          sm:max-w-[1500px]
          sm:px-20
          sm:py-16
          md:py-5
          md:px-5
          sm:justify-center
          lg:justify-between
        "
      >
        <Outlet />
      </div>
      </div>
  );
}

export default AuthLayout;