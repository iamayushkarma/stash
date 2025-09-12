import logoLight from "/logo/stash-logo-light-secondary.png";
import logoDark from "/logo/stash-logo-dark-secondary.png";
import { Link, NavLink } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";
import {
  Home,
  SquareBottomDashedScissors,
  FileImage,
  ContactRound,
  LayoutDashboard,
  Settings,
  CircleUserRound,
} from "lucide-react";
function DashboardSidebar({ className }) {
  const navLinks = [
    { label: "Home", icon: <Home size={17} />, href: "" },
    {
      label: "Snippets",
      icon: <SquareBottomDashedScissors size={17} />,
      href: "snippets",
    },
    {
      label: "Screenshots",
      icon: <FileImage size={17} />,
      href: "screenshots",
    },
    {
      label: "Categories",
      icon: <LayoutDashboard size={17} />,
      href: "categories",
    },
    { label: "Help", icon: <ContactRound size={17} />, href: "help" },
  ];
  const { theme } = useTheme();
  const textPrimary = "text-text-light-primary dark:text-text-dark-primary";
  return (
    <div className="w-full h-svh flex flex-col justify-between select-none">
      {/* logo */}
      <Link className="h-[5%]" to="">
        <div className="flex items-center p-3 gap-3">
          <span>
            {theme == "dark" ? (
              <img className="md:w-6 w-5" src={logoDark} alt="stash-log" />
            ) : (
              <img className="md:w-6 w-5" src={logoLight} alt="stash-log" />
            )}
          </span>
          <span className={`${textPrimary} font-medium lg:text-md md:text-lg`}>
            Stash
          </span>
        </div>
      </Link>
      {/* navigations */}
      <div className="h-[87%] mt-6 text-[.95rem] pb-5 font-normal">
        <ul className="flex flex-col gap-1 p-3 cursor-pointer pb-[2rem] border-b-[.5px] border-b-border-light dark:border-b-border-dark">
          {navLinks.map((list, id) => {
            return (
              <NavLink
                key={id}
                to={list.href}
                end={list.href === ""}
                className={({ isActive }) =>
                  `flex gap-2 items-center p-2 rounded-lg transition-all duration-200
     ${
       isActive
         ? "text-text-light-primary dark:text-text-dark-primary font-bold"
         : "text-text-light-secondary/80 dark:text-text-dark-secondary/80  hover:text-text-light-primary hover:dark:text-text-dark-primary"
     }`
                }
              >
                <span>{list.icon}</span>
                <span>{list.label}</span>
              </NavLink>
            );
          })}
        </ul>
      </div>
      <div className="h-[8%] p-4 text-text-light-secondary dark:text-text-dark-secondary cursor-pointer">
        <div className="flex hover:font-normal group h-8 bottom-2 items-center gap-1.5 relative">
          <span>
            <Settings size={17} />
          </span>
          <span>Settings</span>
          <div className="absolute hidden space-y-1 px-2 py-1.5 group-hover:flex flex-col rounded-lg w-28 bg-bg-dark-secondary/5 dark:bg-bg-light-secondary/5 border-1 border-border-light dark:border-border-dark bottom-7.5 transition-all duration-150">
            <span className="px-1 flex items-center gap-1">
              <CircleUserRound size={15} />
              Account
            </span>
            <span className="px-1 ml-5 text-error">Logout</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardSidebar;
