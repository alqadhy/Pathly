import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

import authBg from "../assets/imgs/auth_bg.png";

import PageLoader from "../components/layout/PageLoader";

function AuthLayout() {
  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const timer =
      setTimeout(() => {
        setLoading(false);
      }, 1000);

    return () =>
      clearTimeout(timer);
  }, []);

  return (
    <>
      {loading && <PageLoader />}

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
        <div
          className="
            w-full
            bg-overlay/75
            shadow-card
            backdrop-blur-[2px]
            flex
            flex-col
            items-center
            gap-8
            sm:flex-row
            sm:justify-center
            sm:rounded-xl
            sm:px-20
            sm:py-16
            sm:max-w-[1500px]
            md:px-5
            md:py-5
            lg:justify-between
          "
        >
          {!loading && <Outlet />}
        </div>
      </div>
    </>
  );
}

export default AuthLayout;