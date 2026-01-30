import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import "./components.css";
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

const sectionReveal = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const HowItWorks = React.forwardRef((props, ref) => {
  const [active, setActive] = useState(0);
  const { theme } = useTheme();
  const scrollContainerRef = useRef(null);

  const steps = [
    {
      id: "content-box-1",
      label: "Install Extension",
      icon: InstallIcon,
      image: InstallExtension,
      heading: "Add Clipo to Your Browser",
      subheading:
        "Add the extension to your browser to enable instant saving while browsing.",
    },
    {
      id: "content-box-2",
      label: "Sign In",
      icon: SignIn,
      image: Register,
      heading: "Secure Your Personal Workspace",
      subheading: "Sign in once to sync your saves across devices.",
    },
    {
      id: "content-box-3",
      label: "Save Content",
      icon: Save,
      image: SaveContent,
      heading: "Capture Anything in One Click",
      subheading: "Right-click text, images, or links → Save to Clipo → done.",
    },
    {
      id: "content-box-4",
      label: "Access Library",
      icon: Access,
      image: theme === "dark" ? DashboardDark : DashboardDay,
      heading: "Search and Use Anytime",
      subheading: "Open your dashboard and access your saved content anywhere.",
    },
  ];

  const handleScroll = (id, index) => {
    const container = scrollContainerRef.current;
    const target = document.getElementById(id);

    if (container && target) {
      setActive(index);
      container.scrollTo({
        top: target.offsetTop,
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
            const index = steps.findIndex(
              (step) => step.id === entry.target.id
            );
            if (index !== -1) setActive(index);
          }
        });
      },
      { root: container, threshold: 0.4 }
    );

    steps.forEach((step) => {
      const el = document.getElementById(step.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <motion.section
      ref={ref}
      variants={sectionReveal}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-120px" }}
      className="mb-30 sm:mb-40 bg-bg-light-primary dark:bg-bg-dark-primary"
    >
      {/* Heading */}
      <div className="p-3 mt-15 md:mt-30 text-center sm:mb-22">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-text-light-primary dark:text-text-dark-primary mb-3 sm:mb-4 px-4">
          How It Works
        </h2>
        <p className="text-base sm:text-lg text-text-light-secondary dark:text-text-dark-secondary max-w-2xl mx-auto px-4">
          Save what matters, give it context, and access it anywhere.
        </p>
      </div>

      {/* Main */}
      <div className="mt-5 sm:mt-12 flex relative">
        {/* Sidebar */}
        <div className="w-[20%] hidden sm:flex justify-center sticky top-0 border-r border-border-light dark:border-border-dark">
          <ul>
            {steps.map((step, index) => (
              <li
                key={step.id}
                onClick={() => handleScroll(step.id, index)}
                className={`py-3 flex items-center gap-2 cursor-pointer transition-all ${
                  active === index
                    ? "font-semibold text-text-light-primary dark:text-white"
                    : "text-gray-400"
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    active === index ? "bg-black dark:bg-white" : "bg-gray-400"
                  }`}
                />
                <span className="text-sm">{step.label}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Scroll container */}
        <div
          ref={scrollContainerRef}
          className="w-full sm:w-[80%] h-[500px] sm:overflow-y-scroll scrollbar-hide p-8 flex flex-col gap-15 sm:gap-30"
        >
          {steps.map((step) => (
            <div key={step.id} id={step.id} className="w-full sm:w-[80%]">
              <div className="flex gap-3 items-center">
                <img
                  src={step.icon}
                  className="w-9 h-9 sm:w-12 sm:h-12"
                  alt=""
                />
                <div>
                  <h3 className="font-medium text-md sm:text-lg mb-1">
                    {step.heading}
                  </h3>
                  <p className="text-sm sm:text-md text-text-light-secondary dark:text-text-dark-secondary">
                    {step.subheading}
                  </p>
                </div>
              </div>

              <div className="mt-12 hidden sm:block">
                <img
                  src={step.image}
                  alt={step.heading}
                  className="rounded-lg shadow-md"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
});

export default HowItWorks;
