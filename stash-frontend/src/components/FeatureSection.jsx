import { motion } from "framer-motion";
import { BsClipboardPlus } from "react-icons/bs";
import { IoPricetagsOutline, IoSearch } from "react-icons/io5";
import { IoMdSync } from "react-icons/io";
import "./components.css";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

function FeatureSection() {
  return (
    <div className="flex items-center justify-center bg-primary grid-bg">
      <motion.div
        className="flex w-full sm:w-11/12 md:w-3/4 items-center justify-center p-4 sm:mt-20 sm:mb-15"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="text-center flex flex-col items-center justify-center">
          {/* Heading */}
          <motion.h1
            variants={fadeUp}
            className="w-2/3 text-[1.3rem] sm:text-3xl md:text-4xl font-medium text-text-dark-primary"
          >
            From Digital Clutter to a Clear Library.
          </motion.h1>

          {/* Sub heading */}
          <motion.p
            variants={fadeUp}
            className="sm:w-3/4 mt-5 sm:mt-8 text-[.9rem] sm:text-md text-text-dark-primary/90"
          >
            Turn your scattered finds into a structured, searchable library.
            Explore the powerful but simple features that make it possible.
          </motion.p>

          {/* Feature cards */}
          <motion.div
            variants={container}
            className="mt-10 sm:mt-16 min-sm:grid grid-cols-2 grid-rows-2"
          >
            <FeatureCard
              icon={
                <BsClipboardPlus
                  size={18}
                  className="text-text-light-primary"
                />
              }
              heading="Effortless Capture"
              subHeading="A simple right-click is all it takes to save formatted text, code, or any image you find. Never break your focus or lose a great find again."
            />
            <FeatureCard
              icon={
                <IoPricetagsOutline
                  size={18}
                  className="text-text-light-primary"
                />
              }
              heading="Smart Organization"
              subHeading="Go beyond simple bookmarks. Add a title, category, and notes to give your content context, making it structured and easy to find later."
            />
            <FeatureCard
              icon={<IoSearch size={18} className="text-text-light-primary" />}
              heading="Instant Full-Text Search"
              subHeading="Our powerful search scans every title, category, and piece of saved content. Rediscover your best ideas and find exactly what you need in seconds."
            />
            <FeatureCard
              icon={<IoMdSync size={18} className="text-text-light-primary" />}
              heading="Seamlessly Synced"
              subHeading="Content captured with the extension is instantly available on your personal dashboard. Your entire library is always up-to-date, wherever you are."
            />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

export default FeatureSection;
function FeatureCard({ heading, subHeading, icon }) {
  return (
    <motion.div variants={fadeUp} className="p-2 flex mr-2">
      <div className="p-2 mr-2">
        <div className="w-9 md:w-10 h-9 md:h-10 flex items-center justify-center bg-bg-light-secondary rounded-lg shadow-xs">
          {icon}
        </div>
      </div>
      <div className="p-2 text-start">
        <h2 className="font-medium mb-2 sm:mb-3 text-text-dark-primary">
          {heading}
        </h2>
        <p className="text-[.89rem] sm:text-[1rem] text-text-dark-primary/90">
          {subHeading}
        </p>
      </div>
    </motion.div>
  );
}
