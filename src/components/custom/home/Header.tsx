import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../../ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "@/assets/imgs/logo.png";
import { APP_ROUTES } from "../../../constants";
import {
  getCurrentUser,
  clearCurrentUser,
} from "../../../components/custom/Profile/crud/profileStorage";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Courses", href: "#courses" },
  { label: "Network", href: "#network" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const currentUser = getCurrentUser();

  const handleuserProfileClick = () => {
    if (currentUser) {
      if (currentUser.role === "employee") {
        navigate(APP_ROUTES.student.profile);
      } else if (currentUser.role === "company") {
        navigate(APP_ROUTES.company.profile);
      }
    } else {
      navigate(APP_ROUTES.auth.login);
    }
  };

  const handleLogout = () => {
    clearCurrentUser();
    navigate("/");
    setMenuOpen(false);
  };

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault();

    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 300);
    } else {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }

    setMenuOpen(false);
  };

  return (
    <header className="w-full sticky top-0 z-50 border-b border-light-active bg-white h-[var(--header-height)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
        <Link
          to={APP_ROUTES.home}
          className="flex items-center gap-2.5 shrink-0"
        >
          <img src={logo} alt="Pathly" className="w-8 h-8 object-contain" />
          <span className="font-bold text-darker text-xl">Pathly</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="px-4 py-2 rounded-lg font-medium text-darker hover:text-primary hover:bg-primary/5 transition-all duration-fast text-body-md"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Button
            onClick={handleuserProfileClick}
            className="cursor-pointer hidden sm:inline-flex rounded-full font-semibold px-6 text-white h-10"
            style={{
              backgroundColor: "var(--primary)",
              fontSize: "var(--body-sm)",
            }}
          >
            {currentUser ? "My Account" : "Get Started"}
          </Button>
          {currentUser && (
            <Button
              onClick={handleLogout}
              className="cursor-pointer hidden sm:inline-flex rounded-full font-semibold px-6 text-white h-10"
              style={{
                backgroundColor: "#ef4444",
                fontSize: "var(--body-sm)",
              }}
            >
              Logout
            </Button>
          )}

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden w-10 h-10 rounded-full flex items-center justify-center text-dark hover:bg-light transition-colors"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white shadow-xl border-b border-light-active z-50 px-4 py-5 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="block px-4 py-3 rounded-xl font-medium text-dark hover:text-primary hover:bg-primary/5 transition-colors text-body-md"
            >
              {link.label}
            </Link>
          ))}

          <div className="pt-4 pb-1 space-y-2">
            {currentUser && (
              <Button
                onClick={handleLogout}
                className="w-full rounded-full font-semibold text-white bg-red-500 hover:bg-red-600 h-12"
              >
                Logout
              </Button>
            )}
            <Button
              onClick={() => {
                setMenuOpen(false);
               {handleuserProfileClick}
              }}
              className="w-full rounded-full font-semibold text-white bg-primary hover:bg-primary-hover h-12"
            >
              {currentUser ? "My Account" : "Get Started"}
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
