import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useUserContext } from "../../hooks/useUserContext";
import MobileDashboardSidebar from "./MobileDashboardSidebar";
import DashboardNavbar from "../../components/DashboardNavbar";
import DashboardSidebar from "../../components/DashboardSidebar";
import { createPortal } from "react-dom";
import Button from "../../utils/ui/Buttons/Button";

function Dashboard() {
  const modalRef = useRef(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);
  const [closeMobileSidebar, setCloseMobileSidebar] = useState(true);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const { user, logout } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    window.history.pushState(null, "", window.location.href);

    const handleBack = () => {
      setIsLogoutModalOpen(true);
      window.history.pushState(null, "", window.location.href);
    };
    window.addEventListener("popstate", handleBack);
    return () => {
      window.removeEventListener("popstate", handleBack);
    };
  }, []);

  const handleConfirmLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!user) return null;

  return (
    <>
      <div
        className={`w-full ${closeMobileSidebar ? "" : "fixed"} flex max-sm:flex-col bg-bg-light-primary dark:bg-bg-dark-primary`}
      >
        {/* sidebar */}
        <div
          onClick={() => setCloseMobileSidebar((prev) => !prev)}
          className={`sm:hidden  z-[999999] text-text-light-primary dark:text-text-dark-primary absolute left-1 top-1 p-3 ${closeMobileSidebar ? "" : "left-[14rem]"}`}
        >
          {closeMobileSidebar ? <Menu size={20} /> : <X size={20} />}
        </div>
        {isMobile ? (
          <div
            ref={modalRef}
            className={`${closeMobileSidebar ? "hidden" : "flex"} z-[99999]  fixed inset-0 w-[18rem] bg-bg-light-secondary dark:bg-bg-dark-secondary`}
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
          className={`w-full h-svh overflow-y-auto transition-all ${closeMobileSidebar ? "blur-[0px]" : "blur-[4px] pointer-events-none"} `}
        >
          <div className="sticky top-0 z-50">
            <DashboardNavbar />
          </div>

          <main className="w-full max-sm:h-svh">
            <Outlet />
          </main>
        </div>
      </div>
      <LogoutConfirmationModal
        isOpen={isLogoutModalOpen}
        onCancel={() => setIsLogoutModalOpen(false)}
        onConfirm={handleConfirmLogout}
      />
    </>
  );
}

export default Dashboard;

const LogoutConfirmationModal = ({ isOpen, onCancel, onConfirm }) => {
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-[2px] z-[99999]">
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-80 box-border px-4 py-5 rounded-lg bg-bg-light-secondary dark:bg-bg-dark-secondary border-[0.5px] border-border-light dark:border-border-dark shadow-lg"
      >
        <h1 className="mb-2 font-semibold text-text-light-primary dark:text-text-dark-primary text-[1.1rem]">
          Leave Dashboard?
        </h1>
        <p className="text-text-light-secondary dark:text-text-dark-secondary text-[0.95rem] mb-4">
          Are you sure you want to go back? You will be logged out of your
          account.
        </p>
        <div className="w-full flex items-center mt-4">
          <span
            onClick={onCancel}
            className="w-1/2 text-center cursor-pointer text-text-light-secondary dark:text-text-dark-secondary hover:text-text-light-primary hover:dark:text-text-dark-primary"
          >
            Cancel
          </span>
          <Button
            onClick={onConfirm}
            className="w-1/2! bg-error! hover:bg-error/90!"
            text="Logout"
          ></Button>
        </div>
      </div>
    </div>,
    document.body
  );
};
