import { useTheme } from "../hooks/useTheme";
import logoLight from "/logo/stash-logo-light.jpg";
import logoDark from "/logo/stash-logo-dark.png";
import {
  Home,
  Star,
  Info,
  Menu,
  X,
  ContactRound,
  BookOpenText,
} from "lucide-react";
import Button from "../utils/ui/Button";
import { useState } from "react";
import { ToggleMode } from "../utils/ui/ThemeToggleBtn";

function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [openMenu, setOpenMenu] = useState(false);
  const openMobileMenu = () => {
    setOpenMenu((openMenu) => !openMenu);
  };

  console.log(openMenu);

  const navLinks = [
    { label: "Home", icon: <Home size={17} /> },
    { label: "Docs", icon: <BookOpenText size={17} /> },
    { label: "About", icon: <Info size={17} /> },
    { label: "Features", icon: <Star size={17} /> },
    { label: "Contact", icon: <ContactRound size={17} /> },
  ];

  const textPrimary = "text-text-light-primary dark:text-text-dark-primary";
  return (
    <nav className="relative">
      <div className="w-full bg-bg-light-primary dark:bg-bg-dark-primary flex p-3">
        <div className="w-full flex justify-between">
          {/* logo and navigation links */}
          <div className="flex 2xl:w-[30rem] items-center">
            {/* logo */}
            <div className="flex items-center gap-3">
              <span>
                {theme == "dark" ? (
                  <img className="md:w-6 w-5" src={logoDark} alt="stash-log" />
                ) : (
                  <img className="md:w-6 w-5" src={logoLight} alt="stash-log" />
                )}
              </span>
              <span
                className={`${textPrimary} font-medium lg:text-md md:text-lg`}
              >
                Stash
              </span>
            </div>
            {/* navigation link */}
            <div className="hidden md:flex ml-4 items-center">
              {navLinks.map((nav, id) => (
                <ul
                  className={`${textPrimary} cursor-pointer text-smtransition-all duration-150`}
                  key={id}
                >
                  <li className="px-3 text-[1rem]">{nav.label}</li>
                </ul>
              ))}
            </div>
          </div>
          {/* authentication links */}
          <div className="hidden md:flex 2xl:w-56 lg:w-48 items-center justify-between">
            {/* theme toggler */}
            <ToggleMode />
            {/* authentication */}
            <div className="flex gap-3 items-center cursor-pointer">
              <span className={textPrimary}>Login</span>
              <Button text="Register" />
            </div>
          </div>
          {/* mobile view */}
        </div>
      </div>
      {/* mobile menu open */}
      <div
        onClick={openMobileMenu}
        className="md:hidden absolute dark:text-bg-light-primary text-bg-dark-primary  flex z-50 top-[.9rem] right-[1rem] "
      >
        {openMenu == true ? <X size={20} /> : <Menu size={20} />}
      </div>
      {openMenu && (
        <div className="fixed w-full transition-all duration-150">
          <div className="inset-0 md:hidden border-t-text-dark-secondary dark:border-t-text-light-secondary border-t-[0.5px] select-none flex bg-bg-light-primary relative dark:bg-bg-dark-primary min-h-screen">
            {/* <ToggleMode /> */}
            <div className="p-3 w-full">
              <div>
                {navLinks.map((nav, id) => (
                  <ul
                    key={id}
                    className="flex px-3 py-4 gap-2 items-center border-b-text-dark-secondary border-b-[0.5px] dark:border-b-text-light-secondary"
                  >
                    <div className={textPrimary}>{nav.icon}</div>
                    <li className={`${textPrimary} text-[.9rem]`}>
                      {nav.label}
                    </li>
                  </ul>
                ))}
                <div className="flex mt-8 mb-4 gap-3 pl-3 items-center">
                  <span className={`${textPrimary} text-[.9rem]`}>Login</span>
                  <Button text="Register" className="text-[.9rem]" />
                </div>
                <div className="ml-2">
                  <ToggleMode />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
