import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <div
      className={`bg-[url("../assets/imgs/auth_bg.png")] bg-no-repeat bg-center bg-cover min-h-screen flex justify-center items-center`}
    >
      <div className="bg-overlay/75 rounded-lg shadow-card overflow-hidden">
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;
