import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "@/assets/imgs/logo.png";

const navLinks = [
  { label: "Home",     href: "#home" },
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Courses",  href: "#courses" },
  { label: "Network",  href: "#network" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
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
       
        <a href="/" className="flex items-center gap-2.5 shrink-0">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center overflow-hidden bg-primary">
            <img src={logo} alt="Pathly" className="w-6 h-6 object-contain" />
          </div>
          <span className="font-bold text-darker text-h5-size">Pathly</span>
        </a>

     
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="px-4 py-2 rounded-lg font-medium text-darker hover:text-primary hover:bg-primary/5 transition-all duration-fast text-body-md"
            >
              {link.label}
            </a>
          ))}
        </nav>

   
        <div className="flex items-center gap-3">
          <Button
            onClick={() => navigate("/auth/login")}
            className="cursor-pointer hidden sm:inline-flex rounded-full font-semibold px-6 text-white h-10"
            style={{
              backgroundColor: "var(--primary)",
              fontSize: "var(--body-sm)",
            }}
          >
            Get Started
          </Button>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden w-10 h-10 rounded-full flex items-center justify-center text-dark hover:bg-light transition-colors"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

    
      {menuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-xl border-b border-light-active z-50 px-4 py-5 space-y-1">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="block px-4 py-3 rounded-xl font-medium text-dark hover:text-primary hover:bg-primary/5 transition-colors text-body-md"
            >
              {link.label}
            </a>
          ))}

          <div className="pt-4 pb-1">
            <Button
              onClick={() => {
                setMenuOpen(false);
                navigate("/auth/login");
              }}
              className="w-full rounded-full font-semibold text-white bg-primary hover:bg-primary-hover h-12"
            >
              Get Started
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}