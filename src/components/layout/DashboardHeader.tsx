// Components
import { Link } from "react-router-dom";
import IconButton from "../custom/IconButton";
import Searchbar from "../custom/search/Searchbar";
import UserAvatar from "../custom/UserAvatar";

// Icons
import { Bell, Menu, MessagesSquare, Search, X, LogOut, User, Home } from "lucide-react";

// Constants
import { APP_ROUTES, SLOGAN } from "../../constants";

// Hooks
import { useState, useEffect } from "react";

// State Management
import { useSidebarStore } from "../../store/sidebar.store";

// Logo
import logo from "../../assets/imgs/logo.png";
import { getCurrentUser } from "../custom/Profile/crud/profileStorage";
import { ROLES } from "../../roles";

import { useNotifications } from "../../hooks/useNotifications";

function DashboardHeader() {
  const { unreadCount } = useNotifications();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { isOpen, open, close } = useSidebarStore();
  // const navigate = useNavigate();

  const currentUser = getCurrentUser();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  // const handleuserProfileClick = () => {
  //   if (currentUser) {
  //     if (currentUser.role === "student") {
  //       navigate(APP_ROUTES.student.dashboard);
  //     } else if (currentUser.role === "company") {
  //       navigate(APP_ROUTES.company.dashboard);
  //     }
  //   } else {
  //     navigate(APP_ROUTES.auth.login);
  //   }
  // };

  function toggleSidebar() {
    if (isOpen) close();
    else open();
  }

  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 10);
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`${isScrolled ? "bg-transparent backdrop-blur-md shadow-sm" : "bg-card"} h-(--header-height) px-4 flex justify-between sticky top-0 z-(--z-sticky) md:px-8`}
    >
      <div className="flex items-center gap-4 lg:gap-5">
        <IconButton
          title="Toggle sidebar"
          className="lg:hidden"
          onClickFn={toggleSidebar}
        >
          {isOpen ? <X /> : <Menu />}
        </IconButton>
        {currentUser?.role === ROLES.COMPANY && (
          <Link
            to={APP_ROUTES.company.dashboard}
            title={SLOGAN}
            className="hidden lg:block"
          >
            <img src={logo} alt={SLOGAN} className="h-10" />
          </Link>
        )}
        {currentUser?.role === ROLES.USER && (
          <Link
            to={APP_ROUTES.student.dashboard}
            title={SLOGAN}
            className="hidden lg:block"
          >
            <img src={logo} alt={SLOGAN} className="h-10" />
          </Link>
        )}
        {currentUser?.role === ROLES.ADMIN && (
          <Link
            to={APP_ROUTES.admin.dashboard}
            title={SLOGAN}
            className="hidden lg:block"
          >
            <img src={logo} alt={SLOGAN} className="h-10" />
          </Link>
        )}

        <Searchbar />
      </div>

      <div className="flex items-center gap-3">
        <IconButton title="Search" className="md:hidden">
          <Search />
        </IconButton>

        <Link to={APP_ROUTES.public.notification}>
          <div className="relative">
            <IconButton title="Notifications">
              <Bell />
            </IconButton>

            {unreadCount > 0 && (
              <span
                className="
                  absolute
                  -right-1
                  -top-1
                  flex
                  h-5
                  min-w-5
                  items-center
                  justify-center
                  rounded-full
                  bg-red-500
                  px-1
                  text-[10px]
                  font-bold
                  text-white
                  shadow-md
                "
              >
                {unreadCount > 99 ? "99+" : unreadCount}
              </span>
            )}
          </div>
        </Link>

        {currentUser?.role === ROLES.USER && (
          <Link to={APP_ROUTES.student.messages}>
            <IconButton title="Messages">
              <MessagesSquare />
            </IconButton>
          </Link>
        )}

        {/* User Avatar with Dropdown */}
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="flex items-center"
            title="User menu"
          >
            {currentUser?.role === ROLES.COMPANY && <UserAvatar />}
            {currentUser?.role === ROLES.USER && <UserAvatar />}
            {currentUser?.role === ROLES.ADMIN && <UserAvatar />}
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={closeDropdown}
              ></div>
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-20 py-2">
                {/* Profile Link */}
                <Link
                  to={
                    currentUser?.role === ROLES.COMPANY
                      ? APP_ROUTES.company.profile
                      : currentUser?.role === ROLES.USER
                      ? APP_ROUTES.student.profile
                      : APP_ROUTES.admin.dashboard
                  }
                  className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                  onClick={closeDropdown}
                >
                  <User size={18} />
                  <span>Profile</span>
                </Link>

                {/* Home Link */}
                <Link
                  to={APP_ROUTES.home}
                  className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                  onClick={closeDropdown}
                >
                  <Home size={18} />
                  <span>landing page</span>
                </Link>

                {/* Logout Button */}
                <button
                  onClick={() => {
                    localStorage.removeItem("currentUser");
                    closeDropdown();
                    window.location.href = APP_ROUTES.auth.login;
                  }}
                  className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-gray-100 transition-colors w-full"
                >
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default DashboardHeader;
