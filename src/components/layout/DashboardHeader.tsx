// Components
import { Link } from "react-router-dom";
import IconButton from "../custom/IconButton";
import Searchbar from "../custom/search/Searchbar";
import UserAvatar from "../custom/UserAvatar";

// Icons
import { Bell, Menu, MessagesSquare, Search, X } from "lucide-react";

// Constants
import { APP_ROUTES, SLOGAN } from "../../constants";

// Hooks
import { useState, useEffect } from "react";

// State Management
import { useSidebarStore } from "../../store/sidebar.store";

// Logo
import logo from "../../assets/imgs/logo.png";

import { useNotifications } from "../../hooks/useNotifications";


function DashboardHeader() {
  const { unreadCount } = useNotifications();
  const [isScrolled, setIsScrolled] = useState(false);
  const { isOpen, open, close } = useSidebarStore();

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
        <Link
          to={APP_ROUTES.student.dashboard}
          title={SLOGAN}
          className="hidden lg:block"
        >
          <img src={logo} alt={SLOGAN} className="h-10" />
        </Link>
        <Searchbar />
      </div>

      <div className="flex items-center gap-3">
        <IconButton title="Search" className="md:hidden">
          <Search />
        </IconButton>

        <Link to={APP_ROUTES.student.notification}>
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

        <Link to={APP_ROUTES.student.messages}>
          <IconButton title="Messages">
            <MessagesSquare />
          </IconButton>
        </Link>
        <Link to={APP_ROUTES.student.profile}>
          <UserAvatar />
        </Link>
      </div>
    </header>
  );
}

export default DashboardHeader;
