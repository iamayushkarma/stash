import { motion } from "framer-motion";
import dashboardImageDark from "/images/dashboard-image-dark.png";
import dashboardImageLight from "/images/dashboard-image-light.png";
import { useTheme } from "../hooks/useTheme";

function UserDashboardImage() {
  const { theme } = useTheme();

  return (
    <div className="hidden w-full sm:flex items-center justify-center relative bottom-18">
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          duration: 0.7,
          ease: "easeOut",
          delay: 0.3,
        }}
        className="w-4/5 border border-border-light dark:border-border-dark rounded-xl shadow-lg"
      >
        <img
          src={theme === "light" ? dashboardImageLight : dashboardImageDark}
          alt="Dashboard preview"
          className="rounded-xl p-0.5"
        />
      </motion.div>
    </div>
  );
}

export default UserDashboardImage;
