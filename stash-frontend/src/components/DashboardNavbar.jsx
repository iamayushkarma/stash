import { useUserContext } from "../hooks/useUserContext";
import { ToggleMode } from "../utils/ui/Buttons/ThemeToggleBtn";

function DashboardNavbar() {
  const { user } = useUserContext();
  return (
    <nav className="w-full top-0 h-12 px-6 gap-2 justify-end items-center flex bg-bg-light-secondary dark:bg-bg-dark-secondary text-text-light-primary dark:text-text-dark-primary border-b-[.5px] border-border-light dark:border-border-dark">
      {/* theme toggle */}
      <ToggleMode className="hover:bg-bg-dark-secondary/5! dark:hover:bg-bg-light-secondary/5! max-sm:ml-2" />
      {/* user profile */}
      <div className="w-6 relative border-l-[1px] pl-2 group border-border-light dark:border-border-dark">
        <div className="flex justify-center cursor-pointer items-center size-6 md:size-8 bg-primary text-text-dark-primary rounded-full">
          <span className="select-none touch-none uppercase text-md md:text-xl">
            {user.username[0]}
          </span>
        </div>
        <div className="absolute right-[-1rem] top-full mt-1 opacity-1 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 cursor-default shadow-sm px-3 py-1.5 rounded-lg bg-bg-light-secondary dark:bg-bg-dark-secondary border-1 border-border-light dark:border-border-dark z-50">
          <div className="absolute -top-2 right-0 w-full h-3"></div>
          <div className="text-[0.86rem] font-medium whitespace-nowrap">
            {user.username}
          </div>
          <div className="text-[0.86rem] relative bottom-0.5 text-text-light-secondary dark:text-text-dark-secondary whitespace-nowrap">
            {user.email}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default DashboardNavbar;
