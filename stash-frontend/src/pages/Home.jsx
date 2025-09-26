import HeroSection from "../components/HeroSection";
import UserDashboardImage from "../components/UserDashboardImage";

function Home() {
  return (
    <div className="w-full dark:bg-bg-dark-primary bg-bg-light-primary text-text-light-primary dark:text-text-dark-primary">
      <HeroSection />
      <UserDashboardImage />
    </div>
  );
}

export default Home;
