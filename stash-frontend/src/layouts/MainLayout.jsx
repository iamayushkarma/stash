import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
function MainLayout() {
  return (
    <div className="w-full flex relative flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 relative bg-bg-light-primary dark:bg-bg-dark-primary">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default MainLayout;
