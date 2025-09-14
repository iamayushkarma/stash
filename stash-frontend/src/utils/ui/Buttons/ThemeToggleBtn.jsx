import { SunMedium, Moon } from "lucide-react";
import { useTheme } from "../../../hooks/useTheme";

export const ToggleMode = ({ className }) => {
  const { theme, toggleTheme } = useTheme();
  return (
    <div
      onClick={toggleTheme}
      className={`${className} flex items-center justify-center rounded-full w-9 h-9 transition-all duration-100 bg-bg-light-secondary dark:bg-bg-dark-secondary md:bg-transparent md:dark:bg-transparent  lg:hover:bg-bg-light-secondary lg:dark:hover:bg-bg-dark-secondary`}
    >
      <button>
        {theme == "dark" ? (
          <SunMedium color="#ffffff" className="w-5 md:w-5.5" strokeWidth={2} />
        ) : (
          <Moon color="#030712" className="w-5 md:w-5.5" strokeWidth={2} />
        )}
      </button>
    </div>
  );
};
