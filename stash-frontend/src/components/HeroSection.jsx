import ligthCloudDrawing from "/images/cloude-drawing-image-light.png";
import darkCloudDrawing from "/images/cloude-drawing-image-dark.png";
import blueStroke from "/images/blue-stroke.png";
import { useTheme } from "../hooks/useTheme";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

function HeroSection({ onScrollToSection }) {
  const { theme } = useTheme();
  return (
    <div className="w-full h-svh">
      <div className="w-full h-full flex items-center justify-center relative">
        {/* drawing images */}
        <div className="absolute w-full h-[85%] sm:h-[70%] justify-center flex flex-col z-0">
          <img
            src={theme === "light" ? ligthCloudDrawing : darkCloudDrawing}
            alt="CloudDrawing"
            className="w-22 md:w-40 absolute top-10 left-10"
          />

          {/* bottom-right cloud */}
          <img
            src={theme === "light" ? ligthCloudDrawing : darkCloudDrawing}
            alt="CloudDrawing"
            className="w-22 md:w-40 absolute bottom-10 right-10"
          />
        </div>
        {/* main content */}
        <div className="z-20">
          <div className="text-center">
            {/* info btn dive */}
            <div>
              <button className="px-2 text-sm lg:text-md py-1.5 border-1 border-border-light dark:border-border-dark rounded-lg shadow-sm hover:shadow-md transition-all duration-150">
                ✨ New Feature: Save Images with a Single Click
              </button>
            </div>
            {/* heading */}
            <div className="mt-8">
              <span>
                <h1 className="font-medium text-[1.8rem] md:text-[3rem] lg:text-[4rem]">
                  Capture It. Save It.{" "}
                  <span className="relative inline-block">
                    Done
                    <img
                      src={blueStroke}
                      alt="blueStroke"
                      className="absolute bottom-0 left-0 w-full"
                    />
                  </span>
                </h1>
              </span>
            </div>
            {/* sub-heading */}
            <div className="mt-4 w-11/12 sm:w-3/4 mx-auto text-text-light-secondary dark:text-text-dark-secondary font-medium text-[0.9rem] sm:text-[1rem] ">
              <p>
                Say goodbye to disorganized screenshots and scattered notes.
                Effortlessly capture and organize both text and images into your
                personal library. All with a single click.
              </p>
            </div>
            {/* call to action buttons */}
            <div className="mt-8 flex items-center justify-center gap-3">
              <button
                onClick={onScrollToSection}
                className="px-3 py-1.5 border-[0.5px] border-border-light dark:border-border-dark rounded-lg transition-all duration-200 hover:border-bg-dark-primary dark:hover:border-bg-light-primary flex items-center active:scale-[0.995] text-[0.9rem] sm:text-[1rem]"
              >
                See How It Works
              </button>
              <Link to="/register">
                <button className="px-3 py-1.5 border-[0.5px] border-border-light dark:border-border-dark rounded-lg bg-blue-500 hover:bg-primary text-white flex items-center gap-1 group active:scale-[0.995] text-[0.9rem] sm:text-[1rem]">
                  Get Started for Free
                  <ChevronRight
                    className="w-4.5 transition-transform duration-200 group-hover:translate-x-0.5"
                    strokeWidth={2.25}
                  />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
