import React from "react";
import "./components.css";
import { useState, useEffect, useRef } from "react";
import InstallIcon from "../assets/icons/cloud-computing.png";
import InstallExtension from "../assets/images/InstallExtension.png";
import SignIn from "../assets/icons/sign-in.png";
import Register from "../assets/images/SignIn.png";
import Save from "../assets/icons/save.png";
import SaveContent from "../assets/images/SaveContent.png";
import Access from "../assets/icons/Access.png";
import DashboardDay from "../assets/images/DashboardDay.png";
import DashboardDark from "../assets/images/DashboardDark.png";
import { useTheme } from "../hooks/useTheme";

const HowItWorks = React.forwardRef((props, ref) => {
  const [active, setActive] = useState(0);
  const { theme } = useTheme();
  const scrollContainerRef = useRef(null);

  const installationSteps = [
    { label: "Install Extension", target: "content-box-1" },
    { label: "Sign In", target: "content-box-2" },
    { label: "Save Content", target: "content-box-3" },
    { label: "Access Library", target: "content-box-4" },
  ];

  const handleScroll = (id, index) => {
    const container = scrollContainerRef.current;
    const targetSection = document.getElementById(id);

    if (container && targetSection) {
      setActive(index);
      container.scrollTo({
        top: targetSection.offsetTop,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const visibleId = entry.target.id;
            const index = installationSteps.findIndex(
              (step) => step.target === visibleId
            );
            if (index !== -1) setActive(index);
          }
        });
      },
      {
        root: container,
        threshold: 0.4, // triggers when 40% of section is visible
      }
    );

    installationSteps.forEach((step) => {
      const section = document.getElementById(step.target);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="mb-30 sm:mb-40 bg-bg-light-primary dark:bg-bg-dark-primary"
    >
      {/* heading */}
      <div className="p-3 mt-15 md:mt-30 text-center sm:mb-22">
        <div className="font-medium text-xl md:text-2xl lg:text-3xl text-text-light-primary dark:text-text-dark-primary">
          How It Works
        </div>
        <p className="text-text-light-secondary dark:text-text-dark-secondary mt-4 md:mt-2.5 md:text-md text-[.9rem]">
          Save what matters, give it context, and access it across your
          workspace—without changing how you browse.
        </p>
      </div>

      {/* main */}
      <div className="mt-5 sm:mt-12 flex relative">
        {/* Sidebar */}
        <div className="w-[20%] hidden p-2 sm:flex justify-center sticky top-0 border-r-[.5px] border-r-border-light dark:border-r-border-dark">
          <ul>
            {installationSteps.map((step, index) => (
              <li
                key={index}
                onClick={() => handleScroll(step.target, index)}
                className={`py-3 flex items-center gap-2 cursor-pointer transition-all ${
                  active === index
                    ? "font-semibold text-text-light-primary dark:text-white"
                    : "text-gray-400"
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full transition-all ${
                    active === index ? "bg-black dark:bg-white" : "bg-gray-400"
                  }`}
                ></span>

                <span className="text-sm">{step.label}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Scroll container */}
        <div
          ref={scrollContainerRef}
          id="howitworks-scroll-container"
          className="w-full sm:w-[80%] h-[500px] sm:overflow-y-scroll sm:scroll-smooth scrollbar-hide p-8 flex flex-col gap-15 sm:gap-30"
        >
          <StepInfoContent
            id="content-box-1"
            icon={InstallIcon}
            image={InstallExtension}
            heading="Add Clipo to Your Browser"
            subheading="Add the extension to your browser to enable instant saving while browsing."
          />
          <StepInfoContent
            id="content-box-2"
            icon={SignIn}
            image={Register}
            heading="Secure Your Personal Workspace"
            subheading="Sign in once to sync your saves. Your content now stays connected across desktop and laptop."
          />
          <StepInfoContent
            id="content-box-3"
            icon={Save}
            image={SaveContent}
            heading="Capture Anything in One Click"
            subheading="Right-click images, text, or links → select Save to Clipo → add a title and category → done."
          />
          <StepInfoContent
            id="content-box-4"
            icon={Access}
            image={theme === "dark" ? DashboardDark : DashboardDay}
            heading="Search and Use Anytime"
            subheading="Open your dashboard to browse your organized library from anywhere, on any device."
          />
        </div>
      </div>
    </div>
  );
});

export default HowItWorks;

function StepInfoContent({ id, icon, image, heading, subheading }) {
  return (
    <div id={id} className="w-full sm:w-[80%]">
      <div className="flex gap-3 items-center">
        <img src={icon} alt="step icon" className="w-9 h-9 sm:w-12 sm:h-12" />
        <div>
          <h2 className="font-medium text-md sm:text-lg mb-1 sm:mb-3">
            {heading}
          </h2>
          <span className="mt-3 text-sm sm:text-md text-text-light-secondary dark:text-text-dark-secondary">
            {subheading}
          </span>
        </div>
      </div>
      <div className="mt-12 hidden sm:block">
        <img src={image} alt={heading} className="shadow-md rounded-lg" />
      </div>
    </div>
  );
}
