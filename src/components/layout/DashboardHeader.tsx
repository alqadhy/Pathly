// Components
import { Link } from "react-router-dom";
import IconButton from "../custom/IconButton";
import Searchbar from "../custom/Searchbar";
import UserAvatar from "../custom/UserAvatar";

// Icons
import { Bell, Menu, MessagesSquare, Search } from "lucide-react";

// Constants
import { APP_ROUTES, SLOGAN } from "../../constants";

// Logo
import logo from "../../assets/imgs/logo.png";

function DashboardHeader() {
  return (
    <header className="bg-card h-(--header-height) px-4 flex justify-between md:px-8">
      <div className="flex items-center gap-4 lg:gap-5">
        <IconButton title="Toggle sidebar" className="lg:hidden">
          <Menu />
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
        <IconButton title="Notifications">
          <Bell />
        </IconButton>
        <IconButton title="Messages">
          <MessagesSquare />
        </IconButton>
        <UserAvatar />
      </div>
    </header>
  );
}

export default DashboardHeader;
