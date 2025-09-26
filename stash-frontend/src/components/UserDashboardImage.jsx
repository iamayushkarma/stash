import dashboardImageDark from "/images/dashboard-image-dark.png";
import dashboardImageLight from "/images/dashboard-image-light.png";
import { useTheme } from "../hooks/useTheme";
function UserDashboardImage() {
  const { theme } = useTheme();
  return (
    <div className="w-full flex items-center justify-center relative bottom-18">
      {/* screenshot */}
      <div className="w-4/5 border-1 border-border-light dark:border-border-dark rounded-xl shadow-lg">
        <img
          className="rounded-xl p-0.5"
          src={theme === "light" ? dashboardImageLight : dashboardImageDark}
        />
      </div>
    </div>
  );
}

export default UserDashboardImage;
