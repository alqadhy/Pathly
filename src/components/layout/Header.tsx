// Components
import { Link } from "react-router-dom";
import Searchbar from "../custom/Searchbar";
import IconButton from "../custom/IconButton";

// Icons
import { Bell, MessagesSquare } from "lucide-react";

// Constants
import { APP_ROUTES } from "../../constants";

// Logo
import logo from "../../assets/imgs/logo.png";

function Header() {
  return (
    <header className="h-(--header-height) bg-card px-8 flex justify-between items-center">
      <div className="flex items-center gap-16">
        <Link to={APP_ROUTES.home} className="w-[33px]">
          <img src={logo} alt="Pathly" />
        </Link>

        <Searchbar />
      </div>

      <div className="flex items-center gap-5">
        <IconButton>
          <Bell />
        </IconButton>
        <IconButton>
          <MessagesSquare />
        </IconButton>
      </div>
    </header>
  );
}

export default Header;
