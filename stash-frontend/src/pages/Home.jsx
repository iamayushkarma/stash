import FeatureSection from "../components/FeatureSection";
import HeroSection from "../components/HeroSection";
import HowItWorks from "../components/HowItWorks";
import UserDashboardImage from "../components/UserDashboardImage";
import { useRef } from "react";
import "./pages.css";

function Home() {
  const howItWorksRef = useRef(null);

  const handleScroll = () => {
    if (howItWorksRef.current) {
      howItWorksRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      setTimeout(() => {
        window.scrollBy({ top: -62, left: 0, behavior: "instant" });
      }, 800); // increase if still not enough
    }
  };

  return (
    <div className="w-full dark:bg-bg-dark-primary bg-bg-light-primary text-text-light-primary dark:text-text-dark-primary">
      <HeroSection onScrollToSection={handleScroll} />
      <UserDashboardImage />
      <FeatureSection />
      <HowItWorks ref={howItWorksRef} />
    </div>
  );
}

export default Home;
