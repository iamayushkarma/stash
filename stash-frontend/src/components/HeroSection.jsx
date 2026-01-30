import { motion } from "framer-motion";
import ligthCloudDrawing from "/images/cloude-drawing-image-light.png";
import darkCloudDrawing from "/images/cloude-drawing-image-dark.png";
import blueStroke from "/images/blue-stroke.png";
import { useTheme } from "../hooks/useTheme";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function HeroSection({ onScrollToSection }) {
  const { theme } = useTheme();

  return (
    <div className="w-full h-svh">
      <div className="w-full h-full flex items-center justify-center relative overflow-hidden">
        {/* Background drawings */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute w-full h-[85%] sm:h-[70%] z-0"
        >
          <motion.img
            src={theme === "light" ? ligthCloudDrawing : darkCloudDrawing}
            className="w-22 md:w-40 absolute top-10 left-10"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.2 }}
          />

          <motion.img
            src={theme === "light" ? ligthCloudDrawing : darkCloudDrawing}
            className="w-22 md:w-40 absolute bottom-10 right-10"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.2 }}
          />
        </motion.div>

        {/* Main content */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="z-20 text-center"
        >
          {/* Feature badge */}
          <motion.div variants={fadeUp}>
            <button className="px-2 text-sm lg:text-md py-1.5 border rounded-lg shadow-sm hover:shadow-md transition">
              ✨ New Feature: Save Images with a Single Click
            </button>
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={fadeUp}
            className="mt-8 font-medium text-[1.8rem] md:text-[3rem] lg:text-[4rem]"
          >
            Capture It. Save It.{" "}
            <span className="relative inline-block">
              Done
              <img
                src={blueStroke}
                alt=""
                className="absolute bottom-0 left-0 w-full"
              />
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            variants={fadeUp}
            className="mt-4 w-11/12 sm:w-3/4 mx-auto text-text-light-secondary dark:text-text-dark-secondary font-medium"
          >
            Say goodbye to disorganized screenshots and scattered notes.
            Effortlessly capture and organize both text and images into your
            personal library. All with a single click.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            variants={fadeUp}
            className="mt-8 flex items-center justify-center gap-3"
          >
            <button
              onClick={onScrollToSection}
              className="px-3 py-1.5 border rounded-lg transition hover:border-bg-dark-primary"
            >
              See How It Works
            </button>

            <Link to="/register">
              <button className="px-3 py-1.5 rounded-lg bg-blue-500 hover:bg-primary text-white flex items-center gap-1 group">
                Get Started for Free
                <ChevronRight className="w-4 transition-transform group-hover:translate-x-0.5" />
              </button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
