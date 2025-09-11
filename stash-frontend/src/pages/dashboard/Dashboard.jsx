import { Outlet } from "react-router-dom";
import DashboardNavbar from "../../components/DashboardNavbar";
import DashboardSidebar from "../../components/DashboardSidebar";
import { useUserContext } from "../../hooks/useUserContext";
import MobileDashboardSidebar from "./MobileDashboardSidebar";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";

function Dashboard() {
  const modalRef = useRef(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);
  const [closeMobileSidebar, setCloseMobileSidebar] = useState(true);
  const { user } = useUserContext();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!user) return null;

  return (
    <div
      className={`w-full ${closeMobileSidebar ? "" : "fixed"} flex max-sm:flex-col bg-bg-light-primary dark:bg-bg-dark-primary`}
    >
      {/* sidebar */}
      <div
        onClick={() => setCloseMobileSidebar((prev) => !prev)}
        className={`sm:hidden  z-[99999999] text-text-light-primary dark:text-text-dark-primary absolute left-1 top-1 p-3 ${closeMobileSidebar ? "" : "left-[14rem]"}`}
      >
        {closeMobileSidebar ? <Menu size={20} /> : <X size={20} />}
      </div>
      {isMobile ? (
        <div
          ref={modalRef}
          className={`${closeMobileSidebar ? "hidden" : "flex"} z-[99999]  fixed w-[17rem] bg-bg-light-secondary dark:bg-bg-dark-secondary`}
        >
          <MobileDashboardSidebar
            closeSidebar={() => setCloseMobileSidebar(true)}
          />
        </div>
      ) : (
        <div className="flex w-[15rem] h-svh bg-bg-light-secondary dark:bg-bg-dark-secondary text-text-light-primary dark:text-text-dark-primary border-r-[.5px] border-border-light dark:border-border-dark">
          <DashboardSidebar />
        </div>
      )}
      {/* pages */}
      <div
        className={`w-full transition-all ${closeMobileSidebar ? "blur-[0px]" : "blur-[1px] pointer-events-none"} `}
      >
        <DashboardNavbar />

        <main className="w-full max-sm:h-svh">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
