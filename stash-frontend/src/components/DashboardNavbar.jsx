import React from "react";
import { ToggleMode } from "../utils/ui/ThemeToggleBtn";
import { useUserContext } from "../hooks/useUserContext";
import { Plus } from "lucide-react";
import SearchButton from "../utils/ui/SearchButton";

function DashboardNavbar() {
  const { user } = useUserContext();

  return (
    <nav className="w-full h-12 px-6 gap-2 justify-end items-center flex bg-bg-light-secondary dark:bg-bg-dark-secondary text-text-light-primary dark:text-text-dark-primary border-b-[.5px] border-border-light dark:border-border-dark">
      {/* search btn */}
      <div className="relative max-sm:left-[0.9rem]">
        <SearchButton text="Search" />
      </div>
      {/* new snippet */}
      <div>
        <button className="hidden md:flex justify-center items-center active:scale-[.995] text-text-light-primary border-1 border-border-light dark:border-border-dark  bg-primary/20 hover:bg-primary/30 dark:bg-primary/10 dark:hover:bg-primary/15 dark:text-text-dark-primary rounded-lg text-[.8rem] px-1.5 py-1 md:px-2 md:py-1.5 gap-1 transition-all duration-200 cursor-pointer">
          <span>
            <Plus size={17} />
          </span>
          add snippet
        </button>
      </div>
      {/* theme toggle */}
      <ToggleMode className="hover:bg-bg-dark-secondary/5! dark:hover:bg-bg-light-secondary/5!" />
      {/* user profile */}
      <div className="w-6 border-l-[1px] pl-2 border-border-light dark:border-border-dark">
        <div className="flex justify-center cursor-pointer items-center size-6 md:size-8 bg-primary text-text-dark-primary rounded-full ">
          <span className="select-none touch-none uppercase text-md md:text-xl">
            {user.username[0]}
          </span>
        </div>
      </div>
    </nav>
  );
}

export default DashboardNavbar;
