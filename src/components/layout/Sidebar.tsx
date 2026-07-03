// Components
import { Link } from "react-router-dom";

// Constants
import { SIDEBAR_LINKS, SLOGAN } from "../../constants";

// Hooks
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// State Management
import { useSidebarStore } from "../../store/sidebar.store";

// Logo
import logo from "../../assets/imgs/logo.png";


function Sidebar() {
  const route = useLocation().pathname;
  const { isOpen, close } = useSidebarStore();

  useEffect(() => close(), [route]);

  return (
    <aside
      className={`bg-background w-(--sidebar-width) h-[calc(100vh-var(--header-height))] p-6 border-r border-input fixed top-(--header-height) left-0 z-(--z-fixed) overflow-y-auto -translate-x-full transition lg:static lg:z-1 lg:h-auto lg:py-25 lg:translate-x-0 ${isOpen && "translate-x-0"}`}
    >
      <div className="w-full grid gap-6">
        <div className="flex items-center gap-2 lg:hidden">
          <img src={logo} alt={SLOGAN} className="w-10!" />
          <h3>Pathly</h3>
        </div>
        {SIDEBAR_LINKS.student.map(({ id, title, links }) => (
          <div className="group" key={id}>
            <span className="text-text-light">{title}</span>
            <div className="grid gap-4 mt-4">
              {links.map(({ text, to, icon }) => (
                <Link
                  key={text}
                  to={to}
                  title={text}
                  className={`px-4 py-3 flex gap-2 rounded-lg transition ${route == to ? "bg-light shadow-sm" : "hover:bg-light-hover hover:text-primary"}`}
                >
                  {icon} {text}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}

export default Sidebar;
