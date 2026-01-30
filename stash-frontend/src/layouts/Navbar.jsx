import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";
import Button from "../utils/ui/Buttons/Button";
import logoDark from "/logo/stash-logo-dark.png";
import logoLight from "/logo/stash-logo-light.jpg";
import { ToggleMode } from "../utils/ui/Buttons/ThemeToggleBtn";
import { Home, Info, Menu, X, ContactRound, BookOpenText } from "lucide-react";

function Navbar() {
  const { theme } = useTheme();
  const [openMenu, setOpenMenu] = useState(false);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (openMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [openMenu]);

  const openMobileMenu = () => {
    setOpenMenu((prev) => !prev);
  };

  const navLinks = [
    { label: "Home", icon: <Home size={17} />, href: "/" },
    { label: "Docs", icon: <BookOpenText size={17} />, href: "/docs" },
    { label: "About", icon: <Info size={17} />, href: "/about" },
    { label: "Contact", icon: <ContactRound size={17} />, href: "/contact" },
  ];

  const textPrimary = "text-text-light-primary dark:text-text-dark-primary";

  return (
    <>
      {/* Main Navbar */}
      <nav className="w-[calc(100%)] fixed top-0 left-0 z-50 bg-bg-light-primary dark:bg-bg-dark-primary border-b border-border-light dark:border-border-dark">
        <div className="w-full p-3">
          <div className="w-full flex justify-between items-center">
            {/* Logo and navigation links */}
            <div className="flex 2xl:w-[30rem] items-center">
              {/* Logo */}
              <Link to="/">
                <div className="flex items-center gap-3">
                  <span>
                    {theme === "dark" ? (
                      <img
                        className="md:w-6 w-5"
                        src={logoDark}
                        alt="stash-logo"
                      />
                    ) : (
                      <img
                        className="md:w-6 w-5"
                        src={logoLight}
                        alt="stash-logo"
                      />
                    )}
                  </span>
                  <span
                    className={`${textPrimary} font-medium lg:text-md md:text-lg`}
                  >
                    Stash
                  </span>
                </div>
              </Link>

              {/* Desktop Navigation links */}
              <div className="hidden md:flex ml-4 items-center">
                <ul
                  className={`${textPrimary} flex cursor-pointer text-sm transition-all duration-150`}
                >
                  {navLinks.map((nav, id) => (
                    <li className="flex" key={id}>
                      <a
                        href={nav.href}
                        className="px-3 text-[1rem] hover:text-primary transition-colors"
                      >
                        {nav.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Desktop Authentication links */}
            <div className="hidden md:flex 2xl:w-56 lg:w-48 items-center justify-between">
              <ToggleMode />
              <div className="flex gap-3 items-center cursor-pointer">
                <Link to="/login">
                  <span
                    className={`${textPrimary} hover:text-primary transition-colors`}
                  >
                    Login
                  </span>
                </Link>
                <Link to="/register">
                  <Button text="Register" />
                </Link>
              </div>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={openMobileMenu}
              className="md:hidden dark:text-text-dark-primary text-text-light-primary z-50"
              aria-label="Toggle menu"
            >
              {openMenu ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {openMenu && (
        <div className="fixed inset-0 z-40 md:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={openMobileMenu}
          />

          {/* Menu Content */}
          <div className="absolute top-[3.5rem] left-0 right-0 bottom-0 bg-bg-light-primary dark:bg-bg-dark-primary border-t border-border-light dark:border-border-dark overflow-y-auto">
            <div className="p-3 w-full">
              <ul className="flex flex-col px-3 py-4 gap-2 border-b border-border-light dark:border-border-dark">
                {navLinks.map((nav, id) => (
                  <li key={id} className="flex gap-3 py-1.5">
                    <div className={textPrimary}>{nav.icon}</div>
                    <a
                      href={nav.href}
                      onClick={() => setOpenMenu(false)}
                      className={`${textPrimary} text-[.9rem]`}
                    >
                      {nav.label}
                    </a>
                  </li>
                ))}
              </ul>

              <div className="flex mt-8 mb-4 justify-between gap-3 pl-3 items-center">
                <div className="flex gap-4 items-center justify-center">
                  <Link onClick={() => setOpenMenu(false)} to="/login">
                    <span className={`${textPrimary} text-[.9rem]`}>Login</span>
                  </Link>
                  <Link onClick={() => setOpenMenu(false)} to="/register">
                    <Button text="Register" className="text-[.9rem]" />
                  </Link>
                </div>
                <div className="ml-2">
                  <ToggleMode />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
